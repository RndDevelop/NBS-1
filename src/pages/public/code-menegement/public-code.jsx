//최초 작성자 박경찬
import { Fragment, useState, useEffect } from "react";
import * as S from "../../../styles/publicCode-style/public-code-styled";
import ParenGrid from "./parent-grid";
import ChildGrid from "./child-grid";
import { useQuery } from "react-query";
import { commonCodeQuery } from "../../../services/api/commencode-api";
// 공통코드 컴포넌트
export default function PublicCode() {
  // 데이터 가공 스테이트
  const [transformData, setTransformData] = useState([]);

  //부모코드 호출
  const { data, isLoading, refetch } = useQuery(
    ["commonCode"],
    async () => await commonCodeQuery(),
    {
      refetchInterval: false,
    }
  );

  useEffect(() => {
    if (data && !isLoading) {
      const transformedData = data.map((item, i) => ({
        codeId: item.codeId,
        codeName: item.codeName,
        prntcodeId: item.prntcodeId,
        sortOdr: item.sortOdr,
        useYn: item.useYn === "Y" ? 1 : 2,
      }));
      setTransformData(transformedData);
    }
  }, [isLoading, data]);

  return (
    <Fragment>
      <S.publicWrapper>
        <S.left>
          <S.ParentCodeBox1>
            <S.ParentGridBox>
              <ParenGrid data={!isLoading && transformData} refetch={refetch} />
            </S.ParentGridBox>
          </S.ParentCodeBox1>

          <S.ParentCodeBox2>
            <S.ChildGridBox>
              <ChildGrid />
            </S.ChildGridBox>
          </S.ParentCodeBox2>
        </S.left>
      </S.publicWrapper>
    </Fragment>
  );
}
