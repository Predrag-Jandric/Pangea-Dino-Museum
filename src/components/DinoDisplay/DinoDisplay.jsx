import { useEffect, useState } from "react";
import DinoSearch from "./DinoSearch";
import DinoPreview from "./DinoPreview";
import DinoCard from "./DinoCard";

function DinoDisplay() {
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedDino, setSelectedDino] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    async function getDinos() {
      try {
        //! Peter's deployed API
        // const res = await fetch("https://api-example-wg44.onrender.com");
        // if (!res.ok) {
        //   throw new Error(`HTTP error! status: ${res.status}`);
        // }
        //! my local API
        const res = await fetch("https://dinostalgia-backend.vercel.app/api/dinosaurs");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setDinos(data);
        setFiltered(data);
      } catch (error) {
        console.error("Error fetching dinos", error);
      } finally {
        setLoading(false);
      }
    }
    getDinos();
  }, []);

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
        <div className="flex flex-col items-center justify-center gap-7 bg-dark p-6 text-center">
          <h2 className="font-pressStart text-4xl text-primary">DinoDex</h2>
          <p className="max-w-2xl text-light">
            The Ultimate Dinosaur Database Because your inner 6-year-old still
            remembers their favorites.
            <br />
            Refresh page for more random dinos!
          </p>
        </div>
        
        <DinoSearch dinos={dinos} setFiltered={setFiltered} />

      {loading ? (
        <div className="flex h-96 w-full items-center justify-center text-2xl">
          Fetching data...
        </div>
      ) : (
        <div className="scrollbar-hidden absolute left-0 flex w-full gap-5 overflow-x-scroll scroll-smooth p-20 pt-5 text-highlight">
          {!filtered.length
            ? "No Dinosaurs :("
            : filtered.map((dino) => (
                <DinoPreview
                  dino={dino}
                  setSelectedDino={setSelectedDino}
                  key={dino.id}
                />
              ))}
        </div>
        
      )}
      </div>
      {selectedDino.name && (
        <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino} />
      )}
    </div>
)
}

export default DinoDisplay;
