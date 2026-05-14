import { useState, useEffect, lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SEO from "@/components/SEO";
import API_BASE_URL from "../config";
import ArrowUpRight from "lucide-react/dist/esm/icons/arrow-up-right";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import Loader2 from "lucide-react/dist/esm/icons/loader-2";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";
import Zap from "lucide-react/dist/esm/icons/zap";
import Mail from "lucide-react/dist/esm/icons/mail";
import { Link } from "react-router-dom";
import { useGlobal } from "../context/GlobalContext";
import { cn } from "../lib/utils";

// Lazy load below-the-fold components
const ShopByCategory = lazy(() => import("@/components/ShopByCategory"));
const ProductShowcase = lazy(() => import("@/components/ProductShowcase"));
const TripleBanners = lazy(() => import("@/components/TripleBanners"));
const SupportCTA = lazy(() => import("@/components/SupportCTA"));
const TrendingProducts = lazy(() => import("@/components/TrendingProducts"));
const Collections = lazy(() => import("@/components/Collections"));

// Optimized Section Loaders with realistic heights to prevent CLS
const SectionLoader = ({ height = "h-96" }) => (
  <div className={cn("w-full flex items-center justify-center bg-slate-50/30", height)}>
    <div className="w-6 h-6 border-2 border-blue-800 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const { categories: globalCategories, products: globalProducts, brands: globalBrands, loading: globalLoading } = useGlobal();
  const [processedData, setProcessedData] = useState({
    all: [],
    printers: [],
    accessories: [],
    mixedArrivals: [],
    brands: []
  });

  useEffect(() => {
    if (!globalLoading && globalProducts.length > 0) {
      const allowedBrands = ["canon", "epson", "hp", "lexmark"];
      const filteredBrands = globalBrands.filter(b => allowedBrands.includes(b.name.trim().toLowerCase()));

      const allFiltered = globalProducts.filter(p =>
        !p.name.toLowerCase().includes('laptop') &&
        !p.name.toLowerCase().includes('macbook') &&
        !p.name.toLowerCase().includes('notebook') &&
        !p.name.toLowerCase().includes('chromebook') &&
        !p.brand_name?.toLowerCase().includes('brother') &&
        !p.brand_name?.toLowerCase().includes('xerox')
      );

      const printers = allFiltered.filter(p =>
        p.name.toLowerCase().includes('printer') ||
        p.name.toLowerCase().includes('laserjet') ||
        p.name.toLowerCase().includes('pixma')
      );
      const accessories = allFiltered.filter(p =>
        p.name.toLowerCase().includes('ink') ||
        p.name.toLowerCase().includes('toner') ||
        p.name.toLowerCase().includes('cable') ||
        p.name.toLowerCase().includes('adapter')
      );

      const shuffled = [...allFiltered].sort(() => 0.5 - Math.random());

      setProcessedData({
        all: allFiltered.slice(0, 18),
        printers,
        accessories,
        mixedArrivals: shuffled.slice(0, 18),
        brands: filteredBrands
      });
    }
  }, [globalLoading, globalProducts, globalBrands]);

  return (
    <div className="bg-white font-jakarta overflow-x-hidden text-slate-900">
      <SEO
        title="Laser Print Guide | Quality Printers & Accessories"
        description="Your trusted source for high-quality printers and professional printing solutions. Reliable nationwide delivery and dedicated guidance across the USA."
      />

      <Hero
        topSellers={processedData.all.slice(0, 7)}
        categoryList={globalCategories.flatMap(c => c.children || []).slice(0, 9)}
      />
      <Features />



      <Suspense fallback={<SectionLoader height="h-[500px]" />}>
        <ShopByCategory categories={globalCategories} loading={globalLoading} />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[300px]" />}>
        <TripleBanners />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[800px]" />}>
        <ProductShowcase
          products={processedData.all}
          arrivals={processedData.mixedArrivals}
          loading={globalLoading}
        />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[500px]" />}>
        <SupportCTA />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[800px]" />}>
        <TrendingProducts
          products={processedData.all}
          loading={globalLoading}
        />
      </Suspense>

      <Suspense fallback={<SectionLoader height="h-[400px]" />}>
        <Collections />
      </Suspense>

      {/* --- HELP & SUPPORT CTA --- */}
      <section className="w-full bg-white px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden bg-[#f7f8fb] px-6 py-14 text-center md:px-12 md:py-18">
            <div className="absolute left-0 top-0 h-full w-1 bg-blue-700" />
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-100 blur-3xl" />
            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-slate-200/60 blur-3xl" />

            <div className="relative z-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-700" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                  Customer Assistance
                </span>
              </div>

              <h2 className="mx-auto max-w-[760px] text-[34px] font-semibold leading-[1.12] tracking-tight text-slate-950 md:text-[48px]">
                Need Personalized{" "}
                <span className="text-blue-700">Guidance?</span>
              </h2>

              <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
                Our team of printing specialists is ready to help you choose the right
                hardware for your specific business requirements.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700 sm:w-auto"
                >
                  Contact us <Mail size={18} />
                </Link>

                <Link
                  to="/faq"
                  className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 text-[14px] font-medium text-slate-900 transition hover:border-blue-700 hover:text-blue-700 sm:w-auto"
                >
                  View FAQs <ChevronRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
