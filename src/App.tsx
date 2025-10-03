import Navbar from './components/Navbar';
import Hero from './components/Hero';
// import ImageCarousel from './components/ImageCarousel';
import MenuSection from './components/MenuSection';
import CalendarSection from './components/CalendarSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import HadithTicker from './components/hadith';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      {/* <ImageCarousel /> */}
      <HadithTicker/>
      <MenuSection />
      <CalendarSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;
