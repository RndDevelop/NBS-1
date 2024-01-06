import { Fragment, useEffect, useState, useRef } from "react";
import * as S from "../../../styles/systemMenegement-style/user-menegement-styled";
import DataGrid, {
  Column,
  FilterRow,
  Toolbar,
  Item,
  Export,
  Selection,
  Scrolling,
} from "devextreme-react/data-grid";

import { Button } from "devextreme-react/button";
import UserDetail from "./userDetail-containor";
import { excel } from "../../../components/excel/excel";
import { useQuery } from "react-query";
import { userQuery } from "../../../services/api/user-api";

export default function UserMenegement() {
  const dataGridRef = useRef(null);
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowsData[0]);
  };

  const { data, isLoading } = useQuery(
    ["userQuery", "user"],
    () => userQuery("NBSZ0000"),
    {
      refetchInterval: false,
      cacheTime: 3600000,
      staleTime: 60000,
    }
  );

  useEffect(() => {
    if (!isLoading) {
      if (selectedItemKeys.length === 0) {
        setSelectedItemKeys(data.data[0]);
      }
    }
  }, [selectedItemKeys, isLoading]);

  return (
    <Fragment>
      {!isLoading && data && (
        <S.Wrapper>
          <S.Top>
            <DataGrid
              ref={dataGridRef}
              id="gridContainer"
              dataSource={data.data}
              showBorders={true}
              allowColumnReordering={true}
              onSelectionChanged={selectionChanged}
              keyExpr="userId"
              wordWrapEnabled={true}
              hoverStateEnabled={true}
              focusedRowEnabled={true}
              height={400}
            >
              <Scrolling rowRenderingMode="virtual" mode="infinite" />
              <FilterRow visible={true} />
              <Selection mode="single" />
              <Export enabled={true} allowExportSelectedData={true} />
              <Column dataField="userId" caption="사용자ID" />
              <Column dataField="userName" caption="사용자명" />
              <Column dataField="department" caption="그룹" />
              <Column dataField="jobTitle" caption="직급" />
              <Toolbar>
                <Item location="before">
                  <div className="informer">
                    <h3 className="count">사용자목록</h3>
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
          </S.Top>
          <S.Bottom>
            {/* {selectedItemKeys.length !== 0 ? (
              <UserDetail selectedItemKeys={selectedItemKeys} />
            ) : (
              <div>Loading...</div>
            )} */}
          </S.Bottom>
        </S.Wrapper>
      )}
    </Fragment>
  );
}

//PDF
//   function exportGrid() {
//     const doc = new jsPDF();
//     const dataGrid = dataGridRef.current.instance;
//     exportDataGridToPdf({
//         jsPDFDocument: doc,
//         component: dataGrid
//     }).then(() => {
//         doc.save('Customers.pdf');
//     });
// }
