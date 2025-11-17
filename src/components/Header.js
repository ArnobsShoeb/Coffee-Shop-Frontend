import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/themeSlice";

const Header = () => {
  const favCount = useSelector((state) => state.favorites?.items?.length || 0);
  const theme = useSelector((state) => state.theme?.mode || "light");
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = ["menu", "about", "testimonials", "contact"];

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-500">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div
          className="text-2xl font-bold"
          style={{
            background: "linear-gradient(to right, #facc15, #f97316, #ef4444)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          CoffeeHouse
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="relative px-3 py-1 text-gray-900 dark:text-white transition-colors duration-300
                         hover:text-orange-500 dark:hover:text-orange-500
                         before:absolute before:top-0 before:left-1/2 before:w-0 before:h-0.5
                         before:bg-black dark:before:bg-white
                         before:-translate-x-1/2 before:transition-all before:duration-300
                         hover:before:w-full"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </nav>

        
        <div className="flex items-center gap-4">
          
          <div className="px-3 py-1 rounded-lg text-white font-semibold
                bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400
                dark:from-blue-900  dark:to-blue-700">
  Favorites ❤️ {favCount}
</div>



          {/* Theme Toggle */}
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`relative w-14 h-7 rounded-full transition-colors duration-300 flex items-center p-1 ${
              theme === "dark" ? "bg-blue-600" : "bg-gray-400"
            }`}
          >
            <span
              className={`absolute w-5 h-5 rounded-full flex items-center justify-center text-sm transition-transform duration-300 ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              }`}
            >
              {theme === "dark" ? "🌙" : "🌞"}
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white dark:bg-gray-900 shadow-md transition-colors duration-500 flex flex-col">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link}`}
              className="relative px-3 py-2 text-gray-900 dark:text-white transition-colors duration-300
                         hover:text-orange-500 dark:hover:text-orange-500
                         before:absolute before:top-0 before:left-1/2 before:w-0 before:h-0.5
                         before:bg-black dark:before:bg-white
                         before:-translate-x-1/2 before:transition-all before:duration-300
                         hover:before:w-full"
            >
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
