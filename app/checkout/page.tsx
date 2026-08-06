"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cart } = useCart();

  const total = cart.reduce(
    (sum: number, item: any) =>
      sum + Number(item.price.replace("৳", "")) * item.quantity,
    0
  );

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-pink-600 mb-6">
        Checkout 🛒
      </h1>

      <div className="border rounded-lg p-5 mb-6">
        <h2 className="text-2xl font-bold mb-4">
          Order Summary
        </h2>

        {cart.map((item: any) => (
          <p key={item.id}>
            {item.name} × {item.quantity} = ৳
            {Number(item.price.replace("৳", "")) *
              item.quantity}
          </p>
        ))}

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
        />

        <input
          className="border p-3 w-full mb-3 rounded"
          placeholder="Phone Number"
        />

        <textarea
          className="border p-3 w-full mb-3 rounded"
          placeholder="Address"
        />

        <Link href="/success">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            Confirm Order
          </button>
        </Link>
      </div>
    </div>
  );
}