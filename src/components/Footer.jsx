import { Link } from "react-router-dom";
import Mail from "lucide-react/dist/esm/icons/mail";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";
import { useGlobal } from "../context/GlobalContext";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useCart();
  const { categories: globalCategories } = useGlobal();

  const categories = globalCategories
    .flatMap((cat) => [cat, ...(cat.children || [])])
    .filter(
      (cat) =>
        !cat.name.toLowerCase().includes("laptop") &&
        !cat.slug.toLowerCase().includes("laptop") &&
        !cat.name.toLowerCase().includes("chromebook")
    )
    .filter((v, i, a) => a.findIndex((t) => t.slug === v.slug) === i)
    .slice(0, 5);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.status === "success") {
        showToast(data.message, "success");
        setEmail("");
      } else {
        showToast(data.message, "info");
      }
    } catch {
      showToast("Failed to subscribe.", "error");
    } finally {
      setLoading(false);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Track Order", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "FAQ", path: "/faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy-policy" },
    { name: "Terms of Service", path: "/terms-and-conditions" },
    { name: "Return Policy", path: "/return-policy" },
    { name: "Shipping Policy", path: "/shipping-policy" },
    { name: "Cookie Policy", path: "/cookie-policy" },
  ];

  return (
    <footer className="w-full border-t border-slate-100 bg-white text-slate-950">
      <div className="mx-auto max-w-[1800px] px-4 py-16 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1.1fr]">
          {/* BRAND */}
          <div>
            <Link to="/" className="inline-block">
              <img
                src="/logo/logo.png"
                alt="Logo"
                width="205"
                height="56"
                className="h-15 w-auto object-contain"
              />
            </Link>

            <p className="mt-7 max-w-[360px] text-[15px] leading-7 text-slate-600">
              We help small businesses and home offices get printing right
              without the usual hassle. Whether it’s everyday documents or
              important work, you can count on clean, sharp results every time
              you print.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-700">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Email Us
                </p>
                <a
                  href="mailto:info@laserprintguide.co"
                  className="mt-1 block text-[14px] font-semibold text-slate-950 hover:text-blue-700"
                >
                  info@laserprintguide.co
                </a>
              </div>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <FooterTitle title="Navigation" />

            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
                  >
                    <ChevronRight
                      size={14}
                      className="text-blue-700 opacity-0 transition group-hover:opacity-100"
                    />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <FooterTitle title="Categories" />

            <ul className="mt-6 space-y-3">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${cat.slug}`}
                    className="group inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 transition hover:text-blue-700"
                  >
                    <ChevronRight
                      size={14}
                      className="text-blue-700 opacity-0 transition group-hover:opacity-100"
                    />
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="bg-[#f7f8fb] p-6">
            <FooterTitle title="Newsletter" />

            <p className="mt-5 text-[14px] leading-7 text-slate-600">
              Join our network and get simple updates about printing products
              and store news.
            </p>

            <form onSubmit={handleSubscribe} className="mt-6 space-y-3">
              <label htmlFor="footer-email" className="sr-only">
                Email address for newsletter
              </label>

              <input
                id="footer-email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                aria-label="Email address for newsletter"
                className="h-12 w-full border border-slate-200 bg-white px-4 text-[14px] font-medium text-slate-900 outline-none transition focus:border-blue-700"
              />

              <button
                disabled={loading}
                aria-label={loading ? "Subscribing..." : "Subscribe Now"}
                className="flex h-12 w-full items-center justify-center bg-slate-950 text-[13px] font-medium text-white transition hover:bg-blue-700 disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={17} />
                ) : (
                  "Subscribe Now"
                )}
              </button>
            </form>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <div className="flex items-center gap-4 grayscale opacity-80">
                <img
                  src="/assets/paypal.svg"
                  alt="PayPal"
                  width="60"
                  height="16"
                  className="h-4 w-auto"
                />
                <div className="h-6 w-px bg-slate-300" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600">
                  Encrypted Payments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="mt-14 border-t border-slate-100 pt-8">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <p className="text-[12px] font-medium text-slate-500">
              © {new Date().getFullYear()} Laser Print Guide. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="text-[12px] font-medium text-slate-500 transition hover:text-blue-700"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterTitle({ title }) {
  return (
    <h3 className="text-[13px] font-semibold uppercase tracking-[0.18em] text-slate-950">
      {title}
    </h3>
  );
}