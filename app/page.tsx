import OpeningPromo from "./components/OpeningPromo";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Categories from "./components/Categories";
import BannerSlider from "./components/BannerSlider";
import FlashSale from "./components/FlashSale";
import Footer from "./components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fffafb] text-gray-900">

      <OpeningPromo />
      {/* =========================
          NAVBAR
      ========================== */}
      <Navbar />

      {/* =========================
          HERO
      ========================== */}
      <Hero />

      {/* =========================
          BRAND INTRO
      ========================== */}
      <section className="mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">

        <p className="text-xs font-bold uppercase tracking-[4px] text-pink-600 sm:text-sm">
          Welcome to QYVANO A²Z
        </p>

        <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
          Everything You Need,
          <span className="text-pink-600"> From A to Z ✨</span>
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
          Discover authentic skincare, makeup, perfume, hair care and
          lifestyle essentials — all in one beautiful destination.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">

          <Link
            href="/products"
            className="rounded-full bg-black px-7 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-600"
          >
            Shop Now →
          </Link>

          <Link
            href="/cart"
            className="rounded-full border border-gray-300 bg-white px-7 py-3 font-semibold transition hover:border-pink-400 hover:text-pink-600"
          >
            🛒 View Cart
          </Link>

        </div>

      </section>

      {/* =========================
          BANNER
      ========================== */}
      <BannerSlider />

      {/* =========================
          CATEGORIES
      ========================== */}
      <Categories />

      {/* =========================
          FLASH SALE
      ========================== */}
      <FlashSale />

      {/* =========================
          BEST SELLERS
      ========================== */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <p className="text-xs font-bold uppercase tracking-[3px] text-pink-600">
              Customer Favorites
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Best Selling Products
            </h2>

            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Loved by our beauty community.
            </p>
          </div>

          <Link
            href="/products"
            className="font-semibold text-pink-600 transition hover:text-pink-700"
          >
            View All →
          </Link>

        </div>

        <Products />

      </section>

      {/* =========================
          WHY QYVANO
      ========================== */}
      <section className="border-y border-gray-100 bg-white py-14">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-9 text-center">

            <p className="text-xs font-bold uppercase tracking-[3px] text-pink-600">
              The QYVANO Promise
            </p>

            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Why Choose QYVANO A²Z?
            </h2>

          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 sm:gap-6">

            <div className="rounded-3xl border border-pink-100 bg-[#fff7fa] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">🚚</div>

              <h3 className="mt-4 font-bold">
                Fast Delivery
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Reliable delivery across Bangladesh.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-[#fff7fa] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">💎</div>

              <h3 className="mt-4 font-bold">
                Authentic Products
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Carefully selected beauty essentials.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-[#fff7fa] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">🔒</div>

              <h3 className="mt-4 font-bold">
                Secure Shopping
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Safe and convenient checkout.
              </p>
            </div>

            <div className="rounded-3xl border border-pink-100 bg-[#fff7fa] p-6 text-center transition hover:-translate-y-1 hover:shadow-lg">
              <div className="text-4xl">🎁</div>

              <h3 className="mt-4 font-bold">
                Exclusive Offers
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                Special deals and seasonal offers.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* =========================
          NEWSLETTER
      ========================== */}
      <section className="px-4 py-16">

        <div className="mx-auto max-w-5xl rounded-[2rem] bg-black px-6 py-12 text-center text-white shadow-xl sm:px-12">

          <p className="text-xs font-bold uppercase tracking-[3px] text-pink-400">
            Stay Beautiful
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Join the QYVANO Beauty Club 💖
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Get new arrivals, exclusive offers and beauty updates
            directly in your inbox.
          </p>

          <form className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full px-5 py-3 text-gray-900 outline-none ring-0"
            />

            <button
              type="submit"
              className="rounded-full bg-pink-600 px-7 py-3 font-semibold text-white transition hover:bg-pink-700"
            >
              Subscribe
            </button>

          </form>

        </div>

      </section>

      {/* =========================
          FOOTER
      ========================== */}
      <Footer />

    </main>
  );
}