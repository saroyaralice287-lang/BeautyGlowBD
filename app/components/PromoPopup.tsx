"use client";

import { useEffect, useState } from "react";

export default function PromoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-[2px] flex items-center justify-center p-5">

      <div className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 via-white to-purple-100 shadow-2xl">

        {/* Close Button */}
        <button
          onClick={() => setShow(false)}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg text-white hover:bg-black transition"
        >
          ✕
        </button>

        {/* Animated Glow */}
        <div className="absolute -left-12 -top-12 h-32 w-32 rounded-full bg-pink-400/30 blur-3xl animate-pulse" />

        <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-purple-400/30 blur-3xl animate-pulse" />

        {/* Content */}
        <div className="relative z-10 px-6 py-8 text-center">

          {/* LIVE */}
          <div className="mx-auto mb-3 flex w-fit items-center gap-2 rounded-full bg-black px-3 py-1.5 text-xs font-bold text-white">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
            </span>

            LIVE DEAL
          </div>

          <p className="text-sm font-bold tracking-[3px] text-pink-600">
            QYVANO A²Z
          </p>

          <h2 className="mt-3 text-3xl font-black leading-tight text-gray-900">
            BEAUTY
            <br />
            <span className="text-pink-600">
              SALE
            </span>
          </h2>

          {/* Discount */}
          <div className="mx-auto mt-5 flex h-24 w-24 animate-pulse flex-col items-center justify-center rounded-full bg-pink-600 text-white shadow-lg">
            <span className="text-xs font-bold">
              UP TO
            </span>

            <span className="text-3xl font-black">
              50%
            </span>

            <span className="text-[10px] font-bold">
              OFF
            </span>
          </div>

          <p className="mt-5 text-sm font-medium text-gray-600">
            Grab your favorite beauty products
            <br />
            before the offer ends!
          </p>

          {/* Shop Now */}
          <button
            onClick={() => setShow(false)}
            className="mt-6 w-full rounded-full bg-pink-600 px-6 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-pink-700 active:scale-95"
          >
            SHOP NOW →
          </button>

          <p className="mt-3 text-xs text-gray-500">
            Limited time offer ❤️
          </p>

        </div>

        {/* Floating Effects */}
        <span className="absolute left-4 top-28 animate-bounce text-xl">
          ✨
        </span>

        <span className="absolute right-5 top-32 animate-pulse text-xl">
          💖
        </span>

        <span className="absolute bottom-20 left-6 animate-pulse text-lg">
          ⭐
        </span>

        <span className="absolute bottom-24 right-6 animate-bounce text-xl">
          ✨
        </span>

      </div>
    </div>
  );
}