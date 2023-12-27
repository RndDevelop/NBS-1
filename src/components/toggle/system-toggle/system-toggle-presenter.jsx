import { Fragment } from "react";

import * as S from "../../../styles/toggle-style/system-toggle-styled";

export default function SystemTogglePresenter({
  isToggleOn,
  system,
  handleToggleClick,
  userSystem,
}) {
  // console.log(system);
  // console.log(system, isToggleOn);
  return (
    <Fragment>
      <S.SystemToggle>
        <S.SystemToggleWrapper>
          <S.SystemToggleBox>
            <S.Toggle $isToggleOn={isToggleOn} $userSystem={userSystem}>
              {userSystem === "" ? userSystem : isToggleOn ? "BAS" : "BEMS"}
              {/* {userSystem !== undefined
                ? userSystem
                : isToggleOn
                ? "BEMS"
                : "BAS"} */}
            </S.Toggle>
            <S.ToggleBas onClick={handleToggleClick} $isToggleOn={isToggleOn}>
              <S.ToggleTextBas $isToggleOn={isToggleOn}>BAS</S.ToggleTextBas>
            </S.ToggleBas>
            <S.ToggleBems onClick={handleToggleClick} $isToggleOn={isToggleOn}>
              <S.ToggleTextBems $isToggleOn={isToggleOn}>BEMS</S.ToggleTextBems>
            </S.ToggleBems>
          </S.SystemToggleBox>
        </S.SystemToggleWrapper>
      </S.SystemToggle>
    </Fragment>
  );
}
