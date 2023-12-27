import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import notify from "devextreme/ui/notify";
import { custom } from "devextreme/ui/dialog";
import UserDetailPresenter from "./userDetail-presenter";
import { useForm } from "react-hook-form";
import { userObject } from "../../../asset/test-db/user-data";
import { useMutation } from "react-query";
import { createUser, deleteUser } from "../../../services/api/user-api";
//유저 디테일
export default function UserDetail(props) {
  const { selectedItemKeys } = props;

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedValue, setSelectedValue] = useState("");

  const { register, handleSubmit, formState, control, setValue } = useForm({
    defaultValues: userObject,
  });

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  const { mutate, error } = useMutation(
    async (data) => {
      await createUser("NBSZ0000", data);
    },
    {
      onSuccess: () => {
        notify(
          {
            message: "유저등록 완료",
            width: 300,
            shading: true,
            type: "success",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      },
      onError: (error, variables, context) => {
        notify(
          {
            message: "유저등록실패",
            width: 300,
            shading: true,
            type: "error",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      },
    }
  );

  const { mutate: userDelete, error: user } = useMutation(
    async (data) => {
      await createUser("NBSZ0000", data);
    },
    {
      onSuccess: () => {
        notify(
          {
            message: "유저등록 완료",
            width: 300,
            shading: true,
            type: "success",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      },
      onError: (error, variables, context) => {
        notify(
          {
            message: "유저등록실패",
            width: 300,
            shading: true,
            type: "error",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      },
    }
  );

  const mySaveDialog = custom({
    title: "사용자 등록",
    messageHtml: "<b>입력하신 정보로 사용자를 등록하시겠습니까?</b>",
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

  const myDeleteDialog = custom({
    title: "사용자 삭제",
    messageHtml: `[ID:${selectedItemKeys.userId} name:${selectedItemKeys.userName}]<b>선택하신 사용자를 삭제하시겠습니까?</b>`,
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

  const onClickSave = async (data) => {
    if (data.UserId === "" || data.UserName === "" || data.password === "") {
      notify(
        {
          message: "ID , 이름 , 패스워드는 필수 입력 사항입니다.",
          width: 400,
          shading: true,
          type: "warning",
          displayTime: 900,
        },
        { position: "center", direction: "up-push" }
      );
    }

    mySaveDialog.show().then((dialogResult) => {
      if (dialogResult.buttonText === "확인") {
        const body = {
          userId: data.userId,
          userName: data.userName,
          email: data.email,
          resetPwd: "12345",
          userPwd: "123456",
          department: data.department,
          jobTitle: data.jobTitle,
          cellPhone: data.cellPhone,
          telPhone: data.telPhone,
          remark: data.remark,
          useYn: selectedValue,
          delYn: selectedValue,
        };

        mutate(body);
        notify(
          {
            message: "사용자 등록완료",
            width: 300,
            shading: true,
            type: "warning",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      } else {
        notify(
          {
            message: "사용자 등록취소",
            width: 300,
            shading: true,
            type: "error",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
      }
    });
  };

  const handleButtonClick = async (e, btnType) => {
    e.preventDefault();
    switch (btnType) {
      //신규 버튼 클릭시 selectedItemKeys 데이터 지워짐
      case "new":
        Object.keys(selectedItemKeys).forEach((values) => {
          setValue(values, "");
        });
        break;
      //선택한 로우 삭제
      case "delete":
        myDeleteDialog.show().then((dialogResult) => {
          if (dialogResult.buttonText === "확인") {
            deleteUser({ roll: "NBSZ0000", userId: selectedItemKeys.userId });

            notify(
              // 알람 확인시
              {
                message: "유저 삭제",
                width: 300,
                shading: true,
                type: "warning",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          } else {
            notify(
              // 취소버튼 클릭시
              {
                message: "삭제취소",
                width: 300,
                shading: true,
                type: "error",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          }
        });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    setSelectedValue(selectedItemKeys.useYn);
    Object.keys(selectedItemKeys).forEach((values) => {
      const value = selectedItemKeys[values];
      setValue(values, value);
    });
  }, [selectedItemKeys]);

  return (
    <UserDetailPresenter
      selectedItemKeys={selectedItemKeys}
      isSmallScreen={isSmallScreen}
      onClickSave={onClickSave}
      handleButtonClick={handleButtonClick}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      formControl={control}
      handleChangeRadio={handleChangeRadio}
      selectedValue={selectedValue}
    />
  );
}
