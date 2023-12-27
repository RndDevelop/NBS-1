import sizeConfig from "../../config/sizeConfig";
import { colorConfig } from "../../config/colorConfig";
import styled from "styled-components";

export const MuiTypography = {
  color: "var(--color-text-default)",
  fontFamily: "SamsungOneKoreanOTF_300",
  fontSize: "26px",
  lineHeight: "30px",
};

export const MuiAppBar = {
  width: `calc(100% - ${sizeConfig.topbar.width})`,
  // ml: sizeConfig.sidebar.width,
  boxShadow: "unset",
  backgroundColor: colorConfig.topbar.bg,
  color: colorConfig.topbar.color,
};

export const Hamberger = styled.div`
  width: 50px;
  height: 30px;
  background-image: url("/image/hamberger.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
`;

export const Wrapper = styled.div`
  align-items: center;
  border-bottom: 1px solid #44484d;
  border-bottom: 1px solid var(--color-line-panel);
  background-color: var(--color-background);
  display: flex;
  justify-content: space-between;
  height: 56px;
  width: 100%;
  left: 0;
  padding: 0 20px;
  padding-top: 0px;
  padding-right: 20px;
  padding-bottom: 0px;
  padding-left: 20px;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 10;
  font-family: SamsungOneKoreanOTF_400;
`;

export const AlarmBox = styled.div`
  width: 55%;
  height: 65%;
  background-image: url("/image/alarm.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 60px;
  cursor: pointer;
  padding: 2px;
  &:active {
    background-color: var(--color-selected-bg-table-item);
  }
  &:hover {
    background-color: var(--color-hover-bg-table-item);
  }
`;

export const InfoImageBox = styled.div`
  width: 55%;
  height: 65%;
  background-image: url("/image/ic_info.png");
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 60px;
  cursor: pointer;
  padding: 2px;
  &:active {
    background-color: var(--color-selected-bg-table-item);
  }
  &:hover {
    background-color: var(--color-hover-bg-table-item);
  }
`;

export const Circle = styled.div`
  background-color: var(--color-header-purple);
  border-radius: 40px;
  color: var(--color-text-m);
  cursor: pointer;
  font-size: 14px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  width: 36px;
`;

export const Modal = styled.div`
  min-width: 108px;
  position: fixed;
  width: auto;
  top: 10%;
  left: 97%;
  /* top: 125px;
  left: 2480px; */
  /* top: 229%;
  left: 97%; */
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2.5px 8px var(--color-shadow-dropdown-border);
  border: 1px solid var(--color-line-dropdown-border);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1px;
  max-height: 160px;
  overflow-y: auto;
  padding-bottom: 10px;
  padding-top: 10px;
  /* position: absolute; */
`;

export const Modalitem = styled.div`
  color: var(--color-text-default);
  cursor: pointer;
  display: flex;
  font-size: 12px;
  font-weight: 600;
  height: 28px;
  line-height: 18px;
  margin-bottom: 4px;
  margin-top: 4px;
  padding: 0 12px 0 16px;
  align-items: center;
  &:hover {
    background-color: var(--color-hover-bg-table-item);
  }
`;
