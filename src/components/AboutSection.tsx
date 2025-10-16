// // Replacing general icons with spiritually and community relevant icons
// import { Landmark, Handshake, BookOpen, ScrollText } from 'lucide-react'; 

// export default function AboutSection() {
//   return (
//     <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
//           Our Mission & Vision
//         </h2>
//         <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto">
//           Serving the community as a beacon of guidance, education, and unity.
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
//           {/* --- Mission Text Block --- */}
//           <div>
//             <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
//               <ScrollText size={30} className="text-blue-600 mr-3" />
//               Our Foundation
//             </h3>
            
//             <p className="text-gray-700 text-lg leading-relaxed mb-6 border-l-4 border-blue-600 pl-4">
//               Our institution was established on the principles of the **Quran and Sunnah**,
//               dedicated to fostering a deep, spiritual connection with Allah (SWT). 
//               Our journey is rooted in the vision to create a vibrant center where individuals 
//               can nourish their faith, seek knowledge, and live Islam authentically.
//             </p>
//             <p className="text-gray-700 text-lg leading-relaxed mb-6">
//               For decades, we have provided a sanctuary for worship, a classroom for Islamic education, 
//               and a gathering place for the community. We strive for excellence not in service, but in **Sincerity (Ikhlas)** and in upholding the highest standards of Islamic conduct.
//             </p>
//             <p className="text-gray-700 text-lg leading-relaxed font-semibold">
//               Our commitment is to **Purity of Worship**, **Empowerment through Knowledge**, and **Service to Humanity**.
//             </p>
//           </div>

//           {/* --- Feature Boxes --- */}
//           <div className="space-y-8">
            
//             {/* 1. Spiritual Center */}
//             <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-blue-600">
//               <div className="flex-shrink-0 mr-5">
//                 <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
//                   <Landmark size={28} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Center for Worship
//                 </h3>
//                 <p className="text-gray-600">
//                   Providing a tranquil and inclusive space for the five daily prayers, Jumu'ah, and Eid Salah.
//                 </p>
//               </div>
//             </div>

//             {/* 2. Educational Hub */}
//             <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-600">
//               <div className="flex-shrink-0 mr-5">
//                 <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-md">
//                   <BookOpen size={28} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Source of Knowledge
//                 </h3>
//                 <p className="text-gray-600">
//                   Offering classes for all ages, from Quranic memorization (Hifdh) to deep fiqh studies and Bayan programs.
//                 </p>
//               </div>
//             </div>

//             {/* 3. Community Engagement */}
//             <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-purple-600">
//               <div className="flex-shrink-0 mr-5">
//                 <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
//                   <Handshake size={28} className="text-white" />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-1">
//                   Community & Brotherhood
//                 </h3>
//                 <p className="text-gray-600">
//                   Fostering strong bonds, supporting social welfare, and promoting interfaith understanding and harmony.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


import { Landmark, Handshake, BookOpen, ScrollText, ArrowRight } from 'lucide-react'; 

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Our Mission
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              & Vision
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Serving the community as a beacon of guidance, education, and unity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* --- Mission Text Block --- */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <ScrollText size={24} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
                  Our Foundation
                </h3>
              </div>
            </div>
            
            <div className="space-y-5 relative">
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 rounded-full hidden sm:block"></div>
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed pl-0 sm:pl-6">
                Our institution was established on the principles of the
                <span className="font-semibold text-blue-300"> Quran and Sunnah</span>, dedicated to fostering a deep, spiritual connection with Allah (SWT). Our journey is rooted in the vision to create a vibrant center where individuals can nourish their faith, seek knowledge, and live Islam authentically.
              </p>
              
              <p className="text-gray-300 text-base sm:text-lg leading-relaxed pl-0 sm:pl-6">
                For decades, we have provided a sanctuary for worship, a classroom for Islamic education, and a gathering place for the community. We strive for excellence not in service, but in <span className="font-semibold text-purple-300">Sincerity (Ikhlas)</span> and in upholding the highest standards of Islamic conduct.
              </p>
              
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-4 sm:p-6">
                <p className="text-gray-200 text-base sm:text-lg font-semibold flex items-start gap-3">
                  <ArrowRight size={20} className="text-blue-400 flex-shrink-0 mt-1" />
                  <span><span className="text-blue-300">Purity of Worship</span> • <span className="text-purple-300">Empowerment through Knowledge</span> • <span className="text-pink-300">Service to Humanity</span></span>
                </p>
              </div>
            </div>
          </div>

          {/* --- Feature Boxes --- */}
          <div className="space-y-6">
            
            {/* 1. Spiritual Center */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div className="relative flex items-start p-6 sm:p-8 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-blue-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <Landmark size={32} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">
                    Center for Worship
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Providing a tranquil and inclusive space for the five daily prayers, Jumu'ah, and Eid Salah.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Educational Hub */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div className="relative flex items-start p-6 sm:p-8 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 group-hover:border-emerald-500/50 transition-all duration-300">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-emerald-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <BookOpen size={32} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    Source of Knowledge
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Offering classes for all ages, from Quranic memorization (Hifdh) to deep fiqh studies and Bayan programs.
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Community Engagement */}
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>
              <div className="relative flex items-start p-6 sm:p-8 bg-gradient-to-br from-slate-800/60 to-slate-800/30 backdrop-blur-xl rounded-2xl border border-slate-700/50 group-hover:border-purple-500/50 transition-all duration-300">
                <div className="flex-shrink-0 mr-5">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:shadow-purple-500/50 transition-all duration-300 transform group-hover:scale-110">
                    <Handshake size={32} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    Community & Brotherhood
                  </h3>
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    Fostering strong bonds, supporting social welfare, and promoting interfaith understanding and harmony.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </section>
  );
}