"use client";

import { useEffect, useState } from "react";

const banners = [
  {
    tag: "QYVANO A²Z EXCLUSIVE",
    title: "Premium Beauty Collection",
    subtitle: "Discover premium skincare, makeup & beauty essentials.",
    offer: "UP TO 50% OFF",
  },
  {
    tag: "NEW ARRIVALS",
    title: "K-Beauty Has Arrived",
    subtitle: "Explore authentic Korean skincare products.",
    offer: "SHOP NEW",
  },
  {
    tag: "LUXURY FRAGRANCE",
    title: "Find Your Signature Scent",
    subtitle: "Premium fragrances selected for every occasion.",
    offer: "FROM ৳999",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const banner = banners[current];

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-pink-600 via-rose-500 to-fuchsia-500 text-white shadow-xl">
        
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10" />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-white/10" />

        <div className="relative flex min-h-[300px] items-center justify-center px-6 py-14 text-center sm:min-h-[360px] sm:px-12">
          <div className="max-w-3xl">

            <p className="text-xs font-bold tracking-[0.3em] text-white/90 sm:text-sm">
              {banner.tag}
            </p>

            <div className="mt-5 inline-block rounded-full bg-white/15 px-5 py-2 text-xs font-bold backdrop-blur-sm sm:text-sm">
              {banner.offer}
            </div>

            <h2 className="mt-5 text-3xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
              {banner.title}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm text-white/90 sm:text-lg">
              {banner.subtitle}
            </p>

            <a
              href="/products"
              className="mt-8 inline-flex items-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-pink-600 shadow-lg transition hover:scale-105 hover:bg-pink-50 sm:px-9"
            >
              Shop Now
              <span className="ml-2">→</span>
            </a>
          </div>
        </div>

        {/* Previous */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xl backdrop-blur-md transition hover:bg-white/30 sm:left-5"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-xl backdrop-blur-md transition hover:bg-white/30 sm:right-5"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                current === index
                  ? "w-7 bg-white"
                  : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}