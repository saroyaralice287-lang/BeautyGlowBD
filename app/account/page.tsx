"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
};

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (!data.loggedIn || !data.user) {
          router.push("/login");
          return;
        }

        setUser(data.user);
      } catch (error) {
        console.error("Account loading error:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Continue Shopping
          </Link>

          <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            My Account
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your QYVANO A²Z account and orders.
          </p>
        </div>

        {/* Profile Card */}
        <section className="mb-6 overflow-hidden rounded-3xl bg-white shadow-lg">
          <div className="bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-7 text-white sm:px-8">
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-2xl font-extrabold text-pink-600 shadow-md">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </div>

              <div className="min-w-0">
                <p className="text-sm text-pink-100">
                  Welcome back
                </p>

                <h2 className="truncate text-2xl font-extrabold">
                  {user?.name || "Customer"}
                </h2>

                <p className="mt-1 truncate text-sm text-pink-100">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid gap-4 px-6 py-6 sm:grid-cols-2 sm:px-8">

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Full Name
              </p>

              <p className="mt-1 font-bold text-gray-800">
                {user?.name || "Not available"}
              </p>
            </div>

            <div className="rounded-2xl bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email
              </p>

              <p className="mt-1 break-all font-bold text-gray-800">
                {user?.email || "Not available"}
              </p>
            </div>

          </div>
        </section>

        {/* Account Options */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* Orders */}
          <Link
            href="/account/orders"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
              📦
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              My Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View and track your orders.
            </p>

            <p className="mt-4 text-sm font-bold text-pink-600">
              View Orders →
            </p>
          </Link>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl">
              ❤️
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              Wishlist
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View your saved products.
            </p>

            <p className="mt-4 text-sm font-bold text-pink-600">
              View Wishlist →
            </p>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-2xl">
              🛒
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              My Cart
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Check the products in your cart.
            </p>

            <p className="mt-4 text-sm font-bold text-pink-600">
              Open Cart →
            </p>
          </Link>

          {/* Products */}
          <Link
            href="/products"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-2xl">
              🛍️
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              Shop Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Explore our latest beauty products.
            </p>

            <p className="mt-4 text-sm font-bold text-pink-600">
              Start Shopping →
            </p>
          </Link>

          {/* Home */}
          <Link
            href="/"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-2xl">
              🏠
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-gray-900">
              Home
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Go back to QYVANO A²Z homepage.
            </p>

            <p className="mt-4 text-sm font-bold text-pink-600">
              Go Home →
            </p>
          </Link>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="group rounded-2xl border border-red-100 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-2xl">
              🚪
            </div>

            <h2 className="mt-4 text-lg font-extrabold text-red-600">
              Logout
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Sign out from your account.
            </p>

            <p className="mt-4 text-sm font-bold text-red-500">
              Logout →
            </p>
          </button>

        </div>
      </div>
    </main>
  );
}