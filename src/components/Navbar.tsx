// import { Menu, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       // Offset by the height of the fixed navbar (h-20 = 80px)
//       const offset = 80; 
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//       setIsOpen(false);
//     }
//   };

//   const navItems = [
//     // FIX 1: Changed ID from 'hero-section' to 'home'
//     { id: 'home', label: 'Home' }, 
//     // This MUST match the ID used in your PrayerSchedule component
//     { id: 'prayer-schedule', label: 'Prayer Times' },
//     { id: 'programs', label: 'Programs' }, // Matches ProgramScheduleSection.jsx
//     { id: 'about', label: 'Our Mission' }, // Matches AboutSection.jsx
//     { id: 'contact', label: 'Contact' },   // Matches ContactSection.jsx
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-2xl z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <div className="flex-shrink-0">
//             {/* Logo now scrolls to the 'home' section */}
//             <h1 
//                 className="text-3xl font-extrabold text-blue-500 tracking-wider cursor-pointer"
//                 onClick={() => scrollToSection('home')}
//             >
//                 Jamiah Masjid
//             </h1>
//           </div>

//           {/* --- Desktop Navigation --- */}
//           <div className="hidden md:flex space-x-2">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="text-gray-200 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200 uppercase tracking-wider"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* --- Mobile Menu Button --- */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-blue-400 hover:text-blue-300 p-2"
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Mobile Menu Dropdown --- */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="block w-full text-left px-3 py-3 text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-blue-400 rounded-lg transition-colors duration-200 uppercase tracking-wide"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


// import { Menu, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = 80; 
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//       setIsOpen(false);
//     }
//   };

//   const navItems = [
//     { id: 'home', label: 'Home' }, 
//     { id: 'prayer-schedule', label: 'Prayer Times' },
//     { id: 'programs', label: 'Programs' }, 
//     { id: 'about', label: 'Our Mission' }, 
//     { id: 'contact', label: 'Contact' },   
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-2xl z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <div className="flex-shrink-0">
//             <h1 
//                 className="text-3xl font-extrabold text-blue-500 tracking-wider cursor-pointer"
//                 onClick={() => scrollToSection('home')}
//                 // FIX: Add role="link" and aria-label for improved accessibility 
//                 // on this interactive header acting as a link
//                 role="link"
//                 aria-label="Jamiah Masjid - Go to Home"
//                 tabIndex={0} // Make it keyboard focusable
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                         scrollToSection('home');
//                     }
//                 }}
//             >
//                 Jamiah Masjid
//             </h1>
//           </div>

//           {/* --- Desktop Navigation --- */}
//           <div className="hidden md:flex space-x-2">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="text-gray-200 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200 uppercase tracking-wider"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* --- Mobile Menu Button --- */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-blue-400 hover:text-blue-300 p-2"
//               // FIX 1: Added aria-label for an accessible name for the icon-only button
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               // FIX 2: Added aria-expanded to communicate the state of the menu
//               aria-expanded={isOpen}
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Mobile Menu Dropdown --- */}
//       {isOpen && (
//         <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="block w-full text-left px-3 py-3 text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-blue-400 rounded-lg transition-colors duration-200 uppercase tracking-wide"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }


// import { Menu, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = 80; 
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//       setIsOpen(false);
//     }
//   };

//   const navItems = [
//     { id: 'home', label: 'Home' }, 
//     { id: 'prayer-schedule', label: 'Prayer Times' },
//     { id: 'programs', label: 'Programs' }, 
//     { id: 'about', label: 'Our Mission' }, 
//     { id: 'contact', label: 'Contact' },   
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md shadow-2xl z-50 border-b border-blue-500/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <div className="flex-shrink-0">
//             <h1 
//                 className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-wider cursor-pointer hover:from-blue-300 hover:to-blue-500 transition-all duration-300"
//                 onClick={() => scrollToSection('home')}
//                 role="link"
//                 aria-label="Jamiah Masjid - Go to Home"
//                 tabIndex={0}
//                 onKeyDown={(e) => {
//                     if (e.key === 'Enter' || e.key === ' ') {
//                         scrollToSection('home');
//                     }
//                 }}
//             >
//                 Jamiah Masjid
//             </h1>
//           </div>

//           {/* --- Desktop Navigation --- */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="relative text-gray-300 hover:text-blue-300 px-4 py-2 text-sm font-semibold transition-all duration-200 uppercase tracking-wider group"
//               >
//                 {item.label}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
//               </button>
//             ))}
//           </div>

