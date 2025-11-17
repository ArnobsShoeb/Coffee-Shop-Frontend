import React, { useRef, useEffect, useState } from "react";
import facebook from "../assets/icons/facebook.png";
import instagram from "../assets/icons/instagram.png";
import linkedin from "../assets/icons/linkedin.png";

const Contact = () => {
  const titleRef = useRef(null);
  const addrRef = useRef(null);
  const hoursRef = useRef(null);
  const cardRef = useRef(null);

  const [visible, setVisible] = useState({
    title: false,
    addr: false,
    hours: false,
    card: false,
  });

  useEffect(() => {
    const revealOptions = { threshold: 0.25 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.dataset.id;
        if (entry.isIntersecting) {
          setVisible((prev) => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target);
        }
      });
    }, revealOptions);

    [titleRef, addrRef, hoursRef, cardRef].forEach((ref, i) => {
      if (ref.current) {
        ref.current.dataset.id = ["title", "addr", "hours", "card"][i];
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  const baseStyle = {
    opacity: 0,
    transform: "translateY(40px)",
    transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
    willChange: "opacity, transform",
  };

  return (
    <section id="contact" className="w-full py-20 flex justify-center">
      {/* Contact Card */}
      <div
        ref={cardRef}
        style={
          visible.card ? { opacity: 1, transform: "translateY(0)" } : baseStyle
        }
        className="
          max-w-[1100px] w-full
          p-[20px] pb-[25px]
          rounded-[75px_0_75px_0]

          border-solid border-l-[8px] border-b-[8px]
          border-l-black border-b-black
          dark:border-l-[rgba(255,255,255,0.8)] dark:border-b-[rgba(255,255,255,0.8)]

          bg-gradient-to-br from-[#fff9f3] to-[#f8eedd]
          dark:from-[rgba(255,255,255,0)] dark:to-[rgba(255,255,255,0.18)]

          transition-colors duration-500 shadow-lg
        "
      >
        {/* Flex Layout: Left Text | Right Map */}
        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* LEFT SECTION */}
          <div className="flex-1 text-left pl-4 md:pl-[100px]">
            <h2
              ref={titleRef}
              style={{
                ...(visible.title
                  ? { opacity: 1, transform: "translateY(0)" }
                  : baseStyle),
                fontFamily: "Kaushan Script, cursive",
              }}
              className="text-3xl font-bold mb-6 text-black dark:text-white"
            >
              Contact Us
            </h2>

            <p
              ref={addrRef}
              style={{
                ...(visible.addr
                  ? { opacity: 1, transform: "translateY(0)" }
                  : baseStyle),
                transitionDelay: "120ms",
              }}
              className="mb-4 text-gray-700 dark:text-gray-300"
            >
              123 Coffee Road, Dhaka, Bangladesh
            </p>

            <p
              ref={hoursRef}
              style={{
                ...(visible.hours
                  ? { opacity: 1, transform: "translateY(0)" }
                  : baseStyle),
                transitionDelay: "240ms",
              }}
              className="mb-6 text-gray-700 dark:text-gray-300"
            >
              Mon-Sat: 8am - 8pm
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-2">
              📞 +1 234 567 890
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              ✉️ contact@coffeehouse.com
            </p>

            {/* Socials */}
            <div className="flex gap-6 mt-6">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={facebook}
                  alt="Facebook"
                  className="w-8 h-8 filter grayscale hover:grayscale-0"
                />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={instagram}
                  alt="Instagram"
                  className="w-8 h-8 filter grayscale hover:grayscale-0"
                />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={linkedin}
                  alt="LinkedIn"
                  className="w-8 h-8 filter grayscale hover:grayscale-0"
                />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE MAP */}
          <div className="flex-1 w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29214.625451635493!2d90.38816593210328!3d23.753505734740205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b861c4f04387%3A0x9d1aced2f253fa1d!2sBangladesh%20Thalassemia%20Foundation%20Blood%20Bank!5e0!3m2!1sen!2sbd!4v1763401448500!5m2!1sen!2sbd"
              title="map"
              frameBorder="0"
              allowFullScreen
              className="w-full h-56 rounded-xl shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
