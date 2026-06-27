// Shared TypeScript interfaces for the book_ecommerce project

export interface Book {
  title: string;
  price: string;
  img: string;
  hot?: boolean;
  cart?: boolean;
  discount?: string;
  oldPrice?: string;
}

export interface Product {
  id: number;
  title: string;
  author: string;
  price: string | number;
  oldPrice: string | number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
  image: string;
}

export interface SearchItem {
  title: string;
  author: string;
  price: string;
  image: string;
}

export interface SearchSection {
  category: string;
  items: SearchItem[];
}

export interface PromoItem {
  title: string;
  description: string;
  image: string;
  gradient: string;
}

export interface DealItem {
  title: string;
  description: string;
  image: string;
  bgColor: string;
}

export interface BookSpec {
  label: string;
  value: string;
  status?: boolean;
}

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

// Order Related Types
export interface OrderItem {
  productId: string;
  productTitle: string;
  productCode: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  _id?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  city: string;
  district: string;
  thana: string;
  country: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  _id?: string;
}

export interface OrderPricing {
  subtotal: number;
  shippingCharge: number;
  taxAmount: number;
  totalAmount: number;
}

export interface OrderPayment {
  method: "cod" | "mobile" | "bank";
  status: "pending" | "completed" | "failed" | "refunded";
  transactionId?: string;
}

export interface Order {
  _id?: string;
  user?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  orderNumber?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  pricing: OrderPricing;
  payment: OrderPayment;
  orderNotes?: string;
  orderStatus?:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateOrderRequest {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  items: Array<{
    productId: string;
    productTitle: string;
    productCode: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
  shippingAddress: ShippingAddress;
  pricing: OrderPricing;
  payment: {
    method: "cod" | "mobile" | "bank";
    status: "pending" | "completed" | "failed" | "refunded";
    transactionId?: string | null;
  };
  orderNotes?: string | null;
  orderStatus:
    | "pending"
    | "confirmed"
    | "processing"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";
}

export interface OrderResponse {
  message: string;
  data: Order;
}

export interface OrdersListResponse {
  data: Order[];
}
