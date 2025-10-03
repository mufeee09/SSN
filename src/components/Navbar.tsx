import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by the height of the fixed navbar (h-20 = 80px)
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
    // FIX 1: Changed ID from 'hero-section' to 'home'
    { id: 'home', label: 'Home' }, 
    // This MUST match the ID used in your PrayerSchedule component
    { id: 'prayer-schedule', label: 'Prayer Times' },
    { id: 'programs', label: 'Programs' }, // Matches ProgramScheduleSection.jsx
    { id: 'about', label: 'Our Mission' }, // Matches AboutSection.jsx
    { id: 'contact', label: 'Contact' },   // Matches ContactSection.jsx
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-900 shadow-2xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            {/* Logo now scrolls to the 'home' section */}
            <h1 
                className="text-3xl font-extrabold text-blue-500 tracking-wider cursor-pointer"
                onClick={() => scrollToSection('home')}
            >
                Jamiah Masjid
            </h1>
          </div>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex space-x-2">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-200 hover:text-blue-400 px-4 py-2 text-base font-semibold transition-colors duration-200 uppercase tracking-wider"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-400 hover:text-blue-300 p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* --- Mobile Menu Dropdown --- */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-100 hover:bg-gray-700 hover:text-blue-400 rounded-lg transition-colors duration-200 uppercase tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}