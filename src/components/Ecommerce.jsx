const fakeData = [
  {
    id: 346780123,
    name: "Barapasaurus",
    imageSrc: "https://images.dinosaurpictures.org/barapasaurus_308a.jpg",
    typeOfDinosaur: "sauropod",
    length: 14,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Early Jurassic, 185-170 million years ago",
    foundIn: "India",
    namedBy: "Jain, Kutty, Roy-Chowdhury and Chatterjee (1975)",
    description: "Barapasaurus was a primitive but very large sauropod.",
    price: 82.12,
    inStock: 26,
  },
  {
    id: 3468769,
    name: "Velociraptor",
    imageSrc:
      "https://images.dinosaurpictures.org/Velociraptor-dinosaurs-23564955-817-734_5c51.jpg",
    typeOfDinosaur: "small theropod",
    length: 1.8,
    weight: 7,
    diet: "carnivorous",
    whenLived: "Late Cretaceous, 74-70 million years ago",
    foundIn: "Mongolia",
    namedBy: "Osborn (1924)",
    description:
      "As portrayed in the Jurassic Park movies, Velociraptor was recreated at twice its actual size and closely modelled on Deinonychus. Though this was seen as unscientific at the time, soon after the first film was released, a dinosaur of the same type, Utahraptor, was discovered, even larger than the virtual Velociraptors.Velociraptor is now thought to have had a fine feather-like covering.",
    price: 87.29,
    inStock: 0,
  },
  {
    id: 3468567845769,
    name: "Yingshanosaurus",
    imageSrc: "https://images.dinosaurpictures.org/yingshanosaurus_9528.jpg",
    typeOfDinosaur: "armoured dinosaur",
    length: "N/A",
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Jurassic, 159-142 million years ago",
    foundIn: "China",
    namedBy: "Watanabe (1992)",
    description:
      "This dinosaur was named in a Japanese dinosaur book, but has not been fully described yet (it is a nomen nudum).",
    price: 62.55,
    inStock: 3,
  },
];

function Ecommerce() {
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
          <div className="flex gap-6">
            <select className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Filter 1</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <select className="rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Filter 2</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
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
                Quantity: <span className="font-bold">{item.quantity}</span>
              </p>

              <button
                className="w-full rounded-lg bg-blue-500 px-4 py-2 text-white transition duration-200 hover:bg-blue-600"
                onClick={() => alert(`You bought ${item.name}!`)} //
              >
                Buy
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Ecommerce;
