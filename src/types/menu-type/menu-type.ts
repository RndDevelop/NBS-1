export interface ICreateSupermenus {
  applicationName: string;
  menuId: string;
  menuName: string;
  sortOdr: number;
  prntmenuId: string;
  menuUrl: string;
  remark: string;
  useYn: string;
  items: [];
}

//메뉴 사이드바 API
export interface IMenu {
  applicationName: string;
  menuId: string;
  menuName: string;
  sortOdr: number;
  prntmenuId: string;
  menuUrl: string;
  remark: string;
  useYn: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

export interface SubMenu {
  applicationName: string;
  id: string;
  subName: string;
  sortOdr: number;
  menuUrl: string;
}

export interface MiddleMenu {
  applicationName: string;
  id: string;
  middleName: string;
  sortOdr: number;
  menuUrl: string;
  subMenu: SubMenu[];
}

export interface DataItem {
  applicationName: string;
  id: string;
  menu: string;
  sortOdr: number;
  menuUrl: string;
  middleMenu: MiddleMenu[];
}
///////////////////////
//메뉴관리 API 타입정의
export interface IMenumanagement {
  applicationName: string; //시스템이름
  createdAt: string; //등록자
  createdBy: string; // 등록시간
  menuId: string; //메뉴 id
  menuName: string; // 메뉴이름
  menuUrl: string; //메뉴 url
  parntMenuName: string; //부모이름
  prntmenuId: string; // 부모아이디
  remark: string; // 비거
  sortOdr: number; // 정렬
  updatedAt: string; // 수정자
  updatedBy: string; // 수정시간
  useYn: string; // 사용여부
  useYnName: string; // 사용여부이름
}

export interface IMenumanagementSub {
  applicationName: string;
  createdAt: string;
  createdBy: string;
  menuId: string;
  menuName: string;
  menuUrl: string;
  parntMenuName: string;
  prntmenuId: string;
  remark: string;
  sortOdr: number;
  updatedAt: string;
  updatedBy: string;
  useYn: string;
  useYnName: string; // 사용여부이름
}

export interface IMenumanagementMid {
  applicationName: string;
  createdAt: string;
  createdBy: string;
  menuId: string;
  menuName: string;
  menuUrl: string;
  parntMenuName: string;
  prntmenuId: string;
  remark: string;
  sortOdr: number;
  updatedAt: string;
  updatedBy: string;
  useYn: string;
  useYnName: string; // 사용여부이름
  items: IMenumanagementSub[];
}

export interface IMenumanagementData {
  applicationName: string;
  createdAt: string;
  createdBy: string;
  menuId: string;
  menuName: string;
  menuUrl: string;
  parntMenuName: string;
  prntmenuId: string;
  remark: string;
  sortOdr: number;
  updatedAt: string;
  updatedBy: string;
  useYn: string;
  useYnName: string; // 사용여부이름
  items: IMenumanagementMid[];
}
