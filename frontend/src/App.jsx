import Hero from "./components/Hero";
import Quiz from "./components/Quiz";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";
import Ecommerce from "./components/Ecommerce/EcommerceDisplay";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="bg-bgcolortwo font-body">
      <Hero />
      <Timeline />
      <Ecommerce />
      <Quiz />
      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
