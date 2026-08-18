"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Customer = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch customers");
      }

      setCustomers(data);
    } catch (error) {
      console.error("FETCH CUSTOMERS ERROR:", error);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-pink-600">
            Manage Customers
          </h1>

          <p className="text-gray-500 mt-1">
            View registered customers.
          </p>
        </div>

        {loading ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              Loading customers...
            </p>
          </div>
        ) : customers.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <p className="text-gray-500">
              No customers found.
            </p>
          </div>
        ) : (
          <>
            {/* ================= MOBILE ================= */}
            <div className="grid gap-4 md:hidden">
              {customers.map((customer) => (
                <div
                  key={customer._id}
                  className="bg-white rounded-xl shadow p-4"
                >
                  <div className="mb-3">
                    <p className="text-sm text-gray-500">
                      Name
                    </p>

                    <p className="font-semibold break-words">
                      {customer.name}
                    </p>
                  </div>

                  <div className="mb-3">
                    <p className="text-sm text-gray-500">
                      Email
                    </p>

                    <p className="text-sm break-all">
                      {customer.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Registered
                    </p>

                    <p className="text-sm text-gray-700">
                      {new Date(
                        customer.createdAt
                      ).toLocaleDateString()}
                    </p>
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
                        Name
                      </th>

                      <th className="px-6 py-4">
                        Email
                      </th>

                      <th className="px-6 py-4">
                        Registered
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {customers.map((customer) => (
                      <tr
                        key={customer._id}
                        className="border-t"
                      >
                        <td className="px-6 py-4 font-medium">
                          {customer.name}
                        </td>

                        <td className="px-6 py-4 break-all">
                          {customer.email}
                        </td>

                        <td className="px-6 py-4 text-gray-500">
                          {new Date(
                            customer.createdAt
                          ).toLocaleDateString()}
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