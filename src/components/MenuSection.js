import React from 'react';
import MenuCard from './MenuCard';
import menuItems from '../data/menuItems';
import '../index.css'; 

const MenuSection = () => {
  return (
    <section
      id="menu"
      className="py-16 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors duration-500"
    >
      <h2
        className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white transition-colors duration-500"
        style={{ fontFamily: 'Kaushan Script, cursive' }}
      >
        Our Menu
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 max-w-6xl mx-auto">
        {menuItems.map((item, i) => (
          <div key={item.id}>
            <MenuCard item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
