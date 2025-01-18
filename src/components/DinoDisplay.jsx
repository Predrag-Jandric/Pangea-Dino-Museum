import React, { useEffect, useState } from "react";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";

export default function DinoDisplay() {
  const [dinos, setDinos] = useState([]);
  const [selectedDino, setSelectedDino] = useState({});

  useEffect(() => {
    async function getDinos() {
      const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
      const data = await res.json();
      setDinos(data.slice(0, 10));
    }
    getDinos();
  }, []);

  return (
    <div className="flex gap-5 bg-gray-100 items-center justify-center h-dvh">
      {selectedDino.name && <div className="absolute inset-0 bg-black/70"></div>}
      <div
        className="flex flex-wrap"
      >
        {!dinos ? "Loading..." : dinos.map((dino) => <DinoPreview dino={dino} setSelectedDino={setSelectedDino} key={dino.id}/>)}
      </div>
      {selectedDino.name && <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino}/>}
    </div>
  );
}
