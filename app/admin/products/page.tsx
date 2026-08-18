"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // Load products from MongoDB
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
    setPrice("");
    setStock("");
    setDescription("");
    setImage("");
    setEditingId(null);
    setShowForm(false);
  };

  // Add Product
  const addProduct = async () => {
    if (!name || !price || !stock || !description || !image) {
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
    setPrice(product.price.toString());
    setStock(product.stock.toString());
    setDescription(product.description);
    setImage(product.image);
    setShowForm(true);
  };

  // Update Product
  const updateProduct = async () => {
    if (!name || !price || !stock || !description || !image || !editingId) {
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
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">
              Manage Products
            </h1>

            <p className="text-gray-500 mt-1">
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
            className="bg-pink-600 text-white px-5 py-3 rounded-lg hover:bg-pink-700"
          >
            {showForm ? "Close" : "+ Add Product"}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid gap-4">

              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <input
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="border p-3 rounded-lg"
              />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-3 rounded-lg"
                rows={4}
              />

              <input
                type="text"
                placeholder="Image path e.g. /images/lipstick.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="border p-3 rounded-lg"
              />

              {editingId ? (
                <button
                  onClick={updateProduct}
                  className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
                >
                  Update Product
                </button>
              ) : (
                <button
                  onClick={addProduct}
                  className="bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700"
                >
                  Add Product
                </button>
              )}
            </div>
          </div>
        )}

        {/* Products */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
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
                    <th className="px-3 py-2">Price</th>
                    <th className="px-3 py-2">Stock</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="border-t">

                      <td className="px-6 py-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium">
                            {product.name}
                          </p>

                          <p className="text-sm text-gray-500 max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        ৳{product.price}
                      </td>

                      <td className="px-4 py-4">
                        {product.stock}
                      </td>

                      <td className="px-4 py-4">
  <div className="flex flex-col sm:flex-row gap-2">
    <button
      onClick={() => startEdit(product)}
      className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 whitespace-nowrap"
    >
      Edit
    </button>

    <button
      onClick={() => deleteProduct(product._id)}
      className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 whitespace-nowrap"
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