import React from 'react';
import { PlayCircle, Clock, BookOpen } from 'lucide-react';

export default function Courses() {
  const courses = [
    { id: 1, title: 'Introduction to Handbuilding Ceramics', instructor: 'Elena Rodriguez', duration: '4 Weeks', level: 'Beginner', img: 'https://images.unsplash.com/photo-1544439178-f7b538ef4cc0?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Mastering the Wheel: Intermediate Forms', instructor: 'Kenji Sato', duration: '6 Weeks', level: 'Intermediate', img: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Glazing Techniques & Alchemy', instructor: 'Sarah Jenkins', duration: '3 Weeks', level: 'All Levels', img: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?q=80&w=800&auto=format&fit=crop' }
  ];

  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <span className="text-[#e8ca74] font-semibold tracking-widest uppercase text-sm mb-4 block">Shringaara House Academy</span>
          <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] mb-6">Master the Art of Craft</h1>
          <p className="text-lg text-gray-500">
            Learn from master artisans from around the globe. Our immersive digital courses bring centuries of tradition directly to your studio.
          </p>
        </div>
        <button className="bg-[#5A5A40] text-[#f5f5f0] font-bold uppercase tracking-wider px-8 py-4 hover:bg-[#d4af37] transition-colors shrink-0">
          View All Courses
        </button>
      </div>

      <div className="space-y-12">
        {courses.map((course) => (
          <div key={course.id} className="flex flex-col md:flex-row gap-8 bg-[#FAF9F6] border border-gray-100 p-6 md:p-8 hover:shadow-lg transition-shadow">
            <div className="w-full md:w-1/3 aspect-[4/3] bg-gray-200 overflow-hidden relative group cursor-pointer">
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
              
              <div>
                <button className="border border-[#5A5A40] text-[#5A5A40] font-bold uppercase tracking-widest text-xs px-6 py-3 hover:bg-[#5A5A40] hover:text-[#f5f5f0] transition-colors">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
