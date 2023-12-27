import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";

export interface IGroup {
  UserId: string;
  UserName: string;
  Group: string;
  Rank: string;
}

export interface IGroupInfo {
  groupUser: IGroup[];
}

export const initialState: IGroupInfo = {
  groupUser: [],
};

export const permissionGroupUser = createSlice({
  name: "permissionGroupUser",
  initialState,
  reducers: {
    setGroupUser: (state, action: PayloadAction<IGroup>) => {
      const index = state.groupUser.findIndex(
        (user) => user.UserId === action.payload.UserId
      );

      if (index !== -1) {
        // 찾은 경우에만 업데이트
        state.groupUser[index] = { ...action.payload };
      } else {
        // 찾지 못한 경우, 새로운 요소를 추가하거나 다른 로직을 수행할 수 있음
        state.groupUser.push({ ...action.payload });
      }
    },
  },
});

export default permissionGroupUser.reducer;
export const { setGroupUser } = permissionGroupUser.actions;
