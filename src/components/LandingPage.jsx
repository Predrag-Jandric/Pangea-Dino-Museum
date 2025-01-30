import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { landingPageBGimageSlider } from "../utils/data";

function LandingPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(
        (prevIndex) => (prevIndex + 1) % landingPageBGimageSlider.length,
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#15014f]">
      <Navbar />

      {/* image slider  */}
       <div className="absolute left-0 top-0 h-full w-full ">
        {/* {landingPageBGimageSlider.map((image, index) => (
          <div
            key={index}
            className={`absolute left-0 top-0 h-full w-full bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}  */}

        {/* dark tint overlay */}
        {/* <div className="absolute left-0 top-0 h-full w-full bg-black bg-opacity-50"></div> */}

        {/* centered text & btn */}
        <div className="w-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-white">
          <h1 className="mb-4 text-4xl font-bold font-pressStart leading-relaxed text-teal">
            When you grow up, people don't ask you what your favorite dinosaur
            is. <div>We do.</div>
          </h1>
          <p className="mb-6 mx-20 text-lg text-cream">
            At DiNostalgia, we care about your inner-dino-loving child! Explore
            our site to remember your favorite herbivores, where and when they
            roamed the earth before smart phones took over. Test your
            dino-knowledge and reward yourself with all the dino merch you
            wanted when growing
          </p>
          <button className="hover:bg-purple rounded-md bg-pink px-8 py-3 font-semibold transition">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
