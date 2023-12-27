import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (min-width: 360px) and (max-width: 1400px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`;

export const Right = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media screen and (min-width: 360px) and (max-width: 1400px) {
    width: 98%;
    height: 60%;
  }
`;

export const RightContents = styled.div`
  width: 98%;
  height: 100%;
  padding-top: 2%;
  overflow: hidden;
`;

//권한그룹 디테일
export const Left = styled.div`
  width: 38%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;

  @media screen and (max-width: 1920px) {
    margin-top: 1.5%;
    height: 90%;
  }

  @media screen and (max-width: 2560px) {
    margin-top: 1.5%;
  }

  /* @media screen and (max-width: 760px) {
    width: 100%;
  }




  @media screen and (min-width: 360px) and (max-width: 1400px) {
    overflow: auto;
    width: 100%;
    height: 60%;
  } */
`;

export const LeftContents = styled.div`
  width: 98%;
  height: 100%;
  display: flex;
  justify-content: center;

  /* padding-top: 3.5%; */
`;
