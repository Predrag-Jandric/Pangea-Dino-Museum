import { useEffect, useState } from "react";
import { addToCart } from "../../utils/shoppingSlice.js";
import { useDispatch } from "react-redux";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import EcommerceSearch from "./EcommerceSearch.jsx";
import EcommerceCard from "./EcommerceCard.jsx";
import Title from "../Title.jsx";
import tempdata from "../../utils/tempdata.json"

function EcommerceDisplay() {
  const dispatch = useDispatch();
  const [dinos, setDinos] = useState(tempdata);
  const [filtered, setFiltered] = useState(tempdata);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getRandomDinos = (dinos, count) => {
    const shuffled = [...dinos].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // useEffect(() => {
  //   async function getDinos() {
  //     try {
  //       const res = await fetch("https://api-example-wg44.onrender.com");
  //       if (!res.ok) {
  //         throw new Error(`HTTP error! status: ${res.status}`);
  //       }
  //       const data = await res.json();
  //       setDinos(data);
  //       setFiltered(getRandomDinos(data));
  //     } catch (error) {
  //       console.error("Error fetching dinos", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getDinos();
  // }, []);

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
      className="container py-16 mx-auto bg-bgcolortwo flex flex-col items-center justify-center text-dark"
    >
      <Title
        title="Online Shop"
        // description="Browse our dinosaur collection "
      />

      <section className="flex w-full flex-col items-center gap-6 px-4 md:max-w-[65rem]">
        {/* search and filters */}
        <EcommerceSearch
          dinos={dinos}
          setFiltered={setFiltered}
          setCurrentPage={setCurrentPage}
        />

        {/* responsive grid */}
        {/* {loading ? (
          <div className="flex h-96 items-center justify-center text-2xl">
            Dinosaur data coming ...
          </div>
        ) : currentItems.length === 0 ? (
          <div className="flex h-96 items-center justify-center text-2xl">
            No dinosaurs found.
          </div>
        ) : ( */}
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
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all  disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50"
              >
                <IoIosArrowBack className="size-5 font-extrabold" />
              </button>
              <span className="px-4 py-2 mx-1 ">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-3 rounded-custom hover:bg-primary/5 text-primary border-primary/60 border-2 text-lg transition-all disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50"
              >
                <IoIosArrowForward className="size-5 font-extrabold" />
              </button>
            </div>
          </>
       
      </section>
    </div>
  );
}

export default EcommerceDisplay;
