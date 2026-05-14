import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import Heart from "lucide-react/dist/esm/icons/heart";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Trash2 from "lucide-react/dist/esm/icons/trash-2";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

export default function Wishlist() {
  const {
    wishlist,
    toggleWishlist,
    addToCart,
    wishlistCount,
    openCartDrawer,
  } = useCart();

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    openCartDrawer();
  };

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

  return (
    <div className="min-h-screen bg-[#f7f8fb] px-4 py-12 md:px-8 lg:px-10 lg:py-16">
      <SEO title="Wishlist | Laser Print Guide" />

      <div className="mx-auto max-w-[1700px]">
        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Saved Collection
            </span>

            <h1 className="mt-3 text-[36px] font-semibold tracking-tight text-slate-950 md:text-[52px]">
              My Wishlist
            </h1>

            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              {wishlistCount} saved item
              {wishlistCount !== 1 ? "s" : ""} in your wishlist.
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

        {/* EMPTY */}
        <AnimatePresence mode="wait">
          {wishlistCount === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex min-h-[500px] flex-col items-center justify-center bg-white px-6 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)]"
            >
              <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
                <ShoppingBag size={42} />
              </div>

              <h2 className="text-[30px] font-semibold tracking-tight text-slate-950">
                Your Wishlist Is Empty
              </h2>

              <p className="mt-4 max-w-[520px] text-[15px] leading-8 text-slate-600">
                Save products you love and easily return to them later while
                exploring our printer collection.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex h-13 items-center justify-center gap-3 bg-slate-950 px-7 text-[13px] font-medium text-white transition hover:bg-blue-700"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            >
              {wishlist.map((p, index) => (
                <div
                  key={p.id}
                  className="group bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
                >
                  {/* IMAGE */}
                  <div className="relative flex h-[190px] items-center justify-center bg-[#f3f6fb] p-4 md:h-[220px]">
                    <img
                      src={getImagePath(p.images)}
                      alt={p.name}
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                    />

                    <button
                      onClick={() => toggleWishlist(p)}
                      aria-label="Remove from wishlist"
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center bg-white text-slate-500 shadow-sm transition hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* CONTENT */}
                  <div className="pt-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                      {p.brand_name || "Printer"}
                    </p>

                    <h3 className="mt-2 line-clamp-2 min-h-[44px] text-[15px] font-medium leading-snug text-slate-800 transition group-hover:text-blue-700 md:text-[16px]">
                      {p.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[22px] font-semibold leading-none text-slate-950">
                        ${parseFloat(p.price).toLocaleString()}
                      </span>
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-5 flex items-center gap-3">
                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="flex h-11 flex-1 items-center justify-center gap-2 bg-slate-950 text-[13px] font-medium text-white transition hover:bg-blue-700"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>

                      <button
                        onClick={() => toggleWishlist(p)}
                        className="flex h-11 w-11 items-center justify-center bg-slate-100 text-red-500 transition hover:bg-red-50"
                      >
                        <Heart size={18} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* BOTTOM */}
        {wishlistCount > 0 && (
          <div className="mt-14 flex flex-col gap-4 border-t border-slate-200 pt-8 md:flex-row md:items-center md:justify-between">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
            >
              <ChevronLeft size={16} />
              Continue Shopping
            </Link>

            <div className="flex items-center gap-3">
              <div className="flex h-12 items-center bg-white px-5 text-[14px] font-medium text-slate-700 shadow-sm">
                {wishlistCount} Item
                {wishlistCount !== 1 ? "s" : ""} Saved
              </div>

              <Link
                to="/shop"
                className="flex h-12 items-center justify-center bg-slate-950 px-6 text-[13px] font-medium text-white transition hover:bg-blue-700"
              >
                Explore More
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}