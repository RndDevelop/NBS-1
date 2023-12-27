import { AppContext } from "../../../pages/home/home";
import { setUpSystem } from "../../../store/global-slice/system-slice";
import { useAppDispatch } from "../../../store/store/store";
import SystemTogglePresenter from "./system-toggle-presenter";
import { useState, useEffect, Fragment, useContext } from "react";
import { useSelector } from "react-redux";
import SystemTogglePresenter1440 from "./system-toggle-presenter-1440";
//헤더에서 사용중
export default function SystemToggle() {
  //토글 클릭시 boolean 값 변경
  const [isToggleOn, setToggleOn] = useState(false);
  const [system, setSystem] = useState("");
  const dispatch = useAppDispatch();

  const { user } = useSelector((state) => state.login);
  const size = useContext(AppContext);

  //토글 클릭 이벤트
  const handleToggleClick = () => {
    setToggleOn((prev) => !prev);
  };

  // // 초기 로그인 시 설정
  // useEffect(() => {
  //   if (user.system === "BAS") {
  //     setSystem("BAS");
  //     // dispatch(setUpSystem({ systemValue: user.system }));
  //   } else {
  //     setSystem("BEMS");
  //     // dispatch(setUpSystem({ systemValue: user.system }));
  //   }
  // }, []);

  // useEffect(() => {
  //   const updatedSystem = isToggleOn ? "BAS" : "BEMS";
  //   setSystem(updatedSystem);
  //   dispatch(setUpSystem({ systemValue: updatedSystem }));
  // }, [isToggleOn, system]);

  //페이지 렌더링시 systemState 업데이트
  useEffect(() => {
    if (user.system === "BAS") {
      setSystem("BAS");
      setToggleOn(true);
      return;
    }

    if (user.system === "BEMS") {
      setSystem("BEMS");
      setToggleOn(false);
      return;
    }
    dispatch(setUpSystem({ systemValue: user.system }));
  }, []);

  useEffect(() => {
    const updatedSystem = isToggleOn ? "BAS" : "BEMS";
    setSystem(updatedSystem);
    dispatch(setUpSystem({ systemValue: updatedSystem }));
  }, [isToggleOn, system]);

  return (
    <Fragment>
      {/* {size.width > 1440 ? (
        <SystemTogglePresenter
          isToggleOn={isToggleOn}
          system={system}
          handleToggleClick={handleToggleClick}
          userSystem={user.system}
        />
      ) : (
        <SystemTogglePresenter1440
          isToggleOn={isToggleOn}
          system={system}
          handleToggleClick={handleToggleClick}
          userSystem={user.system}
        />
      )} */}
      <SystemTogglePresenter
        isToggleOn={isToggleOn}
        system={system}
        handleToggleClick={handleToggleClick}
        userSystem={user.system}
      />
    </Fragment>
  );
}
