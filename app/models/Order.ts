import { Schema, model, models } from "mongoose";

/* =========================
   ORDER ITEM
========================= */

const OrderItemSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "",
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    _id: false,
  }
);

/* =========================
   ORDER
========================= */

const OrderSchema = new Schema(
  {
    /* CUSTOMER ACCOUNT */

    userId: {
      type: String,
      required: true,
      index: true,
    },

    /* CUSTOMER INFORMATION */

    customer: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    /* PRODUCTS */

    products: {
      type: [OrderItemSchema],
      required: true,
      default: [],
    },

    /* PRICE */

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },

    delivery: {
      type: Number,
      required: true,
      min: 0,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    /* =========================
       PAYMENT
    ========================= */

    payment: {
      type: String,
      enum: [
        "Cash on Delivery",
        "bKash",
        "Nagad",
        "Debit / Credit Card",
      ],
      default: "Cash on Delivery",
    },

    paymentNumber: {
      type: String,
      default: "",
      trim: true,
    },

    transactionId: {
      type: String,
      default: "",
      trim: true,
    },

    paymentStatus: {
      type: String,
      enum: [
        "Pending",
        "Paid",
        "Failed",
        "Refunded",
      ],
      default: "Pending",
    },

    /* =========================
       ORDER STATUS
    ========================= */

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

/* =========================
   MODEL
========================= */

const Order =
  models.Order ||
  model("Order", OrderSchema);

export default Order;