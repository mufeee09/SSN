// import React, { useState, FormEvent } from 'react';
// import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     // Simulate API call success
//     setIsSubmitted(true);
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     }, 3500); // Slightly longer visible success state
//   };

//   // --- Address & Link Constants ---
//   const MASJID_ADDRESS = 'Jamia Masjid, Pallivasal Street, SolasakkaraNallur, Uluthakuppai, Tamil Nadu 609118';
//   // Use encodeURIComponent to ensure the address is safe for a URL query
//   const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MASJID_ADDRESS)}`;

//   const MASJID_EMAIL = 'info@masjidname.org';
//   const MASJID_PHONE = '+91 98765 43210';
//   // Format phone number for tel: link (no spaces or dashes)
//   const PHONE_HREF = '+919876543210';


//   return (
//     <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
//           Connect With Us
//         </h2>
//         <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto">
//           Reach out for spiritual guidance, community support, or general inquiries.
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//           {/* --- Contact Details (Left Column) --- */}
//           <div className="lg:col-span-1 space-y-8 p-8 bg-gray-50 rounded-xl shadow-inner shadow-gray-200">

//             <h3 className="text-2xl font-bold text-blue-600 mb-4 border-b pb-3 border-blue-100">
//               Masjid Information
//             </h3>

//             {/* Address (Now a Maps Link) */}
//             <div className="flex items-start">
//               <div className="flex-shrink-0 mr-4">
//                 <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
//                   <MapPin size={22} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 mb-1 text-lg">Location</h4>
//                 {/* FIX: Wrapped address in <a> tag with Maps URL */}
//                 <a
//                   href={MAPS_URL}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="text-gray-700 hover:text-blue-600 transition-colors underline-offset-4 hover:underline block"
//                   aria-label={`View ${MASJID_ADDRESS} on Google Maps (opens in new tab)`}
//                 >
//                   {MASJID_ADDRESS}
//                 </a>
//               </div>
//             </div>

//             {/* Email (Now a mailto Link) */}
//             <div className="flex items-start">
//               <div className="flex-shrink-0 mr-4">
//                 <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
//                   <Mail size={22} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 mb-1 text-lg">General Inquiry</h4>
//                 {/* FIX: Wrapped email in <a> tag with mailto: protocol */}
//                 <a
//                   href={`mailto:${MASJID_EMAIL}`}
//                   className="text-gray-700 hover:text-blue-600 transition-colors underline-offset-4 hover:underline"
//                   aria-label={`Send an email to ${MASJID_EMAIL}`}
//                 >
//                   {MASJID_EMAIL}
//                 </a>
//               </div>
//             </div>

//             {/* Phone (Now a tel Link) */}
//             <div className="flex items-start">
//               <div className="flex-shrink-0 mr-4">
//                 <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
//                   <Phone size={22} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h4 className="font-bold text-gray-900 mb-1 text-lg">Phone</h4>
//                 {/* FIX: Wrapped phone number in <a> tag with tel: protocol */}
//                 <a
//                   href={`tel:${PHONE_HREF}`}
//                   className="text-gray-700 hover:text-blue-600 transition-colors underline-offset-4 hover:underline"
//                   aria-label={`Call the Masjid at ${MASJID_PHONE}`}
//                 >
//                   {MASJID_PHONE}
//                 </a>
//               </div>
//             </div>

//             {/* Hours section commented out in original code, leaving it out */}
//           </div>

//           {/* --- Contact Form (Right Column) --- */}
//           <div className="lg:col-span-2">
//             <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl border-t-4 border-blue-600">
//               <h3 className="text-3xl font-bold text-gray-900 mb-6">
//                   Send a Message
//               </h3>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 {/* Name */}
//                 <div>
//                   <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
//                   <input
//                     type="text" id="name" required
//                     value={formData.name} onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
//                     placeholder="Your Full Name"
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
//                   <input
//                     type="email" id="email" required
//                     value={formData.email} onChange={handleChange}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
//                     placeholder="Your Email for Reply"
//                   />
//                 </div>
//               </div>

//               {/* Subject */}
//               <div className="mb-6">
//                 <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject / Topic</label>
//                 <input
//                   type="text" id="subject" required
//                   value={formData.subject} onChange={handleChange}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
//                   placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
//                 />
//               </div>

