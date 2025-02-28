import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { landingPageBGimageSlider } from "../utils/data";
import { SlArrowDown } from "react-icons/sl";
import useScrollTo from "../utils/useScrollTo";

function LandingPage() {
  const scrollToSection = useScrollTo(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % landingPageBGimageSlider.length
      );
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-dark">
      <Navbar />

      {/* image slider  */}
      <section className="absolute left-0 top-0 h-full w-full z-0">
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
      <div className="relative md:w-[80%] w-full mx-auto z-10 flex flex-col items-center justify-center h-full text-bgcolor">
        <h1 className="xl:text-6xl font-titles tracking-wide text-4xl leading-[3rem] md:leading-[4rem] mx-6 xl:leading-[5rem] [word-spacing:8px] md:text-5xl text-center">
          Step Into Pangea, Prehistoric World Where Dinosaurs Roam Again!
        </h1>
        <p className="text-lg my-8 text-center mx-6">
          Discover the ancient giants, challenge your knowledge, and bring the
          Jurassic era to life with exclusive collectibles!
        </p>
        <a
          href="#timeline"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("timeline");
          }}
          className="scroll-smooth"
        >
          <SlArrowDown className="transition hover:text-primary size-10 animate-bounce" />
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
