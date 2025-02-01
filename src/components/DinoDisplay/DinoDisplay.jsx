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
        const res = await fetch("https://api-example-wg44.onrender.com");
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

  return (
    <div>
      <div className="m-auto mb-10 max-w-[1000px] pl-10">
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
        <DinoSearch dinos={dinos} setFiltered={setFiltered} />
      </div>

      {loading ? (
        <div className="flex h-96 w-full items-center justify-center text-2xl">
          Fetching data...
        </div>
      ) : (
        <div className="scrollbar-hidden flex h-full gap-5 overflow-x-scroll scroll-smooth p-10">
          {!filtered.length
            ? "No Dinosaurs :("
            : filtered.map((dino) => (
                <DinoPreview
                  dino={dino}
                  setSelectedDino={setSelectedDino}
                  key={dino._id}
                />
              ))}
        </div>
      )}
      {selectedDino.name && (
        <DinoCard dino={selectedDino} setSelectedDino={setSelectedDino} />
      )}
    </div>
  );
}

export default DinoDisplay;
