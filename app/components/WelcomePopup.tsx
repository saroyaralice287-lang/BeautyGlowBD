"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem("qyvano_welcome_shown");

    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    sessionStorage.setItem("qyvano_welcome_shown", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/45 backdrop-blur-[2px] px-4">

      {/* Popup */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Close Button */}
        <button
          onClick={closePopup}
          aria-label="Close"
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-xl font-semibold text-gray-700 shadow-md hover:bg-black hover:text-white transition"
        >
          ×
        </button>

        <div className="grid md:grid-cols-2">

          {/* Left Content */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10">

            <p className="text-xs font-bold uppercase tracking-[3px] text-pink-600">
              Welcome to QYVANO A²Z
            </p>

            <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold leading-tight text-gray-900">
              Home & Lifestyle
              <span className="block text-pink-600">
                Monday ✨
              </span>
            </h2>

            <p className="mt-2 text-base font-medium text-gray-700">
              Create a Home You Love
            </p>

            {/* Offer */}
            <div className="mt-5 rounded-2xl bg-pink-50 border border-pink-100 px-4 py-3">
              <p className="text-sm font-semibold text-gray-700">
                🚚 Free Delivery / Voucher Max
              </p>

              <p className="mt-1 text-xl font-extrabold text-pink-600">
                Up to ৳45 OFF
              </p>
            </div>

            {/* Shop Now */}
            <Link
              href="/products"
              onClick={closePopup}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-black px-6 py-3.5 text-sm font-bold text-white hover:bg-pink-600 transition"
            >
              SHOP NOW →
            </Link>

          </div>

          {/* Right Product Showcase */}
          <div className="relative min-h-[280px] bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100">

            {/* Decorative circles */}
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-pink-200/50" />
            <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-purple-200/40" />

            <div className="relative flex h-full items-center justify-center p-6">

              <div className="grid grid-cols-2 gap-3">

                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lg rotate-[-4deg]">
                  <Image
                    src="/images/facecream.jpg"
                    alt="Beauty Product"
                    width={130}
                    height={130}
                    className="h-28 w-28 object-cover rounded-xl"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lg rotate-[5deg] mt-6">
                  <Image
                    src="/images/lipstick.jpg"
                    alt="Beauty Product"
                    width={130}
                    height={130}
                    className="h-28 w-28 object-cover rounded-xl"
                  />
                </div>

                <div className="overflow-hidden rounded-2xl bg-white p-2 shadow-lg rotate-[4deg]">
                  <Image
                    src="/images/perfume.jpg"
                    alt="Beauty Product"
                    width={130}
                    height={130}
                    className="h-28 w-28 object-cover rounded-xl"
                  />
                </div>

                <div className="flex items-center justify-center rounded-2xl bg-black p-4 shadow-lg rotate-[-5deg] mt-6">
                  <div className="text-center text-white">
                    <p className="text-xs uppercase tracking-widest">
                      Special
                    </p>

                    <p className="text-2xl font-black text-pink-400">
                      ৳45
                    </p>

                    <p className="text-xs">
                      OFF
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}