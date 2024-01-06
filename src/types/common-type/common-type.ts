export interface IParentCode {
  codeId: string;
  codeName: string;
  prntcodeId: string;
  sortOdr: number;
  useYn: string;
}

export interface ICommonCreate {
  codeId?: string;
  prntcodeId?: string;
  codeName: string;
  codeDesc: string;
  sortOdr: 0;
  useYn: string;
  remark: string;
  sprfield1?: string;
  sprfield2?: string;
  sprfield3?: string;
  sprfield4?: string;
  sprfield5?: string;
  createdBy?: string;
  createdAt?: string;
  updatedBy?: string;
  updatedAt?: string;
}

export interface IChildrenCode {
  codeId: string;
  codeName: string;
  createdAt: string;
  createdBy: string;
  remark: string;
  prntcodeId: string;
  sortOdr: number;
  updatedAt: string;
  updatedBy: string;
  useYn: string;
}
