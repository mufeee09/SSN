// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// // import ImageCarousel from './components/ImageCarousel';
// import MenuSection from './components/MenuSection';
// import CalendarSection from './components/CalendarSection';
// import AboutSection from './components/AboutSection';
// import ContactSection from './components/ContactSection';
// import Footer from './components/Footer';
// import HadithTicker from './components/hadith';

// function App() {
//   return (
//     <div className="min-h-screen bg-white">
//       <Navbar />
//       <Hero />
//       {/* <ImageCarousel /> */}
//       <HadithTicker/>
//       <MenuSection />
//       <CalendarSection />
//       <AboutSection />
//       <ContactSection />
//       <Footer />
//     </div>
//   );
// }

// export default App;



// import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import MenuSection from './components/MenuSection';
// import CalendarSection from './components/CalendarSection';
// import AboutSection from './components/AboutSection';
// import ContactSection from './components/ContactSection';
// import Footer from './components/Footer';
// import HadithTicker from './components/hadith';

// // Loading Screen Component
// function LoadingScreen({ onComplete }) {
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // Start fade out after 4.5 seconds
//     const fadeTimer = setTimeout(() => {
//       setFadeOut(true);
//     }, 4500);

//     // Complete loading after 5 seconds
//     const completeTimer = setTimeout(() => {
//       onComplete();
//     }, 5000);

//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(completeTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
//         }`}
//     >
//       {/* Unique Islamic Geometric Spinner */}
//       <div className="relative w-32 h-32 mb-12">
//         {/* Outer rotating ring */}
//         <div className="absolute inset-0 border-4 border-transparent border-t-blue-400 border-r-blue-500 rounded-full animate-spin"></div>

//         {/* Middle rotating ring (reverse) */}
//         <div className="absolute inset-3 border-4 border-transparent border-b-blue-300 border-l-blue-400 rounded-full animate-spin-reverse"></div>

//         {/* Inner rotating ring */}
//         <div className="absolute inset-6 border-4 border-transparent border-t-blue-500 border-r-blue-600 rounded-full animate-spin-slow"></div>

//         {/* Center star pattern */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="relative w-12 h-12">
//             {[...Array(8)].map((_, i) => (
//               <div
//                 key={i}
//                 className="absolute top-1/2 left-1/2 w-1 h-6 bg-gradient-to-t from-blue-400 to-transparent"
//                 style={{
//                   transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
//                   transformOrigin: 'center',
//                 }}
//               />
//             ))}
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Arabic Text with Animation */}
//       <div className="text-center px-4">
//         <h1 className="text-4xl md:text-5xl font-normal text-white mb-2 animate-fade-in-up">
//           بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
//         </h1>
//         <p className="text-lg md:text-xl text-blue-300 font-semibold animate-fade-in-up-delay">
//           In the name of Allah, the Most Gracious, the Most Merciful
//         </p>
//       </div>


//       {/* Decorative elements */}
//       <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-400/20 rounded-full animate-pulse-slow"></div>
//       <div className="absolute top-1/4 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
//       <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-blue-500 rounded-full animate-ping-slow"></div>

//       <style jsx>{`
//         @keyframes spin-reverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes pulse-slow {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.3;
//           }
//         }

//         @keyframes ping-slow {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           75%, 100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }

//         .animate-spin-reverse {
//           animation: spin-reverse 2s linear infinite;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 0.5s;
//           opacity: 0;
//         }

//         .animate-fade-in-up-delay {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 1s;
//           opacity: 0;
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);

//   const handleLoadingComplete = () => {
//     setShowContent(true);
//     // Small delay to ensure smooth transition
//     setTimeout(() => {
//       setLoading(false);
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

//       <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
//         <Navbar />
//         <Hero />
//         <HadithTicker />
//         <MenuSection />
//         <CalendarSection />
//         <AboutSection />
//         <ContactSection />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import Navbar from './components/Navbar';
// import Hero from './components/Hero';
// import MenuSection from './components/MenuSection';
// import CalendarSection from './components/CalendarSection';
// import AboutSection from './components/AboutSection';
// import ContactSection from './components/ContactSection';
// import Footer from './components/Footer';
// import HadithTicker from './components/hadith';

// // Loading Screen Component
// function LoadingScreen({ onComplete }) {
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // Start fade out after 4.5 seconds
//     const fadeTimer = setTimeout(() => {
//       setFadeOut(true);
//     }, 4500);

//     // Complete loading after 5 seconds
//     const completeTimer = setTimeout(() => {
//       onComplete();
//     }, 5000);

