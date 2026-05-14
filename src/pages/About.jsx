import React from "react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

import ArrowRight from "lucide-react/dist/esm/icons/arrow-right";
import CheckCircle2 from "lucide-react/dist/esm/icons/check-circle-2";
import ShieldCheck from "lucide-react/dist/esm/icons/shield-check";
import MousePointer2 from "lucide-react/dist/esm/icons/mouse-pointer-2";
import Heart from "lucide-react/dist/esm/icons/heart";
import LayoutGrid from "lucide-react/dist/esm/icons/layout-grid";
import Zap from "lucide-react/dist/esm/icons/zap";
import Mail from "lucide-react/dist/esm/icons/mail";

import aboutSecondary from "../assets/bannerr/6.avif";
import aboutMain from "../assets/bannerr/col.avif";

const points = [
  "List products that are useful for everyday needs",
  "Present information in a clear and easy-to-read format",
  "Avoid unnecessary complexity and keep things simple",
];

const chooseUs = [
  {
    icon: ShieldCheck,
    title: "No Confusion",
    desc: "We provide simple descriptions without any jargon.",
  },
  {
    icon: MousePointer2,
    title: "No Pressure",
    desc: "Explore at your own pace with total confidence.",
  },
  {
    icon: Heart,
    title: "Calm Experience",
    desc: "A distraction-free interface for a smooth journey.",
  },
  {
    icon: CheckCircle2,
    title: "Dependable",
    desc: "Practical solutions designed for everyday use.",
  },
];

const approach = [
  {
    icon: LayoutGrid,
    title: "Clear Choices",
    desc: "Curated selection to save your time.",
  },
  {
    icon: Zap,
    title: "Straight Forward",
    desc: "Honest information without any noise.",
  },
  {
    icon: MousePointer2,
    title: "Smooth Experience",
    desc: "Distraction-free browsing experience.",
  },
];

export default function About() {
  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="About Us | Laser Print Guide"
        description="Laser Print Guide makes choosing the right printing products easier with clear, straightforward choices and a smooth interface."
      />

      {/* HERO */}
      <section className="bg-[#f7f8fb] px-4 py-20 md:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              About Us
            </span>

            <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
              Making Printing
              <br />
              Simpler For Everyone
            </h1>

            <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-slate-600">
              Laser Print Guide is built around a simple goal — to make choosing the
              right printing products easier. We keep things clear,
              straightforward, and easy to explore.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-slate-700 shadow-sm">
                <CheckCircle2 size={18} className="text-blue-700" />
                Clear Choices
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-slate-700 shadow-sm">
                <CheckCircle2 size={18} className="text-blue-700" />
                Straightforward Info
              </div>
            </div>

            <Link
              to="/shop"
              className="mt-10 inline-flex items-center gap-3 rounded-full bg-slate-950 px-7 py-4 text-[14px] font-medium text-white transition hover:bg-blue-700"
            >
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="relative">
            <div className="absolute -left-5 -top-5 h-full w-full bg-blue-50" />
            <img
              src={aboutSecondary}
              alt="Simple printing solutions"
              className="relative h-auto w-full object-cover shadow-[0_18px_55px_rgba(15,23,42,0.12)]"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <img
              src={aboutMain}
              alt="Honest printing product choices"
              className="h-auto w-full object-cover shadow-[0_18px_55px_rgba(15,23,42,0.10)]"
            />
          </div>

          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              What We Do
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              Honest And Simple Product Choices
            </h2>

            <p className="mt-5 text-[16px] leading-8 text-slate-600">
              We keep our approach honest and minimal, focusing on what truly
              matters to you.
            </p>

            <div className="mt-8 space-y-4">
              {points.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">
                    <CheckCircle2 size={17} />
                  </div>
                  <p className="text-[15px] leading-7 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-[#f7f8fb] px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <div className="mb-12 max-w-[760px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Why People Choose Us
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              A Calm Shopping Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {chooseUs.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-7 shadow-[0_10px_35px_rgba(15,23,42,0.05)]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center bg-blue-50 text-blue-700">
                    <Icon size={25} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-[18px] font-semibold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-[14px] leading-7 text-slate-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="border border-slate-100 bg-white p-8 shadow-[0_18px_55px_rgba(15,23,42,0.08)] md:p-12">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
              Our Origin
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              Why Laser Print Guide Started
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <p className="text-[16px] leading-8 text-slate-600">
                We started Laser Print Guide because we noticed how frustrating it
                was to find a reliable printer online. It had become a maze of
                confusing words, complicated descriptions, and options that just
                didn't last.
              </p>

              <p className="text-[16px] leading-8 text-slate-600">
                Our goal was simple: build a store where honesty comes first. A
                place where a small business owner or a student could find a
                dependable tool without feeling pressured or overwhelmed.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-blue-700 bg-blue-50 p-6">
              <p className="text-[20px] font-medium leading-8 text-slate-900">
                “We don't just ship boxes; we provide the tools that help your
                ideas come to life on paper.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-slate-950 px-4 py-20 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1300px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-300">
            Our Approach
          </span>

          <h2 className="mt-4 text-[34px] font-semibold tracking-tight md:text-[46px]">
            Simple, Useful And Easy To Explore
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
            {approach.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="bg-white/5 p-8">
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center bg-white/10 text-blue-300">
                    <Icon size={26} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-[18px] font-semibold">{item.title}</h3>

                  <p className="mt-3 text-[14px] leading-7 text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-14 max-w-[760px] border-t border-white/10 pt-10">
            <h3 className="text-[26px] font-semibold">Who It’s For</h3>

            <p className="mt-4 text-[16px] leading-8 text-slate-400">
              Laser Print Guide is designed for individuals and small businesses who
              want practical and dependable printing solutions for everyday use.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 text-center md:px-8 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-blue-700">
            Ready To Explore?
          </span>

          <h2 className="mt-4 text-[38px] font-semibold tracking-tight text-slate-950 md:text-[54px]">
            Get Started With Laser Print Guide
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-slate-600">
            You’re welcome to explore our collection and find what works best
            for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-blue-700 sm:w-auto"
            >
              Start Shopping
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-8 text-[14px] font-medium text-slate-900 transition hover:border-blue-700 hover:text-blue-700 sm:w-auto"
            >
              Contact Us
              <Mail size={18} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}