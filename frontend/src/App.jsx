/* eslint-disable no-unused-vars */
import LandingPage from "./components/LandingPage";

import Quiz from "./components/Quiz";
import Timeline from "./components/Timeline";
import Footer from "./components/Footer";

import Ecommerce from "./components/Ecommerce/EcommerceDisplay";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <main className="font-body bg-bgcolortwo">
      <LandingPage />
      <Timeline />
      <Ecommerce />
      <Quiz />
      <Footer />
      <ToastContainer />
    </main>
  );
}

export default App;
