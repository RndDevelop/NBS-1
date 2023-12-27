import HeaderPresenter from "./header-presenter";
import { useState } from "react";
//TOP
export default function Header(props) {
  const { setIsCancel, isCancel } = props;

  const [showModal, setShowModal] = useState(false);

  const HandleCancel = () => {
    setIsCancel((prev) => !prev);
  };

  const handleCircleClick = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <HeaderPresenter
      handleCircleClick={handleCircleClick}
      showModal={showModal}
      HandleCancel={HandleCancel}
    />
  );
}
