import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../services/api/login-api";

//로그인 타입 추론
interface ILogin {
  userId?: string;
  password?: string;
  system?: string;
}
// 사용할 객체 타입 추론
export interface IPersonState {
  user: ILogin;
}

//사용할 객체 타입 초기화
const initialState: IPersonState = {
  user: {
    userId: "",
    password: "",
    system: "",
  },
};

//store에 userId 저장 ( 다음에 필요한 정보가 있다면 store 저장하기위해 로직을 만듬)
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUpUser: (state, action: PayloadAction<ILogin>) => {
      state.user.userId = action.payload.userId;
      state.user.password = action.payload.password;
      state.user.system = action.payload.system;
    },
  },
});

export default loginSlice.reducer;
export const { setUpUser } = loginSlice.actions;

// interface IUserToken {
//   data: {
//     access_token: string;
//     refresh_token: string;
//   };
// }
// interface ILogin {
//   userId?: string;
//   password?: string;
//   data: {
//     access_token?: string;
//     refresh_token?: string;
//   };
// }

//비동기통신이 이루어지면서 store 에 저장할 리듀서 일반 리듀서는 사용하지 않는다 ( 이유 는 비동기통신으로 로그인 유저를 가져오기 때문에 extraReducers 를 사용한다)
// export const loginSlice = createSlice({
//   name: "login",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(loginUser.pending, (state) => {
//       state.user.userId = "";
//     });
//     builder.addCase(
//       loginUser.fulfilled,
//       (state, action: PayloadAction<IUserToken>) => {
//         console.log(action.payload);
//         // state.user.access_token = action.payload;
//       }
//     );
//   },
// });

// const response = await axios.post("/api/v1/auth/authenticate", baToken, {
//   headers: { Authorization: baToken },
// });
// return response.data as IUserToken;
