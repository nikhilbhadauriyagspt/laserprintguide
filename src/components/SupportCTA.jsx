import React from "react";
import { Link } from "react-router-dom";
import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import UserRound from "lucide-react/dist/esm/icons/user-round";
import Search from "lucide-react/dist/esm/icons/search";
import ShoppingCart from "lucide-react/dist/esm/icons/shopping-cart";
import CreditCard from "lucide-react/dist/esm/icons/credit-card";

const steps = [
  {
    icon: UserRound,
    number: "01",
    title: "Login Account",
    desc: "Sign in to save your details, manage orders, and enjoy a smoother shopping experience.",
  },
  {
    icon: Search,
    number: "02",
    title: "Select Product",
    desc: "Browse printer categories and choose products for home, office, or business needs.",
  },
  {
    icon: ShoppingCart,
    number: "03",
    title: "Add to Cart",
    desc: "Add printers or accessories to your cart and review everything before ordering.",
  },
  {
    icon: CreditCard,
    number: "04",
    title: "Checkout",
    desc: "Enter shipping details, complete payment securely, and place your order confidently.",
  },
];

export default function SupportCTA() {
  return (
    <section className="w-full bg-white px-4 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-[1800px]">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Step By Step Guide
            </span>

            <h2 className="mt-3 text-[32px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              How To Buy From Us
            </h2>

            <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-slate-600">
              Follow a simple shopping process to find printer products,
              review your cart, and place your order with confidence.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-slate-950 px-6 py-3 text-[14px] font-medium text-white transition hover:bg-blue-700"
          >
            Start Shopping
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* STEPS */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative overflow-hidden border border-slate-100 bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(15,23,42,0.10)]"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center bg-blue-50 text-blue-700">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <span className="text-[34px] font-semibold leading-none text-slate-100">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-[19px] font-semibold text-slate-950">
                  {step.title}
                </h3>

                <p className="mt-3 text-[14px] leading-7 text-slate-500">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}