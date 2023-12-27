import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface IGlobal {
  isDark: boolean;
  isLoading: boolean;
}

export interface IGlobalState {
  globalState: IGlobal;
}

const initialState: IGlobalState = {
  globalState: {
    isDark: false,
    isLoading: true,
  },
};

export const GlobalStyleSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    theme: (state, action: PayloadAction<{ isDark: boolean }>) => {
      state.globalState.isDark = action.payload.isDark;
    },
    setLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.globalState.isLoading = action.payload.isLoading;
    },
  },
});

export default GlobalStyleSlice.reducer;
export const { theme, setLoading } = GlobalStyleSlice.actions;