//               {/* Message */}
//               <div className="mb-8">
//                 <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Inquiry</label>
//                 <textarea
//                   id="message" required
//                   value={formData.message} onChange={handleChange}
//                   rows={6}
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
//                   placeholder="Please describe your question or concern in detail."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 disabled={isSubmitted}
//                 className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-bold text-lg tracking-wider hover:bg-blue-700 transition-colors disabled:bg-green-600 disabled:cursor-not-allowed shadow-xl hover:shadow-blue-500/50 flex items-center justify-center"
//               >
//                 {isSubmitted ? (
//                   <>
//                     <Send size={20} className="mr-2" /> Message Received!
//                   </>
//                 ) : (
//                   <>
//                     <Send size={20} className="mr-2" /> Submit Inquiry
//                   </>
//                 )}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


// import React, { useState } from 'react';
// import { Mail, Phone, MapPin, Send, ArrowRight } from 'lucide-react';

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: '',
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setIsSubmitted(true);
//     setTimeout(() => {
//       setIsSubmitted(false);
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     }, 3500);
//   };

//   const MASJID_ADDRESS = 'Jamia Masjid, Pallivasal Street, SolasakkaraNallur, Uluthakuppai, Tamil Nadu 609118';
//   const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(MASJID_ADDRESS)}`;
//   const MASJID_EMAIL = 'info@masjidname.org';
//   const MASJID_PHONE = '+91 98765 43210';
//   const PHONE_HREF = '+919876543210';

//   return (
//     <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Decorative top line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
//             Connect
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               With Us
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Reach out for spiritual guidance, community support, or general inquiries.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

//           {/* --- Contact Details (Left Column) --- */}
//           <div className="lg:col-span-1">
//             <div className="space-y-6">
//               <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-8">
//                 Masjid Information
//               </h3>

//               {/* Address */}
//               <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300">
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <MapPin size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors">Location</h4>
//                   <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors break-words">
//                     {MASJID_ADDRESS}
//                   </p>
//                   <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">
//                     Open in Maps <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Email */}
//               <a href={`mailto:${MASJID_EMAIL}`} className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300">
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Mail size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-emerald-300 transition-colors">General Inquiry</h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors break-all">
//                     {MASJID_EMAIL}
//                   </p>
//                   <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
//                     Send Email <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Phone */}
//               <a href={`tel:${PHONE_HREF}`} className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300">
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Phone size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-purple-300 transition-colors">Phone</h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
//                     {MASJID_PHONE}
//                   </p>
//                   <p className="text-purple-400 text-xs mt-2 flex items-center gap-1">
//                     Call Now <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>
//             </div>
//           </div>

//           {/* --- Contact Form (Right Column) --- */}
//           <div className="lg:col-span-2">
//             <div className="group relative">
//               {/* Gradient border effect */}
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

//               {/* Form Card */}
//               <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300">
//                 <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
//                   Send a Message
//                 </h3>

//                 {/* Name & Email Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   {/* Name */}
//                   <div>
//                     <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-3">Name</label>
//                     <input
//                       type="text"
//                       id="name"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       placeholder="Your Full Name"
//                     />
//                   </div>

//                   {/* Email */}
//                   <div>
//                     <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-3">Email</label>
//                     <input
//                       type="email"
//                       id="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                       placeholder="Your Email for Reply"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div className="mb-6">
//                   <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-3">Subject / Topic</label>
//                   <input
//                     type="text"
//                     id="subject"
//                     required
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
//                     placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div className="mb-8">
//                   <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-3">Your Inquiry</label>
//                   <textarea
//                     id="message"
//                     required
//                     value={formData.message}
//                     onChange={handleChange}
//                     rows={6}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 resize-none"
//                     placeholder="Please describe your question or concern in detail."
//                   />
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   onClick={handleSubmit}
//                   disabled={isSubmitted}
//                   className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center transition-all duration-300 shadow-lg ${
//                     isSubmitted
//                       ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/50 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-blue-500/50 hover:shadow-2xl transform hover:scale-[1.02]'
//                   }`}
//                 >
//                   {isSubmitted ? (
//                     <>
//                       <span className="inline-block mr-2">✓</span> Message Received!
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} className="mr-2" /> Submit Inquiry
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Decorative bottom line */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }


// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Replace with your EmailJS credentials
//     const serviceId = "service_24s79q8";
//     const templateId = "template_3hm6yqb";
//     const publicKey = "Q3GwIc419Yy5t5wGs";

