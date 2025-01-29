import { useState } from "react";

export default function DinoSearch({ dinos, setFiltered }) {
  const [search, setSearch] = useState("name");

  // place selected search category in state
  const handleSelect = (e) => {
    setSearch(e.target.value);
  };

  // create a dropdown of Countries where dinos are found
  const getCountries = () => {
    const countries = new Set();
    dinos.forEach((dino) =>
      dino.foundIn.split(", ").forEach((place) => countries.add(place)),
    );
    return [...countries].sort((a, b) => (a < b ? -1 : 1));
  };

  // handle serach depding on criteria
  // ! refactor to search via category and query as object (switch statement)
  const handleSearch = (e) => {
    let filteredDinos;
    if (search === "name") {
      filteredDinos = dinos.filter((dino) =>
        dino.name.toLowerCase().startsWith(e.target.value.toLowerCase()),
      );
    }
    if (search === "weight") {
      filteredDinos = dinos.filter((dino) => dino.weight === +e.target.value);
    }
    if (search === "length") {
      filteredDinos = dinos.filter((dino) => dino.length === +e.target.value);
    }
    if (search === "diet") {
      filteredDinos = dinos.filter((dino) => dino.diet === e.target.value);
    }
    if (search === "country") {
      filteredDinos = dinos.filter((dino) =>
        dino.foundIn.includes(e.target.value),
      );
    }
    setFiltered(filteredDinos);
  };

  return (
    <div className="mt-10">
      {/* Category selection dropdown */}
      <select
        className="mr-3 rounded border border-gray-800 p-1"
        onChange={handleSelect}
        name="category"
        id="category"
      >
        <option value="name">Name</option>
        <option value="weight">Weight (kg)</option>
        <option value="length">Length (m)</option>
        <option value="country">Country</option>
        <option value="diet">Diet</option>
      </select>
      
      {/* search based on diet */}
      {search === "diet" && (
        <select
          className="mr-3 rounded border border-gray-800 p-1"
          onChange={handleSearch}
          defaultValue=""
        >
          <option disabled value="">
            Choose Diet Type
          </option>
          <option name="carnivorous" value="carnivorous" id="carnivorous">
            Carnivorous
          </option>
          <option name="herbivorous" value="herbivorous" id="herbivorous">
            Herbivorous
          </option>
        </select>
      )}

      {/* search based on country */}
      {search === "country" && (
        <select
          onChange={handleSearch}
          className="mr-3 rounded border border-gray-800 p-1"
          defaultValue=""
        >
          <option disabled value="">Choose Country</option>
          {getCountries().map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      )}
      {/* display search input field */}
      {search !== "diet" && search !== "country" && (
        <input
          type="text"
          placeholder="search..."
          className="rounded border border-gray-800 p-1"
          onChange={handleSearch}
        />
      )}
    </div>
  );
}
