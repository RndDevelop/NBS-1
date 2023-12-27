import { useState, useEffect } from "react";
import DataGrid, {
  Column,
  Selection,
  Toolbar,
  Item,
  FilterRow,
  Scrolling,
} from "devextreme-react/data-grid";

import * as S from "../../../../styles/systemMenegement-style/roll-group-user-style";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../../../store/store/store";
import {
  setUninCludedUser,
  removeUnincludedUser,
} from "../../../../store/group-slice/group-unUser-slice";

export default function RollUnGroupUseDetail() {
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  const { groupUser } = useSelector((state) => state.permissionGroupUser);
  const appDispatch = useAppDispatch();

  const user = groupUser.map((user) => user.selectedUsers);

  //렌더링시 상위코드 선택 체크
  useEffect(() => {}, [groupUser]);

  const selectionChanged = (data) => {
    if (data.selectedRowKeys.length === 0) {
      appDispatch(removeUnincludedUser({ UserId: data.selectedRowKeys }));
      return;
    }

    appDispatch(setUninCludedUser({ user: data.selectedRowsData }));
    setSelectedItemKeys(data.selectedRowKeys);
  };

  const onClickSave = (e) => {
    console.log(1);
  };

  return (
    <div id="data-grid-demo">
      <DataGrid
        id="gridContainer"
        dataSource={user[0]}
        keyExpr="id"
        showBorders={true}
        selectedRowKeys={selectedItemKeys}
        onSelectionChanged={selectionChanged}
        allowColumnReordering={true}
        hoverStateEnabled={true}
        focusedRowEnabled={true}
        onSaved={(e) => onClickSave(e)}
        style={S.dataGridStyle}
        height={250}
      >
        <Scrolling mode="virtual" />
        <Selection mode="multiple" />
        <FilterRow visible={true} />
        <Column dataField="UserId" caption="사용자ID" />
        <Column dataField="UserName" caption="사용자명" />
        <Column dataField="Group" caption="조직" />
        <Column dataField="Rank" caption="직급" />
        <Toolbar>
          <Item location="before">
            <div className="informer">
              <h3 className="count">미포함 사용자 목록</h3>
            </div>
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
