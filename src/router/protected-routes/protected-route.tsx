import React, { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { getCookie } from "../../config/cookies";
import { useApiDispatch } from "../../store/store/store";
import { refreshToken } from "../../services/api/login-api";
import { useNavigate } from "react-router-dom";

interface IJwtToken {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  scope: ["ROLE_ADMIN", "REFRESH"];
}

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  //페이지 컴포넌트 이동
  const navigate = useNavigate();

  //리프레쉬 통신
  const apiDispatch = useApiDispatch();

  const [tokenVerified, setTokenVerified] = useState(false);
  const [refreshTokenVerified, setRefreshTokenVerified] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (getCookie("accessToken")) {
        try {
          const myDecodedToken: IJwtToken | null = decodeToken(
            getCookie("accessToken")
          );

          const timestamp = Number(myDecodedToken?.exp) * 1000;
          const expirationDate = new Date(timestamp);
          const today = new Date();

          if (expirationDate.getTime() >= today.getTime()) {
            console.log("토큰인증완료");
            setTokenVerified(true);
          } else {
            console.log("리프레쉬 토큰");
            try {
              await apiDispatch(refreshToken(getCookie("refreshToken")));
              setRefreshTokenVerified(false);
            } catch (error) {
              console.error("리프레쉬 토큰 실패:", error);
              navigate("/login");
            }
          }
        } catch (error) {
          console.error("토큰 디코딩 실패:", error);
          navigate("/login");
        }
      } else {
        navigate("/login");
      }
    };

    verifyToken();
  }, [tokenVerified, refreshTokenVerified]);

  return <>{tokenVerified && children}</>;
}
