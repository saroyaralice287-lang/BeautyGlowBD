"use client";

import { useEffect, useState } from "react";

export default function OpeningPromo() {
  const [show, setShow] = useState(true);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    const closeTimer = setTimeout(() => {
      setShow(false);
    }, 6000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-3">
      <div className="relative h-[92vh] w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-pink-100 via-white to-purple-100 shadow-2xl">

        {/* Glow 1 */}
        <div className="absolute -left-20 -top-20 h-52 w-52 rounded-full bg-pink-400/30 blur-3xl animate-pulse" />

        {/* Glow 2 */}
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-purple-400/30 blur-3xl animate-pulse" />

        {/* Countdown / Skip */}
        <div className="absolute right-4 top-4 z-50">
          {countdown > 0 ? (
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-xl font-black text-white backdrop-blur-sm">
              {countdown}
            </div>
          ) : (
            <button
              onClick={() => setShow(false)}
              className="rounded-full bg-black/70 px-5 py-2 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-black"
            >
              Skip
            </button>
          )}
        </div>

        {/* LIVE Badge */}
        <div className="absolute left-5 top-5 z-50 flex items-center gap-2 rounded-full bg-black/70 px-3 py-2 text-xs font-bold text-white">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500" />
          </span>

          LIVE PROMO
        </div>

        {/* Floating Effects */}
        <span className="absolute left-8 top-28 text-3xl animate-bounce">
          ✨
        </span>

        <span className="absolute right-8 top-40 text-2xl animate-pulse">
          💖
        </span>

        <span className="absolute left-5 top-[45%] text-2xl animate-bounce">
          ⭐
        </span>

        <span className="absolute right-6 top-[55%] text-3xl animate-pulse">
          ✨
        </span>

        <span className="absolute bottom-32 left-10 text-2xl animate-bounce">
          💎
        </span>

        {/* Main Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">

          {/* Brand */}
          <div className="animate-pulse">
            <p className="text-sm font-bold tracking-[4px] text-pink-600">
              WELCOME TO
            </p>

            <h1 className="mt-2 text-4xl font-black text-gray-900">
              QYVANO
            </h1>

            <p className="text-2xl font-extrabold text-pink-600">
              A²Z
            </p>
          </div>

          {/* Animated Line */}
          <div className="mt-5 h-1 w-32 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 animate-pulse" />

          {/* Title */}
          <h2 className="mt-7 text-4xl font-black leading-tight text-gray-900">
            BIG BEAUTY
            <br />
            <span className="text-pink-600">
              BRAND DAY
            </span>
          </h2>

          {/* Animated Discount Circle */}
          <div className="relative mt-7 flex h-32 w-32 items-center justify-center">

            {/* Animated Outer Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-pink-300 animate-ping opacity-40" />

            {/* Main Circle */}
            <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-pink-600 text-white shadow-2xl">
              <span className="text-sm font-bold">
                UP TO
              </span>

              <span className="text-4xl font-black">
                70%
              </span>

              <span className="text-sm font-bold">
                OFF
              </span>
            </div>

          </div>

          {/* Moving Text */}
          <div className="mt-7 w-full overflow-hidden">
            <div className="whitespace-nowrap text-sm font-bold text-gray-700 animate-[marquee_8s_linear_infinite]">
              ✨ BEAUTY • SKINCARE • MAKEUP • FRAGRANCE • ✨ BEAUTY • SKINCARE • MAKEUP • FRAGRANCE ✨
            </div>
          </div>

          {/* Shop Button */}
          <button
            onClick={() => setShow(false)}
            className="mt-8 rounded-full bg-pink-600 px-10 py-4 text-lg font-bold text-white shadow-xl transition active:scale-95 hover:bg-pink-700 animate-pulse"
          >
            SHOP NOW
          </button>

          <p className="mt-4 text-xs text-gray-500">
            Exclusive offers are waiting for you ❤️
          </p>

        </div>

        {/* Bottom Floating Hearts */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-8 text-xl opacity-70">
          <span className="animate-bounce">💗</span>
          <span className="animate-pulse">✨</span>
          <span className="animate-bounce">💗</span>
          <span className="animate-pulse">✨</span>
        </div>

      </div>

      {/* Marquee Animation */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }

          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>

    </div>
  );
}