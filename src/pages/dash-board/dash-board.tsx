import { Fragment } from "react";
import styled from "styled-components";

const ImageBox = styled.div`
  width: 90%;
  height: 90%;
  background-image: url("/image/DashBoard.png");
  background-size: cover; /* 또는 다른 값을 사용하여 이미지 크기 조정 */
  background-position: center;
  background-repeat: no-repeat; /* 이미지 반복 없음 */
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export default function DashBoard() {
  return (
    <Fragment>
      <Wrapper>
        <ImageBox />
      </Wrapper>
    </Fragment>
  );
}
