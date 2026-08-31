import { NextResponse } from "next/server";
import { connectDB } from "../../lib/mongodb";
import Product from "../../models/Product";

// GET all products
export async function GET() {
  try {
    await connectDB();

    const products = await Product.find().sort({ createdAt: -1 });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ADD new product
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      name,
      category,
      price,
      stock,
      description,
      image,
    } = body;

    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description ||
      !image
    ) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const product = await Product.create({
      name,
      category: category.toLowerCase().trim(),
      price: Number(price),
      stock: Number(stock),
      description,
      image,
    });

    return NextResponse.json(
      {
        message: "Product added successfully",
        product,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/products error:", error);

    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}