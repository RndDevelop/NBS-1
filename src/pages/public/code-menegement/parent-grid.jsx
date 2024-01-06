import React, { useCallback, useEffect, useState, useRef } from "react";
import DataGrid, {
  Column,
  Editing,
  ValidationRule,
  Toolbar,
  Item,
  Scrolling,
  Lookup,
  Paging,
  FilterRow,
  Selection,
} from "devextreme-react/data-grid";
import SelectBox from "devextreme-react/select-box";
import Guid from "devextreme/core/guid";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import {
  stateUse,
  groupingValues,
  codeColmun,
} from "../../../asset/test-db/codeData";
import { Button } from "devextreme-react/button";
import { useMutation } from "react-query";
import { custom } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import {
  commonCodeCreate,
  commonCodeDelete,
  commonCodeUpdate,
} from "../../../services/api/commencode-api";
import { useOutletContext } from "react-router-dom";
import { useAppDispatch } from "../../../store/store/store";
import { setUpParentCodeColumn } from "../../../store/code-slice/code-slice";

//부모그리드 컴포넌트
export default function PrentGrid(props) {
  //부모 컴포넌트에서 상위코드 데이터 가져옴
  const { data, refetch } = props;

  //렌더링시 로우선택기능
  // const selectionFilter = ["codeId", "=", "A001"];

  const [newRowPosition] = useState("pageBottom");
  //스크롤
  const [scrollingMode] = useState("virtual");

  //유저가 입력한 데이터 관리
  const [changes, setChanges] = useState([]);

  //선택한 로우를 수정하기위해 키값셋팅
  const [editRowKey, setEditRowKey] = useState(null);

  //화면비율
  const { windowSize } = useOutletContext();

  //수정모드 상태관리
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  //더블클릭한 데이터값
  const [dbleClickData, setDbleClickData] = useState({});

  //선택한 로우
  const [selectedRowData, setSelectedRowData] = useState();

  const [sortOdr, setSortOdr] = useState(0);

  //dataGrid custom ref
  const dataGridRef = useRef(null);

  //dispatch redux 부모코드 저장
  const appDispatch = useAppDispatch();
  //접두어 관리 스테이트
  const [prefix, setPrefix] = useState("");

  //접두어 선택으로 필터링된 데이터 스테이트
  const [prefixFilter, setPrefixFilter] = useState([]);

  //데이터 소스 가공
  //preFixFilter 는 접두어로 필터링된 데이터
  //preFixFilter가 처음에는 length가 0이기 때문에 모든 데이터를 가져온다.
  const dataSource = new DataSource({
    store: new ArrayStore({
      // data: Array.isArray(data)
      //   ? data.filter((item) =>
      //       item.codeId.includes(prefix === "" ? "A" : prefix)
      //     )
      //   : [],
      data: data,
      key: "codeId",
    }),
    select: codeColmun,
  });

  //선택할때마다 변경되는 로우 데이터
  const selectionChanged = (data) => {
    setSelectedRowData(data.selectedRowsData[0]);

    if (data.selectedRowsData[0] !== undefined) {
      appDispatch(
        setUpParentCodeColumn({
          codeId: data.selectedRowsData[0].codeId,
          codeName: data.selectedRowsData[0].codeName,
        })
      );
    } else {
      appDispatch(
        setUpParentCodeColumn({
          codeId: "",
          codeName: "",
        })
      );
    }
  };

  //상위코드 저장 api 호춯
  //data 유저가 입력한값
  //prefix 접두어 데이터
  const { mutate: createMutate } = useMutation(
    async (data) => {
      try {
        console.log(data, prefix);
        await commonCodeCreate(data, prefix);
      } catch (err) {
        return err;
      }
    },
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  //상위코드 수정 api 호출
  //data 유저가 입력한 코드데이터
  const { mutate: updateMutate } = useMutation(
    async (data) => {
      try {
        await commonCodeUpdate(data);
      } catch (err) {
        return err;
      }
    },
    {
      onSuccess: () => {
        notify(
          {
            message: "코드수정완료",
            width: 300,
            shading: true,
            type: "default",
            displayTime: 300,
          },
          //알람 위치값
          { position: "center", direction: "up-push" }
        );
        setIsUpdateMode(false);
        setDbleClickData({});
        setEditRowKey();
        refetch();
        return;
      },
    }
  );

  //삭제 api 호출
  //data 유저가 선택한 로우키
  const { mutate: deleteMutate } = useMutation(
    async (data) => {
      try {
        await commonCodeDelete(data);
      } catch (err) {
        return err;
      }
    },
    {
      onSuccess: () => {
        setSelectedRowData();
        refetch();
      },
    }
  );

  //이벤트 시 보여지는 confirm custom
  const mySaveDialog = custom({
    messageHtml: "저장하시겠습니까?",
    buttons: [
      {
        text: "확인",
        onClick: (e) => {
          return { buttonText: e.component.option("text") };
        },
      },
      {
        text: "취소",
        onClick: (e) => {
          return { buttonText: e.component.option("text") };
        },
      },
    ],
  });

  // const isAddButtonVisible = ({ row }) => !row.isEditing;
  const onRowInserted = (e) => {
    e.component.navigateToRow(e.key);
  };

  // 더블클릭 시 편집 모드로 전환하는 이벤트 핸들러
  const onRowDblClick = (e) => {
    if (!e.data) return;
    setIsUpdateMode(true);
    setDbleClickData(e.data);
    const key = e.data.codeId; // 혹시 코드 ID가 사용 가능한 속성이 아니면 해당 속성으로 변경
    setEditRowKey(key);
  };

  //로우추가 함수
  const handleAddRow = useCallback((e) => {
    setIsUpdateMode(false);
    const sortOrder =
      dataSource.store()._array[dataSource.store()._array.length - 1];

    //저장함수에서 사용
    setSortOdr(sortOrder.sortOdr + 1);

    // 마지막 코드 아이디 가져옴
    // const originalCodeId = sortOrder.codeId.substring(1, 4);

    // 마지막 코드 아이디 확인해서 숫자로 변환하여 +1 진행한다.
    // const incrementedCodeId = String(Number(originalCodeId) + 1).padStart(
    //   3,
    //   "0"
    // );
    //새로운 객체를 만든다.
    const newRow = {
      // id: "000001",
      // codeId: incrementedCodeId && "A" + incrementedCodeId,
      codeId: "자동입력",
      codeName: "",
      prntcodeId: "0000000000",
      sortOdr: sortOrder.sortOdr + 1,
      useYn: "",
      remark: "",
      // 필요한 경우 추가 필드를 설정
    };

    // 새롭게 만든 객체를 로우에 임시로 추가한다.
    dataSource.store().insert(newRow);

    // 스크롤 가능한 컨테이너의 높이
    // const scrollableHeight = scrollable.clientHeight();
    // const scrollHeight = scrollable.scrollHeight();

    // 맨 아래로 스크롤
    // scrollable.scrollTo({ top: scrollHeight - scrollableHeight });

    // .then(() => {
    //   dataSource.reload();
    //   dataGridRef.current.instance.refresh();
    // });
    // .then(() => dataSource.reload());
    // setSelectedItemKeys([newRow.codeId]);
    setEditRowKey(newRow.codeId);
  });

  //로우저장함수
  // chage 유저가 입력한 데이터값
  const onClickSaveRow = () => {
    if (!changes || !changes[0]?.key) {
      return;
    }
    //유저가 입력한값
    const changedData = changes[0].data;

    //유저가 입력한 값들을 가공
    const body = {
      codeId: changes[0].key ? changes[0].key : dbleClickData.codeId,
      prntcodeId: "0000000000",
      codeName: changedData.codeName
        ? changedData.codeName
        : dbleClickData.codeName,
      codeDesc: "",
      // sortOdr: changedData.sortOdr
      //   ? changedData.sortOdr
      //   : dbleClickData.sortOdr,
      sortOdr: sortOdr,
      useYn: changedData.useYn
        ? changedData.useYn === 1
          ? "Y"
          : dbleClickData.useYn
        : "N",
      remark: "",
      sprfield1: "",
      sprfield2: "",
      sprfield3: "",
      sprfield4: "",
      sprfield5: "",
    };

    try {
      //알람창에서 확인 버튼 클릭시
      mySaveDialog.show().then((dialogResult) => {
        if (dialogResult.buttonText === "확인") {
          if (!isUpdateMode) createMutate(body);
          if (isUpdateMode) updateMutate(body);
        }
      });
    } catch (error) {
      return error.message;
    }
  };

  //삭제함수
  const onClickDelete = () => {
    try {
      //인자값은 선택된 codeId
      deleteMutate(selectedRowData.codeId);
    } catch (error) {
      return error;
    }
  };

  //SELECT BOX 선택시 벨류 저장 함수
  const toggleGroupColumn = useCallback((e) => {
    if (!e.value) return;
    const newGrouping = e.value;
    //접두어가 변경될때 마다 스테이트로 관리한다.
    setPrefix(newGrouping);
    // dataGridRef.current.instance.clearGrouping();
    // dataGridRef.current.instance.columnOption(newGrouping, "groupIndex", 0);
    // setTotalCount(getGroupCount(newGrouping));
    // setGroupColumn(newGrouping);
  }, []);

  //selectRow 데이터 설정
  useEffect(() => {
    if (selectedRowData === undefined) {
      setSelectedRowData(data[0]);
    }
    //처음렌더링시 데이터셋팅
    if (data) {
      if (prefixFilter.length === 0) {
        setPrefixFilter(data);
      }
    }
    //prefix 접두어가 변경될때 마다 데이터 필터링
    // if (prefix) {
    //   const filterItems = data.filter((items) => items.codeId.includes(prefix));
    //   setPrefixFilter(filterItems);
    // }
  }, [selectedRowData, prefix]);

  return (
    <React.Fragment>
      <DataGrid
        id="gridContainer"
        key="codeId"
        ref={dataGridRef}
        // onCellClick={(e) => setEditRowKey(e.key)}
        dataSource={dataSource}
        // defaultSelectionFilter={selectionFilter}
        showBorders={true}
        columnAutoWidth={true}
        remoteOperations={true}
        focusedRowEnabled={true}
        defaultFocusedRowIndex={0}
        onSelectionChanged={selectionChanged}
        height={windowSize.width <= 1440 ? 340 : 700}
        onRowInserted={onRowInserted}
        onRowDblClick={onRowDblClick}
      >
        <Scrolling mode={scrollingMode} />
        <Paging enabled={false} />
        <FilterRow visible={true} />
        <Selection mode="multiple" />
        <Editing
          mode="row"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
          confirmDelete={false}
          useIcons={true}
          newRowPosition={"viewportTop"}
          // newRowPosition={"top"}
          // changes={changes}
          onChangesChange={setChanges}
          editRowKey={editRowKey}
          onEditRowKeyChange={setEditRowKey}
          // refreshMode="full"
        />

        <Column
          dataField="codeId"
          caption="상위코드"
          allowEditing={false}
          alignment="left"
        />
        <Column dataField="codeName" caption="상위코드명" alignment="left">
          <ValidationRule type="required" />
        </Column>
        <Column dataField="sortOdr" caption="정렬순서" alignment="left">
          <ValidationRule type="required" />
        </Column>
        <Column dataField="useYn" caption="사용여부" alignment="left">
          <Lookup
            dataSource={stateUse}
            valueExpr="ID"
            displayExpr="Name"
            alignment="center"
          />
        </Column>
        <Column type="selection" alignment="left" />
        <Column type="buttons">
          {/* <Button icon="add" visible={isAddButtonVisible} /> */}
          <Button name="delete" />
          <Button name="save" />
          <Button name="cancel" />
        </Column>

        <Toolbar>
          <Item location="before">
            <SelectBox
              width={60}
              items={groupingValues}
              displayExpr={"text"}
              valueExpr="value"
              onValueChanged={toggleGroupColumn}
              defaultValue={"A"}
            />
          </Item>
          <Item location="after">
            <Button
              id="addRow"
              name="edit"
              text="추가"
              stylingMode="contained"
              onClick={handleAddRow}
            />
          </Item>
          <Item location="after">
            <Button
              id="success"
              onClick={onClickSaveRow}
              text="저장"
              stylingMode="contained"
            />
          </Item>
          <Item location="after">
            <Button
              id="deleteRow"
              onClick={onClickDelete}
              text="삭제"
              stylingMode="contained"
            />
          </Item>
        </Toolbar>
      </DataGrid>
    </React.Fragment>
  );
}