//           {/* --- Mobile Menu Button --- */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               aria-expanded={isOpen}
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Mobile Menu Dropdown --- */}
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-b from-slate-800 to-slate-900 border-t border-blue-500/10 shadow-2xl animate-in slide-in-from-top-2 duration-200">
//           <div className="px-3 pt-3 pb-4 space-y-2">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="block w-full text-left px-4 py-3 text-sm font-medium text-gray-300 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all duration-200 uppercase tracking-wide group"
//               >
//                 <span className="inline-block">
//                   {item.label}
//                   <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-12 transition-all duration-300 ml-2"></span>
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'programs', label: 'Programs' },
    { id: 'prayer-schedule', label: 'Prayer Times' },
    { id: 'about', label: 'Our Mission' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md shadow-2xl z-50 border-b border-blue-500/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1
                className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-wider cursor-pointer hover:from-blue-300 hover:to-blue-500 transition-all duration-300"
                onClick={() => scrollToSection('home')}
                role="link"
                aria-label="Jamiah Masjid - Go to Home"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    scrollToSection('home');
                  }
                }}
              >
                Jamiah Masjid
              </h1>
            </div>

            {/* --- Desktop Navigation --- */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-gray-300 hover:text-blue-300 px-4 py-2 text-sm font-semibold transition-all duration-200 uppercase tracking-wider group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>

            {/* --- Mobile Menu Button --- */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-700 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={() => setIsOpen(false)}
      />

      {/* --- Mobile Menu Sidebar --- */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 shadow-2xl z-50 md:hidden transform transition-all duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b border-blue-500/10">
            <button
              onClick={() => setIsOpen(false)}
              className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
          </div>

          {/* Menu Items */}
          <div className="flex-1 px-6 py-8 space-y-2 overflow-y-auto">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-6 py-4 text-base font-semibold text-gray-300 hover:text-blue-300 hover:bg-blue-500/10 rounded-xl transition-all duration-500 ease-in-out uppercase tracking-wider border border-transparent hover:border-blue-500/20 transform ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
                  }`}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : `${(navItems.length - index) * 50}ms`,
                }}
              >
                <span className="flex items-center justify-between group">
                  {item.label}
                  <span className="inline-block w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-8 transition-all duration-300"></span>
                </span>
              </button>
            ))}
          </div>

          {/* Footer Decoration */}
          <div className="p-6 border-t border-blue-500/10">
            <div className="text-center text-sm text-gray-500">
              <div className="h-1 w-16 mx-auto bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-2"></div>
              Jamiah Masjid
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



// import { Menu, X } from 'lucide-react';
// import { useState } from 'react';

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   const scrollToSection = (id) => {
//     const element = document.getElementById(id);
//     if (element) {
//       const offset = 80;
//       const bodyRect = document.body.getBoundingClientRect().top;
//       const elementRect = element.getBoundingClientRect().top;
//       const elementPosition = elementRect - bodyRect;
//       const offsetPosition = elementPosition - offset;

//       window.scrollTo({
//         top: offsetPosition,
//         behavior: 'smooth'
//       });
//       setIsOpen(false);
//     }
//   };

//   const navItems = [
//     { id: 'home', label: 'Home' },
//     { id: 'prayer-schedule', label: 'Prayer Times' },
//     { id: 'programs', label: 'Programs' },
//     { id: 'about', label: 'Our Mission' },
//     { id: 'contact', label: 'Contact' },
//   ];

//   return (
//     <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-md shadow-2xl z-50 border-b border-blue-500/10">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-20">
//           <div className="flex-shrink-0">
//             <h1
//               className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent tracking-wider cursor-pointer hover:from-blue-300 hover:to-blue-500 transition-all duration-300"
//               onClick={() => scrollToSection('home')}
//               role="link"
//               aria-label="Jamiah Masjid - Go to Home"
//               tabIndex={0}
//               onKeyDown={(e) => {
//                 if (e.key === 'Enter' || e.key === ' ') {
//                   scrollToSection('home');
//                 }
//               }}
//             >
//               Jamiah Masjid
//             </h1>
//           </div>

//           {/* --- Desktop Navigation --- */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navItems.map(item => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="relative text-gray-300 hover:text-blue-300 px-4 py-2 text-sm font-semibold transition-all duration-200 uppercase tracking-wider group"
//               >
//                 {item.label}
//                 <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 group-hover:w-full transition-all duration-300"></span>
//               </button>
//             ))}
//           </div>

//           {/* --- Mobile Menu Button --- */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
//               aria-label={isOpen ? "Close menu" : "Open menu"}
//               aria-expanded={isOpen}
//             >
//               {isOpen ? <X size={28} /> : <Menu size={28} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* --- Mobile Menu Overlay --- */}
//       <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
//         {/* Backdrop with blur effect */}
//         <div
//           className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
//           onClick={() => setIsOpen(false)}
//         />

//         {/* Sliding Panel */}
//         <div
//           className={`absolute top-0 right-0 bottom-0 w-80 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 shadow-2xl z-50 border-l border-blue-500/30 transform transition-transform duration-700 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-blue-500/20">
//             <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
//               Menu
//             </h2>
//             <button
//               onClick={() => setIsOpen(false)}
//               className="text-blue-400 hover:text-blue-300 p-2 hover:bg-blue-500/10 rounded-lg transition-all duration-200"
//               aria-label="Close menu"
//             >
//               <X size={24} />
//             </button>
//           </div>

//           {/* Navigation Links */}
//           <div className="px-4 py-6 space-y-2">
//             {navItems.map((item, index) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className={`group w-full text-left px-6 py-4 text-base font-semibold text-gray-300 hover:text-blue-300 hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-transparent rounded-xl transition-all duration-300 uppercase tracking-wide border border-transparent hover:border-blue-500/30 relative overflow-hidden transform transition-all ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}`}
//                 style={{
//                   transitionDelay: isOpen ? `${index * 100 + 200}ms` : '0ms',
//                   transitionDuration: '500ms'
//                 }}
//               >
//                 <span className="relative z-10 flex items-center justify-between">
//                   {item.label}
//                   <span className="text-blue-400 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300">
//                     →
//                   </span>
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-600/5 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
//               </button>
//             ))}
//           </div>

//           {/* Decorative Element */}
//           <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
//         </div>
//       </div>
//     </nav>
//   );
// }