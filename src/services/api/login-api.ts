import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getCookie, removeCookie, setCookie } from "../../config/cookies";

//axios 디폴트로 정함
axios.defaults.baseURL = "http://222.99.194.215:8080";
axios.defaults.withCredentials = false;
axios.defaults.headers.common["Authorization"] = `Bearer ${getCookie(
  "accessToken"
)}`;

//로그인 타입
interface ILogin {
  userId?: string;
  password?: string;
  system?: string;
}

//유저 토큰 타입
interface IUserToken {
  data: {
    access_token: string;
    refresh_token: string;
  };
}

//로그인 비동기통신
export const loginUser = createAsyncThunk(
  "login",
  async (user: ILogin, thunkAPI) => {
    const baToken = "Basic " + window.btoa(user.userId + ":" + user.password);

    try {
      const response = await axios
        .post("/api/v1/auth/authenticate", baToken, {
          headers: { Authorization: baToken, menu: "NBSZ0000" },
        })
        .then((res: IUserToken) => {
          // 성공
          //토큰 쿠키 저장
          const accessToken = res.data.access_token;
          const refreshToken = res.data.refresh_token;

          //사용자 토큰
          setCookie("accessToken", accessToken);
          //사용자 리프레쉬 토큰
          setCookie("refreshToken", refreshToken);

          return res.data;
        })

        //실패
        .catch((error) => console.log(error));
      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

//리프레쉬 토큰 비동기통신
export const refreshToken = createAsyncThunk(
  "refreshToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios
        .post("/api/v1/auth/refresh-token", null, {
          headers: { menu: "NBSXA010", Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const accessToken = res.data.access_token;
          const refreshToken = res.data.refresh_token;

          setCookie("accessToken", accessToken);
          setCookie("refreshToken", refreshToken);

          return res.data;
        })
        .catch((error: AxiosError) => {
          return error.message;
        });

      // setCookie("accessToken", response.data.access_token);
      // setCookie("refreshToken", response.data.refresh_token);
      // console.log(response, "refresh_Token");
      // return response.data; // 여기서 반환하는 데이터 타입은 any로 지정하거나 실제 반환되는 데이터 타입
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러가 발생한 경우
        return rejectWithValue(error.message);
      } else {
        // 다른 에러가 발생한 경우
        throw error;
      }
    }
  }
);
