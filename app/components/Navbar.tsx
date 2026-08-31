"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Product = {
  _id: string;
  name: string;
  price: number;
  image?: string;
};

export default function Navbar() {
  const router = useRouter();

  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);

  const [loggedIn, setLoggedIn] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const [language, setLanguage] = useState<"EN" | "BN">("EN");

  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        setProducts([]);
      });
  }, []);

  /* =====================================================
     SEARCH SUGGESTIONS
  ===================================================== */

  useEffect(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      setSuggestions([]);
      return;
    }

    const result = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );

    setSuggestions(result.slice(0, 6));
  }, [search, products]);

  /* =====================================================
     LOGIN CHECK
  ===================================================== */

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => {
        setLoggedIn(res.ok);
      })
      .catch(() => {
        setLoggedIn(false);
      });
  }, []);

  /* =====================================================
     SEARCH
  ===================================================== */

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const query = search.trim();

    if (!query) return;

    setSuggestions([]);

    router.push(
      `/products?search=${encodeURIComponent(query)}`
    );
  };

  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setLoggedIn(false);
    setMenuOpen(false);
    setCategoryOpen(false);

    router.push("/login");
  };

  /* =====================================================
     CLOSE MENUS
  ===================================================== */

  const closeMenus = () => {
    setMenuOpen(false);
    setCategoryOpen(false);
  };

  return (
    <>
      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <div className="bg-[#111111] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] sm:px-6 sm:text-xs lg:px-8">

          <p>
            ✨{" "}
            {language === "BN"
              ? "৳১৫০০+ অর্ডারে ফ্রি ডেলিভারি"
              : "Free Delivery on orders over ৳1500"}
          </p>

          <div className="hidden items-center gap-5 sm:flex">
            <span>
              🚚{" "}
              {language === "BN"
                ? "সারা বাংলাদেশে ডেলিভারি"
                : "Delivery Nationwide"}
            </span>

            <span>📞 +880 1703-500196</span>
          </div>

        </div>
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* =================================================
              MAIN HEADER
          ================================================== */}

          <div className="flex min-h-[72px] items-center gap-3">

            {/* LOGO */}

            <Link
              href="/"
              onClick={closeMenus}
              className="shrink-0"
            >
              <Image
                src="/images/qyvano-logo.png"
                alt="QYVANO A²Z"
                width={190}
                height={90}
                priority
                className="h-auto w-[125px] object-contain sm:w-[155px] lg:w-[175px]"
              />
            </Link>

            {/* =================================================
                DESKTOP CATEGORIES
            ================================================== */}

            <div className="relative hidden lg:block">

              <button
                type="button"
                onClick={() =>
                  setCategoryOpen(!categoryOpen)
                }
                className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${
                  categoryOpen
                    ? "border-pink-400 bg-pink-50 text-pink-600"
                    : "border-gray-200 text-gray-700 hover:border-pink-300 hover:bg-pink-50"
                }`}
              >
                <span className="text-lg">☰</span>

                {language === "BN"
                  ? "ক্যাটাগরি"
                  : "Categories"}

                <span
                  className={`ml-1 text-xs transition ${
                    categoryOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* CATEGORY DROPDOWN */}

              {categoryOpen && (
                <div className="absolute left-0 top-full z-[100] mt-3 w-80 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                  {/* Dropdown Header */}

                  <div className="border-b border-gray-100 bg-gradient-to-r from-pink-50 to-rose-50 px-5 py-4">

                    <p className="text-xs font-bold uppercase tracking-[2px] text-pink-600">
                      QYVANO A²Z
                    </p>

                    <h3 className="mt-1 text-lg font-bold text-gray-900">
                      {language === "BN"
                        ? "সব ক্যাটাগরি"
                        : "All Categories"}
                    </h3>

                  </div>

                  {/* Category List */}

                  <div className="p-2">

                    {/* Makeup */}

                    <Link
                      href="/products?category=makeup"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-xl">
                        💄
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "মেকআপ"
                            : "Makeup"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Beauty & Makeup
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                    {/* Skincare */}

                    <Link
                      href="/products?category=skincare"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-xl">
                        🧴
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "স্কিনকেয়ার"
                            : "Skincare"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Skin Care Products
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                    {/* Perfume */}

                    <Link
                      href="/products?category=perfume"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-xl">
                        🌸
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "পারফিউম"
                            : "Perfume"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Fragrance Collection
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                    {/* Hair Care */}

                    <Link
                      href="/products?category=hair-care"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                        💇
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "হেয়ার কেয়ার"
                            : "Hair Care"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Hair Care Products
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                    {/* Sunscreen */}

                    <Link
                      href="/products?category=sunscreen"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-xl">
                        ☀️
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "সানস্ক্রিন"
                            : "Sunscreen"}
                        </p>

                        <p className="text-xs text-gray-400">
                          Sun Protection
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                    {/* Flash Sale */}

                    <Link
                      href="/products?category=flash-sale"
                      onClick={closeMenus}
                      className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-pink-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl">
                        🔥
                      </span>

                      <div>
                        <p className="font-semibold text-gray-800">
                          {language === "BN"
                            ? "ফ্ল্যাশ সেল"
                            : "Flash Sale"}
                        </p>

                        <p className="text-xs text-red-500">
                          Limited Time Offers
                        </p>
                      </div>

                      <span className="ml-auto text-gray-300">
                        →
                      </span>
                    </Link>

                  </div>
                </div>
              )}

            </div>

            {/* =================================================
                DESKTOP SEARCH
            ================================================== */}

            <div className="hidden flex-1 md:block">

              <form
                onSubmit={handleSearch}
                className="relative"
              >

                <div className="flex h-12 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-50 transition focus-within:border-pink-500 focus-within:bg-white">

                  <div className="flex items-center pl-5 text-gray-400">
                    🔍
                  </div>

                  <input
                    value={search}
                    onChange={(e) =>
                      setSearch(e.target.value)
                    }
                    placeholder={
                      language === "BN"
                        ? "পণ্য, স্কিনকেয়ার, মেকআপ খুঁজুন..."
                        : "Search products, skincare, makeup..."
                    }
                    className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
                  />

                  <button
                    type="submit"
                    className="m-1 rounded-full bg-pink-600 px-6 text-sm font-bold text-white transition hover:bg-pink-700"
                  >
                    {language === "BN"
                      ? "খুঁজুন"
                      : "Search"}
                  </button>

                </div>

                {/* SEARCH SUGGESTIONS */}

                {suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full z-[100] mt-2 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">

                    <div className="border-b bg-gray-50 px-4 py-3">
                      <p className="text-xs font-semibold text-gray-500">
                        {language === "BN"
                          ? "পণ্যের পরামর্শ"
                          : "Suggested Products"}
                      </p>
                    </div>

                    {suggestions.map((product) => (
                      <button
                        key={product._id}
                        type="button"
                        onClick={() => {
                          setSearch("");
                          setSuggestions([]);

                          router.push(
                            `/products/${product._id}`
                          );
                        }}
                        className="flex w-full items-center gap-4 border-b border-gray-50 px-4 py-3 text-left transition last:border-0 hover:bg-pink-50"
                      >
                        <Image
                          src={
                            product.image ||
                            "/images/lipstick.jpg"
                          }
                          alt={product.name}
                          width={52}
                          height={52}
                          className="h-12 w-12 rounded-xl border object-cover"
                        />

                        <div className="min-w-0 flex-1">

                          <p className="truncate text-sm font-semibold text-gray-800">
                            {product.name}
                          </p>

                          <p className="mt-1 text-sm font-bold text-pink-600">
                            ৳{product.price}
                          </p>

                        </div>

                        <span className="text-gray-400">
                          →
                        </span>

                      </button>
                    ))}

                  </div>
                )}

              </form>

            </div>

            {/* =================================================
                RIGHT ACTIONS
            ================================================== */}

            <div className="ml-auto flex items-center gap-2">

              {/* LANGUAGE */}

              <div className="hidden items-center rounded-full border border-gray-200 bg-gray-50 p-1 sm:flex">

                <button
                  type="button"
                  onClick={() => setLanguage("EN")}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                    language === "EN"
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  EN
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("BN")}
                  className={`rounded-full px-3 py-1.5 text-[11px] font-bold transition ${
                    language === "BN"
                      ? "bg-black text-white"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  বাংলা
                </button>

              </div>

              {/* ACCOUNT */}

              <Link
                href={
                  loggedIn
                    ? "/account"
                    : "/login"
                }
                className="hidden h-11 items-center gap-2 rounded-full border border-gray-200 px-4 transition hover:border-pink-300 hover:bg-pink-50 md:flex"
              >

                <span className="text-lg">
                  👤
                </span>

                <div className="leading-tight">

                  <p className="text-[10px] text-gray-400">
                    {loggedIn
                      ? language === "BN"
                        ? "অ্যাকাউন্ট"
                        : "Your Account"
                      : language === "BN"
                      ? "স্বাগতম"
                      : "Welcome"}
                  </p>

                  <p className="text-xs font-bold text-gray-700">
                    {loggedIn
                      ? language === "BN"
                        ? "অ্যাকাউন্ট"
                        : "Account"
                      : language === "BN"
                      ? "লগইন করুন"
                      : "Login / Register"}
                  </p>

                </div>

              </Link>

              {/* WISHLIST */}

              <Link
                href="/wishlist"
                aria-label="Wishlist"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-xl transition hover:border-pink-300 hover:bg-pink-50"
              >
                ♡

                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}

              </Link>

              {/* CART */}

              <Link
                href="/cart"
                aria-label="Cart"
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-black text-lg text-white transition hover:bg-pink-600"
              >
                🛒

                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}

              </Link>

              {/* MOBILE MENU */}

              <button
                type="button"
                onClick={() =>
                  setMenuOpen(!menuOpen)
                }
                aria-label="Menu"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 text-xl transition hover:bg-gray-50 lg:hidden"
              >
                {menuOpen ? "✕" : "☰"}
              </button>

            </div>

          </div>

          {/* =================================================
              MOBILE SEARCH
          ================================================== */}

          <div className="pb-3 md:hidden">

            <form onSubmit={handleSearch}>

              <div className="flex h-11 overflow-hidden rounded-full border border-gray-200 bg-gray-50 focus-within:border-pink-400">

                <span className="flex items-center pl-4 text-gray-400">
                  🔍
                </span>

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder={
                    language === "BN"
                      ? "পণ্য খুঁজুন..."
                      : "Search products..."
                  }
                  className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none"
                />

                <button
                  type="submit"
                  className="m-1 rounded-full bg-pink-600 px-5 text-xs font-bold text-white"
                >
                  🔍
                </button>

              </div>

            </form>

          </div>

          {/* =================================================
              DESKTOP CATEGORY NAV
          ================================================== */}

          <div className="hidden items-center justify-center gap-8 border-t border-gray-100 py-3 text-sm font-semibold text-gray-600 lg:flex">

            <Link
              href="/products?category=makeup"
              className="transition hover:text-pink-600"
            >
              💄 Makeup
            </Link>

            <Link
              href="/products?category=skincare"
              className="transition hover:text-pink-600"
            >
              🧴 Skincare
            </Link>

            <Link
              href="/products?category=perfume"
              className="transition hover:text-pink-600"
            >
              🌸 Perfume
            </Link>

            <Link
              href="/products?category=hair-care"
              className="transition hover:text-pink-600"
            >
              💇 Hair Care
            </Link>

            <Link
              href="/products?category=sunscreen"
              className="transition hover:text-pink-600"
            >
              ☀️ Sunscreen
            </Link>

            <Link
              href="/products?category=flash-sale"
              className="font-bold text-pink-600 transition hover:text-pink-700"
            >
              🔥 Flash Sale
            </Link>

          </div>

        </div>

        {/* =====================================================
            MOBILE MENU
        ====================================================== */}

        {menuOpen && (
          <div className="border-t border-gray-100 bg-white shadow-xl lg:hidden">

            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">

              <Link
                href="/"
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                🏠 Home
              </Link>

              <Link
                href="/products"
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                🛍️ Products
              </Link>

              {/* Mobile Categories */}

              <div className="border-t border-gray-100 pt-2">

                <p className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-gray-400">
                  {language === "BN"
                    ? "ক্যাটাগরি"
                    : "Categories"}
                </p>

                <Link
                  href="/products?category=makeup"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-pink-50"
                >
                  💄 Makeup
                </Link>

                <Link
                  href="/products?category=skincare"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-pink-50"
                >
                  🧴 Skincare
                </Link>

                <Link
                  href="/products?category=perfume"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-pink-50"
                >
                  🌸 Perfume
                </Link>

                <Link
                  href="/products?category=hair-care"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-pink-50"
                >
                  💇 Hair Care
                </Link>

                <Link
                  href="/products?category=sunscreen"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold hover:bg-pink-50"
                >
                  ☀️ Sunscreen
                </Link>

                <Link
                  href="/products?category=flash-sale"
                  onClick={closeMenus}
                  className="block rounded-xl px-4 py-3 font-semibold text-pink-600 hover:bg-pink-50"
                >
                  🔥 Flash Sale
                </Link>

              </div>

              {/* Other Links */}

              <Link
                href="/wishlist"
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                ❤️ Wishlist ({wishlist.length})
              </Link>

              <Link
                href="/cart"
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                🛒 Cart ({cartCount})
              </Link>

              <Link
                href="/account/orders"
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                📦 Orders
              </Link>

              <Link
                href={
                  loggedIn
                    ? "/account"
                    : "/login"
                }
                onClick={closeMenus}
                className="block rounded-xl px-4 py-3 font-semibold transition hover:bg-pink-50"
              >
                👤{" "}
                {loggedIn
                  ? "My Account"
                  : "Login / Register"}
              </Link>

              {loggedIn && (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="block w-full rounded-xl px-4 py-3 text-left font-semibold text-red-500 transition hover:bg-red-50"
                >
                  🚪 Logout
                </button>
              )}

              {/* Mobile Language */}

              <div className="mt-3 flex items-center justify-between border-t border-gray-100 px-4 pt-4">

                <span className="text-sm font-medium text-gray-500">
                  Language
                </span>

                <div className="flex rounded-full border bg-gray-50 p-1">

                  <button
                    type="button"
                    onClick={() => setLanguage("EN")}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                      language === "EN"
                        ? "bg-black text-white"
                        : "text-gray-500"
                    }`}
                  >
                    English
                  </button>

                  <button
                    type="button"
                    onClick={() => setLanguage("BN")}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold ${
                      language === "BN"
                        ? "bg-black text-white"
                        : "text-gray-500"
                    }`}
                  >
                    বাংলা
                  </button>

                </div>

              </div>

            </div>

          </div>
        )}

      </nav>
    </>
  );
}