import React, { useEffect, useState } from "react";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";

export default function DinoDisplay() {
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDino, setSelectedDino] = useState({});

  useEffect(() => {
    async function getDinos() {
      try {
        const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
        const data = await res.json();
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
    <div className="flex gap-5 bg-gray-100 items-center justify-center h-dvh relative overflow-x-hidden">
      {selectedDino.name && (
        <div className="absolute inset-0 bg-black/70"></div>
      )}
      <div className="flex items-center gap-5 h-full flex-1 overflow-x-scroll scroll-smooth scrollbar-hidden">
        {!dinos
          ? "Loading..."
          : filtered.map((dino) => (
              <DinoPreview
                dino={dino}
                setSelectedDino={setSelectedDino}
                key={dino.id}
              />
            ))}
      </div>
      {selectedDino.name && (
        <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino} />
      )}
    </div>
  );
}
