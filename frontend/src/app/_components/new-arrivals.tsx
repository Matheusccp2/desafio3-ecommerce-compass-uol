"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";

interface Product {
  id: number;
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
  slug: string;
}

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/products", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        // Limitar para apenas os 4 primeiros produtos
        setProducts(data.slice(0, 4));
      } catch (err) {
        setError("Error fetching products. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Função para renderizar as estrelas de avaliação
  const renderRatingStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star key={i} size={16} fill="#FFC633" color="#FFC633" />
        ))}
        {hasHalfStar && <StarHalf size={16} fill="#FFC633" color="#FFC633" />}
        <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
      </div>
    );
  };

  return (
    <section className="py-12 bg-white">
      {/* Newsletter form */}
      <h2 className="text-2xl text-black font-integralcf-bold text-center mb-8 md:text-3xl">
        New Arrivals
      </h2>

      {/* Products section - apenas 4 primeiros */}
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>

        {loading && <p className="text-center py-8">Loading products...</p>}

        {error && <p className="text-center text-red-500 py-8">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="overflow-hidden bg-transparent border-none shadow-sm hover:shadow-md transition-shadow rounded-lg"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-2 text-black">
                      {product.title}
                    </h3>
                    <div className="mb-2">
                      {renderRatingStars(product.rating)}
                    </div>
                    <div className="flex items-center">
                      <span className="font-bold text-lg text-black">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="ml-2 text-gray-500 line-through text-sm">
                          ${product.originalPrice}
                        </span>
                      )}
                      {product.discount && (
                        <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                          -{product.discount}%
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <p className="text-center py-8">
            No products available at the moment.
          </p>
        )}
      </div>
    </section>
  );
}
