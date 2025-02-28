import { useState } from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../utils/Button";

function EcommerceSearch({ dinos, setFiltered, setCurrentPage }) {
  // needed for the shopping cart number display
  const cart = useSelector((state) => state.shopping.inCart);

  const [search, setSearch] = useState("name");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // place selected search category in state
  const handleSelect = (e) => {
    setSearch(e.target.value);
    setIsFilterApplied(false);
    if (
      e.target.value !== "diet" &&
      e.target.value !== "stock" &&
      e.target.value !== "price" &&
      e.target.value !== "country" &&
      e.target.value !== "name"
    ) {
      // reset the search results when changing category
      handleSearch(e.target.value, "");
    }
  };

  // create a dropdown of Countries where dinos are found
  const getCountries = () => {
    const countries = new Set();
    dinos.forEach((dino) =>
      dino.foundIn.split(", ").forEach((place) => countries.add(place))
    );
    return [...countries].sort((a, b) => (a < b ? -1 : 1));
  };

  // handle search depending on criteria
  const handleSearch = (category, query) => {
    let filteredDinos = [];

    // filters
    switch (category) {
      case "name": {
        filteredDinos = dinos.filter((dino) =>
          dino.name.toLowerCase().startsWith(query)
        );
        break;
      }
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

    setFiltered(filteredDinos);
    setIsFilterApplied(true);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearch("name");
    setFiltered(dinos);
    setIsFilterApplied(false);
    setInputValue("");
    setCurrentPage(1);
  };

  return (
    <section className="font-sans flex w-full flex-wrap gap-3 sm:flex-row flex-col items-center">
      {/* category selection dropdown */}
      <div className="w-full sm:w-auto">
        <select
          className="input"
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
      </div>

      {/* search based on diet */}
      {search === "diet" && (
        <div className="w-full sm:w-auto">
          <select
            className="input"
            onChange={(e) => handleSearch(search, e.target.value)}
            defaultValue=""
          >
            <option disabled value="">
              Choose Diet Type
            </option>
            <option value="carnivorous">Carnivorous</option>
            <option value="herbivorous">Herbivorous</option>
          </select>
        </div>
      )}

      {/* search based on stock */}
      {search === "stock" && (
        <div className="w-full sm:w-auto">
          <select
            className="input"
            onChange={(e) => handleSearch(e.target.value, "")}
            defaultValue=""
          >
            <option disabled value="">
              Choose Stock Order
            </option>
            <option value="inStockAsc">Low to High</option>
            <option value="inStockDesc">High to Low</option>
          </select>
        </div>
      )}

      {/* search based on price */}
      {search === "price" && (
        <div className="w-full sm:w-auto">
          <select
            className="input"
            onChange={(e) => handleSearch(e.target.value, "")}
            defaultValue=""
          >
            <option disabled value="">
              Choose Price Order
            </option>
            <option value="priceAsc">Low to High</option>
            <option value="priceDesc">High to Low</option>
          </select>
        </div>
      )}

      {/* search based on country */}
      {search === "country" && (
        <div className="w-full sm:w-auto">
          <select
            onChange={(e) => handleSearch(search, e.target.value)}
            className="input"
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
        </div>
      )}

      {/* display search input field */}
      {search === "name" && (
        <div className="w-full sm:w-auto">
          <input
            type="text"
            value={inputValue}
            placeholder="Search..."
            className="input"
            onChange={(e) => {
              setInputValue(e.target.value);
              handleSearch(search, e.target.value);
            }}
          />
        </div>
      )}

      {isFilterApplied && (
        <Button className="w-full sm:w-auto" onClick={handleResetFilters}>
          Reset Filters
        </Button>
      )}

      <Link to="/shoppingCartPage" className="mt-6 sm:mt-0 relative ml-auto text-4xl">
        <TfiShoppingCart className=" transition hover:text-highlight" />
        {cart.length > 0 && (
          <span className="absolute -top-2 right-2.5 flex size-5 animate-bounce text-dark items-center justify-center font-bold text-sm rounded-full bg-alert">
            {cart.length}
          </span>
        )}
      </Link>
    </section>
  );
}

export default EcommerceSearch;