import React from "react";

export default function DinoCard({ dino, setSelectedDino }) {
  return (
    <div className="p-5 absolute left-1/2 -translate-x-1/2">
      <div className="bg-[url('/dino-card-bg.jpg')] bg-contain p-5 rounded-lg shadow-xl max-w-[500px] flex flex-col gap-3">
        <div
          className="cursor-pointer text-xl absolute right-8 top-8"
          onClick={() => setSelectedDino({})}
        >
          <div className="rounded-full bg-green-200 hover:bg-green-300 transition h-6 w-6 flex leading-none justify-center ">
            x
          </div>
        </div>
        <div className="flex justify-around items-center gap-3 mb-5">
          <div className="h-52 w-52 bg-white border-green-500 border-4 rounded-full overflow-hidden flex items-center justify-center p-2 group relative">
            <div className="hidden group-hover:block absolute bg-white p-1 rounded top-0">
              Roar!
            </div>
            {dino.imageSrc !== "N/A" ? (
              <img src={dino.imageSrc} alt={dino.name} />
            ) : (
              <div>
                <div className="text-[68px]">🦖</div>
                <div className="text-xs text-center">No photo</div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-3xl text-gray-200">{dino.name}</h2>
            <div className="text-xs text-right bg-gray-200 px-2 rounded-lg ">
              {dino.typeOfDinosaur} | {dino.typeSpecies}
            </div>
          </div>
        </div>

        <div className="bg-green-200 p-2 rounded-md text-center">
          📍 {dino.foundIn}
        </div>

        <div className="flex gap-5 justify-center">
          <div className="bg-green-200 p-2 rounded-md flex items-center justify-around w-1/2">
            <div className="flex items-center justify-center flex-col">
              <div className="bg-green-300 rounded-full p-5 flex items-center justify-center text-xl h-12 w-12 mb-2">
                {dino.length}
              </div>
              <div className="text-xs">📏 Length (M)</div>
            </div>
            <div className="w-0.5 rounded h-16 bg-gray-400"></div>
            <div className="flex items-center justify-center flex-col">
              <div className="bg-green-300 rounded-full p-5 flex items-center justify-center text-xl h-12 w-12 mb-2">
                {dino.weight !== "N/A" ? dino.weight : "?"}
              </div>
              <div className="text-xs">🪨 Weight (Kg)</div>
            </div>
          </div>

          <div className="bg-green-200 p-2 rounded-md flex items-center justify-around w-1/2">
            <div className="text-xl">
              {dino.diet === "herbivorous" ? "🥦" : "🍖"} {dino.diet}
            </div>
          </div>
        </div>

        <div className="bg-green-200 p-2 rounded-md text-center">
          ⏳ {dino.whenLived}
        </div>

        <div className="bg-green-200 p-2 rounded-md">
          <div className="mb-3 max-h-48 overflow-y-auto">📓 {dino.description}</div>
          <div className="text-xs">Named by: {dino.namedBy}</div>
        </div>

        <div className="text-xs text-white">Taxonomy: {dino.taxonomy}</div>
      </div>
    </div>
  );
}
