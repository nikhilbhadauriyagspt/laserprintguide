import React from "react";
import { Link } from "react-router-dom";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";

export default function ShopByCategory({ categories = [], loading = false }) {
  const blockedWords = ["laptop", "computer", "pc", "chromebook", "notebook"];

  const isAllowed = (item) => {
    const name = item.name?.toLowerCase() || "";
    const slug = item.slug?.toLowerCase() || "";
    return !blockedWords.some((word) => name.includes(word) || slug.includes(word));
  };

  const subcategories = categories
    .filter(isAllowed)
    .flatMap((parent) => parent.children || [])
    .filter(isAllowed)
    .slice(0, 10);

  const getImagePath = (image) => {
    if (!image) return "https://via.placeholder.com/300x300?text=Category";
    if (image.startsWith("http")) return image;
    return `/${String(image).replace(/\\/g, "/")}`;
  };

  return (
    <section className="w-full bg-[#f8fafc] px-4 py-16 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1800px]">
        
        {/* Header */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Shop By Category
            </span>

            <h2 className="mt-3 text-[30px] font-semibold tracking-tight text-slate-950 md:text-[42px]">
              Popular Printer Categories
            </h2>

            <p className="mt-3 max-w-[560px] text-[15px] leading-7 text-slate-600">
              Explore reliable printing products and accessories for home,
              office, and everyday needs.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-blue-700"
          >
            View All Categories
            <ArrowUpRight size={17} />
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-[230px] animate-pulse rounded-[28px] bg-white p-5 shadow-sm"
              >
                <div className="mx-auto h-[120px] w-[120px] rounded-3xl bg-slate-200" />
                <div className="mx-auto mt-6 h-4 w-28 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {subcategories.map((item) => (
              <Link
                key={item.id}
                to={`/shop?category=${item.slug}`}
                className="group  border border-slate-100 bg-white p-5 text-center shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.10)]"
              >
                <div className="mx-auto flex h-[135px] w-[135px] items-center justify-center rounded-[26px] ">
                  <img
                    src={getImagePath(item.image)}
                    alt={item.name}
                    width="135"
                    height="135"
                    loading="lazy"
                    decoding="async"
                    className="h-[210px] w-[210px] object-contain transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/135x135?text=${encodeURIComponent(
                        item.name
                      )}`;
                    }}
                  />
                </div>

                <h3 className="mt-5 text-[16px] font-semibold leading-snug text-slate-900 transition group-hover:text-blue-700">
                  {item.name}
                </h3>

                <p className="mt-2 text-[13px] text-slate-500">
                  Shop Now
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}