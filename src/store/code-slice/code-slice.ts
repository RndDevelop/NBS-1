import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import produce from "immer";

interface ICode {
  codeId: string;
  codeName: string;
}

export interface IPatternCode {
  parentCodeColumn: ICode;
}

export const initialState: IPatternCode = {
  parentCodeColumn: {
    codeId: "",
    codeName: "",
  },
};

export const parentCodeColumnSlice = createSlice({
  name: "parentCodeColumn",
  initialState,
  reducers: {
    setUpParentCodeColumn: (state, action: PayloadAction<ICode>) => {
      return produce(state, (draft) => {
        draft.parentCodeColumn.codeId = action.payload.codeId;
        draft.parentCodeColumn.codeName = action.payload.codeName;
      });
    },
  },
});

export default parentCodeColumnSlice.reducer;
export const { setUpParentCodeColumn } = parentCodeColumnSlice.actions;
