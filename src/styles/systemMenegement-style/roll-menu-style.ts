import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

export const Right = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightContents = styled.div`
  width: 95%;
  height: 90%;
`;

//권한그룹 디테일
export const Left = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
`;

export const LeftContents = styled.div`
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
`;

//왼쪽 헤더 제목
export const LeftContentHeader = styled.div`
  width: 100%;
`;

//center arrow
export const LeftCenterContent = styled.div`
  width: 100%;
  height: 10%;

  display: flex;
  justify-content: center;
`;

//centerBox
export const LeftCenterArrowBox = styled.div`
  width: 5%;
  height: 5%;
`;

//RollGroupUserDetail
export const dataGridStyle = {
  width: "100%",
  editButton: { display: "none" },
};

//roll-Ungroup-user-detail
export const LeftBottomContent = styled.div`
  width: 95%;
  height: 44%;
  overflow: auto;
`;
