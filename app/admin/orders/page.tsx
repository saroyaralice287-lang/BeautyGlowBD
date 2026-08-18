"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Order = {
  _id: string;
  customer: string;
  email: string;
  product: string;
  total: number;
  status: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    id: string,
    status: string
  ) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update status");
        return;
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? { ...order, status }
            : order
        )
      );

      alert("Order status updated successfully");
    } catch (error) {
      console.error("UPDATE STATUS ERROR:", error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600">
            Manage Orders
          </h1>

          <p className="text-gray-500 mt-1">
            View and manage customer orders.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              Loading orders...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE ================= */}
            <div className="grid gap-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow p-4"
                >
                  <div className="flex justify-between items-start gap-3 mb-4">
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">
                        Order ID
                      </p>

                      <p className="font-semibold break-all">
                        #{order._id}
                      </p>
                    </div>

                    <span className="text-pink-600 font-bold whitespace-nowrap">
                      ৳{order.total}
                    </span>
                  </div>

                  <div className="border-t pt-3 space-y-3">

                    <div>
                      <p className="text-sm text-gray-500">
                        Customer
                      </p>

                      <p className="font-medium break-words">
                        {order.customer}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Email
                      </p>

                      <p className="text-sm break-all">
                        {order.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Product
                      </p>

                      <p className="break-words">
                        {order.product}
                      </p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Status
                      </p>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateStatus(
                            order._id,
                            e.target.value
                          )
                        }
                        className="border rounded-lg px-3 py-2 w-full"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Processing">
                          Processing
                        </option>

                        <option value="Shipped">
                          Shipped
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>
                      </select>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* ================= DESKTOP ================= */}
            <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-pink-50">
                    <tr>
                      <th className="px-6 py-4">
                        Order ID
                      </th>

                      <th className="px-6 py-4">
                        Customer
                      </th>

                      <th className="px-6 py-4">
                        Product
                      </th>

                      <th className="px-6 py-4">
                        Total
                      </th>

                      <th className="px-6 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-t"
                      >
                        <td className="px-6 py-4 font-medium">
                          #{order._id}
                        </td>

                        <td className="px-6 py-4">
                          <div className="font-medium">
                            {order.customer}
                          </div>

                          <div className="text-sm text-gray-500 break-all">
                            {order.email}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {order.product}
                        </td>

                        <td className="px-6 py-4">
                          ৳{order.total}
                        </td>

                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              updateStatus(
                                order._id,
                                e.target.value
                              )
                            }
                            className="border rounded-lg px-3 py-2"
                          >
                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Processing">
                              Processing
                            </option>

                            <option value="Shipped">
                              Shipped
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        <div className="mt-6">
          <Link
            href="/admin"
            className="text-pink-600 hover:underline"
          >
            ← Back to Admin Dashboard
          </Link>
        </div>

      </div>
    </div>
  );
}