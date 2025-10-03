import React from 'react';
import { Heart, CornerUpLeft } from 'lucide-react';

// The most fundamental Hadith
const coreHadith = {
  arabic: " مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ طَرِيقًا إِلَى الْجَنَّةِ",
  english: "Whoever takes a path upon which to obtain knowledge, Allah makes the path to Paradise easy for him.",
  // source: "Bukhari & Muslim"
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 px-4 sm:px-6 lg:px-8 border-t border-gray-700 shadow-inner">
      <style jsx global>{`
        /* Consistent Arabic font styling */
        .font-arabic {
            font-family: 'Amiri', 'Traditional Arabic', serif;
            font-weight: 700;
        }
      `}</style>

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* --- 1. Featured Hadith Block --- */}
        <div className="mb-8 p-6 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 w-full max-w-xl">
          <div className="flex justify-center items-center mb-3">
            <Heart size={20} className="text-gray-400 mr-2" />
            <span className="text-sm font-semibold text-gray-400 uppercase tracking-widest">
              A Guiding Principle
            </span>
          </div>

          {/* Arabic Text (Prominent) */}
          <p className="text-3xl font-arabic text-center mb-3 leading-loose text-gray-100">
            {coreHadith.arabic}
          </p>

          {/* English Translation */}
          <p className="text-base italic text-center text-gray-400 mb-2">
            "{coreHadith.english}"
          </p>
          
          {/* Source */}
          {/* <p className="text-xs text-center font-medium text-gray-500">
            — {coreHadith.source}
          </p> */}
        </div>

        {/* --- 2. Navigation/Utility Links (Optional but good for premium feel) --- */}
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-8 text-sm font-medium mb-8 border-t border-b border-gray-800 py-4 w-full">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a>
            <a href="#programs" className="text-gray-400 hover:text-white transition-colors">Programs</a>
            <a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
            <a href="#hadith-ticker" className="text-gray-400 hover:text-white transition-colors flex items-center">
                Back to Top <CornerUpLeft size={14} className="ml-1" />
            </a>
        </div>
        
        {/* --- 3. Copyright and Credits --- */}
        <p className="text-gray-250 text-sm mt-2">
          &copy; {new Date().getFullYear()} Jamiah Masjid. All rights reserved.
        </p>
        <p className="text-gray-250 text-xs mt-1">
          Developed with <Heart size={10} className="inline mx-1 text-red-500" /> for the Community.
        </p>
      </div>
    </footer>
  );
}