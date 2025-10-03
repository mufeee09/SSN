import React from 'react';
// Replacing food icons with relevant Islamic/Event icons
import { Mic2, UserSquare, CalendarCheck, BookOpen, Clock, Zap, Utensils } from 'lucide-react'; 

// --- UPDATED MENU ITEMS TO PROGRAM ITEMS ---
const programItems = [
  {
    id: 1,
    name: 'Daily Fajr Bayan',
    description: 'A brief discourse and reflection after the Fajr prayer.',
    time: '4:50 AM', // Using the new rounded Fajr time from your schedule
    icon: Mic2, // Microphone for a lecture/discourse
    color: 'bg-blue-600',
  },
  {
    id: 2,
    name: 'Weekly Jumu\'ah Khutbah',
    description: 'The main congregational prayer and sermon for the week.',
    time: '1:30 PM', // Placeholder time
    icon: UserSquare, // Imam/Speaker
    color: 'bg-green-600',
  },
  {
    id: 3,
    name: 'Special Evening Prayer (Nafl)',
    description: 'Community gathering for specific supererogatory prayers.',
    time: '9:00 PM', // Placeholder time
    icon: Clock, // Time/Prayer icon
    color: 'bg-purple-600',
  },
  {
    id: 4,
    name: 'Quran & Hadith Circle',
    description: 'In-depth study of Islamic scripture and tradition.',
    time: 'Magrib to Isha', // Using prayer times as markers
    icon: BookOpen, // Open book for study
    color: 'bg-red-600',
  },
  {
    id: 5,
    name: 'Community Iftar Gathering',
    description: 'Monthly community meal for breaking the fast (Sunnah fasting).',
    time: 'Magrib Time',
    icon: Utensils, // Utensils for a meal/Iftar
    color: 'bg-orange-600',
  },
  {
    id: 6,
    name: 'Youth Leadership Workshop',
    description: 'Interactive sessions focused on character building and leadership.',
    time: 'Sat 10:00 AM',
    icon: Zap, // Energy/Activity
    color: 'bg-teal-600',
  },
];

export default function ProgramScheduleSection() {
  return (
    <section id="programs" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-4 tracking-tight">
          Masjid Program Schedule
        </h2>
        <p className="text-center text-gray-600 text-xl mb-14 max-w-3xl mx-auto">
          Join us for our regular spiritual discourses, educational classes, and community events.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="flex items-start p-6 sm:p-8 bg-white rounded-xl shadow-2xl hover:shadow-gray-400/50 transition-all duration-300 ease-in-out border-b-4 border-gray-100 hover:border-blue-600/70 transform hover:-translate-y-1"
              >
                {/* Icon Circle (Premium Design Element) */}
                <div className="flex-shrink-0 mr-6">
                  <div className={`w-14 h-14 ${item.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 sm:mb-0">
                      {item.name}
                    </h3>
                    {/* Time Badge (More Prominent) */}
                    <span className={`text-sm font-extrabold px-3 py-1 rounded-full ${item.color} text-white shadow-md uppercase tracking-wider`}>
                      <CalendarCheck size={14} className="inline-block mr-1 -mt-0.5" />
                      {item.time}
                    </span>
                  </div>
                  <p className="text-gray-600 text-base mt-1 border-t pt-2">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}