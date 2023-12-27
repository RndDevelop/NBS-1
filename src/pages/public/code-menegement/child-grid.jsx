import { useState, useEffect } from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Selection,
  Lookup,
  Toolbar,
  Item,
  FilterRow,
  Scrolling,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import * as S from "../../../styles/publicCode-style/public-code-styled";
import { ChildCodeColumn, stateUse } from "../../../asset/test-db/codeData.js";
import { useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";

export default function ChildGrid() {
  // const { windowSize } = useOutletContext();
  const dataSource = new DataSource({
    store: new ArrayStore({
      data: ChildCodeColumn,
      key: "id",
    }),
  });

  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [editedRowKey, setEditedRowKey] = useState(null);
  const { parentCodeColumn } = useSelector((state) => state.parentCodeColumn);
  const [codeStateName, setCodeStateName] = useState("");

  //렌더링시 상위코드 선택 체크
  useEffect(() => {
    //set하기전 상위코드가 선택안되어 있으면 일반 텍스트 전달
    setCodeStateName((prev) => {
      if (parentCodeColumn.codeValue === "") {
        return "상위코드를 입력해주세요";
      } else {
        return `[${parentCodeColumn.codeValue}] ${parentCodeColumn.codeName}`;
      }
    });
  }, [parentCodeColumn]);

  //삭제레코드
  const deleteRecords = () => {
    selectedItemKeys.forEach((key) => {
      dataSource.store().remove(key);
    });
    setSelectedItemKeys([]);
    dataSource.reload();
  };

  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowKeys);
  };

  // 로우 추가 함수
  const handleAddRow = () => {
    const sortOrder =
      dataSource.store()._array[dataSource.store()._array.length - 1];

    const newRow = {
      id: Number(sortOrder.sortOrder) + 1,
      codeValue: "",
      codeName: "",
      sortOrder: Number(sortOrder.sortOrder) + 1,
      StateID: "사용안함",
      // 필요한 경우 추가 필드를 설정하세요
    };

    dataSource.store().insert(newRow);
    dataSource.reload();
    setSelectedItemKeys([newRow.id]);
    setEditedRowKey(newRow.id);
  };

  return (
    <div id="data-grid-demo">
      {/* {windowSize.width < 800 ? ( */}
      {/* <S.StateCodeNameBox>
        <Button
          text={codeStateName}
          icon="check"
          style={{ marginLeft: 12, marginBottom: 5 }}
        ></Button>
      </S.StateCodeNameBox> */}
      {/* ) : null} */}
      <DataGrid
        id="gridContainer"
        dataSource={dataSource}
        showBorders={true}
        selectedRowKeys={selectedItemKeys}
        onSelectionChanged={selectionChanged}
        allowColumnReordering={true}
        onRowUpdated={(e) => console.log("행이 업데이트되었습니다", e)}
        // style={S.dataGridStyle}
      >
        <Paging enabled={false} />
        <Editing
          mode="row"
          allowAdding={true}
          allowUpdating={true}
          editRowKey={editedRowKey}
        />
        <Scrolling mode="virtual" rowRenderingMode="virtual" />
        <Selection mode="multiple" />
        <FilterRow visible={true} />
        <Column dataField="id" caption="번호" />
        <Column dataField="codeValue" caption="하위코드" />
        <Column dataField="codeName" caption="하위코드명" />
        <Column dataField="sortOrder" caption="정렬순서" />
        <Column dataField="StateID" caption="State" width={100}>
          <Lookup dataSource={stateUse} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column type="selection" dataType="boolean" width={100} />

        <Toolbar>
          {/* {windowSize.width > 800 ? ( */}
          <Item location="befor">
            <S.StateCodeNameBox>
              <Button text={codeStateName} icon="check"></Button>
            </S.StateCodeNameBox>
          </Item>
          {/* ) : null} */}

          <Item location="after">
            <Button
              name="edit"
              text="추가"
              type="success"
              stylingMode="contained"
              icon="plus"
              onClick={handleAddRow}
            />
          </Item>

          <Item location="after">
            <Button
              onClick={deleteRecords}
              icon="save"
              text="저장"
              type="default"
              stylingMode="contained"
            />
          </Item>
          <Item llocation="after">
            <Button
              onClick={deleteRecords}
              icon="trash"
              type="danger"
              text="삭제"
              stylingMode="contained"
            />
          </Item>
        </Toolbar>
      </DataGrid>
      <style>
        {`
        .dx-command-edit > .dx-link-edit {
          display: none !important;
        }
      `}
      </style>
    </div>
  );
}

// location={`${windowSize.width > 800 ? "after" : "befor"}`}
