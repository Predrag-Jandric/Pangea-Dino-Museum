import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../utils/shoppingSlice";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Modal from "../utils/Modal.jsx";
import useModal from "../utils/useModal.jsx";

function ShoppingCartPage() {
  const cart = useSelector((state) => state.shopping.inCart);
  const dispatch = useDispatch();

  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  console.log(cart);
  return (
    <section className="bg-dark min-h-screen p-4">
      <div className="mb-5">
        <Link
          to="/"
          className="border border-gray-800 p-2 text-primary hover:text-highlight"
        >
          👈 <span className="ml-2">Go back</span>
        </Link>
      </div>
      <h1 className="mb-4 text-center text-3xl font-bold text-highlight font-pressStart">
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
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="mx-auto flex items-center justify-between rounded-lg border border-secondary/30 bg-secondary/30 p-4 shadow-md"
            >
              <img
                src={item.imageSrc}
                alt="dino"
                className="size-32 object-contain"
              />
              <div className="mr-auto pl-5 flex flex-col md:flex-row md:items-center justify-between w-full">
                <div>
                  <h2 className="text-lg font-semibold text-highlight">
                    {item.name}
                  </h2>
                  <p className="text-light">
                    Price: <span className="text-highlight">${(item.price * item.quantity).toFixed(2)}</span>
                  </p>
                  <p className="text-light">Quantity: <span className="text-highlight">{item.quantity}</span></p>
                  <p className="text-light">In Stock: <span className="text-highlight">{item.inStock}</span></p>
                </div>
                <div className="flex space-x-2">
                  <button
                    disabled={item.inStock === 0}
                  onClick={() => dispatch(increaseQuantity(item.id))}
                    className={`flex h-8 w-8 items-center justify-center rounded transition ${
                    item.inStock === 0
                      ? "cursor-not-allowed bg-gray-400 text-gray-700"
                      : "bg-secondary text-light hover:bg-highlight"
                    }`}
                >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    disabled={item.quantity === 1}
                  className={`flex h-8 w-8 items-center justify-center rounded transition ${
                    item.quantity === 1
                      ? "cursor-not-allowed bg-gray-400 text-gray-700"
                      : "bg-secondary text-light hover:bg-highlight"
                    }`}
                >
                    -
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="w-fit rounded bg-primary px-2 text-light transition hover:bg-highlight"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <h2 className="text-xl font-bold text-highlight">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => dispatch(clearCart())}
              className="rounded bg-primary px-4 py-2 text-light transition duration-200 hover:bg-highlight"
            >
              Clear Cart
            </button>
            <button
              className="rounded bg-primary px-4 py-2 text-light hover:bg-highlight"
              onClick={openModal}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
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
