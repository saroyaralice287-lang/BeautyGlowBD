"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [sales, setSales] = useState(0);

  const [loading, setLoading] = useState(true);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const authRes = await fetch("/api/auth/me");
        const authData = await authRes.json();

        if (!authRes.ok || !authData.loggedIn) {
          router.replace("/login");
          return;
        }

        if (authData.user?.role !== "admin") {
          alert("Access denied. Admin only.");
          router.replace("/");
          return;
        }

        setCheckingAuth(false);

        const [productsRes, ordersRes, customersRes] =
          await Promise.all([
            fetch("/api/products"),
            fetch("/api/orders"),
            fetch("/api/customers"),
          ]);

        const productsData = await productsRes.json();
        const ordersData = await ordersRes.json();
        const customersData = await customersRes.json();

        setProducts(
          Array.isArray(productsData)
            ? productsData.length
            : 0
        );

        setOrders(
          Array.isArray(ordersData)
            ? ordersData.length
            : 0
        );

        setCustomers(
          Array.isArray(customersData)
            ? customersData.length
            : 0
        );

        if (Array.isArray(ordersData)) {
          const total = ordersData.reduce(
            (sum: number, order: any) =>
              sum + Number(order.total || 0),
            0
          );

          setSales(total);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
        router.replace("/");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (checkingAuth || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-5xl">🔐</div>

          <p className="mt-4 font-semibold text-gray-600">
            Checking Admin Access...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 rounded-xl bg-white p-6 shadow">
          <p className="text-xs font-bold uppercase tracking-[3px] text-pink-600">
            QYVANO A²Z
          </p>

          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            Admin Panel 👑
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your QYVANO A²Z store from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Products</p>

            <h2 className="mt-2 text-3xl font-bold text-pink-600">
              {products}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Orders</p>

            <h2 className="mt-2 text-3xl font-bold text-blue-600">
              {orders}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Customers</p>

            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {customers}
            </h2>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <p className="text-gray-500">Total Sales</p>

            <h2 className="mt-2 text-3xl font-bold text-purple-600">
              BDT {sales}
            </h2>
          </div>

        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Products */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-3 text-4xl">🛍️</div>

            <h2 className="text-xl font-bold">
              Products
            </h2>

            <p className="mb-4 mt-2 text-gray-500">
              Add, edit and delete products.
            </p>

            <Link
              href="/admin/products"
              className="inline-block rounded-lg bg-pink-600 px-5 py-3 text-white hover:bg-pink-700"
            >
              Manage Products
            </Link>
          </div>

          {/* Orders */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-3 text-4xl">📦</div>

            <h2 className="text-xl font-bold">
              Orders
            </h2>

            <p className="mb-4 mt-2 text-gray-500">
              View and manage customer orders.
            </p>

            <Link
              href="/admin/orders"
              className="inline-block rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Manage Orders
            </Link>
          </div>

          {/* Customers */}
          <div className="rounded-xl bg-white p-6 shadow">
            <div className="mb-3 text-4xl">👥</div>

            <h2 className="text-xl font-bold">
              Customers
            </h2>

            <p className="mb-4 mt-2 text-gray-500">
              View and manage customers.
            </p>

            <Link
              href="/admin/customers"
              className="inline-block rounded-lg bg-green-600 px-5 py-3 text-white hover:bg-green-700"
            >
              Manage Customers
            </Link>
          </div>

        </div>

        {/* Home */}
        <div className="mt-8">
          <Link
            href="/"
            className="text-pink-600 hover:underline"
          >
            ← Back to Store
          </Link>
        </div>

      </div>
    </div>
  );
}