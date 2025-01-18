const fakeData = [
  {
    name: "Kotasaurus",
    imageSrc:
      "https://dinosaurencyclopedia.org/wp-content/uploads/2023/02/Kotasaurus.webp",
    typeOfDinosaur: "sauropod",
    length: 9,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Early Jurassic, 205-180 million years ago",
    foundIn: "India",
    taxonomy: "Dinosauria, Saurischia, Sauropodomorpha, Sauropoda",
    namedBy: "Yadagiri (1988)",
    typeSpecies: "yamanpalliensis",
    description:
      "Kotasaurus is known from a nearly complete skeleton that lacks the skull, so the reconstruction uses guesswork based on similar dinosaurs.",
  },
  {
    name: "Lapparentosaurus",
    imageSrc:
      "https://www.rareresource.com/dinos/Lapparentosaurus%20-1-big.jpg",
    typeOfDinosaur: "sauropod",
    length: "N/A",
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Mid Jurassic, 169-164 million years ago",
    foundIn: "Madagascar",
    taxonomy:
      "Dinosauria, Saurischia, Sauropodomorpha, Sauropoda, Eusauropoda, Neosauropoda, Macronaria, Camarasauromorpha, Titanosauriformes",
    namedBy: "Bonaparte (1986)",
    typeSpecies: "madagascariensis",
    description:
      "Lapparentosaurus is known from partial skeletons lacking skulls, so reconstructions involve guesswork based on similar dinosaurs.",
  },
  {
    name: "Lesothosaurus",
    imageSrc: "https://images.dinosaurpictures.org/lesothosaurus_4ed9.jpg",
    typeOfDinosaur: "small ornithischian",
    length: 1,
    weight: 10,
    diet: "herbivorous",
    whenLived: "Early Jurassic, 213-200 million years ago",
    foundIn: "Lesotho",
    taxonomy: "Dinosauria, Ornithischia",
    namedBy: "Galton (1978)",
    typeSpecies: "diagnosticus",
    description:
      "This dinosaur was small and agile and had 5 fingers on each 'hand', although these were probably not well adapted for grasping.",
  },
  {
    name: "Marshosaurus",
    imageSrc:
      "https://images.dinosaurpictures.org/Marshosaurus-nhm.ac.uk__fd20.jpg",
    typeOfDinosaur: "large theropod",
    length: 6,
    weight: "N/A",
    diet: "carnivorous",
    whenLived: "Late Jurassic, 154-142 million years ago",
    foundIn: "USA",
    taxonomy:
      "Dinosauria, Saurischia, Theropoda, Neotheropoda, Tetanurae, Avetheropoda",
    namedBy: "Madsen (1976)",
    typeSpecies: "bicentesimus",
    description: "Marshosaurus is known from a partial skull and postcranium.",
  },
  {
    name: "Microceratus",
    imageSrc:
      "https://image-service.zaonce.net/eyJidWNrZXQiOiJmcm9udGllci1jbXMiLCJrZXkiOiIyMDI0LTA1L21pY3JvY2VyYXR1cy5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjMwMH19fQ==",
    typeOfDinosaur: "ceratopsian",
    length: 0.5,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Cretaceous, 86-66 million years ago",
    foundIn: "China, Mongolia",
    taxonomy:
      "Dinosauria, Ornithischia, Neornithischia, Cerapoda, Marginocephalia, Ceratopsia, Neoceratopsia, Coronosauria",
    namedBy: "Bohlin (1953)",
    typeSpecies: "gobiensis",
    description:
      "This dinosaur was originally named Microceratops but, 50 years later, scientists realised that the name had already been taken by a species of beetle. So, in 2008, the name was changed to Microceratus.We don't know how large this dinosaur would've grown to be, because the only fossils we know of come from a juvenile dinosaur. But scientists think that it was rather small and agile, and able to evade predators simply by running away.",
  },
  {
    name: "Minmi",
    imageSrc:
      "https://images.dinosaurpictures.org/minmi-paravertebra-a-prehistoric-era-sergey-krasovskiy_07e1.jpg",
    typeOfDinosaur: "armoured dinosaur",
    length: 3,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Early Cretaceous, 121-112 million years ago",
    foundIn: "Australia",
    taxonomy: "Dinosauria, Ornithischia, Thyreophora, Ankylosauria",
    namedBy: "Molnar (1980)",
    typeSpecies: "paravertebra",
    description:
      "This dinosaur is known from an almost complete skeleton with armour in place.",
  },
  {
    name: "Nemegtosaurus",
    imageSrc: "https://images.dinosaurpictures.org/nemegtosaurus1_2846.jpg",
    typeOfDinosaur: "sauropod",
    length: 13,
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Cretaceous, 72-68 million years ago",
    foundIn: "Mongolia",
    taxonomy:
      "Dinosauria, Saurischia, Sauropodomorpha, Sauropoda, Eusauropoda, Neosauropoda, Diplodocoidea, Nemegtosauridae",
    namedBy: "Nowinski (1971)",
    typeSpecies: "mongoliensis",
    description:
      "Nemegtosaurus is only known from a skull and mandible (lower jawbone), so reconstructions are speculative.",
  },
  {
    name: "Nipponosaurus",
    imageSrc:
      "https://images.dinosaurpictures.org/Nipponosaurus_dinosaur_3729.jpg",
    typeOfDinosaur: "large ornithopod",
    length: "N/A",
    weight: "N/A",
    diet: "herbivorous",
    whenLived: "Late Cretaceous, 89-84 million years ago",
    foundIn: "Russia",
    taxonomy:
      "Dinosauria, Ornithischia, Ornithopoda, Hadrosauridae, Lambeosaurinae",
    namedBy: "Nagao (1936)",
    typeSpecies: "sachalinensis",
    description:
      "Our knowledge of Nipponosaurus is based on a partial skull and postcranial of a juvenile.",
  },
];

function Ecommerce() {
  return (
    <div>
      <div>
        <h1>Dino online shop</h1>
        <p>
          Buy your favorite dinosaur toys, figures, and merchandise for yourself
          and your children from our wide selection of products.
        </p>
      </div>

      <section>
        {/* search and filters */}
        <div>
          <input type="text" placeholder="Search..." />
          <div className="flex gap-6">
            <select>
              <option value="">Filter 1</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
            <select>
              <option value="">Filter 2</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </select>
          </div>
        </div>

        {/* responsive grid */}
        <div>
          {fakeData.map((item) => (
            <div key={item.id}>
              <img src={item.imageSrc} alt={item.name} />

              {/* product info */}
              <h2>{item.name}</h2>
              <p>
                Price: <span>${item.price}</span>
              </p>
              <p>
                Quantity: <span className="font-bold">{item.quantity}</span>
              </p>

              <button>Buy</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Ecommerce;
