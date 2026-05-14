import React, { useState } from "react";
import SEO from "@/components/SEO";

import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import Truck from "lucide-react/dist/esm/icons/truck";
import Info from "lucide-react/dist/esm/icons/info";
import RotateCcw from "lucide-react/dist/esm/icons/rotate-ccw";
import Plus from "lucide-react/dist/esm/icons/plus";
import Minus from "lucide-react/dist/esm/icons/minus";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";

import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../lib/utils";

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: ShieldCheck,
    questions: [
      {
        q: "How do I place an order for a printer?",
        a: "To place an order, select your preferred printer, add it to your cart, and complete checkout with your shipping and payment details.",
      },
      {
        q: "Is an account required to shop?",
        a: "No, you can place an order as a guest. Creating an account simply makes it easier to manage future orders and preferences.",
      },
      {
        q: "How can I check my order status?",
        a: "After placing your order, you will receive confirmation details. You can also use the order tracking option available on the website.",
      },
      {
        q: "What payment methods are supported?",
        a: "We accept major payment methods through secure checkout so your transactions remain protected and dependable.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        q: "Where do you ship to?",
        a: "We currently offer shipping across the United States for both residential and business locations.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery usually takes around 3 to 7 business days depending on your location and order details.",
      },
      {
        q: "How can I track my shipment?",
        a: "Once your order is dispatched, tracking details are shared so you can follow the shipment status.",
      },
    ],
  },
  {
    category: "Printer Information",
    icon: Info,
    questions: [
      {
        q: "Are all printers original and new?",
        a: "Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.",
      },
      {
        q: "Is there a warranty provided?",
        a: "Most printers include manufacturer warranty coverage. Warranty details may vary depending on the specific product model.",
      },
      {
        q: "Are original ink and toner available?",
        a: "Yes, we also offer printing supplies for many of the models available in our catalog.",
      },
    ],
  },
  {
    category: "Returns & Support",
    icon: RotateCcw,
    questions: [
      {
        q: "What is your return policy?",
        a: "Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.",
      },
      {
        q: "What if the machine arrives with issues?",
        a: "If your order arrives damaged or has a problem, please contact support as soon as possible so we can guide you through the next steps.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeIdx, setActiveIdx] = useState(null);
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const toggle = (idx) => {
    setActiveIdx(activeIdx === idx ? null : idx);
  };

  const currentCategoryData = faqs.find(
    (f) => f.category === activeCategory
  );

  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="FAQ | Laser Print Guide Support"
        description="Find instant answers to common questions about orders, shipping, and printer setups."
      />

      {/* HERO */}
      <section className="bg-[#f7f8fb] px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            FAQ
          </span>

          <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
            Common Questions
          </h1>

          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
            Find instant answers about orders, shipping, and printer setups.
            We've organized everything to make your experience smoother.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* LEFT SIDEBAR */}
          <aside className="h-fit bg-[#f7f8fb] p-6">
            <h2 className="mb-6 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Topic Groups
            </h2>

            <div className="flex flex-col gap-3">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => {
                    setActiveCategory(f.category);
                    setActiveIdx(null);
                  }}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 text-left transition",
                    activeCategory === f.category
                      ? "bg-slate-950 text-white"
                      : "bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center",
                      activeCategory === f.category
                        ? "bg-white/10"
                        : "bg-blue-50 text-blue-700"
                    )}
                  >
                    <f.icon size={20} />
                  </div>

                  <span className="text-[14px] font-medium leading-snug">
                    {f.category}
                  </span>
                </button>
              ))}
            </div>

            {/* HELP BOX */}
            <div className="mt-8 bg-slate-950 p-7 text-white">
              <h3 className="text-[24px] font-semibold tracking-tight">
                Still Unsure?
              </h3>

              <p className="mt-4 text-[14px] leading-7 text-slate-400">
                If you couldn't find your answer here, our team is happy to help
                you personally.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 bg-white px-6 text-[14px] font-medium text-slate-950 transition hover:bg-blue-700 hover:text-white"
              >
                Contact Us
                <ArrowRight size={17} />
              </Link>
            </div>
          </aside>

          {/* FAQ ACCORDION */}
          <main>
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
                Viewing Category
              </span>

              <h2 className="mt-3 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
                {activeCategory}
              </h2>
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "border transition-all",
                    activeIdx === i
                      ? "border-blue-200 bg-blue-50/30"
                      : "border-slate-100 bg-white"
                  )}
                >
                  <button
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left md:px-8"
                  >
                    <span
                      className={cn(
                        "pr-6 text-[16px] font-medium leading-7 transition-colors md:text-[18px]",
                        activeIdx === i
                          ? "text-blue-700"
                          : "text-slate-900"
                      )}
                    >
                      {faq.q}
                    </span>

                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center transition",
                        activeIdx === i
                          ? "bg-blue-700 text-white"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      {activeIdx === i ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {activeIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-8 md:px-8">
                          <div className="mb-6 h-px w-14 bg-blue-100" />

                          <p className="max-w-3xl text-[15px] leading-8 text-slate-600 md:text-[16px]">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f8fb] px-4 py-20 text-center md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[38px] font-semibold tracking-tight text-slate-950 md:text-[54px]">
            Need More Assistance?
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-slate-600">
            Our professional support team is available to help you with printer
            setups and order inquiries.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-14 w-full items-center justify-center gap-3 bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Contact Us
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/shop"
              className="inline-flex h-14 w-full items-center justify-center border border-slate-200 bg-white px-8 text-[14px] font-medium text-slate-900 transition hover:border-blue-700 hover:text-blue-700 sm:w-auto"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}