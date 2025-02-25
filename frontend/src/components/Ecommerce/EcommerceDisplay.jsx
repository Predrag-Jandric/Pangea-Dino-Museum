import { useEffect, useState } from "react";
import { addToCart } from "../../utils/shoppingSlice.js";
import { useDispatch } from "react-redux";
import EcommerceSearch from "./EcommerceSearch.jsx";
import EcommerceCard from "./EcommerceCard.jsx";
import Button from "../../utils/Button.jsx";
import Title from "../Title.jsx";

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

function EcommerceDisplay() {
  const dispatch = useDispatch();
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getRandomDinos = (dinos, count) => {
    const shuffled = [...dinos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    async function getDinos() {
      try {
        const res = await fetch("https://api-example-wg44.onrender.com");
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setDinos(data);
        setFiltered(getRandomDinos(data));
      } catch (error) {
        console.error("Error fetching dinos", error);
      } finally {
        setLoading(false);
      }
    }
    getDinos();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item._id,
        name: item.name,
        price: item.price,
        inStock: item.inStock,
        quantity: 1,
        imageSrc: item.imageSrc,
      })
    );
  };

  // calculate the dinos to be displayed based on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

  // calculate total pages
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div
      id="shop"
      className="container py-16 mx-auto !bg-red-200 bg-bgcolor flex flex-col items-center justify-center text-dark"
    >
      <Title
        title="Dino Quiz"
        description="Test your dino-knowledge and see how much you know about these
          prehistoric creatures!"
      />

      <section className="flex w-full flex-col items-center gap-6 px-4 md:max-w-[65rem]">
        {/* search and filters */}
        <EcommerceSearch
          dinos={dinos}
          setFiltered={setFiltered}
          setCurrentPage={setCurrentPage}
        />

        {/* responsive grid */}
        {loading ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            Fetching data...
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            No dinosaurs found.
          </div>
        ) : (
          <>
            {/* Grid for displaying products dynamically */}
            <div
              className="grid w-full gap-6"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {currentItems.map((dino) => (
                <EcommerceCard
                  key={dino._id}
                  item={dino}
                  handleAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* pagination */}
            <div className="flex justify-center">
              <Button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="disabled:opacity-50"
              >
                Previous
              </Button>
              <span className="px-4 py-2 mx-1 ">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="disabled:opacity-50"
              >
                Next
              </Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default EcommerceDisplay;
