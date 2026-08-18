"use client";

import { useState } from "react";

type Order = {
  _id: string;
  customer: string;
  email: string;
  product: string;
  total: number;
  status: string;
};

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const trackOrder = async () => {
    if (!orderId.trim()) {
      setError("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setOrder(null);

      const response = await fetch(
        `/api/orders/track?id=${orderId.trim()}`
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Order not found");
        return;
      }

      setOrder(data);
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600">
            Track Your Order 📦
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your Order ID to check your order status.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <label className="block font-medium mb-2">
            Order ID
          </label>

          <input
            type="text"
            placeholder="Enter your Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="border w-full p-3 rounded-lg mb-4"
          />

          <button
            onClick={trackOrder}
            disabled={loading}
            className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>

          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}
        </div>

        {order && (
          <div className="bg-white rounded-xl shadow p-6 mt-6">

            <h2 className="text-2xl font-bold text-pink-600 mb-5">
              Order Details
            </h2>

            <div className="space-y-3">
              <p>
                <strong>Order ID:</strong>{" "}
                {order._id}
              </p>

              <p>
                <strong>Customer:</strong>{" "}
                {order.customer}
              </p>

              <p>
                <strong>Product:</strong>{" "}
                {order.product}
              </p>

              <p>
                <strong>Total:</strong>{" "}
                ৳{order.total}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span className="text-pink-600 font-bold">
                  {order.status}
                </span>
              </p>
            </div>

            <div className="mt-8">
              <h3 className="font-bold mb-4">
                Order Progress
              </h3>

              <div className="space-y-3">
                <div
                  className={
                    order.status === "Pending" ||
                    order.status === "Processing" ||
                    order.status === "Shipped" ||
                    order.status === "Delivered"
                      ? "text-pink-600 font-bold"
                      : "text-gray-400"
                  }
                >
                  ✓ Pending
                </div>

                <div
                  className={
                    order.status === "Processing" ||
                    order.status === "Shipped" ||
                    order.status === "Delivered"
                      ? "text-pink-600 font-bold"
                      : "text-gray-400"
                  }
                >
                  ✓ Processing
                </div>

                <div
                  className={
                    order.status === "Shipped" ||
                    order.status === "Delivered"
                      ? "text-pink-600 font-bold"
                      : "text-gray-400"
                  }
                >
                  ✓ Shipped
                </div>

                <div
                  className={
                    order.status === "Delivered"
                      ? "text-green-600 font-bold"
                      : "text-gray-400"
                  }
                >
                  ✓ Delivered
                </div>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}