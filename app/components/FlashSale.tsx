"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function FlashSale() {
  const [time, setTime] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 2;
          minutes = 30;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdown = [
    { label: "HRS", value: time.hours },
    { label: "MIN", value: time.minutes },
    { label: "SEC", value: time.seconds },
  ];

  return (
    <section className="w-full bg-[#fffafb] py-10 sm:py-14">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 shadow-2xl">

          {/* Animated Background Glow */}
          <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl animate-pulse" />

          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-yellow-300/10 blur-3xl animate-pulse" />

          {/* Decorative Circles */}
          <div className="absolute right-[35%] top-8 h-16 w-16 rounded-full border border-white/20 animate-ping opacity-30" />

          <div className="absolute bottom-8 left-[40%] h-10 w-10 rounded-full border border-white/20 animate-pulse" />

          <div className="relative z-10 flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">

            {/* LEFT */}
            <div className="text-white">

              <div className="inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-xs font-bold tracking-wider backdrop-blur-md">

                <span className="animate-pulse">
                  🔥
                </span>

                LIVE FLASH SALE

              </div>

              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Flash Sale
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-white/90 sm:text-base">
                Hurry! Your favourite beauty essentials are available
                at special prices for a limited time.
              </p>

              {/* Countdown */}
              <div className="mt-6 flex items-center gap-2 sm:gap-3">

                {countdown.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 sm:gap-3"
                  >

                    <div className="min-w-[64px] rounded-2xl bg-white px-3 py-3 text-center shadow-xl sm:min-w-[76px]">

                      <p className="text-2xl font-black text-gray-900 sm:text-3xl">
                        {String(item.value).padStart(2, "0")}
                      </p>

                      <p className="mt-1 text-[9px] font-bold tracking-[2px] text-gray-500">
                        {item.label}
                      </p>

                    </div>

                    {index < countdown.length - 1 && (
                      <span className="text-2xl font-black text-white animate-pulse">
                        :
                      </span>
                    )}

                  </div>
                ))}

              </div>

              {/* Button */}
              <Link
                href="/products"
                className="mt-7 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-pink-600 shadow-xl transition duration-300 hover:-translate-y-1 hover:bg-pink-50 hover:shadow-2xl"
              >
                Shop Flash Sale
                <span className="ml-2 text-lg">
                  →
                </span>
              </Link>

            </div>

            {/* RIGHT OFFER */}
            <div className="flex w-full max-w-sm justify-center lg:w-auto">

              <div className="relative w-full overflow-hidden rounded-[30px] border border-white/20 bg-white/15 p-7 text-center shadow-2xl backdrop-blur-xl">

                {/* Glow */}
                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl" />

                {/* Floating Icons */}
                <span className="absolute left-4 top-5 text-xl animate-bounce">
                  ✨
                </span>

                <span className="absolute right-5 top-8 text-xl animate-pulse">
                  💖
                </span>

                <span className="absolute bottom-5 left-7 text-xl animate-pulse">
                  💎
                </span>

                <span className="absolute bottom-7 right-6 text-xl animate-bounce">
                  ⭐
                </span>

                <p className="relative text-xs font-bold tracking-[3px] text-white/80">
                  TODAY'S SPECIAL
                </p>

                <div className="relative mx-auto mt-4 flex h-36 w-36 items-center justify-center">

                  {/* Ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/30 animate-ping" />

                  {/* Circle */}
                  <div className="relative flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white shadow-2xl">

                    <span className="text-5xl font-black text-pink-600">
                      50%
                    </span>

                    <span className="text-sm font-black tracking-[3px] text-gray-900">
                      OFF
                    </span>

                  </div>

                </div>

                <div className="relative mt-5 rounded-full bg-white/20 px-5 py-2.5 text-xs font-bold text-white">
                  Selected Beauty Products
                </div>

              </div>

            </div>

          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex flex-col gap-3 border-t border-white/20 bg-black/10 px-6 py-4 text-center text-xs text-white/90 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:text-left">

            <p className="font-medium">
              ⚡ Limited stock • Grab the deal before it's gone
            </p>

            <Link
              href="/products"
              className="font-bold text-white underline underline-offset-4 transition hover:text-yellow-200"
            >
              View All Deals →
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}