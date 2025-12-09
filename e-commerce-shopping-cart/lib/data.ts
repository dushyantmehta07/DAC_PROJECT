export interface Category {
  id: number
  name: string
  slug: string
  image_url: string
}

export interface Product {
  id: number
  name: string
  description: string
  price: number
  original_price: number | null
  image_url: string
  category_id: number
  stock: number
  rating: number
  review_count: number
}

export const categories: Category[] = [
  { id: 1, name: "Electronics", slug: "electronics", image_url: "/electronics-gadgets.png" },
  { id: 2, name: "Fashion", slug: "fashion", image_url: "/diverse-fashion-collection.png" },
  { id: 3, name: "Home & Kitchen", slug: "home-kitchen", image_url: "/home-kitchen-appliances.png" },
  { id: 4, name: "Books", slug: "books", image_url: "/books-library.jpg" },
  { id: 5, name: "Sports & Outdoors", slug: "sports-outdoors", image_url: "/sports-outdoor-equipment.jpg" },
  { id: 6, name: "Beauty & Personal Care", slug: "beauty", image_url: "/beauty-cosmetics.png" },
]

export const products: Product[] = [
  // Electronics
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "Premium noise-cancelling headphones with 30-hour battery life",
    price: 149.99,
    original_price: 199.99,
    image_url: "/wireless-bluetooth-headphones.jpg",
    category_id: 1,
    stock: 150,
    rating: 4.5,
    review_count: 2340,
  },
  {
    id: 2,
    name: "Smart Watch Pro",
    description: "Advanced fitness tracking with heart rate monitor and GPS",
    price: 299.99,
    original_price: 349.99,
    image_url: "/smart-watch-fitness.png",
    category_id: 1,
    stock: 80,
    rating: 4.7,
    review_count: 1890,
  },
  {
    id: 3,
    name: "4K Ultra HD Webcam",
    description: "Crystal clear video for streaming and video calls",
    price: 89.99,
    original_price: 129.99,
    image_url: "/4k-webcam-streaming.jpg",
    category_id: 1,
    stock: 200,
    rating: 4.3,
    review_count: 567,
  },
  {
    id: 4,
    name: "Portable Bluetooth Speaker",
    description: "Waterproof speaker with 360° sound and 24-hour playback",
    price: 79.99,
    original_price: 99.99,
    image_url: "/portable-bluetooth-speaker.jpg",
    category_id: 1,
    stock: 300,
    rating: 4.6,
    review_count: 3421,
  },
  {
    id: 5,
    name: "Wireless Charging Pad",
    description: "Fast charging for all Qi-enabled devices",
    price: 34.99,
    original_price: 49.99,
    image_url: "/wireless-charging-pad.png",
    category_id: 1,
    stock: 500,
    rating: 4.4,
    review_count: 892,
  },

  // Fashion
  {
    id: 6,
    name: "Classic Leather Jacket",
    description: "Genuine leather jacket with modern fit",
    price: 189.99,
    original_price: 249.99,
    image_url: "/leather-jacket-fashion.jpg",
    category_id: 2,
    stock: 45,
    rating: 4.8,
    review_count: 456,
  },
  {
    id: 7,
    name: "Premium Cotton T-Shirt Pack",
    description: "Set of 5 comfortable everyday t-shirts",
    price: 49.99,
    original_price: 69.99,
    image_url: "/cotton-tshirt-pack.jpg",
    category_id: 2,
    stock: 200,
    rating: 4.5,
    review_count: 1234,
  },
  {
    id: 8,
    name: "Designer Sneakers",
    description: "Comfortable and stylish everyday sneakers",
    price: 129.99,
    original_price: 159.99,
    image_url: "/designer-sneakers-shoes.jpg",
    category_id: 2,
    stock: 100,
    rating: 4.6,
    review_count: 789,
  },
  {
    id: 9,
    name: "Casual Denim Jeans",
    description: "Classic fit jeans with stretch comfort",
    price: 59.99,
    original_price: 79.99,
    image_url: "/denim-jeans-casual.jpg",
    category_id: 2,
    stock: 150,
    rating: 4.4,
    review_count: 567,
  },
  {
    id: 10,
    name: "Wool Winter Scarf",
    description: "Warm and soft merino wool scarf",
    price: 39.99,
    original_price: 54.99,
    image_url: "/wool-scarf-winter.jpg",
    category_id: 2,
    stock: 80,
    rating: 4.7,
    review_count: 234,
  },

  // Home & Kitchen
  {
    id: 11,
    name: "Air Fryer Pro",
    description: "Large capacity air fryer with digital controls",
    price: 119.99,
    original_price: 159.99,
    image_url: "/air-fryer-kitchen.jpg",
    category_id: 3,
    stock: 60,
    rating: 4.7,
    review_count: 2156,
  },
  {
    id: 12,
    name: "Robot Vacuum Cleaner",
    description: "Smart navigation with app control",
    price: 249.99,
    original_price: 349.99,
    image_url: "/robot-vacuum-cleaner.png",
    category_id: 3,
    stock: 40,
    rating: 4.5,
    review_count: 1678,
  },
  {
    id: 13,
    name: "Coffee Maker Deluxe",
    description: "12-cup programmable coffee maker",
    price: 79.99,
    original_price: 99.99,
    image_url: "/coffee-maker-machine.jpg",
    category_id: 3,
    stock: 90,
    rating: 4.6,
    review_count: 3421,
  },
  {
    id: 14,
    name: "Non-Stick Cookware Set",
    description: "10-piece premium cookware collection",
    price: 149.99,
    original_price: 199.99,
    image_url: "/cookware-set-pots-pans.jpg",
    category_id: 3,
    stock: 55,
    rating: 4.4,
    review_count: 892,
  },
  {
    id: 15,
    name: "Smart LED Bulbs Pack",
    description: "Color-changing WiFi bulbs (4-pack)",
    price: 44.99,
    original_price: 59.99,
    image_url: "/smart-led-bulbs.png",
    category_id: 3,
    stock: 200,
    rating: 4.3,
    review_count: 567,
  },

  // Books
  {
    id: 16,
    name: "The Art of Programming",
    description: "Comprehensive guide to modern software development",
    price: 49.99,
    original_price: 59.99,
    image_url: "/programming-book-code.jpg",
    category_id: 4,
    stock: 100,
    rating: 4.8,
    review_count: 1234,
  },
  {
    id: 17,
    name: "Business Strategy Masterclass",
    description: "Learn from top business leaders",
    price: 29.99,
    original_price: 39.99,
    image_url: "/business-strategy-book.jpg",
    category_id: 4,
    stock: 150,
    rating: 4.6,
    review_count: 567,
  },
  {
    id: 18,
    name: "Mindfulness & Meditation Guide",
    description: "Achieve inner peace and clarity",
    price: 19.99,
    original_price: 24.99,
    image_url: "/meditation-mindfulness-book.jpg",
    category_id: 4,
    stock: 200,
    rating: 4.7,
    review_count: 892,
  },
  {
    id: 19,
    name: "World History Encyclopedia",
    description: "Illustrated journey through human history",
    price: 59.99,
    original_price: 79.99,
    image_url: "/history-encyclopedia-book.jpg",
    category_id: 4,
    stock: 75,
    rating: 4.5,
    review_count: 345,
  },
  {
    id: 20,
    name: "Cooking Around the World",
    description: "International recipes from 50 countries",
    price: 34.99,
    original_price: 44.99,
    image_url: "/cooking-recipe-book.jpg",
    category_id: 4,
    stock: 120,
    rating: 4.4,
    review_count: 678,
  },

  // Sports & Outdoors
  {
    id: 21,
    name: "Yoga Mat Premium",
    description: "Extra thick non-slip yoga mat",
    price: 39.99,
    original_price: 54.99,
    image_url: "/yoga-mat-exercise.jpg",
    category_id: 5,
    stock: 180,
    rating: 4.6,
    review_count: 2341,
  },
  {
    id: 22,
    name: "Resistance Bands Set",
    description: "Complete set with 5 resistance levels",
    price: 24.99,
    original_price: 34.99,
    image_url: "/resistance-bands-fitness.jpg",
    category_id: 5,
    stock: 250,
    rating: 4.5,
    review_count: 1567,
  },
  {
    id: 23,
    name: "Camping Tent 4-Person",
    description: "Waterproof tent with easy setup",
    price: 159.99,
    original_price: 199.99,
    image_url: "/camping-tent-outdoor.jpg",
    category_id: 5,
    stock: 35,
    rating: 4.7,
    review_count: 456,
  },
  {
    id: 24,
    name: "Running Shoes Ultra",
    description: "Lightweight with maximum cushioning",
    price: 119.99,
    original_price: 149.99,
    image_url: "/running-shoes-athletic.jpg",
    category_id: 5,
    stock: 90,
    rating: 4.8,
    review_count: 3421,
  },
  {
    id: 25,
    name: "Fitness Tracker Band",
    description: "Track steps, sleep, and heart rate",
    price: 49.99,
    original_price: 69.99,
    image_url: "/fitness-tracker-band.jpg",
    category_id: 5,
    stock: 200,
    rating: 4.4,
    review_count: 1234,
  },

  // Beauty & Personal Care
  {
    id: 26,
    name: "Vitamin C Serum",
    description: "Brightening serum with hyaluronic acid",
    price: 29.99,
    original_price: 39.99,
    image_url: "/vitamin-c-serum-skincare.jpg",
    category_id: 6,
    stock: 150,
    rating: 4.7,
    review_count: 2678,
  },
  {
    id: 27,
    name: "Electric Toothbrush Pro",
    description: "Sonic cleaning with smart timer",
    price: 79.99,
    original_price: 99.99,
    image_url: "/electric-toothbrush.jpg",
    category_id: 6,
    stock: 100,
    rating: 4.6,
    review_count: 1892,
  },
  {
    id: 28,
    name: "Hair Dryer Professional",
    description: "Ionic technology for smooth results",
    price: 89.99,
    original_price: 119.99,
    image_url: "/hair-dryer-professional.jpg",
    category_id: 6,
    stock: 80,
    rating: 4.5,
    review_count: 1234,
  },
  {
    id: 29,
    name: "Organic Skincare Set",
    description: "Complete routine with natural ingredients",
    price: 69.99,
    original_price: 89.99,
    image_url: "/organic-skincare-set.png",
    category_id: 6,
    stock: 60,
    rating: 4.8,
    review_count: 567,
  },
  {
    id: 30,
    name: "Perfume Collection",
    description: "Set of 4 designer fragrances",
    price: 99.99,
    original_price: 139.99,
    image_url: "/perfume-fragrance-collection.jpg",
    category_id: 6,
    stock: 45,
    rating: 4.4,
    review_count: 345,
  },
]

export function getProductsByCategory(categoryId: number): Product[] {
  return products.filter((product) => product.category_id === categoryId)
}

export function getProductById(id: number): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.rating >= 4.6).slice(0, 8)
}

export function getDealsProducts(): Product[] {
  return products.filter((product) => product.original_price && product.original_price > product.price).slice(0, 6)
}
