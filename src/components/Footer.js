import React from 'react';

const Footer = () => {
  return (
    <footer
      className="w-full py-3 text-center text-sm text-gray-900 dark:text-gray-200
                 bg-[#ffefd5] dark:bg-black"
    >
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} CoffeeHouse. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
