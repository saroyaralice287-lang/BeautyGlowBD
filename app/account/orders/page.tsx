"use client";

export default function MyOrdersPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-2 text-3xl font-bold">
          My Orders
        </h1>

        <p className="mb-8 text-gray-600">
          Here you can view and track your orders.
        </p>

        <div className="rounded-xl bg-white p-8 text-center shadow">
          <div className="mb-3 text-5xl">📦</div>

          <h2 className="text-xl font-bold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-gray-600">
            Your orders will appear here after you place an order.
          </p>
        </div>
      </div>
    </div>
  );
}