//     emailjs
//       .send(serviceId, templateId, formData, publicKey)
//       .then(() => {
//         setIsSubmitted(true);
//         setTimeout(() => {
//           setIsSubmitted(false);
//           setFormData({ name: "", email: "", subject: "", message: "" });
//         }, 3500);
//       })
//       .catch((error) => {
//         console.error("EmailJS error:", error);
//         alert("Something went wrong while sending your message. Please try again.");
//       });
//   };

//   const MASJID_ADDRESS =
//     "Jamia Masjid, Pallivasal Street, SolasakkaraNallur, Uluthakuppai, Tamil Nadu 609118";
//   const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//     MASJID_ADDRESS
//   )}`;
//   const MASJID_EMAIL = "info@masjidname.org";
//   const MASJID_PHONE = "+91 98765 43210";
//   const PHONE_HREF = "+919876543210";

//   return (
//     <section
//       id="contact"
//       className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
//     >
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
//             Connect
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               With Us
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Reach out for spiritual guidance, community support, or general inquiries.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* --- Contact Details (Left Column) --- */}
//           <div className="lg:col-span-1">
//             <div className="space-y-6">
//               <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-8">
//                 Masjid Information
//               </h3>

//               {/* Address */}
//               <a
//                 href={MAPS_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <MapPin size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors">
//                     Location
//                   </h4>
//                   <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors break-words">
//                     {MASJID_ADDRESS}
//                   </p>
//                   <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">
//                     Open in Maps <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Email */}
//               <a
//                 href={`mailto:${MASJID_EMAIL}`}
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Mail size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-emerald-300 transition-colors">
//                     General Inquiry
//                   </h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors break-all">
//                     {MASJID_EMAIL}
//                   </p>
//                   <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
//                     Send Email <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Phone */}
//               <a
//                 href={`tel:${PHONE_HREF}`}
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Phone size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-purple-300 transition-colors">
//                     Phone
//                   </h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
//                     {MASJID_PHONE}
//                   </p>
//                   <p className="text-purple-400 text-xs mt-2 flex items-center gap-1">
//                     Call Now <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>
//             </div>
//           </div>

//           {/* --- Contact Form (Right Column) --- */}
//           <div className="lg:col-span-2">
//             <div className="group relative">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300"
//               >
//                 <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
//                   Send a Message
//                 </h3>

//                 {/* Name & Email */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-300 mb-3">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Your Full Name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-300 mb-3">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Your Email for Reply"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-300 mb-3">
//                     Subject / Topic
//                   </label>
//                   <input
//                     id="subject"
//                     type="text"
//                     required
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-semibold text-gray-300 mb-3">
//                     Your Inquiry
//                   </label>
//                   <textarea
//                     id="message"
//                     required
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     placeholder="Please describe your question or concern in detail."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitted}
//                   className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center transition-all duration-300 shadow-lg ${
//                     isSubmitted
//                       ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/50 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-blue-500/50 hover:shadow-2xl transform hover:scale-[1.02]"
//                   }`}
//                 >
//                   {isSubmitted ? (
//                     <>
//                       <span className="inline-block mr-2">✓</span> Message Sent!
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} className="mr-2" /> Submit Inquiry
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }



// import React, { useState } from "react";
// import emailjs from "@emailjs/browser";
// import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
// import toast, { Toaster } from "react-hot-toast"; // Toast notifications

// export default function ContactSection() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     subject: "",
//     message: "",
//   });
//   const [isSubmitted, setIsSubmitted] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.id]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const email = formData.email;

//     // --- Check restriction from localStorage ---
//     const stored = localStorage.getItem("emailRestriction");
//     const emailRestrictions = stored ? JSON.parse(stored) : {};

//     const now = new Date().getTime();

//     if (emailRestrictions[email] && now < emailRestrictions[email]) {
//       toast.error(
//         "You have already sent a message."
//       );
//       return;
//     }

//     // Replace with your EmailJS credentials
//     const serviceId = "service_24s79q8";
//     const templateId = "template_3hm6yqb";
//     const publicKey = "Q3GwIc419Yy5t5wGs";

//     emailjs
//       .send(serviceId, templateId, formData, publicKey)
//       .then(() => {
//         setIsSubmitted(true);

//         // Set restriction for 2 days
//         const expireTime = now + 2 * 24 * 60 * 60 * 1000; // 2 days in ms
//         localStorage.setItem(
//           "emailRestriction",
//           JSON.stringify({ ...emailRestrictions, [email]: expireTime })
//         );

