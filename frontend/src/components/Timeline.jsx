import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { timelineEvents } from "../utils/data";
import Title from "./Title";
import { motion } from "framer-motion";
import { defaultAnimation } from "../utils/animations";

function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    if (selectedIndex < timelineEvents.length - 1) {
      setSelectedIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <motion.div
      variants={defaultAnimation}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      id="timeline"
      className="py-16 px-6 flex flex-col items-center bg-bgcolor"
    >
      <Title title="Ancient Timeline" className="mb-12" />
      <div className="flex items-center justify-between w-full max-w-4xl">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className="p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all disabled:border-grayOne disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-grayOne"
        >
          <IoIosArrowBack className="size-5 font-extrabold" />
        </button>

        <div className="relative flex-1 mx-4">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-grayOne transform -translate-y-1/2">
            <div
              className="h-1 bg-primary transition-all duration-500"
              style={{
                width: `${
                  (selectedIndex / (timelineEvents.length - 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center relative z-10">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className="relative py-1 cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`absolute hover:-top-[4.2rem] transition-all -top-16 p-2 text-center w-23 sm:text-sm text-[0.75rem] ${
                    index === selectedIndex ? "text-primary" : "text-dark"
                  }`}
                >
                  {event.title}
                </span>

                <div
                  className={`w-5 h-5 rounded-full ${
                    index <= selectedIndex
                      ? "bg-primary delay-300 border-primary"
                      : "bg-bgcolor delay-0 border-grayOne hover:bg-primary"
                  } border-2 transform -translate-y-0 transition-colors`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIndex === timelineEvents.length - 1}
          className="p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all disabled:border-grayOne disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-grayOne"
        >
          <IoIosArrowForward className="size-5 font-extrabold" />
        </button>
      </div>

      <div className=" text-dark flex pt-10 flex-col gap-4 w-full max-w-4xl">
        <h2 className="text-4xl text-dark/85 font-thin tracking-wide font-titles">
          {timelineEvents[selectedIndex].title}
        </h2>
        <p className="italic text-dark/50 textsize">
          - {timelineEvents[selectedIndex].time}
        </p>
        <p className="mt-4 text-textsize text-lg">
          {timelineEvents[selectedIndex].description}
        </p>
      </div>
    </motion.div>
  );
}

export default Timeline;
