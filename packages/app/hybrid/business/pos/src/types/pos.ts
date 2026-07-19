export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface CartItem {
  item: Item;
  quantity: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  subtotal: number;
  total: number;
  paymentMethod: 'cash';
  amountTendered: number;
  change: number;
  timestamp: string;
}
