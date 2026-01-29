import type {Product} from "../types/product";

export const createProduct = (index: number): Product => ({
  id: index + 1,
  title: `Товар ${index + 1}`,
  price: 10 + index,
  description: `Описание товара ${index + 1}`,
  category: "Не указано",
  image: "/placeholder-image.jpg",
});