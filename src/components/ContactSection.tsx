import React, { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '', // Added Subject field for clarity
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate API call success
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3500); // Slightly longer visible success state
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          Connect With Us
        </h2>
        <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto">
          Reach out for spiritual guidance, community support, or general inquiries.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- Contact Details (Left Column) --- */}
          <div className="lg:col-span-1 space-y-8 p-8 bg-gray-50 rounded-xl shadow-inner shadow-gray-200">
            
            <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b pb-3 border-blue-100">
              Masjid Information
            </h3>

            {/* Address */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                  <MapPin size={22} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">Location</h4>
                <p className="text-gray-700">
                  786 Al-Masjid Street<br />
                  Faith & Unity District<br />
                  City, State 90210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <Mail size={22} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">General Inquiry</h4>
                <p className="text-gray-700">info@masjidname.org</p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                  <Phone size={22} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">Emergency / Imam's Office</h4>
                <p className="text-gray-700">+91 98765 43210</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start border-t pt-6">
              <div className="flex-shrink-0 mr-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <Clock size={22} className="text-white" />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1 text-lg">Open for Worship</h4>
                <p className="text-green-700 font-semibold">24 Hours / 7 Days a Week</p>
                <p className="text-gray-600 text-sm mt-1">Visit during Salat times for congregation.</p>
              </div>
            </div>
          </div>
          
          {/* --- Contact Form (Right Column) --- */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl border-t-4 border-blue-600">
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Send a Message
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text" id="name" required
                    value={formData.name} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Your Full Name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email" id="email" required
                    value={formData.email} onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    placeholder="Your Email for Reply"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="mb-6">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject / Topic</label>
                <input
                  type="text" id="subject" required
                  value={formData.subject} onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Inquiry</label>
                <textarea
                  id="message" required
                  value={formData.message} onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Please describe your question or concern in detail."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg tracking-wider hover:bg-blue-700 transition-colors disabled:bg-green-600 disabled:cursor-not-allowed shadow-xl hover:shadow-blue-500/50 flex items-center justify-center"
              >
                {isSubmitted ? (
                  <>
                    <Send size={20} className="mr-2" /> Message Received!
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" /> Submit Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}