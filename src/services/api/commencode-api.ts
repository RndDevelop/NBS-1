import axios, { AxiosError } from "axios";
import { getCookie } from "../../config/cookies";
import notify from "devextreme/ui/notify";
import {
  IChildrenCode,
  ICommonCreate,
} from "../../types/common-type/common-type";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const accessToken = getCookie("accessToken");

//공통코드 부모 코드 조회
export const commonCodeQuery = async () => {
  try {
    const response = await axios.get<ICommonCreate[]>(
      BASE_URL + "/api/v1/menu/common/commoncodes/supercodes",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          menu: "NBSXA010",
        },
      }
    );

    if (response.status === 200) {
      const code = response.data;
      return code;
      // 다른 경우에 대한 로직 추가
    } else {
      // 서버 응답이 200이 아닌 경우
      notify("조회 실패");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }

  // 실패 시 빈 배열 또는 다른 기본값 반환
  return [];
};

//공통코드 자식 조회
export const commonChildrenQuery = async (prntCodeId: string) => {
  try {
    if (prntCodeId === "") {
      const response = await axios.get<IChildrenCode[]>(
        BASE_URL + `/api/v1/menu/common/commoncodes/subcodes/A001`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            menu: "NBSXA010",
          },
        }
      );
      if (response.status === 200) {
        const children = response.data as IChildrenCode[];

        const childCode = children.map((item, i) => ({
          codeId: item.codeId,
          codeName: item.codeName,
          createdAt: item.createdAt,
          createdBy: item.createdBy,
          prntcodeId: item.prntcodeId,
          sortOdr: item.sortOdr,
          updatedAt: item.updatedAt,
          updatedBy: item.updatedBy,
          useYn: item.useYn === "Y" ? 1 : 2,
        }));
        return childCode;
      } else {
        notify("조회중 에러발생");
      }
    } else {
      const response = await axios.get<IChildrenCode[]>(
        BASE_URL + `/api/v1/menu/common/commoncodes/subcodes/${prntCodeId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            menu: "NBSXA010",
          },
        }
      );
      if (response.status === 200) {
        const children = response.data as IChildrenCode[];

        const childCode = children.map((item, i) => ({
          codeId: item.codeId,
          codeName: item.codeName,
          prntcodeId: item.prntcodeId,
          sortOdr: item.sortOdr,
          useYn: item.useYn === "Y" ? 1 : 2,
          remark: item.remark,
          createdAt: item.createdAt,
          createdBy: item.createdBy,
          updatedAt: item.updatedAt,
          updatedBy: item.updatedBy,
        }));
        return childCode;
      } else {
        notify("조회중 에러발생");
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }
};

//부모코드생성
//body: 로우데이터 객체
//type: sameLevel 부모코드생성(같은레벨) 및 하위코드 생성할때 사용함
//type: sublevel은 부모코드에서 하위코드 생성할때 사용한다.
export const commonCodeCreate = async (body: ICommonCreate, prefix: string) => {
  console.log(prefix);
  try {
    const response = await axios.post(
      // BASE_URL + `/api/v1/menu/common/commoncodes/supercode/${prefix}`,
      BASE_URL +
        `/api/v1/menu/common/commoncodes/supercode/${prefix ? prefix : "A"}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          menu: "NBSXA010",
        },
      }
    );
    if (response.status === 200) {
      notify(
        {
          message: "코드생성완료",
          width: 300,
          shading: true,
          type: "default",
          displayTime: 300,
        },
        //알람 위치값
        { position: "center", direction: "up-push" }
      );
      return response.data;
    } else {
      notify(
        {
          message: "코드생성실패",
          width: 300,
          shading: true,
          type: "error",
          displayTime: 300,
        },
        //알람 위치값
        { position: "center", direction: "up-push" }
      );
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }
};

//상위 공통코드 수정
export const commonCodeUpdate = async (body: ICommonCreate) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/v1/menu/common/commoncodes/${body.codeId}/${body.prntcodeId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          menu: "NBSXA010",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      notify(
        {
          message: "코드수정실패",
          width: 300,
          shading: true,
          type: "error",
          displayTime: 300,
        },
        //알람 위치값
        { position: "center", direction: "up-push" }
      );
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }
};

//상위 코드삭제
export const commonCodeDelete = async (codeId: string) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/menu/common/commoncodes/supercodes/${codeId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          menu: "NBSXA010",
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }
};

//하위코드생성
export const commonChildrenCreate = async (body: ICommonCreate) => {
  console.log(body);
  try {
    const response = await axios.post<ICommonCreate>(
      `${BASE_URL}/api/v1/menu/common/commoncodes/subcode/${body.prntcodeId}`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          menu: "NBSXA010",
        },
      }
    );

    console.log(response);
    if (response.status === 200) {
      const code = response.data;
      notify(
        {
          message: "코드생성완료",
          width: 300,
          shading: true,
          type: "success",
          displayTime: 300,
        },
        //알람 위치값
        { position: "center", direction: "up-push" }
      );
      return code;
    } else {
      notify(
        {
          message: "코드생성실패",
          width: 300,
          shading: true,
          type: "error",
          displayTime: 300,
        },
        //알람 위치값
        { position: "center", direction: "up-push" }
      );
      return response.data;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // AxiosError 타입으로 캐스팅
      const axiosError = error as AxiosError;
      // 예를 들어 특정 상황에 따라 다른 처리를 하려면
      if (axiosError.response) {
        // 서버 응답이 있는 경우
        return axiosError.response.data;
      } else if (axiosError.request) {
        // 요청은 보냈지만 응답이 없는 경우
        return "No response received";
      } else {
        // 요청을 보내기 전에 오류 발생
        return axiosError.message;
      }
    } else {
      // AxiosError가 아닌 다른 종류의 오류 처리
      return error;
    }
  }
};
