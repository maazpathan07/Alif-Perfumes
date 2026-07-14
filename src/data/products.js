import perfume1 from "../assets/products/perfume-1.png";
import perfume2 from "../assets/products/perfume-2.png";

const products = [
  {
    id: 1,
    slug: "royal-oud",

    name: "Royal Oud",

    brand: "Alif Perfumes",

    category: "Arabic Perfumes",

    sku: "ALF-001",

    price: 2499,
    discountPrice: null,

    rating: 4.9,
    totalReviews: 128,

    image: perfume1,
    images: [
      perfume1,
    ],

    featured: true,
    bestSeller: true,
    newArrival: false,

    inStock: true,
    stock: 20,

    shortDescription:
      "Premium Arabic fragrance with long-lasting luxurious notes.",

    description:
      "Premium Arabic fragrance crafted with long-lasting notes for everyday elegance. A luxurious scent suitable for daily use and special occasions.",

    features: [
      "Long Lasting",
      "Premium Quality",
      "100% Original",
      "Ideal Gift",
    ],
  },

  {
    id: 2,
    slug: "amber-gold",

    name: "Amber Gold",

    brand: "Alif Perfumes",

    category: "Arabic Perfumes",

    sku: "ALF-002",

    price: 1999,
    discountPrice: 1799,

    rating: 4.8,
    totalReviews: 94,

    image: perfume2,
    images: [
      perfume2,
    ],

    featured: true,
    bestSeller: false,
    newArrival: true,

    inStock: true,
    stock: 15,

    shortDescription:
      "Rich amber fragrance with elegant oriental notes.",

    description:
      "A rich and elegant Arabic fragrance with warm amber notes that leave a lasting impression.",

    features: [
      "Long Lasting",
      "Premium Quality",
      "100% Original",
      "Luxury Packaging",
    ],
  },

  {
    id: 3,
    slug: "musk-elite",

    name: "Musk Elite",

    brand: "Alif Perfumes",

    category: "Attars",

    sku: "ALF-003",

    price: 2999,
    discountPrice: null,

    rating: 5,
    totalReviews: 76,

    image: perfume1,
    images: [
      perfume1,
    ],

    featured: false,
    bestSeller: true,
    newArrival: false,

    inStock: true,
    stock: 10,

    shortDescription:
      "Premium alcohol-free musk attar.",

    description:
      "A premium alcohol-free attar with a smooth musk fragrance, perfect for everyday use.",

    features: [
      "Alcohol Free",
      "Premium Quality",
      "Long Lasting",
      "Original Product",
    ],
  },

  {
    id: 4,
    slug: "black-rose",

    name: "Black Rose",

    brand: "Alif Perfumes",

    category: "Gift Sets",

    sku: "ALF-004",

    price: 1799,
    discountPrice: null,

    rating: 4.7,
    totalReviews: 52,

    image: perfume2,
    images: [
      perfume2,
    ],

    featured: false,
    bestSeller: false,
    newArrival: true,

    inStock: true,
    stock: 8,

    shortDescription:
      "Luxury fragrance gift set for every occasion.",

    description:
      "Beautifully packed fragrance gift set for family, friends and special occasions.",

    features: [
      "Elegant Packaging",
      "Premium Quality",
      "Perfect Gift",
      "Original Product",
    ],
  },
];

export default products;