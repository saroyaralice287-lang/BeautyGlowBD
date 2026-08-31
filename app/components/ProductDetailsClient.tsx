"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
};

export default function ProductDetailsClient({
  product,
}: {
  product: Product;
}) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image || "/images/lipstick.jpg",
      });
    }
  };

  const handleWishlist = () => {
    addToWishlist({
      id: product._id,
      name: product.name,
      price: String(product.price),
    });
  };

  return (
    <main className="min-h-screen bg-[#fffafb]">

      {/* =========================
          BREADCRUMB
      ========================== */}
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4 text-sm text-gray-500 sm:px-6 lg:px-8">

          <Link
            href="/"
            className="transition hover:text-pink-600"
          >
            Home
          </Link>

          <span className="mx-2">/</span>

          <Link
            href="/products"
            className="transition hover:text-pink-600"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="font-medium text-gray-800">
            {product.name}
          </span>

        </div>
      </div>

      {/* =========================
          PRODUCT AREA
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 sm:py-12">

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">

          {/* =========================
              IMAGE
          ========================== */}
          <div>

            <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-5 shadow-sm">

              <div className="absolute left-5 top-5 z-10 rounded-full bg-pink-600 px-4 py-1.5 text-xs font-bold text-white">
                QYVANO PICK
              </div>

              <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#fff7fa]">

                <Image
                  src={product.image || "/images/lipstick.jpg"}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-6 transition duration-500 hover:scale-105 sm:p-10"
                />

              </div>

            </div>

            {/* Trust Cards */}
            <div className="mt-5 grid grid-cols-3 gap-3">

              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center">
                <div className="text-2xl">🚚</div>
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Fast Delivery
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center">
                <div className="text-2xl">💎</div>
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Authentic
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-white p-4 text-center">
                <div className="text-2xl">🔒</div>
                <p className="mt-2 text-[11px] font-semibold text-gray-700">
                  Secure
                </p>
              </div>

            </div>

          </div>

          {/* =========================
              DETAILS
          ========================== */}
          <div>

            <p className="text-xs font-bold uppercase tracking-[3px] text-pink-600">
              QYVANO A²Z
            </p>

            <h1 className="mt-3 text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex flex-wrap items-center gap-3">

              <span className="text-lg tracking-tight text-yellow-500">
                ★★★★★
              </span>

              <span className="text-sm font-semibold text-gray-700">
                5.0
              </span>

              <span className="text-sm text-gray-400">
                (5 Reviews)
              </span>

              <span className="h-4 w-px bg-gray-200" />

              <span className="text-sm text-green-600">
                ✓ Verified Product
              </span>

            </div>

            {/* Price */}
            <div className="mt-6 rounded-2xl bg-[#fff7fa] p-5">

              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Price
              </p>

              <div className="mt-1 flex items-center gap-3">

                <span className="text-3xl font-extrabold text-pink-600">
                  ৳{product.price}
                </span>

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Best Price
                </span>

              </div>

            </div>

            {/* Stock */}
            <div className="mt-5 flex items-center gap-3">

              <span className="font-semibold text-gray-800">
                Availability:
              </span>

              {product.stock > 0 ? (
                <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-semibold text-green-600">
                  ✓ {product.stock} available
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-600">
                  Out of Stock
                </span>
              )}

            </div>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="mt-6">

                <p className="mb-3 text-sm font-semibold text-gray-800">
                  Quantity
                </p>

                <div className="flex w-fit items-center overflow-hidden rounded-full border border-gray-200 bg-white">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-xl font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    −
                  </button>

                  <span className="flex h-11 min-w-12 items-center justify-center border-x border-gray-200 px-4 font-bold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="flex h-11 w-11 items-center justify-center text-xl font-bold text-gray-600 transition hover:bg-gray-100"
                  >
                    +
                  </button>

                </div>

              </div>
            )}

            {/* Actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <button
                type="button"
                disabled={product.stock <= 0}
                onClick={handleAddToCart}
                className="rounded-xl bg-pink-600 py-3.5 font-bold text-white shadow-lg shadow-pink-100 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                🛒 Add To Cart
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                className="rounded-xl border-2 border-pink-200 bg-white py-3.5 font-bold text-pink-600 transition hover:bg-pink-50"
              >
                ♡ Add To Wishlist
              </button>

            </div>

            {/* Buy Now */}
            <Link
              href="/checkout"
              className={`mt-3 flex w-full items-center justify-center rounded-xl bg-black py-3.5 font-bold text-white transition hover:bg-pink-600 ${
                product.stock <= 0
                  ? "pointer-events-none opacity-50"
                  : ""
              }`}
            >
              Buy Now →
            </Link>

            {/* Delivery Info */}
            <div className="mt-7 divide-y rounded-2xl border border-gray-100 bg-white">

              <div className="flex gap-4 p-4">
                <span className="text-2xl">🚚</span>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Fast Delivery
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Delivery available across Bangladesh.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4">
                <span className="text-2xl">💳</span>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Secure Payment
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Cash on Delivery and online payment options.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4">
                <span className="text-2xl">↩️</span>

                <div>
                  <h3 className="font-bold text-gray-800">
                    Easy Return
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Easy return policy for eligible products.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =========================
            DESCRIPTION
        ========================== */}
        <div className="mt-10 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:mt-14 sm:p-8">

          <h2 className="text-2xl font-extrabold text-gray-900">
            Product Description
          </h2>

          <div className="mt-4 h-px bg-gray-100" />

          <p className="mt-5 leading-8 text-gray-600">
            {product.description ||
              "Premium quality beauty product carefully selected by QYVANO A²Z."}
          </p>

        </div>

        {/* =========================
            FEATURES
        ========================== */}
        <div className="mt-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-2xl font-extrabold text-gray-900">
            ✨ Product Features
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-[#fff7fa] p-5">
              <div className="text-2xl">💎</div>
              <h3 className="mt-3 font-bold">Premium Quality</h3>
              <p className="mt-1 text-sm text-gray-500">
                Carefully selected for our customers.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7fa] p-5">
              <div className="text-2xl">🌿</div>
              <h3 className="mt-3 font-bold">Beauty Care</h3>
              <p className="mt-1 text-sm text-gray-500">
                Designed for your daily beauty routine.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7fa] p-5">
              <div className="text-2xl">🛡️</div>
              <h3 className="mt-3 font-bold">Trusted Choice</h3>
              <p className="mt-1 text-sm text-gray-500">
                Quality-focused shopping experience.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7fa] p-5">
              <div className="text-2xl">🎁</div>
              <h3 className="mt-3 font-bold">Great Value</h3>
              <p className="mt-1 text-sm text-gray-500">
                Great products at competitive prices.
              </p>
            </div>

          </div>

        </div>

        {/* =========================
            BACK
        ========================== */}
        <div className="mt-8">

          <Link
            href="/products"
            className="inline-flex rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-pink-300 hover:text-pink-600"
          >
            ← Continue Shopping
          </Link>

        </div>

      </section>

    </main>
  );
}