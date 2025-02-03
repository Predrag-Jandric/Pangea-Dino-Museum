import React, { useEffect, useMemo, useState } from "react";

export default function DinoSearch({ dinos, setFiltered }) {
  const [search, setSearch] = useState({ category: "name", query: "" });

  // place selected serach category in state
  const handleSelect = (e) => {
    setSearch({ category: e.target.value, query: "" });
  };

  // handle serach depding on category and query
  const handleSearch = (e) => {
    // format query and set in search object
    const query = e.target.value.toLowerCase().trim();
    setSearch((prev) => ({ ...prev, query }));
  };

  useEffect(() => {
    const filteredDinos = dinos.filter((dino) => {
      // extract search criteria
      const { category, query } = search;
      // if no query, show all dinos
      if (!query) return true;

      // filter declaration depending on category selected
      switch (category) {
        case "name":
          return dino.name.toLowerCase().includes(query);
        case "diet":
          return dino.diet.toLowerCase() === query;
        case "country":
          return dino.foundIn.toLowerCase().includes(query);
        default:
          return true;
      }
    });

    setFiltered(filteredDinos);
  }, [search, dinos, setFiltered]);

  // create a dropdown of Countries where dinos are found, useMemo to save list
  const getCountries = useMemo(() => {
    const countries = new Set();
    dinos.forEach((dino) =>
      dino.foundIn.split(", ").forEach((place) => countries.add(place)),
    );
    return [...countries].sort((a, b) => (a < b ? -1 : 1));
  }, [dinos]);

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
        <option value="country">Country</option>
        <option value="diet">Diet</option>
      </select>

      {/* search based on diet */}
      {search.category === "diet" && (
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
      {search.category === "country" && (
        <select
          onChange={handleSearch}
          className="mr-3 rounded border border-gray-800 p-1"
          defaultValue=""
        >
          <option disabled value="">
            Choose Country
          </option>
          {getCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      )}
      {/* display search input field */}
      {search.category === "name" && (
        <input
          type="text"
          placeholder="search..."
          onChange={handleSearch}
        />
      )}
    </div>
  );
}