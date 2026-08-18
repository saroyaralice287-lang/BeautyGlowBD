import mongoose, { Schema, model, models } from "mongoose";

const OrderSchema = new Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

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

const Order = models.Order || model("Order", OrderSchema);

export default Order;