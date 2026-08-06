import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold text-green-600">
        🎉 Order Placed Successfully!
      </h1>

      <p className="mt-4 text-gray-600">
        Thank you for shopping with BeautyGlowBD.
      </p>

      <Link href="/">
        <button className="mt-6 bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700">
          Back to Home
        </button>
      </Link>
    </div>
  );
}