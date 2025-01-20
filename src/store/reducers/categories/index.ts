import { ICategory } from "./../../../type/index";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface CategoriesState {
  categories: ICategory[];
  selectedCategory?: ICategory;
}

const initialState: CategoriesState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories.push(action.payload);
    },
    removeCategory: (state, action: PayloadAction<ICategory["id"]>) => {
      state.categories = state.categories.filter(
        (p) => p.id !== action.payload
      );
    },
    udpateCategory: (state, action: PayloadAction<ICategory>) => {
      state.categories = state.categories.map((c) => {
        if (c.id === action.payload.id) {
          return action.payload;
        } else {
          return c;
        }
      });
    },
    selectCategory: (state, action: PayloadAction<ICategory>) => {
      state.selectedCategory = action.payload;
    },
    removeSelectedCategory: (state) => {
      state.selectedCategory = undefined;
    },
  },
});

export const {
  addCategory,
  removeCategory,
  selectCategory,
  udpateCategory,
  removeSelectedCategory,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
