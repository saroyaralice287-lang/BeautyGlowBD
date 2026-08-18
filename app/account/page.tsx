"use client";

import Link from "next/link";

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">
          My Account
        </h1>

        <p className="mb-8 text-gray-600">
          Welcome to your BeautyGlowBD account.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          <Link
            href="/account/orders"
            className="rounded-xl bg-white p-6 shadow hover:shadow-md"
          >
            <h2 className="text-xl font-bold">📦 My Orders</h2>
            <p className="mt-2 text-gray-600">
              View and track your orders.
            </p>
          </Link>

          <Link
            href="/wishlist"
            className="rounded-xl bg-white p-6 shadow hover:shadow-md"
          >
            <h2 className="text-xl font-bold">❤️ Wishlist</h2>
            <p className="mt-2 text-gray-600">
              View your saved products.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}