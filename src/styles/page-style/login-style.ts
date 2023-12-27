// import styled from "styled-components";
import styled from "styled-components";
import { colorConfig } from "../../config/colorConfig";
import "../global-style/stlyes.module.css";
interface ErrorMessage {
  $error?: string;
}

export const Form = styled.form``;

export const MuiBox = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#eff1f5",
  width: "100vw",
  height: "100vh",
};

export const MuiContainor = {
  backgroundColor: colorConfig.login.bg,
  borderRadius: 3,
  width: { xs: "100%", sm: "70%", md: "40%", lg: "40%", xl: "644px" },
  height: { xs: "100%", sm: "40%", md: "40%", lg: "40%", xl: "422px" },
};

export const Typography = {
  color: "var(--text-default)",
  textAlign: "center",
  fontFamily: "SamsungOne-600C",
  fontSize: 42,
  fontWeight: 550,
};

export const MuiText = {
  "& .MuiInputBase-root": {
    borderRadius: 1,
    border: `1px solid var(--color-line-default) #dfe2ea`,
    width: { xs: "340px", sm: "350px", md: "52%", lg: "350px", xl: "350px" },
    height: 36,
    color: "var(--color-text-default)",
    fontSize: 14,
  },
};

export const EmtyBox1 = {
  "@media (max-width: 360px)": {
    height: 340,
  },
};

export const InputLabelProps = {
  sx: {
    fontFamily: "SamsungOne-400",
    color: "#b3b9bf", // 라벨의 색상
    fontSize: "15px", // 라벨의 폰트 크기
    fontWeight: 550,
  },
};

export const MuiSelect = {
  color: "#b3b9bf", // 라벨의 색상
  fontSize: "20px", // 라벨의 폰트 크기
  fontWeight: 550,
  borderRadius: 1,
  border: `1px solid var(--color-line-default) #d3d6dc`,
  height: 36,
  width: { xs: "340px", sm: "350px", md: "52%", lg: "350px", xl: "350px" },
};

export const MuiSelectInputLabel = {
  fontSize: 14, // 라벨의 크기를 조절합니다.
  color: "var(--color-text-default)", // 라벨의 색상을 조절합니다.
  fontWeight: 550,
};

export const MuiButton = {
  backgroundColor: "var(--color-button-primary)",
  borderRadius: 22,
  fontSize: 16,
  fontWeight: 700,
  height: 44,
};

export const ErrorP = styled.p<ErrorMessage>`
  ${(props) =>
    props.$error &&
    `
      color: red;
      &:before {
        color: red;
        display: inline;
        content: "⚠ ";
      }
    `};
`;
