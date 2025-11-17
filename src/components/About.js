import React, { useRef, useEffect, useState } from 'react';
import '../index.css'; 

const About = () => {
  const headingRef = useRef(null);
  const paraRef = useRef(null);
  const [headingClass, setHeadingClass] = useState('');
  const [paraClass, setParaClass] = useState('');

  // track scroll direction
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);
  const scrollingDown = useRef(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      scrollingDown.current = y > lastY.current;
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const obsOptions = { threshold: 0.2 };

    const observeEl = (el, origDir, setClass) => {
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const down = scrollingDown.current;
            if (origDir === 'left') setClass(down ? 'animate-fade-left' : 'animate-fade-right');
            else if (origDir === 'right') setClass(down ? 'animate-fade-right' : 'animate-fade-left');
            else setClass(down ? 'animate-fade-up' : 'animate-fade-down');
          } else {
            setClass('');
          }
        });
      }, obsOptions);
      obs.observe(el);
      return () => obs.disconnect();
    };

    const cleanups = [];
    cleanups.push(observeEl(headingRef.current, 'left', setHeadingClass));
    cleanups.push(observeEl(paraRef.current, 'right', setParaClass));

    return () => cleanups.forEach(fn => fn && fn());
  }, []);

  return (
    <section
  id="about" // <-- ADD THIS
  className="w-full py-16 px-4 bg-yellow-100 dark:bg-gray-900 text-center transition-colors duration-500"
>
  <div className="max-w-4xl mx-auto">
    <h2
      ref={headingRef}
      className={`text-4xl md:text-5xl font-bold mb-6 ${headingClass} bg-clip-text text-transparent`}
      style={{
        fontFamily: 'Kaushan Script, cursive',
        backgroundImage: 'linear-gradient(to right, #facc15, #fcd34d)',
      }}
    >
      About Us
    </h2>

    <p ref={paraRef} className={`text-gray-700 dark:text-gray-300 ${paraClass}`}>
      CoffeeHouse is a family-owned coffee shop serving the finest coffee and pastries since 2005.
      We are passionate about quality, community, and creating a cozy place for coffee lovers.
    </p>
  </div>
</section>

  );
};

export default About;
