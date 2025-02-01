import { useState } from "react";

export default function DinoSearch({ dinos, setFiltered }) {
  const [search, setSearch] = useState("name");
  const [inputValue, setInputValue] = useState("");

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

  // handle search depending on criteria
  const handleSearch = (category, query) => {
    let filteredDinos = [];

    switch (category) {
      case "name": {
        const regex = new RegExp(query.split("").join(".*"), "i");
        filteredDinos = dinos.filter((dino) => regex.test(dino.name));
        break;
      }
      case "diet":
        filteredDinos = dinos.filter((dino) => dino.diet === query);
        break;
      case "country":
        filteredDinos = dinos.filter((dino) => dino.foundIn.includes(query));
        break;
      default:
        filteredDinos = dinos;
    }

    setFiltered(filteredDinos); 
  };

  return (
    <div className="mt-10">
      {/* category selection dropdown */}
      <select
        className="mr-3 rounded border border-gray-800 p-1"
        onChange={handleSelect}
        name="category"
        id="category"
        value={search}
      >
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="diet">Diet</option>
      </select>

      {/* search based on diet */}
      {search === "diet" && (
        <select
          className="mr-3 rounded border border-gray-800 p-1"
          onChange={(e) => handleSearch(search, e.target.value)}
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
          onChange={(e) => handleSearch(search, e.target.value)}
          className="mr-3 rounded border border-gray-800 p-1"
          defaultValue=""
        >
          <option disabled value="">
            Choose Country
          </option>
          {getCountries().map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      )}
      {/* display search input field */}
      {search === "name" && (
        <input
          type="text"
          value={inputValue}
          placeholder="search..."
          className="rounded border border-gray-800 p-1"
          onChange={(e) => {
            setInputValue(e.target.value);
            handleSearch(search, e.target.value);
          }}
        />
      )}
    </div>
  );
}
