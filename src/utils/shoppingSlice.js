import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  inCart: [
    {
      id: 1,
      name: "Triceratops",
      price: 20.56,
      inStock: 5,
      quantity: 2,
    },
  ],
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
        } else {
          console.warn("Stock limit reached");
        }
      } else {
        // add a new item to the cart
        if (action.payload.inStock > 0) {
          state.inCart.push({
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            inStock: action.payload.inStock,
            quantity: 1, // start with quantity 1
          });
        } else {
          console.warn("Out of stock");
        }
      }
    },
    removeFromCart(state, action) {
      state.inCart = state.inCart.filter((item) => item.id !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.inCart.find(
        (product) => product.id === action.payload,
      );

      if (item) {
        if (item.quantity < item.inStock) {
          item.quantity += 1;
        } else {
          console.warn("Stock limit reached");
        }
      }
    },
    decreaseQuantity(state, action) {
      const item = state.inCart.find(
        (product) => product.id === action.payload,
      );

      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          console.warn("Cannot reduce quantity below 1");
        }
      }
    },
    clearCart(state) {
      state.inCart = [];
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