//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(completeTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
//         fadeOut ? 'opacity-0' : 'opacity-100'
//       }`}
//     >
//       {/* Unique Islamic Crescent Moon Spinner */}
//       <div className="relative w-32 h-32 mb-12">
//         {/* Outer orbital ring with dots */}
//         <div className="absolute inset-0 animate-spin-slow">
//           <div className="absolute top-0 left-1/2 w-3 h-3 bg-blue-400 rounded-full -translate-x-1/2 shadow-lg shadow-blue-400/50"></div>
//           <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1/2 shadow-lg shadow-blue-500/50"></div>
//         </div>
        
//         {/* Middle crescent ring */}
//         <div className="absolute inset-4 animate-spin-reverse">
//           <svg className="w-full h-full" viewBox="0 0 100 100">
//             <circle
//               cx="50"
//               cy="50"
//               r="40"
//               fill="none"
//               stroke="url(#gradient1)"
//               strokeWidth="3"
//               strokeDasharray="60 200"
//               strokeLinecap="round"
//             />
//             <defs>
//               <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#60a5fa" />
//                 <stop offset="100%" stopColor="#3b82f6" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
        
//         {/* Inner rotating star */}
//         <div className="absolute inset-8 animate-spin">
//           <svg className="w-full h-full" viewBox="0 0 100 100">
//             <path
//               d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z"
//               fill="url(#gradient2)"
//               className="drop-shadow-lg"
//             />
//             <defs>
//               <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#93c5fd" />
//                 <stop offset="100%" stopColor="#60a5fa" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>
        
//         {/* Center pulsing crescent moon */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="relative w-8 h-8 animate-pulse">
//             <div className="absolute inset-0 bg-blue-400 rounded-full"></div>
//             <div className="absolute inset-0 bg-slate-950 rounded-full translate-x-2"></div>
//           </div>
//         </div>
        
//         {/* Orbiting small stars */}
//         <div className="absolute inset-0 animate-spin-reverse-slow">
//           <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse"></div>
//           <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
//         </div>
//       </div>

//       {/* Arabic Text with Animation */}
//       <div className="text-center px-4">
//         <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 animate-fade-in-up">
//           بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
//         </h1>
//         <p className="text-lg md:text-xl text-blue-300 font-semibold animate-fade-in-up-delay">
//           In the name of Allah, the Most Gracious, the Most Merciful
//         </p>
//       </div>

//       {/* Decorative elements */}
//       <div className="absolute top-10 left-10 w-20 h-20 border-2 border-blue-500/20 rounded-full animate-pulse"></div>
//       <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-blue-400/20 rounded-full animate-pulse-slow"></div>
//       <div className="absolute top-1/4 right-20 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
//       <div className="absolute bottom-1/4 left-20 w-2 h-2 bg-blue-500 rounded-full animate-ping-slow"></div>

//       <style jsx>{`
//         @keyframes spin-reverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }
        
//         @keyframes spin-slow {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(20px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes pulse-slow {
//           0%, 100% {
//             opacity: 1;
//           }
//           50% {
//             opacity: 0.3;
//           }
//         }

//         @keyframes ping-slow {
//           0% {
//             transform: scale(1);
//             opacity: 1;
//           }
//           75%, 100% {
//             transform: scale(2);
//             opacity: 0;
//           }
//         }

//         .animate-spin-reverse {
//           animation: spin-reverse 2s linear infinite;
//         }

//         .animate-spin-slow {
//           animation: spin-slow 3s linear infinite;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 0.5s;
//           opacity: 0;
//         }

//         .animate-fade-in-up-delay {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 1s;
//           opacity: 0;
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
//         }

//         .animate-ping-slow {
//           animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
//         }

//         .animate-spin-reverse-slow {
//           animation: spin-reverse-slow 4s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);

//   const handleLoadingComplete = () => {
//     setShowContent(true);
//     // Small delay to ensure smooth transition
//     setTimeout(() => {
//       setLoading(false);
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
//       <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
//         <Navbar />
//         <Hero />
//         <HadithTicker />
//         <MenuSection />
//         <CalendarSection />
//         <AboutSection />
//         <ContactSection />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;



import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CalendarSection from './components/CalendarSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HadithTicker from './components/hadith';

