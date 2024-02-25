// themeActions.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  darkMode: false, // Initial theme state
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode; // Toggle dark mode state
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
