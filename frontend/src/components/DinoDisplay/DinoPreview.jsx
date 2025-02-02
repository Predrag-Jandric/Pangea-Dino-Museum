export default function DinoPreview({ dino, setSelectedDino }) {
  return (
    <div
      className="flex aspect-square h-48 cursor-pointer list-none flex-col items-center justify-center rounded-xl  bg-secondary/30 p-2 shadow-2xl transition-all hover:scale-110"
      onClick={() => setSelectedDino(dino)}
    >
      <div className="flex items-center">
        <span className="text-3xl font-bold text-highlight font-pressStart">
          {dino.name.slice(0, 1)}
        </span>
        <span className="uppercase text-highlight font-pressStart">{dino.name.slice(1)}</span>
      </div>
      <div className="text-4xl">
        {dino.diet === "herbivorous" ? "🦕" : "🦖"}
      </div>
    </div>
  );
}
