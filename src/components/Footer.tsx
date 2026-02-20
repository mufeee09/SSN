// import React from 'react';
// import { Heart, CornerUpLeft } from 'lucide-react';

// // The most fundamental Hadith
// const coreHadith = {
//   arabic: " مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
//   english: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.",
//   // source: "Bukhari & Muslim"
// };

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-gray-700 shadow-inner">
//       <style jsx global>{`
//         /* Consistent Arabic font styling */
//         .font-arabic {
//             font-family: 'Amiri', 'Traditional Arabic', serif;
//             font-weight: 700;
//         }
//       `}</style>

//       <div className="max-w-7xl mx-auto flex flex-col items-center">

//         {/* --- 1. Featured Hadith Block --- */}
//         <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-xl">
//           <div className="flex justify-center items-center mb-3">
//             <Heart size={20} className="text-gray-400 mr-2" />
//             <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
//               A Guiding Principle
//             </span>
//           </div>

//           {/* Arabic Text (Prominent) */}
//           <p className="text-3xl font-arabic text-center mb-3 leading-loose text-gray-100">
//             {coreHadith.arabic}
//           </p>

//           {/* English Translation */}
//           <p className="text-base italic text-center text-gray-400 mb-2">
//             "{coreHadith.english}"
//           </p>

//           {/* Source */}
//           {/* <p className="text-xs text-center font-medium text-gray-500">
//             — {coreHadith.source}
//           </p> */}
//         </div>

//         {/* --- 2. Navigation/Utility Links (Optional but good for premium feel) --- */}
//         <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-sm font-medium mb-8 border-t border-b border-gray-800 py-4 w-full">
//             <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
//             <a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a>
//             <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
//             <a href="#hadith-ticker" className="text-gray-400 hover:text-white transition-colors flex items-center">
//                 Back to Top <CornerUpLeft size={14} className="ml-1" />
//             </a>
//         </div>

//         {/* --- 3. Copyright and Credits --- */}
//         <p className="text-gray-250 text-sm mt-2">
//           &copy; {new Date().getFullYear()} Jamiah Masjid. All rights reserved.
//         </p>
//         <p className="text-gray-250 text-xs mt-1">
//           Developed with <Heart size={10} className="inline mx-1 text-red-500" /> for the Community.
//         </p>
//       </div>
//     </footer>
//   );
// }


// import React from 'react';
// import { Heart, ArrowUp, Sparkles } from 'lucide-react';

// const coreHadith = {
//   arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
//   english: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.",
// };

// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="relative bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <style jsx global>{`
//         .font-arabic {
//             font-family: 'Amiri', 'Traditional Arabic', serif;
//             font-weight: 700;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>

//       {/* Animated background elements - subtle */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
//       </div>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
//               <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* Top gradient line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto flex flex-col items-center">

//         {/* --- 1. Featured Hadith Block --- */}
//         <div className="group mb-16 w-full max-w-4xl relative">
//           {/* Animated outer glow - intense on hover */}
//           <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-2xl shadow-2xl shadow-blue-600/50 group-hover:shadow-2xl group-hover:shadow-blue-500/80"></div>
//           <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 shadow-xl group-hover:shadow-2xl group-hover:shadow-purple-500/60"></div>

//           <div className="relative p-10 sm:p-14 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-black/40 backdrop-blur-2xl rounded-3xl border border-blue-500/20 group-hover:border-blue-400/60 transition-all duration-500 shadow-2xl overflow-hidden">

//             {/* Inner gradient glow - contained within card */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/15 group-hover:to-purple-500/15 rounded-3xl transition-all duration-700 pointer-events-none"></div>

//             {/* Decorative corner elements - subtle and contained */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 pointer-events-none"></div>

//             <div className="relative z-10">
//               <div className="flex justify-center items-center mb-8 gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-xl flex items-center justify-center border border-red-400/50 group-hover:border-red-300/80 transition-colors duration-300 shadow-lg shadow-red-500/20">
//                   <Heart size={24} className="text-red-400 group-hover:text-red-300 transition-colors animate-pulse" />
//                 </div>
//                 <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/50"></div>
//                 <span className="text-xs font-bold text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text uppercase tracking-[0.2em]">
//                   A Guiding Light
//                 </span>
//                 <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/50"></div>
//               </div>

//               <p className="text-2xl sm:text-4xl font-arabic text-center mb-8 leading-relaxed bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent group-hover:from-blue-100 group-hover:via-blue-50 group-hover:to-purple-100 transition-all duration-700">
//                 {coreHadith.arabic}
//               </p>

