import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface ProductCardProps {
  image: string;
  title: string;
  rating: number;
  price: number;
  originalPrice?: number;
  discount?: number;
}

export default function ProductCard({
  image,
  title,
  rating,
  price,
  originalPrice,
  discount,
}: ProductCardProps) {
  // Generate stars based on rating
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <Card className="overflow-hidden bg-transparent border-none shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <Link href="/product/1">
          <div className="relative aspect-square">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-4">
            <h3 className="font-medium text-lg mb-2 text-black">{title}</h3>
            <div className="flex items-center mb-2">
              {[...Array(fullStars)].map((_, i) => (
                <Star key={i} size={16} fill="#FFC633" color="#FFC633" />
              ))}
              {hasHalfStar && <StarHalf size={16} fill="#eee" color="#eee" />}
              <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
            </div>
            <div className="flex items-center">
              <span className="font-bold text-lg text-black">${price}</span>
              {originalPrice && (
                <span className="ml-2 text-muted-foreground line-through text-sm">
                  ${originalPrice}
                </span>
              )}
              {discount && (
                <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                  -{discount}%
                </span>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
