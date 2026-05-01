import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';

const CATEGORIES = ["All", "Finished products", "DIY kits", "Raw materials", "Memberships"];

interface Product {
  id: string;
  category: string;
  name: string;
  price: number;
  img: string;
  desc: string;
}

export default function Shop() {
  const { isAdmin } = useAuth();
  const { initiatePayment } = useRazorpay();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // New product state
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Finished products',
    price: 0,
    desc: '',
    img: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop'
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'products'));
      const querySnapshot = await getDocs(q);
      const fetchedProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), newProduct);
      setIsAddingProduct(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product");
    }
  };

  const handlePayment = (product: Product) => {
    initiatePayment(product.price, { name: product.name, description: product.desc });
  };

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.category === activeCategory);

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
            
            <button 
              onClick={() => handlePayment(selectedProduct)}
              className="bg-[#333333] text-white py-4 px-8 font-bold uppercase tracking-wider hover:bg-[#5A5A40] transition-colors flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} /> Buy Now
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-6 max-w-7xl mx-auto min-h-[70vh]">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <h1 className="text-4xl md:text-5xl font-serif text-[#333333]">Shop Collection</h1>
        {isAdmin && (
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="flex items-center gap-2 bg-[#306C69] text-white px-6 py-3 rounded-md hover:bg-[#204a48] transition-colors"
          >
            <Plus size={20} /> Add Product
          </button>
        )}
      </div>
      
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

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A5A40]"></div>
        </div>
      ) : (
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
              <div className="flex flex-col items-center text-center px-2">
                <span className="text-xs text-gray-400 tracking-wider uppercase mb-1">{product.category}</span>
                <h3 className="font-serif text-lg text-[#333] mb-1 group-hover:text-[#306C69] transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-[#5A5A40] font-medium">${product.price}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-lg max-w-lg w-full"
          >
            <h2 className="text-2xl font-serif mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border p-2 rounded"
                  value={newProduct.name}
                  onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full border p-2 rounded"
                  value={newProduct.category}
                  onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                >
                  {CATEGORIES.filter(c => c !== "All").map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full border p-2 rounded"
                  value={newProduct.price}
                  onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  className="w-full border p-2 rounded h-24"
                  value={newProduct.desc}
                  onChange={e => setNewProduct({...newProduct, desc: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded"
                  value={newProduct.img}
                  onChange={e => setNewProduct({...newProduct, img: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsAddingProduct(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#306C69] text-white px-6 py-2 rounded"
                >
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

