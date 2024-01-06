import axios, { AxiosError } from "axios";
import { getCookie } from "../../config/cookies";

import {
  DataItem,
  ICreateSupermenus,
  IMenu,
  IMenumanagement,
  IMenumanagementData,
  IMenumanagementSub,
  SubMenu,
} from "../../types/menu-type/menu-type";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;
//NBSXA010
//NBSZ0000
export const menuQuery = async (
  systemId: string
): Promise<DataItem[] | undefined> => {
  const accessToken = getCookie("accessToken");

  if (accessToken === undefined) {
    //토큰이 없으면 return;
    return;
  } else {
    try {
      const response = await axios
        .get<IMenu[]>(
          BASE_URL + `/api/v1/menu/common/menumanagement/menus/${systemId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              menu: "NBSXA010",
            },
          }
        )
        .catch((error: any) => error.message);
      if (response.status === 401) {
        console.log(response);
        return;
      }
      const menuData: IMenu[] = response.data;
      if (menuData !== undefined) {
        const flattenedMenuData: IMenu[] = menuData.filter((menu) =>
          menu.prntmenuId === "NBS00000"
            ? menu.prntmenuId === "NBS00000"
            : menu.prntmenuId === "NBB00000"
        );

        const RootData: DataItem[] = flattenedMenuData.flatMap((menu) => {
          const childMenus = menuData.filter(
            (childMenu) => childMenu.prntmenuId === menu.menuId
          );

          const subMenuArray: SubMenu[] = childMenus.map((childMenu) => ({
            applicationName: childMenu.applicationName,
            id: childMenu.menuId,
            subName: childMenu.menuName,
            sortOdr: childMenu.sortOdr,
            menuUrl: childMenu.menuUrl,
          }));

          const sub = subMenuArray.flatMap((subMenu) => {
            const childMenus = menuData.filter(
              (menu) => menu.prntmenuId === subMenu.id
            );
            return childMenus.map((childMenu) => ({
              applicationName: childMenu.applicationName,
              id: childMenu.menuId,
              subName: childMenu.menuName,
              prntmenuId: subMenu.id,
              sortOdr: childMenu.sortOdr,
              menuUrl: childMenu.menuUrl,
            }));
          });

          const matchedSubMenus = sub.filter((subMenu) =>
            subMenuArray.some((sub) => sub.id === subMenu.prntmenuId)
          );

          const data: DataItem[] = [
            {
              applicationName: menu.applicationName,
              id: menu.menuId,
              menu: menu.menuName,
              sortOdr: menu.sortOdr,
              menuUrl: menu.menuUrl,
              middleMenu: subMenuArray.map((matchedSubMenu) => ({
                applicationName: matchedSubMenu.applicationName,
                id: matchedSubMenu.id,
                middleName: matchedSubMenu.subName,
                sortOdr: matchedSubMenu.sortOdr,
                menuUrl: matchedSubMenu.menuUrl,
                subMenu: matchedSubMenus
                  .filter(
                    (matchedSubId) =>
                      matchedSubId.prntmenuId === matchedSubMenu.id
                  )
                  .map((matchedSubId) => ({
                    applicationName: matchedSubId.applicationName,
                    id: matchedSubId.id,
                    subName: matchedSubId.subName,
                    sortOdr: matchedSubId.sortOdr,
                    menuUrl: matchedSubId.menuUrl,
                  })),
              })),
            },
          ];
          return data;
        });

        const routerData = RootData.sort((a, b) => a.sortOdr - b.sortOdr);
        return RootData;
      }
    } catch (error) {
      return;
    }
  }
};

//메뉴 관리
//NBSZ0000
//NBSXA010
//NBSXC020
//NBSZA010
//NBSZD010
export const menuMenegementQuery = async (systemId: string) => {
  const accessToken = getCookie("accessToken");

  if (systemId !== "") {
    const response = await axios.get(
      BASE_URL + `/api/v1/menu/common/menumanagement/menus/${systemId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}`, menu: "NBSXA010" },
      }
    );

    if (response.status !== 200) {
      return response;
    }

    const menuData: IMenumanagement[] = response.data;

    const flattenedMenuData: IMenumanagement[] = menuData.filter(
      (menu) => menu.prntmenuId === "NBS00000" ?? menu.prntmenuId === "NBS00000"
    );

    const RootData: IMenumanagementData[] = flattenedMenuData.flatMap(
      (menu) => {
        const childMenus = menuData.filter(
          (childMenu) => childMenu.prntmenuId === menu.menuId
        );
        const subMenuArray: IMenumanagementSub[] = childMenus.map(
          (childMenu) => {
            const parentMenu = flattenedMenuData.find(
              (parent) => parent.menuId === childMenu.prntmenuId
            );

            return {
              applicationName: childMenu.applicationName,
              createdAt: childMenu.createdAt,
              createdBy: childMenu.createdBy,
              menuId: childMenu.menuId,
              menuName: childMenu.menuName,
              menuUrl: childMenu.menuUrl,
              parntMenuName: parentMenu ? parentMenu.menuName : "", // Add parent menu name
              prntmenuId: childMenu.prntmenuId,
              remark: childMenu.remark,
              sortOdr: childMenu.sortOdr,
              updatedAt: childMenu.updatedAt,
              updatedBy: childMenu.updatedBy,
              useYn: childMenu.useYn,
              useYnName: childMenu.useYnName, // 사용여부이름
            };
          }
        );

        subMenuArray.sort((a, b) => a.sortOdr - b.sortOdr);

        const sub = subMenuArray.flatMap((subMenu) => {
          const childMenus = menuData.filter(
            (menu) => menu.prntmenuId === subMenu.menuId
          );

          return childMenus.map((childMenu) => {
            const parentMenu = subMenuArray.find(
              (menu) => menu.menuId === childMenu.prntmenuId
            );

            return {
              applicationName: childMenu.applicationName,
              createdAt: childMenu.createdAt,
              createdBy: childMenu.createdBy,
              menuId: childMenu.menuId,
              menuName: childMenu.menuName,
              menuUrl: childMenu.menuUrl,
              parentMenuName: parentMenu ? parentMenu.menuName : "", // Add parent menu name
              prntmenuId: childMenu.prntmenuId,
              remark: childMenu.remark,
              sortOdr: childMenu.sortOdr,
              updatedAt: childMenu.updatedAt,
              updatedBy: childMenu.updatedBy,
              useYn: childMenu.useYn,
              useYnName: childMenu.useYnName,
            };
          });
        });

        const matchedSubMenus = sub.filter((subMenu) =>
          subMenuArray.some((sub) => sub.menuId === subMenu.prntmenuId)
        );

        const data: IMenumanagementData[] = [
          {
            applicationName: menu.applicationName,
            menuId: menu.menuId,
            menuName: menu.menuName,
            prntmenuId: menu.prntmenuId,
            parntMenuName: menu.parntMenuName ? menu.parntMenuName : "",
            sortOdr: menu.sortOdr,
            menuUrl: menu.menuUrl,
            remark: menu.remark,
            useYn: menu.useYn,
            useYnName: menu.useYnName,
            createdBy: menu.createdBy,
            createdAt: menu.createdAt,
            updatedBy: menu.updatedBy,
            updatedAt: menu.updatedAt,
            items: subMenuArray.map((matchedSubMenu) => ({
              applicationName: matchedSubMenu.applicationName,
              menuId: matchedSubMenu.menuId,
              menuName: matchedSubMenu.menuName,
              prntmenuId: matchedSubMenu.prntmenuId,
              parntMenuName: matchedSubMenu.parntMenuName
                ? matchedSubMenu.parntMenuName
                : "",
              sortOdr: matchedSubMenu.sortOdr,
              menuUrl: matchedSubMenu.menuUrl,
              remark: matchedSubMenu.remark,
              useYn: matchedSubMenu.useYn,
              useYnName: matchedSubMenu.useYnName,
              createdBy: matchedSubMenu.createdBy,
              createdAt: menu.createdAt,
              updatedBy: menu.updatedBy,
              updatedAt: menu.updatedAt,
              items: matchedSubMenus
                .filter(
                  (matchedSubId) =>
                    matchedSubId.prntmenuId === matchedSubMenu.menuId
                )
                .map((matchedSubId) => ({
                  applicationName: matchedSubId.applicationName,
                  menuId: matchedSubId.menuId,
                  menuName: matchedSubId.menuName,
                  prntmenuId: matchedSubId.prntmenuId,
                  parntMenuName: matchedSubId.parentMenuName
                    ? matchedSubId.parentMenuName
                    : "",
                  sortOdr: matchedSubId.sortOdr,
                  menuUrl: matchedSubId.menuUrl,
                  remark: matchedSubId.remark,
                  useYn: matchedSubId.useYn,
                  useYnName: matchedSubId.useYnName,
                  createdBy: matchedSubId.createdBy,
                  createdAt: matchedSubId.createdAt,
                  updatedBy: matchedSubId.updatedBy,
                  updatedAt: matchedSubId.updatedAt,
                })),
            })),
          },
        ];
        return data;
      }
    );
    const routerData = RootData.sort((a, b) => a.sortOdr - b.sortOdr);

    const subSort = routerData.flatMap((item) => {
      if (item.applicationName === "BAS") {
        return item.items.sort((a, b) => a.sortOdr - b.sortOdr);
      }
    });

    // endMenu 정렬
    const endMenu = routerData
      .flatMap((item) => {
        return item.items.map((subItem) => {
          if (subItem.applicationName === "BAS") {
            return subItem.items.sort((a, b) => {
              if (a.sortOdr !== b.sortOdr) {
                return a.sortOdr - b.sortOdr;
              }
              // 추가로 문자열 정렬
              const regex = /([a-zA-Z]+)([0-9]+)/;
              const matchA = a.menuId.match(regex);
              const matchB = b.menuId.match(regex);
              // matchB가 null인 경우 처리
              if (!matchB || !matchA) {
                return 0; // 또는 다른 적절한 처리
              }

              // 문자열 비교
              const stringCompare = matchA[1]?.localeCompare(matchB[1]);
              if (stringCompare !== 0) {
                return stringCompare;
              }

              // 숫자를 잘라서 가져옴
              const numberA = Number(a.menuId.substring(5, 8));
              const numberB = Number(b.menuId.substring(5, 8));

              // 그 후 숫자를 기준으로 정렬
              return numberA - numberB;
            });
          }
          // 'BAS'가 아닌 경우, 아무것도 반환하지 않는다
          return [];
        });
      })
      .flat();
    return RootData;
  }
};

// NBS00000
//samelevel, sublevel
//메뉴 레벨 선택해서 만듬
export const createMenus = async (
  roll: string,
  menuId: string,
  prntmenuId: string,
  type: string,
  body: ICreateSupermenus
) => {
  const accessToken = getCookie("accessToken");
  //prntmenuId가 0일때 최상위 메뉴 넣을떄 사용

  if (Number(body.prntmenuId) === 0) {
    try {
      const response = await axios
        .post(
          BASE_URL + "/api/v1/menu/common/menumanagement/supermenus",
          body,
          {
            headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
          }
        )
        .catch((error: any) => error.message);

      return response;
    } catch (error) {
      return error;
    }
  }
  try {
    const response = await axios.post(
      BASE_URL +
        `/api/v1/menu/common/menumanagement/menus/${menuId}/${prntmenuId}/${type}`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
      }
    );

    if (response.status === 400) {
      // 400번 에러에 대한 처리
      if (response.data === "이미 존재하는 ID입니다.") {
        return response.data;
      }
    }
    return response;
  } catch (err) {
    return err;
  }
};

//메뉴 업데이트
export const updateMenu = async (
  roll: string,
  menuId: string,
  body: ICreateSupermenus
) => {
  const accessToken = getCookie("accessToken");
  const response = await axios
    .put(
      BASE_URL + `/api/v1/menu/common/menumanagement/meuns/${String(menuId)}`,
      body,
      {
        headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
      }
    )

    .catch((error: any) => error.message);

  return response;
};

//메뉴삭제
export const dellMenu = async (roll: string, menuId: string) => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await axios.delete(
      BASE_URL + `/api/v1/menu/common/menumanagement/meuns/${menuId}`,
      {
        headers: { Authorization: `Bearer ${accessToken}`, menu: roll },
      }
    );

    if (response.data === 500) {
      return response.data;
    }
    return response;
  } catch (error) {
    throw error;
  }
};
