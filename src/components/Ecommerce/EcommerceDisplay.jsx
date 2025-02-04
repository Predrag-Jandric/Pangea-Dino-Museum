import { useEffect, useState } from "react";
import { addToCart } from "../../utils/shoppingSlice.js";
import { useDispatch } from "react-redux";
import EcommerceSearch from "./EcommerceSearch.jsx";
import { dinosaurs } from "../../utils/data.js";
import EcommerceCard from "./EcommerceCard.jsx";

function Ecommerce() {
  const dispatch = useDispatch();
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const getRandomDinos = (dinos, count) => {
    const randomIndexes = new Set();
    while (randomIndexes.size < count) {
      randomIndexes.add(Math.floor(Math.random() * dinos.length));
    }
    return [...randomIndexes].map((ind) => dinos[ind]);
  };

  useEffect(() => {
    async function getDinos() {
      try {
        //! static data currently being used prior to creation of API, revert when completed
        // const res = await fetch("https://chinguapi.onrender.com/dinosaurs");
        // const data = await res.json();
        setDinos(dinosaurs);
        setFiltered(getRandomDinos(dinosaurs, 10));
      } catch (error) {
        console.error("Error fetching dinos", error);
      }
    }
    getDinos();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        inStock: item.inStock,
        quantity: 1,
        imageSrc: item.imageSrc,
      }),
    );
  };

  return (
    <div id="shop" className="bg-dark flex flex-col items-center gap-6 pb-10">
      <div className="w-full p-4 text-center md:max-w-[50rem]">
        <h1 className="mb-3 text-4xl text-primary font-pressStart">Dino online shop</h1>
        <p className="max-w-2xl text-light">
          Buy your favorite dinosaur toys, figures, and merchandise for yourself
          and your children from our wide selection of products.
        </p>
      </div>

      <section className="flex flex-col items-center gap-6 rounded-lg p-4">
        {/* search and filters */}
        <EcommerceSearch
          dinos={dinos}
          filtered={filtered}
          setFiltered={setFiltered}
        />

        {/* responsive grid */}
        {filtered.length === 0 ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            No dinosaurs found.
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((dino) => (
              <EcommerceCard
                key={dino.id}
                item={dino}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Ecommerce;
