import React from "react";
import { Link } from "react-router-dom";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Heart from "lucide-react/dist/esm/icons/heart";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

export default function ProductShowcase({
  products = [],
  arrivals = [],
  loading = false,
}) {
  const { addToCart, openCartDrawer, toggleWishlist, isInWishlist } = useCart();

  const featuredProducts = products.slice(0, 12);

  const getImagePath = (images) => {
    if (!images) return "https://via.placeholder.com/400x400?text=Product";

    try {
      const parsed = typeof images === "string" ? JSON.parse(images) : images;
      const img = Array.isArray(parsed) ? parsed[0] : parsed;

      if (!img) return "https://via.placeholder.com/400x400?text=Product";

      return img.startsWith("http") ? img : `/${img.replace(/\\/g, "/")}`;
    } catch (e) {
      return typeof images === "string" && images.startsWith("http")
        ? images
        : `/${String(images).replace(/\\/g, "/")}`;
    }
  };

  const getThumbnailPath = (images) => {
    const original = getImagePath(images);

    if (original.includes("placeholder") || original.startsWith("http")) {
      return original;
    }

    return original.replace(/\.png$/, "-300x300.png");
  };

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const handleToggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <section className="w-full bg-[#f7f8fb] px-4 py-12 md:px-6 lg:px-8">
      <div className="mx-auto max-w-[1850px]">
        {/* HEADER */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Featured Collection
            </span>

            <h2 className="mt-3 text-[30px] font-semibold tracking-tight text-slate-950 md:text-[42px]">
              Popular Printers
            </h2>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-blue-700"
          >
            View All Products
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="h-[330px] animate-pulse bg-white shadow-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {featuredProducts.map((p, i) => (
              <Link
                to={`/product/${p.slug}`}
                key={p.id || i}
                className="group bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
              >
                <div className="flex h-[180px] items-center justify-center  p-4 md:h-[210px]">
                  <img
                    src={getThumbnailPath(p.images)}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getImagePath(p.images);
                    }}
                    alt={p.name}
                    width="220"
                    height="220"
                    loading={i < 4 ? "eager" : "lazy"}
                    fetchPriority={i === 0 ? "high" : "auto"}
                    decoding="async"
                    className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="pt-4">
                  <h4 className="line-clamp-2 min-h-[44px] text-[15px] font-medium leading-snug text-slate-800 md:text-[16px]">
                    {p.name}
                  </h4>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="text-[22px] font-semibold leading-none text-slate-950">
                      ${p.price}
                    </span>

                    {p.original_price && (
                      <span className="text-[14px] text-red-400 line-through">
                        ${p.original_price}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      onClick={(e) => handleAddToCart(e, p)}
                      aria-label="Add to cart"
                      className="flex h-10 flex-1 items-center justify-center gap-2 bg-slate-950 text-[13px] font-medium text-white transition hover:bg-blue-700"
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => handleToggleWishlist(e, p)}
                      aria-label="Add to wishlist"
                      className={cn(
                        "flex h-10 w-10 items-center justify-center bg-slate-100 transition",
                        isInWishlist(p.id)
                          ? "text-red-500"
                          : "text-slate-500 hover:text-blue-700"
                      )}
                    >
                      <Heart
                        size={17}
                        fill={isInWishlist(p.id) ? "currentColor" : "none"}
                      />
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}