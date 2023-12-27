import { Fragment, useCallback, useState, useRef, useEffect } from "react";
import * as S from "../../../../styles/systemMenegement-style/menu-list-style";
import { products } from "../../../../asset/test-db/treeListdata";
import { Button } from "devextreme-react/button";
import {
  TreeList,
  Toolbar,
  Item,
  Scrolling,
  FilterRow,
  Column,
} from "devextreme-react/tree-list";
import DropDownButton from "devextreme-react/drop-down-button";
import { SystemCheck } from "../../../../asset/test-db/treeListdata";

export default function MenuList(props) {
  // 부모한테 받아오는 row 데이터
  const { dataGridItemKeys } = props;
  //ref 사용시 instance라는 객체를 사용할수 있고 커스텀 할때 꼭 사용해야 한다.
  const treeList = useRef(null);
  // 부모한테 받아오는 데이터를 스테이트로 보관한다.
  const [parentCodeColumn, setParentCodeColumn] = useState("");
  //선택한 로우 데이터를 가져온다. 여기 컴포넌트에서는 사용하지 않으나 추후에 사용할수 있기 때문
  // 사용시 TreeList에 Selcion mode를 Single로 맞추고 사용해야한다.
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  // 권한여부 수정한 데이터
  const [lisetData, setListData] = useState([]);
  // 시스템 선택
  const [system, setSystem] = useState("");

  //선택한 로우의 데이터 지금은 사용하지 않는다.
  const selectionChanged = useCallback((data) => {
    if (data.selectedRowsData.length === 0) {
      return;
    }
    setSelectedItemKeys(data.selectedRowsData);
  }, []);

  //체크박스 토글
  const toggleCheckBox = useCallback((e, data) => {
    if (e.target.checked === undefined) {
      return;
    }
    if (e.target.checked === true) {
      data["roll"] = e.target.checked;
      setListData((prev) => [...prev, data]);
    } else {
      data["roll"] = e.target.checked;
      setListData((prev) => [...prev, data]);
    }
    return;
  }, []);

  //TreeList에 커스텀 체크박스
  const customCheckBox = useCallback(
    (data) => {
      return (
        <input
          type="checkbox"
          defaultChecked={data.data.roll}
          onChange={(e) => toggleCheckBox(e, data.data)}
        />
      );
    },
    [toggleCheckBox]
  ); // 빈 배열을 사용하여 최초 렌더링 시에만 함수가 생성되도록 함

  //드랍다운 버튼
  const onDrobDownButtonClick = (e) => {
    if (e.itemData === undefined) {
      return;
    }
    setSystem(e.itemData.value);
  };

  useEffect(() => {
    setParentCodeColumn(
      `[${dataGridItemKeys.UserId}] ${dataGridItemKeys.GroupName}`
    );
    console.log(system);
  }, [dataGridItemKeys, lisetData, system]);

  return (
    <Fragment>
      <S.Wrapper>
        <S.Right>
          <div className="informer">
            <h3 className="count">메뉴목록</h3>
          </div>
          <TreeList
            ref={treeList}
            dataSource={products}
            itemsExpr="items"
            dataStructure="tree"
            keyExpr="id"
            parentIdExpr="parentId"
            autoExpandAll={true}
            focusedRowEnabled={true}
            hoverStateEnabled={true}
            selectNodesRecursive={true}
            selectedRowKeys={selectedItemKeys}
            onSelectionChanged={selectionChanged}
          >
            <Scrolling mode="standard" />
            <FilterRow visible={true} />
            <Column dataField="menuId" caption="메뉴ID" />
            <Column dataField="menuName" caption="메뉴이름" />
            <Column caption="권한여부" cellRender={customCheckBox} />

            <Toolbar>
              <Item location="before">
                <div className="informer" style={{ marginLeft: -10 }}>
                  <Button
                    className="send"
                    icon="check"
                    text={parentCodeColumn}
                  ></Button>
                </div>
              </Item>
              <Item location="before">
                <DropDownButton
                  text={system}
                  items={SystemCheck}
                  width={100}
                  onItemClick={onDrobDownButtonClick}
                />
              </Item>
              <Item location="after">
                <Button
                  name="Excel"
                  text="저장"
                  type="default"
                  stylingMode="contained"
                />
              </Item>
            </Toolbar>
          </TreeList>
        </S.Right>
      </S.Wrapper>
    </Fragment>
  );
}
