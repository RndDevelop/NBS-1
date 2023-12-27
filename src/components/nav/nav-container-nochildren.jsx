//2023 11 27 최초 작성장 박경찬 SideNav
import NavPresenter from "./nav-presenter";
import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { menuQuery } from "../../services/api/menu-api";
import { useSelector } from "react-redux";
import { AppContext } from "../../pages/home/home";
import { useAppDispatch } from "../../store/store/store";
import { setUpIframe } from "../../store/menu-slice/iframe-slice";

//Side Nav
export default function Nav(props) {
  const { setIsCancel } = props;

  const navigation = useNavigate();
  const size = useContext(AppContext);
  const appDispatch = useAppDispatch();

  //middle 메뉴 저장 및 불러오기
  const [selectedMenu, setSelectMenu] = useState();
  const [filterMiddleMenu, setFilteredMiddleMenu] = useState();

  //sub 메뉴 저장 및 불러오기
  const [selectSub, setSelectSub] = useState();
  const [filterSubeMenu, setFilteredSubMenu] = useState([]);

  //end메뉴 확인하기
  const [selectEndMenu, setSelectEndMenu] = useState("");
  // const [sortData, setSortData] = useState([]);

  //토글버튼으로 시스템 이름 가져옴
  const { systemSelected } = useSelector((state) => state.systemSelectedSlice);

  //로그인하면서 저장된 system 이름
  const { user } = useSelector((state) => state.login);

  //ApiData Setting
  const system = systemSelected.systemValue;

  //메뉴 Api
  const { data, isLoading, refetch, error } = useQuery(
    ["menu", user.system],
    async () => await menuQuery(system),
    {
      enabled: false,
      refetchInterval: false,
      cacheTime: 3600000,
      staleTime: 60000,
    }
  );

  //라우터 정의
  const menuRoutes = useMemo(() => {
    return {
      공통코드관리: "/publiccode",
      사용자관리: "/usermanegement",
      메뉴관리: "/menumanegement",
      권한그룹관리: "/rollmanegement",
      권한그룹별사용자관리: "/rollgroup",
      권한그룹별메뉴관리: "/rollmenumanegement",
      건물기본정보: "/buildingmanegement",
    };
  }, []); // 빈 의존성 배열로 메모이제이션

  //시스템 이름 관리
  const [systemName, setSystemName] = useState("");

  //메뉴바텀
  const [expanded, setExpanded] = useState(false);

  const onClickMiddleMenu = (e, menuId) => {
    setSelectMenu((prev) => (prev === menuId ? null : menuId));

    const selectFilterMenu = data.find((middle) => middle.menu === menuId);

    if (selectFilterMenu) {
      const middleItems = selectFilterMenu.middleMenu.map((middle) => middle);
      // console.log("Filtered Middle Menu:", middleItems);
      setFilteredMiddleMenu(middleItems);
      setExpanded(false);
    }
  };

  //서브메뉴 클릭시 동작 함수
  const onClickSubmenu = (e, subMenuId) => {
    setSelectSub((prev) => (prev === subMenuId ? null : subMenuId));

    const selectSub1 = filterMiddleMenu.find(
      (sub) => sub.middleName === subMenuId
    );

    if (selectSub1.subMenu !== undefined) {
      const filterSubMenu = selectSub1.subMenu.map((submenu) => {
        return submenu;
      });

      setFilteredSubMenu(filterSubMenu);
    } else {
      setFilteredSubMenu(null);
      return;
    }
  };

  // const isSelectEndMenuEqual = (clickedSubMenu) => {
  //   return selectEndMenu === clickedSubMenu;
  // };
  //최하위 메뉴 선택시 동작 함수
  const onClickEndMenu = (
    applicationName,
    menuId,
    menuName,
    sortOdr,
    menuUrl
  ) => {
    setSelectEndMenu((prev) => (prev === menuName ? "" : menuName));

    // if (isSelectEndMenuEqual(clickedSubMenu)) {
    //   // selectEndMenu와 clickedSubMenu가 같을 때의 동작
    //   console.log("selectEndMenu와 clickedSubMenu가 같습니다.");
    // } else {
    //   // selectEndMenu와 clickedSubMenu가 다를 때의 동작
    //   console.log("selectEndMenu와 clickedSubMenu가 다릅니다.");
    // }

    if (menuRoutes[menuName]) {
      navigation(menuRoutes[menuName]);
    }

    if (applicationName === "BAS") {
      appDispatch(
        setUpIframe({
          applicationName: applicationName,
          menuId: menuId,
          menuName: menuName,
          sortOdr: sortOdr,
          menuUrl: menuUrl,
        })
      );
      navigation("/basair");
    }
  };

  const handleCancel = () => {
    setIsCancel((prev) => !prev);
  };

  useEffect(() => {
    if (systemName === "") {
      setSystemName("BEMS");
    }

    refetch();
    //데이터 정렬
  }, [isLoading, system, selectEndMenu]);

  return (
    <>
      {!isLoading && (
        <NavPresenter
          menu={data && data}
          onClickSubmenu={onClickSubmenu}
          onClickMiddleMenu={onClickMiddleMenu}
          filterMiddleMenu={filterMiddleMenu}
          selectedMenu={selectedMenu}
          selectSub={selectSub}
          filterSubeMenu={filterSubeMenu}
          expanded={expanded}
          handleCancel={handleCancel}
          onClickEndMenu={onClickEndMenu}
          size={size}
          selectEndMenu={selectEndMenu}
        />
      )}
    </>
  );
}

// setFilteredMiddle((prev) => {
//   if (!prev[selectedMenu].includes(subMenuId)) {
//     return {
//       ...prev,
//       [selectedMenu]:[...prev[selectedMenu], subMenuId],
//     };
//   }
// });
// setFilteredSub((prev) => [prev, ...filterSubMenu]);
