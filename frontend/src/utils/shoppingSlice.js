import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  inCart: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = state.inCart.find(
        (product) => product.id === action.payload.id,
      );

      if (item) {
        // if the item is already in the cart
        if (item.quantity < item.inStock) {
          item.quantity += 1; // increase quantity
        }
      } else {
        // add a new item to the cart
        if (action.payload.inStock > 0) {
          state.inCart.push({
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            inStock: action.payload.inStock - 1,
            quantity: 1, // start with quantity 1
            imageSrc: action.payload.imageSrc,
          });
        }
      }
      toast.success(`${action.payload.name} added to cart`, {
        autoClose: 2000,
      });
    },
    removeFromCart(state, action) {
      const itemToRemove = state.inCart.find(
        (item) => item.id === action.payload,
      );
      state.inCart = state.inCart.filter((item) => item.id !== action.payload);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`, {
          autoClose: 2000,
        });
      }
    },
    increaseQuantity(state, action) {
      const item = state.inCart.find(
        (product) => product.id === action.payload,
      );

      if (item.quantity >= 0 && item.inStock > 0) {
        item.quantity += 1;
        item.inStock -= 1;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.inCart.find(
        (product) => product.id === action.payload,
      );

      if (item.quantity > 1 && item.inStock >= 0) {
        item.quantity -= 1;
        item.inStock += 1;
      }
    },
    clearCart(state) {
      state.inCart = [];
      toast.success("Cart cleared", {
        autoClose: 2000,
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = shoppingSlice.actions;
export default shoppingSlice.reducer;
