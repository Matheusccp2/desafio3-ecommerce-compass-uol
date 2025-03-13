// app/products/[id]/page.tsx
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";

interface ProductDetail {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  category?: {
    id: number;
    name: string;
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;

  // Obter dados do produto da API NestJS
  const response = await fetch(`http://localhost:8080/products/${id}`, {
    // Isso garante que os dados sejam buscados a cada requisição
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch product with id: ${id}`);
  }

  const product: ProductDetail = await response.json();

  // Gerar estrelas com base na classificação
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 !== 0;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

          <div className="flex items-center mb-4">
            {Array.from({ length: fullStars }).map((_, i) => (
              <Star key={i} size={20} fill="#FFC633" color="#FFC633" />
            ))}
            {hasHalfStar && (
              <StarHalf size={20} fill="#FFC633" color="#FFC633" />
            )}
            <span className="ml-2 text-gray-600">{product.rating}/5</span>
          </div>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.originalPrice && (
              <span className="ml-3 text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
            {product.discount && (
              <span className="ml-3 bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                -{product.discount}%
              </span>
            )}
          </div>

          {product.category && (
            <div className="mb-4">
              <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {product.category.name}
              </span>
            </div>
          )}

          <p className="text-gray-700 mb-8">{product.description}</p>

          <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
