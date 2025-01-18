import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { timelineEvents } from "../utils/data";

function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === timelineEvents.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? timelineEvents.length - 1 : prevIndex - 1
    );
  };
  return (
    <div className="flex flex-col items-center py-32 p-8 bg-[#F7F7F7]">
      <div className="flex items-center justify-between w-full max-w-4xl">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full border-2 border-grayOne text-lg  hover:border-primary transition-all hover:text-primary"
        >
          <IoIosArrowBack />
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
                className="relative  py-1 cursor-pointer flex flex-col items-center"
              >
                <span
                  className={`absolute -top-14 p-2 text-center w-23 text-sm font-semibold  ${
                    index === selectedIndex ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {event.title}
                </span>

                <div
                  className={`w-5 h-5 rounded-full ${
                    index <= selectedIndex
                      ? "bg-primary delay-300 border-primary"
                      : "bg-[#F7F7F7] delay-0 border-grayOne hover:bg-primary"
                  } border-2 transform -translate-y-0 transition-colors`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="p-3 rounded-full border-2 border-grayOne text-lg  hover:border-primary transition-all hover:text-primary"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="mt-10 p-6 flex flex-col gap-4 w-full max-w-4xl">
        <h2 className="text-6xl text-gray-800">
          {timelineEvents[selectedIndex].title}
        </h2>
        <p className="italic">- {timelineEvents[selectedIndex].time}</p>
        <p className="mt-4 text-lg text-gray-600">
          {timelineEvents[selectedIndex].description}
        </p>
      </div>
    </div>
  );
}

export default Timeline;
