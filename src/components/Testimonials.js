import React, { useRef, useEffect, useState } from 'react';

const testimonials = [
  { id: 1, name: "Alice", comment: "Best coffee in town!" },
  { id: 2, name: "Bob", comment: "Amazing atmosphere and friendly staff." },
  { id: 3, name: "Charlie", comment: "I love their cappuccino." }
];

const Testimonials = () => {
  const titleRef = useRef(null);
  const itemRefs = useRef([]);
  const [visible, setVisible] = useState({
    title: false,
    items: testimonials.map(() => false)
  });

  useEffect(() => {
    const options = { threshold: 0.2 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          setVisible(prev => {
            if (id === 'title') return { ...prev, title: true };
            const index = parseInt(id.split('-')[1]);
            const itemsCopy = [...prev.items];
            itemsCopy[index] = true;
            return { ...prev, items: itemsCopy };
          });
          observer.unobserve(entry.target);
        }
      });
    }, options);

    if (titleRef.current) {
      titleRef.current.dataset.id = "title";
      observer.observe(titleRef.current);
    }

    itemRefs.current.forEach((el, idx) => {
      if (el) {
        el.dataset.id = `item-${idx}`;
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const baseStyle = {
    opacity: 0,
    transform: "translateY(40px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
    willChange: "opacity, transform"
  };

  return (
    <section id="testimonials" className="py-20 px-4 bg-gray-50 dark:bg-gray-900 text-center transition-colors duration-500">
      <h2
        ref={titleRef}
        style={{
          ...(visible.title ? { opacity: 1, transform: "translateY(0)" } : baseStyle),
          fontFamily: 'Kaushan Script, cursive',
          background: 'linear-gradient(to right, #ffffff, #f3f4f6)', 
          padding: '0.5rem 1rem',
          display: 'inline-block',
          borderRadius: '0.5rem'
        }}
        className="text-4xl font-bold text-black mb-12"
      >
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={t.id}
            ref={(el) => (itemRefs.current[i] = el)}
            style={{
              ...(visible.items[i] ? { opacity: 1, transform: "translateY(0)" } : baseStyle),
              transitionDelay: `${i * 150}ms`
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-lg italic">
              "{t.comment}"
            </p>
            <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t.name}
            </h4>
            <div className="mt-2 h-1 w-16 mx-auto bg-yellow-400 rounded-full"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
