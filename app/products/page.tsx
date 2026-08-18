"use client";

import { useCart } from "../context/CartContext";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
      </div>
    );
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {cart.map((item: any) => (
        <div
          key={item.id}
          className="border rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-xl font-semibold">{item.name}</h2>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="bg-gray-500 text-white px-3 py-1 rounded"
            >
              -
            </button>

            <button
              onClick={() => increaseQuantity(item.id)}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}