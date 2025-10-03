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
import img from "../images/solasakkaranallur_official-20251003-0001.jpg"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-900"
      style={{
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to S.S.Nallur Website
        </h1>
        <p className="text-xl sm:text-2xl text-gray-200 mb-8">
          To know all our Events, Programs
        </p>
        <button
          onClick={() => {
            const element = document.getElementById('menu');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
          }}
          className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
        >
          Explore Now
        </button>
      </div>
    </section>
  );
}