import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../context/CartContext";
import Search from "lucide-react/dist/esm/icons/search";
import User from "lucide-react/dist/esm/icons/user";
import Heart from "lucide-react/dist/esm/icons/heart";
import ShoppingBag from "lucide-react/dist/esm/icons/shopping-bag";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import LogOut from "lucide-react/dist/esm/icons/log-out";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";
import { useGlobal } from "../context/GlobalContext";

export default function Header() {
  const { cartCount, wishlistCount, openCartDrawer } = useCart();
  const { categories: globalCategories, products: globalProducts } = useGlobal();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState({ products: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  const categories = globalCategories
    .flatMap((parent) => parent.children || [])
    .filter((cat) => !cat.name.toLowerCase().includes("laptop"));

  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim().length > 1 && globalProducts.length > 0) {
        setIsSearching(true);
        const filtered = globalProducts
          .filter((p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 5);

        setSuggestions({ products: filtered });
        setIsSearching(false);
      } else {
        setSuggestions({ products: [] });
      }
    }, 150);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, globalProducts]);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem("user");

      if (storedUser && storedUser !== "undefined") {
        const parsed = JSON.parse(storedUser);
        setUser(parsed.role !== "admin" ? parsed : null);
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();

    if (searchQuery.trim()) {
      const params = new URLSearchParams();
      params.set("search", searchQuery.trim());
      navigate(`/shop?${params.toString()}`);
      setSearchQuery("");
      setIsSearchOpen(false);
      setSuggestions({ products: [] });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop", hasMegaMenu: true },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <>
      <header className="fixed left-0 top-0 z-[140] w-full border-b border-slate-100 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1800px] items-center justify-between gap-6 px-4 py-3 md:px-8 lg:px-10">
          {/* LOGO */}
          <div className="flex shrink-0 items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
              className="p-2 text-slate-600 transition hover:text-blue-700 lg:hidden"
            >
              <Menu size={24} />
            </button>

            <Link to="/">
              <img
                src="/logo/logo.png"
                alt="Logo"
                width="161"
                height="44"
                fetchPriority="high"
                loading="eager"
                className="h-9 w-auto object-contain md:h-15"
              />
            </Link>
          </div>

          {/* NAV */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() =>
                  link.hasMegaMenu && setActiveMegaMenu("shop")
                }
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  to={link.path}
                  className={cn(
                    "flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium transition",
                    location.pathname === link.path
                      ? "text-blue-700"
                      : "text-slate-700 hover:text-blue-700"
                  )}
                >
                  {link.name}
                  {link.hasMegaMenu && (
                    <ChevronDown
                      size={14}
                      className={cn(
                        "transition",
                        activeMegaMenu === "shop" && "rotate-180"
                      )}
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {activeMegaMenu === "shop" && link.hasMegaMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      className="absolute left-0 top-full z-[250] w-[850px] pt-4"
                    >
                      <div className="grid grid-cols-[1fr_260px] gap-8 bg-white p-8 shadow-[0_25px_80px_rgba(15,23,42,0.12)]">
                        <div>
                          <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center bg-blue-50 text-blue-700">
                              <LayoutGrid size={21} />
                            </div>

                            <div>
                              <h2 className="text-[20px] font-semibold text-slate-950">
                                Catalog Browser
                              </h2>
                              <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-slate-500">
                                Select Category
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                            {categories.slice(0, 10).map((cat) => (
                              <Link
                                key={cat.id}
                                to={`/shop?category=${cat.slug}`}
                                onClick={() => setActiveMegaMenu(null)}
                                className="group flex items-center justify-between border-b border-slate-100 py-3 text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
                              >
                                {cat.name}
                                <ChevronRight
                                  size={15}
                                  className="opacity-0 transition group-hover:opacity-100"
                                />
                              </Link>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col justify-center bg-slate-950 p-7">
                          <h2 className="mb-5 text-[28px] font-semibold leading-tight text-white">
                            Verified
                            <br />
                            Printers.
                          </h2>

                          <Link
                            to="/shop"
                            onClick={() => setActiveMegaMenu(null)}
                            className="inline-flex h-12 items-center justify-center gap-2 bg-white px-5 text-[13px] font-medium text-slate-950 transition hover:bg-blue-700 hover:text-white"
                          >
                            Explore All
                            <ChevronRight size={16} />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* SEARCH */}
          <div className="relative hidden max-w-[420px] flex-1 lg:flex" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="w-full">
              <div className="flex h-12 items-center border border-slate-200 bg-[#f7f8fb] px-4 transition focus-within:border-blue-700 focus-within:bg-white">
                <Search size={18} className="text-slate-400" />

                <input
                  type="text"
                  placeholder="Search products..."
                  aria-label="Search products"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  className="flex-1 bg-transparent px-3 text-[14px] font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />

                {isSearching && (
                  <Loader2 size={16} className="animate-spin text-blue-700" />
                )}
              </div>
            </form>

            <AnimatePresence>
              {isSearchOpen && searchQuery.length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full z-[220] mt-3 w-full bg-white p-2 shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
                >
                  {suggestions.products.length > 0 ? (
                    suggestions.products.map((p) => {
                      let imageSrc = "";

                      try {
                        imageSrc = p.images
                          ? typeof p.images === "string"
                            ? JSON.parse(p.images)[0]
                            : p.images[0]
                          : "";
                      } catch {
                        imageSrc = "";
                      }

                      return (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                          className="flex items-center gap-4 p-3 transition hover:bg-blue-50"
                        >
                          <div className="flex h-12 w-12 items-center justify-center bg-[#f7f8fb] p-1">
                            {imageSrc && (
                              <img
                                src={imageSrc.replace(/\.png$/, "-150x150.png")}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = imageSrc;
                                }}
                                alt={p.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-[13px] font-medium text-slate-800">
                              {p.name}
                            </h3>
                            <p className="text-[13px] font-semibold text-blue-700">
                              ${p.price}
                            </p>
                          </div>
                        </Link>
                      );
                    })
                  ) : (
                    <div className="p-4 text-center text-[13px] text-slate-400">
                      No results found.
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ACTIONS */}
          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Toggle search"
              className="p-2 text-slate-600 hover:text-blue-700 lg:hidden"
            >
              <Search size={22} />
            </button>

            <button
              onClick={() => navigate(user ? "/profile" : "/login")}
              aria-label={user ? "View Profile" : "Login or Signup"}
              className="hidden h-11 w-11 items-center justify-center bg-slate-50 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700 sm:flex"
            >
              <User size={19} />
            </button>

            <Link
              to="/wishlist"
              aria-label="View Wishlist"
              className="relative flex h-11 w-11 items-center justify-center bg-slate-50 text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
            >
              <Heart
                size={19}
                className={cn(
                  wishlistCount > 0 && "fill-blue-700 text-blue-700"
                )}
              />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-semibold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button
              onClick={openCartDrawer}
              aria-label="Open Shopping Cart"
              className="relative flex h-11 w-11 items-center justify-center bg-slate-950 text-white transition hover:bg-blue-700"
            >
              <ShoppingBag size={19} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-700 px-1 text-[10px] font-semibold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="h-[69px]" />

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 z-[200] bg-black/50"
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed bottom-0 left-0 top-0 z-[210] flex w-[85%] max-w-[360px] flex-col bg-white"
            >
              <div className="flex items-center justify-between border-b border-slate-100 p-5">
                <img
                  src="/logo/logo.png"
                  alt="Logo"
                  width="140"
                  height="38"
                  className="h-10 object-contain"
                />

                <button
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center bg-slate-100 text-slate-700"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="flex-1 space-y-8 overflow-y-auto p-5">
                <div>
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Menu
                  </p>

                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        onClick={() => setIsSidebarOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-4 py-3 text-[15px] transition",
                          location.pathname === link.path
                            ? "bg-blue-50 font-semibold text-blue-700"
                            : "text-slate-700 hover:bg-slate-50"
                        )}
                      >
                        {link.name}
                        <ChevronRight size={16} />
                      </Link>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Categories
                  </p>

                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        to={`/shop?category=${cat.slug}`}
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center justify-between px-4 py-3 text-[14px] text-slate-700 transition hover:bg-slate-50"
                      >
                        {cat.name}
                        <ChevronRight size={15} />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 p-5">
                {user ? (
                  <button
                    onClick={handleLogout}
                    className="flex h-12 w-full items-center justify-center gap-2 bg-red-50 font-medium text-red-600"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex h-12 w-full items-center justify-center bg-blue-700 font-medium text-white"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}