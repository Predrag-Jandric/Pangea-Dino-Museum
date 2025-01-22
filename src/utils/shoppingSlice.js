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
  reducers: {},
});

export const {} = shoppingSlice.actions;
export default shoppingSlice.reducer;
