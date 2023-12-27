import { exportDataGrid } from "devextreme/excel_exporter";
import { Workbook } from "exceljs";
import saveAs from "file-saver";
import DataGrid from "devextreme-react/data-grid";
import React from "react";
import TreeList from "devextreme-react/tree-list";

interface IExcel {
  country: string;
  haveCustomer: string;
  haveLinkNumber: string;
  id: number;
  parentId: number;
  text: string;
  items?: IExcel[]; // Define the type for items
}

//Excel다운로드
export const excel = (ref: React.MutableRefObject<DataGrid | null>) => {
  const dataGrid = ref.current ? ref.current.instance : null;

  if (!dataGrid) {
    return;
  }
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("사용자 리스트");

  exportDataGrid({
    component: dataGrid || undefined,
    worksheet: worksheet,
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(
        new Blob([buffer], { type: "application/octet-stream" }),
        "사용자리스트.xlsx"
      );
    });
  });
};

// 부모 및 자식 데이터 평면화 함수
const flattenData = (data: IExcel[], result: any[] = [], level: number = 0) => {
  for (const item of data) {
    result.push({ ...item, level });
    // 부모-자식 관계의 레벨 정보 추가
    if (item.items && item.items.length > 0) {
      flattenData(item.items, result, level + 1);
    }
  }
  return result;
};

export const treeExcel = (
  treeList: React.MutableRefObject<TreeList | null>,
  data: IExcel[]
) => {
  const dataGrid = treeList.current ? treeList.current.instance : null;
  if (!dataGrid) {
    return;
  }

  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet("사용자 리스트");
  const columns = treeList.current
    ? treeList.current.instance.getVisibleColumns()
    : null;

  const columnHeader = columns ? columns.map((col) => col.caption) : null;
  worksheet.addRow(columnHeader);

  const flattenedData = flattenData(data);

  flattenedData.forEach((item) => {
    const rowData = columns
      ? columns.map((col) => {
          if (col.dataField) {
            return item[col.dataField];
          }
        })
      : null;
    const row = worksheet.addRow(rowData);
    // outlineLevel을 사용하여 행 숨기기/펼치기 설정
    row.outlineLevel = item.level;
  });
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "메뉴리스트.xlsx"
    );
  });
};

// const onExporting = useCallback((e) => {
//     const workbook = new Workbook();
//     const worksheet = workbook.addWorksheet("권한그룹리스트");
//     const dataGrid = dataGridRef.current.instance;

//     exportDataGrid({
//       component: dataGrid,
//       worksheet: worksheet,
//     }).then(() => {
//       workbook.xlsx.writeBuffer().then((buffer) => {
//         saveAs(
//           new Blob([buffer], { type: "application/octet-stream" }),
//           "권한그룹리스트.xlsx"
//         );
//       });
//     });
//   }, []);
