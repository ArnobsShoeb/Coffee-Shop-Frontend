import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';

function App() {
  const theme = useSelector((state) => state.theme?.mode || 'light');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure everything, including images, are loaded
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 500); // Optional small delay for smoothness
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (loading) return <Loader />; // <-- Add This!

  return (
    <div className={theme === 'dark'
      ? 'dark bg-gray-900 text-white min-h-screen'
      : 'bg-white text-gray-900 min-h-screen'
    }>
      <Header />
      <main className="transition-colors duration-1500">
        <Hero />
        <MenuSection />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
