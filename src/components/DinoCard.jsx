export default function DinoCard({dino}) {
  return (
    <li
      key={dino.id}
      className="cursor-pointer list-none border border-blue-400 rounded-xl m-3 p-2"
      onClick={() => setSelected(dino)}
    >
      {dino.name}
    </li>
  );
}