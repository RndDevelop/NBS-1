import { createSlice, isAction, PayloadAction } from "@reduxjs/toolkit";

export interface IFrame {
  applicationName: string;
  menuId: string;
  sortOdr: number;
  menuUrl: string;
  menuName: string;
}

export interface IFrameData {
  menuInfo: IFrame;
}

const initialState: IFrameData = {
  menuInfo: {
    applicationName: "",
    menuId: "",
    sortOdr: 0,
    menuUrl: "",
    menuName: "",
  },
};

export const iframeSlice = createSlice({
  name: "iframeSlice",
  initialState,
  reducers: {
    setUpIframe: (state, action: PayloadAction<IFrame>) => {
      console.log(action.payload);
      state.menuInfo.applicationName = action.payload.applicationName;
      state.menuInfo.menuId = action.payload.menuId;
      state.menuInfo.menuName = action.payload.menuName;
      state.menuInfo.sortOdr = action.payload.sortOdr;
      state.menuInfo.menuUrl = action.payload.menuUrl;
    },
  },
});

export default iframeSlice.reducer;
export const { setUpIframe } = iframeSlice.actions;
