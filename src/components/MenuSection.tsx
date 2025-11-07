// import React from 'react';
// // Replacing food icons with relevant Islamic/Event icons
// import { Mic2, UserSquare, CalendarCheck, BookOpen, Clock, Zap, Utensils } from 'lucide-react'; 

// // --- UPDATED MENU ITEMS TO PROGRAM ITEMS ---
// const programItems = [
//   {
//     id: 1,
//     name: 'Daily Fajr Bayan',
//     description: 'A brief discourse and reflection after the Fajr prayer.',
//     time: '4:50 AM', // Using the new rounded Fajr time from your schedule
//     icon: Mic2, // Microphone for a lecture/discourse
//     color: 'bg-blue-600',
//   },
//   {
//     id: 2,
//     name: 'Weekly Jumu\'ah Khutbah',
//     description: 'The main congregational prayer and sermon for the week.',
//     time: '1:30 PM', // Placeholder time
//     icon: UserSquare, // Imam/Speaker
//     color: 'bg-green-600',
//   },
//   {
//     id: 3,
//     name: 'Special Evening Prayer (Nafl)',
//     description: 'Community gathering for specific supererogatory prayers.',
//     time: '9:00 PM', // Placeholder time
//     icon: Clock, // Time/Prayer icon
//     color: 'bg-purple-600',
//   },
//   {
//     id: 4,
//     name: 'Quran & Hadith Circle',
//     description: 'In-depth study of Islamic scripture and tradition.',
//     time: 'Magrib to Isha', // Using prayer times as markers
//     icon: BookOpen, // Open book for study
//     color: 'bg-red-600',
//   },
//   {
//     id: 5,
//     name: 'Community Iftar Gathering',
//     description: 'Monthly community meal for breaking the fast (Sunnah fasting).',
//     time: 'Magrib Time',
//     icon: Utensils, // Utensils for a meal/Iftar
//     color: 'bg-orange-600',
//   },
//   {
//     id: 6,
//     name: 'Youth Leadership Workshop',
//     description: 'Interactive sessions focused on character building and leadership.',
//     time: 'Sat 10:00 AM',
//     icon: Zap, // Energy/Activity
//     color: 'bg-teal-600',
//   },
// ];

// export default function ProgramScheduleSection() {
//   return (
//     <section id="programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
//           Masjid Program Schedule
//         </h2>
//         <p className="text-center text-gray-600 text-xl mb-14 max-w-3xl mx-auto">
//           Join us for our regular spiritual discourses, educational classes, and community events.
//         </p>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {programItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={item.id}
//                 className="flex items-start p-6 sm:p-8 bg-white rounded-xl shadow-2xl hover:shadow-gray-400/50 transition-all duration-300 ease-in-out border-b-4 border-gray-100 hover:border-blue-600/70 transform hover:-translate-y-1"
//               >
//                 {/* Icon Circle (Premium Design Element) */}
//                 <div className="flex-shrink-0 mr-6">
//                   <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
//                     <Icon size={28} className="text-white" />
//                   </div>
//                 </div>
                
//                 {/* Content */}
//                 <div className="flex-1">
//                   <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
//                     <h3 className="text-2xl font-bold text-gray-900 mb-1 sm:mb-0">
//                       {item.name}
//                     </h3>
//                     {/* Time Badge (More Prominent) */}
//                     <span className={`text-sm font-extrabold px-3 py-1 rounded-full ${item.color} text-white shadow-md uppercase tracking-wider`}>
//                       <CalendarCheck size={14} className="inline-block mr-1 -mt-0.5" />
//                       {item.time}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 text-base mt-1 border-t pt-2">{item.description}</p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }


// import React from 'react';
// import { Mic2, UserSquare, CalendarCheck, BookOpen, Clock, Zap, Utensils } from 'lucide-react'; 

// const programItems = [
//   {
//     id: 1,
//     name: 'Daily Fajr Bayan',
//     description: 'A brief discourse and reflection after the Fajr prayer.',
//     time: '4:50 AM',
//     icon: Mic2,
//     color: 'from-blue-500 to-blue-600',
//     lightColor: 'bg-blue-500/10',
//   },
//   {
//     id: 2,
//     name: 'Weekly Jumu\'ah Khutbah',
//     description: 'The main congregational prayer and sermon for the week.',
//     time: '1:30 PM',
//     icon: UserSquare,
//     color: 'from-emerald-500 to-emerald-600',
//     lightColor: 'bg-emerald-500/10',
//   },
//   {
//     id: 3,
//     name: 'Special Evening Prayer (Nafl)',
//     description: 'Community gathering for specific supererogatory prayers.',
//     time: '9:00 PM',
//     icon: Clock,
//     color: 'from-purple-500 to-purple-600',
//     lightColor: 'bg-purple-500/10',
//   },
//   {
//     id: 4,
//     name: 'Quran & Hadith Circle',
//     description: 'In-depth study of Islamic scripture and tradition.',
//     time: 'Magrib to Isha',
//     icon: BookOpen,
//     color: 'from-rose-500 to-rose-600',
//     lightColor: 'bg-rose-500/10',
//   },
//   {
//     id: 5,
//     name: 'Community Iftar Gathering',
//     description: 'Monthly community meal for breaking the fast (Sunnah fasting).',
//     time: 'Magrib Time',
//     icon: Utensils,
//     color: 'from-amber-500 to-amber-600',
//     lightColor: 'bg-amber-500/10',
//   },
//   {
//     id: 6,
//     name: 'Youth Leadership Workshop',
//     description: 'Interactive sessions focused on character building and leadership.',
//     time: 'Sat 10:00 AM',
//     icon: Zap,
//     color: 'from-cyan-500 to-cyan-600',
//     lightColor: 'bg-cyan-500/10',
//   },
// ];

