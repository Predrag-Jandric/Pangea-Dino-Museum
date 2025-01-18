export default function DinoCard({dino, setSelectedDino}) {

  return (
    <li
      className="cursor-pointer list-none border border-blue-400 rounded-xl m-3 p-2"
      onClick={() => setSelectedDino(dino)}
    >
      {dino.name}
    </li>
  );
}