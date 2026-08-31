"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./styles.module.css";
import AuthGuard from "@/components/auth/AuthGuard";
import { useState } from "react";

const TiptapEditor = dynamic(() => import("@/components/tiptap/tiptapeditor"), {
  ssr: false,
  loading: () => <p>에디터를 불러오는 중입니다...</p>,
});

function SellPageContent() {
  const [title, setTitle] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [price, setPrice] = useState<string>("");

  const hasValue =
    title.trim().length > 0 &&
    summary.trim().length > 0 &&
    price.trim().length > 0;

  return (
    <main className={styles.page}>
      <h1>숙박권 판매하기</h1>
      <div className={styles.inputGrid}>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            상품명 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="상품명을 입력해 주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            한줄 요약 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="상품을 한줄로 요약해 주세요."
            onChange={(e) => setSummary(e.target.value)}
          />
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
            onChange={(e) => setPrice(e.target.value)}
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
        </div>{" "}
        <div className={styles.btnSection}>
          <Link href="./">
            <button>취소</button>
            <button disabled={!hasValue}>등록하기</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function SellPage() {
  return (
    <AuthGuard>
      <SellPageContent />
    </AuthGuard>
  );
}
