import React, { Fragment, useEffect, useState } from "react";
import * as S from "../../styles/nav-style/nav-style";
import MySvgComponent from "../../asset/navIcons/navIcons";

const TreeNode = ({ node, topLevelBackgroundColor, isParentOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [isLength, setIsLength] = useState(0);
  //387AFF
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (node.children === undefined) {
      setIsLength(0);
    } else {
      setIsLength(2);
    }
  }, [isLength]);

  return (
    <Fragment>
      <S.Wrapper>
        <S.MenuContainer>
          <S.MenuBottombox>
            <S.SubMenuLabel
              onClick={handleToggle}
              $isOpen={isOpen}
              $isParentOpen={isParentOpen}
            >
              {node.label}
              {isOpen ? (!node.children ? "" : "[+]") : ""}
            </S.SubMenuLabel>
            <S.SlideDownContainer1
              $isOpen={isOpen}
              $isParentOpen={isParentOpen}
              $isLength={isLength}
            >
              {isOpen && node.children && (
                <Fragment>
                  <S.childBox
                    $isOpen={isOpen}
                    $isParentOpen={isParentOpen}
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    {node.children.map((child) => (
                      <div
                        key={child.label}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <div
                          key={child.label}
                          style={{
                            width: "90%",
                            display: "flex",
                          }}
                        >
                          {/* 하위 메뉴에 대한 isOpen 상태를 독립적으로 설정 */}
                          <div
                            style={{
                              width: "10%",
                              marginTop: 5,
                            }}
                          >
                            {!isParentOpen && <MySvgComponent />}
                          </div>
                          <div
                            style={{
                              width: "100%",
                              marginLeft: -8,
                            }}
                          >
                            <TreeNode
                              node={child}
                              topLevelBackgroundColor={topLevelBackgroundColor}
                              isParentOpen={isOpen}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </S.childBox>
                </Fragment>
              )}
            </S.SlideDownContainer1>
          </S.MenuBottombox>
        </S.MenuContainer>
      </S.Wrapper>
    </Fragment>
  );
};

export default function TreeList() {
  const [isActive, setIsActive] = useState(false);
  const toggle = () => {
    setIsActive(!isActive);
  };
  const topLevelBackgroundColor = "lightgray";
  // 수정된 트리 데이터 구조
  const treeData = [
    {
      label: "모니터링",
      children: [
        {
          label: "대시보드",
        },
      ],
    },
    {
      label: "데이터조회",
      children: [
        {
          label: "에너지사용",
          children: [
            { label: "에너지사용" },
            { label: "건물전체" },
            { label: "수요처별" },
            { label: "에너지용도별" },
            { label: "에너지원별" },
          ],
        },
        {
          label: "비용",
          children: [
            { label: "전체비용" },
            { label: "수요처별" },
            { label: "용도별" },
            { label: "에너지원별" },
          ],
        },
        {
          label: "온실가스배출량",
          children: [
            { label: "전체배출량" },
            { label: "수요처별" },
            { label: "용도별" },
            { label: "에너지원별" },
          ],
        },
        {
          label: "생산량/자립률",
          children: [{ label: "생산량/자립률" }],
        },
      ],
    },
    {
      label: "정보감시",
      children: [
        {
          label: "관제기준값 설정",
          children: [
            { label: "에너지사용" },
            { label: "환경관제점 기준값 설정" },
            { label: "설비관제점 기준값 설정" },
          ],
        },
        {
          label: "데이트측정이력",
          children: [
            { label: "환경관제점계측이력" },
            { label: "살비관제점계측이력" },
          ],
        },
        {
          label: "이력관리",
          children: [{ label: "알림이력" }, { label: "조치이력" }],
        },
        {
          label: "조치매뉴얼",
          children: [{ label: "조치매뉴얼" }],
        },
      ],
    },
  ];

  return (
    <div>
      {treeData.map((node, index) => (
        <Fragment key={index}>
          <TreeNode
            node={node}
            topLevelBackgroundColor={topLevelBackgroundColor}
            isParentOpen={false}
          />
          <S.TreeItemContainer>
            <S.BottomBorder />
          </S.TreeItemContainer>
        </Fragment>
      ))}
    </div>
  );
}
