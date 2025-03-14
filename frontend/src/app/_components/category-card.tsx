import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/app/_components/ui/card";

interface CategoryCardProps {
  image: string;
  title: string;
  className?: string;
}

export default function CategoryCard({ image, title }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow z-0 ">
      <CardContent className="p-0">
        <Link href={`/category/${title.toLowerCase()}`}>
          <div className="relative aspect-[3/4] ">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
            <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl z-20">
              {title}
            </h3>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
