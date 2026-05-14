import React from "react";
import {
  ShieldCheck,
  Truck,
  BadgeCheck,
  Headphones,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

import aboutBanner from "../assets/bannerr/6.avif";

const features = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    desc: "Reliable printers and accessories for daily use.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Quick and secure shipping across locations.",
  },
  {
    icon: BadgeCheck,
    title: "Easy Shopping",
    desc: "Simple browsing experience with smooth ordering.",
  },
  {
    icon: Headphones,
    title: "Friendly Support",
    desc: "Helpful assistance whenever you need guidance.",
  },
];

export default function AboutSection() {
  return (
    <section className="bg-white py-24 px-6 overflow-hidden">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT IMAGE */}
        <div className="relative">
          <div className="absolute -top-5 -left-5 w-full h-full rounded-[32px] bg-blue-50"></div>

          <div className="relative overflow-hidden rounded-[32px] shadow-[0_15px_60px_rgba(0,0,0,0.08)]">
            <img
              src={aboutBanner}
              alt="Printer Store"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-[13px] font-semibold text-blue-700">
            ABOUT OUR STORE
          </span>

          <h2 className="mt-6 text-[38px] md:text-[40px] leading-[1.1]  text-slate-900">
            Printing Solutions
           
            For Everyday Needs
          </h2>

          <p className="mt-6 text-[16px] leading-8 text-slate-600 max-w-[620px]">
            Discover reliable printers, accessories, and printing essentials
            designed for home, office, and professional environments. We focus
            on quality products, smooth shopping, and a better customer
            experience.
          </p>

          {/* FEATURES */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div key={index} className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="text-[17px] font-semibold text-slate-900">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-[14px] leading-6 text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTON */}
          <div className="mt-14">
            <Link
              to="/about"
              className="inline-flex items-center gap-3 rounded-full bg-blue-700 px-7 py-4 text-[14px] font-medium text-white transition hover:bg-blue-800"
            >
              Explore More
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}