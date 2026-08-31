"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  image: string;
};

const categories = [
  { name: "Skincare", slug: "skincare" },
  { name: "Makeup", slug: "makeup" },
  { name: "Hair Care", slug: "hair-care" },
  { name: "Perfume", slug: "perfume" },
  { name: "Sunscreen", slug: "sunscreen" },
  { name: "Face Wash", slug: "face-wash" },
  { name: "Ladies Bag", slug: "ladies-bag" },
  { name: "Sunglasses", slug: "sunglasses" },
  { name: "Ladies Dress", slug: "ladies-dress" },
  { name: "Ladies Jeans", slug: "ladies-jeans" },
  { name: "Ladies Pants", slug: "ladies-pants" },
  { name: "Borka & Abaya", slug: "borka-abaya" },
  { name: "Short Pant", slug: "short-pant" },
  { name: "Tops", slug: "tops" },
  { name: "Three Piece", slug: "three-piece" },
  { name: "Hijab", slug: "hijab" },
  { name: "Ladies Shoes", slug: "ladies-shoes" },
  { name: "Sandals", slug: "sandals" },
  { name: "Jewellery", slug: "jewellery" },
  { name: "Watches", slug: "watches" },
];

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      if (response.ok) {
        setProducts(data);
      } else {
        alert(data.message || "Failed to load products");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setName("");
    setCategory("");
    setPrice("");
    setStock("");
    setDescription("");
    setImage("");
    setEditingId(null);
    setShowForm(false);
  };

  // Add Product
  const addProduct = async () => {
    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description ||
      !image
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          stock: Number(stock),
          description,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to add product");
        return;
      }

      alert("Product added successfully!");

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  const startEdit = (product: Product) => {
    setEditingId(product._id);
    setName(product.name);
    setCategory(product.category || "");
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setDescription(product.description);
    setImage(product.image);
    setShowForm(true);
  };

  // Update Product
  const updateProduct = async () => {
    if (
      !name ||
      !category ||
      !price ||
      !stock ||
      !description ||
      !image ||
      !editingId
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(`/api/products/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          category,
          price: Number(price),
          stock: Number(stock),
          description,
          image,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to update product");
        return;
      }

      alert("Product updated successfully!");

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // Delete Product
  const deleteProduct = async (id: string) => {
    const confirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete product");
        return;
      }

      alert("Product deleted successfully!");

      await fetchProducts();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">
              Manage Products
            </h1>

            <p className="mt-1 text-gray-500">
              Add, edit and manage your products.
            </p>
          </div>

          <button
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="rounded-lg bg-pink-600 px-5 py-3 text-white hover:bg-pink-700"
          >
            {showForm ? "Close" : "+ Add Product"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="mb-4 rounded-xl bg-white p-4 shadow">
            <h2 className="mb-4 text-xl font-bold">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid gap-4">

              {/* Product Name */}
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-lg border p-3"
              />

              {/* Category */}
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border bg-white p-3"
              >
                <option value="">
                  Select Product Category
                </option>

                {categories.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>

              {/* Price */}
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="rounded-lg border p-3"
              />

              {/* Stock */}
              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="rounded-lg border p-3"
              />

              {/* Description */}
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="rounded-lg border p-3"
                rows={4}
              />

              {/* Image */}
              <input
                type="text"
                placeholder="Image path e.g. /images/lipstick.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="rounded-lg border p-3"
              />

              {/* Button */}
              {editingId ? (
                <button
                  onClick={updateProduct}
                  className="rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700"
                >
                  Update Product
                </button>
              ) : (
                <button
                  onClick={addProduct}
                  className="rounded-lg bg-pink-600 py-3 text-white hover:bg-pink-700"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="overflow-hidden rounded-xl bg-white shadow">
          <div className="overflow-x-auto">

            {loading ? (
              <p className="p-6 text-gray-500">
                Loading products...
              </p>
            ) : products.length === 0 ? (
              <p className="p-6 text-gray-500">
                No products found.
              </p>
            ) : (
              <table className="w-full text-left">

                <thead className="bg-pink-50">
                  <tr>
                    <th className="px-3 py-2">Image</th>
                    <th className="px-3 py-2">Product</th>
                    <th className="px-3 py-2">Category</th>
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Stock</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product._id}
                      className="border-t"
                    >

                      {/* Image */}
                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                      </td>

                      {/* Product */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="max-w-xs text-sm text-gray-500">
                            {product.description}
                          </p>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-3 py-4">
                        <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-600">
                          {categories.find(
                            (item) =>
                              item.slug === product.category
                          )?.name || product.category || "—"}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4">
                        ৳{product.price}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4">
                        {product.stock}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-2 sm:flex-row">
                          <button
                            onClick={() => startEdit(product)}
                            className="whitespace-nowrap rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() =>
                              deleteProduct(product._id)
                            }
                            className="whitespace-nowrap rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>

        {/* Back */}
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