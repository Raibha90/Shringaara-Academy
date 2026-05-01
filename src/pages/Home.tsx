import React, { useState } from 'react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

export default function Home() {
  const categories = [
    { title: "Handmade Home Decor", img: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?q=80&w=800&auto=format&fit=crop" },
    { title: "Handmade Jewelery", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop" },
    { title: "Bamboo Decors", img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=800&auto=format&fit=crop" },
    { title: "Painting", img: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?q=80&w=800&auto=format&fit=crop" }
  ];

  const products = [
    { id: 1, name: "Handwoven Wall Hanging", price: 120, oldPrice: 150, rating: 5, img: "https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=600&auto=format&fit=crop", badge: "Sale", reviews: 12 },
    { id: 2, name: "Amber Silver Necklace", price: 85, rating: 4.5, img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop", reviews: 8 },
    { id: 3, name: "Bamboo Woven Lampshade", price: 210, rating: 5, img: "https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=600&auto=format&fit=crop", badge: "New", reviews: 24 },
    { id: 4, name: "Abstract Line Art Print", price: 65, rating: 4, img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=600&auto=format&fit=crop", reviews: 5 }
  ];

  const processCards = [
    { title: "Sourcing Raw Materials", desc: "Discovering true ethical and sustainable materials from nature.", img: "https://images.unsplash.com/photo-1584428020583-069a5a3a7ed4?q=80&w=600&auto=format&fit=crop" },
    { title: "Artisan Crafting", desc: "Master craftsmen shape the vision using traditions refined over centuries.", img: "https://images.unsplash.com/photo-1565118531796-763e5082d113?q=80&w=600&auto=format&fit=crop" },
    { title: "Refining Details", desc: "Every curve and polish is attended to by hand for true uniqueness.", img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop" },
    { title: "Final Masterpiece", desc: "A timeless creation, ready to tell its story in your home.", img: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=600&auto=format&fit=crop" }
  ];

  const testimonials = [
    { id: 1, name: "Sarah Jenkins", role: "Interior Designer", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop", text: "The craftsmanship on these pieces is absolutely stunning. I've used several items for my client's homes and they always become the focal point of the room.", rating: 5 },
    { id: 2, name: "David Chen", role: "Art Collector", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop", text: "Knowing the story and the artisan behind each piece makes it so much more valuable to me. It's not just decor, it's preserving a piece of culture.", rating: 5 },
    { id: 3, name: "Emily Watson", role: "Homeowner", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop", text: "I bought the bamboo lampshade for my reading nook and the quality is exceptional. The warm glow it casts is exactly what I was looking for.", rating: 4 }
  ];

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const faqs = [
    { question: "What exactly is 'handmade'?", answer: "Each piece is entirely crafted by independent artisans using traditional techniques, meaning no two items are exactly alike." },
    { question: "Do you ship internationally?", answer: "Yes, we ship to over 50 countries globally. Shipping rates and times vary by location." },
    { question: "What is your return policy?", answer: "We accept returns within 30 days. Items must be in their original condition and packaging." },
    { question: "Are your materials sustainably sourced?", answer: "Absolutely. We work directly with craftsmen who source local, sustainable, and ethical materials for all their creations." }
  ];

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <>
      {/* 1. Hero Banner */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=100&w=3840&auto=format&fit=crop" 
          alt="Artistic Handicrafts" 
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-transparent z-10 md:w-2/3"></div>
        
        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 md:px-12 lg:px-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <span className="text-[#306C69] font-semibold tracking-widest uppercase text-sm mb-4 block">New Exhibition</span>
            <h1 className="font-serif text-5xl md:text-7xl font-bold leading-tight mb-6 text-[#333333]">
              Curated <br className="hidden md:block"/>Handicrafts
            </h1>
            <p className="text-xl text-gray-700 mb-10 leading-relaxed font-light">
              Elevate your space with one-of-a-kind art pieces directly from independent creators worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#333333] text-white font-semibold py-4 px-8 uppercase tracking-wider text-sm hover:bg-[#F2C14E] hover:text-[#333333] hover:shadow-lg transition-all duration-300">
                Explore Collection
              </button>
              <button className="border-2 border-[#333333] text-[#333333] font-semibold py-4 px-8 uppercase tracking-wider text-sm hover:bg-[#333333] hover:text-white transition-all duration-300">
                Meet the Artists
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Visual Categories Grid */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-5xl text-[#333333] mb-4">Discover by Art Form</h2>
              <p className="text-gray-500 max-w-2xl text-lg">Browse our meticulously selected pieces organized by medium and technique.</p>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 text-[#306C69] font-bold uppercase tracking-wider hover:text-[#F2C14E] transition-colors pb-2">
              View All <ArrowRight size={20} />
            </a>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {categories.map((cat, idx) => (
              <motion.a 
                href="#" 
                key={idx} 
                variants={fadeUp}
                className="group relative h-96 overflow-hidden block"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10"></div>
                <img 
                  src={cat.img} 
                  alt={cat.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <h3 className="text-white font-serif text-2xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{cat.title}</h3>
                  <div className="h-[2px] w-0 bg-[#F2C14E] group-hover:w-12 transition-all duration-500"></div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Featured Products Slider (Static Grid for MVP) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-[#306C69] font-semibold tracking-widest uppercase text-sm mb-4 block">Artisan Spotlight</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#333333] mb-6">Trending This Week</h2>
            <p className="text-gray-500 text-lg">Hand-picked selections that our community is loving right now.</p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={fadeUp} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden mb-6 bg-gray-100">
                  {product.badge && (
                    <div className="absolute top-4 left-4 z-10 bg-[#F2C14E] text-[#333333] text-xs font-bold uppercase tracking-wider px-3 py-1">
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-multiply" 
                  />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <button className="w-full bg-white text-[#333333] font-bold py-3 shadow-lg hover:bg-[#333333] hover:text-white transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {[1,2,3,4,5].map(star => (
                      <Star 
                        key={star} 
                        size={14} 
                        className={star <= product.rating ? "text-[#F2C14E] fill-[#F2C14E]" : "text-gray-300"} 
                      />
                    ))}
                    <span className="text-xs text-gray-400 ml-1">({product.reviews})</span>
                  </div>
                  <h3 className="font-serif text-lg text-[#333333] mb-2">{product.name}</h3>
                  <div className="flex justify-center gap-3 items-center">
                    {product.oldPrice && <span className="text-gray-400 line-through text-sm">${product.oldPrice}</span>}
                    <span className="font-semibold text-[#306C69]">${product.price}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-16 text-center">
            <button className="border-b-2 border-[#333333] text-[#333333] font-bold uppercase tracking-widest pb-1 hover:text-[#F2C14E] hover:border-[#F2C14E] transition-colors">
              Shop All Best Sellers
            </button>
          </div>
        </div>
      </section>

      {/* 4. Storytelling/About Section */}
      <section className="bg-[#1A1F24] text-white overflow-hidden py-24 lg:py-0">
        <div className="flex flex-col lg:flex-row min-h-[600px] items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 w-full h-[400px] lg:h-auto relative lg:self-stretch"
          >
            <img 
              src="https://images.unsplash.com/photo-1565118531796-763e5082d113?q=80&w=1000&auto=format&fit=crop" 
              alt="Artisan at work" 
              className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 mix-blend-overlay"
            />
            <div className="absolute inset-0 bg-[#306C69]/20 mix-blend-multiply"></div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 w-full p-8 md:p-16 lg:p-24 flex flex-col justify-center"
          >
            <span className="text-[#F2C14E] font-semibold tracking-widest uppercase text-sm mb-6 block">Our Philosophy</span>
            <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-snug">
              Preserving tradition through modern curation.
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              We travel the globe connecting with master craftsmen and independent artists, bringing their stories and their work directly to you. Every piece in our collection is an investment in human creativity.
            </p>
            <div>
              <a href="#" className="inline-flex items-center gap-3 text-white font-bold uppercase tracking-widest hover:text-[#F2C14E] transition-colors">
                Read Our Story <ArrowRight size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Process of Handmade Things */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=2560&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">The Handmade Process</h2>
            <p className="text-gray-300 text-lg">
              Behind every product is a journey of passion, skill, and patience. Explore our roots.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {processCards.map((card, idx) => (
              <motion.div key={idx} variants={fadeUp} className="group flex flex-col h-full bg-white/95 shadow-sm hover:shadow-md transition-shadow">
                <div className="relative aspect-square overflow-hidden">
                  <img 
                    src={card.img} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 text-sm font-bold text-[#333]">
                    0{idx + 1}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-serif text-xl text-[#333] mb-3">{card.title}</h3>
                  <p className="text-gray-500 mb-6 flex-1">{card.desc}</p>
                  <a href="#" className="font-bold uppercase tracking-wider text-sm text-[#5A5A40] hover:text-[#e8ca74] transition-colors inline-block mt-auto">
                    Learn More
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 6. Testimonial Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#F2C14E] font-semibold tracking-widest uppercase text-sm mb-4 block">Testimonials</span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#333333]">Voices of Our Community</h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out" 
                style={{ transform: `translateX(-${currentTestimonialIndex * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-[#FAF9F6] p-10 md:p-14 text-center pb-12 relative flex flex-col items-center">
                      <div className="flex text-[#F2C14E] justify-center mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={20} 
                            fill={i < testimonial.rating ? "currentColor" : "none"} 
                            className={i < testimonial.rating ? "text-[#F2C14E]" : "text-gray-300"} 
                          />
                        ))}
                      </div>
                      <p className="text-xl md:text-2xl text-gray-700 italic font-serif leading-relaxed mb-10">"{testimonial.text}"</p>
                      
                      <div className="flex flex-col items-center">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-16 h-16 rounded-full object-cover mb-4 border-2 border-white shadow-md"
                        />
                        <h4 className="font-bold text-[#333]">{testimonial.name}</h4>
                        <span className="text-sm text-gray-500">{testimonial.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 lg:-left-6 top-1/2 -translate-y-1/2 -ml-4 lg:-ml-6 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5A5A40] hover:scale-105 transition-all focus:outline-none z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 lg:-right-6 top-1/2 -translate-y-1/2 -mr-4 lg:-mr-6 bg-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-[#5A5A40] hover:scale-105 transition-all focus:outline-none z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="py-24 bg-[#FAF9F6]">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="text-[#F2C14E] font-semibold tracking-widest uppercase text-sm mb-4 block">Help Center</span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#333333]">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="space-y-4"
          >
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className="bg-white rounded p-6 shadow-sm cursor-pointer transition-all hover:shadow-md"
                onClick={() => toggleFaq(idx)}
              >
                <div className="flex justify-between items-center text-[#333333]">
                  <h3 className="font-serif text-lg font-medium select-none">{faq.question}</h3>
                  <ChevronDown 
                    size={20} 
                    className={`text-[#306C69] transition-transform duration-300 ${openFaqIndex === idx ? 'rotate-180' : ''}`} 
                  />
                </div>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaqIndex === idx ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}
                >
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}
