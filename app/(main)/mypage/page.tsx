"use client";
import { useQuery } from "@apollo/client/react";
import MyPage from "@/components/mypage";
import AuthGuard from "@/components/auth/AuthGuard";
import { FETCH_USER_LOGGED_IN } from "@/graphql/auth";
import type { LoggedInUserData } from "@/types/auth";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./styles.module.css";

function MyPageContent() {
  // 💡 AuthContext의 accessToken 사용
  const { accessToken } = useAuth();

  const { data } = useQuery<LoggedInUserData>(FETCH_USER_LOGGED_IN, {
    skip: !accessToken,
  });

  const user = data?.fetchUserLoggedIn;
  const point = user?.userPoint?.amount ?? 0;

  return <MyPage user={user} point={point} />;
}
export default function TravelProductsPage() {
  return (
    <main>
      {/* 기능을 붙이기 전에 숙박권 목록 화면부터 만들어 볼 페이지예요. */}
      <AuthGuard>
        <MyPageContent />
      </AuthGuard>
    </main>
  );
}
