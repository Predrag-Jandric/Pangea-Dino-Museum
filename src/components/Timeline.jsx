import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { timelineEvents } from "../utils/data";

function Timeline() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleNext = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === timelineEvents.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? timelineEvents.length - 1 : prevIndex - 1,
    );
  };
  return (
    <div
      id="timeline"
      className="flex flex-col items-center bg-dark p-8 h-vh"
    >
      <div className="mb-20 p-6 flex gap-7 flex-col items-center justify-center text-center bg-dark">
        <h2 className="font-pressStart text-4xl text-primary">
          Timeline 
          <p className="text-base md:text-xl">A Trip Through Prehistory</p>
        </h2>
        
        <p className="max-w-2xl text-light">
          Because the Jurassic period was just one stop in this 180-million-year
          road trip.
        </p>
      </div>
      <div className="flex w-full max-w-4xl items-center justify-between">
        <button
          onClick={handlePrev}
          className="rounded-full border-2 border-secondary text-secondary p-3 text-lg transition-all hover:border-highlight hover:text-highlight"
        >
          <IoIosArrowBack />
        </button>

        <div className="relative mx-4 flex-1">
          <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 transform bg-secondary">
            <div
              className="h-1 bg-highlight transition-all duration-500"
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
                  className={`w-23 absolute -top-14 p-2 text-center text-xs md:text-sm font-semibold ${
                    index === selectedIndex ? "text-highlight" : "text-secondary"
                  }`}
                >
                  {event.title}
                </span>

                <div
                  className={`h-5 w-5 rounded-full ${
                    index <= selectedIndex
                      ? "border-highlight bg-highlight delay-300"
                      : "border-secondary bg-light delay-0 hover:bg-primary"
                  } -translate-y-0 transform border-2 transition-colors`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="rounded-full border-2 border-secondary text-secondary p-3 text-lg transition-all hover:border-highlight hover:text-highlight"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="mt-10 flex w-full max-w-4xl flex-col gap-2 p-6">
        <h2 className="text-lg md:text-4xl text-highlight font-pressStart">
          {timelineEvents[selectedIndex].title}
        </h2>
        <p className="italic text-secondary">- {timelineEvents[selectedIndex].time}</p>
        <p className="mt-4 md:text-lg text-light">
          {timelineEvents[selectedIndex].description}
        </p>
      </div>
    </div>
  );
}

export default Timeline;
