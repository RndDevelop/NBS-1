import { RouterProvider } from "react-router-dom";
import { router } from "./router/router/router";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/global-style/global-style";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/loading-screen/loading-screen";
import { useAppSelector } from "./store/store/store";
import { darkTheme, lightTheme } from "./styles/theme/theme";
import { useDispatch } from "react-redux";
import { setLoading } from "./store/global-slice/global-slice";
import "devextreme/dist/css/dx.material.blue.light.compact.css";

// import "devextreme/dist/css/dx.carmine.css";
// import "devextreme/dist/css/dx.softblue.css";

export default function App() {
  //페이지 로딩 여부
  const [isLoading, setIsLoading] = useState(true);

  //redux sotre 수정
  const disPatch = useDispatch();

  //theme 체크
  const isDark = useAppSelector((state) => state.global.globalState.isDark);

  //페이지 로딩 여부 체크
  const init = async () => {
    setIsLoading(false);
    disPatch(setLoading({ isLoading: isLoading }));
  };

  //페이지 렌더링시 loading 여부 판단
  useEffect(() => {
    //화면 로딩 함수
    init();
  }, []);

  return (
    // <MuiThem theme={theme}>
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
      </>
    </ThemeProvider>
    // </MuiThem>
  );
}
