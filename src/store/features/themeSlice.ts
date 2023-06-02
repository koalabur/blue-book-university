import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "..";

interface ThemeState {
  isLight: boolean;
}

const initialState: ThemeState = {
  isLight: true,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.isLight = !state.isLight;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme.isLight;

export default themeSlice.reducer;
