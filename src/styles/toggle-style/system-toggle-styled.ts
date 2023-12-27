import styled, { keyframes } from "styled-components";
interface IToggle {
  $isToggleOn: boolean;
  $userSystem: string;
}

export const SystemToggle = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 360px) and (max-width: 1440px) {
    justify-content: flex-start;
  }
`;

export const SystemToggleWrapper = styled.div`
  width: 130px;
  display: flex;
  align-items: center;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    justify-content: flex-start;
  }

  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    justify-content: center;
  }
`;

export const SystemToggleBox = styled.div`
  width: 90%;
  height: 36px;
  border-radius: 18px;
  padding: 4px;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-color: var(--color-toggle-dashboard-bg);
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
  color: var(--color-toggle-title);
  cursor: pointer;
  font-family: SamsungOneKoreanOTF_400;
  font-size: 14px;
  line-height: 20px;
`;

export const ToggleBas = styled.div`
  width: 50%;
  height: 100%;
  color: var(--color-toggle-title);
  cursor: pointer;
  font-family: SamsungOneKoreanOTF_400;
  font-size: 14px;
  line-height: 20px;
`;

//토글 버튼
export const Toggle = styled.div<IToggle>`
  width: 45%;
  height: 75%;
  background-color: var(--color-toggle-dashboard-button-bg);
  font-family: SamsungOneKoreanOTF_600;
  line-height: 20px;
  color: var(--color-toggle-title);
  position: absolute;
  z-index: 1;
  border-radius: 14px;
  transition: right 0.5s;
  /* margin-right: 3px; */
  padding: 4px 12px;
  right: ${(props) =>
    props.$userSystem === "" ? "50%" : props.$isToggleOn ? "50%" : "5%"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

//토글 텍스트
export const ToggleTextBems = styled.div<IToggle>`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 20px;
  opacity: ${(props) => (props.$isToggleOn ? 1 : 0)};
  transition: opacity 0.25s linear; //0.5초 동안 opacity가 변할 때 애니메이션 적용
  cursor: pointer;
`;
//토글 텍스트
export const ToggleTextBas = styled.div<IToggle>`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;

  border: none;
  border-radius: 20px;
  opacity: ${(props) => (props.$isToggleOn ? 0 : 1)};
  transition: opacity 0.25s linear; //0.5초 동안 opacity가 변할 때 애니메이션 적용
  cursor: pointer;
`;
