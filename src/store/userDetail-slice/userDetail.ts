import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IDetail {
  id: string;
}

export interface IDetailUser {
  detail: IDetail;
}

export const initialState: IDetailUser = {
  detail: {
    id: "",
  },
};

export const IDetailUserSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {
    setUpUserDetail: (state, action: PayloadAction<IDetail>) => {
      state.detail.id = action.payload.id;
    },
  },
});

export default IDetailUserSlice.reducer;
export const { setUpUserDetail } = IDetailUserSlice.actions;
