"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { accessToken, isReady } = useAuth();

  useEffect(() => {
    // 토큰 확인이 끝났는데(isReady) 토큰이 없다면 바로 로그인 페이지로 이동
    if (isReady && !accessToken) {
      router.replace("/auth/login");
    }
  }, [accessToken, isReady, router]);

  // 준비가 안 되었거나 토큰이 없으면 아무것도 그리지 않고 빈 화면(null) 유지
  if (!isReady || !accessToken) {
    return null;
  }

  return <>{children}</>;
}
