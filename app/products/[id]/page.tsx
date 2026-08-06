import Image from "next/image";
import { notFound } from "next/navigation";

const products = {
  "1": {
    id: 1,
    name: "Lipstick",
    price: "৳500",
    image: "/images/lipstick.jpg",
    description: "Beautiful long-lasting lipstick.",
  },
  "2": {
    id: 2,
    name: "Face Cream",
    price: "৳800",
    image: "/images/facecream.jpg",
    description: "Soft and glowing face cream.",
  },
  "3": {
    id: 3,
    name: "Perfume",
    price: "৳1200",
    image: "/images/perfume.jpg",
    description: "Luxury long-lasting perfume.",
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const product = products[id as keyof typeof products];

  if (!product) {
    notFound();
  }

  return (
    <div className="p-10">
      <Image
        src={product.image}
        alt={product.name}
        width={300}
        height={300}
        className="rounded-lg"
      />

      <h1 className="text-3xl font-bold mt-5">{product.name}</h1>

      <p className="text-xl mt-2">{product.price}</p>

      <p className="mt-4">{product.description}</p>
    </div>
  );
}