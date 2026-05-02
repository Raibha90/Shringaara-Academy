import React, { useState, useEffect, useRef } from 'react';
import { Search, User, ShoppingBag, Menu, X, Star, ArrowRight, Instagram, Facebook, Twitter, ChevronRight, LogOut, LogIn, Plus, Users, BookOpen, Settings, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from './contexts/AuthContext';
import { auth, db } from './lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, getDocs, where, limit, doc, onSnapshot } from 'firebase/firestore';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Looksbook from './pages/Looksbook';
import Courses from './pages/Courses';
import LiveCoaching from './pages/LiveCoaching';
import About from './pages/About';
import Contact from './pages/Contact';
import Categories from './pages/Categories';
import Dashboard from './pages/Dashboard';

import { handleFirestoreError, OperationType } from './lib/errorHandler';

export function AuthOption({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className="flex flex-col items-center gap-2 group transition-all"
    >
      <div className="p-3 bg-white border rounded-full shadow-sm group-hover:shadow-md group-hover:border-[#5A5A40]/30 transition-all">
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
      </div>
      <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 group-hover:text-[#333] transition-colors">
        {label}
      </span>
    </button>
  );
}

export default function App() {
  const { user, profile } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAuthBar, setShowAuthBar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [authForm, setAuthForm] = useState<{ role: string, mode: 'login' | 'register' } | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authForm?.mode === 'register') {
        await createUserWithEmailAndPassword(auth, email, password);
        // Profile creation is handled in AuthContext via setDoc
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      setShowAuthBar(false);
      setAuthForm(null);
      setEmail('');
      setPassword('');
      setName('');
    } catch (error: any) {
      console.error("Auth failed:", error);
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Fetch Site Settings
    const unsubscribeSettings = onSnapshot(doc(db, 'settings', 'general'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setSiteSettings(data);
        
        // Dynamic Favicon
        if (data.faviconBase64) {
          let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
          if (!link) {
            link = document.createElement('link');
            link.type = 'image/png';
            link.rel = 'shortcut icon';
            document.getElementsByTagName('head')[0].appendChild(link);
          }
          link.href = data.faviconBase64;
        }

        // Dynamic Title
        if (data.siteName) {
          document.title = data.siteName;
        }
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, 'settings/general', auth);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      unsubscribeSettings();
    };
  }, []);

  useEffect(() => {
    if (showSearch) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery('');
      setSearchResults([]);
    }
  }, [showSearch]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 1) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    setIsSearching(true);
    try {
      // Search products
      const productsRef = collection(db, 'products');
      const pSnap = await getDocs(query(productsRef, limit(20))); // Basic fetch and local filter for demo/speed
      const products = pSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data(), type: 'product' }))
        .filter((p: any) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Search courses
      const coursesRef = collection(db, 'courses');
      const cSnap = await getDocs(query(coursesRef, limit(10)));
      const courses = cSnap.docs
        .map(doc => ({ id: doc.id, ...doc.data(), type: 'course' }))
        .filter((c: any) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

      setSearchResults([...products, ...courses]);
    } catch (error) {
      handleFirestoreError(error, OperationType.LIST, 'products/courses', auth);
    } finally {
      setIsSearching(false);
    }
  };

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
      case 'Dashboard':
        return <Dashboard />;
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
              <img src={siteSettings?.logoBase64 || "/logo.png"} alt="Logo" className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-[32px]' : 'h-[48px]'}`} />
              <span className={`font-serif text-[#5A5A40] transition-all duration-300 whitespace-nowrap ${isScrolled ? 'text-xs md:text-sm mt-0.5' : 'text-sm md:text-lg mt-1.5'}`}>
                {siteSettings?.siteName || "Shringaara House Academy"}
              </span>
              <span className={`font-serif italic text-[#5A5A40]/80 transition-all duration-300 whitespace-nowrap ${isScrolled ? 'text-[9px] mt-0' : 'text-[10px] md:text-xs mt-0.5'}`}>
                {siteSettings?.tagline || "Tradition, retold by hand."}
              </span>
            </a>
          </div>

          {/* Icons Right */}
          <div className="flex items-center justify-end gap-5 flex-1">
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 text-[#333333] hover:text-[#5A5A40] transition-colors relative group"
            >
              <Search size={24} />
              <span className="absolute -bottom-1 right-2 text-[8px] font-bold text-gray-400 group-hover:text-gray-600 transition-colors opacity-0 group-hover:opacity-100 hidden md:block">
                ⌘K
              </span>
            </button>
            {user ? (
              <div className="group relative">
                <button 
                  className="flex items-center gap-2 p-1 border border-black/10 rounded-full hover:bg-black/5 transition-colors"
                >
                  {profile?.profilePic ? (
                    <img src={profile.profilePic} alt="Profile" className="w-8 h-8 rounded-full shadow-inner" />
                  ) : (
                    <User size={24} />
                  )}
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border shadow-xl rounded-lg invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all z-[60]">
                  <div className="p-4 border-b bg-gray-50 rounded-t-lg">
                    <p className="font-bold text-[#333] text-sm line-clamp-1">{profile?.name || user.displayName}</p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{profile?.role}</p>
                  </div>
                  <div className="p-1">
                    {profile?.role === 'admin' && (
                      <button onClick={() => handleNavClick('Dashboard')} className="w-full text-left p-3 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors rounded">
                        <Settings size={16} className="text-gray-400" /> Admin Dashboard
                      </button>
                    )}
                    <button className="w-full text-left p-3 text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors rounded">
                      <ShoppingBag size={16} className="text-gray-400" /> My Orders
                    </button>
                    <button onClick={handleLogout} className="w-full text-left p-3 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors rounded">
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button 
                onClick={() => setShowAuthBar(!showAuthBar)}
                className={`p-2 rounded-full transition-all ${showAuthBar ? 'bg-[#5A5A40] text-white' : 'text-[#333333] hover:bg-black/5'}`}
              >
                <User size={24} />
              </button>
            )}
            <button className="p-2 text-[#333333] hover:text-[#5A5A40] transition-colors relative">
              <ShoppingBag size={24} />
              <span className="absolute top-0 right-0 bg-[#5A5A40] text-[#F5E6C8] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Auth Selection Bar */}
      <AnimatePresence>
        {showAuthBar && !user && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#FAF9F6] border-b overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-6 transition-all">
              {!authForm ? (
                <div className="flex flex-wrap justify-center gap-6 md:gap-14">
                  <AuthOption 
                    icon={<Plus className="text-yellow-600" />} 
                    label="Student Reg" 
                    onClick={() => setAuthForm({ role: 'student', mode: 'register' })} 
                  />
                  <AuthOption 
                    icon={<LogIn className="text-blue-600" />} 
                    label="Student Login" 
                    onClick={() => setAuthForm({ role: 'student', mode: 'login' })} 
                  />
                  <AuthOption 
                    icon={<Users className="text-purple-600" />} 
                    label="Parent's Login" 
                    onClick={() => setAuthForm({ role: 'parent', mode: 'login' })} 
                  />
                  <AuthOption 
                    icon={<BookOpen className="text-emerald-600" />} 
                    label="Teacher Login" 
                    onClick={() => setAuthForm({ role: 'teacher', mode: 'login' })} 
                  />
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="max-w-md mx-auto"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-serif text-xl border-l-4 border-[#5A5A40] pl-3">
                      {authForm.mode === 'register' ? 'Create Student Account' : `${authForm.role.charAt(0).toUpperCase() + authForm.role.slice(1)} Login`}
                    </h3>
                    <button onClick={() => setAuthForm(null)} className="text-gray-400 hover:text-gray-600"><X size={20} /></button>
                  </div>
                  <form onSubmit={handleAuth} className="space-y-4">
                    {authForm.mode === 'register' && (
                      <input 
                        type="text" 
                        placeholder="Full Name" 
                        required 
                        className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                        value={name}
                        onChange={e => setName(e.target.value)}
                      />
                    )}
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                      type="password" 
                      placeholder="Password" 
                      required 
                      className="w-full p-3 bg-white border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5A5A40]/20"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-[#5A5A40] text-white py-3 font-bold uppercase tracking-widest hover:bg-[#306C69] transition-colors rounded-md mt-2">
                      {authForm.mode === 'register' ? 'Register' : 'Sign In'}
                    </button>
                    {authForm.role === 'student' && (
                      <p className="text-center text-sm text-gray-500 mt-4">
                        {authForm.mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                        <button 
                          type="button"
                          onClick={() => setAuthForm({ ...authForm, mode: authForm.mode === 'login' ? 'register' : 'login' })}
                          className="ml-2 text-[#306C69] font-bold underline"
                        >
                          {authForm.mode === 'login' ? 'Register here' : 'Login here'}
                        </button>
                      </p>
                    )}
                  </form>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spotlight Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[20vh] px-4 bg-black/20"
            onClick={(e: any) => e.target === e.currentTarget && setShowSearch(false)}
          >
            <motion.div 
              initial={{ scale: 0.98, opacity: 0, y: -10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: -10 }}
              className="bg-white/90 backdrop-blur-2xl w-full max-w-3xl rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.15)] overflow-hidden border border-black/5"
            >
              <div className="flex items-center px-6 py-5">
                <Search className="text-gray-500 mr-4 shrink-0" size={28} />
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Spotlight Search"
                  className="w-full text-3xl font-light bg-transparent focus:outline-none placeholder-gray-400 text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                   <button 
                     onClick={() => setSearchQuery('')}
                     className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition-colors bg-black/5 hover:bg-black/10 ml-4"
                   >
                     <X size={16} />
                   </button>
                )}
              </div>

              {/* Divider */}
              {(isSearching || searchResults.length > 0 || searchQuery.length > 1) && (
                <div className="h-px bg-black/5 mx-4" />
              )}

              <div className="max-h-[50vh] overflow-y-auto px-4 py-2 custom-scrollbar">
                {isSearching ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-1 pb-4">
                    {searchResults.map((result: any, i: number) => (
                      <button 
                        key={result.id}
                        onClick={() => {
                          handleNavClick(result.type === 'product' ? 'Shop' : 'Courses');
                          setShowSearch(false);
                        }}
                        className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all group text-left ${i === 0 ? 'bg-blue-500/10' : 'hover:bg-black/5'}`}
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white shadow-sm flex items-center justify-center">
                          {result.img || result.thumbnail ? (
                            <img src={result.img || result.thumbnail} alt={result.name || result.title} className="w-full h-full object-cover" />
                          ) : (
                            <Search size={16} className="text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h5 className="text-base text-gray-900 font-medium line-clamp-1">{result.name || result.title}</h5>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-gray-500 capitalize">{result.type}</span>
                            {result.category && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                <span className="text-xs text-gray-500">{result.category}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="text-right text-gray-500 flex items-center gap-2">
                           <span className="text-sm font-medium">${result.price}</span>
                           <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery.length > 1 ? (
                  <div className="py-12 text-center flex flex-col items-center">
                    <span className="text-sm text-gray-500 mb-2">No Results</span>
                    <span className="text-2xl font-light text-gray-900">"{searchQuery}"</span>
                  </div>
                ) : (
                   <div className="pb-4 pt-2">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 px-4">Suggested</h4>
                      <div className="flex justify-start gap-2 px-4 flex-wrap">
                        {['Ceramics', 'Vase', 'DIY', 'Bamboo'].map(tag => (
                          <button 
                            key={tag}
                            onClick={() => setSearchQuery(tag)}
                            className="px-4 py-1.5 bg-black/5 rounded-full text-sm text-gray-600 hover:bg-black/10 transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                   </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
                  <img src={siteSettings?.logoBase64 || "/logo.png"} alt="Logo" className="h-[90px] md:h-[110px] w-auto object-contain brightness-0 invert" />
                  <span className="font-serif text-2xl md:text-3xl text-[#e8ca74] mt-2">{siteSettings?.siteName || "Shringaara House Academy"}</span>
                  <span className="font-serif italic text-white/80 text-sm">{siteSettings?.tagline || "Tradition, retold by hand."}</span>
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
                <img src={siteSettings?.logoBase64 || "/logo.png"} alt="Logo" className="h-[90px] w-auto object-contain opacity-80" />
                <span className="font-serif text-xl text-[#5A5A40] mt-2">{siteSettings?.siteName || "Shringaara House Academy"}</span>
                <span className="font-serif italic text-gray-500 text-xs">{siteSettings?.tagline || "Tradition, retold by hand."}</span>
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
              © {new Date().getFullYear()} {siteSettings?.siteName || "Shringaara House Academy"}. All rights reserved.
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


