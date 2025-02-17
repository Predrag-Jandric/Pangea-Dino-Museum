import React from "react";
import { CgClose } from "react-icons/cg";

export default function DinoCard({ dino, setSelectedDino}) {

  return (
    <div className="absolute md:left-1/2 md:-translate-x-1/2 p-5 z-[1001] font-pressStart text-xs">
      <div className="flex flex-col gap-3 bg-dark p-5 shadow-xl md:max-w-[500px] rounded-lg">
        <div
          className="absolute right-8 top-8 cursor-pointer text-xl"
          onClick={() => setSelectedDino(null)}
        >
          <div className="flex h-6 w-6 justify-center items-center rounded-full bg-primary/20 leading-none transition hover:bg-primary/30 cursor-pointer">
            <CgClose className="text-primary"/>
          </div>
        </div>
        <div className="mb-5 flex items-center justify-around gap-3">
          <div className="group relative flex h-32 w-32 md:h-52 md:w-52 items-center justify-center overflow-hidden rounded-full border-4 border-primary hover:border-highlight bg-white p-2">
            <div className="absolute top-0 hidden rounded bg-light p-1 group-hover:block text-primary">
              Roar!
            </div>
            {dino.imageSrc !== "N/A" ? (
              <img src={dino.imageSrc} alt={dino.name} className="group-hover:scale-110 transition-all"/>
            ) : (
              <div>
                <div className="text-[68px]">🦖</div>
                <div className="text-center text-xs">No photo</div>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <h2 className="text-base md:text-lg text-primary font-pressStart">{dino.name}</h2>
            <div className="rounded-lg bg-secondary text-highlight font-pressStart px-2 text-right text-xs">
              {dino.typeOfDinosaur}
            </div>
          </div>
        </div>

        <div className="rounded-md border-2  border-secondary text-highlight p-2 text-center">
          📍 {dino.foundIn}
        </div>

        <div className="flex justify-center gap-5">
          <div className="flex w-1/2 items-center justify-around rounded-md border-2  border-secondary p-2">
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary p-5 text-highlight text-[10px]">
             { dino.length !== "N/A" ? dino.length + "m" : "?"}
              </div>
              <div className="text-[8px] text-light">📏 Length</div>
            </div>
            <div className="h-16 w-0.5 rounded bg-gray-400"></div>
            <div className="flex flex-col items-center justify-center">
              <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-highlight p-5 text-[10px]">
                {dino.weight !== "N/A" ? dino.weight + "kg": "?"}
              </div>
              <div className="text-[8px] text-light">🪨 Weight</div>
            </div>
          </div>

          <div className="flex w-1/2 items-center justify-around rounded-md bg-secondary text-highlight p-2">
            <div className="text-lg">
              {dino.diet === "herbivorous" ? "🥦" : "🍖"} {dino.diet}
            </div>
          </div>
        </div>

        <div className="rounded-md border-2  border-secondary text-highlight p-2 text-center">
          ⏳ {dino.whenLived}
        </div>

        <div className="rounded-md bg-secondary text-light text-[10px] text-left p-2">
          <div className="mb-3 max-h-48 overflow-y-auto">
            📓 {dino.description}
          </div>
         
        </div> 
        <div className="text-xs text-light text-left">Named by: {dino.namedBy}</div>
      </div>
    </div>
  );
}
