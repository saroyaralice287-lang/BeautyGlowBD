"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();

  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  return (
    <nav className="flex justify-between items-center p-5 shadow-md">
      <h1 className="text-2xl font-bold text-pink-600">
        BeautyGlowBD
      </h1>

      <div className="flex items-center gap-6">
        <Link href="/">Home</Link>

        <Link href="/products">Shop</Link>

        <Link href="/about">About</Link>

        <Link href="/contact">Contact</Link>

        <Link href="/orders">Orders</Link>

        <Link href="/cart">
          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700">
            🛒 Cart ({cartCount})
          </button>
        </Link>
      </div>
    </nav>
  );
}