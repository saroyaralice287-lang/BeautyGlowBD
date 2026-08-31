import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 bg-[#111111] text-white">

      {/* Trust Bar */}
      <div className="border-b border-white/10 bg-[#1a1a1a]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-6 sm:grid-cols-4 sm:px-6 lg:px-8">

          <div className="text-center">
            <div className="text-2xl">🚚</div>
            <p className="mt-2 text-sm font-semibold">Fast Delivery</p>
            <p className="mt-1 text-xs text-gray-400">
              Across Bangladesh
            </p>
          </div>

          <div className="text-center">
            <div className="text-2xl">🔒</div>
            <p className="mt-2 text-sm font-semibold">Secure Payment</p>
            <p className="mt-1 text-xs text-gray-400">
              100% Secure Checkout
            </p>
          </div>

          <div className="text-center">
            <div className="text-2xl">💎</div>
            <p className="mt-2 text-sm font-semibold">Quality Products</p>
            <p className="mt-1 text-xs text-gray-400">
              Carefully Selected
            </p>
          </div>

          <div className="text-center">
            <div className="text-2xl">💬</div>
            <p className="mt-2 text-sm font-semibold">Customer Support</p>
            <p className="mt-1 text-xs text-gray-400">
              We're Here For You
            </p>
          </div>

        </div>
      </div>

      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">

        {/* Brand */}
        <div>
          <Link href="/" className="inline-block">
            <Image
              src="/images/qyvano-logo.png"
              alt="QYVANO A²Z"
              width={210}
              height={110}
              className="h-auto w-[185px] object-contain"
            />
          </Link>

          <p className="mt-5 max-w-sm text-sm leading-7 text-gray-400">
            Your trusted destination for beauty, skincare, makeup,
            perfume, hair care and lifestyle essentials.
          </p>

          <p className="mt-5 text-sm font-semibold text-pink-300">
            ✨ Everything You Need, From A to Z
          </p>

          {/* Social */}
          <div className="mt-6 flex gap-3">
            {["Facebook", "Instagram", "TikTok", "WhatsApp"].map(
              (social) => (
                <a
                  key={social}
                  href="#"
                  className="flex h-9 items-center rounded-full border border-white/10 bg-white/5 px-3 text-xs text-gray-400 transition hover:border-pink-500 hover:bg-pink-500 hover:text-white"
                >
                  {social}
                </a>
              )
            )}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h3 className="mb-5 text-base font-bold">
            Shop
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <Link
                href="/"
                className="transition hover:text-pink-300"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="transition hover:text-pink-300"
              >
                All Products
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="transition hover:text-pink-300"
              >
                Skincare
              </Link>
            </li>

            <li>
              <Link
                href="/products"
                className="transition hover:text-pink-300"
              >
                Makeup
              </Link>
            </li>

            <li>
              <Link
                href="/wishlist"
                className="transition hover:text-pink-300"
              >
                Wishlist
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className="transition hover:text-pink-300"
              >
                Shopping Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="mb-5 text-base font-bold">
            Help & Support
          </h3>

          <ul className="space-y-3 text-sm text-gray-400">
            <li>🚚 Delivery Information</li>
            <li>↩️ Return & Refund</li>
            <li>🔐 Privacy Policy</li>
            <li>📄 Terms & Conditions</li>
            <li>❓ Help Center</li>
            <li>💬 Customer Support</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-5 text-base font-bold">
            Contact Us
          </h3>

          <ul className="space-y-4 text-sm text-gray-400">
            <li>
              <span className="mr-2">📞</span>
              +880 1703-500196
            </li>

            <li>
              <span className="mr-2">📧</span>
              asif@qyvanoaz.com
            </li>

            <li>
              <span className="mr-2">📍</span>
              Bangladesh
            </li>

            <li>
              <span className="mr-2">🕘</span>
              Sat – Thu: 10 AM – 9 PM
            </li>
          </ul>

          {/* Payment */}
          <div className="mt-7">
            <p className="mb-3 text-sm font-semibold text-gray-200">
              Secure Payment
            </p>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-md bg-pink-600 px-3 py-1.5 text-xs font-semibold">
                bKash
              </span>

              <span className="rounded-md bg-orange-500 px-3 py-1.5 text-xs font-semibold">
                Nagad
              </span>

              <span className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold">
                VISA
              </span>

              <span className="rounded-md bg-purple-600 px-3 py-1.5 text-xs font-semibold">
                Mastercard
              </span>

              <span className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold">
                COD
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 sm:px-6 md:flex-row lg:px-8">

          <p className="text-center text-xs text-gray-500 md:text-left">
            © 2026 QYVANO A²Z. All Rights Reserved.
          </p>

          <p className="text-xs text-gray-500">
            Made with ❤️ for beauty lovers
          </p>

        </div>
      </div>

    </footer>
  );
}