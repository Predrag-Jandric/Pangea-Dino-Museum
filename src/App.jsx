import { useState } from "react";


function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 bg-slate-900 text-slate-200 gap-4">
      <h1 className="text-4xl font-bold underline">Dino Museum App</h1>
      <h3 className="text-2xl">Vite + React + Tailwind</h3>

      <button className="hover:bg-slate-700 border py-2 px-6 border-white" onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </div>
  );
}

export default App;
