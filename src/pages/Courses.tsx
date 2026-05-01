import React, { useState, useEffect } from 'react';
import { PlayCircle, Clock, BookOpen, Plus, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, getDocs, addDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { useRazorpay } from '../hooks/useRazorpay';

interface Course {
  id: string;
  title: string;
  instructor: string;
  duration: string;
  level: string;
  img: string;
  description: string;
  price: number;
}

export default function Courses() {
  const { isAdmin } = useAuth();
  const { initiatePayment } = useRazorpay();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingCourse, setIsAddingCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const [newCourse, setNewCourse] = useState({
    title: '',
    instructor: '',
    duration: '',
    level: 'Beginner',
    img: 'https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop',
    description: '',
    price: 0
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'courses'));
      const querySnapshot = await getDocs(q);
      const fetchedCourses = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Course[];
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'courses'), newCourse);
      setIsAddingCourse(false);
      fetchCourses();
    } catch (error) {
      console.error("Error adding course:", error);
      alert("Failed to add course");
    }
  };

  const handleEnroll = (course: Course) => {
    if (course.price > 0) {
      initiatePayment(course.price, { name: course.title, description: `Enrollment for ${course.title}` });
    } else {
      alert("Enrolled in free course!");
    }
  };

  if (selectedCourse) {
    return (
      <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
        <button 
          onClick={() => setSelectedCourse(null)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#5A5A40] transition-colors mb-12"
        >
          <ArrowLeft size={20} /> All Courses
        </button>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-2/3">
            <h1 className="text-4xl md:text-5xl font-serif text-[#333] mb-6">{selectedCourse.title}</h1>
            <p className="text-[#5A5A40] text-xl mb-8">Guided by {selectedCourse.instructor}</p>
            <div className="aspect-video bg-gray-100 mb-10 overflow-hidden relative group">
              <img src={selectedCourse.img} alt={selectedCourse.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <PlayCircle size={80} className="text-white cursor-pointer hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="prose prose-lg max-w-none">
              <h3 className="font-serif text-2xl mb-4">Course Overview</h3>
              <p className="text-gray-600 leading-relaxed">{selectedCourse.description}</p>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-[#FAF9F6] p-8 border border-gray-100 shadow-sm">
              <p className="text-3xl font-serif text-[#333] mb-6">${selectedCourse.price}</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600">
                  <Clock size={20} className="text-[#5A5A40]" />
                  <span>Duration: {selectedCourse.duration}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <BookOpen size={20} className="text-[#5A5A40]" />
                  <span>Level: {selectedCourse.level}</span>
                </div>
              </div>
              <button 
                onClick={() => handleEnroll(selectedCourse)}
                className="w-full bg-[#5A5A40] text-[#f5f5f0] font-bold uppercase tracking-widest py-4 hover:bg-[#306C69] transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-[#F2C14E] font-semibold tracking-widest uppercase text-sm mb-4 block">Shringaara House Academy</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] mb-6">Master the Art of Craft</h1>
          <p className="text-lg text-gray-500">
            Learn from master artisans from around the globe. Our immersive digital courses bring centuries of tradition directly to your studio.
          </p>
        </div>
        {isAdmin && (
          <button 
            onClick={() => setIsAddingCourse(true)}
            className="flex items-center gap-2 bg-[#306C69] text-white font-bold uppercase tracking-wider px-8 py-4 hover:bg-[#204a48] transition-colors"
          >
            <Plus size={20} /> New Course
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A5A40]"></div>
        </div>
      ) : (
        <div className="space-y-12">
          {courses.map((course) => (
            <div key={course.id} className="flex flex-col md:flex-row gap-8 bg-[#FAF9F6] border border-gray-100 p-6 md:p-8 hover:shadow-lg transition-shadow">
              <div 
                className="w-full md:w-1/3 aspect-[4/3] bg-gray-200 overflow-hidden relative group cursor-pointer"
                onClick={() => setSelectedCourse(course)}
              >
                <img src={course.img} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PlayCircle size={48} className="text-white" />
                </div>
              </div>
              
              <div className="w-full md:w-2/3 flex flex-col justify-center">
                <h2 className="font-serif text-3xl text-[#333] mb-4">{course.title}</h2>
                <p className="text-[#5A5A40] mb-6 text-lg">Instructed by {course.instructor}</p>
                
                <div className="flex flex-wrap gap-6 mb-8 mt-auto">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={18} />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={18} />
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedCourse(course)}
                    className="border border-[#333] text-[#333] font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#333] hover:text-white transition-colors"
                  >
                    Details
                  </button>
                  <button 
                    onClick={() => handleEnroll(course)}
                    className="bg-[#5A5A40] text-[#f5f5f0] font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#306C69] transition-colors"
                  >
                    Enroll - ${course.price}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Course Modal */}
      {isAddingCourse && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[100] p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-serif mb-6">Create New Course</h2>
            <form onSubmit={handleAddCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full border p-2 rounded"
                  value={newCourse.title}
                  onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Instructor Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full border p-2 rounded"
                  value={newCourse.instructor}
                  onChange={e => setNewCourse({...newCourse, instructor: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4 Weeks"
                    required
                    className="w-full border p-2 rounded"
                    value={newCourse.duration}
                    onChange={e => setNewCourse({...newCourse, duration: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <select 
                    className="w-full border p-2 rounded"
                    value={newCourse.level}
                    onChange={e => setNewCourse({...newCourse, level: e.target.value})}
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                    <option>All Levels</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                <input 
                  type="number" 
                  required
                  className="w-full border p-2 rounded"
                  value={newCourse.price}
                  onChange={e => setNewCourse({...newCourse, price: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  required
                  className="w-full border p-2 rounded h-24"
                  value={newCourse.description}
                  onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input 
                  type="text" 
                  className="w-full border p-2 rounded"
                  value={newCourse.img}
                  onChange={e => setNewCourse({...newCourse, img: e.target.value})}
                />
              </div>
              <div className="flex justify-end gap-4 mt-8">
                <button 
                  type="button" 
                  onClick={() => setIsAddingCourse(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="bg-[#306C69] text-white px-6 py-2 rounded"
                >
                  Create Course
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
