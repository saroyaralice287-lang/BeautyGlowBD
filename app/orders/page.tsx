export default function OrdersPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-pink-600">
        My Orders
      </h1>

      <div className="mt-8 border rounded-lg p-6 shadow">
        <h2 className="text-2xl font-semibold">
          Order #1001
        </h2>

        <p className="mt-2">
          Product: Lipstick
        </p>

        <p>Price: ৳500</p>

        <p className="text-green-600 font-semibold mt-2">
          Status: Delivered
        </p>
      </div>
    </div>
  );
}