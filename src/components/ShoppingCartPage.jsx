import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../utils/shoppingSlice";
import { ToastContainer } from "react-toastify";

function ShoppingCartPage() {
  const cart = useSelector((state) => state.shopping.inCart);
  const dispatch = useDispatch();

  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Shopping Cart</h1>
      <ToastContainer />
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <p>In Stock: {item.inStock}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className="rounded bg-green-500 px-2 py-1 text-white"
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className="rounded bg-yellow-500 px-2 py-1 text-white"
                >
                  -
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="rounded bg-red-500 px-2 py-1 text-white"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="mt-4 text-right">
            <h2 className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </h2>
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => dispatch(clearCart())}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Clear Cart
            </button>
            <button
              onClick={() => alert("Checkout feature not present !")}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCartPage;
