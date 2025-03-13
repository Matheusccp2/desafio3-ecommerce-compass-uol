export class CreateProductDto {
  title: string;
  description?: string;
  image: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  categoryId?: number;
}
