import ProductCard from "./ProductCard";

async function getProducts() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}

export default async function Products() {
  const products = await getProducts();

  return (
    <section className="w-full bg-gray-50 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-7 flex items-end justify-between sm:mb-9">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
              QYVANO A²Z
            </p>

            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Featured Products
            </h2>

            <p className="mt-1.5 text-sm text-gray-500 sm:text-base">
              Discover our most loved beauty essentials
            </p>
          </div>

          <a
            href="/products"
            className="hidden rounded-full px-4 py-2 text-sm font-bold text-pink-600 transition hover:bg-pink-50 sm:block"
          >
            View All →
          </a>
        </div>

        {/* Products */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
            {products.slice(0, 8).map((product: any) => (
              <ProductCard
                key={product._id}
                product={{
                  id: product._id,
                  name: product.name,
                  price: product.price,
                  image: product.image,
                }}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white px-4 py-16 text-center shadow-sm">
            <p className="text-gray-500">
              No products available right now.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <a
            href="/products"
            className="inline-flex items-center justify-center rounded-full bg-pink-600 px-7 py-3 text-sm font-bold text-white shadow-md transition hover:bg-pink-700 active:scale-95"
          >
            View All Products →
          </a>
        </div>

      </div>
    </section>
  );
}