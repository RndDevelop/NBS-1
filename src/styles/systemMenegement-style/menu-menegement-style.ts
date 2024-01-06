import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media screen and (min-width: 360px) and (max-width: 1440px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100%;
  }
`;

export const Right = styled.div`
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    width: 60%;
    height: 100%;
  }

  @media screen and (min-width: 761px) and (max-width: 1440px) {
    width: 98%;
    height: 30%;
  }

  @media screen and (min-width: 360px) and (max-width: 760px) {
    width: 98%;
    height: 40%;
  }
`;

export const RightContents = styled.div`
  width: 98%;
  height: 100%;
  padding-top: 2%;
  /* overflow: hidden; */
`;

//권한그룹 디테일
export const Left = styled.div`
  width: 38%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1441px) and (max-width: 2560px) {
    margin-top: 2%;
    width: 50%;
    height: 95%;
  }

  @media screen and (min-width: 761px) and (max-width: 1440px) {
    margin-top: 2%;
    width: 98%;
    height: 32%;
  }
  @media screen and (min-width: 360px) and (max-width: 760px) {
    margin-top: 5%;
    width: 98%;
    height: 50%;
  }
`;

export const LeftContents = styled.div`
  width: 98%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: auto;
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

  /* overflow: hidden; */
  /* overflow-y: scroll; */
`;
