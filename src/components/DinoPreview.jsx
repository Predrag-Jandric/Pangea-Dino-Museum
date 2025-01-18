export default function DinoPreview({ dino, setSelectedDino }) {
  return (
    <li
      className="cursor-pointer list-none border border-green-900 bg-gray-800 rounded-xl p-2 h-48 flex flex-col items-center justify-center shadow-2xl"
      onClick={() => setSelectedDino(dino)}
    >
      <div className="flex items-center">
        <span className="text-3xl font-bold text-green-600">
          {dino.name.slice(0, 1)}
        </span>
        <span className="uppercase text-green-400">{dino.name.slice(1)}</span>
      </div>
      <div className="text-4xl">{dino.diet === "herbivorous" ? "🦕" : "🦖"}</div>
    </li>
  );
}
