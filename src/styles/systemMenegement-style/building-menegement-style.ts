import styled from "styled-components";

//빌딩 정보 style
export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const Top = styled.div`
  width: 97%;
  height: 30%;
`;

export const TopHeight = {
  height: 290,
  "@media (min-width:1920px)": {
    height: 500,
  },
};

//빌딩 Form style
export const Bottom = styled.div`
  width: 95%;
  height: 60%;
  display: flex;
  overflow: scroll;
  @media (min-width: 1920px) {
    overflow: hidden;
  }
  @media (min-width: 1920px) {
    width: 97%;
  }
`;
