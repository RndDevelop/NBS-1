import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function BasAir() {
  const { menuInfo } = useSelector((state) => state.iframeSlice);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        title="Your IFrame Title"
        width="98%"
        height="98%"
        src={menuInfo.menuUrl ? menuInfo.menuUrl : ""}
      ></iframe>
    </div>
  );
}
