import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Fragment } from "react";
import * as S from "../../styles/header-style/header-styled";
import SystemToggle from "../toggle/system-toggle/system-toggle";
import Avatars from "../avatar/avatar";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import { useContext } from "react";
import { AppContext } from "../../pages/home/home";

export default function HeaderPresenter(props) {
  const { HandleCancel, handleCircleClick, showModal } = props;

  const size = useContext(AppContext);

  return (
    <Fragment>
      <AppBar position="fixed" sx={S.MuiAppBar}>
        <S.Wrapper>
          {/* <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: "#e9ebf0",
              borderBottom: "2px solid #dfe2ea",
              "& .MuiBoxBase-root": {
                height: 0,
                padding: 2,
                borderRadius: 4,
              },
              "@media (max-width: 1440px)": {
                justifyContent: "normal",
              },
            }}
          > */}
          <Box
            sx={{
              // width: "4%",
              height: 50,
              width: "40px",

              "@media (max-width: 1920px)": {
                display: "none",
              },
              "@media (max-width: 2560px)": {
                display: "none",
              },
              "@media (min-width:760px) and (max-width: 1440px)": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 30,
              },
              "@media (min-width: 720px) and (max-width:760px)": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 30,
              },
              "@media (min-width: 360px) and (max-width:720px)": {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: 30,
              },
            }}
          >
            <S.Hamberger onClick={HandleCancel} />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",

              "@media (max-width: 2560px)": {
                width: "200px",
              },
              "@media (max-width: 1920px)": {
                width: "200px",
                marginLeft: -0.5,
              },
              "@media (max-width: 1440px)": {
                width: "700px",
                marginLeft: 2,
              },
              "@media (max-width: 760px)": {
                width: "700px",
                marginLeft: 2,
              },
              "@media (max-width: 360px)": {
                width: "700px",
                marginLeft: 2,
              },
            }}
          >
            <Typography sx={S.MuiTypography}>NBS</Typography>
            {size.width > 1440 ? <SystemToggle /> : null}
          </Box>

          <Box
            sx={{
              // backgroundColor: "yellow",
              width: `calc(40% - ${"30px"})`,
              height: 50,
            }}
          ></Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "150px",
              height: 50,
            }}
          >
            <Box
              sx={{
                width: "100px",
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <S.AlarmBox />
            </Box>
            <Box
              sx={{
                width: "100px",
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <S.InfoImageBox />
            </Box>
            <Box
              sx={{
                width: "100px",
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <S.Circle onClick={handleCircleClick}>M</S.Circle>
              {showModal && (
                <S.Modal>
                  <S.Modalitem>로그아웃</S.Modalitem>
                  <S.Modalitem>비밀번호 변경</S.Modalitem>
                  <S.Modalitem>시스템 관리</S.Modalitem>
                  <S.Modalitem>모드전환</S.Modalitem>
                </S.Modal>
              )}
            </Box>
          </Box>
          {/* </Toolbar> */}
        </S.Wrapper>
      </AppBar>
    </Fragment>
  );
}
