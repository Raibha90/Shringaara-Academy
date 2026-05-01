import React from 'react';

export default function Looksbook() {
  const looks = [
    { id: 1, title: 'Autumn Warmth', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Minimalist Haven', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Earthy Textures', img: 'https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'Organic Flow', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop' },
    { id: 5, title: 'Modern Rustic', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop' },
    { id: 6, title: 'Artisan Corner', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop' }
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] mb-6">Looksbook</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Explore curated spaces styled with our authentic handcrafted pieces. Find inspiration for your own sanctuary.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {looks.map((look) => (
          <div key={look.id} className="group cursor-pointer">
            <div className="overflow-hidden bg-gray-100 mb-4 h-[500px]">
              <img 
                src={look.img} 
                alt={look.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <h3 className="font-serif text-xl text-[#333] text-center border-b border-transparent group-hover:border-[#5A5A40] inline-block transition-all duration-300 mx-auto w-fit">{look.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
