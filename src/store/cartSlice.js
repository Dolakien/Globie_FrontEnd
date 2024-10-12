import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
  },
  reducers: {
    addProductToCart: (state, { payload }) => {
      const products = current(state.products);
      const findProduct = products.find(
        (it) => it.productId === payload.productId
      );

      if (findProduct) {
        state.products = products.map((it) =>
          it.productId === findProduct.productId
            ? { ...it, amount: it.amount + payload.amount }
            : it
        );
      } else {
        state.products.push(payload);
      }
    },
    removeProduct: (state, { payload }) => {
      const products = current(state.products);

      state.products = products.filter((it) => it.productId !== payload);
    },

    updateQuantity: (state, { payload }) => {
      const products = current(state.products);

      state.products = products.map((it) =>
        it.productId === payload.productId
          ? { ...it, amount: payload.amount }
          : it
      );
    },

    removeCart: (state) => {
      state.products = [];
    },
  },
});

export const { addProductToCart, removeProduct, updateQuantity, removeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
