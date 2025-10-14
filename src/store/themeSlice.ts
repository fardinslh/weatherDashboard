import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { themeKey } from "src/constants/localStorageKeys";
import type { ThemeMode } from "src/types";

type ThemeState = {
  mode: ThemeMode;
};

const getStoredMode = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }
  const stored = window.localStorage.getItem(themeKey) as ThemeMode | null;
  return stored === "light" || stored === "dark" ? stored : "light";
};

const saveMode = (mode: ThemeMode) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(themeKey, mode);
  }
};

const initialMode = getStoredMode();

const initialState: ThemeState = {
  mode: initialMode,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      saveMode(state.mode);
    },

    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      saveMode(action.payload);
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
