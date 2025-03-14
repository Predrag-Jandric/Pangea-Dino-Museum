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
      className="flex flex-col items-center bg-bgcolor px-6 py-16"
    >
      <Title title="Ancient Timeline" className="mb-12" />
      <div className="flex w-full max-w-4xl items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={selectedIndex === 0}
          className="rounded-custom border-2 border-primary/60 p-3 text-lg text-primary transition-all hover:bg-primary/5 disabled:cursor-not-allowed disabled:border-grayOne disabled:text-grayOne disabled:hover:bg-transparent"
        >
          <IoIosArrowBack className="size-5 font-extrabold" />
        </button>

        <div className="relative mx-4 flex-1">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 transform bg-grayOne">
            <div
              className="h-1 bg-primary transition-all duration-500"
              style={{
                width: `${
                  (selectedIndex / (timelineEvents.length - 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className="relative flex cursor-pointer flex-col items-center py-1"
              >
                <span
                  className={`w-23 absolute -top-16 p-2 text-center text-[0.75rem] transition-all hover:-top-[4.2rem] sm:text-sm ${
                    index === selectedIndex ? "text-primary" : "text-dark"
                  }`}
                >
                  {event.title}
                </span>

                <div
                  className={`h-5 w-5 rounded-full ${
                    index <= selectedIndex
                      ? "border-primary bg-primary delay-300"
                      : "border-grayOne bg-bgcolor delay-0 hover:bg-primary"
                  } -translate-y-0 transform border-2 transition-colors`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          disabled={selectedIndex === timelineEvents.length - 1}
          className="rounded-custom border-2 border-primary/60 p-3 text-lg text-primary transition-all hover:bg-primary/5 disabled:cursor-not-allowed disabled:border-grayOne disabled:text-grayOne disabled:hover:bg-transparent"
        >
          <IoIosArrowForward className="size-5 font-extrabold" />
        </button>
      </div>

      <div className="flex w-full max-w-4xl flex-col gap-4 pt-10 text-dark">
        <h2 className="font-titles text-4xl font-thin tracking-wide text-dark/85">
          {timelineEvents[selectedIndex].title}
        </h2>
        <p className="textsize italic text-dark/50">
          - {timelineEvents[selectedIndex].time}
        </p>
        <p className="mt-4 text-lg text-textsize">
          {timelineEvents[selectedIndex].description}
        </p>
      </div>
    </motion.div>
  );
}

export default Timeline;
