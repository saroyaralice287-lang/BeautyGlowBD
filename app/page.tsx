import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Products from "./components/Products";
import Categories from "./components/Categories";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Products />

      <div className="flex justify-center my-8">
        <Link href="/cart">
          <button className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
            🛒 View Cart
          </button>
        </Link>
      </div>

      <Categories />
    </>
  );
}