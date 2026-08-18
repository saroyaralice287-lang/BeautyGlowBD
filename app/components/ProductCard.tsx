"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext"

export default function ProductCard({ product }: any) {
  const { addToWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={240}
        className="w-full h-60 object-cover rounded-xl"
      />

      <h2 className="text-xl font-bold mt-4">
        {product.name}
      </h2>

      <p className="text-pink-600 font-semibold mt-2">
        {product.price}
      </p>

      <div className="flex mt-3 text-yellow-400">
        ⭐⭐⭐⭐⭐
      </div>

      <div className="flex gap-3 mt-5 flex-wrap">
        <button
  onClick={() => addToCart(product)}
  className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700"
>
  Add Cart
</button>

        <button
  onClick={() => {
    console.log("Wishlist clicked", product);

    addToWishlist({
      id: String(product._id || product.id),
      name: product.name,
      price: String(product.price),
    });
  }}
  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
>
  ❤️ Wishlist
</button>

        <Link href={`/products/${product.id}`}>
          <button className="border border-pink-600 text-pink-600 px-4 py-2 rounded-lg hover:bg-pink-50">
            Details
          </button>
        </Link>
      </div>
    </div>
  );
}