//               {/* Divider */}
//               <div className="flex items-center justify-center gap-4 mb-8">
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
//                 <Sparkles size={16} className="text-blue-400" />
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
//               </div>

//               {/* English Translation */}
//               <div className="flex items-start justify-center gap-6 px-4">
//                 <div className="w-1.5 h-20 bg-gradient-to-b from-blue-400 via-purple-400 to-transparent rounded-full hidden sm:block"></div>
//                 <p className="text-base sm:text-lg italic text-center text-gray-200 leading-relaxed group-hover:text-gray-100 transition-colors">
//                   <span className="text-blue-300 font-semibold">"</span>{coreHadith.english}<span className="text-purple-300 font-semibold">"</span>
//                 </p>
//                 <div className="w-1.5 h-20 bg-gradient-to-b from-transparent via-pink-400 to-pink-400 rounded-full hidden sm:block"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- 2. Navigation Links --- */}
//         <nav className="mb-16 w-full">
//           <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm font-bold px-4 py-8 border-t border-b border-blue-500/20 backdrop-blur-xl relative">
//             {/* Background gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg"></div>

//             <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
//               <a href="#about" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
//                 <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/40 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-blue-200 transition-colors duration-500">About Us</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500 shadow-lg shadow-blue-400/50"></div>
//               </a>

//               <a href="#programs" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-purple-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
//                 <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/40 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-purple-200 transition-colors duration-500">Programs</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-purple-300 group-hover:w-full transition-all duration-500 shadow-lg shadow-purple-400/50"></div>
//               </a>

//               <a href="#prayer-schedule" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-emerald-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
//                 <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/40 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-emerald-200 transition-colors duration-500">Prayer Times</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-300 group-hover:w-full transition-all duration-500 shadow-lg shadow-emerald-400/50"></div>
//               </a>

//               <a href="#contact" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-pink-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
//                 <div className="absolute inset-0 border border-pink-400/0 group-hover:border-pink-400/40 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-pink-200 transition-colors duration-500">Contact</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500 shadow-lg shadow-pink-400/50"></div>
//               </a>

//               <button
//                 onClick={scrollToTop}
//                 className="group relative px-6 py-3 text-gray-300 font-medium flex items-center gap-2 overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
//                 <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/40 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-blue-200 transition-colors duration-500">Back to Top</span>
//                 <ArrowUp size={18} className="relative group-hover:translate-y-[-4px] group-hover:text-blue-300 transition-all duration-500 transform" />
//                 <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500 shadow-lg shadow-blue-400/50"></div>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* --- 3. Copyright and Credits --- */}
//         <div className="text-center space-y-3 relative">
//           <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mb-6"></div>

//           <p className="text-gray-300 text-s font-medium tracking-wide">
//             &copy; {new Date().getFullYear()} <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">Jamiah Masjid</span>. All rights reserved.
//           </p>

//           <p className="text-gray-400 text-sm leading-relaxed flex items-center justify-center gap-2">
//             Developed with <Heart size={18} className="text-red-500 animate-pulse" /> for the Community
//           </p>
//         </div>
//       </div>

//       {/* Bottom gradient glow */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none"></div>
//     </footer>
//   );
// }




// import React from 'react';
// import { Heart, ArrowUp, Sparkles } from 'lucide-react';

// const coreHadith = {
//   arabic: "مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
//   english: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.",
// };

// export default function Footer() {
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <footer className="relative bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       <style>{`
//         .font-arabic {
//             font-family: 'Amiri', 'Traditional Arabic', serif;
//             font-weight: 700;
//         }
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-20px); }
//         }
//         .animate-float {
//           animation: float 6s ease-in-out infinite;
//         }
//       `}</style>

//       {/* Animated background elements - subtle */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
//       </div>

//       {/* Grid pattern overlay */}
//       <div className="absolute inset-0 opacity-10">
//         <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
//               <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* Top gradient line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto flex flex-col items-center">

//         {/* --- 1. Featured Hadith Block --- */}
//         <div className="group mb-16 w-full max-w-4xl relative">
//           <div className="relative p-10 sm:p-14 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-black/40 backdrop-blur-2xl rounded-3xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 shadow-2xl overflow-hidden">

//             {/* Inner gradient glow - contained within card */}
//             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-700 pointer-events-none"></div>

