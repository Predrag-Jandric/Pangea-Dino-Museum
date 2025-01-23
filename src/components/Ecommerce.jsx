const fakeData = [
  {
    id: 123,
    name: "Amygdalodon",
    imageSrc: "https://images.dinosaurpictures.org/Amygdalodon_e238.jpg",
    typeOfDinosaur: "sauropod",
    length: 15,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Mid Jurassic, 177-169 million years ago",
    foundIn: "Argentina",
    namedBy: "Cabrera (1947)",
    description: "Amygdalodon is known from a single partial skeleton.",
    price: 19.54,
    inStock: 21,
  },
  {
    id: 123453,
    name: "Secernosaurus",
    imageSrc:
      "https://images.dinosaurpictures.org/Secernosaurus_koerneri_by_maniraptora_db3d.jpg",
    typeOfDinosaur: "large ornithopod",
    length: 3,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Cretaceous, 71-66 million years ago",
    foundIn: "Argentina",
    namedBy: "Brett-Surman (1979)",
    description:
      "Secernosaurus was the first hadrosaurid to be found in South America.",
    price: 81.45,
    inStock: 0,
  },
  {
    id: 125436453,
    name: "Hypacrosaurus",
    imageSrc: "https://images.dinosaurpictures.org/Hypacrosaurus-v2_bc23.jpg",
    typeOfDinosaur: "large ornithopod",
    length: 9,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Cretaceous, 70 million years ago",
    foundIn: "Canada, USA",
    namedBy: "Brown (1913)",
    description:
      "Complete Hypacrosaurus skeletons have been found, from embryos to adults.",
    price: 49.49,
    inStock: 38,
  },
];

import { addToCart } from "../utils/shoppingSlice";
import { useDispatch } from "react-redux";

function Ecommerce() {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    if (item.inStock === 0) {
      console.warn("Item is out of stock!");
      return;
    }

    dispatch(
      addToCart({
        id: item.id,
        name: item.name,
        price: item.price,
        inStock: item.inStock,
        quantity: 1,
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

      <section className="bg-bgColor flex flex-col items-center gap-6 rounded-lg bg-gray-100 p-4">
        {/* search and filters */}
        <div className="flex w-full items-center justify-between rounded-lg bg-white p-4 shadow-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-1/3 rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-6 items-center">
            <select className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Filter 1</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <p>X</p>
          </div>
        </div>

        {/* responsive grid */}
        <div className="mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fakeData.map((item) => (
            <div
              key={item.id}
              className="mx-auto flex w-[17rem] flex-col rounded-lg border border-gray-200 bg-white p-4 shadow-md"
            >
              <img
                src={item.imageSrc}
                alt={item.name}
                className="mb-4 h-48 w-full object-contain"
              />

              {/* product info */}
              <h2 className="mb-2 text-lg font-semibold">{item.name}</h2>
              <p className="mb-1 text-gray-600">
                Price:{" "}
                <span className="font-bold text-green-600">${item.price}</span>
              </p>
              <p className="mb-3 text-gray-600">
                In Stock:{" "}
                <span
                  className={`font-bold ${
                    item.inStock === 0
                      ? "font-bold text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {item.inStock}
                </span>
              </p>

              <button
                onClick={() => handleAddToCart(item)}
                disabled={item.inStock === 0}
                className={`w-full rounded-lg px-4 py-2 text-white transition duration-200 hover:bg-blue-600 ${
                  item.inStock === 0
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-500"
                }`}
              >
                {item.inStock === 0 ? "Out of Stock" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Ecommerce;
