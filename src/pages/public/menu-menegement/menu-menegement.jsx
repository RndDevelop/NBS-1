import { Fragment } from "react";
import { useState, useRef, useCallback, useEffect } from "react";
import * as S from "../../../styles/systemMenegement-style/menu-menegement-style";
import { Button } from "devextreme-react/button";
import MenuDetailContainor from "./menu-detail-containor";
import {
  TreeList,
  Toolbar,
  Item,
  Scrolling,
  Selection,
  FilterRow,
  Column,
} from "devextreme-react/tree-list";
import { treeExcel } from "../../../components/excel/excel";
import { useQuery } from "react-query";
import { menuMenegementQuery } from "../../../services/api/menu-api";
import SelectBox from "../../../components/select/select";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
// 메뉴 메인 컴포넌트
export default function MenuMenegement() {
  //데이터 그리드 ref를 사용해야 버튼 커스텀후 기능을 작성할수 있다.
  const treeList = useRef(null);
  //선택한 아이템의 정보state
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [selectedSystem, setSelectedSystem] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  //펼쳐진 트리리스트 초기화
  const [text, setText] = useState("Collapse all");
  const [displayWith, setDisplayWith] = useState();
  const { width, height } = useOutletContext();

  //삭제된 아이디 관리
  // const [deletedItem, setDeletedItem] = useState();

  //클릭시 선택한 아이템의 정보
  const selectionChanged = (data) => {
    // setDeletedItem(data.currentDeselectedRowKeys[0]);
    setSelectedItemKeys(data.selectedRowsData[0]);
    setDisabled(false);
  };

  const { user } = useSelector((state) => state.login);

  const {
    data: menuData,
    isLoading,
    refetch,
  } = useQuery(
    ["menuMenegement", selectedSystem],
    async () => await menuMenegementQuery(selectedSystem),
    {
      refetchInterval: false,
      cacheTime: 3600000,
      staleTime: 60000,
    }
  );

  //트리리스트 초기화 함수
  const onExpandCollapse = useCallback(
    (e) => {
      let listInstance = treeList.current.instance;
      let expanding = text === "Expand All";
      listInstance.beginUpdate();
      listInstance.forEachNode(function (node) {
        expanding
          ? listInstance.expandRow(node.key)
          : listInstance.collapseRow(node.key);
      });
      listInstance.endUpdate();
      listInstance.repaint();
      let newText = expanding ? "Collapse all" : "Expand All";
      setText(newText);
    },
    [text]
  );

  //선택한 아이템이 변경될때마다 페이지 리렌더링
  useEffect(() => {
    if (success) {
      refetch();
      setSuccess(false);
    }
    if (width === 2560) {
      setDisplayWith(990);
    }

    if (width === 760) {
      setDisplayWith(700);
    }

    if (selectedSystem === "") {
      setSelectedSystem(user.system);
    }

    if (menuData) {
      if (selectedItemKeys !== undefined) {
        if (selectedItemKeys.length === 0) {
          setSelectedItemKeys(menuData[0]);
          return;
        }
      }
    }
  }, [selectedItemKeys, success, menuData, disabled, width]);

  return (
    <Fragment>
      <S.Wrapper>
        <S.Right>
          <S.RightContents>
            {/* <SelectBox
              setSelectedSystem={setSelectedSystem}
              selectedSystem={selectedSystem}
            /> */}
            {/*메뉴정보*/}
            <TreeList
              ref={treeList}
              dataSource={menuData}
              itemsExpr="items"
              dataStructure="tree"
              keyExpr="menuId"
              parentIdExpr="prntmenuId"
              autoExpandAll={true}
              focusedRowEnabled={true}
              onSelectionChanged={selectionChanged}
              hoverStateEnabled={true}
              wordWrapEnabled={true}
              showBorders={true}
              defaultFocusedRowIndex={0}
              selectionMode="single"
              height={displayWith}
              defaultSortOrder="asc"
            >
              <Scrolling mode="virtual" />
              <Selection mode="single" />
              <FilterRow visible={true} />
              <Column dataField="menuId" caption="메뉴ID" allowSorting={true} />
              <Column
                dataField="menuName"
                caption="메뉴이름"
                allowSorting={true}
              />
              <Column
                dataField="sortOdr"
                caption="정렬순서"
                alignment="left"
                allowSorting={true}
              />
              <Column
                dataField="useYnName"
                caption="사용여부"
                allowSorting={true}
              />
              <Toolbar>
                <Item location="before">
                  <div
                    style={{
                      marginLeft: -10,
                      width: 100,
                      height: 100,
                      marginBottom: "10px",
                    }}
                  >
                    <SelectBox
                      setSelectedSystem={setSelectedSystem}
                      selectedSystem={selectedSystem}
                    />
                  </div>
                </Item>
                <Item location="after">
                  <Button
                    name="Excel"
                    text="Excel"
                    type="success"
                    stylingMode="contained"
                    onClick={() => treeExcel(treeList, menuData)}
                  />
                </Item>
              </Toolbar>
            </TreeList>
            {/*메뉴정보*/}
          </S.RightContents>
        </S.Right>
        <S.Left>
          <S.LeftContents>
            {/*메뉴 디테일*/}
            <MenuDetailContainor
              selectedItemKeys={selectedItemKeys}
              setSelectedItemKeys={setSelectedItemKeys}
              setSuccess={setSuccess}
              success={success}
              disabled={disabled}
              setDisabled={setDisabled}
              menuData={menuData}
              setDeleteStatus={setDeleteStatus}
              selectedSystem={selectedSystem}
              width={width}
              displayWith={displayWith}
            />
            {/*메뉴 디테일*/}
          </S.LeftContents>
        </S.Left>
      </S.Wrapper>
    </Fragment>
  );
}
