export const menu = [
  {
    id: "1",
    menu: "모니터링",
    middleMenu: [
      {
        id: "1_1",
        middleName: "대시보드",
      },
    ],
  },
  {
    id: "2",
    menu: "데이터조회",
    middleMenu: [
      {
        id: "2_1",
        middleName: "에너지사용",
        subMenu: [
          {
            id: "2_2_1",
            subName: "건물전체",
          },
          {
            id: "2_2_2",
            subName: "수요처별",
          },
          {
            id: "2_2_3",
            subName: "에너지용도별",
          },
          {
            id: "2_2_4",
            subName: "에너지원별",
          },
        ],
      },
      {
        id: "2_2",
        middleName: "비용",
        subMenu: [
          {
            id: "2_2_1",
            subName: "전체비용",
          },
          {
            id: "2_2_2",
            subName: "수요처별",
          },
          {
            id: "2_2_3",
            subName: "용도별",
          },
          {
            id: "2_2_4",
            subName: "에너지원별",
          },
        ],
      },
      {
        id: "2_3",
        middleName: "온실가스배출량",
        subMenu: [
          {
            id: "2_3_1",
            subName: "전체배출량",
          },
          {
            id: "2_3_2",
            subName: "수요처별",
          },
          {
            id: "2_3_3",
            subName: "용도별",
          },
          {
            id: "2_3_4",
            subName: "에너지원별",
          },
        ],
      },
      {
        id: "2_4",
        middleName: "생산량/자립률",
        subMenu: [
          {
            id: "2_4_1",
            subName: "생산량/자립률",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    menu: "정보감시",
    middleMenu: [
      {
        id: "3_1",
        middleName: "관제기준값 설정",
        subMenu: [
          {
            id: "3_1_1",
            subName: "환경관제점 기준값 설정",
          },
          {
            id: "3_1_2",
            subName: "설비관제점 기준값 설정",
          },
        ],
      },
      {
        id: "3_2",
        middleName: "데이트측정이력",
        subMenu: [
          {
            id: "3_2_1",
            subName: "환경관제점계측이력",
          },
          {
            id: "3_2_2",
            subName: "살비관제점계측이력",
          },
        ],
      },
      {
        id: "3_3",
        middleName: "이력관리",
        subMenu: [
          {
            id: "3_3_1",
            subName: "알림이력",
          },
          {
            id: "3_3_2",
            subName: "조치이력",
          },
        ],
      },
      {
        id: "3_4",
        middleName: "조치매뉴얼",
        subMenu: [
          {
            id: "3_2_1",
            subName: "조치매뉴얼",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    menu: "시스템관리",
    middleMenu: [
      {
        id: "4_1",
        middleName: "공통코드",
        path: "publiccode",
      },
    ],
  },
];

//대매뉴
export const basMenu = [
  {
    id: "1",
    menu: "대시보드",
    middleMenu: [
      {
        id: "1_1",
        middleName: "대시보드",
      },
    ],
  },
  {
    id: "2",
    menu: "공조기",
    middleMenu: [
      {
        id: "1_1",
        middleName: "대시보드",
      },
    ],
  },
];
