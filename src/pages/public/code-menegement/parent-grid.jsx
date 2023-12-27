import { useState, useRef } from "react";
import DataGrid, {
  Column,
  Editing,
  Paging,
  Selection,
  Lookup,
  Toolbar,
  Item,
  FilterRow,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import * as S from "../../../styles/publicCode-style/public-code-styled";
import { parentCodeColumn, stateUse } from "../../../asset/test-db/codeData.js";
import { useAppDispatch } from "../../../store/store/store";
import { setUpParentCodeColumn } from "../../../store/code-slice/code-slice";
import notify from "devextreme/ui/notify";
import { confirm } from "devextreme/ui/dialog";

export default function ParenGrid() {
  const dataSource = new DataSource({
    store: new ArrayStore({
      data: parentCodeColumn,
      key: "id",
    }),
  });

  const [selectedItemKeys, setSelectedItemKeys] = useState([]);
  const [editedRowKey, setEditedRowKey] = useState(null);
  const dataGridRef = useRef(null);
  const appDispatch = useAppDispatch();

  //삭제레코드
  const deleteRecords = async (data) => {
    const result = await confirm("선택하신 공통코드를 삭제 하시겠습니까?");

    if (result) {
      selectedItemKeys.forEach((key) => {
        dataSource.store().remove(key);
      });
      setSelectedItemKeys([]);
      dataSource.reload();
      notify("삭제되었습니다.");
      // 여기에 확인 버튼을 클릭했을 때 수행할 작업을 추가
    } else {
      notify("삭제가 취소되었습니다.");
      dataSource.reload();
      // 여기에 취소 버튼을 클릭했거나 대화상자를 닫았을 때 수행할 작업을 추가
    }
  };

  // 선택된 상위코드 저장하기
  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowKeys);

    if (data.selectedRowsData[0] !== undefined) {
      appDispatch(
        setUpParentCodeColumn({
          codeValue: data.selectedRowsData[0].codeValue,
          codeName: data.selectedRowsData[0].codeName,
        })
      );
    } else {
      appDispatch(
        setUpParentCodeColumn({
          codeValue: "",
          codeName: "",
        })
      );
    }
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
      StateID: "",
      // 필요한 경우 추가 필드를 설정
    };

    dataSource.store().insert(newRow);
    dataSource.reload();
    setSelectedItemKeys([newRow.id]);
    setEditedRowKey(newRow.id);
  };

  //데이터 저장 함수
  const onClickRowUpdated = async (data) => {
    if (
      data.data.codeName === "" ||
      data.data.StateID === "" ||
      data.data.codeValue === ""
    ) {
      notify(
        {
          message: "데이터를 정확하게 입력해주세요",
          width: 300,
          shading: true,
          type: "error",
          displayTime: 300,
        },
        { position: "center", direction: "up-push" }
      );
    } else {
      await confirm("작성한 공통코드를 저장하시겠습니까")
        .then((result) => {
          console.log('User clicked "OK"');
          dataSource.reload();
        })
        .catch((error) => {
          console.log('User clicked "Cancel" or closed the dialog');
          dataSource.reload();
        });
    }
    // dataGridRef.current.instance.saveEditData();
    // dataSource.reload();
    // setEditedRowKey(null);
  };

  return (
    <div id="data-grid-demo">
      <DataGrid
        ref={dataGridRef}
        id="gridContainer"
        dataSource={dataSource}
        showBorders={true}
        selectedRowKeys={selectedItemKeys}
        onSelectionChanged={selectionChanged}
        allowColumnReordering={true}
        onRowRemoved={(e) => deleteRecords(e)}
        onRowUpdated={(e) => onClickRowUpdated(e)}
        // style={S.dataGridStyle}
      >
        <Paging enabled={false} />
        <Editing
          mode="cell"
          allowAdding={true}
          allowUpdating={true}
          editRowKey={editedRowKey}
        />
        <Selection mode="multiple" />
        <FilterRow visible={true} />
        <Column dataField="id" caption="번호" />
        <Column dataField="codeValue" caption="상위코드" />
        <Column dataField="codeName" caption="상위코드명" />
        <Column dataField="sortOrder" caption="정렬순서" />
        <Column dataField="StateID" caption="사용여부" width={100}>
          <Lookup dataSource={stateUse} valueExpr="ID" displayExpr="Name" />
        </Column>
        <Column type="selection" dataType="boolean" />

        <Toolbar>
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
              // onClick={handleSaveRow}
              icon="save"
              text="저장"
              type="default"
              stylingMode="contained"
            />
          </Item>
          <Item location="after">
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

{
  /* <Item
            name="addRowButton"
            location="after"
            onClick={(e) => {
              dataGridRef.current.instance.addRow();
            }}
          >
            <Button
              icon="save"
              stylingMode="contained"
              type="success"
              width={100}
            />
          </Item> */
}
