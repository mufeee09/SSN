// Replacing general icons with spiritually and community relevant icons
import { Landmark, Handshake, BookOpen, ScrollText } from 'lucide-react'; 

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          Our Mission & Vision
        </h2>
        <p className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto">
          Serving the community as a beacon of guidance, education, and unity.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* --- Mission Text Block --- */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <ScrollText size={30} className="text-blue-600 mr-3" />
              Our Foundation
            </h3>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-6 border-l-4 border-blue-600 pl-4">
              Our institution was established on the principles of the **Quran and Sunnah**,
              dedicated to fostering a deep, spiritual connection with Allah (SWT). 
              Our journey is rooted in the vision to create a vibrant center where individuals 
              can nourish their faith, seek knowledge, and live Islam authentically.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              For decades, we have provided a sanctuary for worship, a classroom for Islamic education, 
              and a gathering place for the community. We strive for excellence not in service, but in **Sincerity (Ikhlas)** and in upholding the highest standards of Islamic conduct.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed font-semibold">
              Our commitment is to **Purity of Worship**, **Empowerment through Knowledge**, and **Service to Humanity**.
            </p>
          </div>

          {/* --- Feature Boxes --- */}
          <div className="space-y-8">
            
            {/* 1. Spiritual Center */}
            <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-blue-600">
              <div className="flex-shrink-0 mr-5">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <Landmark size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Center for Worship
                </h3>
                <p className="text-gray-600">
                  Providing a tranquil and inclusive space for the five daily prayers, Jumu'ah, and Eid Salah.
                </p>
              </div>
            </div>

            {/* 2. Educational Hub */}
            <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-green-600">
              <div className="flex-shrink-0 mr-5">
                <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                  <BookOpen size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Source of Knowledge
                </h3>
                <p className="text-gray-600">
                  Offering classes for all ages, from Quranic memorization (Hifdh) to deep fiqh studies and Bayan programs.
                </p>
              </div>
            </div>

            {/* 3. Community Engagement */}
            <div className="flex items-start p-6 bg-white rounded-xl shadow-lg border-t-4 border-purple-600">
              <div className="flex-shrink-0 mr-5">
                <div className="w-14 h-14 bg-purple-600 rounded-full flex items-center justify-center shadow-md">
                  <Handshake size={28} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Community & Brotherhood
                </h3>
                <p className="text-gray-600">
                  Fostering strong bonds, supporting social welfare, and promoting interfaith understanding and harmony.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}