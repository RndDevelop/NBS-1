import RollDetailPresenter from "./roll-menegement-detail-presenter";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { rollObject } from "../../../../asset/test-db/roll";
import notify from "devextreme/ui/notify";
import { custom } from "devextreme/ui/dialog";
//권한의 스크립트를 작성하는 곳
export default function RollDetailContainor(props) {
  const { selectedItemKeys } = props;
  console.log(selectedItemKeys);
  //라디오 버튼 state
  const [selectedValue, setSelectedValue] = useState("");

  const { register, handleSubmit, formState, control, setValue } = useForm({
    defaultValues: rollObject,
  });

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
    messageHtml: "<b> 선택하신 사용자를 삭제하시겠습니까?</b>",
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
    if (data.GroupName === "" || data.UserId) {
      notify(
        {
          message: "그룹이름과 그룹 아이디는 필수입력입니다.",
          width: 400,
          shading: true,
          type: "error",
          displayTime: 900,
        },
        { position: "center", direction: "up-push" }
      );
      return;
    }
    mySaveDialog.show().then((dialogResult) => {
      if (dialogResult.buttonText === "확인") {
        console.log(data);
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
            //사용자가 선택한 로우 데이터
            console.log(selectedItemKeys);
            notify(
              // 알람 확인시
              {
                message: "건물정보 삭제",
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
  //라디오 버튼 클릭시 가져오는 데이터값
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    setSelectedValue(selectedItemKeys.use);
    Object.keys(selectedItemKeys).forEach((values) => {
      const value = selectedItemKeys[values];
      setValue(values, value);
    });
  }, [selectedItemKeys]);

  return (
    <RollDetailPresenter
      selectedValue={selectedValue}
      handleChange={handleChange}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      handleButtonClick={handleButtonClick}
      onClickSave={onClickSave}
      selectedItemKeys={selectedItemKeys}
    />
  );
}
