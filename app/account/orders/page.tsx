"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  _id: string;
  customer: string;
  email: string;
  product: string;
  total: number;
  status:
    | "Pending"
    | "Processing"
    | "Shipped"
    | "Delivered"
    | "Cancelled";
  createdAt: string;
};

export default function MyOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await fetch("/api/orders", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders || []);
        }
      } catch (error) {
        console.error("Orders loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, [router]);

  const getStatusStyle = (status: Order["status"]) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Shipped":
        return "bg-blue-100 text-blue-700";

      case "Processing":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your orders...
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
            href="/account"
            className="text-sm font-semibold text-pink-600 hover:text-pink-700"
          >
            ← Back to My Account
          </Link>

          <h1 className="mt-5 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            My Orders
          </h1>

          <p className="mt-2 text-gray-500">
            View and track your QYVANO A²Z orders.
          </p>
        </div>

        {/* No Orders */}
        {orders.length === 0 ? (
          <div className="rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-lg">
            <div className="text-6xl">📦</div>

            <h2 className="mt-5 text-2xl font-extrabold text-gray-900">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              You haven't placed any orders yet. Explore our products and
              place your first order.
            </p>

            <Link
              href="/products"
              className="mt-6 inline-block rounded-full bg-pink-600 px-7 py-3 text-sm font-bold text-white transition hover:bg-pink-700"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="space-y-5">

            {orders.map((order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-3 border-b border-gray-100 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order ID
                    </p>

                    <p className="mt-1 break-all text-sm font-bold text-gray-800">
                      #{order._id}
                    </p>
                  </div>

                  <div>
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-xs font-bold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Body */}
                <div className="px-5 py-5 sm:px-6">

                  <div className="grid gap-5 sm:grid-cols-2">

                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Product
                      </p>

                      <p className="mt-2 font-bold text-gray-800">
                        {order.product}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gray-50 p-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                        Total
                      </p>

                      <p className="mt-2 text-xl font-extrabold text-pink-600">
                        ৳{Number(order.total).toLocaleString("en-BD")}
                      </p>
                    </div>

                  </div>

                  {/* Date */}
                  <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 text-sm sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-gray-500">
                      📅{" "}
                      {new Date(order.createdAt).toLocaleDateString(
                        "en-BD",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </p>

                    <p className="font-semibold text-gray-600">
                      {order.email}
                    </p>

                  </div>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}