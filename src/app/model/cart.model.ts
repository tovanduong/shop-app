export interface cartInfo {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface cart {
  id: string;
  name: string;
  cart: cartInfo[];
}
