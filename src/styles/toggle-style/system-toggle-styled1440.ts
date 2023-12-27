import styled, { keyframes } from "styled-components";
interface IToggle {
  $isToggleOn: boolean;
}

export const SystemToggle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    display: "block"; /* 화면이 작아질 때 글자 크기를 조절합니다. */
  }
`;

export const SystemToggleWrapper = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SystemToggleBox = styled.div`
  width: 100%;
  height: 75%;
  border-radius: 20px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  @media screen and (min-width: 100px) {
    font-size: 10px; /* 화면이 작아질 때 글자 크기를 조절합니다. */
  }
  @media screen and (min-width: 600px) {
    font-size: 12px; /* 화면이 작아질 때 글자 크기를 조절합니다. */
  }
  @media screen and (min-width: 960px) {
    font-size: 15px; /* 화면이 작아질 때 글자 크기를 조절합니다. */
  }
`;

export const ToggleBems = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d3d6dc80;
  cursor: pointer;
  color: #777f87;
`;

export const ToggleBas = styled.div`
  width: 50%;
  height: 100%;
  background-color: #d3d6dc80;
  cursor: pointer;
`;

//토글 버튼
export const Toggle = styled.div<IToggle>`
  width: 50%;
  height: 75%;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
  border-radius: 20px;
  transition: right 0.5s;
  margin-right: 5%;
  right: ${(props) => (props.$isToggleOn ? "0%" : "40%")};
  /* left: ${(props) => (props.$isToggleOn ? "45%" : "0%")}; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

//토글 텍스트
export const ToggleTextBems = styled.div<IToggle>`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777f87;
  border: none;
  border-radius: 20px;
  opacity: ${(props) => (props.$isToggleOn ? 0 : 1)};
  transition: opacity 0.25s linear; //0.5초 동안 opacity가 변할 때 애니메이션 적용
  cursor: pointer;
  font-size: 12px;
`;
//토글 텍스트
export const ToggleTextBas = styled.div<IToggle>`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #777f87;
  border: none;
  border-radius: 20px;
  opacity: ${(props) => (props.$isToggleOn ? 1 : 0)};
  transition: opacity 0.25s linear; //0.5초 동안 opacity가 변할 때 애니메이션 적용
  cursor: pointer;
  font-size: 12px;
`;
