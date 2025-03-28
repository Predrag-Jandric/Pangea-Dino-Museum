import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { landingPageBGimageSlider } from "../utils/data";
import { SlArrowDown } from "react-icons/sl";
import { motion } from "framer-motion";
import { heroAnimation } from "../utils/animations";

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % landingPageBGimageSlider.length,
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      const topPosition = element.offsetTop - 70;
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, null, `#${href}`);
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-dark">
      <Navbar />

      {/* image slider  */}
      <section className="absolute left-0 top-0 z-0 h-full w-full">
        {landingPageBGimageSlider.map((image, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        {/* dark tint overlay */}
        <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50"></div>
      </section>

      {/* centered text & btn */}
      <motion.div
        variants={heroAnimation}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="relative z-10 mx-auto mt-36 flex h-full w-full flex-col items-center justify-start text-bgcolor md:w-[80%]"
      >
        <h1 className="mx-6 text-center font-titles text-4xl leading-[3rem] tracking-wide [word-spacing:8px] md:text-5xl md:leading-[4rem] xl:text-6xl xl:leading-[5rem]">
          Step Into Pangea, Prehistoric World Where Dinosaurs Roam Again!
        </h1>
        <p className="mx-6 my-8 text-center text-lg">
          Discover the ancient giants, challenge your knowledge, and bring the
          Jurassic era to life with exclusive collectibles!
        </p>
        <a
          href="#timeline"
          rel="noopener noreferrer"
          onClick={(e) => handleNavClick(e, "timeline")}
          className="scroll-smooth"
        >
          <SlArrowDown className="size-10 animate-bounce transition hover:text-primary" />
        </a>
      </motion.div>
    </div>
  );
}

export default Hero;
