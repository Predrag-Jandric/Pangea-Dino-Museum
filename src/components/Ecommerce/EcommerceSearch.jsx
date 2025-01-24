import { useState } from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function EcommerceSearch({ dinos, setFiltered }) {
  // needed for the shopping cart number display
  const cart = useSelector((state) => state.shopping.inCart);

  const [search, setSearch] = useState("name");
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  // place selected search category in state
  const handleSelect = (e) => {
    setSearch(e.target.value);
    setIsFilterApplied(false); // Reset filter applied state when changing category
    if (
      e.target.value !== "diet" &&
      e.target.value !== "stock" &&
      e.target.value !== "price" &&
      e.target.value !== "country"
    ) {
      handleSearch(e.target.value, ""); // Reset the search results when changing category
    }
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
        filteredDinos = dinos.filter((dino) => dino.foundIn.includes(query));
        break;
      case "inStockAsc":
        filteredDinos = [...dinos].sort((a, b) => a.inStock - b.inStock);
        break;
      case "inStockDesc":
        filteredDinos = [...dinos].sort((a, b) => b.inStock - a.inStock);
        break;
      case "priceAsc":
        filteredDinos = [...dinos].sort((a, b) => a.price - b.price);
        break;
      case "priceDesc":
        filteredDinos = [...dinos].sort((a, b) => b.price - a.price);
        break;
      default:
        filteredDinos = dinos;
    }

    setFiltered(filteredDinos); // Update the filtered state
    setIsFilterApplied(true); // Set filter applied state to true
  };

  const handleResetFilters = () => {
    setSearch("name");
    setFiltered(dinos);
    setIsFilterApplied(false); // Reset filter applied state
  };

  return (
    <div className="mt-10 flex items-center gap-3">
      {isFilterApplied && (
        <button
          className="rounded bg-primary px-4 py-2 text-white hover:bg-primaryHover"
          onClick={handleResetFilters}
        >
          Reset filters
        </button>
      )}

      <Link to="/shoppingCartPage" className="text-2xl">
        <TfiShoppingCart className="text-primary hover:text-primaryHover" />
        {cart.length > 0 && (
          <span className="text-primary hover:text-primaryHover">
            {cart.length}
          </span>
        )}
      </Link>

      {/* Category selection dropdown */}
      <select
        className="rounded border border-gray-800 p-1"
        onChange={(e) => handleSelect(e)}
        name="category"
        id="category"
        value={search}
      >
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="diet">Diet</option>
        <option value="stock">Stock</option>
        <option value="price">Price</option>
      </select>

      {/* search based on diet */}
      {search === "diet" && (
        <select
          className="rounded border border-gray-800 p-1"
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

      {/* search based on stock */}
      {search === "stock" && (
        <select
          className="rounded border border-gray-800 p-1"
          onChange={(e) => handleSearch(e.target.value, "")}
          defaultValue=""
        >
          <option disabled value="">
            Choose Stock Order
          </option>
          <option value="inStockAsc">Low to High</option>
          <option value="inStockDesc">High to Low</option>
        </select>
      )}

      {/* search based on price */}
      {search === "price" && (
        <select
          className="rounded border border-gray-800 p-1"
          onChange={(e) => handleSearch(e.target.value, "")}
          defaultValue=""
        >
          <option disabled value="">
            Choose Price Order
          </option>
          <option value="priceAsc">Low to High</option>
          <option value="priceDesc">High to Low</option>
        </select>
      )}

      {/* search based on country */}
      {search === "country" && (
        <select
          onChange={(e) => handleSearch(search, e.target.value)}
          className="rounded border border-gray-800 p-1"
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
      {search !== "diet" &&
        search !== "country" &&
        search !== "stock" &&
        search !== "price" && (
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
