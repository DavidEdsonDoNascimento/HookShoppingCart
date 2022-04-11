export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
}

export type ProductFormatted = Product & {
  priceFormatted: string;
}

export type ProductCartFormatted = ProductFormatted & {
  subTotal: number;
}