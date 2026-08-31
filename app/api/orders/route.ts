import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "../../lib/mongodb";
import Order from "../../models/Order";

async function getUserFromToken(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  const token = cookieHeader
    ?.split(";")
    .find((cookie) =>
      cookie.trim().startsWith("token=")
    )
    ?.split("=")[1];

  if (!token) return null;

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.verify(token, secret) as {
    id: string;
    email: string;
    role?: string;
  };
}

/* =========================
   CREATE ORDER
========================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login before placing an order",
        },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      customer,
      email,
      phone,
      address,
      products,
      subtotal,
      delivery,
      total,
      payment,
      transactionId,
      paymentNumber,
    } = body;

    /* =========================
       BASIC VALIDATION
    ========================= */

    if (!customer || !phone || !address) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer information is required",
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No products found in order",
        },
        { status: 400 }
      );
    }

    /* =========================
       PAYMENT VALIDATION
    ========================= */

    const allowedPayments = [
      "Cash on Delivery",
      "bKash",
      "Nagad",
      "Debit / Credit Card",
    ];

    const selectedPayment =
      allowedPayments.includes(payment)
        ? payment
        : "Cash on Delivery";

    if (
      selectedPayment === "bKash" ||
      selectedPayment === "Nagad"
    ) {
      if (!transactionId || !String(transactionId).trim()) {
        return NextResponse.json(
          {
            success: false,
            message: `Transaction ID is required for ${selectedPayment} payment`,
          },
          { status: 400 }
        );
      }

      if (
        paymentNumber &&
        String(paymentNumber).trim() !== "01703500196"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid payment number",
          },
          { status: 400 }
        );
      }
    }

    /* =========================
       CLEAN PRODUCTS
    ========================= */

    const cleanProducts = products.map((item: any) => {
      const price = Number(
        String(item.price).replace(/[^\d.]/g, "")
      );

      const quantity = Number(item.quantity);

      if (!item.id || !item.name) {
        throw new Error(
          'PProduct ID or name is missing: ${JSON.stringify(item)}'
        );
      }

      if (!Number.isFinite(price) || price < 0) {
        throw new Error(
          'Invalid product price: ${item.price}'
        );
      }

      if (
        !Number.isInteger(quantity) ||
        quantity < 1
      ) {
        throw new Error(
          'Invalid product quantity: ${item.quantity}'
        );
      }

      return {
        id: String(item.id),
        name: String(item.name),
        price,
        image: item.image
          ? String(item.image)
          : "",
        quantity,
      };
    });

    /* =========================
       PRICE VALIDATION
    ========================= */

    const cleanSubtotal = Number(
      String(subtotal).replace(/[^\d.]/g, "")
    );

    const cleanDelivery = Number(
      String(delivery).replace(/[^\d.]/g, "")
    );

    const cleanTotal = Number(
      String(total).replace(/[^\d.]/g, "")
    );

    if (
      !Number.isFinite(cleanSubtotal) ||
      !Number.isFinite(cleanDelivery) ||
      !Number.isFinite(cleanTotal)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order price information",
        },
        { status: 400 }
      );
    }

    /* =========================
       CREATE ORDER
    ========================= */

    const order = await Order.create({
      userId: String(user.id),

      customer: String(customer).trim(),

      email: String(
        email || user.email || ""
      )
        .trim()
        .toLowerCase(),

      phone: String(phone).trim(),

      address: String(address).trim(),

      products: cleanProducts,

      subtotal: cleanSubtotal,

      delivery: cleanDelivery,

      total: cleanTotal,

      payment: selectedPayment,

      paymentNumber:
        selectedPayment === "bKash" ||
        selectedPayment === "Nagad"
          ? "01703500196"
          : "",

      transactionId:
        selectedPayment === "bKash" ||
        selectedPayment === "Nagad"
          ? String(transactionId).trim()
          : "",

      paymentStatus:
        selectedPayment === "Cash on Delivery"
          ? "Pending"
          : "Pending",

      status: "Pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("ORDER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error?.message ||
          "Failed to create order",
      },
      { status: 500 }
    );
  }
}

/* =========================
   GET ORDERS
========================= */

export async function GET(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    let orders;

    if (user.role === "admin") {
      orders = await Order.find().sort({
        createdAt: -1,
      });
    } else {
      orders = await Order.find({
        userId: user.id,
      }).sort({
        createdAt: -1,
      });
    }

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error(
      "Fetch orders error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}

/* =========================
   UPDATE ORDER STATUS
========================= */

export async function PATCH(req: Request) {
  try {
    await connectDB();

    const user = await getUserFromToken(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        { status: 401 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Only admin can update order status",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { id, status } = body;

    const allowedStatuses = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled",
    ];

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Order ID and status are required",
        },
        { status: 400 }
      );
    }

    if (!allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid order status",
        },
        { status: 400 }
      );
    }

    const order =
      await Order.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error(
      "Update order error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to update order status",
      },
      { status: 500 }
    );
  }
}