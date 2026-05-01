import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Categories() {
  const categories = [
    {
      id: 1,
      title: "Handmade Home Decor",
      desc: "Warmth and character for every corner of your living space.",
      img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Handmade Jewelry",
      desc: "Intricate pieces crafted with passion and precision.",
      img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Bamboo Decors",
      desc: "Sustainable and earthy elements bringing nature indoors.",
      img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Painting",
      desc: "Expressive brushstrokes and colors to inspire the soul.",
      img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] mb-6">Explore Our Categories</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto font-sans">
          Discover a diverse collection of curated artisanal goods meant to bring authentic beauty to your life.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {categories.map((cat) => (
          <div key={cat.id} className="group cursor-pointer relative overflow-hidden bg-gray-100 aspect-[4/3] flex items-end">
            <img 
              src={cat.img} 
              alt={cat.title} 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="relative z-10 w-full p-8 md:p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">{cat.title}</h3>
              <p className="text-white/80 font-sans text-lg mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{cat.desc}</p>
              
              <button className="flex items-center gap-2 text-[#F2C14E] font-bold uppercase tracking-wider text-sm group-hover:text-white transition-colors">
                Shop Collection <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
