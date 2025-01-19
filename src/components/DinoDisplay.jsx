import React, { useEffect, useState } from "react";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";
// static data currently being used prior to creation of API
import data from "../data.json"

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
    <div className="relative flex h-dvh flex-col gap-5 overflow-x-hidden bg-gray-100 pt-10">
      {selectedDino.name && (
        <div className="absolute inset-0 bg-black/70"></div>
      )}
      <div className="mb-10 pl-10">
        <h2 className="mb-3 text-4xl">DinoDex</h2>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          officiis cum odio dolorum error ullam fuga eos. Mollitia, aspernatur?
          Quam corrupti officia fugiat modi doloribus alias, aut quasi maxime
          voluptatum iste. Autem non quisquam unde, quos minus maiores, officia
          ducimus accusamus repellendus, exercitationem totam neque alias
          quaerat commodi dolorem facere?
        </div>
        <div className="mt-5">Refresh page for more random dinos!</div>
      </div>
      <div className="scrollbar-hidden flex h-full gap-5 overflow-x-scroll scroll-smooth pt-10">
        {!filtered.length
          ? "Loading..."
          : filtered.map((dino) => (
              <DinoPreview
                dino={dino}
                setSelectedDino={setSelectedDino}
                // revert to dino.id when new API is integreated
                key={dino.name}
              />
            ))}
      </div>
      {selectedDino.name && (
        <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino} />
      )}
    </div>
  );
}
