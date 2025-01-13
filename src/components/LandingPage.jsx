import { useEffect, useState } from "react";
import Navbar from "./navbar/Navbar";
import { landingPageBGimageSlider } from "../utils/data";

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
    <div className="relative h-screen w-full overflow-hidden">
      <Navbar />

      {/* image slider  */}
      <div className="absolute top-0 left-0 w-full h-full">
        {landingPageBGimageSlider.map((image, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}

        {/* dark tint overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>

        {/* centered text & btn */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Welcome to Dino World</h1>
          <p className="text-xl mb-6">Explore the land of friendly dinosaurs</p>
          <button className="px-8 py-3 bg-primary font-semibold rounded-md hover:bg-primary-dark transition">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
