// Centralized mock data for the book_ecommerce project.
// Replace with real API calls once a backend is connected.

import type {
  Book,
  Product,
  CartItem,
  SearchSection,
  PromoItem,
  DealItem,
  BookSpec,
} from "@/types";

// ─── Vertical Book Cards ─────────────────────────────────────────────────────

export const BOOKS: Book[] = [
  {
    title: "Simple Things You To Save BOOK",
    price: "$30.00",
    oldPrice: "$39.99",
    img: "/images/samplebook.jpg",
    hot: true,
    discount: "-30%",
    cart: true,
  },
  {
    title: "সাইফুরস স্টুডেন্ট ভোকাবুলারি",
    price: "৳. 200",
    img: "/images/samplebook.jpg",
    hot: true,
    cart: true,
    discount: "-30%",
  },
  {
    title: "Qple Gpad With Retina Sisplay",
    price: "$19.00",
    img: "/images/samplebook.jpg",
    discount: "-12%",
    cart: true,
  },
  {
    title: "Flovely And Unicorn Erna",
    price: "$30.00",
    img: "/images/samplebook.jpg",
    cart: true,
  },
  {
    title: "How Deal With Very Bad BOOK",
    price: "$39.00",
    img: "/images/samplebook.jpg",
    cart: true,
  },
];

// ─── Horizontal Book Cards ────────────────────────────────────────────────────

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "এক পুলিশের না বলা গল্প",
    author: "মো: শহিদুল্লাহ",
    price: "৳30.00",
    oldPrice: "৳39.99",
    category: "Adventure",
    rating: 3.4,
    reviews: 25,
    image: "/images/bestbook.png",
  },
  {
    id: 2,
    title: "Qple GPad With Retina Display",
    author: "Wilson",
    price: 30.0,
    oldPrice: 39.99,
    category: "Adventure",
    rating: 3.4,
    reviews: 25,
    image: "/images/bestbook.png",
  },
  {
    id: 3,
    title: "Simple Things You To Save BOOK",
    author: "Wilson",
    price: 30.0,
    oldPrice: 39.99,
    category: "Adventure",
    rating: 3.4,
    reviews: 25,
    image: "/images/bestbook.png",
  },
];

// ─── Cart Items ───────────────────────────────────────────────────────────────

export const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "সবার জন্য Vocabulary",
    price: 30.0,
    quantity: 1,
    subtotal: 120.0,
    image: "/images/samplebook.jpg",
  },
  {
    id: 2,
    name: "Qple GPad With Retina Display",
    price: 30.0,
    quantity: 1,
    subtotal: 120.0,
    image: "/images/samplebook.jpg",
  },
  {
    id: 3,
    name: "Flovely And Unicorn Erna",
    price: 30.0,
    quantity: 1,
    subtotal: 120.0,
    image: "/images/samplebook.jpg",
  },
];

// ─── Search Data ──────────────────────────────────────────────────────────────

export const SEARCH_DATA: SearchSection[] = [
  {
    category: "Books",
    items: [
      {
        title: "ফ্রুটস ফুলের আসর (হার্ডকভার)",
        author: "আর শাখায় রবীন্দ্রনাথ মিশ্র",
        price: "160.50",
        image: "/images/samplebook.jpg",
      },
      {
        title: "সবার উপরে বিত্ত সত্য",
        author: "রাজিব আহমেদ",
        price: "160.00",
        image: "/images/samplebook3.jpg",
      },
      {
        title: "সবার জন্য Vocabulary",
        author: "মনোজ্ঞিন সাহা",
        price: "374.00",
        image: "/images/samplebook2.jpg",
      },
    ],
  },
];

// ─── Promotional Cards ────────────────────────────────────────────────────────

export const PROMO_ITEMS: PromoItem[] = [
  {
    title: "অপরাধ কাহিনির বই",
    description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
    image: "/images/promo-book1.png",
    gradient: "from-cyan-600 to-blue-500",
  },
  {
    title: "এক বছরে সাইকেলে",
    description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
    image: "/images/promo-book2.png",
    gradient: "from-blue-500 to-indigo-500",
  },
  {
    title: "ফুলের সাথে বেড়ে ওঠা",
    description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
    image: "/images/promo-book3.png",
    gradient: "from-blue-900 to-blue-700",
  },
];

// ─── Quick Deal Cards ─────────────────────────────────────────────────────────

export const DEALS: DealItem[] = [
  {
    title: "বেস্ট সেলার বই",
    description: "সবচেয়ে জনপ্রিয় বইগুলো দেখুন",
    image: "/images/card-img-1.webp",
    bgColor: "bg-emerald-50",
  },
  {
    title: "নতুন প্রকাশিত বই",
    description: "নতুন আসা বইগুলো এখনই দেখুন",
    image: "/images/card-img-2.webp",
    bgColor: "bg-orange-50",
  },
  {
    title: "রহস্য ও অপরাধ কাহিনি",
    description: "রোমাঞ্চকর ক্রাইম ও থ্রিলার বই",
    image: "/images/card-img-3.webp",
    bgColor: "bg-fuchsia-50",
  },
  {
    title: "শিশুদের বই",
    description: "বাচ্চাদের জন্য মজার ও শিক্ষামূলক বই",
    image: "/images/card-img-4.webp",
    bgColor: "bg-blue-50",
  },
];

// ─── Book Detail Page Data ────────────────────────────────────────────────────

export const BOOK_THUMBNAILS: string[] = [
  "/images/samplebook.jpg",
  "/images/samplebook3.jpg",
  "/images/samplebook2.jpg",
  "/images/samplebook3.jpg",
  "/images/samplebook.jpg",
];

export const BOOK_SPECS: BookSpec[] = [
  { label: "Availability", value: "Available", status: true },
  { label: "Categories", value: "Adventure" },
  { label: "Publish Date", value: "2022-10-24" },
  { label: "Total Page", value: "330" },
  { label: "Format", value: "Hardcover" },
  { label: "Country", value: "United States" },
  { label: "Language", value: "English" },
  { label: "Dimensions", value: "30 × 32 × 46 Inches" },
  { label: "Weight", value: "2.5 Pounds" },
];