function LoadingScreen({ onComplete }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 4.5 seconds (duration 500ms)
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4500);

    // Complete loading after 5 seconds (when opacity is 0)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Background Ambience - Subtle Gold & Emerald Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* UNIQUE SPINNER: Celestial Vortex (Circular and Smaller: w-24 h-24) */}
      <div className="relative w-24 h-24 mb-12 flex items-center justify-center">
        
        {/* Swirling Paths / Orbits using SVG for advanced gradients and curves */}
        <div className="absolute inset-[-10%] rounded-full opacity-80 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-swirl-complex">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                {/* Path 1: Wide Emerald Orbit (Slower) */}
                <path d="M 50 10 A 40 40 0 1 1 50 90 A 20 20 0 1 0 50 10" fill="none" stroke="url(#cosmicGradientEmerald)" strokeWidth="1" />
                {/* Path 2: Inner Gold Orbit (Faster Reverse) */}
                <path d="M 50 20 A 30 30 0 1 0 50 80 A 15 15 0 1 1 50 20" fill="none" stroke="url(#cosmicGradientGold)" strokeWidth="1" />
                
                <defs>
                    {/* Emerald Gradient */}
                    <linearGradient id="cosmicGradientEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
                        <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                        <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    {/* Gold Gradient */}
                    <linearGradient id="cosmicGradientGold" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
        
        {/* Core: Strong, Pulsating Gold Star */}
        <div className="relative w-4 h-4 rounded-full bg-amber-200 shadow-[0_0_30px_rgba(252,211,77,1)] animate-pulse-core-strong"></div>
        
        {/* Twinkling Particles (Stars) */}
        <div className="absolute inset-0">
            {Array.from({ length: 25 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute w-[1px] h-[1px] bg-white rounded-full opacity-0 animate-twinkle-star"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                        filter: `blur(${Math.random() * 0.5}px)`,
                        transform: `scale(${0.5 + Math.random() * 0.5})`
                    }}
                ></div>
            ))}
        </div>
      </div>

      {/* Arabic Text with Refined Animation */}
      <div className="relative z-10 text-center px-4 space-y-5">
        <h1 
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-white to-emerald-100 mb-4 animate-fade-in-up tracking-wide drop-shadow-lg" 
          style={{ fontFamily: 'serif' }} /* Removed lineHeight: '1.4' to adjust style */
        >
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </h1>
        
        {/* Decorative Divider (STAR RETAINED) */}
        <div className="flex items-center justify-center gap-4 opacity-0 animate-fade-in-up-delay">
          <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <div className="text-amber-400/70 text-[10px] tracking-[3px]">✦</div>
          <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>

        <p className="text-sm md:text-base text-slate-400 font-normal tracking-[0.2em] uppercase animate-fade-in-up-delay2">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>
      </div>

      {/* CSS Styles for Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1); }
        }
        
        /* New Animations for Celestial Vortex */
        @keyframes swirl-complex {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes pulse-core-strong {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes twinkle-star {
            0%, 10%, 90%, 100% { opacity: 0; }
            50% { opacity: 1; }
        }
        
        /* SPEED INCREASED: 10s -> 5s */
        .animate-swirl-complex { animation: swirl-complex 5s linear infinite; } 
        .animate-pulse-core-strong { animation: pulse-core-strong 1.8s ease-in-out infinite; }
        .animate-twinkle-star { animation: twinkle-star 2.5s ease-in-out infinite; }

        /* Existing and retained animations */
        .animate-pulse-slow { animation: pulse-slow 6s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out forwards; animation-delay: 0.8s; opacity: 0; }
        .animate-fade-in-up-delay { animation: fade-in-up 1s ease-out 1.3s forwards; opacity: 0; }
        .animate-fade-in-up-delay2 { animation: fade-in-up 1s ease-out 1.8s forwards; opacity: 0; }
      `}</style>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    // 1. Start the content fade-in immediately
    setShowContent(true);
    
    // 2. Delay removal of the dark loading screen component 
    //    until the content's 1000ms transition is fully complete (plus a small buffer).
    //    This prevents the white flash.
    setTimeout(() => {
      setLoading(false);
    }, 1050); 
  };

  return (
    // Conditional root background: Keep it dark (slate-950) until the loading screen is physically removed.
    // This prevents the underlying white body/page background from flashing.
    <div className={`min-h-screen ${loading ? 'bg-slate-950' : 'bg-white'}`}>
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
      <div className={`transition-opacity duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <HadithTicker />
        <MenuSection />
        <CalendarSection />
        <AboutSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}

export default App;

// // Loading Screen Component
// function LoadingScreen({ onComplete }) {
//   const [fadeOut, setFadeOut] = useState(false);

//   useEffect(() => {
//     // Start fade out after 4.5 seconds
//     const fadeTimer = setTimeout(() => {
//       setFadeOut(true);
//     }, 4500);

//     // Complete loading after 5 seconds
//     const completeTimer = setTimeout(() => {
//       onComplete();
//     }, 5000);

//     return () => {
//       clearTimeout(fadeTimer);
//       clearTimeout(completeTimer);
//     };
//   }, [onComplete]);

//   return (
//     <div
//       className={`fixed inset-0 z-[9999] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
//         fadeOut ? 'opacity-0' : 'opacity-100'
//       }`}
//     >
//       {/* Elegant Minimal Spinner */}
//       <div className="relative w-32 h-32 mb-16">
//         {/* Outer ring with gradient */}
//         <div className="absolute inset-0">
//           <svg className="w-full h-full animate-spin-elegant" viewBox="0 0 100 100">
//             <circle
//               cx="50"
//               cy="50"
//               r="45"
//               fill="none"
//               stroke="url(#ringGradient)"
//               strokeWidth="2"
//               strokeDasharray="70 200"
//               strokeLinecap="round"
//               className="drop-shadow-lg"
//             />
//             <defs>
//               <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
//                 <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
//                 <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.2" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* Inner ring - reverse rotation */}
//         <div className="absolute inset-4">
//           <svg className="w-full h-full animate-spin-elegant-reverse" viewBox="0 0 100 100">
//             <circle
//               cx="50"
//               cy="50"
//               r="40"
//               fill="none"
//               stroke="url(#ringGradient2)"
//               strokeWidth="1.5"
//               strokeDasharray="50 200"
//               strokeLinecap="round"
//             />
//             <defs>
//               <linearGradient id="ringGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
//                 <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.3" />
//                 <stop offset="50%" stopColor="#60a5fa" stopOpacity="1" />
//                 <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* Center elegant crescent */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="relative w-12 h-12 animate-float">
//             <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-2xl">
//               <path
//                 d="M 50 10 A 20 20 0 1 1 50 90 A 30 30 0 1 0 50 10"
//                 fill="url(#crescentGradient)"
//               />
//               <defs>
//                 <linearGradient id="crescentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//                   <stop offset="0%" stopColor="#93c5fd" />
//                   <stop offset="100%" stopColor="#3b82f6" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </div>
//         </div>

//         {/* Subtle glow effect */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse-soft"></div>
//         </div>
//       </div>

//       {/* Arabic Text with Animation */}
//       <div className="text-center px-4 space-y-4">
//         <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 animate-fade-in-up tracking-wide" style={{ fontFamily: 'serif' }}>
//           بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
//         </h1>
//         <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto animate-fade-in-up-delay opacity-60"></div>
//         <p className="text-base md:text-lg text-blue-200/80 font-light animate-fade-in-up-delay2 tracking-wider">
//           In the name of Allah, the Most Gracious, the Most Merciful
//         </p>
//       </div>

//       {/* Minimal decorative dots */}
//       <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-twinkle"></div>
//       <div className="absolute top-32 right-32 w-1 h-1 bg-blue-300/30 rounded-full animate-twinkle" style={{ animationDelay: '0.5s' }}></div>
//       <div className="absolute bottom-32 left-32 w-1 h-1 bg-blue-400/30 rounded-full animate-twinkle" style={{ animationDelay: '1s' }}></div>
//       <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-twinkle" style={{ animationDelay: '1.5s' }}></div>

//       <style jsx>{`
//         @keyframes spin-elegant {
//           from {
//             transform: rotate(0deg);
//           }
//           to {
//             transform: rotate(360deg);
//           }
//         }

//         @keyframes spin-elegant-reverse {
//           from {
//             transform: rotate(360deg);
//           }
//           to {
//             transform: rotate(0deg);
//           }
//         }

//         @keyframes float {
//           0%, 100% {
//             transform: translateY(0px);
//           }
//           50% {
//             transform: translateY(-8px);
//           }
//         }

//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         @keyframes pulse-soft {
//           0%, 100% {
//             opacity: 0.3;
//           }
//           50% {
//             opacity: 0.6;
//           }
//         }

//         @keyframes twinkle {
//           0%, 100% {
//             opacity: 0.2;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 1;
//             transform: scale(1.5);
//           }
//         }

//         .animate-spin-elegant {
//           animation: spin-elegant 4s linear infinite;
//         }

//         .animate-spin-elegant-reverse {
//           animation: spin-elegant-reverse 3s linear infinite;
//         }

//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 1.2s ease-out forwards;
//           animation-delay: 0.8s;
//           opacity: 0;
//         }

//         .animate-fade-in-up-delay {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 1.5s;
//           opacity: 0;
//         }

//         .animate-fade-in-up-delay2 {
//           animation: fade-in-up 1s ease-out forwards;
//           animation-delay: 2s;
//           opacity: 0;
//         }

//         .animate-pulse-soft {
//           animation: pulse-soft 4s ease-in-out infinite;
//         }

//         .animate-twinkle {
//           animation: twinkle 3s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [showContent, setShowContent] = useState(false);

//   const handleLoadingComplete = () => {
//     setShowContent(true);
//     // Small delay to ensure smooth transition
//     setTimeout(() => {
//       setLoading(false);
//     }, 100);
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       {loading && <LoadingScreen onComplete={handleLoadingComplete} />}
      
//       <div className={`transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
//         <Navbar />
//         <Hero />
//         <HadithTicker />
//         <MenuSection />
//         <CalendarSection />
//         <AboutSection />
//         <ContactSection />
//         <Footer />
//       </div>
//     </div>
//   );
// }

// export default App;