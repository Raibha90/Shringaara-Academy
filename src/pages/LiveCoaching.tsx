import React, { useState, useEffect } from 'react';
import { Calendar, Video, ArrowRight, Plus, X } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';

interface Mentor {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  sessionPrice: number;
}

export default function LiveCoaching() {
  const { user, isAdmin } = useAuth();
  const { initiatePayment } = useRazorpay();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingMentor, setIsAddingMentor] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);

  const [newMentor, setNewMentor] = useState({
    name: '',
    role: '',
    bio: '',
    sessionPrice: 50,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
  });

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'mentors'));
      const querySnapshot = await getDocs(q);
      const fetchedMentors = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Mentor[];
      
      if (fetchedMentors.length === 0) {
        // Fallback to initial data if empty
        setMentors([
          { id: '1', name: "Elena Rodriguez", role: "Handbuilding Expert", bio: "20 years of experience in traditional ceramics.", sessionPrice: 45, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop" },
          { id: '2', name: "Kenji Sato", role: "Wheel Throwing & Glazing", bio: "Specializing in Japanese glazing techniques.", sessionPrice: 60, img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop" },
          { id: '3', name: "Sarah Jenkins", role: "Sculpture & Form", bio: "Contemporary sculptor focused on organic forms.", sessionPrice: 55, img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop" }
        ]);
      } else {
        setMentors(fetchedMentors);
      }
    } catch (error) {
      console.error("Error fetching mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMentor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'mentors'), newMentor);
      setIsAddingMentor(false);
      fetchMentors();
    } catch (error) {
      console.error("Error adding mentor:", error);
      alert("Failed to add mentor");
    }
  };

  const handleBookSession = (mentor: Mentor) => {
    if (!user) {
      alert("Please sign in to book a session");
      return;
    }
    initiatePayment(mentor.sessionPrice, { name: `Live Session with ${mentor.name}`, description: "1-on-1 personalized mentorship session" });
  };

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="bg-[#1A1F24] text-white p-8 md:p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover mix-blend-overlay" alt="texture background" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="text-[#F2C14E] font-semibold tracking-widest uppercase text-sm mb-4 block">1-on-1 Sessions</span>
          <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Live Mentorship & Coaching</h1>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Get personalized feedback on your portfolio, overcome creative blocks, or learn specific techniques directly from our resident master artisans in real-time video sessions.
          </p>
          
          <div className="bg-white/5 border border-white/10 p-8 mb-10 backdrop-blur-sm">
            <h3 className="font-serif text-2xl mb-4 text-[#F2C14E]">How it works</h3>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-4">
                <span className="bg-[#F2C14E] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">1</span>
                <p>Select your mentor based on your discipline and goals.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-[#F2C14E] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">2</span>
                <p>Book a 60-minute time slot that works for you.</p>
              </li>
              <li className="flex items-start gap-4">
                <span className="bg-[#F2C14E] text-[#1A1F24] rounded-full w-6 h-6 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">3</span>
                <p>Submit photos or videos of your current work.</p>
              </li>
            </ul>
          </div>
          
          {isAdmin && (
            <button 
              onClick={() => setIsAddingMentor(true)}
              className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded hover:bg-white/20 transition-all mb-4 flex items-center gap-2"
            >
              <Plus size={20} /> Add Mentor
            </button>
          )}
        </div>
      </div>

      <div className="mt-20">
        <h2 className="text-3xl font-serif text-[#5A5A40] mb-10 text-center">Meet Our Mentors</h2>
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#5A5A40]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentors.map((mentor) => (
              <div key={mentor.id} className="bg-white border border-gray-100 p-8 text-center group hover:shadow-xl transition-all duration-500">
                <div className="w-48 h-48 mx-auto rounded-full overflow-hidden mb-6 bg-gray-100 relative">
                  <img src={mentor.img} alt={mentor.name} className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-[#5A5A40]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="font-serif text-2xl text-[#333] mb-1">{mentor.name}</h3>
                <p className="text-[#306C69] font-medium mb-4 uppercase text-xs tracking-widest">{mentor.role}</p>
                <p className="text-sm text-gray-500 mb-8 line-clamp-2 px-4">{mentor.bio}</p>
                
                <div className="flex flex-col gap-3">
                  <p className="text-xl font-medium text-[#5A5A40]">${mentor.sessionPrice} / Session</p>
                  <button 
                    onClick={() => handleBookSession(mentor)}
                    className="bg-[#5A5A40] text-white font-bold uppercase tracking-widest text-xs px-8 py-3 hover:bg-[#306C69] transition-colors"
                  >
                    Book 60min Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Mentor Modal */}
      {isAddingMentor && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-lg max-w-lg w-full"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif">Add New Mentor</h2>
              <button onClick={() => setIsAddingMentor(false)}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddMentor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border p-2 rounded"
                  value={newMentor.name}
                  onChange={e => setNewMentor({...newMentor, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Specialization</label>
                <input 
                  type="text" 
                  required
                  className="w-full border p-2 rounded"
                  value={newMentor.role}
                  onChange={e => setNewMentor({...newMentor, role: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full border p-2 rounded"
                  value={newMentor.sessionPrice}
                  onChange={e => setNewMentor({...newMentor, sessionPrice: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                <textarea 
                  required
                  className="w-full border p-2 rounded h-24"
                  value={newMentor.bio}
                  onChange={e => setNewMentor({...newMentor, bio: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded"
                  value={newMentor.img}
                  onChange={e => setNewMentor({...newMentor, img: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  type="submit" 
                  className="bg-[#306C69] text-white px-6 py-2 rounded"
                >
                  Save Mentor
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
