import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ISystemSelected {
  systemValue: string;
}

interface ISystemSelectedState {
  systemSelected: ISystemSelected;
}

export const initialState: ISystemSelectedState = {
  systemSelected: {
    systemValue: "",
  },
};

export const systemSelectedSlice = createSlice({
  name: "systemSelectedSlice",
  initialState,
  reducers: {
    setUpSystem: (state, action: PayloadAction<ISystemSelected>) => {
      state.systemSelected.systemValue = action.payload.systemValue;
    },
  },
});

export default systemSelectedSlice.reducer;
export const { setUpSystem } = systemSelectedSlice.actions;
