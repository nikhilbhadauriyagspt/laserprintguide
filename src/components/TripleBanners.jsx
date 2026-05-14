import React from "react";
import { Link } from "react-router-dom";

// Images
import mid1 from "../assets/middle-imges/1.avif";
import mid2 from "../assets/middle-imges/2.avif";

const banners = [
  { id: 1, image: mid1 },
  { id: 2, image: mid2 },
];

export default function TripleBanners() {
  return (
    <section className="w-full bg-white px-4 py-10 md:px-8">
      <div className="mx-auto max-w-[1820px]">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {banners.map((banner) => (
            <Link
              key={banner.id}
              to="/shop"
              className="block w-full overflow-hidden"
            >
              <img
                src={banner.image}
                alt={`Shop banner ${banner.id}`}
                width="900"
                height="350"
                loading="lazy"
                decoding="async"
                className="block w-full h-auto object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}