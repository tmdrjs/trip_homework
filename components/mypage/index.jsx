"use client";
import { useState } from "react";
import styles from "./styles.module.css";

const CardInfo = [
  {
    id: "1",
    name: "김상훈",
    point: "23000",
  },
];

const ProductList = [
  {
    number: "243",
    name: "파르나스 호텔 제주",
    price: "326000",
    date: "2024.12.16",
    seller: "홍길동",
  },
];

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className={styles.page}>
      <h1>마이 페이지</h1>
      <div className={styles.myinfo}>
        {CardInfo.map((i) => (
          <div key={i.id}>
            <div className={styles.infoTitle}>내 정보</div>
            <div className={styles.userInfo}>
              <button className={styles.userProfile}></button>
              <div className={styles.infoName}>{i.name}</div>
            </div>
            <div className={styles.infoPoint}>
              <img src="/point.png" alt="포인터" />
              {Number(i.point).toLocaleString()} P
            </div>
          </div>
        ))}
        <div className={styles.infoBtn}>
          <button
            onClick={() => setActiveTab("history")}
            className={`${styles.tabBtn} ${activeTab === "history" ? styles.active : ""}`}
          >
            거래내역&북마크
            <img src="/right_arrow.png" alt="" />
          </button>
          <button
            onClick={() => setActiveTab("point")}
            className={`${styles.tabBtn} ${activeTab === "point" ? styles.active : ""}`}
          >
            포인트사용내역
            <img src="/right_arrow.png" alt="" />
          </button>
          <button
            onClick={() => setActiveTab("password")}
            className={`${styles.tabBtn} ${activeTab === "password" ? styles.active : ""}`}
          >
            비밀번호 변경
            <img src="/right_arrow.png" alt="" />
          </button>
        </div>
      </div>
      <div className={styles.content_container}>
        {activeTab === "history" && <TransactionAndBookmarkView />}
        {activeTab === "point" && <PointHistoryView />}
        {activeTab === "password" && <PasswordChangeView />}
      </div>
    </div>
  );
  function TransactionAndBookmarkView() {
    const [detailTab, setDetailTab] = useState("products");
    const tenProducts = Array(10).fill(ProductList[0]);
    return (
      <div>
        <div className={styles.containerBtn}>
          <button
            onClick={() => setDetailTab("products")}
            className={`${styles.detailBtn} ${detailTab === "products" ? styles.active : ""}`}
          >
            나의 상품
          </button>

          <button
            onClick={() => setDetailTab("bookmarks")}
            className={`${styles.detailBtn} ${detailTab === "bookmarks" ? styles.active : ""}`}
          >
            북마크
          </button>
        </div>
        <div className={styles.searchArea}>
          <div className={styles.search}>
            <img src="/search.png" alt="" />
            <input
              type="text"
              name=""
              className={styles.searchInput}
              placeholder="필요한 내용을 검색해 주세요."
            />
          </div>
          <button>검색</button>
        </div>
        <div className={styles.detail_container}>
          {detailTab === "products" && <ProductView />}
          {detailTab === "bookmarks" && <BookmarkView />}
        </div>
      </div>
    );
    function ProductView() {
      return (
        <div>
          <div className={styles.remarks}>
            <span className={styles.numberCell}>번호</span>
            <span className={styles.productCell}>상품 명</span>
            <span className={styles.priceCell}>판매가격</span>
            <span className={styles.dateCell}>날짜</span>
          </div>
          <div className={styles.productList}>
            {tenProducts.map((product, index) => (
              <div key={index} className={styles.productItem}>
                <span className={styles.numberCell}>{product.number}</span>
                <span className={styles.productCell}>{product.name}</span>
                <span className={styles.priceCell}>
                  {Number(product.price).toLocaleString()}원
                </span>
                <span className={styles.dateCell}>{product.date}</span>
                <img
                  src="/delete.png"
                  alt="제거"
                  className={styles.deleteBtn}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
    function BookmarkView() {
      return (
        <div>
          <div className={styles.remarks}>
            <span className={styles.numberCell}>번호</span>
            <span className={styles.productCell}>상품 명</span>
            <span className={styles.priceCell}>판매가격</span>
            <span className={styles.sellerCell}>판매자</span>
            <span className={styles.dateCell}>날짜</span>
          </div>
          <div className={styles.productList}>
            {tenProducts.map((product, index) => (
              <div key={index} className={styles.productItem}>
                <span className={styles.numberCell}>{product.number}</span>
                <span className={styles.productCell}>{product.name}</span>
                <span className={styles.priceCell}>
                  {Number(product.price).toLocaleString()}원
                </span>
                <span className={styles.sellerCell}>{product.seller}</span>
                <span className={styles.dateCell}>{product.date}</span>
              </div>
            ))}
          </div>
        </div>
      );
    }
  }

  function PointHistoryView() {
    return <div>포인트 사용 내역 화면</div>;
  }

  function PasswordChangeView() {
    return <div>비밀번호 변경 화면</div>;
  }
}
