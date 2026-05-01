import React, { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, Star, ArrowRight, Instagram, Facebook, Twitter, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Looksbook from './pages/Looksbook';
import Courses from './pages/Courses';
import LiveCoaching from './pages/LiveCoaching';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [activeTab, setActiveTab] = useState('Home');

  const navLinks = [
    { name: 'Home', label: 'Home' },
    { name: 'Categories', label: 'Categories' },
    { name: 'Shop', label: 'Shop' },
    { name: 'Looksbook', label: 'Looksbook' },
    { name: 'Courses', label: 'Courses' },
    { name: 'LiveCoaching', label: 'Live Coaching' },
    { name: 'About', label: 'About' },
    { name: 'Contact', label: 'Contact' }
  ];

  const handleNavClick = (name: string) => {
    setActiveTab(name);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return <Home />;
      case 'Categories':
        return <Categories />;
      case 'Shop':
        return <Shop />;
      case 'Looksbook':
        return <Looksbook />;
      case 'Courses':
        return <Courses />;
      case 'LiveCoaching':
        return <LiveCoaching />;
      case 'About':
        return <About />;
      case 'Contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="font-sans text-[#333333] bg-white min-h-screen">
      
      {/* Announcement Bar */}
      <div className="bg-[#306C69] text-white text-xs md:text-sm py-2 px-4 text-center tracking-wide font-medium relative z-50">
        Free worldwide shipping on original artworks over $200
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 bg-[#F5E6C8] text-[#333333] transition-all duration-300 ${isScrolled ? 'shadow-md py-2' : 'py-3 md:py-4'} border-b border-black/5`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
          
          {/* Menu Toggle (Desktop & Mobile) */}
          <div className="flex-1">
            <button className="p-2 -ml-2 text-[#333333] hover:text-[#5A5A40] transition-colors flex items-center gap-2" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={28} />
            </button>
          </div>

          {/* Logo (Center) */}
          <div className="flex-1 flex justify-center">
            <a href="#" className="flex flex-col items-center transition-all duration-300">
              <img src="/logo.png" alt="Logo" className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[32px]' : 'h-[48px]'}`} />
              <span className={`font-serif text-[#5A5A40] transition-all duration-300 whitespace-nowrap ${isScrolled ? 'text-xs md:text-sm mt-0.5' : 'text-sm md:text-lg mt-1.5'}`}>
                Shringaara House Academy
              </span>
              <span className={`font-serif italic text-[#5A5A40]/80 transition-all duration-300 whitespace-nowrap ${isScrolled ? 'text-[9px] mt-0' : 'text-[10px] md:text-xs mt-0.5'}`}>
                Tradition, retold by hand.
              </span>
            </a>
          </div>

          {/* Icons Right */}
          <div className="flex items-center justify-end gap-5 flex-1">
            <button className="p-2 text-[#333333] hover:text-[#5A5A40] transition-colors">
              <Search size={24} />
            </button>
            <button className="hidden md:flex p-2 text-[#333333] hover:text-[#5A5A40] transition-colors">
              <User size={24} />
            </button>
            <button className="p-2 text-[#333333] hover:text-[#5A5A40] transition-colors relative">
              <ShoppingBag size={24} />
              <span className="absolute top-0 right-0 bg-[#5A5A40] text-[#F5E6C8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-[#5A5A40] z-50 overflow-y-auto"
          >
            <div className="h-full w-full flex flex-col p-6 md:p-12 min-h-screen">
              {/* Menu Header */}
              <div className="flex items-start justify-between border-b border-gray-700/50 pb-6">
                <motion.a 
                  href="#" 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-start gap-1"
                >
                  <img src="/logo.png" alt="Logo" className="h-[90px] md:h-[110px] w-auto object-contain brightness-0 invert" />
                  <span className="font-serif text-2xl md:text-3xl text-[#e8ca74] mt-2">Shringaara House Academy</span>
                  <span className="font-serif italic text-white/80 text-sm">Tradition, retold by hand.</span>
                </motion.a>
                <motion.button 
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 0.3 }}
                  className="p-3 bg-white/10 rounded-full text-[#f5f5f0] hover:bg-[#e8ca74] hover:text-[#5A5A40] transition-colors" 
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={28} />
                </motion.button>
              </div>

              {/* Menu Content Grid */}
              <div className="flex-1 flex flex-col justify-center items-center py-12 w-full text-center">
                <div className="flex flex-col items-center gap-8 md:gap-10">
                  {navLinks.map((link, idx) => (
                    <motion.div 
                      key={link.name} 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + idx * 0.08, ease: "easeOut" }}
                      className="relative group inline-block"
                    >
                      <button 
                        onClick={() => handleNavClick(link.name)}
                        className={`font-serif text-4xl md:text-5xl lg:text-6xl transition-all duration-300 ${
                          activeTab === link.name ? 'text-[#e8ca74]' : 'text-white hover:text-[#e8ca74] opacity-90 hover:opacity-100'
                        }`}
                      >
                        {link.label}
                      </button>
                      <motion.div 
                        initial={false}
                        animate={{ width: activeTab === link.name ? '100%' : '0%' }}
                        className={`absolute -bottom-2 left-1/2 -translate-x-1/2 h-[3px] bg-[#e8ca74] transition-all duration-300 group-hover:w-full`}
                      ></motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-white pt-20 pb-10 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            
            {/* Column 1 */}
            <div>
              <a href="#" className="block mb-6 flex flex-col items-start gap-1">
                <img src="/logo.png" alt="Logo" className="h-[90px] w-auto object-contain opacity-80" />
                <span className="font-serif text-xl text-[#5A5A40] mt-2">Shringaara House Academy</span>
                <span className="font-serif italic text-gray-500 text-xs">Tradition, retold by hand.</span>
              </a>
              <p className="text-gray-500 leading-relaxed mb-6 mt-4">
                Curating the finest contemporary handicrafts and independent art from around the globe.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-[#306C69] transition-colors"><Instagram size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-[#306C69] transition-colors"><Facebook size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-[#306C69] transition-colors"><Twitter size={20} /></a>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <h4 className="font-semibold text-[#333333] mb-6 uppercase tracking-wider text-sm">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">All Products</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Handmade Home Decor</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Handmade Jewelry</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Bamboo Decors</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Painting</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h4 className="font-semibold text-[#333333] mb-6 uppercase tracking-wider text-sm">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Refund Policy</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <h4 className="font-semibold text-[#333333] mb-6 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Legal</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Terms and Conditions</a></li>
                <li><a href="#" className="text-gray-500 hover:text-[#306C69] transition-colors">Privacy</a></li>
              </ul>
            </div>
            
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Shringaara House Academy. All rights reserved.
            </p>
            <div className="flex gap-4">
              {/* Fake payment icons */}
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
              <div className="w-10 h-6 bg-gray-100 rounded"></div>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}


