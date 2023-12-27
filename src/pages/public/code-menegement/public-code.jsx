//최초 작성자 박경찬
import { Fragment } from "react";
import * as S from "../../../styles/publicCode-style/public-code-styled";
import ParenGrid from "./parent-grid";
import ChildGrid from "./child-grid";

// 공통코드 컴포넌트
export default function PublicCode() {
  return (
    <Fragment>
      <S.publicWrapper>
        <S.left>
          <S.ParentCodeBox1>
            <ParenGrid />
          </S.ParentCodeBox1>
          <S.Between />
          <S.ParentCodeBox2>
            <ChildGrid />
          </S.ParentCodeBox2>
        </S.left>
      </S.publicWrapper>
    </Fragment>
  );
}
