"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client/react"; // 💡 Apollo Client 가져오기

type AuthContextValue = {
  accessToken: string;
  isReady: boolean;
  saveAccessToken: (token: string) => void;
  removeAccessToken: () => Promise<void>; // 💡 async 처리
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState("");
  const [isReady, setIsReady] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedToken = localStorage.getItem("accessToken") ?? "";
      setAccessToken(savedToken);
      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  // 💡 로그인 시 호출되는 함수
  const saveAccessToken = (token: string) => {
    setAccessToken(token);
    localStorage.setItem("accessToken", token);

    // 로그인 시 이전 사용자의 Apollo 캐시를 비우고 쿼리를 재요청합니다.
    client.resetStore();
  };

  // 💡 로그아웃 시 호출되는 함수
  const removeAccessToken = async () => {
    setAccessToken("");
    localStorage.removeItem("accessToken");

    // 로그아웃 시 Apollo 캐시 전체를 삭제하여 데이터가 남아있지 않게 만듭니다.
    await client.clearStore();
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, isReady, saveAccessToken, removeAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
