"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

type User = {
  id: string;
  name: string;
  email: string;
};

type PaymentMethod =
  | "Cash on Delivery"
  | "bKash"
  | "Nagad"
  | "Debit / Credit Card";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, clearCart } = useCart();

  const [user, setUser] = useState<User | null>(null);

  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [payment, setPayment] =
    useState<PaymentMethod>("Cash on Delivery");

  const [transactionId, setTransactionId] = useState("");

  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ================================
     LOAD USER
  ================================= */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();

        if (!data.loggedIn || !data.user) {
          router.push("/login");
          return;
        }

        const loggedUser = data.user;

        setUser({
          id: String(loggedUser.id),
          name: loggedUser.name || "",
          email: loggedUser.email || "",
        });

        setCustomer(loggedUser.name || "");
        setEmail(loggedUser.email || "");
      } catch (error) {
        console.error("User loading error:", error);
        router.push("/login");
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, [router]);

  /* ================================
     PRICE
  ================================= */

  const getPrice = (price: any) => {
    if (typeof price === "string") {
      return Number(
        price.replace(/[৳$]/g, "").replace(/,/g, "")
      );
    }

    return Number(price);
  };

  const subtotal = cart.reduce(
    (sum: number, item: any) => {
      const price = getPrice(item.price);

      return sum + price * Number(item.quantity);
    },
    0
  );

  const delivery = 120;

  const total = subtotal + delivery;

  /* ================================
     PLACE ORDER
  ================================= */

  const handleOrder = async () => {
    if (!user) {
      alert("Please login before placing an order.");
      router.push("/login");
      return;
    }

    if (!customer.trim()) {
      alert("Please enter your full name.");
      return;
    }

    if (!phone.trim()) {
      alert("Please enter your phone number.");
      return;
    }

    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    /* ================================
       PAYMENT VALIDATION
    ================================= */

    if (
      payment === "bKash" ||
      payment === "Nagad"
    ) {
      if (!transactionId.trim()) {
        alert(
          `Please enter your ${payment} Transaction ID.`
        );
        return;
      }
    }

    if (payment === "Debit / Credit Card") {
      alert(
        "Card payment gateway will be connected later. Please use Cash on Delivery, bKash or Nagad for now."
      );
      return;
    }

    try {
      setLoading(true);

      const products = cart.map((item: any) => ({
        id: String(item.id),
        name: String(item.name),
        price: getPrice(item.price),
        image: item.image || "",
        quantity: Number(item.quantity),
      }));

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: customer.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          products,
          subtotal,
          delivery,
          total,
          payment,

          paymentNumber:
            payment === "bKash" ||
            payment === "Nagad"
              ? "01703500196"
              : "",

          transactionId:
            payment === "bKash" ||
            payment === "Nagad"
              ? transactionId.trim()
              : "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          alert(
            "Your login session has expired. Please login again."
          );

          router.push("/login");
          return;
        }

        alert(
          data.message || "Failed to place order."
        );

        return;
      }

      clearCart();
      setSuccess(true);
    } catch (error) {
      console.error("Order error:", error);

      alert(
        "Something went wrong while placing your order."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================================
     LOADING
  ================================= */

  if (loadingUser) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8fb]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading your account...
          </p>
        </div>
      </main>
    );
  }

  /* ================================
     SUCCESS
  ================================= */

  if (success) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fff8fb] px-4">
        <div className="w-full max-w-md rounded-[30px] border border-pink-100 bg-white p-8 text-center shadow-xl">
          <div className="text-6xl">
            🎉
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[4px] text-pink-600">
            QYVANO A²Z
          </p>

          <h1 className="mt-2 text-3xl font-extrabold text-gray-900">
            Order Placed!
          </h1>

          <p className="mt-3 leading-6 text-gray-500">
            Thank you{" "}
            <span className="font-semibold text-gray-800">
              {customer}
            </span>
            .
            <br />
            Your order has been received successfully.
          </p>

          <div className="mt-6 rounded-2xl bg-green-50 p-4 text-sm font-bold text-green-700">
            📦 Order Status: Pending
          </div>

          {(payment === "bKash" ||
            payment === "Nagad") && (
            <div className="mt-4 rounded-2xl bg-pink-50 p-4 text-left">
              <p className="text-xs font-semibold text-gray-500">
                Payment Method
              </p>

              <p className="mt-1 font-bold text-pink-600">
                {payment}
              </p>

              <p className="mt-3 text-xs font-semibold text-gray-500">
                Transaction ID
              </p>

              <p className="mt-1 font-bold text-gray-800">
                {transactionId}
              </p>
            </div>
          )}

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href="/account/orders"
              className="rounded-full border border-gray-200 py-3 font-bold text-gray-800 transition hover:border-pink-300 hover:bg-pink-50"
            >
              View My Orders
            </Link>

            <Link
              href="/products"
              className="rounded-full bg-black py-3 font-bold text-white transition hover:bg-pink-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  /* ================================
     EMPTY CART
  ================================= */

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f8f8] px-4">
        <div className="w-full max-w-md rounded-[30px] bg-white p-10 text-center shadow-sm">
          <div className="text-6xl">
            🛒
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-gray-500">
            Add products before going to checkout.
          </p>

          <Link
            href="/products"
            className="mt-6 inline-block rounded-full bg-black px-7 py-3 font-semibold text-white transition hover:bg-pink-600"
          >
            Shop Now →
          </Link>
        </div>
      </main>
    );
  }

  /* ================================
     PAYMENT OPTIONS
  ================================= */

  const paymentOptions = [
    {
      value: "Cash on Delivery" as PaymentMethod,
      icon: "💵",
      title: "Cash on Delivery",
      subtitle: "Pay when your order arrives",
      badge: "COD",
    },
    {
      value: "bKash" as PaymentMethod,
      icon: "📱",
      title: "bKash",
      subtitle: "Pay with bKash",
      badge: "Mobile Wallet",
    },
    {
      value: "Nagad" as PaymentMethod,
      icon: "📲",
      title: "Nagad",
      subtitle: "Pay with Nagad",
      badge: "Mobile Wallet",
    },
    {
      value: "Debit / Credit Card" as PaymentMethod,
      icon: "💳",
      title: "Debit / Credit Card",
      subtitle: "Card payment",
      badge: "Coming Soon",
    },
  ];

  /* ================================
     CHECKOUT
  ================================= */

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[4px] text-pink-600">
              QYVANO A²Z
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Secure Checkout
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Complete your order securely.
            </p>
          </div>

          <div className="hidden rounded-2xl bg-green-50 px-5 py-3 text-right sm:block">
            <p className="text-sm font-bold text-green-700">
              🛡️ 100% Secure
            </p>

            <p className="text-xs text-green-600">
              Your data is protected
            </p>
          </div>
        </div>

        {/* MAIN GRID */}

        <div className="grid items-start gap-6 lg:grid-cols-[1fr_420px]">

          {/* LEFT */}

          <div className="rounded-[30px] border border-pink-100 bg-white p-5 shadow-sm sm:p-8">

            {/* DELIVERY */}

            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">
                Delivery Information
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Enter your delivery details.
              </p>
            </div>

            <div className="mt-6 space-y-5">

              {/* NAME */}

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Full Name *
                </label>

                <input
                  type="text"
                  value={customer}
                  onChange={(e) =>
                    setCustomer(e.target.value)
                  }
                  placeholder="Enter your full name"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
                />
              </div>

              {/* EMAIL */}

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  readOnly
                  className="mt-2 w-full cursor-not-allowed rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4 text-gray-500 outline-none"
                />

                <p className="mt-1 text-xs text-gray-400">
                  Email is connected to your account.
                </p>
              </div>

              {/* PHONE */}

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  placeholder="01XXXXXXXXX"
                  className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
                />
              </div>

              {/* ADDRESS */}

              <div>
                <label className="text-sm font-bold text-gray-700">
                  Full Delivery Address *
                </label>

                <textarea
                  rows={4}
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                  placeholder="House, Road, Area, City..."
                  className="mt-2 w-full resize-none rounded-2xl border border-gray-200 px-4 py-4 outline-none transition focus:border-pink-400 focus:ring-4 focus:ring-pink-50"
                />

                <p className="mt-2 text-xs text-gray-400">
                  📍 Please provide complete address for delivery
                </p>
              </div>
            </div>

            {/* PAYMENT */}

            <div className="mt-9 border-t border-gray-100 pt-8">

              <h2 className="text-2xl font-extrabold text-gray-900">
                Payment Method
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Choose your preferred payment method.
              </p>

              <div className="mt-5 space-y-3">

                {paymentOptions.map((option) => {
                  const selected =
                    payment === option.value;

                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setPayment(option.value);
                        setTransactionId("");
                      }}
                      className={`flex w-full items-center justify-between rounded-2xl border-2 p-4 text-left transition ${
                        selected
                          ? "border-pink-500 bg-pink-50"
                          : "border-gray-100 bg-white hover:border-pink-200"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {option.icon}
                        </span>

                        <div>
                          <p className="font-bold text-gray-900">
                            {option.title}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {option.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="hidden rounded-full bg-pink-100 px-3 py-1 text-[10px] font-bold text-pink-600 sm:block">
                          {option.badge}
                        </span>

                        <span
                          className={`text-xl ${
                            selected
                              ? "text-pink-600"
                              : "text-gray-300"
                          }`}
                        >
                          {selected ? "●" : "○"}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* BKASH / NAGAD PAYMENT BOX */}

              {(payment === "bKash" ||
                payment === "Nagad") && (
                <div className="mt-5 rounded-2xl border-2 border-pink-200 bg-pink-50 p-5">

                  <div className="flex items-center gap-3">
                    <div className="text-3xl">
                      {payment === "bKash"
                        ? "📱"
                        : "📲"}
                    </div>

                    <div>
                      <p className="text-lg font-extrabold text-gray-900">
                        {payment} Payment
                      </p>

                      <p className="text-xs text-gray-500">
                        Manual payment
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl bg-white p-4">
                    <p className="text-xs font-semibold text-gray-500">
                      Send Money To
                    </p>

                    <p className="mt-1 text-2xl font-extrabold tracking-wide text-pink-600">
                      01703500196
                    </p>

                    <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                      <span className="text-sm font-semibold text-gray-500">
                        Amount
                      </span>

                      <span className="text-xl font-extrabold text-gray-900">
                        ৳{total.toLocaleString("en-BD")}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-4">
                    <p className="text-sm font-bold text-gray-800">
                      কীভাবে Payment করবেন?
                    </p>

                    <ol className="mt-2 space-y-1 text-xs leading-5 text-gray-600">
                      <li>
                        1. {payment} App খুলুন
                      </li>

                      <li>
                        2. Send Money নির্বাচন করুন
                      </li>

                      <li>
                        3. 01703500196 নম্বরে ৳
                        {total.toLocaleString("en-BD")} পাঠান
                      </li>

                      <li>
                        4. Payment সফল হলে Transaction ID নিন
                      </li>
                    </ol>
                  </div>

                  {/* TRANSACTION ID */}

                  <div className="mt-4">
                    <label className="text-sm font-bold text-gray-700">
                      Transaction ID *
                    </label>

                    <input
                      type="text"
                      value={transactionId}
                      onChange={(e) =>
                        setTransactionId(
                          e.target.value
                        )
                      }
                      placeholder="Enter Transaction ID"
                      className="mt-2 w-full rounded-2xl border border-pink-200 bg-white px-4 py-4 font-semibold outline-none transition focus:border-pink-500 focus:ring-4 focus:ring-pink-100"
                    />

                    <p className="mt-2 text-xs text-gray-500">
                      Payment করার পর পাওয়া Transaction ID এখানে লিখুন।
                    </p>
                  </div>
                </div>
              )}

              {/* COD INFO */}

              {payment === "Cash on Delivery" && (
                <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
                  <p className="text-sm font-bold text-green-700">
                    💵 Cash on Delivery
                  </p>

                  <p className="mt-1 text-xs leading-5 text-green-600">
                    আপনার অর্ডারটি ডেলিভারি হওয়ার সময়
                    পেমেন্ট করবেন।
                  </p>
                </div>
              )}

              {/* CARD INFO */}

              {payment === "Debit / Credit Card" && (
                <div className="mt-5 rounded-2xl border border-yellow-100 bg-yellow-50 p-4">
                  <p className="text-sm font-bold text-yellow-700">
                    💳 Card Payment Coming Soon
                  </p>

                  <p className="mt-1 text-xs leading-5 text-yellow-600">
                    Card payment gateway এখনো connected হয়নি।
                    আপাতত COD, bKash অথবা Nagad ব্যবহার করুন।
                  </p>
                </div>
              )}

              {/* SECURITY */}

              <div className="mt-5 rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-sm font-bold text-green-700">
                  🔒 আপনার পেমেন্ট নিরাপদ
                </p>

                <p className="mt-1 text-xs text-green-600">
                  Your payment information is secure.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="lg:sticky lg:top-6">

            <div className="rounded-[30px] border border-pink-100 bg-white p-6 shadow-sm">

              <h2 className="text-2xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              {/* PRODUCTS */}

              <div className="mt-6 space-y-4">

                {cart.map((item: any) => {
                  const price = getPrice(item.price);

                  return (
                    <div
                      key={String(item.id)}
                      className="flex gap-3"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-pink-50">
                        <Image
                          src={
                            item.image ||
                            "/images/lipstick.jpg"
                          }
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-bold text-gray-800">
                          {item.name}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <p className="text-sm font-extrabold text-pink-600">
                        ৳
                        {(
                          price *
                          Number(item.quantity)
                        ).toLocaleString("en-BD")}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* PRICE */}

              <div className="mt-6 space-y-4 border-t border-gray-100 pt-6">

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-bold text-gray-800">
                    ৳{subtotal.toLocaleString("en-BD")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Delivery Charge
                  </span>

                  <span className="font-bold text-green-600">
                    ৳{delivery}
                  </span>
                </div>
              </div>

              {/* DELIVERY INFO */}

              <div className="mt-5 rounded-2xl bg-green-50 p-4">
                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-sm font-bold text-green-700">
                      🚚 Delivery Charge
                    </p>

                    <p className="mt-1 text-xs text-green-600">
                      Standard delivery
                    </p>
                  </div>

                  <p className="font-extrabold text-green-700">
                    ৳{delivery}
                  </p>
                </div>
              </div>

              {/* TOTAL */}

              <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-6">

                <span className="text-lg font-extrabold text-gray-900">
                  Total
                </span>

                <span className="text-3xl font-extrabold text-pink-600">
                  ৳{total.toLocaleString("en-BD")}
                </span>
              </div>

              {/* SELECTED PAYMENT */}

              <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs text-gray-400">
                  Selected Payment
                </p>

                <p className="mt-1 text-sm font-bold text-gray-800">
                  {payment}
                </p>

                {(payment === "bKash" ||
                  payment === "Nagad") && (
                  <p className="mt-1 text-xs font-semibold text-pink-600">
                    Number: 01703500196
                  </p>
                )}
              </div>

              {/* PLACE ORDER */}

              <button
                type="button"
                onClick={handleOrder}
                disabled={loading}
                className="mt-6 w-full rounded-full bg-pink-600 py-4 text-base font-extrabold text-white shadow-lg shadow-pink-100 transition hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Placing Order..."
                  : `🔒 Place Order — ৳${total.toLocaleString(
                      "en-BD"
                    )}`}
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs font-semibold text-green-600">
                  🛡️ Secure & trusted checkout
                </p>

                <p className="mt-1 text-[11px] text-gray-400">
                  We protect your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BENEFITS */}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">

          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <div className="text-2xl">
              🚚
            </div>

            <p className="mt-2 font-bold text-gray-800">
              দ্রুত ডেলিভারি
            </p>

            <p className="text-xs text-gray-500">
              সারা বাংলাদেশে
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <div className="text-2xl">
              🛡️
            </div>

            <p className="mt-2 font-bold text-gray-800">
              নিরাপদ পেমেন্ট
            </p>

            <p className="text-xs text-gray-500">
              100% সুরক্ষিত
            </p>
          </div>

          <div className="rounded-2xl bg-white p-5 text-center shadow-sm">
            <div className="text-2xl">
              🎧
            </div>

            <p className="mt-2 font-bold text-gray-800">
              সাপোর্ট
            </p>

            <p className="text-xs text-gray-500">
              24/7 সাহায্য
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}