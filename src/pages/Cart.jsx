import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Truck from "lucide-react/dist/esm/icons/truck";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";

import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const navigate = useNavigate();

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;

      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];

        return img.startsWith("http")
          ? img
          : `/${img.replace(/\\/g, "/")}`;
      }
    } catch (e) {}

    return "https://via.placeholder.com/400x400?text=Product";
  };

  const parsePrice = (price) => {
    if (typeof price === "string") {
      return parseFloat(price.replace(/[$,]/g, "")) || 0;
    }

    return parseFloat(price) || 0;
  };

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-4 py-12 md:px-8 lg:px-10 lg:py-16">
      <SEO title="Shopping Cart | Laser Print Guide" />

      <div className="mx-auto max-w-[1700px]">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Shopping Bag
            </span>

            <h1 className="mt-3 text-[38px] font-semibold tracking-tight text-slate-950 md:text-[54px]">
              Your Cart
            </h1>

            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              {cart.length} product{cart.length !== 1 ? "s" : ""} currently in
              your shopping bag.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex h-13 w-fit items-center justify-center gap-3 bg-slate-950 px-7 text-[13px] font-medium text-white transition hover:bg-blue-700"
          >
            Continue Shopping
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* EMPTY CART */}
        <AnimatePresence mode="wait">
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[520px] flex-col items-center justify-center bg-white px-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
                <ShoppingBag size={42} />
              </div>

              <h2 className="text-[32px] font-semibold tracking-tight text-slate-950">
                Your Cart Is Empty
              </h2>

              <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-slate-600">
                Looks like you haven’t added any printers or accessories to your
                cart yet.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex h-13 items-center justify-center gap-3 bg-slate-950 px-8 text-[13px] font-medium text-white transition hover:bg-blue-700"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
              {/* LEFT */}
              <div className="space-y-5">
                {cart.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      {/* IMAGE */}
                      <div className="flex h-[150px] w-full items-center justify-center bg-[#f3f6fb] p-4 md:w-[160px]">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* CONTENT */}
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {item.brand_name || "Premium Printer"}
                            </p>

                            <h2 className="mt-2 line-clamp-2 text-[18px] font-medium leading-7 text-slate-900">
                              {item.name}
                            </h2>

                            <p className="mt-4 text-[24px] font-semibold leading-none text-slate-950">
                              ${parsePrice(item.price).toLocaleString()}
                            </p>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="flex h-11 w-11 items-center justify-center bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>

                        {/* ACTIONS */}
                        <div className="mt-6 flex flex-col gap-5 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          {/* QUANTITY */}
                          <div className="flex items-center border border-slate-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                            >
                              <Minus size={15} />
                            </button>

                            <div className="flex h-11 w-12 items-center justify-center border-x border-slate-200 text-[15px] font-semibold text-slate-900">
                              {item.quantity}
                            </div>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                            >
                              <Plus size={15} />
                            </button>
                          </div>

                          {/* SUBTOTAL */}
                          <div className="text-left sm:text-right">
                            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              Subtotal
                            </p>

                            <p className="mt-2 text-[26px] font-semibold leading-none text-blue-700">
                              $
                              {(
                                parsePrice(item.price) * item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* CONTINUE */}
                <div className="flex justify-start pt-2">
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
                  >
                    <ChevronLeft size={16} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* RIGHT SUMMARY */}
              <div>
                <div className="sticky top-28 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)]">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center bg-blue-50 text-blue-700">
                      <ShoppingCart size={26} />
                    </div>

                    <div>
                      <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                        Order Summary
                      </p>

                      <h2 className="mt-1 text-[28px] font-semibold tracking-tight text-slate-950">
                        Cart Total
                      </h2>
                    </div>
                  </div>

                  {/* TOTALS */}
                  <div className="space-y-5 border-b border-slate-100 pb-6">
                    <div className="flex items-center justify-between text-[15px] text-slate-500">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-950">
                        ${(cartTotal || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[15px] text-slate-500">
                      <span>Shipping</span>
                      <span className="font-semibold text-emerald-600">
                        Free
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[15px] text-slate-500">
                      <span>Estimated Tax</span>
                      <span className="font-semibold text-slate-950">
                        $0.00
                      </span>
                    </div>
                  </div>

                  {/* FINAL */}
                  <div className="py-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                      Final Total
                    </p>

                    <h3 className="mt-3 text-[48px] font-semibold leading-none tracking-tight text-slate-950">
                      ${(cartTotal || 0).toLocaleString()}
                    </h3>
                  </div>

                  {/* BUTTON */}
                  <button
                    onClick={() => navigate("/checkout")}
                    className="flex h-14 w-full items-center justify-center gap-3 bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
                  >
                    Proceed To Checkout
                    <ArrowRight size={18} />
                  </button>

                  {/* FEATURES */}
                  <div className="mt-8 space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600">
                      <ShieldCheck size={17} className="text-blue-700" />
                      Secure Payments
                    </div>

                    <div className="flex items-center gap-3 text-[13px] font-medium text-slate-600">
                      <Truck size={17} className="text-blue-700" />
                      Free Standard Delivery
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}