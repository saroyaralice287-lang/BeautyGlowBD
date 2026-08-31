"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

type Product = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  // Fix Invalid URL
  const imageSrc =
    product.image && product.image.startsWith("/")
      ? product.image
      : `/images/${product.image || "lipstick.jpg"}`;

  return (
    <div className="group overflow-hidden rounded-3xl border border-pink-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Product Image */}
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative h-64 w-full overflow-hidden bg-pink-50">
          <Image
            src={imageSrc}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-3 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-gray-800">
          {product.name}
        </h3>

        {product.description && (
          <p className="line-clamp-2 text-sm text-gray-500">
            {product.description}
          </p>
        )}

        <p className="text-xl font-bold text-pink-600">
          ৳{product.price}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => addToCart(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            onClick={() => addToWishlist(product)}
            className="rounded-xl border border-pink-200 p-2 text-pink-500 transition hover:bg-pink-50"
          >
            <Heart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}