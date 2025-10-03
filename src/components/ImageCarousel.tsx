import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import img1 from "../images/solasakkaranallur_official-20251003-0001.jpg";
import img2 from "../images/solasakkaranallur_official-20251003-0002.jpg";
import img3 from "../images/solasakkaranallur_official-20251003-0003.jpg";

const images = [
  { id: 1, url: img1, alt: 'Image 1' },
  { id: 2, url: img2, alt: 'Image 2' },
  { id: 3, url: img3, alt: 'Image 3' },
];

// export default function ImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === images.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
//           Gallery
//         </h2>
//         <div className="relative">
//           <div className="relative h-64 sm:h-96 overflow-hidden rounded-lg shadow-xl">
//             <img
//               src={images[currentIndex].url}
//               alt={images[currentIndex].alt}
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <button
//             onClick={goToPrevious}
//             className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
//           >
//             <ChevronLeft size={24} className="text-gray-800" />
//           </button>

//           <button
//             onClick={goToNext}
//             className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-lg transition-all"
//           >
//             <ChevronRight size={24} className="text-gray-800" />
//           </button>

//           <div className="flex justify-center mt-4 space-x-2">
//             {images.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 className={`h-2 w-2 rounded-full transition-all ${
//                   index === currentIndex ? 'bg-gray-800 w-8' : 'bg-gray-400'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full bg-gray-50 py-8 sm:py-12">
      <div className="w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
          Gallery
        </h2>
        <div className="relative w-full">
          <div className="relative w-full">
            <div className="relative h-64 sm:h-96 lg:h-[750px] overflow-hidden shadow-2xl">
              <img
                src={images[currentIndex].url}
                alt={images[currentIndex].alt}
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={goToPrevious}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 hover:bg-opacity-100 p-2 sm:p-3 rounded-full shadow-lg transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} className="text-gray-800" />
            </button>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex justify-center space-x-2 z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white w-8' : 'bg-white bg-opacity-50 w-2'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}