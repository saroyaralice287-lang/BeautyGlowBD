"use client";

import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Skincare",
    image: "/images/serum.jpg",
    items: "120+ Products",
    color: "bg-pink-100",
    emoji: "🧴",
    slug: "skincare",
  },
  {
    name: "Makeup",
    image: "/images/lipstick.jpg",
    items: "80+ Products",
    color: "bg-purple-100",
    emoji: "💄",
    slug: "makeup",
  },
  {
    name: "Hair Care",
    image: "/images/hair-repair-shampoo.jpg",
    items: "60+ Products",
    color: "bg-green-100",
    emoji: "🧴",
    slug: "haircare",
  },
  {
    name: "Perfume",
    image: "/images/perfume.jpg",
    items: "40+ Products",
    color: "bg-yellow-100",
    emoji: "🌸",
    slug: "perfume",
  },
  {
    name: "Face Wash",
    image: "/images/aloe-vera-face-wash.jpg",
    items: "50+ Products",
    color: "bg-blue-100",
    emoji: "🫧",
    slug: "facewash",
  },
  {
    name: "Face Cream",
    image: "/images/face-cream.jpg",
    items: "35+ Products",
    color: "bg-rose-100",
    emoji: "✨",
    slug: "face-cream",
  },
];

export default function Categories() {
  return (
    <section className="bg-pink-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
            Shop By Category
          </h2>
          <p className="mt-2 text-gray-600">
            Explore our most loved beauty categories ✨
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/products/category?name=${category.slug}`}
              className="group"
            >
              <div
                className={`rounded-3xl ${category.color} border border-pink-100 p-4 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg`}
              >
                <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-white">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                <div className="mb-1 text-2xl">{category.emoji}</div>

                <h3 className="font-semibold text-gray-800">{category.name}</h3>

                <p className="mt-1 text-xs text-gray-500">{category.items}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}