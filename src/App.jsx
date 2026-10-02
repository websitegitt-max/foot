import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Search, X, ChevronRight, Star, ShieldCheck, 
  Truck, RotateCcw, Award, Menu, Check, SlidersHorizontal, ArrowRight,
  Plus, Minus, Trash2, Send
} from 'lucide-react';

// REPLACE THIS WITH THE SELLER'S WHATSAPP NUMBER (including country code, no + or spaces)
// e.g., '919876543210' for India
const STORE_WHATSAPP_NUMBER = '919876543210'; 

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
    description: "Handcrafted from full-grain nappa leather with durable comfort rubber outsoles.",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Classic White", "Chalk Ivory", "Onyx Black"],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 12
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
    description: "Unlined butter-soft calf suede with flexible hand-stitched soles.",
    images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Tobacco Tan", "Navy Deep", "Olive Suede"],
    sizes: [7, 8, 9, 10, 11],
    stock: 7
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
    description: "Rugged oiled leather with storm welt construction and heavy-duty grip soles.",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Dark Brown", "Auburn Waxed", "Matte Black"],
    sizes: [7, 8, 9, 10, 11],
    stock: 5
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
    description: "Artisanal hand-braided leather mule lined with breathable genuine leather.",
    images: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Cognac", "Sand Dune", "Black"],
    sizes: [6, 7, 8, 9, 10],
    stock: 9
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
    description: "Ultra-breathable recycled knit upper paired with high-rebound cushioning foam.",
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bone & Sage", "Triple Charcoal", "Glacier Blue"],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 20
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
    description: "Handcrafted Chelsea boot featuring durable elastic stretch gore panels and leather lining.",
    images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Espresso Burnished", "Obsidian Black"],
    sizes: [7, 8, 9, 10, 11],
    stock: 14
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
    description: "Cut from a single flawless hide of premium leather with beveled waist soles.",
    images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bordeaux Wine", "Piano Black", "Chestnut"],
    sizes: [7, 8, 9, 10, 11],
    stock: 8
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
    description: "Anatomically contoured cork footbed wrapped in supple suede with metal buckles.",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Mushroom", "Tuscan Ochre", "Midnight"],
    sizes: [6, 7, 8, 9, 10],
    stock: 15
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
    description: "Vintage silhouette with suede overlays and durable herringbone gum tread.",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Vintage Clay", "Forest Moss", "Off-White"],
    sizes: [6, 7, 8, 9, 10, 11],
    stock: 11
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
    description: "Gold-tone snaffle horsebit buckle on hand-burnished crust leather.",
    images: ["https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Mahogany", "Black Polish"],
    sizes: [7, 8, 9, 10, 11],
    stock: 6
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
    description: "Heavy commando rubber sole with weather-resistant pebble grain leather.",
    images: ["https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Cognac Grain", "Matte Carbon"],
    sizes: [7, 8, 9, 10, 11],
    stock: 10
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
    description: "Thick insulated lining, storm-beaded welts, and rugged traction lugs.",
    images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bison Brown", "Smoky Grey"],
    sizes: [7, 8, 9, 10, 11],
    stock: 4
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
    description: "Traditional closed-toe fisherman design handcrafted with supple leather straps.",
    images: ["https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Natural Tan", "Dark Earth"],
    sizes: [6, 7, 8, 9, 10],
    stock: 7
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
    description: "Perforated wingtip broguing with hand-applied patina finish and stacked leather heel.",
    images: ["https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Museum Cognac", "Ebony Gloss"],
    sizes: [7, 8, 9, 10, 11],
    stock: 8
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
    description: "Breathable flax linen upper attached to authentic braided jute rope sole.",
    images: ["https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Natural Oatmeal", "Striped Indigo", "Sage"],
    sizes: [6, 7, 8, 9, 10],
    stock: 18
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
    description: "Reinforced ripstop upper with responsive cushioned shank and all-terrain grip.",
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Granite Grey", "Triple Black"],
    sizes: [7, 8, 9, 10, 11],
    stock: 13
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
    description: "Dual polished gunmetal buckles with chiseled toe profile and soft padded insole.",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Dark Walnut", "Black"],
    sizes: [7, 8, 9, 10, 11],
    stock: 9
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
    description: "Water-resistant waxed suede ankle boot with soft lining and crepe-textured sole.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Snuff Brown", "Charcoal Suede"],
    sizes: [7, 8, 9, 10, 11],
    stock: 11
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
    description: "Flexible moccasin construction with rubber grip nubs for day-long walking ease.",
    images: ["https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Nautical Navy", "Tan Brown", "Black"],
    sizes: [6, 7, 8, 9, 10],
    stock: 16
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
    description: "Comfortable leather toe-strap with contoured arch support and anti-skid rubber bottom.",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Havana Brown", "Black"],
    sizes: [6, 7, 8, 9, 10],
    stock: 22
  }
];

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('as_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);

  // Customer checkout state
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'Cash on Delivery (COD)'
  });

  // Selected options inside modal
  const [modalColor, setModalColor] = useState('');
  const [modalSize, setModalSize] = useState(null);

  useEffect(() => {
    localStorage.setItem('as_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, color, size) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[1] || product.sizes[0];
    const itemKey = `${product.id}-${chosenColor}-${chosenSize}`;

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
        color: chosenColor,
        size: chosenSize,
        qty: 1
      }];
    });

    setIsCartOpen(true);
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

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const freeShippingThreshold = 1999;
  const deliveryFee = cartTotal >= freeShippingThreshold ? 0 : 99;
  const finalTotal = cartTotal + deliveryFee;

  // Function to build WhatsApp message and trigger redirect
  const handleCompleteOrderWhatsApp = (e) => {
    e.preventDefault();
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      alert("Please fill in your Name, Phone Number, and Delivery Address.");
      return;
    }

    let itemsText = cart.map((item, index) => 
      `${index + 1}. *${item.name}*\n   • Color: ${item.color}\n   • Size: UK/India ${item.size}\n   • Qty: ${item.qty}\n   • Price: ₹${item.price} each (₹${item.price * item.qty})`
    ).join('\n\n');

    const message = 
