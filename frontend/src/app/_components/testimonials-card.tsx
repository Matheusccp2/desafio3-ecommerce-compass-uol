import { Star, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/app/_components/ui/card";

interface TestimonialCardProps {
  name: string;
  text: string;
  verified?: boolean;
}

export default function TestimonialCard({
  name,
  text,
  verified = true,
}: TestimonialCardProps) {
  return (
    <Card className="h-full bg-transparent border border-gray-300">
      <CardContent className="p-6">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} fill="#FFC633" color="#FFC633" />
          ))}
        </div>
        <div>
          <div className="flex items-center mb-2">
            <p className="font-medium text-black">{name}</p>
            {verified && (
              <CheckCircle size={16} className="ml-2 text-green-600" />
            )}
          </div>
          <p className="text-gray-600">{text}</p>
        </div>
      </CardContent>
    </Card>
  );
}
