import { Fragment, useEffect, useState, useRef } from "react";
import * as S from "../../../styles/systemMenegement-style/building-menegement-style";
import DataGrid, {
  Column,
  FilterRow,
  Toolbar,
  Item,
  Export,
  Selection,
  Scrolling,
} from "devextreme-react/data-grid";
import DataSource from "devextreme/data/data_source";
import ArrayStore from "devextreme/data/array_store";
import { building } from "../../../asset/test-db/building-data";
import { Button } from "devextreme-react/button";
import { excel } from "../../../components/excel/excel";
import BuildingDetailContainer from "./building-detail-contianer";

export default function BuildingMenegement() {
  const dataGridRef = useRef(null);
  const [selectedItemKeys, setSelectedItemKeys] = useState([]);

  const selectionChanged = (data) => {
    setSelectedItemKeys(data.selectedRowsData[0]);
  };

  const dataSource = new DataSource({
    store: new ArrayStore({
      data: building,
      key: "id",
    }),
  });

  useEffect(() => {
    if (selectedItemKeys.length === 0) {
      setSelectedItemKeys(building[0]);
    }
  }, [selectedItemKeys]);

  return (
    <Fragment>
      <S.Wrapper>
        <S.Top>
          <DataGrid
            ref={dataGridRef}
            id="gridContainer"
            dataSource={dataSource}
            showBorders={true}
            allowColumnReordering={true}
            onSelectionChanged={selectionChanged}
            keyExpr="id"
            hoverStateEnabled={true}
            focusedRowEnabled={true}
            height={400}
          >
            <Scrolling rowRenderingMode="virtual" mode="infinite" />
            <FilterRow visible={true} />
            <Selection mode="single" />
            <Export enabled={true} allowExportSelectedData={true} />
            <Column dataField="buildingId" caption="건물ID" />
            <Column dataField="buildingName" caption="건물명" />
            <Column dataField="buildingNumber" caption="시설물번호" />
            <Column dataField="buildingType" caption="시설물종류" />
            <Column dataField="buildingOwner" caption="소유자" />
            <Column dataField="buildingCompletionDate" caption="준공일" />
            <Column dataField="expirationDate" caption="하자담보만료일" />
            <Column dataField="designer" caption="설계자" />

            <Toolbar>
              <Item location="before">
                <div className="informer">
                  <h3 className="count">건물정보</h3>
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
          {selectedItemKeys.length !== 0 ? (
            <BuildingDetailContainer selectedItemKeys={selectedItemKeys} />
          ) : (
            <div>Loading...</div>
          )}
        </S.Bottom>
      </S.Wrapper>
    </Fragment>
  );
}
