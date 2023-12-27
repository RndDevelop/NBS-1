import { useState, useEffect, useRef } from "react";
import DataGrid, {
  Column,
  Selection,
  Toolbar,
  Item,
  FilterRow,
  Scrolling,
} from "devextreme-react/data-grid";
import { Button } from "devextreme-react/button";
import * as S from "../../../../styles/systemMenegement-style/roll-group-user-style";
import { users } from "../../../../asset/test-db/user-data";
import { useAppDispatch } from "../../../../store/store/store";
import { setGroupUser } from "../../../../store/group-slice/group-User-slice";
import { useSelector } from "react-redux";

export default function RollGroupUserDetail(props) {
  //권한그룹목록에서 선택한 데이터
  const { selectedItemKeys: selectedItemRowData } = props;
  // 데이터 그리드를 커스텀하기위해 사용함
  const dataGrid = useRef(null);

  //미포함 사용자 목록으로 데이터를 바인딩하기위해 사용함
  //미포함 사용자 목록 컴포넌트는 자식으로 사용하지 않음
  const appDispatch = useAppDispatch();

  // const data = dataGrid.current ? dataGrid.current.instance : null;

  //사용자가 선택한 로우의 키값
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  //렌더링시 데이터 셋팅
  const [userSetUp, setUserSetUp] = useState([]);

  //사용자가 선택한 키값배열들을 관리함
  const [excludedUserIds] = useState([]);

  //미포함 사용자 목록에서 가져온 배열들을 관리함
  const [selectedUsers, setSelectedUsers] = useState([]);

  //redux로 미포함 사용자들을 관리한다.
  const { groupUser } = useSelector((state) => state.permissionGroupUser);
  const { groupUnUser } = useSelector((state) => state.unincludedUser);

  //미포함 사용자들
  const unUser = groupUser.map((user) => user.selectedUsers);

  //미포함 사용자 목록 관리
  const [unUserSetUp, setUnUserSetUp] = useState([]);

  //선택한 로우의 id값을 가져옴
  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowKeys);
    // console.log(data.selectedRowsData);
  };

  //저장버튼
  const onClickSave = (e) => {
    console.log(e.data);
  };

  //화살표 클릭시 미포함 사용자 목록으로 바인딩
  const onUserNotIncluded = (e) => {
    if (selectedItemKeys.length === 0) {
      return;
    }
    // 선택한 row의 키값
    const selectedUserId = selectedItemKeys;

    // 이전 상태를 활용하여 업데이트 prevUserSetUp:이전값
    setUserSetUp((prevUserSetUp) => {
      //이전 배열값과 지금 선택한 배열의 값을 스프레드 연산자로 복사하여 재사용
      const updatedExcludedUserIds = [...excludedUserIds, ...selectedUserId];

      //여기 에다가 더하는 코드 집어 넣기

      // ID가 일치하는 사용자를 제외하고 새 배열을 생성
      const newSetUpUser = prevUserSetUp.filter(
        (user) => !updatedExcludedUserIds.includes(user.id)
      );

      //ID가 일치하는 사용자 새배열 생성
      const newlySelectedUsers = prevUserSetUp.filter((user) => {
        return updatedExcludedUserIds.includes(user.id);
      });

      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        ...newlySelectedUsers,
      ]);

      return newSetUpUser;
    });
  };

  // 화살표 사용자 목록으로 바인딩
  const onUserIncluded = (e) => {
    if (groupUnUser.length === 0) {
      return;
    }

    // flatMap을 사용하여 2차원 배열을 1차원 배열로 평탄화
    const unUserKey = groupUnUser.flatMap((user) =>
      user.user.map((item) => item)
    );

    // 키 값을 추출하여 배열 생성
    const key = unUserKey.map((userId) => userId.id);

    // 새로운 사용자 ID를 기존에 제외된 사용자 ID 배열에 추가
    const updatedExcludedUserIds = [...excludedUserIds, ...key];

    // setUserSetUp 업데이트
    setUserSetUp((prevUserSetUp) => {
      // 기존 사용자 배열과 새로운 사용자 배열 합치기
      return [...prevUserSetUp, ...unUserKey];
    });

    // setSelectedUsers 업데이트
    setSelectedUsers((prevSelectedUsers) => {
      // ID가 일치하지 않는 사용자 필터링하여 새로운 배열 생성
      const newSetUpUser = prevSelectedUsers.filter(
        (user) => !updatedExcludedUserIds.includes(user.id)
      );

      return newSetUpUser;
    });
  };

  useEffect(() => {
    // 렌더링시 동적으로 변환하는 배열을 사용하기위해 비어있는 state에 데이터를 저장함
    if (userSetUp.length === 0) {
      setUserSetUp(users);
    }
    if (unUserSetUp.length === 0) {
      setUnUserSetUp(unUser);
    }
  }, []);

  // 렌더링시
  useEffect(() => {
    //ID가 일치하는 사용자를 [{객체}] 형태로 \ 들은 미포함사용자 목록으로 이동한다.
    appDispatch(setGroupUser({ selectedUsers }));
  }, [userSetUp]);

  return (
    <S.RollDetailBox>
      <div id="data-grid-demo">
        <DataGrid
          id="gridContainer"
          ref={dataGrid}
          dataSource={userSetUp}
          keyExpr="id"
          showBorders={true}
          selectedRowKeys={selectedItemKeys}
          onSelectionChanged={selectionChanged}
          allowColumnReordering={true}
          hoverStateEnabled={true}
          focusedRowEnabled={true}
          style={S.dataGridStyle}
          height={400}
          onRowUpdating={(e) => onClickSave(e)}
        >
          <Scrolling mode="virtual" />
          <Selection mode="multiple" />
          <FilterRow visible={true} />
          <Column dataField="UserId" caption="사용자ID" />
          <Column dataField="UserName" caption="사용자명" />
          <Column dataField="Group" caption="조직" />
          <Column dataField="Rank" caption="직급" />
          <Toolbar>
            <Item location="befor">
              <div className="informer" style={{ marginLeft: -10 }}>
                <Button
                  className="send"
                  text={`[${selectedItemRowData.UserId}] ${selectedItemRowData.GroupName}`}
                  icon="check"
                ></Button>
              </div>
            </Item>
            <Item location="after">
              <Button
                onClick={onClickSave}
                icon="save"
                text="저장"
                type="default"
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
      <S.LeftCenterContent>
        <Button
          type="default"
          stylingMode="contained"
          icon="arrowup"
          style={{ borderRadius: 5 }}
          onClick={onUserIncluded}
        />
        <S.LeftCenterArrowBox />
        <Button
          type="default"
          stylingMode="contained"
          icon="arrowdown"
          style={{ borderRadius: 5 }}
          onClick={onUserNotIncluded}
        />
      </S.LeftCenterContent>
    </S.RollDetailBox>
  );
}