// export default function ProgramScheduleSection() {
//   return (
//     <section id="programs" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
//       {/* Animated background elements */}
//       <div className="absolute inset-0 opacity-40">
//         <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
//       </div>

//       {/* Decorative top line */}
//       <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

//       <div className="relative max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
//             Masjid Program
//             <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
//               Schedule
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
//             Join us for our regular spiritual discourses, educational classes, and community events.
//           </p>
//         </div>

//         {/* Programs Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
//           {programItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <div
//                 key={item.id}
//                 className="group relative"
//               >
//                 {/* Gradient border effect */}
//                 <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur"></div>

//                 {/* Card */}
//                 <div className="relative bg-gradient-to-br from-slate-800 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300 h-full">
                  
//                   {/* Background glow on hover */}
//                   <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

//                   {/* Content */}
//                   <div className="relative z-10">
//                     {/* Icon and Title */}
//                     <div className="flex items-start justify-between mb-4">
//                       <div className={`bg-gradient-to-br ${item.color} p-3 rounded-xl shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
//                         <Icon size={24} className="text-white" />
//                       </div>
                      
//                       {/* Time Badge */}
//                       <div className={`${item.lightColor} text-sm font-bold px-3 py-1.5 rounded-full border border-slate-600/50 group-hover:border-blue-400/50 transition-all duration-300 backdrop-blur-sm`}>
//                         <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
//                           {item.time}
//                         </span>
//                       </div>
//                     </div>

//                     {/* Program Name */}
//                     <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
//                       {item.name}
//                     </h3>

//                     {/* Divider */}
//                     <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>

//                     {/* Description */}
//                     <p className="text-gray-400 text-sm sm:text-base leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
//                       {item.description}
//                     </p>

//                     {/* Bottom accent */}
//                     <div className="mt-6 pt-4 border-t border-slate-700/30 group-hover:border-blue-500/30 transition-colors duration-300 flex items-center text-xs text-gray-500 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                       <span>Learn More</span>
//                       <span className="ml-auto">→</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Decorative bottom line */}
//       <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
//     </section>
//   );
// }

import React from 'react';
import { Mic2, UserSquare, CalendarCheck, BookOpen, Clock, Zap, Utensils } from 'lucide-react'; 

const programItems = [
  {
    id: 1,
    name: 'Daily Fajr Bayan',
    description: 'A brief discourse and reflection after the Fajr prayer.',
    time: '4:50 AM',
    icon: Mic2,
    color: 'from-blue-500 to-blue-600',
    lightColor: 'bg-blue-500/10',
  },
  {
    id: 2,
    name: 'Weekly Jumu\'ah Khutbah',
    description: 'The main congregational prayer and sermon for the week.',
    time: '1:30 PM',
    icon: UserSquare,
    color: 'from-emerald-500 to-emerald-600',
    lightColor: 'bg-emerald-500/10',
  },
  {
    id: 3,
    name: 'Special Evening Prayer (Nafl)',
    description: 'Community gathering for specific supererogatory prayers.',
    time: '9:00 PM',
    icon: Clock,
    color: 'from-purple-500 to-purple-600',
    lightColor: 'bg-purple-500/10',
  },
  {
    id: 4,
    name: 'Quran & Hadith Circle',
    description: 'In-depth study of Islamic scripture and tradition.',
    time: 'Magrib to Isha',
    icon: BookOpen,
    color: 'from-rose-500 to-rose-600',
    lightColor: 'bg-rose-500/10',
  },
  {
    id: 5,
    name: 'Community Iftar Gathering',
    description: 'Monthly community meal for breaking the fast (Sunnah fasting).',
    time: 'Magrib Time',
    icon: Utensils,
    color: 'from-amber-500 to-amber-600',
    lightColor: 'bg-amber-500/10',
  },
  {
    id: 6,
    name: 'Youth Leadership Workshop',
    description: 'Interactive sessions focused on character building and leadership.',
    time: 'Sat 10:00 AM',
    icon: Zap,
    color: 'from-cyan-500 to-cyan-600',
    lightColor: 'bg-cyan-500/10',
  },
];

export default function ProgramScheduleSection() {
  return (
    <section id="programs" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Decorative top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
            Masjid Program
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
              Schedule
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Join us for our regular spiritual discourses, educational classes, and community events.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {programItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative"
              >
                {/* Card */}
                <div className="relative bg-gradient-to-br from-slate-800 to-slate-800/50 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/50 group-hover:border-slate-600 transition-all duration-200 h-full group-hover:translate-y-[-2px]">
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon and Title */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`bg-gradient-to-br ${item.color} p-3 rounded-xl shadow-lg transition-all duration-200`}>
                        <Icon size={24} className="text-white" />
                      </div>
                      
                      {/* Time Badge */}
                      <div className={`${item.lightColor} text-sm font-bold px-3 py-1.5 rounded-full border border-slate-600/50 transition-all duration-200 backdrop-blur-sm`}>
                        <span className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                          {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Program Name */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 transition-colors duration-200">
                      {item.name}
                    </h3>

                    {/* Divider */}
                    <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4"></div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed transition-colors duration-200">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative bottom line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
    </section>
  );
}