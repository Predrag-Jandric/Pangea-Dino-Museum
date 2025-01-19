export default function DinoPreview({ dino, setSelectedDino }) {
  return (
    <div
      className="flex aspect-square h-48 cursor-pointer list-none flex-col items-center justify-center rounded-xl border border-green-900 bg-gray-800 p-2 shadow-2xl transition-all hover:scale-110"
      onClick={() => setSelectedDino(dino)}
    >
      <div className="flex items-center">
        <span className="text-3xl font-bold text-green-600">
          {dino.name.slice(0, 1)}
        </span>
        <span className="uppercase text-green-400">{dino.name.slice(1)}</span>
      </div>
      <div className="text-4xl">
        {dino.diet === "herbivorous" ? "🦕" : "🦖"}
      </div>
    </div>
  );
}
