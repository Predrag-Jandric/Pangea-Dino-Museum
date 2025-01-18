import React from "react";

export default function DinoInfoCard({ dino }) {
  return (
    <div className="p-5">
      <div className="bg-gradient-to-br from-gray-700 to-blue-500 p-5 rounded-lg shadow-xl max-w-[500px] flex flex-col gap-3">
        <div className="flex justify-around items-center gap-3 mb-5">
          <div className="h-52 w-52 bg-white border-blue-500 border-4 rounded-full overflow-hidden flex items-center justify-center p-2 group relative">
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
            <div className="text-xs text-right">
              {dino.typeOfDinosaur} | {dino.typeSpecies}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-2 rounded-md text-center">
          📍 {dino.foundIn}
        </div>

        <div className="flex gap-5 justify-center">
          <div className="bg-gray-200 p-2 rounded-md flex items-center justify-around w-1/2">
            <div className="flex items-center justify-center flex-col">
              <div className="bg-gray-300 rounded-full p-5 flex items-center justify-center text-xl h-12 w-12 mb-2">
                {dino.length}
              </div>
              <div className="text-xs">📏 Length (M)</div>
            </div>
            <div className="w-0.5 rounded h-16 bg-gray-400"></div>
            <div className="flex items-center justify-center flex-col">
              <div className="bg-gray-300 rounded-full p-5 flex items-center justify-center text-xl h-12 w-12 mb-2">
                {dino.weight !== "N/A" ? dino.weight : "?"}
              </div>
              <div className="text-xs">🪨 Weight (Kg)</div>
            </div>
          </div>
          
          <div className="bg-gray-200 p-2 rounded-md flex items-center justify-around w-1/2">
            <div className="text-xl">
              {dino.diet === "herbivorous" ? "🥦" : "🍖"} {dino.diet}
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-2 rounded-md text-center">
          ⏳ {dino.whenLived}
        </div>

        <div className="bg-gray-200 p-2 rounded-md">
          <div className="mb-3">📓 {dino.description}</div>
          <div className="text-xs">Named by: {dino.namedBy}</div>
        </div>

        <div className="text-xs">Taxonomy: {dino.taxonomy}</div>
      </div>
    </div>
  );
}
