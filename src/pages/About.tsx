import React from 'react';

export default function About() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2 w-full">
          <div className="aspect-[4/5] bg-gray-100 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop" 
              alt="Artisan hands" 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
          </div>
        </div>
        
        <div className="lg:w-1/2 w-full">
          <span className="text-[#5A5A40] font-semibold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#333] mb-8 leading-tight">Preserving Tradition in a Modern World</h1>
          
          <div className="space-y-6 text-lg text-gray-600 leading-relaxed font-light">
            <p>
              Shringaara House Academy was born out of a deep reverence for the handmade. In an era of mass production, we believe there is unreplicable magic in the imperfections of human touch.
            </p>
            <p>
              Founded in 2024, our mission is twofold: to provide independent artisans a platform to share their life's work, and to educate the next generation of creatives through our academy. We travel the globe seeking master craftspeople—not just to curate their pieces for your home, but to capture their techniques and philosophies.
            </p>
            <p>
              Every piece you find here, and every lesson you learn, is rooted in authenticity, sustainability, and respect for raw materials.
            </p>
          </div>
          
          <div className="mt-12 pt-12 border-t border-gray-200">
            <h3 className="font-serif text-2xl text-[#333] mb-6">Our Values</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40] mt-2.5"></div>
                <div>
                  <h4 className="font-bold text-[#333]">Sustainability</h4>
                  <p className="text-gray-500">Ethically sourced materials and eco-conscious firing processes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40] mt-2.5"></div>
                <div>
                  <h4 className="font-bold text-[#333]">Fair Trade</h4>
                  <p className="text-gray-500">Direct partnerships ensuring artisans receive true value for their work.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full bg-[#5A5A40] mt-2.5"></div>
                <div>
                  <h4 className="font-bold text-[#333]">Education First</h4>
                  <p className="text-gray-500">Passing down traditions and techniques to prevent lost arts.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
