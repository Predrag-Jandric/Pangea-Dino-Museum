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
import Title from "./Title.jsx";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import Button from "../utils/Button.jsx";

function ShoppingCartPage() {
  const cart = useSelector((state) => state.shopping.inCart);
  const dispatch = useDispatch();
  const { isOpen, openModal, closeModal, handleClickOutside } = useModal();

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handleCheckout = () => {
    openModal();
  };

  const handleClearCart = () => {
    localStorage.removeItem("dinoCart");
    dispatch(clearCart());
  };

  return (
    <section className="flex min-h-screen flex-col items-center bg-bgcolor p-6 pt-16 font-body text-dark">
      <ToastContainer />

      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-center">
          <Title className="" title="Shopping cart is empty" />

          <Link
            to="/"
            className="flex w-fit flex-row items-center gap-3 rounded-custom border-2 border-primary/60 p-3 text-lg text-primary transition-all hover:bg-primary/5 disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50 disabled:hover:bg-transparent"
          >
            <IoIosArrowBack className="size-5 font-extrabold" />
            <span>Back to Homepage</span>
          </Link>
        </div>
      ) : (
        <>
          <article className="mb-10 flex w-full max-w-5xl items-center justify-start">
            <div className="flex items-center justify-center gap-3">
              <Link
                to="/"
                className="rounded-custom border-2 border-primary/60 p-3 text-lg text-primary transition-all hover:bg-primary/5 disabled:cursor-not-allowed disabled:border-gray-400/50 disabled:text-gray-400/50 disabled:hover:bg-transparent"
              >
                <IoIosArrowBack className="size-5 font-extrabold" />
              </Link>
              {/* <span>Back</span> */}
            </div>

            <Title className="mx-auto !pb-0" title="Your Shopping Cart" />
          </article>
          <div className="w-full max-w-5xl space-y-6">
            {/* table Layout */}
            <div className="overflow-x-auto rounded-custom border border-grayOne/50 shadow-custom transition hover:shadow-xl">
              <table className="w-full overflow-hidden rounded-custom bg-white shadow-custom">
                <thead className="bg-bgcolortwo">
                  <tr>
                    <th className="p-3 text-left text-[1.05rem] font-semibold">
                      Product
                    </th>
                    <th className="p-3 text-center text-[1.05rem] font-semibold">
                      Price
                    </th>
                    <th className="p-3 text-center text-[1.05rem] font-semibold">
                      Quantity
                    </th>
                    <th className="p-3 text-center text-[1.05rem] font-semibold">
                      Total
                    </th>
                    <th className="p-3 text-center text-[1.05rem] font-semibold"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="">
                      {/* product */}
                      <td className="flex items-center gap-3 p-3">
                        <img
                          src={item.imageSrc}
                          alt="dino"
                          className="size-28 object-contain"
                        />
                        <span className="min-w-[16rem] break-words">
                          {item.name}
                        </span>
                      </td>

                      {/* orice */}
                      <td className="p-3 text-center">
                        ${item.price.toFixed(2)}
                      </td>

                      {/* quantity btns */}
                      <td className="p-3 text-center">
                        <div className="mx-auto flex w-fit items-center justify-center border border-grayOne">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            disabled={item.quantity === 1}
                            className={`flex h-8 w-8 items-center justify-center border-r border-grayOne font-extrabold transition ${item.quantity === 1 && "cursor-not-allowed text-dark/30 bg-gray-200"}`}
                          >
                            −
                          </button>
                          <span className="w-10">{item.quantity}</span>

                          <button
                            disabled={item.inStock === 0}
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className={`flex h-8 w-8 items-center justify-center border-l border-grayOne font-extrabold transition ${item.inStock === 0 && "cursor-not-allowed text-dark/30 bg-gray-200"}`}
                          >
                            +
                          </button>
                        </div>
                      </td>

                      {/* total Price */}
                      <td className="p-3 text-center">
                        ${(item.price * item.quantity).toFixed(2)}
                      </td>

                      {/* x btn to remove individual cart item */}
                      <td className="p-3 text-center">
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                        >
                          <IoCloseOutline className="size-10 p-1 text-dark/60" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* cart Summary */}
            <div className="flex justify-between">
              <button
                onClick={handleClearCart}
                className="hidden rounded-custom border border-primary bg-transparent px-4 py-2 font-medium text-primaryHover shadow-custom transition hover:bg-primary hover:text-white sm:block"
              >
                Clear Cart
              </button>
              <h2 className="ml-auto text-2xl">
                Total:{" "}
                <span className="ml-4 sm:ml-20">${totalPrice.toFixed(2)}</span>
              </h2>
            </div>

            <hr className="ml-auto w-56 border border-dark/15 sm:w-80" />

            {/* checkout and clear cart btns */}
            <div className="flex w-full flex-col gap-3 sm:flex sm:flex-row sm:justify-end">
              <Button onClick={handleCheckout} className="w-full sm:w-56">
                Checkout
              </Button>
              <button
                onClick={handleClearCart}
                className="rounded-custom border border-primary bg-transparent px-4 py-2 font-medium text-primaryHover shadow-custom transition hover:bg-primary hover:text-white sm:hidden"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      )}

      {/* modal */}
      {isOpen && (
        <Modal
          content={
            <div className="mt-5 flex flex-col gap-10 text-center">
              <h1 className="text-xl">Checkout feature is not implemented.</h1>
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
