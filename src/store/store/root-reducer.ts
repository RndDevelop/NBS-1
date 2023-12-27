import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { GlobalStyleSlice } from "../global-slice/global-slice";
import { loginSlice } from "../login-slice/login-slice";
import { parentCodeColumnSlice } from "../code-slice/code-slice";
import { IDetailUserSlice } from "../userDetail-slice/userDetail";
import { permissionGroupUser } from "../group-slice/group-User-slice";
import { unincludedUser } from "../group-slice/group-unUser-slice";
import { systemSelectedSlice } from "../global-slice/system-slice";
import { iframeSlice } from "../menu-slice/iframe-slice";

// "detail",
//logalSotrage 에 저장할 리듀서 이름 정의
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "global",
    "login",
    "parentCodeColumn",
    "permissionGroupUser",
    "unincludedUser",
    "systemSelectedSlice",
    "iframeSlice",
  ],
};

//로직이 실행되는 리듀서 정의
export const rootReducer = combineReducers({
  global: GlobalStyleSlice.reducer,
  login: loginSlice.reducer,
  parentCodeColumn: parentCodeColumnSlice.reducer,
  detail: IDetailUserSlice.reducer,
  permissionGroupUser: permissionGroupUser.reducer,
  unincludedUser: unincludedUser.reducer,
  systemSelectedSlice: systemSelectedSlice.reducer,
  iframeSlice: iframeSlice.reducer,
});

//정의된 리듀서가 실행되는 코드
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
