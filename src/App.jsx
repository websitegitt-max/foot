import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Heart, Search, X, ChevronRight, Star, ShieldCheck, 
  Truck, RotateCcw, Award, Menu, Check, SlidersHorizontal, ArrowRight,
  Plus, Minus, Trash2
} from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "The Milano Minimalist Court",
    category: "Sneakers",
    price: 185,
    salePrice: 155,
    rating: 4.9,
    reviewsCount: 142,
    badge: "Bestseller",
    description: "Handcrafted in Civitanova Marche from full-grain Italian nappa leather with Margom rubber soles.",
    images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Blanc White", "Chalk Ivory", "Onyx Black"],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 12
  },
  {
    id: 2,
    name: "Sorrento Venetian Suede Loafer",
    category: "Loafers",
    price: 240,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 88,
    badge: "Signature",
    description: "Unlined butter-soft calf suede with Blake-stitched water-resistant leather flex soles.",
    images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Tobacco Tan", "Navy Deep", "Olive Suede"],
    sizes: [40, 41, 42, 43, 44],
    stock: 7
  },
  {
    id: 3,
    name: "The Rainier Field Boot",
    category: "Boots",
    price: 320,
    salePrice: 285,
    rating: 5.0,
    reviewsCount: 64,
    badge: "Editor's Choice",
    description: "Rugged Horween Chromexcel leather with storm welt construction and Vibram lug outsoles.",
    images: ["https://images.unsplash.com/photo-1608256246200-53e635b5b65f?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Dark Brown", "Auburn Waxed", "Matte Black"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 5
  },
  {
    id: 4,
    name: "Riviera Woven Mule",
    category: "Sandals",
    price: 165,
    salePrice: null,
    rating: 4.7,
    reviewsCount: 53,
    badge: "New Arrival",
    description: "Artisanal hand-braided calfskin leather mule lined with vegetable-tanned goat skin.",
    images: ["https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Cognac", "Sand Dune", "Black"],
    sizes: [39, 40, 41, 42, 43],
    stock: 9
  },
  {
    id: 5,
    name: "Aerolight Mesh Trainer",
    category: "Sneakers",
    price: 145,
    salePrice: 119,
    rating: 4.6,
    reviewsCount: 210,
    badge: "Sale",
    description: "Ultra-breathable recycled knit upper paired with high-rebound supercritical foam midsole.",
    images: ["https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bone & Sage", "Triple Charcoal", "Glacier Blue"],
    sizes: [38, 39, 40, 41, 42, 43, 44, 45],
    stock: 20
  },
  {
    id: 6,
    name: "Chelsea Royale 360",
    category: "Boots",
    price: 295,
    salePrice: null,
    rating: 4.9,
    reviewsCount: 115,
    badge: "Bestseller",
    description: "Goodyear welted wholecut Chelsea boot featuring custom stretch gore panels.",
    images: ["https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Espresso Burnished", "Obsidian Black"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 14
  },
  {
    id: 7,
    name: "Kensington Wholecut Oxford",
    category: "Dress",
    price: 340,
    salePrice: null,
    rating: 5.0,
    reviewsCount: 47,
    badge: "Heritage",
    description: "Cut from a single flawless hide of French calfskin with fiddleback bevelled waist soles.",
    images: ["https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bordeaux Wine", "Piano Black", "Chestnut"],
    sizes: [40, 41, 42, 43, 44],
    stock: 8
  },
  {
    id: 8,
    name: "Amalfi Two-Strap Slide",
    category: "Sandals",
    price: 130,
    salePrice: 99,
    rating: 4.5,
    reviewsCount: 78,
    badge: "Sale",
    description: "Anatomically contoured cork footbed wrapped in supple suede with brushed brass buckles.",
    images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Mushroom", "Tuscan Ochre", "Midnight"],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 15
  },
  {
    id: 9,
    name: "Vanguard Retro Runner",
    category: "Sneakers",
    price: 170,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 160,
    badge: "Trending",
    description: "Nostalgic 1970s silhouette with Italian split suede overlays and herringbone gum tread.",
    images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Vintage Clay", "Forest Moss", "Off-White"],
    sizes: [39, 40, 41, 42, 43, 44, 45],
    stock: 11
  },
  {
    id: 10,
    name: "Geneva Horsebit Penny Loafer",
    category: "Loafers",
    price: 260,
    salePrice: 220,
    rating: 4.9,
    reviewsCount: 92,
    badge: "Staff Pick",
    description: "Jeweled solid brass snaffle hardware resting on antique crust hand-finished leather.",
    images: ["https://images.unsplash.com/photo-1582898787091-d961e604ec22?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Mahogany", "Black Polish"],
    sizes: [40, 41, 42, 43, 44],
    stock: 6
  },
  {
    id: 11,
    name: "Atlas Heavy Derby",
    category: "Dress",
    price: 280,
    salePrice: null,
    rating: 4.7,
    reviewsCount: 59,
    badge: "Durable",
    description: "Commando rubber sole with water-repellent scotch-grain pebble calf leather.",
    images: ["https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Cognac Grain", "Matte Carbon"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 10
  },
  {
    id: 12,
    name: "St. Moritz Shearling Combat Boot",
    category: "Boots",
    price: 360,
    salePrice: null,
    rating: 5.0,
    reviewsCount: 38,
    badge: "Winter Warmth",
    description: "Insulated with genuine Australian shearling wool lining and storm-beaded welts.",
    images: ["https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Bison Brown", "Smoky Grey"],
    sizes: [41, 42, 43, 44, 45],
    stock: 4
  },
  {
    id: 13,
    name: "Capri Woven Fisherman Sandal",
    category: "Sandals",
    price: 175,
    salePrice: null,
    rating: 4.6,
    reviewsCount: 44,
    badge: "Limited",
    description: "Traditional closed-toe fisherman design created with vegetable-tanned Tuscan vachetta.",
    images: ["https://images.unsplash.com/photo-1562273138-f46be4ebdf33?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Natural Vachetta", "Dark Earth"],
    sizes: [39, 40, 41, 42, 43],
    stock: 7
  },
  {
    id: 14,
    name: "Bespoke Medallion Brogue",
    category: "Dress",
    price: 310,
    salePrice: 260,
    rating: 4.9,
    reviewsCount: 84,
    badge: "Sale",
    description: "Perforated wingtip broguing with museum hand-patina finish and oak bark tanned soles.",
    images: ["https://images.unsplash.com/photo-1531310197839-ccf54634509e?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Museum Cognac", "Ebony Gloss"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 8
  },
  {
    id: 15,
    name: "Solstice Linen Espadrille",
    category: "Loafers",
    price: 110,
    salePrice: 85,
    rating: 4.4,
    reviewsCount: 96,
    badge: "Summer Ready",
    description: "Organic Belgian flax linen upper attached to authentic braided jute rope and natural vulcanized gum.",
    images: ["https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Natural Oatmeal", "Striped Indigo", "Sage"],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 18
  },
  {
    id: 16,
    name: "Vertex Carbon Trail Sneaker",
    category: "Sneakers",
    price: 215,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 112,
    badge: "High Tech",
    description: "Propulsive carbon-fiber shank plate encased in ripstop nylon and Megagrip all-weather studs.",
    images: ["https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Granite / Solar", "All Weather Triple Black"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 13
  },
  {
    id: 17,
    name: "Savile Row Double Monk Strap",
    category: "Dress",
    price: 290,
    salePrice: null,
    rating: 4.8,
    reviewsCount: 67,
    badge: "Classic",
    description: "Dual polished gunmetal buckles with chiseled toe profile and bevelled waist.",
    images: ["https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Dark Walnut", "Black"],
    sizes: [40, 41, 42, 43, 44],
    stock: 9
  },
  {
    id: 18,
    name: "Highland Waxed Chukka Boot",
    category: "Boots",
    price: 250,
    salePrice: 199,
    rating: 4.7,
    reviewsCount: 73,
    badge: "Sale",
    description: "Two-eyelet British waxed suede boot resistant to mud, rain, and cold mountain gusts.",
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Snuff Brown", "Charcoal Suede"],
    sizes: [40, 41, 42, 43, 44, 45],
    stock: 11
  },
  {
    id: 19,
    name: "Tuscan Pebble Driving Shoe",
    category: "Loafers",
    price: 195,
    salePrice: null,
    rating: 4.9,
    reviewsCount: 131,
    badge: "Icon",
    description: "Flexible moccasin construction with rubber pebble nubs running from sole to heel.",
    images: ["https://images.unsplash.com/photo-1579338559194-a162d19bf842?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Nautical Navy", "Racing Red", "Camel Tan"],
    sizes: [39, 40, 41, 42, 43, 44],
    stock: 16
  },
  {
    id: 20,
    name: "Biarritz Leather Thong Sandal",
    category: "Sandals",
    price: 95,
    salePrice: 75,
    rating: 4.3,
    reviewsCount: 52,
    badge: "Best Value",
    description: "Ergonomic leather toe-post with arch-supporting triple-layer EVA and non-slip rubber pad.",
    images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop"],
    colors: ["Havana Brown", "Black"],
    sizes: [39, 40, 41, 42, 43, 44],
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

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('as_wishlist');
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
  const [orderComplete, setOrderComplete] = useState(false);

  // Selected options inside modal
  const [modalColor, setModalColor] = useState('');
  const [modalSize, setModalSize] = useState(null);

  useEffect(() => {
    localStorage.setItem('as_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('as_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (product, color, size) => {
    const chosenColor = color || product.colors[0];
    const chosenSize = size || product.sizes[2] || product.sizes[0];
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
  const freeShippingThreshold = 200;
  const progressToFreeShipping = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 selection:text-amber-900">
      
      {/* 1. Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs tracking-wider uppercase py-2.5 px-4 text-center flex items-center justify-center gap-2 border-b border-stone-800">
        <span>Handcrafted in Italy & Portugal</span>
        <span className="opacity-40">•</span>
        <span className="font-semibold text-amber-400">Complimentary Global Express over $200</span>
        <span className="opacity-40">•</span>
        <span className="underline cursor-pointer">Use code STEP15 for 15% off</span>
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
            <span className="block text-[10px] uppercase tracking-widest text-amber-800 font-medium -mt-1">Fine Footwear Atelier</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative hidden md:block w-48 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input 
                type="text" 
                placeholder="Search styles, leathers..." 
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

            <button 
              onClick={() => alert(`Saved items: ${wishlist.length}`)}
              className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-700 hover:text-stone-900 transition-colors flex items-center gap-1.5"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-semibold hidden sm:inline-block">Bag</span>
              {cart.reduce((a, b) => a + b.qty, 0) > 0 && (
                <span className="bg-stone-900 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
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
                placeholder="Search boots, loafers, leather..." 
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
      <section className="relative bg-stone-950 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-40 mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop" 
            alt="Luxury Atelier Craftsmanship" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-6">
          <span className="inline-block uppercase tracking-[0.3em] text-xs font-semibold text-amber-400">
            Autumn / Winter Master Edition
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light leading-tight">
            Footwear sculpted for <br className="hidden sm:inline" />
            <span className="italic font-normal">the mindful journey.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-stone-300 text-sm sm:text-base leading-relaxed font-light">
            Every sole Goodyear welted. Every upper hand-burnished from full-grain Tuscan hides. Zero shortcuts, lifetime resolable promise.
          </p>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setSelectedCategory('All')} 
              className="bg-stone-100 text-stone-900 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-amber-100 transition-colors flex items-center gap-2"
            >
              Explore 20 Atelier Styles <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setSelectedCategory('Sneakers')}
              className="border border-stone-600 text-stone-200 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium hover:border-white transition-colors"
            >
              Court Collection
            </button>
          </div>
        </div>
      </section>

      {/* 4. Trust Badges */}
      <section className="border-b border-stone-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center space-y-1">
            <ShieldCheck className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Goodyear Welted</span>
            <span className="text-[11px] text-stone-500">Resolable for decades</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Award className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Tuscan Full-Grain</span>
            <span className="text-[11px] text-stone-500">Gold-rated LWG tanneries</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <Truck className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">Free Global Express</span>
            <span className="text-[11px] text-stone-500">On all orders over $200</span>
          </div>
          <div className="flex flex-col items-center space-y-1">
            <RotateCcw className="w-6 h-6 text-amber-800" />
            <span className="font-semibold text-xs uppercase tracking-wider">30-Day In-Home Trial</span>
            <span className="text-[11px] text-stone-500">Complimentary exchange</span>
          </div>
        </div>
      </section>

      {/* 5. Merchandising Controls */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <h2 className="text-2xl font-serif font-bold text-stone-900 capitalize">
              {selectedCategory === 'All' ? 'Complete Footwear Collection' : `${selectedCategory} Collection`}
            </h2>
            <p className="text-xs text-stone-500 mt-1">Showing {filteredProducts.length} handcrafted models</p>
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

      {/* 6. Product Grid (All 20 Models) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-stone-50 rounded-2xl border border-dashed border-stone-300">
            <p className="text-stone-500 text-sm">No shoes matched your selected filters.</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="mt-3 text-xs font-semibold text-amber-800 underline uppercase tracking-wider"
            >
              Reset All Filters
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
                      onClick={(e) => { e.stopPropagation(); toggleWishlist(p.id); }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-700 hover:text-red-500 shadow-sm transition-colors"
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(p.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </button>

                    <button 
                      onClick={() => {
                        setSelectedProduct(p);
                        setModalColor(p.colors[0]);
                        setModalSize(p.sizes[2] || p.sizes[0]);
                      }}
                      className="absolute bottom-3 inset-x-3 bg-stone-900/95 text-white py-2.5 rounded-lg text-xs font-medium tracking-wide uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5"
                    >
                      Quick Inspect <ChevronRight className="w-3.5 h-3.5" />
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
                        setModalSize(p.sizes[2] || p.sizes[0]);
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
                        <span className="font-semibold text-stone-900 text-sm">${p.salePrice}</span>
                        <span className="text-stone-400 line-through text-xs">${p.price}</span>
                      </div>
                    ) : (
                      <span className="font-semibold text-stone-900 text-sm">${p.price}</span>
                    )}
                  </div>

                  <button 
                    onClick={() => addToCart(p)}
                    className="text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-amber-800 transition-colors flex items-center gap-1"
                  >
                    + Add <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 7. Brand Atelier Banner */}
      <section className="bg-stone-900 text-stone-200 py-20 px-6 border-t border-stone-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif text-white">The Cobbler's Pledge</h2>
          <p className="text-stone-400 leading-relaxed font-light text-sm sm:text-base">
            In an era of disposable plastic sneakers, Aura Soleil manufactures timeless footwear using traditional wooden lasts and natural vegetable-tanned hides. Our shoes mold exclusively to your footprint over time.
          </p>
          <div className="pt-2 flex justify-center gap-8 text-xs uppercase tracking-widest text-amber-400 font-medium">
            <span>• 100% Traceable Leathers</span>
            <span>• Zero Chrome Tanning</span>
            <span>• Resole Guarantee</span>
          </div>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="bg-stone-950 text-stone-400 text-xs py-14 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-3">Atelier Collections</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setSelectedCategory('Sneakers')} className="hover:text-white">Minimalist Court Sneakers</button></li>
              <li><button onClick={() => setSelectedCategory('Loafers')} className="hover:text-white">Venetian & Penny Loafers</button></li>
              <li><button onClick={() => setSelectedCategory('Boots')} className="hover:text-white">Goodyear Field & Chelsea Boots</button></li>
              <li><button onClick={() => setSelectedCategory('Dress')} className="hover:text-white">Wholecut Oxfords & Brogues</button></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-3">Client Care</h4>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer">Sizing & Fitting Guide</li>
              <li className="hover:text-white cursor-pointer">Shoe Care & Cream Polish</li>
              <li className="hover:text-white cursor-pointer">Goodyear Resoling Service</li>
              <li className="hover:text-white cursor-pointer">Track Consignment</li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-3">Newsletter</h4>
            <p className="text-[11px] text-stone-500 mb-3">Receive invitations to private seasonal runs.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Enter email" 
                className="bg-stone-800 text-white px-3 py-2 rounded-l-md w-full focus:outline-none text-xs" 
              />
              <button className="bg-amber-700 text-white px-3 py-2 rounded-r-md font-semibold hover:bg-amber-600">
                Join
              </button>
            </div>
          </div>
          <div>
            <h4 className="font-serif text-sm font-semibold text-white mb-3">Aura Soleil Atelier</h4>
            <p className="text-stone-500 leading-relaxed text-[11px]">
              Via delle Manifatture 18, Civitanova Marche, Italy. Dedicated to the preservation of European bespoke leather craft.
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 border-t border-stone-900 pt-6 text-center text-stone-600">
          © {new Date().getFullYear()} AURA SOLEIL Footwear Atelier. All rights reserved.
        </div>
      </footer>

      {/* MODAL: Product Detail Quick Inspect */}
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
                      ${selectedProduct.salePrice || selectedProduct.price}
                    </span>
                    {selectedProduct.salePrice && (
                      <span className="text-xs text-stone-400 line-through">${selectedProduct.price}</span>
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
                    <label className="text-[11px] uppercase tracking-wider font-semibold text-stone-700 block mb-1.5">EU Size: {modalSize}</label>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProduct.sizes.map(sz => (
                        <button
                          key={sz}
                          onClick={() => setModalSize(sz)}
                          className={`w-9 h-9 rounded-lg text-xs font-medium border ${modalSize === sz ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-800 hover:border-stone-400'}`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex gap-3">
                  <button 
                    onClick={() => {
                      addToCart(selectedProduct, modalColor, modalSize);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 bg-stone-900 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-wider hover:bg-amber-800 transition-colors"
                  >
                    Add To Cart
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
                  <h3 className="font-serif font-bold text-lg">Your Cart ({cart.reduce((a, b) => a + b.qty, 0)})</h3>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-2 text-stone-400 hover:text-stone-900">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free shipping progress bar */}
              <div className="bg-amber-50/60 p-4 border-b border-amber-100 text-xs">
                {cartTotal >= freeShippingThreshold ? (
                  <span className="font-medium text-amber-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" /> Unlocked Complimentary Global Express Shipping!
                  </span>
                ) : (
                  <p className="text-stone-700">
                    Add <span className="font-bold text-stone-900">${freeShippingThreshold - cartTotal}</span> more to unlock Free Express Shipping.
                  </p>
                )}
                <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div className="bg-amber-700 h-full transition-all duration-300" style={{ width: `${progressToFreeShipping}%` }} />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                    <p className="text-stone-500 text-sm">Your atelier bag is empty.</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="text-xs uppercase tracking-wider font-semibold text-stone-900 underline"
                    >
                      Continue Browsing
                    </button>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.key} className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-200/60">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-stone-200" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs text-stone-900 line-clamp-1">{item.name}</h4>
                        <span className="text-[11px] text-stone-500 block mt-0.5">{item.color} • EU {item.size}</span>
                        <span className="font-semibold text-xs text-stone-800 block mt-1">${item.price}</span>
                        
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
                    <span>Subtotal</span>
                    <span className="font-semibold text-stone-900">${cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-600">
                    <span>Shipping</span>
                    <span>{cartTotal >= freeShippingThreshold ? 'FREE' : '$25'}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Estimated Total</span>
                    <span>${cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + 25}</span>
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

      {/* CHECKOUT SIMULATION MODAL */}
      {checkoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative">
            <button onClick={() => { setCheckoutModalOpen(false); setOrderComplete(false); }} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900">
              <X className="w-5 h-5" />
            </button>

            {orderComplete ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Order Confirmed</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Thank you for investing in authentic atelier craftsmanship. We have sent your bespoke order invoice to your inbox.
                </p>
                <button 
                  onClick={() => {
                    setCart([]);
                    setCheckoutModalOpen(false);
                    setOrderComplete(false);
                  }}
                  className="mt-4 bg-stone-900 text-white px-6 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider"
                >
                  Return to Storefront
                </button>
              </div>
            ) : (
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Atelier Express Checkout</h3>
                <p className="text-xs text-stone-500 mt-1">Review items and finalize delivery.</p>

                <div className="mt-4 space-y-3">
                  <input type="text" placeholder="Full Name" defaultValue="Krishna Bhagat" className="w-full text-xs p-2.5 border border-stone-200 rounded-lg" />
                  <input type="email" placeholder="Email Address" defaultValue="client@aurasoleil.com" className="w-full text-xs p-2.5 border border-stone-200 rounded-lg" />
                  <input type="text" placeholder="Shipping Address" defaultValue="128 Silk Board Avenue, Bengaluru" className="w-full text-xs p-2.5 border border-stone-200 rounded-lg" />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="text" placeholder="City" defaultValue="Bengaluru" className="text-xs p-2.5 border border-stone-200 rounded-lg" />
                    <input type="text" placeholder="Postal Code" defaultValue="560068" className="text-xs p-2.5 border border-stone-200 rounded-lg" />
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs text-stone-600">Total payable</span>
                  <span className="text-base font-bold text-stone-900">${cartTotal >= freeShippingThreshold ? cartTotal : cartTotal + 25}</span>
                </div>

                <button 
                  onClick={() => setOrderComplete(true)}
                  className="w-full mt-4 bg-amber-800 hover:bg-amber-900 text-white py-3 rounded-xl text-xs font-semibold uppercase tracking-widest transition-colors"
                >
                  Complete Order
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
