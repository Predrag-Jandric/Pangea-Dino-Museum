import LandingPage from "./components/LandingPage"
import DinoDisplay from "./components/DinoDisplay/DinoDisplay";
import Quiz from "./components/Quiz";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="">
      <LandingPage />
      <DinoDisplay />
      <Quiz />
      <Timeline />
      <Footer />
    </div>
  );
}

export default App;
