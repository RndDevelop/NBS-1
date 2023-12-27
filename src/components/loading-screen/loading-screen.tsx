import * as S from "../../styles/page-style/loading-screen.styled";
// 페이지 렌더링시 보여주는 페이지
export default function LoadingScreen() {
  return (
    <div>
      <S.Wrapper>
        <S.Text>Loading...</S.Text>
      </S.Wrapper>
    </div>
  );
}
