import Link from "next/link";

export default function CartButton() {
  return (
    <Link href="/cart">
      <button className="bg-green-600 text-white px-6 py-2 rounded-lg">
        Go to Cart
      </button>
    </Link>
  );
}