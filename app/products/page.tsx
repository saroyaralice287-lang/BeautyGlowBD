"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Face Cream",
    price: 650,
    image: "/images/face-cream.jpg",
    category: "skincare",
    description: "Moisturizing face cream for glowing skin.",
  },
  {
    id: 2,
    name: "Vitamin C Serum",
    price: 850,
    image: "/images/serum.jpg",
    category: "skincare",
    description: "Brightens skin and reduces dark spots.",
  },
  {
    id: 3,
    name: "Body Mist Fresh Bloom",
    price: 750,
    image: "/images/body-mist-fresh-bloom.jpg",
    category: "perfume",
    description: "Long-lasting floral fragrance.",
  },
  {
    id: 4,
    name: "Matte Lipstick",
    price: 500,
    image: "/images/lipstick.jpg",
    category: "makeup",
    description: "Beautiful long-lasting matte lipstick.",
  },
  {
    id: 5,
    name: "Sunscreen SPF 50+",
    price: 950,
    image: "/images/sunscreen.jpg",
    category: "sunscreen",
    description: "Protects skin from harmful UV rays.",
  },
  {
    id: 6,
    name: "Face Wash",
    price: 420,
    image: "/images/facewash.jpg",
    category: "face-wash",
    description: "Deep cleansing face wash.",
  },
  {
    id: 7,
    name: "Hair Shampoo",
    price: 590,
    image: "/images/shampoo.jpg",
    category: "hair-care",
    description: "Smooth and silky hair shampoo.",
  },
  {
    id: 8,
    name: "Hair Oil",
    price: 480,
    image: "/images/hair-oil.jpg",
    category: "hair-care",
    description: "Nourishing hair oil for healthy hair.",
  },
  {
    id: 9,
    name: "Compact Powder",
    price: 650,
    image: "/images/compact-powder.jpg",
    category: "makeup",
    description: "Lightweight compact powder.",
  },
  {
    id: 10,
    name: "BB Cream",
    price: 780,
    image: "/images/bb-cream.jpg",
    category: "makeup",
    description: "Natural everyday makeup coverage.",
  },
  {
    id: 11,
    name: "Perfume Rose Love",
    price: 1100,
    image: "/images/perfume.jpg",
    category: "perfume",
    description: "Premium romantic fragrance.",
  },
  {
    id: 12,
    name: "Night Cream",
    price: 700,
    image: "/images/night-cream.jpg",
    category: "skincare",
    description: "Repairs skin overnight.",
  },
  {
    id: 13,
    name: "Lip Gloss",
    price: 450,
    image: "/images/lip-gloss.jpg",
    category: "makeup",
    description: "Shiny hydrating lip gloss.",
  },
];

function ProductsContent() {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchCategory =
        !category || product.category === category;

      return matchSearch && matchCategory;
    });
  }, [search, category]);

  return (
    <section className="min-h-screen bg-pink-50 py-10">
      <div className="mx-auto max-w-7xl px-4">

        {/* Title */}
        <h1 className="mb-6 text-center text-4xl font-bold text-pink-600">
          All Products 💖
        </h1>

        {/* Search */}
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-8 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 outline-none transition focus:border-pink-500"
        />

        {/* Category */}
        {category && (
          <div className="mb-6 text-center">
            <span className="rounded-full bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-600">
              Category: {category}
            </span>
          </div>
        )}

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-2xl bg-white py-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-gray-500">
              No products found.
            </p>

            <p className="mt-2 text-sm text-gray-400">
              Try another search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <section className="flex min-h-screen items-center justify-center bg-pink-50">
          <div className="text-center">
            <div className="text-4xl">💖</div>
            <p className="mt-3 font-semibold text-pink-600">
              Loading products...
            </p>
          </div>
        </section>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}