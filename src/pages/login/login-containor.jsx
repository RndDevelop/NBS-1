//최초 작성자 박경찬
import LoginPresenter from "./login-presenter";
import { useForm } from "react-hook-form";
import { useApiDispatch, useAppDispatch } from "../../store/store/store";
import { loginUser } from "../../services/api/login-api";
import { setUpUser } from "../../store/login-slice/login-slice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { removeCookie } from "../../config/cookies";

//로그인 로직
export default function Login() {
  const { register, handleSubmit, formState } = useForm({
    mode: "onChange",
  });

  // selecteBox로 set함수 전달
  const [selectedSystem, setSelectedSystem] = useState("");
  const [isNotPublic, setIsNotpublic] = useState("로그인");
  const dispatch = useApiDispatch();
  const appDisPatch = useAppDispatch();
  const navigate = useNavigate();

  const LoginUser = ({ userId, password, system }, e) => {
    e.preventDefault();

    if (userId === "" || password === "" || system === "") return;

    const body = {
      userId: userId,
      password: password,
      system: selectedSystem,
    };

    try {
      dispatch(loginUser(body)).then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          appDisPatch(
            setUpUser({ userId: userId, password: "", system: selectedSystem })
          );
          navigate("/");
        }
      });
    } catch (rejectedValueOrSerializedError) {
      console.log("error", rejectedValueOrSerializedError);
    }
  };

  return (
    <LoginPresenter
      register={register}
      LoginUser={LoginUser}
      handleSubmit={handleSubmit}
      formState={formState}
      dispatch={dispatch}
      appDisPatch={appDisPatch}
      navigate={navigate}
      setSelectedSystem={setSelectedSystem}
      selectedSystem={selectedSystem}
      isNotPublic={isNotPublic}
    />
  );
}
