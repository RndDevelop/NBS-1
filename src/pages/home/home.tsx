import { Outlet } from "react-router-dom";
import Header from "../../components/header/header-container";
import Nav from "../../components/nav/nav-container-nochildren";
import { Box } from "@mui/material";
import { useState, useEffect } from "react";

import { getCookie } from "../../config/cookies";
import { useNavigate } from "react-router-dom";
import { createContext } from "react";
import * as S from "../../styles/page-style/home-styled";

export const AppContext = createContext({ width: 0, height: 0 });

export default function Home() {
  const [isCancel, setIsCancel] = useState(false);

  const navigate = useNavigate();

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    if (getCookie("accessToken") === undefined) {
      navigate("/login");
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    // 컴포넌트가 언마운트되면 이벤트 리스너 해제
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCancel]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",

          "@media (max-width:760px)": {
            // overflow: "scroll",
            height: "100vh",
            width: "100vw",
          },
          "@media (max-width:360px)": {
            height: "100vh",
            width: "100vw",
          },
        }}
      >
        <AppContext.Provider value={windowSize}>
          {/* {헤더} */}
          <Box
            sx={{
              width: "100vw",
            }}
          >
            <Header setIsCancel={setIsCancel} isCancel={isCancel} />
          </Box>
        </AppContext.Provider>
        <Box
          sx={{
            width: "100%",
            // height: "100%",
            display: "flex",
            marginTop: 7,

            "@media (max-width:760px)": {
              marginTop: 7,
              height: "100vh",
              width: "100vw",
            },
          }}
        >
          <AppContext.Provider value={windowSize}>
            {!isCancel ? (
              <S.SideContainer $isCancel={isCancel}>
                <Nav setIsCancel={setIsCancel} />
              </S.SideContainer>
            ) : null}
          </AppContext.Provider>

          <Box
            sx={{
              width: "100%",
              height: "100%",
              // overflow: "auto",

              "@media (min-width:120px) and (max-width:470px)": {
                width: !isCancel ? "0%" : "100%",
              },
              "@media (min-width:471px) and (max-width:760px)": {
                width: !isCancel ? "65%" : "100%",
              },
              "@media (min-width:761px) and (max-width:1440px)": {
                width: !isCancel ? "75%" : "100%",
              },
              "@media (min-width:1441px) and (max-width:1919px)": {
                width: !isCancel ? "86%" : "100%",
              },
              "@media (min-width:1920px) and (max-width:2560px)": {
                width: !isCancel ? "90%" : "100%",
              },
            }}
          >
            <Outlet context={{ windowSize, isCancel }} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