//             {/* Decorative corner elements - subtle and contained */}
//             <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-transparent rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 pointer-events-none"></div>
//             <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-full blur-2xl group-hover:blur-xl transition-all duration-500 pointer-events-none"></div>

//             <div className="relative z-10">
//               <div className="flex justify-center items-center mb-8 gap-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-xl flex items-center justify-center border border-red-400/50 group-hover:border-red-300/60 transition-colors duration-300 shadow-lg shadow-red-500/20">
//                   <Heart size={24} className="text-red-400 group-hover:text-red-300 transition-colors animate-pulse" />
//                 </div>
//                 <div className="h-px w-12 bg-gradient-to-r from-transparent to-blue-400/50"></div>
//                 <span className="text-xs font-bold text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text uppercase tracking-[0.2em]">
//                   A Guiding Light
//                 </span>
//                 <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-400/50"></div>
//               </div>

//               <p className="text-2xl sm:text-4xl font-arabic text-center mb-8 leading-relaxed bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent transition-all duration-700">
//                 {coreHadith.arabic}
//               </p>

//               {/* Divider */}
//               <div className="flex items-center justify-center gap-4 mb-8">
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
//                 <Sparkles size={16} className="text-blue-400" />
//                 <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
//               </div>

//               {/* English Translation */}
//               <div className="flex items-start justify-center gap-6 px-4">
//                 <div className="w-1.5 h-20 bg-gradient-to-b from-blue-400 via-purple-400 to-transparent rounded-full hidden sm:block"></div>
//                 <p className="text-base sm:text-lg italic text-center text-gray-200 leading-relaxed transition-colors">
//                   <span className="text-blue-300 font-semibold">"</span>{coreHadith.english}<span className="text-purple-300 font-semibold">"</span>
//                 </p>
//                 <div className="w-1.5 h-20 bg-gradient-to-b from-transparent via-pink-400 to-pink-400 rounded-full hidden sm:block"></div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* --- 2. Navigation Links --- */}
//         <nav className="mb-16 w-full">
//           <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm font-bold px-4 py-8 border-t border-b border-blue-500/20 backdrop-blur-xl relative">
//             {/* Background gradient */}
//             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg"></div>

//             <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
//               <a href="#about" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/30 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-blue-200 transition-colors duration-500">About Us</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500"></div>
//               </a>

//               <a href="#programs" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-purple-200 transition-colors duration-500">Programs</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-300 group-hover:w-full transition-all duration-500"></div>
//               </a>

//               <a href="#prayer-schedule" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/30 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-emerald-200 transition-colors duration-500">Prayer Times</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 group-hover:w-full transition-all duration-500"></div>
//               </a>

//               <a href="#contact" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
//                 <div className="absolute inset-0 border border-pink-400/0 group-hover:border-pink-400/30 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-pink-200 transition-colors duration-500">Contact</span>
//                 <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></div>
//               </a>

//               <button
//                 onClick={scrollToTop}
//                 className="group relative px-6 py-3 text-gray-300 font-medium flex items-center gap-2 overflow-hidden"
//               >
//                 <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/30 rounded-xl transition-all duration-500"></div>
//                 <span className="relative group-hover:text-blue-200 transition-colors duration-500">Back to Top</span>
//                 <ArrowUp size={18} className="relative group-hover:translate-y-[-4px] group-hover:text-blue-300 transition-all duration-500 transform" />
//                 <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500"></div>
//               </button>
//             </div>
//           </div>
//         </nav>

//         {/* --- 3. Copyright and Credits --- */}
//         <div className="text-center space-y-3 relative">
//           <div className="h-px w-24 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mx-auto mb-6"></div>

//           <p className="text-gray-300 text-s font-medium tracking-wide">
//             &copy; {new Date().getFullYear()} <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-bold">Jamiah Masjid</span>. All rights reserved.
//           </p>

//           <p className="text-gray-400 text-sm leading-relaxed flex items-center justify-center gap-2">
//             Developed with <Heart size={18} className="text-red-500 animate-pulse" /> for the Community
//           </p>
//         </div>
//       </div>

//       {/* Bottom gradient glow */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none"></div>
//     </footer>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Heart, ArrowUp, Sparkles } from 'lucide-react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

interface Hadith {
  arabic: string;
  english: string;
}

