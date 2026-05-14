import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import ChevronLeft from "lucide-react/dist/esm/icons/chevron-left";
import ChevronRight from "lucide-react/dist/esm/icons/chevron-right";

// Local banner images (using public paths for LCP optimization)
const banner1 = "/assets/bannerr/21.avif";
const banner2 = "/assets/bannerr/22.avif";

const slides = [
  {
    id: 1,
    image: banner1,
    alt: "Printer Banner 1",
    title: "High-Quality Printers for Every Need",
    price: "Starting at $199",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    image: banner2,
    alt: "Printer Banner 2",
    title: "Smarter Printing for Home & Office",
    price: "From $249",
    buttonText: "Shop Now",
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-[2560px]">
        <div className="relative bg-white overflow-hidden w-full aspect-[1920/850] sm:aspect-[1920/850] min-h-[200px] sm:min-h-[300px] lg:min-h-0">
          {slides.map((slide, idx) => (
            <Link
              key={slide.id}
              to="/shop"
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === current
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                width="1920"
                height="850"
                fetchPriority={idx === 0 ? "high" : "auto"}
                loading={idx < 2 ? "eager" : "lazy"}
                decoding="async"
                className="absolute inset-0 w-full h-full object-contain sm:object-cover"
              />
              
             
            </Link>
          ))}

          

        
        </div>
      </div>
    </section>
  );
};

export default Hero;