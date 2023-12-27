import { Fragment } from "react";
import { useState, useRef, useEffect } from "react";

import DataGrid, {
  Column,
  FilterRow,
  Toolbar,
  Item,
  Export,
  Selection,
  Scrolling,
  Paging,
} from "devextreme-react/data-grid";
import * as S from "../../../../styles/systemMenegement-style/roll-menu-style";
import { roll } from "../../../../asset/test-db/roll";
import { Button } from "devextreme-react/button";
import { excel } from "../../../../components/excel/excel";
import MenuLsit from "./menu-list";

// 권한 메인 컴포넌트 이며 권한의 기본정보는 아래 DataGrid에서 조회되고 있고 권한의 대한 추가정보는 <RollDetailContainor> 컴포넌트에서 읽어 온다.
export default function RollMenuMenegement() {
  //데이터 그리드 ref를 사용해야 버튼 커스텀후 기능을 작성할수 있다.
  const dataGridRef = useRef(null);
  //선택한 아이템의 정보state
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  //클릭시 선택한 아이템의 정보
  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowsData[0]);
  };

  //선택한 아이템이 변경될때마다 페이지 리렌더링
  useEffect(() => {
    if (selectedItemKeys.length === 0) {
      setSelectedItemKeys(roll[0]);
    }
  }, [selectedItemKeys]);

  return (
    <Fragment>
      <S.Wrapper>
        <S.Right>
          <S.RightContents>
            {/*롤정보*/}
            <DataGrid
              ref={dataGridRef}
              dataSource={roll}
              showBorders={true}
              keyExpr="id"
              allowColumnReordering={true}
              onSelectionChanged={selectionChanged}
              hoverStateEnabled={true}
              focusedRowEnabled={true}
              defaultFocusedRowIndex={0}
            >
              <Scrolling rowRenderingMode="virtual"></Scrolling>
              <Paging defaultPageSize={7} />
              <FilterRow visible={true} />
              <Selection mode="single" />
              <Export enabled={true} allowExportSelectedData={true} />
              <Column dataField="id" caption="번호" />
              <Column dataField="UserId" caption="번호" />
              <Column dataField="GroupName" caption="사용자명" />
              <Column dataField="GroupInfo" caption="그룹" />
              <Column dataField="use" caption="직급" />
              <Toolbar>
                <Item location="before">
                  <div className="informer">
                    <h3 className="count">권한그룹목록</h3>
                  </div>
                </Item>
                <Item location="after">
                  <Button
                    name="Excel"
                    text="Excel"
                    type="success"
                    stylingMode="contained"
                    onClick={() => excel(dataGridRef)}
                  />
                </Item>
              </Toolbar>
            </DataGrid>
            {/*롤정보*/}
          </S.RightContents>
        </S.Right>
        <S.Left>
          <S.LeftContents>
            <MenuLsit dataGridItemKeys={selectedItemKeys} />
          </S.LeftContents>
        </S.Left>
      </S.Wrapper>
    </Fragment>
  );
}
