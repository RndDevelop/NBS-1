import axios from "axios";
import { error } from "console";
import { getCookie } from "../../config/cookies";

interface IUser {
  userId: string;
  userName: string;
  department: string;
  jobTitle: string;
  jobTitleName: string;
  cellPhone: string;
  telPhone: string;
  email: string;
  rsetPassword: string;
  remark: string;
  useYn: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
}

interface IUserInsert {
  userId: string;
  userName: string;
  email: string;
  resetPwd: string;
  userPwd: string;
  department: string;
  jobTitle: string;
  cellPhone: string;
  telPhone: string;
  remark: string;
  useYn: string;
  delYn: string;
}
const accessToken = getCookie("accessToken");
export const userQuery = (roll: string) => {
  const response = axios
    .get<IUser[]>(`/api/v1/menu/common/usermanagements/users`, {
      headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
    })
    .catch((error) => error.message);

  return response;
};

export const createUser = (roll: string, body: IUserInsert) => {
  console.log(roll, body);
  const response = axios.post(
    "/api/v1/menu/common/usermanagements/register",
    body,
    {
      headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
    }
  );

  return response;
};

//유저삭제
export const deleteUser = (userInfo: { roll: string; userId: string }) => {
  console.log(userInfo);
  const response = axios
    .delete(`/api/v1/menu/common/usermanagements/users/${userInfo.userId}`, {
      headers: { Authorization: `Bearer ${accessToken}`, menu: userInfo.roll },
    })

    .then((res) => res.data)
    .catch((error) => {
      return error.message;
    });
  return response;
};
