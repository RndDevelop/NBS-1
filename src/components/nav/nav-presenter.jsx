import { Fragment } from "react";
import * as S from "../../styles/nav-style/nav-noCildren-style";
import SystemToggle from "../toggle/system-toggle/system-toggle";

export default function NavPresenter6(props) {
  const {
    menu,
    onClickSubmenu,
    onClickMiddleMenu,
    filterMiddleMenu,
    selectedMenu,
    selectSub,
    filterSubeMenu,
    handleCancel,
    onClickEndMenu,
    selectEndMenu,
  } = props;

  return (
    <>
      {menu && (
        <>
          <Fragment>
            <S.Wrapper>
              <S.MenuContainer>
                <S.SystemToggleSub>
                  <S.SystemCancelSub>
                    <S.SystemCancelEmty></S.SystemCancelEmty>
                    <S.SystemCancel onClick={handleCancel}>
                      <S.SystemCancelIcon />
                    </S.SystemCancel>
                  </S.SystemCancelSub>
                  <S.SystemToggleBox>
                    <SystemToggle />
                  </S.SystemToggleBox>
                </S.SystemToggleSub>
                <S.MenuMarginBox></S.MenuMarginBox>
                {menu.map((menuItem, index) => (
                  <S.MenuBottombox key={index}>
                    <S.MenuBox
                      onClick={(e) => onClickMiddleMenu(e, menuItem.menu)}
                      $selectedMenu={selectedMenu === menuItem.menu}
                    >
                      {menuItem.menu}
                      <S.SubIConSubBox>
                        <S.SubIconBox
                          $selectedMenu={selectedMenu === menuItem.menu}
                        ></S.SubIconBox>
                      </S.SubIConSubBox>
                    </S.MenuBox>

                    <S.SlideDownContainer1
                      $selectedMenu={selectedMenu === menuItem.menu}
                    >
                      {selectedMenu === menuItem.menu &&
                        filterMiddleMenu &&
                        filterMiddleMenu.map((mid, index) => (
                          <Fragment key={index}>
                            {
                              <>
                                <S.SubMenuBox
                                  key={index}
                                  onClick={(e) => {
                                    onClickSubmenu(e, mid.middleName);
                                  }}
                                  $selectSub={selectSub === mid.middleName}
                                >
                                  {mid.middleName}
                                </S.SubMenuBox>
                                <S.SlideDownContainer
                                  $expanded={selectSub === mid.middleName}
                                >
                                  {selectSub === mid.middleName &&
                                    filterSubeMenu &&
                                    filterSubeMenu.map((subMenu) => (
                                      <S.SubMenuContainer key={subMenu.id}>
                                        <S.SubMenuItem
                                          $selectEndMenu={
                                            selectEndMenu === subMenu.subName
                                          }
                                        >
                                          <S.MenuIconBox>∟</S.MenuIconBox>
                                          <S.MenuContents
                                            onClick={() =>
                                              onClickEndMenu(
                                                subMenu.applicationName,
                                                subMenu.id,
                                                subMenu.subName,
                                                subMenu.sortOdr,
                                                subMenu.menuUrl
                                              )
                                            }
                                          >
                                            {subMenu.subName}
                                          </S.MenuContents>
                                        </S.SubMenuItem>
                                      </S.SubMenuContainer>
                                    ))}
                                </S.SlideDownContainer>
                              </>
                            }
                          </Fragment>
                        ))}
                    </S.SlideDownContainer1>
                    <S.BottomBorder />
                  </S.MenuBottombox>
                ))}
              </S.MenuContainer>
            </S.Wrapper>
          </Fragment>
        </>
      )}
    </>
  );
}
