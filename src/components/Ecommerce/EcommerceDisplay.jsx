import { useEffect, useState } from "react";
import { addToCart } from "../../utils/shoppingSlice";
import { useDispatch } from "react-redux";
import EcommerceSearch from "./EcommerceSearch";
import EcommerceCard from "./EcommerceCard";

function Ecommerce() {
  const dispatch = useDispatch();
  const [dinos, setDinos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setFiltered(getRandomDinos(data, 10));
      } catch (error) {
        console.error("Error fetching dinos", error);
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    }
    getDinos();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(
      addToCart({
        id: item._id, // Use _id from API data
        name: item.name,
        price: item.price,
        inStock: item.inStock,
        quantity: 1,
        imageSrc: item.imageSrc, // Include imageSrc here
      }),
    );
  };

  return (
    <div className="m-10 flex flex-col items-center gap-6">
      <div className="w-full p-4 text-center md:max-w-[50rem]">
        <h1 className="mb-3 text-4xl">Dino online shop</h1>
        <p>
          Buy your favorite dinosaur toys, figures, and merchandise for yourself
          and your children from our wide selection of products.
        </p>
      </div>

      <section className="bg-bgColor flex w-full flex-col items-center gap-6 rounded-lg bg-gray-100 p-4 md:max-w-[50rem]">
        {/* search and filters */}
        <EcommerceSearch dinos={dinos} setFiltered={setFiltered} />

        {/* responsive grid */}
        {loading ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            Fetching data...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex h-96 w-[40rem] items-center justify-center text-2xl">
            No dinosaurs found.
          </div>
        ) : (
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((dino) => (
              <EcommerceCard
                key={dino._id}
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
