import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

const CATEGORIES = ["All", "Handmade Home Decor", "Handmade Jewelry", "Bamboo Decors", "Painting"];

const PRODUCTS = [
  { id: 1, category: "Handmade Home Decor", name: "Handcrafted Ceramic Vase", price: 120, img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop", desc: "A beautiful, organic shaped ceramic vase made from locally sourced clay." },
  { id: 2, category: "Handmade Home Decor", name: "Woven Wall Hanging", price: 85, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop", desc: "Textured wall art adding warmth and character to any modern living space." },
  { id: 3, category: "Handmade Jewelry", name: "Amber Silver Necklace", price: 150, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop", desc: "A delicate silver necklace featuring a unique amber stone centerpiece." },
  { id: 4, category: "Handmade Jewelry", name: "Sapphire Drop Earrings", price: 110, img: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop", desc: "Elegant drop earrings perfect for an evening out or a special occasion." },
  { id: 5, category: "Bamboo Decors", name: "Bamboo Woven Lampshade", price: 210, img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop", desc: "Bring natural light into your home with this intricately woven bamboo lampshade." },
  { id: 6, category: "Bamboo Decors", name: "Bamboo Storage Basket", price: 65, img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?q=80&w=800&auto=format&fit=crop", desc: "Versatile storage solution woven tightly for durability and natural style." },
  { id: 7, category: "Painting", name: "Abstract Line Art Print", price: 130, img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop", desc: "Original abstract artwork featuring sweeping lines and earthy tones." },
  { id: 8, category: "Painting", name: "Botanical Watercolor Signature", price: 90, img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800&auto=format&fit=crop", desc: "Delicate and detailed watercolor painting of local flora." }
];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = activeCategory === "All" 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (selectedProduct) {
    return (
      <div className="py-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
        <button 
          onClick={() => setSelectedProduct(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#5A5A40] transition-colors mb-12"
        >
          <ArrowLeft size={20} /> Back to Shop
        </button>
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 aspect-[4/5] bg-gray-100 overflow-hidden"
          >
            <img src={selectedProduct.img} alt={selectedProduct.name} className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:w-1/2 flex flex-col justify-center"
          >
            <span className="text-[#306C69] tracking-widest uppercase text-sm mb-4 font-semibold">{selectedProduct.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#333333] mb-4">{selectedProduct.name}</h1>
            <p className="text-2xl text-[#5A5A40] font-medium mb-8">${selectedProduct.price}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">{selectedProduct.desc}</p>
            
            <button className="bg-[#333333] text-white py-4 px-8 font-bold uppercase tracking-wider hover:bg-[#5A5A40] transition-colors flex items-center justify-center gap-3">
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
      <h1 className="text-4xl md:text-5xl font-serif text-[#333333] mb-12 text-center">Shop Collection</h1>
      
      {/* Categories Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {CATEGORIES.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${activeCategory === category ? 'bg-[#5A5A40] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
      >
        {filteredProducts.map(product => (
          <motion.div 
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={product.id} 
            className="group cursor-pointer"
            onClick={() => setSelectedProduct(product)}
          >
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-sm relative">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300 z-10 transition-all"></div>
              <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-gray-400 tracking-wider uppercase mb-1">{product.category}</span>
              <h3 className="font-serif text-lg text-[#333] mb-1 group-hover:text-[#306C69] transition-colors">{product.name}</h3>
              <p className="text-[#5A5A40] font-medium">${product.price}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

