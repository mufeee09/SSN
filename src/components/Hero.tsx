// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900"
//     >
//       <div className="absolute inset-0 bg-black opacity-40"></div>
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
//           Welcome to S.S.Nallur Website
//         </h1>
//         <p className="text-xl sm:text-2xl text-gray-200 mb-8">
//           To know all our Events, Programs
//         </p>
//         <button
//           onClick={() => {
//             const element = document.getElementById('menu');
//             if (element) element.scrollIntoView({ behavior: 'smooth' });
//           }}
//           className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
//         >
//           Explore Now
//         </button>
//       </div>
//     </section>
//   );
// }


// import img from "../images/solasakkaranallur_official-20251003-0001.jpg"

// export default function Hero() {
//   return (
//     <section
//       id="home"
//       className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900"
//       style={{
//         backgroundImage: `url(${img})`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
//         <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
//           Welcome to S.S.Nallur Website
//         </h1>
//         <p className="text-xl sm:text-2xl text-gray-200 mb-8">
//           To know all our Events, Programs
//         </p>
//         <button
//           onClick={() => {
//             const element = document.getElementById('menu');
//             if (element) element.scrollIntoView({ behavior: 'smooth' });
//           }}
//           className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
//         >
//           Explore Now
//         </button>
//       </div>
//     </section>
//   );
// }

import img from "../images/solasakkaranallur_official-20251003-0001.jpg"
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-20"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Gradient overlay with modern design */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      
      {/* Animated accent elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>

      {/* Content container */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center justify-center">
        {/* Main heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
          Welcome to
          <span className="block bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent mt-2">
            S.S.Nallur Website
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-3xl leading-relaxed">
          Discover all our Events and Programs
        </p>

        {/* CTA Button */}
        <button
          onClick={() => {
            const element = document.getElementById('menu');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 font-semibold text-sm sm:text-base md:text-lg overflow-hidden rounded-lg transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
        >
          {/* Button background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 transition-transform duration-300 group-hover:scale-105"></div>
          
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 translate-x-full group-hover:translate-x-0 transition-all duration-500"></div>
          
          {/* Button text */}
          <span className="relative text-white flex items-center justify-center gap-2">
            Explore Now
            <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform duration-300" />
          </span>
        </button>

        {/* Scroll indicator
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center gap-2 text-blue-300 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-xs sm:text-sm font-medium uppercase tracking-widest">Scroll</span>
            <ChevronDown size={20} />
          </div>
        </div> */}
      </div>
    </section>
  );
}