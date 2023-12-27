import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUnUser {
  UserId: string;
  UserName: string;
  Group: string;
  Rank: string;
}

export interface IGroupInfo {
  groupUnUser: IUnUser[];
}

export const initialState: IGroupInfo = {
  groupUnUser: [],
};

export const unincludedUser = createSlice({
  name: "unincludedUser",
  initialState,
  reducers: {
    setUninCludedUser: (state, action: PayloadAction<IUnUser>) => {
      const index = state.groupUnUser.findIndex(
        (user) => user.UserId === action.payload.UserId
      );
      if (index !== -1) {
        // 찾은 경우에만 업데이트
        state.groupUnUser[index] = { ...action.payload };
      } else {
        // 찾지 못한 경우, 새로운 요소를 추가하거나 다른 로직을 수행할 수 있음
        state.groupUnUser.push({ ...action.payload });
      }
    },
    removeUnincludedUser: (state, action: PayloadAction<IUnUser>) => {
      state.groupUnUser = state.groupUnUser.filter(
        (user) => user.UserId === action.payload.UserId
      );
    },
  },
});

export default unincludedUser.reducer;
export const { setUninCludedUser, removeUnincludedUser } =
  unincludedUser.actions;
