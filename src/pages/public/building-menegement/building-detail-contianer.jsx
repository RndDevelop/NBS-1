import { useState, useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import notify from "devextreme/ui/notify";
import { custom } from "devextreme/ui/dialog";
import BuildingDetailpresenter from "./building-detail-presenter";
import { useForm } from "react-hook-form";
import { buildingInfoObject } from "../../../asset/test-db/building-data";
import dayjs from "dayjs";

//유저 디테일
export default function BuildingDetailContainer(props) {
  //부모로 부터 받아온 row 데이
  const { selectedItemKeys } = props;

  const theme = useTheme();
  //작은 스크린 용도
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  //라디오버튼
  const [selectedValue, setSelectedValue] = useState("a");

  //useForm 기능 나열
  //register 입력한 필드값 가져오기
  //handleSubmit form 데이터 가져오는 이벤트
  //formState 입력한 폼데이터의 상태 체크 여기서 벨리데이션도 가능
  //control은 useForm 과 라이버리리 호환하기위해 사용됨
  // setValue 는 초기데이터 셋팅 하는 용도로 사용됨
  // getValue 셋팅된 초기데이터 사용하기위해 사용됨
  const { register, handleSubmit, formState, control, setValue, getValues } =
    useForm({
      defaultValues: buildingInfoObject,
    });

  // confirm 커스텀
  const mySaveDialog = custom({
    title: "건물정보등록",
    messageHtml: "<b>저장하시겠습니까?</b>",
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

  // confirm 커스텀
  const myDeleteDialog = custom({
    title: "건물정보 삭제",
    messageHtml: `<b>${getValues("buildingId")}-${getValues(
      "buildingName"
    )}  삭제하시겠습니까?</b>`,
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

  //건물정보 저장 버튼
  const onClickSave = async (data) => {
    //건물의 종류 , 이름이 비어있으면 return
    if (data.buildingType === "" || data.buildingName === "") {
      notify(
        {
          message: "건물종류 및 건물이름은 필수입력 란 입니다.",
          width: 500,
          shading: true,
          type: "error",
          displayTime: 1500,
        },
        { position: "center", direction: "up-push" }
      );
      return;
    }

    mySaveDialog.show().then((dialogResult) => {
      //확인 버튼 클릭시 저장
      if (dialogResult.buttonText === "확인") {
        // 객체 키값을 사용해서 해당하는 키값의 날짜 들을 찾고 찾은 데이터를 폼에 맞게 가공한다.
        // 만약 유저가 수정하지 않은 시간데이터가 있다면 그대로 시간데이터 폼에 맞게 저장된다.
        Object.keys(data).forEach((key) => {
          if (
            key === "buildingCompletionDate" ||
            key === "expirationDate" ||
            key === "designPeriodStart" ||
            key === "designPeriodEnd" ||
            key === "constructionPeriodStart" ||
            key === "constructionPeriodEnd" ||
            key === "supervisionPeriodStart" ||
            key === "supervisionPeriodEnd"
          ) {
            //데이트 포맷이 안맞을경우
            if (data[key].$d !== undefined) {
              const buildingCompletion = data[key].$d;
              //dayJs 라이브러리 사용하여 데이터 포맷 맞춰줌
              const datJsObject = dayjs(buildingCompletion);
              data[key] = datJsObject.format("YYYY-MM-DD");
            } else {
              //데이트 포맷이 맞을경우
              const buildingCompletion = data[key];
              //dayJs 라이브러리 사용하여 데이터 포맷 맞춰줌
              const datJsObject = dayjs(buildingCompletion);
              data[key] = datJsObject.format("YYYY-MM-DD");
            }
          }
        });
        notify(
          // 사용자 등록완료
          {
            message: "사용자 등록완료",
            width: 400,
            shading: true,
            type: "success",
            displayTime: 500,
          },
          { position: "center", direction: "up-push" }
        );
      } else {
        //취소버튼 클릭
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

  //건물정보 신규 및 삭제 버튼
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

  const handleChangeRadio = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    Object.keys(selectedItemKeys).forEach((values) => {
      const value = selectedItemKeys[values];
      setValue(values, value);
    });
  }, [selectedItemKeys]);

  return (
    <BuildingDetailpresenter
      selectedItemKeys={selectedItemKeys}
      isSmallScreen={isSmallScreen}
      selectedValue={selectedValue}
      onClickSave={onClickSave}
      handleButtonClick={handleButtonClick}
      handleChangeRadio={handleChangeRadio}
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      control={control}
      getValues={getValues}
      setValue={setValue}
      formControl={control}
    />
  );
}
