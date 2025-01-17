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
    <div>
      <div>
        <button onClick={handlePrev}>
          <IoIosArrowBack />
        </button>

        <div>
          <div>
            <div
              style={{
                width: `${
                  (selectedIndex / (timelineEvents.length - 1)) * 100
                }%`,
              }}
            ></div>
          </div>

          <div>
            {timelineEvents.map((event, index) => (
              <div key={index} onClick={() => setSelectedIndex(index)}>
                <span>{event.title}</span>

                <div></div>
              </div>
            ))}
          </div>
        </div>

        <button onClick={handleNext}>
          <IoIosArrowForward />
        </button>
      </div>

      <div>
        <h2>{timelineEvents[selectedIndex].title}</h2>
        <p className="italic">- {timelineEvents[selectedIndex].time}</p>
        <p>{timelineEvents[selectedIndex].description}</p>
      </div>
    </div>
  );
}

export default Timeline;
