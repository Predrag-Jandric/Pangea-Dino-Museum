import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCart,
} from "../utils/shoppingSlice";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "../utils/Modal.jsx";
import useModal from "../utils/useModal.jsx";
import { useEffect } from "react";

function ShoppingCartPage() {
  const cart = useSelector((state) => state.shopping.inCart);
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  // when loading component, if cart in state, save to localStorage
  // if no cart state (i.e. navigate directly to page), load stored cart as state
  useEffect(() => {
    if (cart.length) localStorage.setItem("dinoCart", JSON.stringify(cart));
    else {
      const dinoCart = localStorage.getItem("dinoCart");
      if (dinoCart) dispatch(setCart(JSON.parse(dinoCart)));
    }
  }, [cart]);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    openModal()
  };

  const handleClearCart = () => {
    localStorage.removeItem("dinoCart");
    dispatch(clearCart());
  };

  return (
    <section className="bg-dark min-h-screen p-6 flex flex-col items-center">
    {/* Back Button */}
    <div className="w-full max-w-3xl mb-6">
      <Link to="/" className="border border-gray-800 p-2 text-primary hover:text-highlight">
        👈 <span className="ml-2">Go back</span>
      </Link>
    </div>
  
    {/* Cart Title */}
    <h1 className="mb-6 text-center text-3xl font-bold text-highlight font-pressStart">
      Shopping Cart
    </h1>
  
    <ToastContainer />
  
    {cart.length === 0 ? (
      <div className="text-center">
        <p className="mb-4 text-lg text-gray-600">Your cart is empty.</p>
        <Link to="/" className="text-lg text-primary hover:text-highlight">
          Go back to Dino Shop
        </Link>
      </div>
    ) : (
      <div className="w-full max-w-3xl space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between rounded-lg border border-secondary/30 
            bg-secondary/30 p-4 shadow-md gap-4"
          >
            {/* Image */}
            <img src={item.imageSrc} alt="dino" className="w-24 h-24 object-contain" />
  
            {/* Item Info */}
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-highlight">{item.name}</h2>
              <p className="text-light">Price: <span className="text-highlight">${(item.price * item.quantity).toFixed(2)}</span></p>
              <p className="text-light">Quantity: <span className="text-highlight">{item.quantity}</span></p>
              <p className="text-light">In Stock: <span className="text-highlight">{item.inStock}</span></p>
            </div>
  
            {/* Action Buttons */}
            <div className="flex flex-col items-center space-y-2">
              <div className="flex space-x-2">
                <button
                  disabled={item.inStock === 0}
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className={`flex h-8 w-8 items-center justify-center rounded transition 
                  ${item.inStock === 0 ? "cursor-not-allowed bg-gray-400 text-gray-700" : "bg-secondary text-light hover:bg-highlight"}`}
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  disabled={item.quantity === 1}
                  className={`flex h-8 w-8 items-center justify-center rounded transition 
                  ${item.quantity === 1 ? "cursor-not-allowed bg-gray-400 text-gray-700" : "bg-secondary text-light hover:bg-highlight"}`}
                >
                  -
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="w-fit rounded bg-primary px-2 text-light transition hover:bg-highlight"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
  
        {/* Cart Summary */}
        <div className="mt-6 text-right">
          <h2 className="text-xl font-bold text-highlight">Total: ${totalPrice.toFixed(2)}</h2>
        </div>
  
        {/* Action Buttons */}
        <div className="mt-4 flex justify-between">
          <button
            onClick={handleClearCart}
            className="rounded bg-primary px-4 py-2 text-light transition duration-200 hover:bg-highlight"
          >
            Clear Cart
          </button>
          <button
            className="rounded bg-primary px-4 py-2 text-light hover:bg-highlight"
            onClick={handleCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    )}
  
    {/* Modal */}
    {isOpen && (
      <Modal
        content={
          <div className="flex flex-col gap-10 text-center">
            <h1 className="text-xl">You cannot really buy these items.</h1>
            <button
              onClick={closeModal}
              className="mt-4 rounded bg-primary px-4 py-2 text-white transition duration-200 hover:bg-primaryHover"
            >
              Close
            </button>
          </div>
        }
        onClose={closeModal}
        handleClickOutside={handleClickOutside}
      />
    )}
  </section>
  
  );
}

export default ShoppingCartPage;
