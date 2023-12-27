import { useState, useEffect } from "react";
import MenuDetailPresenter from "./menu-detail-presenter";
import notify from "devextreme/ui/notify";
import { custom } from "devextreme/ui/dialog";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import {
  createMenus,
  dellMenu,
  updateMenu,
} from "../../../services/api/menu-api";

//메뉴관리 스크립트를 작성하는 곳
export default function MenuDetailContainor(props) {
  const {
    selectedItemKeys,
    setSuccess,
    success,
    disabled,
    setDisabled,
    menuData,
    selectedSystem,
  } = props;

  const { register, handleSubmit, control, setValue, reset } = useForm({
    // defaultValues: TreeObject,
  });
  //라디오 버튼 state
  const [selectedValue, setSelectedValue] = useState("");

  //같은 레벨 하위레벨 타입 관리 state
  const [btnType, setBtnType] = useState("type");

  // 수정모드 , 저장모드 관리
  const [selectedMode, setSelectedMode] = useState("UPDATE");

  //레벨3 체크
  const [menuLevelChecked, setMenuLevelChecked] = useState(true);

  const [prevSelectedItemKeys, setPrevSelectedItemKeys] = useState(null);
  //라디오 버튼 클릭시 가져오는 데이터값
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  //"NBSZBAS04"
  //메뉴 생성 api
  const { mutate, error } = useMutation(
    async (data) => {
      await createMenus(
        "NBSZ0000",
        selectedItemKeys.menuId,
        selectedItemKeys.prntmenuId,
        btnType,
        data
      )
        .then((res) => {
          if (res.status === 200) {
            notify(
              {
                message: "메뉴등록 완료",
                width: 300,
                shading: true,
                type: "success",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
            setSelectedMode("UPDATE");
            return;
          }

          if (res.response.data.error) {
            notify(
              {
                message: "동일한 ID가 존재합니다.",
                width: 300,
                shading: true,
                type: "error",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          }
          return;
        })
        .catch((err) => {
          return err;
        });
    },

    {
      // 메뉴 생성 성공시
      onSuccess: () => {
        setSuccess(!success);
        setBtnType("type");
        return;
      },
    }
  );

  //메뉴 수정 Api
  const { mutate: menuUpdate, error: updateError } = useMutation(
    async (data) => {
      //권한 , 선택한로우의 메뉴아이디, 수정할 데이터
      try {
        await updateMenu("NBSZ0000", selectedItemKeys.menuId, data);
      } catch (error) {
        console.log(error);
      }
    },

    {
      //수정 성공시
      onSuccess: () => {
        notify(
          {
            message: "메뉴수정 완료",
            width: 300,
            shading: true,
            type: "success",
            displayTime: 300,
          },
          { position: "center", direction: "up-push" }
        );
        setSuccess(!success);
        setBtnType("type");
        return;
      },
    }
  );

  //메뉴삭제 API
  const { mutate: dellmutate } = useMutation(
    async (data) => {
      // 권한 , 선택한로우 메뉴아이디
      await dellMenu("NBSZ0000", selectedItemKeys.menuId)
        .then((response) => {
          if (response.status === 200) {
            notify(
              {
                message: "메뉴 삭제",
                width: 300,
                shading: true,
                type: "warning",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          }
        })
        .catch((err) => {
          if (err.response.data.status === 500) {
            notify(
              {
                message: "하위메뉴가 존재합니다.",
                width: 300,
                shading: true,
                type: "error",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
          }
          return;
        });
    },
    {
      onSuccess: () => {
        setSuccess(true);
        setBtnType("type");
      },
    }
  );

  // data.items = 하위메뉴
  // data = 입력폼 데이터
  //data.menuId  => 메뉴 id
  //selectedItemKeys.menuId => 선택한 로우의 메뉴아이디
  //데이터 저장
  const onClickSave = async (data, e) => {
    //메뉴 수정 ( 선택한 메뉴와 입력한 필드값의 메뉴아이디가 동일할때)

    if (selectedMode === "UPDATE") {
      // 업데이트 진행시 하위메뉴와 , 부모의 메뉴이름은 지운다. // 업데이트시 명시한 2개의 객체는 API 문서에 존재하지 않는다.
      if (data) {
        delete data.parntMenuName;
      }

      //입력폼에서 가져온 데이터를 데이터 형태에 맞게 다시 가공한다.
      const body = {
        //아래의 정의된 내용은 type폴더에 명시되어 있따.
        applicationName: data.applicationName,
        menuId: data.menuId,
        menuName: data.menuName,
        sortOdr: data.sortOdr,
        prntmenuId: data.prntmenuId,
        menuUrl: data.menuUrl,
        remark: data.remark,
        useYn: selectedValue,
        items: [data.items],
      };
      // 알람창에서 확인 클릭시 메뉴수정 함수가 동작한다.
      //dialogResult => 버튼의 텍스트 값을 가져온다
      mySaveDialog.show().then(async (dialogResult) => {
        if (dialogResult.buttonText === "확인") {
          menuUpdate(body);
        } else {
          notify(
            {
              message: "메뉴수정 취소",
              width: 300,
              shading: true,
              type: "error",
              displayTime: 300,
            },
            { position: "center", direction: "up-push" }
          );
          setBtnType("type");
          return;
        }
      });
    }

    if (selectedMode === "SAVE") {
      // 선택한 로우가 없을시 또는 입력한 메뉴 아이디가 다를시
      // 업데이트시 명시한 2개의 객체는 API 문서에 존재하지 않는다.
      // 메뉴 생성
      if (data.menuId !== "" || data.menuName !== "") {
      }
      if (data) {
        delete data.items;
        delete data.parntMenuName;
      }

      // 저장 필수값 확인한다 menuId와 menuName 은 필수값이다.
      if (data.menuId === "" || data.menuName === "") {
        notify(
          {
            message: "메뉴 이름과 그룹 메뉴ID는 필수입력입니다.",
            width: 400,
            shading: true,
            type: "error",
            displayTime: 900,
          },
          { position: "center", direction: "up-push" }
        );
        return;
      }

      //모든 데이터가 만족시 실행
      // 알람창에서 확인 클릭시 메뉴생성 함수가 동작한다.
      mySaveDialog.show().then(async (dialogResult) => {
        if (dialogResult.buttonText === "확인") {
          //입력폼에서 가져온 데이터를 데이터 형태에 맞게 다시 가공한다.
          const body = {
            //아래의 정의된 내용은 type폴더에 명시되어 있따.
            applicationName: selectedSystem,
            menuId: data.menuId,
            menuName: data.menuName,
            sortOdr: data.sortOdr,
            prntmenuId: data.prntmenuId,
            menuUrl: data.menuUrl,
            remark: data.remark,
            useYn: selectedValue,
          };

          //메뉴생성 함수
          mutate(body);
          return;
        } else {
          notify(
            {
              message: "메뉴등록취소",
              width: 300,
              shading: true,
              type: "default",
              displayTime: 300,
            },
            { position: "center", direction: "up-push" }
          );
          setBtnType("type");
          return;
        }
      });
    }
  };

  //신규 버튼 및 로우삭제 할때 실행되는 함수
  //btnType : new, delete
  //type : sublevel, samelavel
  const handleButtonClick = async (e, btnType, type) => {
    e.preventDefault();
    //같은 level 인지 하위 level 인지 구분 버튼에서 받아옴
    setBtnType(type);
    //버튼 타입이 신규인지 삭제인제 구분 하여 실행
    switch (btnType) {
      case "new":
        setSelectedMode("SAVE");
        setDisabled(true);

        // 버튼 타입이 하위레벨을 클릭했을 경우
        if (type === "sublevel") {
          //하위 레벨 버튼 클릭시 3레벨이면 메뉴생성을 막아야하기 때문에 선택한 로우가 3레벨인지 찾는작업
          const hasLevel3Menu = menuData.some((item) =>
            item.items.some((key) =>
              key.items.some(
                (items) => items.menuId === selectedItemKeys.menuId
              )
            )
          );

          // 3레벨이 아니고 2레벨에서 하위레벨 버튼을 클릭시 2레벨의 상위메뉴인 1레벨의 아이디가 2레벨의 상위메뉴ID로 셋팅하기위한 작업
          Object.keys(selectedItemKeys).forEach((values) => {
            if (values === "prntmenuId") {
              const value = selectedItemKeys["menuId"];
              setValue(values, value);
            }
          });

          if (hasLevel3Menu) {
            // 레벨 3의 메뉴가 있는 경우 같은레벨, 하위레벨, 저장을 disabled 처리
            notify(
              {
                message: "레벨3의 메뉴는 하위메뉴를 생성할 수 없습니다.",
                width: 400,
                shading: true,
                type: "error",
                displayTime: 1500,
              },
              { position: "center", direction: "up-push" }
            );
            setDisabled(false);
            setMenuLevelChecked(false);
            setSelectedMode("UPDATE");
          }
        }

        Object.keys(selectedItemKeys).forEach((values) => {
          if (
            values !== "applicationName" &&
            values !== "parntMenuName" &&
            values !== "prntmenuId" &&
            values !== "sortOdr"
          ) {
            //기존에 저장한 value들까지 초기화 시킨다.
            setValue(values, "");
          }
        });

        break;
      //선택한 로우 삭제
      case "delete":
        //선택한 로우가 없다면 리턴
        if (selectedItemKeys === undefined) {
          return;
        }
        //선택한 로우의 데이터 정보를 삭제 api로 전달
        myDeleteDialog.show().then(async (dialogResult) => {
          if (dialogResult.buttonText === "확인") {
            if (selectedItemKeys !== undefined) {
              await myDeleteDialog.show();
              dellmutate(selectedItemKeys.menuId);
            }
          } else {
            notify(
              {
                message: "삭제취소",
                width: 300,
                shading: true,
                type: "error",
                displayTime: 300,
              },
              { position: "center", direction: "up-push" }
            );
            setBtnType("type");
            return;
          }
        });
        break;
      default:
        break;
    }
  };

  //데이터 저장 알람
  //selectedMode => 수정모드인지 , 입력모드 인지 구분
  //btnType => 같은레벨인지 , 하위메뉴인지
  const mySaveDialog = custom({
    title: selectedMode === "SAVE" ? "메뉴저장" : "메뉴수정",
    messageHtml:
      btnType === "sublevel" && selectedMode === "SAVE"
        ? "<b>하위메뉴로 저장하시겠습니까?</b>"
        : btnType === "type" ||
          (btnType === "sublevel" && selectedMode === "UPDATE")
        ? `<b>${
            selectedItemKeys && selectedItemKeys.menuId
          } 수정하시겠습니까?</b>`
        : "<b>같은메뉴로 저장하시겠습니까?</b>",
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
          setSelectedMode("UPDATE");
          setBtnType("");
          return { buttonText: e.component.option("text") };
        },
      },
    ],
  });

  //데이터 삭제 알람 // 선택한 로우의 키가 있고 있다면 해당하는 하는 로우의 정보를 보여줌
  const myDeleteDialog = custom({
    title: "메뉴 삭제",
    messageHtml:
      selectedItemKeys &&
      `<b>[${selectedItemKeys.menuId}-${selectedItemKeys.menuName}] 삭제하시겠습니까?</b>`,
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
          setSelectedMode("UPDATE");
          return { buttonText: e.component.option("text") };
        },
      },
    ],
  });

  // 이전의 선택한 로우와 현재 선택된 로우를 비교하기 위한 함수
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  // 페이지 리렌더링 조건은 로우가 변경될때
  useEffect(() => {
    if (selectedItemKeys && selectedItemKeys.length !== 0) {
      setSelectedValue(selectedItemKeys.useYn);

      // 이전 로우 값과 현재 로우 값이 다를 때 이벤트 트리거
      if (
        !prevSelectedItemKeys ||
        !isEqual(selectedItemKeys, prevSelectedItemKeys)
      ) {
        // 여기에서 이벤트를 트리거하거나 원하는 작업을 수행
        setMenuLevelChecked(true);
        // 변경된 로우 값을 저장
        setPrevSelectedItemKeys(selectedItemKeys);
      }

      // 로우 값에 대한 설정
      Object.keys(selectedItemKeys).forEach((values) => {
        const value = selectedItemKeys[values];
        setValue(values, value);
      });
    }
  }, [selectedItemKeys, prevSelectedItemKeys, menuLevelChecked]);

  return (
    <MenuDetailPresenter
      selectedValue={selectedValue}
      handleChange={handleChange}
      register={register}
      handleSubmit={handleSubmit}
      control={control}
      handleButtonClick={handleButtonClick}
      onClickSave={onClickSave}
      selectedItemKeys={selectedItemKeys && selectedItemKeys}
      prevSelectedItemKeys={prevSelectedItemKeys}
      disabled={disabled}
      btnType={btnType}
      menuLevelChecked={menuLevelChecked}
    />
  );
}

// const selecteDellKey = menuData.filter((item) => {
//   return item.items.some((key) => {
//     // 내부 filter 대신 some 사용
//     if (key.applicationName === "BAS") {
//       if (key.menuId === selectedItemKeys.menuId) {
//         if (key.items.length > 0) {
//           notify(
//             {
//               message: "하위메뉴가 존재합니다.",
//               width: 400,
//               shading: true,
//               type: "warning",
//               displayTime: 900,
//             },
//             { position: "center", direction: "up-push" }
//           );
//           return true; // 내부 filter 대신 true 반환
//         }
//       }
//     }
//     return false; // 내부 filter 대신 false 반환
//   });
// });
