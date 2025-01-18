import React, { useEffect, useState } from 'react'
import DinoCard from './dinoCard';

export default function DinoDisplay() {
  const [dinos, setDinos] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    async function getDinos() {
      const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
      const data = await res.json();
      setDinos(data.slice(0, 10));
    }
    getDinos();
  }, []);

  return (
    <div className="flex gap-5 bg-gray-500">
    <div
      className={` ${selected.name ? "flex flex-col" : "grid grid-cols-3"}`}
    >
      {!dinos ? "Loading..." : dinos.map((dino) => (
        <DinoCard dino={dino} />
      ))}
    </div>
    </div>
  )
}
