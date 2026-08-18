"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { cart } = useCart();
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const cartCount = cart.reduce(
    (sum: number, item: any) => sum + item.quantity,
    0
  );

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("/api/auth/me");

        if (response.ok) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        setLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    checkLogin();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setLoggedIn(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="p-4 shadow-md">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        
        <h1 className="text-2xl font-bold text-pink-600">
          BeautyGlowBD
        </h1>

        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
          <Link href="/">Home</Link>

          <Link href="/products">Shop</Link>

          <Link href="/about">About</Link>

          <Link href="/contact">Contact</Link>

          <Link href="/orders">Orders</Link>

          <Link
            href="/admin"
            className="text-purple-600 font-semibold"
          >
            Admin
          </Link>

          {!checkingAuth && !loggedIn && (
            <>
              <Link
                href="/login"
                className="text-pink-600 font-semibold"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-pink-600 font-semibold"
              >
                Register
              </Link>
            </>
          )}

          {!checkingAuth && loggedIn && (
            <button
              onClick={handleLogout}
              className="text-red-600 font-semibold"
            >
              Logout
            </button>
          )}

          <Link href="/cart">
            <button className="bg-pink-600 text-white px-3 py-2 rounded-lg hover:bg-pink-700">
              🛒 Cart ({cartCount})
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}