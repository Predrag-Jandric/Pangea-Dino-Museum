import { useState } from "react";

function EcommerceSearch({ dinos, setFiltered }) {
  const [search, setSearch] = useState("name");

  // place selected search category in state
  const handleSelect = (e) => {
    setSearch(e.target.value);
    handleSearch(e.target.value, ""); // Reset the search results when changing category
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
      case "name":
        filteredDinos = dinos.filter((dino) =>
          dino.name.toLowerCase().startsWith(query.toLowerCase()),
        );
        break;
      case "diet":
        filteredDinos = dinos.filter((dino) => dino.diet === query);
        break;
      case "country":
        filteredDinos = dinos.filter((dino) =>
          dino.foundIn.includes(query),
        );
        break;
      case "inStockAsc":
        filteredDinos = [...dinos].sort((a, b) => a.inStock - b.inStock);
        break;
      case "inStockDesc":
        filteredDinos = [...dinos].sort((a, b) => b.inStock - a.inStock);
        break;
      default:
        filteredDinos = dinos;
    }

    setFiltered(filteredDinos); // Update the filtered state
  };

  return (
    <div className="mt-10">
      {/* Category selection dropdown */}
      <select
        className="mr-3 rounded border border-gray-800 p-1"
        onChange={(e) => handleSelect(e)}
        name="category"
        id="category"
      >
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="diet">Diet</option>
        <option value="inStockAsc">In Stock (Ascending)</option>
        <option value="inStockDesc">In Stock (Descending)</option>
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
      {search !== "diet" && search !== "country" && search !== "inStockAsc" && search !== "inStockDesc" && (
        <input
          type="text"
          placeholder="search..."
          className="rounded border border-gray-800 p-1"
          onChange={(e) => handleSearch(search, e.target.value)}
        />
      )}
    </div>
  );
}

export default EcommerceSearch;
