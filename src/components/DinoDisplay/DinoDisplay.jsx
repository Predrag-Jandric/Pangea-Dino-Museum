import React, { useEffect, useState } from "react";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";
// static data currently being used prior to creation of API
import data from "../../data.json";
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
        setDinos(data);
        setFiltered(getRandomDinos(data, 10));
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

  return (
    <div
      id="dinodex"
      className="relative flex h-dvh flex-col gap-5 overflow-x-hidden bg-gray-100 px-20 py-10"
    >
      {selectedDino.name && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
          {selectedDino.name && (
            <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino} />
          )}
        </div>
      )}
      <div className="mx-auto max-w-[1000px]">
        <h2 className="mb-3 text-4xl">DinoDex</h2>
        <div className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          officiis cum odio dolorum error ullam fuga eos. Mollitia, aspernatur?
          Quam corrupti officia fugiat modi doloribus alias, aut quasi maxime
          voluptatum iste. Autem non quisquam unde, quos minus maiores, officia
          ducimus accusamus repellendus, exercitationem totam neque alias
          quaerat commodi dolorem facere?
        </div>
        <div className="mt-5">Refresh page for more random dinos!</div>
        <DinoSearch dinos={dinos} setFiltered={setFiltered} />

        <div className="scrollbar-hidden absolute left-0 mt-10 flex w-full gap-5 overflow-x-scroll scroll-smooth p-20">
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
