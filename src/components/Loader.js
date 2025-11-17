// src/components/Loader.js
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white dark:bg-gray-900 z-50">
      
      {/* Coffee cup */}
      <div className="w-16 h-20 relative">
        <div className="w-16 h-16 bg-yellow-500 rounded-b-2xl relative z-10 overflow-hidden flex items-end justify-center">
          {/* Coffee liquid */}
          <div className="w-12 h-2 bg-yellow-700 rounded-full mb-2 animate-bounce"></div>
        </div>
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-3 h-6 bg-gray-300 rounded-full animate-fade-up opacity-70"></div>
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-2 h-6 bg-gray-300 rounded-full animate-fade-up opacity-50 delay-150"></div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-gray-300 rounded-full animate-fade-up opacity-40 delay-300"></div>
      </div>

      {/* Text */}
      <p className="mt-6 text-xl font-semibold text-gray-700 dark:text-gray-200 animate-pulse">Brewing your coffee...</p>
    </div>
  );
};

export default Loader;
