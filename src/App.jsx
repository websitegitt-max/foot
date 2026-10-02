import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, X, ChevronRight, Star, ShieldCheck, 
  Truck, RotateCcw, Award, Menu, Check, SlidersHorizontal, ArrowRight,
  Plus, Minus, Trash2, Send, ArrowLeft, Zap, ThumbsUp
} from 'lucide-react';

// SET YOUR WHATSAPP NUMBER HERE (with country code, no + or spaces)
const STORE_WHATSAPP_NUMBER = '7782962661'; 

const PRODUCTS = [
  {
    id: 1,
    name: "The Milano Minimalist Court",
    category: "Sneakers",
    price: 2999,
    salePrice: 2499,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    description: "Handcrafted from top-grade full-grain nappa leather. Features high-density memory cushioning and durable Margom-style cup soles for day-long walking ease.",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 12,
    reviews: [
      { id: 1, author: "Vikas M.", rating: 5, date: "2 days ago", comment: "Exceptional leather feel. The cushioning is softer than most branded sneakers." },
      { id: 2, author: "Arjun K.", rating: 5, date: "1 week ago", comment: "Clean silhouette and true to UK size. Looks amazing with chinos." }
    ]
  },
  {
    id: 2,
    name: "Sorrento Venetian Suede Loafer",
    category: "Loafers",
    price: 3499,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Signature",
    description: "Unlined butter-soft calf suede with Blake-stitched flexible leather soles. Fits like a glove right out of the box with zero break-in period.",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 7,
    reviews: [
      { id: 1, author: "Rohan D.", rating: 5, date: "3 days ago", comment: "Super luxurious suede texture. Very comfortable for formal events." },
      { id: 2, author: "Manish S.", rating: 4, date: "2 weeks ago", comment: "Comfortable and light. Highly recommended." }
    ]
  },
  {
    id: 3,
    name: "The Rainier Field Boot",
    category: "Boots",
    price: 4499,
    salePrice: 3999,
    rating: 5.0,
    reviewsCount: 64,
    badge: "Editor's Choice",
    description: "Rugged oiled pull-up leather with storm welt construction and heavy-duty commando lug outsoles for unmatched traction on all terrains.",
    images: [
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 5,
    reviews: [
      { id: 1, author: "Sameer N.", rating: 5, date: "Just now", comment: "Rock-solid build quality. Heavy leather that ages gracefully." }
    ]
  },
  {
    id: 4,
    name: "Riviera Woven Mule",
    category: "Sandals",
    price: 1999,
    salePrice: null,
    rating: 4.7,
    reviewsCount: 53,
    badge: "New Arrival",
    description: "Hand-braided supple leather upper resting on an ergonomic padded footbed. Designed for effortless indoor-outdoor slip-on comfort.",
    images: [
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 9,
    reviews: [
      { id: 1, author: "Gaurav P.", rating: 5, date: "4 days ago", comment: "Breathable and soft. Doesn't bite the feet at all." }
    ]
  },
  {
    id: 5,
    name: "Aerolight Mesh Trainer",
    category: "Sneakers",
    price: 2199,
    salePrice: 1799,
    rating: 4.6,
    reviewsCount: 210,
    badge: "Sale",
    description: "Ultralight breathable mesh shoe engineered for daily gym routines, morning jogs, and active urban commutes.",
    images: [
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 20,
    reviews: [
      { id: 1, author: "Pooja B.", rating: 5, date: "5 days ago", comment: "Weighs almost nothing and feels like walking on clouds." }
    ]
  },
  {
    id: 6,
    name: "Chelsea Royale 360",
    category: "Boots",
    price: 3999,
    salePrice: null,
    rating: 4.9,
    reviewsCount: 115,
    badge: "Bestseller",
    description: "Handcrafted Chelsea boot featuring durable elastic stretch gore panels and premium burnished full-grain crust leather.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 14,
    reviews: [
      { id: 1, author: "Kunal T.", rating: 5, date: "1 week ago", comment: "Fits snugly around the ankle. Premium quality finish." }
    ]
  },
  {
    id: 7,
    name: "Kensington Wholecut Oxford",
    category: "Dress",
    price: 4299,
    salePrice: null,
    rating: 5.0,
    reviewsCount: 47,
    badge: "Heritage",
    description: "Cut from a single seamless piece of premium leather with beveled waist soles and high mirror-gloss toe box.",
    images: [
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 8,
    reviews: [
      { id: 1, author: "Rajesh V.", rating: 5, date: "3 weeks ago", comment: "Genuine wholecut oxfords are impossible to find at this price. 10/10." }
    ]
  },
  {
    id: 8,
    name: "Amalfi Two-Strap Slide",
    category: "Sandals",
    price: 1599,
    salePrice: 1299,
    rating: 4.5,
    reviewsCount: 78,
    badge: "Sale",
    description: "Anatomically contoured cork footbed wrapped in supple suede with brushed anti-rust metal buckles.",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 15,
    reviews: [
      { id: 1, author: "Deepak M.", rating: 5, date: "1 month ago", comment: "The cork footbed shapes nicely to the foot arch." }
    ]
  },
  {
    id: 9,
    name: "Vanguard Retro Runner",
    category: "Sneakers",
    price: 2499,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 160,
    badge: "Trending",
    description: "Vintage 70s track styling with split-suede overlays, breathable mesh underlays, and herringbone gum tread.",
    images: [
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 11,
    reviews: [
      { id: 1, author: "Tarun G.", rating: 5, date: "2 days ago", comment: "Retro aesthetic done right. Very lightweight." }
    ]
  },
  {
    id: 10,
    name: "Geneva Horsebit Loafer",
    category: "Loafers",
    price: 3699,
    salePrice: 3199,
    rating: 4.9,
    reviewsCount: 92,
    badge: "Staff Pick",
    description: "Gold-tone snaffle horsebit buckle sitting over hand-burnished crust leather with full cowhide lining.",
    images: [
      "https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 6,
    reviews: [
      { id: 1, author: "Aditya C.", rating: 5, date: "1 week ago", comment: "Buckle has nice weight and doesn't rattle. Looks very rich." }
    ]
  },
  {
    id: 11,
    name: "Atlas Heavy Derby",
    category: "Dress",
    price: 3799,
    salePrice: null,
    rating: 4.7,
    reviewsCount: 59,
    badge: "Durable",
    description: "Durable commando rubber sole with weather-resistant scotch-grain pebble leather. Built for daily corporate wear.",
    images: [
      "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 10,
    reviews: [
      { id: 1, author: "Suresh P.", rating: 4, date: "2 weeks ago", comment: "Sturdy and provides great grip even on wet surfaces." }
    ]
  },
  {
    id: 12,
    name: "St. Moritz Combat Boot",
    category: "Boots",
    price: 4699,
    salePrice: null,
    rating: 5.0,
    reviewsCount: 38,
    badge: "Winter Warmth",
    description: "Insulated interior lining, storm-beaded welts, and rugged high-traction lugs for cold season protection.",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 4,
    reviews: [
      { id: 1, author: "Naveen J.", rating: 5, date: "1 month ago", comment: "Super heavy duty, exactly what I needed for hill station rides." }
    ]
  },
  {
    id: 13,
    name: "Capri Fisherman Sandal",
    category: "Sandals",
    price: 2299,
    salePrice: null,
    rating: 4.6,
    reviewsCount: 44,
    badge: "Limited",
    description: "Traditional closed-toe fisherman design handcrafted with supple interlocking leather straps and cushioned footbed.",
    images: [
      "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 7,
    reviews: [
      { id: 1, author: "Harsh L.", rating: 5, date: "3 weeks ago", comment: "Protects the toes while keeping feet cool." }
    ]
  },
  {
    id: 14,
    name: "Bespoke Medallion Brogue",
    category: "Dress",
    price: 4199,
    salePrice: 3599,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Sale",
    description: "Artisanal wingtip broguing with hand-applied burnished museum patina finish and stacked leather heel.",
    images: [
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 8,
    reviews: [
      { id: 1, author: "Karan B.", rating: 5, date: "4 days ago", comment: "The toe perforation details are super sharp. Worth every rupee." }
    ]
  },
  {
    id: 15,
    name: "Solstice Linen Espadrille",
    category: "Loafers",
    price: 1499,
    salePrice: 1199,
    rating: 4.4,
    reviewsCount: 96,
    badge: "Summer",
    description: "Pure woven flax linen upper attached to authentic braided jute rope and vulcanized slip-resistant gum base.",
    images: [
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 18,
    reviews: [
      { id: 1, author: "Vivek R.", rating: 4, date: "1 month ago", comment: "Ideal for beach vacations and casual weekend wear." }
    ]
  },
  {
    id: 16,
    name: "Vertex Trail Runner",
    category: "Sneakers",
    price: 2899,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 112,
    badge: "High Tech",
    description: "Reinforced ripstop composite upper with responsive cushioned shank and high-traction all-weather studded tread.",
    images: [
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 13,
    reviews: [
      { id: 1, author: "Aakash S.", rating: 5, date: "2 weeks ago", comment: "Great traction on trails and wet pavement." }
    ]
  },
  {
    id: 17,
    name: "Double Monk Strap Shoes",
    category: "Dress",
    price: 3999,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 67,
    badge: "Classic",
    description: "Dual polished gunmetal buckles with chiseled toe profile and soft padded insole for sharp formal styling.",
    images: [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 9,
    reviews: [
      { id: 1, author: "Tanmay M.", rating: 5, date: "1 week ago", comment: "Gets compliments every time I wear these to meetings." }
    ]
  },
  {
    id: 18,
    name: "Highland Waxed Chukka Boot",
    category: "Boots",
    price: 3499,
    salePrice: 2899,
    rating: 4.7,
    reviewsCount: 73,
    badge: "Sale",
    description: "Water-resistant waxed suede ankle boot with soft lining and crepe-textured shock-absorbing sole.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [7, 8, 9, 10, 11],
    stock: 11,
    reviews: [
      { id: 1, author: "Rohit R.", rating: 5, date: "5 days ago", comment: "Comfortable right out of the box. Nice rugged suede look." }
    ]
  },
  {
    id: 19,
    name: "Classic Driving Loafer",
    category: "Loafers",
    price: 2699,
    salePrice: null,
    rating: 4.9,
    reviewsCount: 131,
    badge: "Icon",
    description: "Flexible tubular moccasin construction with rubber grip nubs extending up the heel counter for driving comfort.",
    images: [
      "https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 16,
    reviews: [
      { id: 1, author: "Varun H.", rating: 5, date: "3 days ago", comment: "Pure comfort during long highway drives." }
    ]
  },
  {
    id: 20,
    name: "Leather Thong Sandal",
    category: "Sandals",
    price: 1299,
    salePrice: 999,
    rating: 4.3,
    reviewsCount: 52,
    badge: "Best Value",
    description: "Comfortable leather toe-strap with contoured arch support and anti-skid rubber bottom for daily use.",
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop"
    ],
    sizes: [6, 7, 8, 9, 10],
    stock: 22,
    reviews: [
      { id: 1, author: "Sunil D.", rating: 4, date: "2 weeks ago", comment: "Good quality daily slippers with genuine leather strap." }
    ]
  }
];

export default function App() {
  // Navigation View State: 'catalog' | 'product-detail'
  const [currentView, setCurrentView] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);

  // Cart & UI State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('as_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Customer Checkout Details
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  useEffect(() => {
    localStorage.setItem('as_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle opening a product in dedicated page
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setSelectedSize(product.sizes[1] || product.sizes[0]);
    setCurrentView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToCatalog = () => {
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add to Bag action
  const addToBag = (product, size) => {
    const chosenSize = size || product.sizes[0];
    const itemKey = `${product.id}-${chosenSize}`;

    setCart(prev => {
      const existing = prev.find(item => item.key === itemKey);
      if (existing) {
        return prev.map(item => item.key === itemKey ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, {
        key: itemKey,
        id: product.id,
        name: product.name,
        price: product.salePrice || product.price,
        image: product.images[0],
        size: chosenSize,
        qty: 1
      }];
    });

    setIsCartOpen(true);
  };

  // Direct "Buy Now" Action
  const handleBuyNow = (product, size) => {
    const chosenSize = size || product.sizes[0];
    const itemKey = `${product.id}-${chosenSize}`;

    setCart([{
      key: itemKey,
      id: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: chosenSize,
      qty: 1
    }]);

    setCheckoutModalOpen(true);
  };

  const updateCartQty = (key, delta) => {
    setCart(prev => prev.map(item => {
      if (item.key === key) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    }).sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      if (sortBy === 'low-high') return priceA - priceB;
      if (sortBy === 'high-low') return priceB - priceA;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.id - b.id;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Similar Products Suggestion
  const similarProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return PRODUCTS
      .filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id)
      .slice(0, 4);
  }, [selectedProduct]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const freeShippingThreshold = 1999;
  const deliveryFee = cartTotal >= freeShippingThreshold || cartTotal === 0 ? 0 : 99;
  const finalTotal = cartTotal + deliveryFee;

  // Complete Order & Redirect to WhatsApp
  const handleCompleteOrderWhatsApp = (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    let itemsText = cart.map((item, index) => 
      `${index + 1}. *${item.name}*\n   • Size: UK/India ${item.size}\n   • Quantity: ${item.qty}\n   • Price: ₹${item.price} each (₹${item.price * item.qty})`
    ).join('\n\n');

    const message = 
`🛍️ *NEW FOOTWEAR ORDER*

*Order Items:*
-----------------------------
${itemsText}

-----------------------------
*Items Total:* ₹${cartTotal}
*Delivery Charges:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
*Grand Total Payable:* *₹${finalTotal}*
*Payment Mode:* ${customer.paymentMethod}

📍 *Delivery Address:*
• *Customer Name:* ${customer.name}
• *Mobile Number:* ${customer.phone}
• *Address:* ${customer.address}
• *City:* ${customer.city}
• *Pincode:* ${customer.pincode}

Please confirm my order and share dispatch details!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    setCart([]);
    setCheckoutModalOpen(false);
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs tracking-wider uppercase py-2.5 px-4 text-center flex items-center justify-center gap-2 border-b border-stone-800">
        <span>Handcrafted Quality Footwear</span>
        <span className="opacity-40">•</span>
        <span className="font-semibold text-amber-400">Free Delivery on Orders Over ₹1,999</span>
        <span className="opacity-40">•</span>
        <span>Instant WhatsApp Confirmation</span>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-4 lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 hover:bg-stone-100 rounded-lg">
              <Menu className="w-6 h-6 text-stone-800" />
            </button>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide">
            {['All', 'Sneakers', 'Loafers', 'Boots', 'Dress', 'Sandals'].map(cat => (
              <button 
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  returnToCatalog();
                }}
                className={`transition-colors pb-1 border-b-2 ${
                  selectedCategory === cat && currentView === 'catalog' ? 'border-stone-900 text-stone-900 font-semibold' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Logo */}
          <div className="text-center cursor-pointer" onClick={returnToCatalog}>
            <span className="block text-2xl font-serif font-bold tracking-widest text-stone-900">AURA SOLEIL</span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-800 font-medium -mt-1">Fine Footwear Shop</span>
          </div>

          {/* Search & Cart (No Like/Wishlist Icon) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search shoes, boots..." 
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  if (currentView !== 'catalog') setCurrentView('catalog');
                }}
                className="w-full bg-stone-100 text-xs rounded-full pl-9 pr-3 py-2 border-transparent focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="text-xs font-semibold pr-1">Bag</span>
              {cart.reduce((a, b) => a + b.qty, 0) > 0 && (
                <span className="bg-amber-600 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-t border-stone-200 px-6 py-4 space-y-3">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search styles..." 
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  returnToCatalog();
                }}
                className="w-full bg-stone-100 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none"
              />
            </div>
            {['All', 'Sneakers', 'Loafers', 'Boots', 'Dress', 'Sandals'].map(cat => (
              <button 
                key={cat}
                onClick={() => { 
                  setSelectedCategory(cat); 
                  setMobileMenuOpen(false); 
                  returnToCatalog();
                }}
                className="block w-full text-left py-2 font-medium text-stone-800 hover:text-amber-800"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* VIEW 1: PRODUCT CATALOG INTERFACE */}
      {currentView === 'catalog' && (
        <>
          {/* Editorial Banner */}
          <section className="relative bg-stone-950 text-white overflow-hidden py-20 sm:py-24">
            <div className="absolute inset-0 opacity-40 mix-blend-overlay">
              <img 
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop" 
                alt="Handcrafted Shoes" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative max-w-5xl mx-auto px-6 text-center space-y-5">
              <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-amber-400">
                Atelier Handcrafted Footwear
              </span>
              <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight">
                Crafted for Comfort. <br className="hidden sm:inline" />
                <span className="italic font-normal">Engineered to Last.</span>
              </h1>
              <p className="max-w-xl mx-auto text-stone-300 text-sm font-light">
                Discover genuine leather sneakers, loafers, and boots designed for timeless daily elegance.
              </p>
            </div>
          </section>

          {/* Trust Highlights */}
          <section className="border-b border-stone-200 bg-white">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center space-y-1">
                <ShieldCheck className="w-6 h-6 text-amber-800" />
                <span className="font-semibold text-xs uppercase tracking-wider">Premium Hides</span>
                <span className="text-[11px] text-stone-500">Full-grain & calfskin</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Award className="w-6 h-6 text-amber-800" />
                <span className="font-semibold text-xs uppercase tracking-wider">Artisan Stitching</span>
                <span className="text-[11px] text-stone-500">Hand-finished construction</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <Truck className="w-6 h-6 text-amber-800" />
                <span className="font-semibold text-xs uppercase tracking-wider">Free Shipping</span>
                <span className="text-[11px] text-stone-500">On all orders above ₹1,999</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <RotateCcw className="w-6 h-6 text-amber-800" />
                <span className="font-semibold text-xs uppercase tracking-wider">7-Day Size Exchange</span>
                <span className="text-[11px] text-stone-500">Hassle-free on WhatsApp</span>
              </div>
            </div>
          </section>

          {/* Collection Grid Controls */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
              <div>
                <h2 className="text-2xl font-serif font-bold text-stone-900 capitalize">
                  {selectedCategory === 'All' ? 'All Footwear Styles' : `${selectedCategory} Collection`}
                </h2>
                <p className="text-xs text-stone-500 mt-1">Showing {filteredProducts.length} shoe models</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-1.5 text-xs text-stone-700">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Sort By:</span>
                  <select 
                    value={sortBy} 
                    onChange={e => setSortBy(e.target.value)} 
                    className="bg-transparent font-medium focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Featured</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* 20 Products Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(p => (
                <div 
                  key={p.id} 
                  onClick={() => openProductDetail(p)}
                  className="group cursor-pointer bg-white rounded-2xl p-3 border border-stone-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-stone-100">
                      <img 
                        src={p.images[0]} 
                        alt={p.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {p.badge && (
                        <span className="absolute top-3 left-3 bg-stone-900/90 text-white text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {p.badge}
                        </span>
                      )}

                      <div className="absolute bottom-3 inset-x-3 bg-stone-900/90 text-white py-2.5 rounded-lg text-xs font-semibold tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5">
                        View Product <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div className="mt-4 px-1">
                      <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                        <span className="uppercase tracking-widest">{p.category}</span>
                        <div className="flex items-center gap-1 text-stone-700">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          <span>{p.rating}</span>
                          <span className="text-stone-400">({p.reviewsCount})</span>
                        </div>
                      </div>

                      <h3 className="font-serif font-semibold text-stone-900 text-base group-hover:text-amber-800 transition-colors line-clamp-1">
                        {p.name}
                      </h3>

                      <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between px-1">
                    <div>
                      {p.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-900 text-base">₹{p.salePrice}</span>
                          <span className="text-stone-400 line-through text-xs">₹{p.price}</span>
                        </div>
                      ) : (
                        <span className="font-bold text-stone-900 text-base">₹{p.price}</span>
                      )}
                    </div>

                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-900 group-hover:underline">
                      Inspect &rarr;
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* VIEW 2: DEDICATED FULL PRODUCT DETAIL PAGE (PDP) */}
      {currentView === 'product-detail' && selectedProduct && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Breadcrumb Navigation */}
          <button 
            onClick={returnToCatalog}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-stone-500 hover:text-stone-900 font-semibold mb-8 group transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Catalog
          </button>

          {/* Product Gallery & Buy Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80 shadow-sm">
            
            {/* Multi-Angle Images Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-stone-100 rounded-2xl overflow-hidden shadow-inner">
                <img 
                  src={selectedProduct.images[activeImageIndex]} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Angle Selector Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {selectedProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIndex === idx ? 'border-stone-900 scale-95 shadow-md' : 'border-stone-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Angle ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Meta & Purchase Controls */}
            <div className="flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-amber-800 font-bold">
                    {selectedProduct.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold bg-amber-50 px-2.5 py-1 rounded-full text-amber-900 border border-amber-200/60">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-stone-400">({selectedProduct.reviewsCount} Reviews)</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-2">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-baseline gap-3 mt-4">
                  <span className="text-3xl font-bold text-stone-900">
                    ₹{selectedProduct.salePrice || selectedProduct.price}
                  </span>
                  {selectedProduct.salePrice && (
                    <>
                      <span className="text-base text-stone-400 line-through">₹{selectedProduct.price}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Save ₹{selectedProduct.price - selectedProduct.salePrice}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-600 mt-5 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* UK / India Size Picker */}
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs uppercase tracking-wider font-bold text-stone-800">
                      Select UK / India Size
                    </label>
                    <span className="text-xs text-stone-500 underline cursor-pointer">Size Guide</span>
                  </div>

                  <div className="flex flex-wrap gap-2.5">
                    {selectedProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all flex items-center justify-center border ${
                          selectedSize === size 
                            ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                            : 'border-stone-300 text-stone-800 hover:border-stone-500 bg-white'
                        }`}
                      >
                        UK {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stock Assurance */}
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-700 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  In Stock & Ready for Immediate Dispatch
                </div>
              </div>

              {/* Action Buttons: Add to Bag & Buy Now */}
              <div className="mt-8 pt-6 border-t border-stone-100 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button 
                    onClick={() => addToBag(selectedProduct, selectedSize)}
                    className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 border border-stone-300"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add To Bag
                  </button>

                  <button 
                    onClick={() => handleBuyNow(selectedProduct, selectedSize)}
                    className="w-full bg-stone-900 text-white hover:bg-amber-800 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-stone-900/10"
                  >
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" /> Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Verified Customer Reviews Section */}
          <section className="mt-16 bg-white rounded-3xl p-6 sm:p-10 border border-stone-200/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-100 gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Customer Reviews</h3>
                <p className="text-xs text-stone-500 mt-1">Verified buyer experiences for this shoe</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-2xl font-bold text-stone-900">{selectedProduct.rating}</span>
                  <span className="text-stone-400 text-xs"> / 5.0</span>
                  <p className="text-[11px] text-stone-500">Based on {selectedProduct.reviewsCount} buyers</p>
                </div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {selectedProduct.reviews.map(review => (
                <div key={review.id} className="p-5 bg-stone-50 rounded-2xl border border-stone-200/60">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-stone-900 flex items-center gap-1.5">
                      {review.author} 
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Verified
                      </span>
                    </span>
                    <span className="text-[11px] text-stone-400">{review.date}</span>
                  </div>
                  <div className="flex text-amber-500 mb-2">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3 h-3 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Similar Products Recommendation */}
          {similarProducts.length > 0 && (
            <section className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-stone-900">Similar Pair Recommendations</h3>
                  <p className="text-xs text-stone-500 mt-1">Other popular picks in {selectedProduct.category}</p>
                </div>
                <button 
                  onClick={returnToCatalog} 
                  className="text-xs font-semibold uppercase tracking-wider text-amber-900 underline"
                >
                  View All
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarProducts.map(sim => (
                  <div 
                    key={sim.id}
                    onClick={() => openProductDetail(sim)}
                    className="group cursor-pointer bg-white rounded-2xl p-3 border border-stone-200/80 hover:shadow-lg transition-all"
                  >
                    <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden">
                      <img src={sim.images[0]} alt={sim.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div className="mt-3 px-1">
                      <h4 className="font-serif font-semibold text-sm text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                        {sim.name}
                      </h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs font-bold text-stone-900">₹{sim.salePrice || sim.price}</span>
                        <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Explore &rarr;</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        </main>
      )}

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-14 border-t border-stone-800 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">AURA SOLEIL FOOTWEAR</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Curated footwear designed for modern comfort, high durability, and everyday confidence.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">Customer Assistance</h4>
            <p className="text-stone-400 text-xs">Direct WhatsApp dispatch and size exchange updates.</p>
            <p className="text-stone-400 text-xs mt-1">Operational Hours: 10:00 AM – 8:00 PM</p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">Store Policy</h4>
            <p className="text-stone-400 text-xs">7-day doorstep size exchange guaranteed.</p>
            <p className="text-stone-400 text-xs mt-1">Cash on Delivery available on eligible pin codes.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-stone-900 pt-6 text-center text-stone-600">
          © {new Date().getFullYear()} AURA SOLEIL. Direct WhatsApp Ordering System.
        </div>
      </footer>

      {/* SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" onClick={() => setIsCartOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
              
              <div className="p-5 border-b border-stone-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-stone-800" />
                  <h3 className="font-serif font-bold text-lg">Your Bag ({cart.reduce((a, b) => a + b.qty, 0)})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free delivery badge */}
              <div className="bg-amber-50/70 p-4 border-b border-amber-100 text-xs">
                {cartTotal >= freeShippingThreshold ? (
                  <span className="font-medium text-amber-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> You qualified for FREE Delivery!
                  </span>
                ) : (
                  <p className="text-stone-700">
                    Add items worth <span className="font-bold text-stone-900">₹{freeShippingThreshold - cartTotal}</span> more for Free Delivery.
                  </p>
                )}
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-stone-500 text-sm">Your shopping bag is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs uppercase tracking-wider font-semibold text-stone-900 underline"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.key} className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-stone-200" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">{item.name}</h4>
                        <span className="text-[11px] text-stone-500 block mt-0.5">Size: UK {item.size}</span>
                        <span className="font-bold text-xs text-stone-800 block mt-1">₹{item.price}</span>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-300 rounded bg-white">
                            <button onClick={() => updateCartQty(item.key, -1)} className="px-2 py-0.5 text-stone-500 hover:text-black">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium">{item.qty}</span>
                            <button onClick={() => updateCartQty(item.key, 1)} className="px-2 py-0.5 text-stone-500 hover:text-black">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <button onClick={() => updateCartQty(item.key, -item.qty)} className="text-stone-400 hover:text-red-500">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-5 border-t border-stone-200 bg-stone-50 space-y-3">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-stone-900">₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Delivery Fee</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Final Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>

                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setCheckoutModalOpen(true);
                    }}
                    className="w-full bg-stone-900 hover:bg-amber-800 text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
                  >
                    Proceed To Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT & PLACE ORDER INTERFACE (DIRECT TO WHATSAPP) */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <button onClick={() => setCheckoutModalOpen(false)} className="absolute top-5 right-5 text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-stone-900">Place Order & WhatsApp</h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Enter your shipping details. Your order will format and open immediately on WhatsApp.
              </p>

              <form onSubmit={handleCompleteOrderWhatsApp} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Rahul Sharma" 
                    value={customer.name}
                    onChange={e => setCustomer({...customer, name: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">WhatsApp Mobile Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="e.g. 9876543210" 
                    value={customer.phone}
                    onChange={e => setCustomer({...customer, phone: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Complete Delivery Address *</label>
                  <textarea 
                    rows={2}
                    required
                    placeholder="House/Flat No., Apartment, Street, Landmark" 
                    value={customer.address}
                    onChange={e => setCustomer({...customer, address: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">City *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Bengaluru" 
                      value={customer.city}
                      onChange={e => setCustomer({...customer, city: e.target.value})}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Pincode *</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 560001" 
                      value={customer.pincode}
                      onChange={e => setCustomer({...customer, pincode: e.target.value})}
                      className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-stone-600 mb-1">Payment Method</label>
                  <select 
                    value={customer.paymentMethod}
                    onChange={e => setCustomer({...customer, paymentMethod: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                    <option value="UPI / Online Transfer on WhatsApp">UPI / Online Transfer on WhatsApp</option>
                  </select>
                </div>

                {/* Bill Summary */}
                <div className="mt-4 p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-1.5">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Total Quantity:</span>
                    <span>{cart.reduce((a, b) => a + b.qty, 0)} pair(s)</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Delivery Charge:</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Payable Total:</span>
                    <span className="text-emerald-700">₹{finalTotal}</span>
                  </div>
                </div>

                {/* Final WhatsApp Trigger Button */}
                <button 
                  type="submit"
                  className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" /> Place Order & Send on WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
