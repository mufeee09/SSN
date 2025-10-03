import React, { useMemo } from 'react';
import { BookOpen } from 'lucide-react';

// --- Multi-lingual Hadith Data ---
const hadithData = [
  {
    english: "Actions are judged by intentions.",
    tamil: "செயல்கள் எண்ணங்களைப் பொறுத்தே அமைகின்றன.",
    arabic: "إنما الأعمال بالنيات",
    source: "Bukhari & Muslim",
  },
  {
    english: "A kind word is a form of Sadaqah (charity).",
    tamil: "இனிய வார்த்தையும் ஒரு தர்மமே.",
    arabic: "الكلمة الطيبة صدقة",
    source: "Bukhari",
  },
  {
    english: "None of you truly believes until he wishes for his brother what he wishes for himself.",
    tamil: "உங்களில் எவரும் தம் சகோதரனுக்கு விரும்புவதையே தமக்கும் விரும்பாத வரை உண்மையான விசுவாசியாக ஆகமாட்டார்.",
    arabic: "لا يؤمن أحدكم حتى يحب لأخيه ما يحب لنفسه",
    source: "Bukhari & Muslim",
  },
  {
    english: "Be mindful of Allah wherever you are.",
    tamil: "நீங்கள் எங்கிருந்தாலும் அல்லாஹ்வை அஞ்சிக்கொள்ளுங்கள்.",
    arabic: "اتَّقِ اللهَ حَيْثُمَا كُنْتَ",
    source: "Tirmidhi",
  },
];

// --- Core Component: Ticker Item ---
const TickerItem = ({ hadith }) => (
  // The item is now a flex-shrink-0 container that holds the content and the required padding/margin for spacing.
  <div className="flex-shrink-0 flex items-center">
    
    {/* --- Actual Hadith Content Block --- */}
    {/* FIX: Removed fixed width and added responsive right padding (pr-12 / sm:pr-24) 
       to create dynamic space based on content length. */}
    <div className="w-auto pr-12 sm:pr-24 py-4 border-r border-gray-700/50">
        <div className="flex items-start text-white space-x-2 sm:space-x-4">
            
            <BookOpen size={20} className="text-gray-200 flex-shrink-0 mt-1 sm:mt-1.5" /> 
            
            <div className="flex flex-col flex-1 min-w-0">
                
                {/* Arabic Text */}
                <p className="text-lg sm:text-xl font-arabic text-right mb-1 leading-relaxed text-gray-100">
                    {hadith.arabic}
                </p>
                
                {/* Tamil Translation */}
                <p className="text-xs sm:text-sm font-medium text-gray-400 italic">
                    "{hadith.tamil}"
                </p>
                
                {/* English Translation and Source */}
                <p className="text-xs sm:text-sm font-semibold text-white mt-0.5 sm:mt-1">
                    {hadith.english} 
                    <span className="text-[10px] sm:text-xs ml-1 opacity-70 text-gray-300">({hadith.source})</span>
                </p>
            </div>
        </div>
    </div>
    
    {/* FIX: Removed the fixed-width spacer div which caused the overlap */}

  </div>
);

// --- Main Component: Hadith Ticker ---
export default function HadithTicker() {
  // Use a triple duplication to ensure a smooth, long loop
  const hadithCount = hadithData.length;
  const infiniteHadith = useMemo(() => [...hadithData, ...hadithData, ...hadithData], [hadithCount]);
  
  // Calculate duration based on content length for a consistent speed (longer content = longer scroll time)
  const scrollDuration = hadithCount * 18; // Speed tweak for a good visual flow (18 seconds per item)

   return (
    <section id="hadith-ticker" className="overflow-hidden bg-gray-900 py-3 shadow-2xl relative">
      
      {/* --- CSS for Scrolling Animation and Pause on Hover --- */}
      <style jsx global>{`
        .ticker-content {
          animation: scroll-left ${scrollDuration}s linear infinite;
        }
        
        .scroll-container:hover .ticker-content {
          animation-play-state: paused;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-66.6666%); 
          }
        }
        
        /* FIX: CHANGED FONT FAMILY HERE */
        .font-arabic {
            /* Now uses the imported Cairo font */
            font-family: 'Cairo', sans-serif; 
            font-weight: 700;
        }
      `}</style>

      {/* --- Scroll Container Wrapper (Used for the hover effect) --- */}
      <div 
        className="scroll-container flex whitespace-nowrap"
      >
        {/* Block 1 (First two repetitions of the Hadith data) */}
        <div className="ticker-content flex items-center">
          {infiniteHadith.slice(0, hadithCount * 2).map((hadith, index) => (
            <TickerItem key={index} hadith={hadith} />
          ))}
        </div>
        
        {/* Block 2 (The content that cycles back - only the last repetition) */}
        <div className="ticker-content flex items-center">
          {infiniteHadith.slice(hadithCount * 2).map((hadith, index) => (
            <TickerItem key={index + hadithCount * 2} hadith={hadith} />
          ))}
        </div>
        
      </div>
    </section>
  );
}