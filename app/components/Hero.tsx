"use client";

import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7fa] via-white to-[#fdf0f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 items-center gap-10">

          <div className="text-center lg:text-left">

            <p className="text-pink-600 font-semibold uppercase tracking-[4px] text-xs sm:text-sm">
              Welcome to QYVANO A²Z
            </p>

            <h1 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
              Your Beauty.
              <br />
              <span className="text-pink-600">Your Everything.</span>
            </h1>

            <p className="mt-5 text-gray-500 text-base sm:text-lg leading-8 max-w-xl mx-auto lg:mx-0">
              Discover skincare, makeup, perfume, hair care and lifestyle
              essentials—all in one premium destination.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-8">

              <Link
                href="/products"
                className="bg-black text-white px-7 py-3.5 rounded-full font-semibold hover:bg-pink-600 transition shadow-lg"
              >
                Shop Now →
              </Link>

              <Link
                href="/products"
                className="bg-white border border-gray-200 text-gray-800 px-7 py-3.5 rounded-full font-semibold hover:border-pink-400 hover:text-pink-600 transition"
              >
                Explore Collection
              </Link>

            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-8 text-sm text-gray-500">

              <div className="flex items-center gap-2">
                <span className="text-pink-600">✓</span>
                Original Products
              </div>

              <div className="flex items-center gap-2">
                <span className="text-pink-600">✓</span>
                Fast Delivery
              </div>

              <div className="flex items-center gap-2">
                <span className="text-pink-600">✓</span>
                Secure Shopping
              </div>

            </div>

          </div>

          <div className="relative flex justify-center">

            <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-pink-200/40 blur-3xl" />

            <div className="relative w-full max-w-md">

              <div className="absolute -top-3 -right-2 sm:right-0 bg-white rounded-2xl shadow-xl px-4 py-3 z-10">
                <p className="text-xs text-gray-400">
                  Beauty
                </p>
                <p className="font-bold text-pink-600">
                  From A to Z ✨
                </p>
              </div>

              <div className="relative rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border border-pink-100">

                <Image
                  src="/images/qyvano-logo.png"
                  alt="QYVANO A²Z"
                  width={600}
                  height={500}
                  priority
                  className="w-full h-auto object-contain p-8 sm:p-12"
                />

              </div>

              <div className="absolute -bottom-5 -left-3 sm:-left-6 bg-black text-white rounded-2xl shadow-xl px-5 py-4">
                <p className="text-xs text-gray-400">
                  QYVANO A²Z
                </p>
                <p className="font-semibold">
                  Beauty • Care • Lifestyle
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}