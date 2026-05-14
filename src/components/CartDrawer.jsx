import React from "react";
import { motion, AnimatePresence } from "framer-motion";

import X from "lucide-react/dist/esm/icons/x";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Truck from "lucide-react/dist/esm/icons/truck";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    isCartDrawerOpen,
    closeCartDrawer,
    cart,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

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

  const handleCheckout = () => {
    closeCartDrawer();
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {isCartDrawerOpen && (
        <>
          {/* OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCartDrawer}
            className="fixed inset-0 z-[500] bg-black/50 backdrop-blur-sm"
          />

          {/* DRAWER */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-[510] flex w-full max-w-[460px] flex-col bg-white shadow-[0_25px_80px_rgba(15,23,42,0.18)]"
          >
            {/* HEADER */}
            <div className="border-b border-slate-100 px-6 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                    Shopping Cart
                  </span>

                  <h2 className="mt-2 text-[30px] font-semibold tracking-tight text-slate-950">
                    Your Cart
                  </h2>

                  <p className="mt-2 text-[14px] text-slate-500">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)} item
                    {cart.length !== 1 ? "s" : ""} added.
                  </p>
                </div>

                <button
                  onClick={closeCartDrawer}
                  aria-label="Close cart"
                  className="flex h-11 w-11 items-center justify-center bg-slate-100 text-slate-600 transition hover:bg-slate-950 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-8 text-center">
                  <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
                    <ShoppingBag size={40} />
                  </div>

                  <h3 className="text-[30px] font-semibold tracking-tight text-slate-950">
                    Cart Is Empty
                  </h3>

                  <p className="mt-4 max-w-[280px] text-[15px] leading-8 text-slate-600">
                    Looks like you haven’t added any products to your cart yet.
                  </p>

                  <button
                    onClick={() => {
                      closeCartDrawer();
                      navigate("/shop");
                    }}
                    className="mt-8 inline-flex h-13 items-center justify-center bg-slate-950 px-8 text-[13px] font-medium text-white transition hover:bg-blue-700"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6 px-6 py-6">
                  {cart.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b border-slate-100 pb-6 last:border-0"
                    >
                      {/* IMAGE */}
                      <div className="flex h-[110px] w-[110px] shrink-0 items-center justify-center bg-[#f3f6fb] p-3">
                        <img
                          src={getImagePath(item.images)}
                          alt={item.name}
                          loading={index < 3 ? "eager" : "lazy"}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* INFO */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                              {item.brand_name || "Printer"}
                            </p>

                            <h4 className="mt-1 line-clamp-2 text-[15px] font-medium leading-6 text-slate-900">
                              {item.name}
                            </h4>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="text-slate-300 transition hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          {/* QUANTITY */}
                          <div className="flex items-center border border-slate-200">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-100 disabled:opacity-30"
                            >
                              <Minus size={14} />
                            </button>

                            <div className="flex h-10 w-10 items-center justify-center border-x border-slate-200 text-[14px] font-semibold text-slate-900">
                              {item.quantity}
                            </div>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="flex h-10 w-10 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* PRICE */}
                          <div className="text-right">
                            <p className="text-[13px] text-slate-400">
                              Total
                            </p>

                            <p className="text-[18px] font-semibold text-slate-950">
                              $
                              {(
                                parsePrice(item.price) * item.quantity
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            {cart.length > 0 && (
              <div className="border-t border-slate-100 bg-[#f7f8fb] px-6 py-6">
                {/* TOTAL */}
                <div className="mb-6">
                  <div className="mb-3 flex items-center justify-between text-[14px] text-slate-500">
                    <span>Subtotal</span>
                    <span>${(cartTotal || 0).toLocaleString()}</span>
                  </div>

                  <div className="mb-5 flex items-center justify-between text-[14px] text-slate-500">
                    <span>Shipping</span>
                    <span className="font-medium text-emerald-600">
                      Free
                    </span>
                  </div>

                  <div className="flex items-end justify-between border-t border-slate-200 pt-5">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                        Total Amount
                      </p>

                      <h3 className="mt-2 text-[34px] font-semibold leading-none text-slate-950">
                        ${(cartTotal || 0).toLocaleString()}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="flex h-14 w-full items-center justify-center gap-3 bg-slate-950 text-[14px] font-medium text-white transition hover:bg-blue-700"
                  >
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </button>

                  <Link
                    to="/cart"
                    onClick={closeCartDrawer}
                    className="flex h-14 w-full items-center justify-center gap-2 border border-slate-200 bg-white text-[14px] font-medium text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
                  >
                    View Full Cart
                    <ChevronRight size={17} />
                  </Link>
                </div>

                {/* FEATURES */}
                <div className="mt-6 flex items-center justify-center gap-6 border-t border-slate-200 pt-6">
                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
                    <ShieldCheck size={15} className="text-blue-700" />
                    Secure
                  </div>

                  <div className="flex items-center gap-2 text-[12px] font-medium text-slate-500">
                    <Truck size={15} className="text-blue-700" />
                    Fast Delivery
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}