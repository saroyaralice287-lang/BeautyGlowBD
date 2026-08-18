"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);
  const [customers, setCustomers] = useState(0);
  const [sales, setSales] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
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
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h1 className="text-3xl font-bold text-pink-600">
            BeautyGlowBD Admin Panel
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your store from one place.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Products</p>
            <h2 className="text-3xl font-bold text-pink-600 mt-2">
              {loading ? "..." : products}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Orders</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {loading ? "..." : orders}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Customers</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {loading ? "..." : customers}
            </h2>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <p className="text-gray-500">Total Sales</p>
            <h2 className="text-3xl font-bold text-purple-600 mt-2">
              {loading ? "..." : "BDT " + sales}
            </h2>
          </div>

        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-3">🛍️</div>

            <h2 className="text-xl font-bold">
              Products
            </h2>

            <p className="text-gray-500 mt-2 mb-4">
              Add, edit and delete products.
            </p>

            <Link
              href="/admin/products"
              className="inline-block bg-pink-600 text-white px-5 py-3 rounded-lg hover:bg-pink-700"
            >
              Manage Products
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-3">📦</div>

            <h2 className="text-xl font-bold">
              Orders
            </h2>

            <p className="text-gray-500 mt-2 mb-4">
              View and manage customer orders.
            </p>

            <Link
              href="/admin/orders"
              className="inline-block bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              Manage Orders
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="text-4xl mb-3">👥</div>

            <h2 className="text-xl font-bold">
              Customers
            </h2>

            <p className="text-gray-500 mt-2 mb-4">
              View and manage customers.
            </p>

            <Link
              href="/admin/customers"
              className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700"
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