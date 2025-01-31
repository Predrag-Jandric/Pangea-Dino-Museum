import { useEffect, useState } from "react";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";
// static data currently being used prior to creation of API
import { dinosaurs } from "../../utils/data.js";
import DinoSearch from "./DinoSearch";

export default function DinoDisplay() {
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDino, setSelectedDino] = useState({});

  useEffect(() => {
    async function getDinos() {
      try {
        //! static data currently being used prior to creation of API, revert when completed
        // const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
        // const data = await res.json();
        setDinos(dinosaurs);
        setFiltered(getRandomDinos(dinosaurs, 10));
      } catch (error) {
        console.error("Error fetching dinos", error);
      }
    }
    getDinos();
  }, []);

  // will get a randomly generated array of {COUNT} dinos, no repeats
  const getRandomDinos = (dinos, count) => {
    const randomIndexes = new Set();
    while (randomIndexes.size < count) {
      randomIndexes.add(Math.floor(Math.random() * dinos.length));
    }
    return [...randomIndexes].map((ind) => dinos[ind]);
  };

  const handleClose = () => {
    setSelectedDino({});
  };

  return (
    <div
      id="dinodex"
      className="relative flex h-dvh flex-col gap-5 overflow-x-hidden bg-dark items-center text-center p-6"
    >
      {selectedDino.name && (
        <>
          <div
            className="absolute inset-0 z-[1000] flex items-center justify-center bg-black/70"
            onClick={handleClose}
          ></div>
          {selectedDino.name && (
            <DinoCard dino={selectedDino} handleClose={handleClose} />
          )}
        </>
      )}
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-20 flex flex-col items-center justify-center gap-7 bg-dark p-6 text-center">
          <h2 className="font-pressStart text-4xl text-primary">DinoDex</h2>
          <p className="max-w-2xl text-light">
            The Ultimate Dinosaur Database Because your inner 6-year-old still
            remembers their favorites.
            <br />
            Refresh page for more random dinos!
          </p>
        </div>
        
        <DinoSearch dinos={dinos} setFiltered={setFiltered} />

        <div className="scrollbar-hidden absolute left-0 mt-10 flex w-full gap-5 overflow-x-scroll scroll-smooth p-20 text-highlight">
          {!filtered.length
            ? "No Dinosaurs :("
            : filtered.map((dino) => (
                <DinoPreview
                  dino={dino}
                  setSelectedDino={setSelectedDino}
                  // revert to dino.id when new API is integreated
                  key={dino.name}
                />
              ))}
        </div>
      </div>
    </div>
  );
}
