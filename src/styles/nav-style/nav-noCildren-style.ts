import { styled } from "styled-components";
import { Link } from "react-router-dom";

export const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  border: none;
`;

interface IselectedMenu {
  $selectedMenu: boolean;
}

interface IExpanded {
  $expanded: boolean;
}

interface ISelectEndMenu {
  $selectEndMenu: boolean;
}

//메뉴 틀1
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

//메뉴 틀2
export const MenuContainer = styled.ul`
  width: 90%;
  height: 98%;
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
`;
//토글박스와 메뉴 사이
export const MenuMarginBox = styled.div`
  margin-top: 10px;
  @media screen and (min-width: 360px) and (max-width: 1440px) {
    display: block;
  }
  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    display: none;
  }
`;

//전체 메뉴박스
export const MenuBottombox = styled.div`
  /* width: calc(100% - 0px); */
  margin-bottom: 10px;
  position: relative; /* 상대적 위치 지정 */
  font-size: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

//메뉴 bottomLine
export const BottomBorder = styled.div`
  position: absolute;
  left: 0;
  bottom: -5px;
  width: 100%;
  height: 2px;
  border-bottom: 1px solid var(--color-line-panel);
`;

//시스템 토글 박스
export const SystemToggleSub = styled.div`
  width: 100%;
  height: 50px;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    display: block;
  }
  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    display: none;
  }
`;

//토글박스
export const SystemToggleBox = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
`;
//토글박스 취소박스
export const SystemCancelSub = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: center;
`;
//토글박스 취소박스
export const SystemCancelEmty = styled.div`
  width: 50%;
  height: 100%;
`;
//토글박스 취소박스
export const SystemCancel = styled.div`
  width: 50%;
  height: 100%;
`;
//토글박스 취소아이콘
export const SystemCancelIcon = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/image/ic_close.png");
  background-size: 20%;
  background-repeat: no-repeat;
  background-position: right;
`;

//대메뉴 클릭시 중간 메뉴 슬라이드
export const SlideDownContainer1 = styled.div<IselectedMenu>`
  overflow: hidden;
  position: relative;
  max-height: ${(props) => (props.$selectedMenu ? "100%" : "100%")};
  transition: max-height 0.3s ease-in-out; /* height에 대한 트랜지션 효과 */
  color: #818991;
`;

//중메뉴 클릭시 하위 메뉴 슬라이드
export const SlideDownContainer = styled.div<IExpanded>`
  position: relative;
  overflow: hidden;
  max-height: ${(props) => (props.$expanded ? "100%" : "0")};
  transition: max-height 0.2s ease-in-out; /* height에 대한 트랜지션 효과 */
`;

//대메뉴 박스
export const MenuBox = styled.div`
  border-radius: 40px;
  padding: 0 15px;
  font-family: SamsungOneKoreanOTF_700;
  font-size: 15px;
  height: 38px;
  line-height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-lnb-title);
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s; /* 트랜지션 효과 추가 */
  &:hover {
    color: var(--color-button-primary);
  }

  &:active {
  }
`;

export const SubIConSubBox = styled.div`
  width: 15%;
  height: 100%;
  margin-right: -15px;
`;

//대메뉴  화살 아이콘
export const SubIconBox = styled.div<IselectedMenu>`
  width: 100%;
  height: 100%;
  background-image: ${(props) =>
    props.$selectedMenu
      ? `url("/image/arrow_up.png")`
      : `url("/image/arrow_down.png")`};
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: right;
`;

//중메뉴 박스
export const SubMenuBox = styled.div`
  font-size: 15px;
  font-weight: 400;
  padding: 10px 15px;
  border-radius: 40px;
  height: 38px;
  display: flex;
  align-items: center;
  line-height: 1;
  word-break: break-all;
  color: var(--color-text-lnb-sub);
  cursor: pointer;

  &:hover {
    background-color: #dfe2ea;
  }
  &:active {
    background-color: var(--color-selected-bg-table-item);
  }
`;

//서브 메뉴 가장 큰박스
export const SubMenuContainer = styled.ul`
  width: 100%;
  margin-left: 5%;
`;

//서브 메뉴
export const SubMenuItem = styled.li<ISelectEndMenu>`
  list-style: none;
  padding: 10px 7px;
  font-size: 15px;
  height: 38px;
  font-weight: 400;
  display: flex;
  align-items: center;
  font-family: "SamsungOneKoreanOTF_400";
  color: var(--color-text-lnb-sub);
  background-color: ${(props) =>
    props.$selectEndMenu ? "var(--color-button-primary)" : ""};

  color: ${(props) => (props.$selectEndMenu ? "var(--color-white)" : "")};
  cursor: pointer;

  &:hover {
    color: ${(props) => (props.$selectEndMenu ? "" : "var(--color-text-sub2)")};
  }
`;

export const MenuIconBox = styled.div`
  height: 100%;
`;
export const MenuContents = styled.div`
  height: 90%;
  margin-left: 3%;
`;
