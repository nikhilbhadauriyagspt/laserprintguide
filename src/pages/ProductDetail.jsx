import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import SEO from "@/components/SEO";

import { useCart } from "../context/CartContext";

import Heart from "lucide-react/dist/esm/icons/heart";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Truck from "lucide-react/dist/esm/icons/truck";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import RefreshCcw from "lucide-react/dist/esm/icons/refresh-ccw";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import CheckCircle from "lucide-react/dist/esm/icons/check-circle";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

import { motion, AnimatePresence } from "framer-motion";

import API_BASE_URL from "../config";
import { cn } from "../lib/utils";

export default function ProductDetail() {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    openCartDrawer,
  } = useCart();

  const { slug } = useParams();

  const [product, setProduct] = useState(null);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(0);

  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setIsAdded(true);

    openCartDrawer();

    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setProduct(data.data);

          const categories = data.data.categories || [];

          const categorySlug =
            categories.length > 0 ? categories[0].slug : "";

          let fetchUrl = `${API_BASE_URL}/products?limit=10`;

          if (categorySlug) {
            fetchUrl += `&category=${categorySlug}`;
          }

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === "success") {
                setRelatedProducts(
                  relData.data.filter(
                    (p) => p.id !== data.data.id
                  )
                );
              }
            });
        }

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs =
        typeof images === "string"
          ? JSON.parse(images)
          : images;

      return Array.isArray(imgs)
        ? imgs.map((img) =>
            img.startsWith("http") ? img : `/${img}`
          )
        : [];
    } catch (e) {
      return [];
    }
  };

  const getImagePath = (images) => {
    try {
      const imgs =
        typeof images === "string"
          ? JSON.parse(images)
          : images;

      if (Array.isArray(imgs) && imgs.length > 0) {
        const img = imgs[0];

        return img.startsWith("http")
          ? img
          : `/${img}`;
      }
    } catch (e) {}

    return "https://via.placeholder.com/500x500?text=Product";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb]">
        <Loader2
          className="mb-5 h-10 w-10 animate-spin text-blue-700"
          strokeWidth={1.5}
        />

        <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-400">
          Loading Product
        </p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#f7f8fb] px-6 text-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center bg-blue-50 text-blue-700">
          <ShoppingBag size={38} />
        </div>

        <h2 className="text-[36px] font-semibold tracking-tight text-slate-950">
          Product Not Found
        </h2>

        <Link
          to="/shop"
          className="mt-8 flex h-14 items-center justify-center gap-3 bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700"
        >
          Return To Shop
          <ArrowRight size={17} />
        </Link>
      </div>
    );
  }

  const images = getImages(product.images);

  const mainImage =
    images.length > 0
      ? images[activeImage]
      : "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div className="bg-[#f7f8fb] pt-28 pb-20">
      <SEO
        title={`${product.name} |  Laser Print Guide`}
        description={product.description?.substring(0, 160)}
      />

      <div className="mx-auto max-w-[1750px] px-4 md:px-8 lg:px-10">
        {/* BREADCRUMB */}
        <div className="mb-10 flex items-center gap-2 overflow-hidden whitespace-nowrap text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
          <Link
            to="/"
            className="transition hover:text-blue-700"
          >
            Home
          </Link>

          <ChevronRight size={13} />

          <Link
            to="/shop"
            className="transition hover:text-blue-700"
          >
            Shop
          </Link>

          <ChevronRight size={13} />

          <span className="truncate text-blue-700">
            {product.name}
          </span>
        </div>

        {/* MAIN */}
        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[700px_minmax(0,1fr)] xl:gap-20">
          {/* LEFT */}
          <div>
            {/* MAIN IMAGE */}
            <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-white p-10 shadow-[0_18px_55px_rgba(15,23,42,0.06)] md:p-16">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.04 }}
                  transition={{ duration: 0.3 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                />
              </AnimatePresence>

              {/* WISHLIST */}
              <button
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "absolute right-6 top-6 flex h-12 w-12 items-center justify-center transition",
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white"
                    : "bg-white text-slate-400 shadow-sm hover:text-red-500"
                )}
              >
                <Heart
                  size={20}
                  fill={
                    isInWishlist(product.id)
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>
            </div>

            {/* THUMBNAILS */}
            {images.length > 1 && (
              <div className="mt-5 flex flex-wrap gap-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "flex h-24 w-24 items-center justify-center bg-white p-3 transition",
                      activeImage === idx
                        ? "border-2 border-blue-700"
                        : "border border-slate-100 hover:border-blue-200"
                    )}
                  >
                    <img
                      src={img}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            {/* TITLE */}
            <div>
              

              <h1 className="mt-4 text-[36px]  leading-[1.08] tracking-tight text-slate-950 md:text-[45px]">
                {product.name}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-5">
                <h2 className="text-[32px]  leading-none tracking-tight text-slate-950 md:text-[40px]">
                  $
                  {parseFloat(product.price).toLocaleString()}
                </h2>

                
              </div>
            </div>

            {/* DESCRIPTION */}
            <div className="bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.05)] md:p-10">
              <p className="text-[16px] leading-8 text-slate-600">
                {product.description ||
                  "Professional printing solution designed for smooth workflow, high-quality output, and reliable daily performance."}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="space-y-6">
              <div className="flex flex-col gap-4 sm:flex-row">
                {/* QUANTITY */}
                <div className="flex h-16 items-center border border-slate-200 bg-white px-2">
                  <button
                    onClick={() =>
                      setQuantity(Math.max(1, quantity - 1))
                    }
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                  >
                    <Minus size={18} />
                  </button>

                  <div className="flex w-14 items-center justify-center text-[17px] font-semibold text-slate-950">
                    {quantity}
                  </div>

                  <button
                    onClick={() =>
                      setQuantity(quantity + 1)
                    }
                    className="flex h-12 w-12 items-center justify-center text-slate-600 transition hover:bg-slate-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* CART */}
                <button
                  onClick={handleAddToCart}
                  disabled={isAdded}
                  className={cn(
                    "flex h-16 flex-1 items-center justify-center gap-3 text-[14px] font-medium text-white transition",
                    isAdded
                      ? "bg-emerald-600"
                      : "bg-slate-950 hover:bg-blue-700"
                  )}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle size={20} />
                      Added To Cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} />
                      Add To Cart
                    </>
                  )}
                </button>
              </div>

              {/* FEATURES */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: Truck,
                    title: "Fast Delivery",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Secure Checkout",
                  },
                  {
                    icon: RefreshCcw,
                    title: "Reliable Products",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex h-14 items-center justify-center gap-3 bg-white text-[7px] 2xl:text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500 shadow-sm"
                  >
                    <item.icon
                      size={17}
                      className="text-blue-700"
                    />

                    {item.title}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RELATED */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 border-t border-slate-100 pt-20">
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Related Collection
                </span>

                <h2 className="mt-4 text-[38px] font-semibold tracking-tight text-slate-950 md:text-[52px]">
                  Similar Products
                </h2>
              </div>

              <Link
                to="/shop"
                className="inline-flex items-center gap-3 text-[13px] font-semibold uppercase tracking-[0.16em] text-slate-600 transition hover:text-blue-700"
              >
                View All Products
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-5">
              {relatedProducts
                .slice(0, 5)
                .map((p, index) => (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                  >
                    <Link to={`/product/${p.slug}`}>
                      <div className="flex aspect-square items-center justify-center p-5">
                        <img
                          src={getImagePath(p.images)}
                          alt={p.name}
                          className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105"
                        />
                      </div>

                      <div className="pt-5">
                       

                        <h3 className="mt-2 line-clamp-2 min-h-[44px] text-[15px] font-medium leading-6 text-slate-900 transition group-hover:text-blue-700">
                          {p.name}
                        </h3>

                        <p className="mt-4 text-[24px] font-semibold leading-none text-slate-950">
                          $
                          {parseFloat(
                            p.price
                          ).toLocaleString()}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}