import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../../../type";

interface ProductsState {
  products: IProduct[];
  selectedProduct?: IProduct
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<IProduct["id"]>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    udpateProduct: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.map((c) => {
        if (c.id === action.payload.id) {
          return action.payload;
        } else {
          return c;
        }
      });
    },
    selectProduct: (state, action: PayloadAction<IProduct>) => {
      state.selectedProduct = action.payload;
    },
    removeSelectedProduct: (state) => {
      state.selectedProduct = undefined;
    },
  },
});

export const { addProduct, removeProduct, selectProduct, removeSelectedProduct, udpateProduct } = productsSlice.actions;

export default productsSlice.reducer;
