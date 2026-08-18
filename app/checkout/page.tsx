"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = cart.reduce(
  (sum: number, item: any) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace("৳", ""))
        : Number(item.price);

    return sum + price * item.quantity;
  },
  0
);

  const handleOrder = async () => {
    if (!customer || !email || !phone || !address) {
      alert("Please fill all customer information");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      setLoading(true);

      const product = cart
        .map((item: any) => item.name + " × " + item.quantity)
        .join(", ");

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
          email,
          product,
          total,
          status: "Pending",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to place order");
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            🎉 Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your order.
          </p>

          <Link
            href="/success"
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700"
          >
            Continue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Checkout 🛒
      </h1>

      <div className="border rounded-lg p-5 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Order Summary
        </h2>

        {cart.map((item: any) => {
  const price =
    typeof item.price === "string"
      ? Number(item.price.replace("৳", ""))
      : Number(item.price);

  return (
    <p key={item.id}>
      {item.name} × {item.quantity} = ৳
      {price * item.quantity}
    </p>
  );
})}

        <h3 className="text-xl font-bold mt-4">
          Total: ৳{total}
        </h3>
      </div>

      <div className="border rounded-lg p-5">
        <h2 className="text-2xl font-bold mb-4">
          Customer Information
        </h2>

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Your Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <textarea
          className="border p-3 w-full mb-3 rounded"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <button
          onClick={handleOrder}
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 disabled:opacity-50"
        >
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>
    </div>
  );
}