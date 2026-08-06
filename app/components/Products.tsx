"use client";

import ProductCard from "./ProductCard";

export default function Products() {
  const products = [
    {
      id: 1,
      name: "Lipstick",
      price: "৳500",
      image: "/images/lipstick.jpg",
    },
    {
      id: 2,
      name: "Face Cream",
      price: "৳800",
      image: "/images/facecream.jpg",
    },
    {
      id: 3,
      name: "Perfume",
      price: "৳1200",
      image: "/images/perfume.jpg",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}