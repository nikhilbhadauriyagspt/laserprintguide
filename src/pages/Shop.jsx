import { useState, useEffect } from "react";
import { useSearchParams, Link, useParams, useNavigate } from "react-router-dom";
import SEO from "@/components/SEO";
import { useCart } from "../context/CartContext";
import X from "lucide-react/dist/esm/icons/x";
import Heart from "lucide-react/dist/esm/icons/heart";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import Filter from "lucide-react/dist/esm/icons/filter";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import SlidersHorizontal from "lucide-react/dist/esm/icons/sliders-horizontal";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import { motion, AnimatePresence } from "framer-motion";
import API_BASE_URL from "../config";
import { cn } from "../lib/utils";
import { useGlobal } from "../context/GlobalContext";

export default function Shop() {
  const { addToCart, toggleWishlist, isInWishlist, openCartDrawer } = useCart();
  const {
    categories: globalCategories,
    products: globalProducts,
    loading: globalLoading,
  } = useGlobal();

  const { category: pathCategory } = useParams();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const category = searchParams.get("category") || pathCategory || "";
  const sort = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || "";

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    openCartDrawer();
  };

  const categories = globalCategories
    .flatMap((parent) => [parent, ...(parent.children || [])])
    .filter((cat) => {
      const name = cat.name?.toLowerCase() || "";
      const slug = cat.slug?.toLowerCase() || "";
      return (
        !name.includes("laptop") &&
        !slug.includes("laptop") &&
        !name.includes("computer") &&
        !slug.includes("computer") &&
        !name.includes("pc") &&
        !slug.includes("pc")
      );
    })
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i);

  useEffect(() => {
    if (pathCategory) {
      navigate(`/shop?category=${pathCategory}`, { replace: true });
      return;
    }

    if (!globalLoading && globalProducts.length > 0 && !search) {
      let filtered = globalProducts.filter(
        (p) => !p.name.toLowerCase().includes("laptop")
      );

      if (category) {
        filtered = filtered.filter((p) => {
          const pSlug = p.category_slug || "";
          const pId = p.category_id || "";
          const pCats = p.categories || [];

          return (
            pSlug === category ||
            pId == category ||
            pCats.some((c) => c.slug === category || c.id == category)
          );
        });
      }

      if (filtered.length > 0 || !category) {
        if (sort === "price_low")
          filtered.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        if (sort === "price_high")
          filtered.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        if (sort === "name_asc")
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "newest") filtered.reverse();

        setProducts(filtered);
        setLoading(false);
        return;
      }
    }

    setLoading(true);

    const params = new URLSearchParams(searchParams);
    params.set("limit", "1000");

    fetch(`${API_BASE_URL}/products?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          const filteredProducts = data.data.filter(
            (p) => !p.name.toLowerCase().includes("laptop")
          );
          setProducts(filteredProducts);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [
    searchParams,
    pathCategory,
    navigate,
    globalLoading,
    globalProducts,
    category,
    sort,
    search,
  ]);

  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (value) newParams.set(key, value);
    else newParams.delete(key);

    newParams.set("page", "1");
    setSearchParams(newParams);

    if (isMobileFilterOpen) setIsMobileFilterOpen(false);
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === "string" ? JSON.parse(images) : images;

      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];
        return img.startsWith("http") ? img : `/${img.replace(/\\/g, "/")}`;
      }
    } catch (e) {}

    return "https://via.placeholder.com/400x400?text=Product";
  };

  const getThumbnailPath = (images) => {
    const original = getImagePath(images);

    if (original.includes("placeholder") || original.startsWith("http")) {
      return original;
    }

    return original.replace(/\.png$/, "-300x300.png");
  };

  const activeCategoryName = category
    ? categories.find((c) => c.slug === category)?.name || "Collection"
    : "All Products";

  const sortOptions = [
    { val: "newest", label: "Newest First" },
    { val: "price_low", label: "Price: Low-High" },
    { val: "price_high", label: "Price: High-Low" },
    { val: "name_asc", label: "Alphabetical" },
  ];

  return (
    <div className="min-h-screen bg-[#f7f8fb]">
      <SEO
        title="Shop Printers & Supplies | Laser Print Guide"
        description="Browse high-quality printers and accessories for home, office, and daily printing needs."
      />

      {/* HEADER */}
      <section className="bg-white px-4 py-10 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1850px]">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[12px] font-medium text-slate-500">
                <Link to="/" className="hover:text-blue-700">
                  Home
                </Link>
                <ChevronRight size={14} />
                <span className="text-blue-700">Shop</span>
              </div>

              <h1 className="text-[32px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
                {activeCategoryName}
              </h1>

              <p className="mt-3 max-w-[620px] text-[15px] leading-7 text-slate-600">
                Browse reliable printers, supplies, and accessories for home,
                office, and everyday printing needs.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-[13px] font-medium text-blue-700">
                {products.length} Items
              </span>

              <div className="flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4">
                <SlidersHorizontal size={15} className="text-slate-400" />
                <select
                  value={sort}
                  onChange={(e) => updateFilter("sort", e.target.value)}
                  className="bg-transparent text-[13px] font-medium text-slate-700 outline-none"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.val} value={opt.val}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-4 py-10 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1850px] grid-cols-1 gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-white p-5 shadow-[0_10px_35px_rgba(15,23,42,0.06)]">
              <h2 className="mb-5 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Categories
              </h2>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => updateFilter("category", "")}
                  className={cn(
                    "w-full px-4 py-3 text-left text-[14px] font-medium transition",
                    !category
                      ? "bg-slate-950 text-white"
                      : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  All Products
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => updateFilter("category", cat.slug)}
                    className={cn(
                      "w-full px-4 py-3 text-left text-[14px] font-medium transition",
                      category === cat.slug
                        ? "bg-slate-950 text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-700"
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* PRODUCTS */}
          <main>
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="mb-6 flex h-12 w-full items-center justify-center gap-2 bg-slate-950 text-[14px] font-medium text-white lg:hidden"
            >
              <Filter size={17} />
              Filter Products
            </button>

            {loading ? (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-[330px] animate-pulse bg-white shadow-sm"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {products.map((p, index) => (
                  <Link
                    to={`/product/${p.slug}`}
                    key={p.id || index}
                    className="group bg-white p-3 shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
                  >
                    <div className="relative flex h-[180px] items-center justify-center  p-4 md:h-[220px]">
                      <img
                        src={getThumbnailPath(p.images)}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getImagePath(p.images);
                        }}
                        alt={p.name}
                        width="230"
                        height="230"
                        loading={index < 5 ? "eager" : "lazy"}
                        fetchPriority={index === 0 ? "high" : "auto"}
                        decoding="async"
                        className="max-h-full max-w-full object-contain transition duration-300 group-hover:scale-105"
                      />

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(p);
                        }}
                        aria-label="Add to wishlist"
                        className={cn(
                          "absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-white shadow-sm transition",
                          isInWishlist(p.id)
                            ? "text-red-500"
                            : "text-slate-500 hover:text-red-500"
                        )}
                      >
                        <Heart
                          size={17}
                          fill={isInWishlist(p.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    <div className="pt-4">
                      <h3 className="line-clamp-2 min-h-[44px] text-[15px] font-medium leading-snug text-slate-800 md:text-[16px]">
                        {p.name}
                      </h3>

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

                      <button
                        onClick={(e) => handleAddToCart(e, p)}
                        className="mt-4 flex h-10 w-full items-center justify-center gap-2 bg-slate-950 text-[13px] font-medium text-white transition hover:bg-blue-700"
                      >
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </main>
        </div>
      </section>

      {/* MOBILE FILTER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="fixed inset-0 z-[500] bg-black/40"
            />

            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="fixed bottom-0 left-0 right-0 z-[510] max-h-[82vh] overflow-hidden bg-white"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <h3 className="text-[18px] font-semibold text-slate-950">
                  Filter By Category
                </h3>

                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  aria-label="Close filters"
                  className="flex h-10 w-10 items-center justify-center bg-slate-100"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="max-h-[65vh] overflow-y-auto p-5">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => updateFilter("category", "")}
                    className={cn(
                      "w-full px-4 py-3 text-left text-[14px] font-medium",
                      !category
                        ? "bg-slate-950 text-white"
                        : "bg-slate-50 text-slate-600"
                    )}
                  >
                    All Products
                  </button>

                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateFilter("category", cat.slug)}
                      className={cn(
                        "w-full px-4 py-3 text-left text-[14px] font-medium",
                        category === cat.slug
                          ? "bg-slate-950 text-white"
                          : "bg-slate-50 text-slate-600"
                      )}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}