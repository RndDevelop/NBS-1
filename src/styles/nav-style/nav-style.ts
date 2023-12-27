import { Link } from "react-router-dom";
import MySvgComponent from "../../asset/navIcons/navIcons";
import { keyframes, styled, css } from "styled-components";

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  border: none;
`;

interface IselectedMenu {
  $isOpen: boolean;
  $isParentOpen: boolean;
  $isLength: number;
}

const slideDown = keyframes`
  from {
    transform: translateY(-10%);
  }
  to {
    transform: translateY(0%);
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(-10%); 
  }
  to {
    transform: translateY(-100%);
  }
`;

//메뉴 틀1
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: columns;
  align-items: center;
`;

//메뉴 틀2
export const MenuContainer = styled.div`
  display: flex;
  width: 95%;
  height: 100%;
  flex-direction: column;
`;

//전체 메뉴박스
export const MenuBottombox = styled.div`
  width: calc(100% - 0px);
  height: 100%;
  position: relative;
  box-sizing: content-box;
`;

const fadeIn = keyframes`
  from {
    opacity: 0.7;
  }
  to {
    opacity: 1;
  }
`;

export const SubMenuLabel = styled.div<IselectedMenu>`
  cursor: pointer;
  background-color: ${(props) =>
    props.$isParentOpen
      ? "transparent"
      : props.$isOpen
      ? "#387AFF"
      : "transparent"};
  color: ${(props) =>
    props.$isParentOpen ? "black" : props.$isOpen ? "white" : "#000000"};
  padding: 10px;
  border-radius: 25px;
  transition: background-color 0.1s ease;

  /*  */
  &:hover {
    background-color: ${(props) =>
      props.$isParentOpen
        ? "transparent"
        : props.$isOpen
        ? "#387AFF"
        : "transparent"};
    animation: ${(props) =>
      props.$isParentOpen
        ? css`
            ${fadeIn} 0.8s ease
          `
        : props.$isOpen
        ? css`
            ${fadeIn} 0.3s ease
          `
        : css`
            ${fadeIn} 0.8s ease
          `};
  }
  position: relative;

  @media screen and (min-width: 1920px) {
    font-size: 15px;
    width: 80%;
  }
`;
/* animation: ${(props) =>
    props.$isParentOpen
      ? css`
          ${slideUp} 0.3 ease
        `
      : css`
          ${slideDown} 0.3 ease
        `
      ? "#387AFF"
      : css`
          ${slideUp} 0.3 ease
        `}; */

//대메뉴 클릭시 중간 메뉴 슬라이드
export const SlideDownContainer1 = styled.div<IselectedMenu>`
  position: relative;
  overflow: hidden;
  color: #818991;
  height: ${(props) => (props.$isOpen ? "100%" : "0px")};
  transition: height 0.3s ease;
`;

export const TreeItemContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;

export const BottomBorder = styled.div`
  position: absolute;
  width: 80%;
  border-bottom: 2px solid #dfe2ea; // borderBottom 스타일 설정
  align-self: center; // 수직 가운데 정렬
`;

//중메뉴 클릭시 하위 메뉴 슬라이드
export const SlideDownContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const childBox = styled.div<IselectedMenu>`
  display: flex;
  justify-content: "center";
  align-items: center;
  width: 100%;
  flex-direction: column;
  animation: ${(props) =>
    props.$isOpen
      ? css`
          ${slideDown} 0.3s  ease
        `
      : css`
          ${slideUp} 0.3s  ease
        `};
`;
