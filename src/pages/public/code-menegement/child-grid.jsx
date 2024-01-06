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
import { stateUse } from "../../../asset/test-db/codeData";
import { Button } from "devextreme-react/button";
import { useMutation, useQuery } from "react-query";
import { custom } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import {
  commonChildrenCreate,
  commonChildrenQuery,
  commonCodeDelete,
  commonCodeUpdate,
} from "../../../services/api/commencode-api";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import * as S from "../../../styles/publicCode-style/public-code-styled";
import { isCancel } from "axios";
//부모그리드 컴포넌트
export default function PrentGrid() {
  //부모 컴포넌트에서 상위코드 데이터 가져옴

  const [newRowPosition, setNewRowPosition] = useState("last");
  //스크롤
  const [scrollingMode] = useState("virtual");

  //유저가 입력한 데이터 관리
  const [changes, setChanges] = useState([]);

  //선택한 로우를 수정하기위해 키값셋팅
  const [editRowKey, setEditRowKey] = useState(null);

  //화면비율
  const { windowSize } = useOutletContext();

  const { isCancel } = useOutletContext();
  //수정모드 상태관리
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  //더블클릭한 데이터값
  const [dbleClickData, setDbleClickData] = useState({});

  //선택한 로우
  const [selectedRowData, setSelectedRowData] = useState();

  // 부모코드 파싱
  const { parentCodeColumn } = useSelector((state) => state.parentCodeColumn);

  //보무코드관리
  const [codeStateName, setCodeStateName] = useState("");

  //sortOdr 자동세팅 스테이트
  const [sortOdr, setSortOdr] = useState(0);
  //dataGrid custom ref
  const dataGridRef = useRef(null);

  // const isAddButtonVisible = ({ row }) => !row.isEditing;

  //데이터 소스 가공
  //preFixFilter 는 접두어로 필터링된 데이터
  //preFixFilter가 처음에는 length가 0이기 때문에 모든 데이터를 가져온다.
  //자식 코드 api

  const {
    data: children,
    isLoading,
    refetch,
  } = useQuery(
    ["children", parentCodeColumn.codeId],
    async () => await commonChildrenQuery(parentCodeColumn.codeId),
    {
      refetchInterval: false,
    }
  );

  const dataSource = new DataSource({
    store: new ArrayStore({
      data: children && children,
      key: "codeId",
    }),
    select: [
      "codeId",
      "codeName",
      "prntcodeId",
      "sortOdr",
      "remark",
      "useYn",
      "createdAt",
      "createdBy",
      "updatedAt",
      "updatedBy",
    ],
  });

  //선택할때마다 변경되는 로우 데이터
  const selectionChanged = (data) => {
    setSelectedRowData(data.selectedRowsData[0]);
  };

  //상위코드 저장 api 호춯
  //data 유저가 입력한값
  const { mutate: createMutate } = useMutation(
    async (data) => {
      try {
        await commonChildrenCreate(data);
      } catch (err) {
        return err;
      }
    },
    {
      onSuccess: () => {
        refetch();
        return;
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
        setDbleClickData();
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
        return;
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
  const onRowDblClick = useCallback((e) => {
    if (!e.data) return;
    //수정모드 변환
    setIsUpdateMode(true);
    //더블클릭한 로우의 데이터를 저장
    setDbleClickData(e.data);
    const key = e.data.codeId; // 혹시 코드 ID가 사용 가능한 속성이 아니면 해당 속성으로 변경
    setEditRowKey(key);
  }, []);

  //화면이 모바일 해상도로 줄어들때

  //로우추가 함수
  const handleAddRow = (e) => {
    //입력모드 유지
    setIsUpdateMode(false);

    //마지막 로우 아이디 셋팅
    const sortOrder =
      dataSource.store()._array[dataSource.store()._array.length - 1];

    //저장함수에서 사용하기위해
    setSortOdr(sortOrder.sortOdr + 1);

    // 마지막 코드 아이디 가져옴
    // const originalCodeId = sortOrder.codeId.substring(1, 4);

    // if (originalCodeId) {
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
      createdAt: "",
      createdBy: "",
      updatedAt: "",
      updatedBy: "",
      // 필요한 경우 추가 필드를 설정
    };

    // 새롭게 만든 객체를 로우에 임시로 추가한다.
    dataSource.store().insert(newRow);
    // .then(() => dataSource.reload());
    // setSelectedItemKeys([newRow.codeId]);
    setEditRowKey(newRow.codeId);
    // }
  };

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
      // codeId: changes[0].key ? changes[0].key : dbleClickData.codeId,
      //부모코를 선택하지 않았을때 자동으로 A001코드가 들어가게함
      prntcodeId:
        parentCodeColumn.codeId === "" ? "A001" : parentCodeColumn.codeId,
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
      remark: changedData.remark ? changedData.remark : dbleClickData.remark,
      sprfield1: "테스트",
      sprfield2: "테스트",
      sprfield3: "테스트",
      sprfield4: "테스트",
      sprfield5: "테스트",
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

  //selectRow 데이터 설정

  useEffect(() => {
    //처음렌더링시 데이터셋팅
    if (!isLoading && children) {
      if (selectedRowData === undefined) {
        setSelectedRowData(children[0]);
      }
    }

    //set하기전 상위코드가 선택안되어 있으면 일반 텍스트 전달
    setCodeStateName((prev) => {
      if (parentCodeColumn.codeId === "") {
        return "상위코드를 입력해주세요";
      } else {
        return `[${parentCodeColumn.codeId}] ${parentCodeColumn.codeName}`;
      }
    });
  }, [parentCodeColumn, isLoading]);

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
        // focusedRowIndex={1}
        defaultFocusedRowIndex={0}
        onSelectionChanged={selectionChanged}
        height={windowSize.width <= 1440 ? 630 : 700}
        // width={800}
        onRowInserted={onRowInserted}
        onRowDblClick={onRowDblClick}
      >
        <Scrolling mode={scrollingMode} />
        <Paging enabled={false} />
        <FilterRow visible={true} />
        <Selection mode="multiple" />
        <Editing
          mode="row"
          key="codeId"
          allowAdding={true}
          allowDeleting={true}
          allowUpdating={true}
          confirmDelete={false}
          useIcons={true}
          newRowPosition={newRowPosition}
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
        <Column
          dataField="sortOdr"
          caption="정렬순서"
          alignment="left"
          allowEditing={false}
        >
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
        {/* <Column dataField="remark" caption="비고" alignment="left" /> */}
        <Column
          dataField="createdAt"
          caption="등록시간"
          dataType="datetime"
          alignment="left"
          allowEditing={false}
        />
        <Column
          dataField="createdBy"
          caption="등록자"
          dataType="string"
          alignment="left"
          allowEditing={false}
        />
        <Column
          dataField="updatedAt"
          caption="수정시간"
          alignment="left"
          allowEditing={false}
        />
        <Column
          dataField="updatedBy"
          caption="수정등록자"
          dataType="string"
          alignment="left"
          allowEditing={false}
        />
        <Column type="selection" alignment="left" />
        <Column type="buttons">
          {/* <Button icon="add" visible={isAddButtonVisible} /> */}
          <Button name="delete" />
          <Button name="save" />
          <Button name="cancel" />
        </Column>
        <Toolbar>
          <Item location="befor">
            <S.StateCodeNameBox>
              <Button
                text={codeStateName}
                icon="check"
                width={
                  windowSize.width <= 1440
                    ? windowSize.width <= 560
                      ? isCancel
                        ? 150
                        : 100
                      : isCancel
                      ? 150
                      : 150
                    : /* width 값이 1440보다 클 때의 설정 */
                      // 예를 들어 windowSize.width가 1441 이상인 경우 300으로 설정
                      150
                }
              ></Button>
            </S.StateCodeNameBox>
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

// location={`${windowSize.width > 800 ? "after" : "befor"}`}

//자식 코드 api
// const { data: children, isLoading } = useQuery(
//   ["children"],
//   async () => await commonChildrenQuery(parentCodeColumn.codeId),
//   {
//     refetchInterval: false,
//   }
// );

// const dataSource = new DataSource({
//   store: new ArrayStore({
//     data: transformData,
//     key: "codeId",
//   }),
//   select: ["number", "codeId", "codeName", "prntcodeId", "sortOdr", "useYn"],
// });

//렌더링시 상위코드 선택 체크
// useEffect(() => {
//   //set하기전 상위코드가 선택안되어 있으면 일반 텍스트 전달
//   setCodeStateName((prev) => {
//     if (parentCodeColumn.codeId === "") {
//       return "상위코드를 입력해주세요";
//     } else {
//       return `[${parentCodeColumn.codeId}] ${parentCodeColumn.codeName}`;
//     }
//   });

//   if (children && !isLoading) {
//     const childCode = children.map((item, i) => ({
//       codeId: item.codeId,
//       codeName: item.codeName,
//       prntcodeId: item.prntcodeId,
//       sortOdr: item.sortOdr,
//       useYn: item.useYn === "Y" ? 1 : 2,
//     }));
//     setTransformData(childCode);
//   }
// }, [parentCodeColumn, isLoading]);
