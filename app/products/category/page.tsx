import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const categoryData = {
  skincare: {
    name: "Skincare",
    emoji: "🧴",
    products: [
      {
        id: "skin-1",
        name: "Daily Face Cream",
        price: 800,
        image: "/images/facecream.jpg",
      },
      {
        id: "skin-2",
        name: "Glow Skincare Cream",
        price: 950,
        image: "/images/facecream.jpg",
      },
    ],
  },

  makeup: {
    name: "Makeup",
    emoji: "💄",
    products: [
      {
        id: "makeup-1",
        name: "Premium Lipstick",
        price: 500,
        image: "/images/lipstick.jpg",
      },
      {
        id: "makeup-2",
        name: "Matte Lipstick",
        price: 650,
        image: "/images/lipstick.jpg",
      },
    ],
  },

  perfume: {
    name: "Perfume",
    emoji: "🌸",
    products: [
      {
        id: "perfume-1",
        name: "Elegant Women's Perfume",
        price: 1200,
        image: "/images/perfume.jpg",
      },
    ],
  },
} as const;

type CategoryKey = keyof typeof categoryData;

export default async function CategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) {
  const { name } = await searchParams;

  const category = (name || "") as CategoryKey;
  const data = categoryData[category];

  if (!data) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fffafb] px-4 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-bold text-pink-600 hover:text-pink-700"
        >
          ← Back to Home
        </Link>

        {/* Heading */}
        <div className="mb-10 text-center">
          <div className="text-5xl">{data.emoji}</div>

          <h1 className="mt-3 text-4xl font-black text-gray-900">
            {data.name}
          </h1>

          <p className="mt-2 text-gray-500">
            Explore our {data.name} collection.
          </p>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className="flex h-48 items-center justify-center rounded-2xl bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-110"
                  />
                </div>

                <h2 className="mt-4 text-sm font-bold text-gray-800 group-hover:text-pink-600">
                  {product.name}
                </h2>

                <p className="mt-2 text-lg font-black text-pink-600">
                  ৳{product.price}
                </p>

                <p className="mt-3 text-xs font-bold text-pink-500">
                  View Details →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}