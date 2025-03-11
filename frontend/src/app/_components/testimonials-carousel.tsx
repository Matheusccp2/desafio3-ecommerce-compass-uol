"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import TestimonialCard from "./testimonials-card";

const testimonials = [
  {
    name: "Sarah M.",
    text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
    verified: true,
    rating: 5,
  },
  {
    name: "Alex K.",
    text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
    verified: true,
    rating: 4,
  },
  {
    name: "James L.",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
    rating: 5,
  },
  {
    name: "Mooen",
    text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
    verified: true,
    rating: 4,
  },
  {
    name: "Sophie R.",
    text: "Shop.co tornou minha experiência de compras online muito mais fácil! A qualidade dos produtos e a entrega rápida me conquistaram. Definitivamente, minha loja favorita agora!",
    verified: true,
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [autoplayEnabled] = useState(true);

  const carouselRef = useRef(null);

  // Determinar o número de itens visíveis baseado no tamanho da tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize(); // Executar imediatamente
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;

    if (autoplayEnabled) {
      interval = setInterval(() => {
        if (currentIndex < testimonials.length - visibleItems) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          setCurrentIndex(0); // Volta para o início quando chega ao fim
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [currentIndex, autoplayEnabled, visibleItems]);

  // Navegação
  const showPreviousTestimonials = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      // Loop para o final
      setCurrentIndex(testimonials.length - visibleItems);
    }
  };

  const showNextTestimonials = () => {
    if (currentIndex < testimonials.length - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Loop para o início
      setCurrentIndex(0);
    }
  };

  // Suporte para toque

  // Indicador de progresso
  const totalSlides = testimonials.length - visibleItems + 1;

  return (
    <div className="relative py-12 px-4 md:px-8 bg-gray-50 rounded-2xl my-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end items-center mb-8">
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={showPreviousTestimonials}
            >
              <ArrowLeft size={18} />
            </Button>
            <Button variant="ghost" size="icon" onClick={showNextTestimonials}>
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>

        <div className="relative">
          <div ref={carouselRef} className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / visibleItems)
                }%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 transition-opacity duration-300`}
                  style={{
                    width: `calc(${100 / visibleItems}% - ${
                      (16 * (visibleItems - 1)) / visibleItems
                    }px)`,
                  }}
                >
                  <TestimonialCard
                    name={testimonial.name}
                    text={testimonial.text}
                    verified={testimonial.verified}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de progresso */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-black" : "bg-gray-300"
              }`}
              aria-label={`Ver slide ${index + 1} de ${totalSlides}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
