"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const total = cart.reduce((sum: number, item: any) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace("৳", "").replace(/,/g, ""))
        : Number(item.price);

    return sum + price * item.quantity;
  }, 0);

  return (
    <main className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="mb-8">
          <p className="text-pink-600 text-sm font-semibold uppercase tracking-widest">
            QYVANO A²Z
          </p>

          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
            🛒 Shopping Cart
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center">

            <div className="text-6xl mb-5">
              🛒
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Your Cart is Empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add some products to your cart.
            </p>

            <Link
              href="/products"
              className="inline-block mt-6 bg-black text-white px-7 py-3 rounded-full font-semibold hover:bg-pink-600 transition"
            >
              Continue Shopping →
            </Link>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item: any) => {
                const price =
                  typeof item.price === "string"
                    ? Number(
                        item.price
                          .replace("৳", "")
                          .replace(/,/g, "")
                      )
                    : Number(item.price);

                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-sm p-4 sm:p-5"
                  >

                    <div className="flex gap-4">

                      {/* Image */}
                      <Link href={`/products/${String(item.id)}`}>
                        <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-pink-50 rounded-xl overflow-hidden">

                          <Image
                            src={item.image || "/images/lipstick.jpg"}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />

                        </div>
                      </Link>

                      {/* Details */}
                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <div>
                            <p className="text-xs text-pink-600 font-semibold uppercase">
                              QYVANO A²Z
                            </p>

                            <Link href={`/products/${String(item.id)}`}>
                              <h2 className="font-bold text-gray-800 mt-1">
                                {item.name}
                              </h2>
                            </Link>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 text-sm"
                          >
                            Remove
                          </button>

                        </div>

                        <p className="text-pink-600 font-bold text-xl mt-2">
                          ৳{price}
                        </p>

                        <div className="flex items-center gap-3 mt-4">

                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="w-8 h-8 rounded-full border"
                          >
                            −
                          </button>

                          <span className="font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="w-8 h-8 rounded-full border"
                          >
                            +
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>
                );
              })}

              <Link
                href="/products"
                className="inline-block text-pink-600 font-semibold mt-2"
              >
                ← Continue Shopping
              </Link>

            </div>

            {/* Summary */}
            <div>
              <div className="bg-white rounded-3xl shadow-sm p-6">

                <h2 className="text-xl font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="flex justify-between mt-6">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ৳{total}
                  </span>
                </div>

                <div className="flex justify-between mt-4">
                  <span className="text-gray-500">
                    Delivery
                  </span>

                  <span className="text-green-600 font-semibold">
                    FREE
                  </span>
                </div>

                <div className="border-t mt-5 pt-5 flex justify-between">

                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-bold text-pink-600">
                    ৳{total}
                  </span>

                </div>

                <Link
                  href="/checkout"
                  className="block text-center mt-6 bg-black text-white py-3 rounded-full font-bold hover:bg-pink-600 transition"
                >
                  Proceed to Checkout →
                </Link>

              </div>
            </div>

          </div>
        )}

      </div>
    </main>
  );
}