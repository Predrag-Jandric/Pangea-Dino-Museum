import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ecommerce from "./components/Ecommerce/EcommerceDisplay";
import ShoppingCartPage from "./components/ShoppingCartPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Ecommerce />} />
        <Route path="/shoppingCartPage" element={<ShoppingCartPage />} />
      </Routes>
    </Router>
  );
}

export default App;