`🛍️ *NEW WEBSITE ORDER*

*Order Details:*
-----------------------------
${itemsText}

-----------------------------
*Subtotal:* ₹${cartTotal}
*Delivery Charges:* ${deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
*Grand Total:* *₹${finalTotal}*
*Payment Mode:* ${customer.paymentMethod}

📍 *Customer Details:*
• *Name:* ${customer.name}
• *Phone:* ${customer.phone}
• *Address:* ${customer.address}
• *City:* ${customer.city}
• *Pincode:* ${customer.pincode}

Please confirm this order!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Clear cart and close modal
    setCart([]);
    setCheckoutModalOpen(false);

    // Open WhatsApp
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
        <span>Fast WhatsApp Support</span>
      </div>

      {/* 2. Main Header */}
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
                onClick={() => setSelectedCategory(cat)}
                className={`transition-colors pb-1 border-b-2 ${
                  selectedCategory === cat ? 'border-stone-900 text-stone-900 font-semibold' : 'border-transparent text-stone-600 hover:text-stone-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          <div className="text-center cursor-pointer" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
            <span className="block text-2xl font-serif font-bold tracking-widest text-stone-900">AURA SOLEIL</span>
            <span className="block text-[10px] uppercase tracking-widest text-amber-800 font-medium -mt-1">Fine Footwear Shop</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search shoes, leather, size..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 text-xs rounded-full pl-9 pr-3 py-2 border-transparent focus:border-stone-400 focus:bg-white focus:outline-none transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Shopping Bag Button (Wishlist Removed) */}
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
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-100 text-sm rounded-lg pl-9 pr-3 py-2 focus:outline-none"
              />
            </div>
            {['All', 'Sneakers', 'Loafers', 'Boots', 'Dress', 'Sandals'].map(cat => (
              <button 
                key={cat}
                onClick={() => { setSelectedCategory(cat); setMobileMenuOpen(false); }}
                className="block w-full text-left py-2 font-medium text-stone-800 hover:text-amber-800"
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 3. Hero Editorial Section */}
      <section className="relative bg-stone-950 text-white overflow-hidden py-20 sm:py-28">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop" 
            alt="Handcrafted Shoes" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-amber-400">
            Handcrafted Footwear Collection
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-light leading-tight">
            Designed for Comfort. <br className="hidden sm:inline" />
            <span className="italic font-normal">Built for Longevity.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Genuine leathers, ergonomic cushioned soles, and classic silhouettes designed for every occasion.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedCategory('All')} 
              className="bg-stone-100 text-stone-900 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-amber-100 transition-colors flex items-center gap-2"
            >
              Browse Shop <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Trust Badges */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Premium Materials</span>
            <span className="text-[11px] text-stone-500">Selected genuine hides</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Award className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Artisan Quality</span>
            <span className="text-[11px] text-stone-500">Fine stitching and finishing</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Truck className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Fast Courier Dispatch</span>
            <span className="text-[11px] text-stone-500">Free above ₹1,999</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <RotateCcw className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Easy Size Exchange</span>
            <span className="text-[11px] text-stone-500">Direct on WhatsApp</span>
          </div>
        </div>
      </section>

      {/* 5. Merchandising Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 capitalize">
              {selectedCategory === 'All' ? 'All Footwear Styles' : `${selectedCategory} Collection`}
            </h2>
            <p className="text-xs text-stone-500 mt-1">Showing {filteredProducts.length} models</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-stone-100 rounded-lg px-3 py-1.5 text-xs text-stone-700">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Sort:</span>
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)} 
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Grid (Without Wishlist/Like Icon) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm">No shoes matched your selected filters.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-amber-800 underline uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map(p => (
              <div 
                key={p.id} 
                className="group relative bg-white rounded-2xl p-3 border border-stone-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
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

                    <button 
                      onClick={() => {
                        setSelectedProduct(p);
                        setModalColor(p.colors[0]);
                        setModalSize(p.sizes[1] || p.sizes[0]);
                      }}
                      className="absolute bottom-3 inset-x-3 bg-stone-900/95 text-white py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5"
                    >
                      Quick View & Select Size <ChevronRight className="w-3.5 h-3.5" />
                    </button>
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

                    <h3 
                      onClick={() => {
                        setSelectedProduct(p);
                        setModalColor(p.colors[0]);
                        setModalSize(p.sizes[1] || p.sizes[0]);
                      }}
                      className="font-serif font-semibold text-stone-900 text-base group-hover:text-amber-800 transition-colors cursor-pointer line-clamp-1"
                    >
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
                        <span className="font-bold text-stone-900 text-sm">₹{p.salePrice}</span>
                        <span className="text-stone-400 line-through text-xs">₹{p.price}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-stone-900 text-sm">₹{p.price}</span>
                    )}
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProduct(p);
                      setModalColor(p.colors[0]);
                      setModalSize(p.sizes[1] || p.sizes[0]);
                    }}
                    className="text-xs font-semibold uppercase tracking-wider text-amber-900 hover:text-black transition-colors flex items-center gap-1"
                  >
                    Select & Add <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Footer */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-14 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-center md:text-left">
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">AURA SOLEIL FOOTWEAR</h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              Curated footwear designed for modern comfort, high durability, and everyday confidence.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">Customer Support</h4>
            <p className="text-stone-400 text-xs">Orders directly confirmed via WhatsApp.</p>
            <p className="text-stone-400 text-xs mt-1">Available 10:00 AM – 8:00 PM</p>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-2">Shop Policies</h4>
            <p className="text-stone-400 text-xs">Easy 7-day size exchange upon delivery.</p>
            <p className="text-stone-400 text-xs mt-1">Cash on Delivery available across eligible pin codes.</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-stone-900 pt-6 text-center text-stone-600">
          © {new Date().getFullYear()} AURA SOLEIL. Direct WhatsApp Ordering System.
        </div>
      </footer>

      {/* MODAL: Product Detail & Size Picker */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              <div className="aspect-square bg-stone-100 rounded-xl overflow-hidden">
                <img 
                  src={selectedProduct.images[0]} 
                  alt={selectedProduct.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-amber-800 font-semibold">{selectedProduct.category}</span>
                  <h3 className="font-serif text-xl font-bold text-stone-900 mt-1">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-stone-900">
                      ₹{selectedProduct.salePrice || selectedProduct.price}
                    </span>
                    {selectedProduct.salePrice && (
                      <span className="text-xs text-stone-400 line-through">₹{selectedProduct.price}</span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 mt-3 leading-relaxed">{selectedProduct.description}</p>

                  <div className="mt-4">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-1.5">Color: {modalColor}</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.colors.map(col => (
                        <button
                          key={col}
                          onClick={() => setModalColor(col)}
                          className={`text-xs px-3 py-1 rounded-full border ${modalColor === col ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-700 hover:border-stone-400'}`}
                        >
                          {col}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-1.5">UK / India Size: {modalSize}</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(sz => (
                        <button
                          key={sz}
                          onClick={() => setModalSize(sz)}
                          className={`w-10 h-10 rounded-lg text-xs font-semibold border ${modalSize === sz ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-800 hover:border-stone-400'}`}
                        >
                          UK {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, modalColor, modalSize);
                      setSelectedProduct(null);
                    }}
                    className="w-full bg-stone-900 text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-amber-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Add To Bag <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DRAWER: Shopping Cart */}
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
                    Add items worth <span className="font-bold text-stone-900">₹{freeShippingThreshold - cartTotal}</span> more to get Free Delivery.
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
                        <span className="text-[11px] text-stone-500 block mt-0.5">{item.color} • UK {item.size}</span>
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
                    <span>Delivery Charges</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Final Amount</span>
                    <span>₹{finalTotal}</span>
                  </div>

                  {/* PROCEED TO CHECKOUT BUTTON */}
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

      {/* CHECKOUT MODAL -> SENDS FULL DETAILS TO WHATSAPP */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setCheckoutModalOpen(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-600" />
                <h3 className="font-serif text-xl font-bold text-stone-900">Delivery Details</h3>
              </div>
              <p className="text-xs text-stone-500 mt-1">
                Enter your address. Once you click complete order, your order will open on the seller's WhatsApp.
              </p>

              <form onSubmit={handleCompleteOrderWhatsApp} className="mt-4 space-y-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Full Name *</label>
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
                  <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">WhatsApp / Phone Number *</label>
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
                  <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Complete Delivery Address *</label>
                  <textarea 
                    rows={2}
                    required
                    placeholder="House/Flat No., Building, Street Name, Landmark" 
                    value={customer.address}
                    onChange={e => setCustomer({...customer, address: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900" 
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">City *</label>
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
                    <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Pincode *</label>
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
                  <label className="block text-[11px] font-semibold uppercase text-stone-600 mb-1">Payment Method</label>
                  <select 
                    value={customer.paymentMethod}
                    onChange={e => setCustomer({...customer, paymentMethod: e.target.value})}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-lg focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="Cash on Delivery (COD)">Cash on Delivery (COD)</option>
                    <option value="UPI / Online Transfer on WhatsApp">UPI / Online Transfer on WhatsApp</option>
                  </select>
                </div>

                {/* Summary Box */}
                <div className="mt-4 p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Total Items:</span>
                    <span>{cart.reduce((a, b) => a + b.qty, 0)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Delivery Charges:</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-1 border-t border-stone-200">
                    <span>Payable Amount:</span>
                    <span className="text-emerald-700">₹{finalTotal}</span>
                  </div>
                </div>

                {/* COMPLETE ORDER BUTTON */}
                <button 
                  type="submit"
                  className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" /> Complete Order & Send on WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
