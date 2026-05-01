import React from 'react';
import { Calendar, Video, ArrowRight } from 'lucide-react';

export default function LiveCoaching() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="bg-[#1A1F24] text-white p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay" alt="texture background" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="text-[#e8ca74] font-semibold tracking-widest uppercase text-sm mb-4 block">1-on-1 Sessions</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Live Mentorship & Coaching</h1>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Get personalized feedback on your portfolio, overcome creative blocks, or learn specific techniques directly from our resident master artisans in real-time video sessions.
          </p>
          
          <div className="bg-white/5 border border-white/10 p-8 mb-10 backdrop-blur-sm">
            <h3 className="font-serif text-2xl mb-4 text-[#e8ca74]">How it works</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-4">
                <span className="bg-[#e8ca74] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</span>
                <p>Select your mentor based on your discipline and goals.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-[#e8ca74] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</span>
                <p>Book a 60-minute time slot that works for you.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-[#e8ca74] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</span>
                <p>Submit photos or videos of your current work or pain points.</p>
              </li>
            </ul>
          </div>
          
          <button className="bg-[#e8ca74] text-[#1A1F24] font-bold uppercase tracking-wider px-8 py-4 hover:bg-white transition-colors flex items-center gap-3">
            Book a Session <Calendar size={20} />
          </button>
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-serif text-[#5A5A40] mb-10 text-center">Meet Our Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Elena Rodriguez", role: "Handbuilding Expert", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
            { name: "Kenji Sato", role: "Wheel Throwing & Glazing", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
            { name: "Sarah Jenkins", role: "Sculpture & Form", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" }
          ].map((mentor, i) => (
            <div key={i} className="text-center group">
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-gray-100">
                <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
              </div>
              <h3 className="font-serif text-xl text-[#333] mb-1">{mentor.name}</h3>
              <p className="text-gray-500 mb-4">{mentor.role}</p>
              <button className="text-[#5A5A40] font-semibold text-sm uppercase tracking-widest hover:text-[#e8ca74] flex items-center justify-center gap-1 mx-auto transition-colors">
                View Profile <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
