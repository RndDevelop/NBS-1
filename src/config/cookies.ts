import { Cookies } from "react-cookie";

//인스턴스 쿠키
const cookies = new Cookies();

//쿠키 저장
export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value);
};
//쿠키 가져옴
export const getCookie = (name: string) => {
  return cookies.get(name);
};
//쿠키 삭제
export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
