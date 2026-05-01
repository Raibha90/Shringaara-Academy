import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif text-[#5A5A40] mb-6">Get in Touch</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Whether you have a question about a piece, a course, or just want to say hello, our studio doors are always open.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-1/3 space-y-10">
          <div>
            <h3 className="font-serif text-2xl text-[#333] mb-6">Studio Info</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 text-gray-600">
                <MapPin className="text-[#5A5A40] shrink-0" size={24} />
                <p>
                  123 Artisan Block<br />
                  Creative District<br />
                  New York, NY 10012
                </p>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <Phone className="text-[#5A5A40] shrink-0" size={24} />
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="flex items-center gap-4 text-gray-600">
                <Mail className="text-[#5A5A40] shrink-0" size={24} />
                <p>hello@shringaarabase.com</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-xl text-[#333] mb-4">Hours</h3>
            <p className="text-gray-500">
              Monday – Friday: 10am – 6pm<br />
              Saturday: 11am – 4pm<br />
              Sunday: Closed
            </p>
          </div>
        </div>

        <div className="lg:w-2/3">
          <form className="bg-[#FAF9F6] p-8 md:p-12 border border-gray-100" onSubmit={e => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <label className="block text-sm font-semibold tracking-wider text-[#333] uppercase mb-2">First Name</label>
                <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#5A5A40] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-semibold tracking-wider text-[#333] uppercase mb-2">Last Name</label>
                <input type="text" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#5A5A40] transition-colors" />
              </div>
            </div>
            
            <div className="mb-8">
              <label className="block text-sm font-semibold tracking-wider text-[#333] uppercase mb-2">Email Address</label>
              <input type="email" className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#5A5A40] transition-colors" />
            </div>
            
            <div className="mb-10">
              <label className="block text-sm font-semibold tracking-wider text-[#333] uppercase mb-2">Message</label>
              <textarea rows={4} className="w-full bg-transparent border-b border-gray-300 py-3 focus:outline-none focus:border-[#5A5A40] transition-colors resize-none"></textarea>
            </div>
            
            <button type="submit" className="bg-[#5A5A40] text-[#f5f5f0] font-bold uppercase tracking-wider px-10 py-4 hover:bg-[#d4af37] transition-colors w-full md:w-auto">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
