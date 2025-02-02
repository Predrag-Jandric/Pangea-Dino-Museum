function DinoMap() {
  return (
    <div id="map" className="h-dvh p-6 flex gap-7 flex-col items-center justify-center text-center bg-dark">
      <h2 className="text-4xl text-primary font-pressStart">Dino map</h2>
      <p className="max-w-2xl text-light">
      Find out where your favorite giant lizards roamed before real estate prices skyrocketed.
      </p>
      <img className="px-0 lg:px-10" src="./src/assets/dinoMap.png" alt="map" />
    </div>
  );
}

export default DinoMap;
