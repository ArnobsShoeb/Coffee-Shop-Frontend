import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from 'react';
import heroImages from '../data/heroImages';
import '../index.css'; 

const Hero = () => {
  const slides = [...heroImages.slice(0, 5), heroImages[0]];

  const [slideIndex, setSlideIndex] = useState(0);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const slideInterval = useRef(null);
  const slidesRef = useRef(null);
  const slideIndexRef = useRef(slideIndex);

  useEffect(() => { slideIndexRef.current = slideIndex; }, [slideIndex]);

  const stopAutoplay = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
      slideInterval.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();
    slideInterval.current = setInterval(() => {
      setSlideIndex(i => i + 1);
    }, 5000);
  }, [stopAutoplay]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  useLayoutEffect(() => {
    const el = slidesRef.current;
    if (!el) return;

    const onTransitionEnd = () => {
      const lastIndex = slides.length - 1;
      if (slideIndexRef.current === lastIndex) {
        setTransitionEnabled(false);
        setSlideIndex(0);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setTransitionEnabled(true));
          });
        });
      }
    };

    el.addEventListener('transitionend', onTransitionEnd);
    return () => el.removeEventListener('transitionend', onTransitionEnd);
  }, [slides.length]);

  const goTo = (i) => {
    stopAutoplay();
    setTransitionEnabled(true);
    setSlideIndex(i);
    startAutoplay();
  };

  const transformStyle = { transform: `translateX(-${slideIndex * 100}%)`, willChange: 'transform' };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden select-none">
      {/* Slides */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={slidesRef}
          className={`flex h-full ${transitionEnabled ? 'transition-transform duration-700 ease-out' : ''}`}
          style={transformStyle}
        >
          {slides.map((src, i) => (
            <div key={i} className="min-w-full h-full flex-shrink-0">
              {src ? (
                <img
                  src={src}
                  alt={`hero-${i}`}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 text-gray-800 flex items-center justify-center">
                  <span className="text-3xl font-semibold">Picture {i + 1}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Hero text */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <div className="backdrop-blur-sm bg-black/10 rounded-2xl px-12 md:px-20 py-16 md:py-24 text-center max-w-4xl w-full">
          <h1
            className="text-4xl md:text-6xl font-bold drop-shadow-lg"
            style={{ fontFamily: 'Kaushan Script, cursive' }}
          >
            <span className="text-white">Welcome to </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              CoffeeHouse
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl mx-auto italic">
            The best coffee in town ☕ — crafted with care.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <a
              href="#menu"
              className="px-6 py-3 bg-[#ffd580]/60 text-white rounded-lg hover:bg-yellow-500 transition-colors"
            >
              See Menu
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-[#4b2e15]/60 text-white rounded-lg hover:bg-[#4b2e15]/90 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {heroImages.slice(0, 5).map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`w-3 h-3 rounded-full ${i === (slideIndex % 5) ? 'bg-yellow-600' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
