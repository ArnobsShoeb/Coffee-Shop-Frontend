import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import imageUrls from '../data/imageUrls';

const MenuCard = ({ item, index = 0 }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.favorites.items || []);
  const isFavorite = favorites.some(fav => fav.id === item.id);

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // fade-in stagger
  const cols = 4;
  const delay = `${(index % cols) * 120}ms`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleFavorite = () => {
    isFavorite
      ? dispatch(removeFavorite({ id: item.id }))
      : dispatch(addFavorite(item));
  };

  return (
    <div
      ref={ref}
      className={`rounded-lg shadow-md p-4 flex flex-col items-center text-center h-[420px] bg-white dark:bg-gray-700 transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(40px)",
        transition: `opacity 0.7s ease-out ${delay}, transform 0.7s ease-out ${delay}`,
        willChange: "transform, opacity",
        backgroundColor: isHovered ? "#b45309" : undefined,
        boxShadow: isHovered
          ? "0px 18px 32px rgba(0,0,0,0.18)"
          : "0px 4px 12px rgba(0,0,0,0.08)"
      }}
    >
      <div
        className={`w-full bg-gray-200 rounded-md overflow-hidden transition-all duration-300 mb-4`}
        style={{ height: isHovered ? "18rem" : "18rem" }}
      >
        {imageUrls[item.id] ? (
          <img
            src={imageUrls[item.id]}
            alt={item.name}
            className="w-full h-full object-cover"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 1s ease-out",
              willChange: "opacity"
            }}
          />
        ) : (
          <span className="text-gray-500">{item.name}</span>
        )}
      </div>

      <h3 className={`font-semibold mb-2 transition-all duration-300 ${isHovered ? 'text-xl' : 'text-lg'}`}>
        {item.name}
      </h3>

      <p className={`transition-all duration-300 ${isHovered ? 'text-lg font-semibold' : ''}`}>
        {item.price}
      </p>

      <button
        onClick={handleFavorite}
        className={`transition-all duration-300 ${isHovered ? 'text-3xl text-white' : 'text-2xl'} ${!isHovered ? (isFavorite ? 'text-red-500' : 'text-gray-400') : ''}`}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
};

export default MenuCard;
