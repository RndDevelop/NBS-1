import { styled } from "styled-components";
import sizeConfig from "../../config/sizeConfig";
import { isCancel } from "axios";

interface ICancel {
  $isCancel: boolean;
}

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  height: 50px;
`;

export const BottomContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const SideContainer = styled.div<ICancel>`
  background-color: var(--color-background);
  border-right: 1px solid var(--color-line-panel);
  height: calc(100vh - var(--header_height));
  z-index: 1;
  overflow-y: auto;
  transition: width 0.3s ease-in-out;

  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    width: 270px;
  }

  @media screen and (min-width: 761px) and (max-width: 1440px) {
    width: 290px;
  }

  @media screen and (min-width: 471px) and (max-width: 760px) {
    width: ${({ $isCancel }) =>
      $isCancel ? "0" : "350px"}; /* Conditionally set width */
  }

  @media screen and (min-width: 120px) and (max-width: 470px) {
    width: ${({ $isCancel }) =>
      $isCancel ? "0" : "100%"}; /* Conditionally set width */
  }

  /* 스크롤바를 숨기고 마우스 호버 시 나타나도록 설정 */
  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--color-line-default);
    border-radius: 6px;
    border: 3px solid var(--color-line-sub);
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: var(--color-line-sub);
  }

  &::-webkit-scrollbar-track {
    background-color: #eee;
    border-radius: 6px;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: white; */
  /* background-color: red; */
`;

export const MuiBox = {
  width: sizeConfig.sidebar.width,
  flexShrink: 0,
};
