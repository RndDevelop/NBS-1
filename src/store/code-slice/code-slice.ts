import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import produce from "immer";

interface ICode {
  codeValue: string;
  codeName: string;
}

export interface IPatternCode {
  parentCodeColumn: ICode;
}

export const initialState: IPatternCode = {
  parentCodeColumn: {
    codeValue: "",
    codeName: "",
  },
};

export const parentCodeColumnSlice = createSlice({
  name: "parentCodeColumn",
  initialState,
  reducers: {
    setUpParentCodeColumn: (state, action: PayloadAction<ICode>) => {
      return produce(state, (draft) => {
        draft.parentCodeColumn.codeValue = action.payload.codeValue;
        draft.parentCodeColumn.codeName = action.payload.codeName;
      });
    },
  },
});

export default parentCodeColumnSlice.reducer;
export const { setUpParentCodeColumn } = parentCodeColumnSlice.actions;
