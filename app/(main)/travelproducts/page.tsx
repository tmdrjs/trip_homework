"use client";
import { useState } from "react";
import HeroBanner from "@/components/home/hero-banner";
import BuySection from "@/components/purchase";
import dynamic from "next/dynamic";
import styles from "./styles.module.css";

const TiptapEditor = dynamic(() => import("@/components/tiptap/tiptapeditor"), {
  ssr: false,
  loading: () => <p>에디터를 불러오는 중입니다...</p>,
});
// 1. 판매 폼을 별도의 독립된 컴포넌트로 분리합니다.
function SellForm({ onBack }: { onBack: () => void }) {
  // 나중에 여기에 에디터 상태(useState) 등을 추가하셔도 안전합니다!
  return (
    <main className={styles.page}>
      <h1>숙박권 판매하기</h1>
      <div className={styles.inputGrid}>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            상품명 <span>*</span>
          </div>
          <input type="text" placeholder="상품명을 입력해 주세요." />
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            한줄 요약 <span>*</span>
          </div>
          <input type="text" placeholder="상품을 한줄로 요약해 주세요." />
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            상품 설명 <span>*</span>
          </div>
          <TiptapEditor />
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            판매 가격 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
          />
        </div>

        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>태그 입력</div>
          <input type="text" placeholder="태그를 입력해 주세요." />
        </div>

        <div className={styles.dividedSection}>
          <div className={styles.sideSection}>
            <div className={styles.addressSection}>
              <div className={styles.inputTitle}>
                주소<span>*</span>
              </div>
              <div className={styles.zipCode}>
                <input
                  type="number"
                  placeholder="01234"
                  className={styles.zipCodeInput}
                />
                <button>우편번호 검색</button>
              </div>
              <input type="text" placeholder="상세주소를 입력해 주세요." />
            </div>
            <div className={styles.latSection}>
              <div className={styles.inputTitle}>위도(LAT)</div>
              <input type="text" placeholder="주소를 먼저 입력해 주세요." />
            </div>
            <div className={styles.lngSection}>
              <div className={styles.inputTitle}>경도(LNG)</div>
              <input type="text" placeholder="주소를 먼저 입력해 주세요." />
            </div>
          </div>

          <div className={styles.mapSection}>
            <div className={styles.inputTitle}>상세 위치</div>
            <div className={styles.mapContainer}>
              주소를 먼저 입력해 주세요.
            </div>
          </div>
        </div>
        <div className={styles.imgSection}>
          <div className={styles.inputTitle}>사진 첨부</div>
          <div className={styles.imgContainer}>
            <img src={`@/public/add.png`.replace("@/public/", "/")} alt="" />
            클릭하여 사진 업로드
          </div>
        </div>
      </div>

      <button onClick={onBack}>등록하기</button>
    </main>
  );
}

// 2. 메인 페이지 컴포넌트
export default function TravelProductsPage() {
  const [viewMode, setViewMode] = useState<"list" | "sell">("list");

  // 얼리 리턴을 하더라도 하위 컴포넌트가 격리되어 있어 훅이 꼬이지 않습니다.
  if (viewMode === "sell") {
    return <SellForm onBack={() => setViewMode("list")} />;
  }

  return (
    <main>
      <HeroBanner />
      <BuySection onStartSell={() => setViewMode("sell")} />
    </main>
  );
}
