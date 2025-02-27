import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { landingPageBGimageSlider } from "../utils/data";
import Button from "../utils/Button";

function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % landingPageBGimageSlider.length
      );
    }, 4000);

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
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-bgcolor">
        <h1 className="font-titles mb-4 mx-3 text-xl md:text-4xl font-bold text-center">
          When you grow up, people dont ask you what your favorite dinosaur is.
          <div>We do.</div>
        </h1>
        <p className="mb-6 mx-5 md:mx-20 text-textsize text-center">
          At DiNostalgia, we care about your inner-dino-loving child! Explore
          our site to remember your favorite herbivores, where and when they
          roamed the earth before smartphones took over. Test your
          dino-knowledge and reward yourself with all the dino merch you wanted
          when growing up.
        </p>
        <Button
          className=""
          onClick={() =>
            document
              .getElementById("quiz")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

export default LandingPage;