//         toast.success("Message sent successfully!");

//         setTimeout(() => {
//           setIsSubmitted(false);
//           setFormData({ name: "", email: "", subject: "", message: "" });
//         }, 3500);
//       })
//       .catch((error) => {
//         console.error("EmailJS error:", error);
//         toast.error(
//           "Something went wrong while sending your message. Please try again."
//         );
//       });
//   };

//   const MASJID_ADDRESS =
//     "Jamia Masjid, Pallivasal Street, SolasakkaraNallur, Uluthakuppai, Tamil Nadu 609118";
//   const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//     MASJID_ADDRESS
//   )}`;
//   const MASJID_EMAIL = "info@masjidname.org";
//   const MASJID_PHONE = "+91 98765 43210";
//   const PHONE_HREF = "+919876543210";

//   return (
//     <section
//       id="contact"
//       className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
//     >
//       {/* Toast container */}
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div
//           className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
//           style={{ animationDelay: "1s" }}
//         ></div>
//       </div>

//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-20">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
//             Connect
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               With Us
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Reach out for spiritual guidance, community support, or general
//             inquiries.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
//           {/* --- Contact Details (Left Column) --- */}
//           <div className="lg:col-span-1">
//             <div className="space-y-6">
//               <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-8">
//                 Masjid Information
//               </h3>

//               {/* Address */}
//               <a
//                 href={MAPS_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <MapPin size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-blue-300 transition-colors">
//                     Location
//                   </h4>
//                   <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors break-words">
//                     {MASJID_ADDRESS}
//                   </p>
//                   <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">
//                     Open in Maps <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Email */}
//               <a
//                 href={`mailto:${MASJID_EMAIL}`}
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Mail size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-emerald-300 transition-colors">
//                     General Inquiry
//                   </h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors break-all">
//                     {MASJID_EMAIL}
//                   </p>
//                   <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
//                     Send Email <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>

//               {/* Phone */}
//               <a
//                 href={`tel:${PHONE_HREF}`}
//                 className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300"
//               >
//                 <div className="flex-shrink-0 mr-5">
//                   <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
//                     <Phone size={24} className="text-white" />
//                   </div>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-bold text-white mb-2 text-lg group-hover:text-purple-300 transition-colors">
//                     Phone
//                   </h4>
//                   <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
//                     {MASJID_PHONE}
//                   </p>
//                   <p className="text-purple-400 text-xs mt-2 flex items-center gap-1">
//                     Call Now <ArrowRight size={14} />
//                   </p>
//                 </div>
//               </a>
//             </div>
//           </div>

//           {/* --- Contact Form (Right Column) --- */}
//           <div className="lg:col-span-2">
//             <div className="group relative">
//               <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300"
//               >
//                 <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
//                   Send a Message
//                 </h3>

//                 {/* Name & Email */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-300 mb-3">
//                       Name
//                     </label>
//                     <input
//                       id="name"
//                       type="text"
//                       required
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Your Full Name"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-300 mb-3">
//                       Email
//                     </label>
//                     <input
//                       id="email"
//                       type="email"
//                       required
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       placeholder="Your Email for Reply"
//                     />
//                   </div>
//                 </div>

//                 {/* Subject */}
//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-300 mb-3">
//                     Subject / Topic
//                   </label>
//                   <input
//                     id="subject"
//                     type="text"
//                     required
//                     value={formData.subject}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
//                   />
//                 </div>

//                 {/* Message */}
//                 <div className="mb-8">
//                   <label className="block text-sm font-semibold text-gray-300 mb-3">
//                     Your Inquiry
//                   </label>
//                   <textarea
//                     id="message"
//                     required
//                     rows={6}
//                     value={formData.message}
//                     onChange={handleChange}
//                     className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
//                     placeholder="Please describe your question or concern in detail."
//                   />
//                 </div>

//                 <button
//                   type="submit"
//                   disabled={isSubmitted}
//                   className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center transition-all duration-300 shadow-lg ${
//                     isSubmitted
//                       ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-emerald-500/50 cursor-not-allowed"
//                       : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-blue-500/50 hover:shadow-2xl transform hover:scale-[1.02]"
//                   }`}
//                 >
//                   {isSubmitted ? (
//                     <>
//                       <span className="inline-block mr-2">✓</span> Message Sent!
//                     </>
//                   ) : (
//                     <>
//                       <Send size={20} className="mr-2" /> Submit Inquiry
//                     </>
//                   )}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }



