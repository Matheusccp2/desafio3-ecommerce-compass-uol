"use client";

import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { Button } from "./ui/button";

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

const TopSelling = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("http://localhost:8080/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        setProducts(data.slice(0, 4));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl text-black font-bold text-center mb-8 md:text-3xl">
          TOP SELLING
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-48">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.image}
                title={product.title}
                rating={product.rating}
                price={product.price}
                originalPrice={product.originalPrice}
                discount={product.discount}
                slug={product.slug}
              />
            ))}
          </div>
        )}

        <div className="flex justify-center mt-8">
          <Button
            variant="secondary"
            className="bg-white text-black hover:bg-white/10 border border-muted-foreground"
          >
            View All
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopSelling;