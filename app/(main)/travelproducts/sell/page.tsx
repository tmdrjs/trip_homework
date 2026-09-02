"use client";

import AuthGuard from "@/components/auth/AuthGuard";
import SellPageContent from "./detailpage";

export default function SellPage() {
  return (
    <AuthGuard>
      <SellPageContent />
    </AuthGuard>
  );
}