import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, ArrowRight } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; // Toast notifications

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSending) return; // Prevent double click

    const { name, email, subject, message } = formData;

    // 🔥 Manual Validation
    if (!name || !email || !subject || !message) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    const stored = localStorage.getItem("emailRestriction");
    const emailRestrictions = stored ? JSON.parse(stored) : {};
    const now = new Date().getTime();

    if (emailRestrictions[email] && now < emailRestrictions[email]) {
      toast.error("You have already sent a message.");
      return;
    }

    const serviceId = "service_umcbwtb";
    const templateId = "template_m8cv23o";
    const publicKey = "YeTcY95A0O-zoZFy6";

    try {
      setIsSending(true); // Disable button immediately

      await emailjs.send(serviceId, templateId, formData, publicKey);

      setIsSubmitted(true);

      const expireTime = now + 2 * 24 * 60 * 60 * 1000;
      localStorage.setItem(
        "emailRestriction",
        JSON.stringify({ ...emailRestrictions, [email]: expireTime })
      );

      toast.success("Message sent successfully!");

      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);

    } catch (error) {
      console.error("EmailJS error:", error);
      toast.error("Something went wrong while sending your message.");
    } finally {
      setIsSending(false); // Re-enable button
    }
  };


  const MASJID_ADDRESS =
    "Jamia Masjid, Pallivasal Street, SolasakkaraNallur, Uluthakuppai, Tamil Nadu 609118";
  const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    MASJID_ADDRESS
  )}`;
  const MASJID_EMAIL = "info@masjidname.org";
  const MASJID_PHONE = "+91 98765 43210";
  const PHONE_HREF = "+919876543210";

  return (
    <section
      id="contact"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden"
    >
      {/* Toast container */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Connect
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              With Us
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Reach out for spiritual guidance, community support, or general
            inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* --- Contact Details (Left Column) --- */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent mb-8">
                Masjid Information
              </h3>

              {/* Address */}
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300 transform group-hover:scale-105">
                    <MapPin size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white mb-2 text-lg transition-colors">
                    Location
                  </h4>
                  <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors break-words">
                    {MASJID_ADDRESS}
                  </p>
                  <p className="text-blue-400 text-xs mt-2 flex items-center gap-1">
                    Open in Maps <ArrowRight size={14} />
                  </p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${MASJID_EMAIL}`}
                className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-all duration-300 transform group-hover:scale-105">
                    <Mail size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white mb-2 text-lg transition-colors">
                    General Inquiry
                  </h4>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors break-all">
                    {MASJID_EMAIL}
                  </p>
                  <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1">
                    Send Email <ArrowRight size={14} />
                  </p>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${PHONE_HREF}`}
                className="group flex items-start p-6 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex-shrink-0 mr-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/30 transition-all duration-300 transform group-hover:scale-105">
                    <Phone size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-white mb-2 text-lg transition-colors">
                    Phone
                  </h4>
                  <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                    {MASJID_PHONE}
                  </p>
                  <p className="text-purple-400 text-xs mt-2 flex items-center gap-1">
                    Call Now <ArrowRight size={14} />
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* --- Contact Form (Right Column) --- */}
          <div className="lg:col-span-2">
            <div className="group relative">
              <form
                onSubmit={handleSubmit}
                className="relative bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl p-8 sm:p-12 rounded-2xl border border-slate-700/50 group-hover:border-blue-500/30 transition-all duration-300"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-8">
                  Send a Message
                </h3>

                {/* Name & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-300 mb-3">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Email for Reply"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Subject / Topic
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Question about Zakat, Volunteering, Marriage services"
                  />
                </div>

                {/* Message */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-300 mb-3">
                    Your Inquiry
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Please describe your question or concern in detail."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-lg tracking-wider flex items-center justify-center transition-all duration-300 shadow-lg ${isSending
                      ? "bg-gray-600 text-white cursor-not-allowed"
                      : isSubmitted
                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-blue-500/50 hover:shadow-2xl transform hover:scale-[1.02]"
                    }`}
                >
                  {isSending ? (
                    "Sending..."
                  ) : isSubmitted ? (
                    <>
                      <span className="inline-block mr-2">✓</span> Message Sent!
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
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </section>
  );
}