export default function Footer() {

  const [coreHadith, setCoreHadith] = useState<Hadith | null>(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchHadith = async () => {
      try {
        const docRef = doc(db, "footerHadith", "main");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();

          if (data.isActive) {
            setCoreHadith({
              arabic: data.arabic,
              english: data.english,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching footer hadith:", error);
      }
    };

    fetchHadith();
  }, []);

  return (
    <footer className="relative bg-black text-white pt-24 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <style>{`
        .font-arabic {
            font-family: 'Noto Naskh Arabic', serif;
            font-weight: 700;
            direction: rtl;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>

      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-blue-600/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-600/40 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/80 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">

        {coreHadith && (
          <div className="group mb-16 w-full max-w-4xl relative">
            <div className="relative p-10 sm:p-14 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-black/40 backdrop-blur-2xl rounded-3xl border border-blue-500/20 group-hover:border-blue-400/40 transition-all duration-500 shadow-2xl overflow-hidden">

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-3xl transition-all duration-700 pointer-events-none"></div>

              <div className="relative z-10">
                <div className="flex justify-center items-center mb-8 gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-xl flex items-center justify-center border border-red-400/50 group-hover:border-red-300/60 transition-colors duration-300 shadow-lg shadow-red-500/20">
                    <Heart size={24} className="text-red-400 group-hover:text-red-300 transition-colors animate-pulse" />
                  </div>
                  <span className="text-xs font-bold text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text uppercase tracking-[0.2em]">
                    A Guiding Light
                  </span>
                </div>

                <p
                  dir="rtl"
                  className="text-2xl sm:text-4xl font-arabic text-center mb-8 leading-relaxed bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent transition-all duration-700">
                  {coreHadith.arabic}
                </p>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
                  <Sparkles size={16} className="text-blue-400" />
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                </div>

                <div className="flex items-start justify-center gap-6 px-2">
                  <p className="text-base sm:text-lg italic text-center text-gray-200 leading-relaxed transition-colors">
                    <span className="text-blue-300 font-semibold">"</span>
                    {coreHadith.english}
                    <span className="text-purple-300 font-semibold">"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <nav className="mb-16 w-full">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm font-bold px-4 py-8 border-t border-b border-blue-500/20 backdrop-blur-xl relative">
           
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-lg"></div>

            <div className="relative flex flex-wrap justify-center gap-2 sm:gap-4 w-full">
              <a href="#about" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
                <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/30 rounded-xl transition-all duration-500"></div>
                <span className="relative group-hover:text-blue-200 transition-colors duration-500">About Us</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500"></div>
              </a>

              <a href="#programs" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
                <div className="absolute inset-0 border border-purple-400/0 group-hover:border-purple-400/30 rounded-xl transition-all duration-500"></div>
                <span className="relative group-hover:text-purple-200 transition-colors duration-500">Programs</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-purple-300 group-hover:w-full transition-all duration-500"></div>
              </a>

              <a href="#prayer-schedule" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
                <div className="absolute inset-0 border border-emerald-400/0 group-hover:border-emerald-400/30 rounded-xl transition-all duration-500"></div>
                <span className="relative group-hover:text-emerald-200 transition-colors duration-500">Prayer Times</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 group-hover:w-full transition-all duration-500"></div>
              </a>

              <a href="#contact" className="group relative px-6 py-3 text-gray-300 font-medium overflow-hidden">
                <div className="absolute inset-0 border border-pink-400/0 group-hover:border-pink-400/30 rounded-xl transition-all duration-500"></div>
                <span className="relative group-hover:text-pink-200 transition-colors duration-500">Contact</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-400 to-pink-300 group-hover:w-full transition-all duration-500"></div>
              </a>

              <button
                onClick={scrollToTop}
                className="group relative px-6 py-3 text-gray-300 font-medium flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 border border-blue-400/0 group-hover:border-blue-400/30 rounded-xl transition-all duration-500"></div>
                <span className="relative group-hover:text-blue-200 transition-colors duration-500">Back to Top</span>
                <ArrowUp size={18} className="relative group-hover:translate-y-[-4px] group-hover:text-blue-300 transition-all duration-500 transform" />
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-300 group-hover:w-full transition-all duration-500"></div>
              </button>
            </div>
          </div>
        </nav> 


        <div className="text-center space-y-3 relative">
          <p className="text-gray-300 text-sm font-medium tracking-wide">
            &copy; {new Date().getFullYear()} Jamiah Masjid. All rights reserved.
          </p>

          <p className="text-gray-400 text-sm leading-relaxed flex items-center justify-center gap-2">
            Developed with <Heart size={18} className="text-red-500 animate-pulse" /> for the Community
          </p>
        </div>
      </div>
       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none"></div>
    </footer>
  );
}