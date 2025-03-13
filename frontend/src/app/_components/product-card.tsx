/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "../context/cart-context";

interface ProductCardProps {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  slug?: string;
}

const ProductCard = ({
  id,
  image,
  title,
  rating,
  price,
  originalPrice,
  discount,
  slug = "",
}: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovering, setIsHovering] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id,
      image,
      title,
      price,
      quantity: 1,
      slug,
    });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >

      <div className="relative overflow-hidden rounded-lg bg-gray-100 mb-4">
        <Link href={`/product/${slug}`}>
        <img
          src={image}
          alt={title}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      </Link>

      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
          {discount}% OFF
        </div>
      )}

      <Button
        variant="secondary"
        size="sm"
        className={`absolute bottom-0 left-0 right-0 bg-black text-white hover:bg-gray-800 rounded-t-none transition-all duration-300 flex items-center justify-center gap-2 ${isHovering ? "translate-y-0" : "translate-y-full"}`}
        onClick={handleAddToCart}
      >
        <ShoppingCart size={16} />
        Add to Cart
      </Button>
    </div><h3 className="font-semibold text-black mb-1 line-clamp-1">
        <Link href={`/product/${slug}`}>{title}</Link>
      </h3>

      <div className="flex items-center mb-2">
        <div className="flex text-yellow-400 mr-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < Math.floor(rating) ? "currentColor" : "none"}
              strokeWidth={i < Math.floor(rating) ? 0 : 1.5}
            />
          ))}
        </div>
        <span className="text-sm text-gray-500">({rating})</span>
      </div>

      <div className="flex items-center">
        <span className="font-bold text-black">${price.toFixed(2)}</span>
        {originalPrice && (
          <span className="ml-2 text-gray-400 line-through text-sm">
            ${originalPrice.toFixed(2)}
          </span>
        )}
      </div>

    </div>
  );

};

export default ProductCard;