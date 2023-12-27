import createTheme from "@mui/material/styles/createTheme";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;   margin: 0;
    font-family: SamsungOneKoreanOTF_400;
    font-size: 14px;
    line-height: 20px;
  }
  body {
    font-weight: 400;
    background-color: ${(props) => props.theme.bgColor};
    /* color:white; */
    /* font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif; */
  }

 
  
`;
/* background-color: ${(props) => props.theme.bgColor}; */

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 720,
      sm: 1280,
      md: 1440,
      lg: 1920,
      xl: 2560,
    },
  },
});
