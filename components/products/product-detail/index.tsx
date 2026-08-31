"use client";

import { useQuery } from "@apollo/client";
import { FETCH_USED_ITEMS } from "@/graphql/queries";
import type { Product } from "@/types/product";
import styles from "./styles.module.css";
import Link from "next/link";

const ICONS = ["/delete.png", "/link.png", "/location.png"];
const IMAGES = [
  "/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  "/e5c2acc669e397de5dea5dfc4cf5a747b7fc6f14.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  /* "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg", */
];
export default function ProductList() {
  return (
    <div className={styles.page}>
      <div className={styles.product}>
        <div className={styles.topSection}>
          <h1>title</h1>
          <div className={styles.iconSection}>
            {ICONS.map((path, index) => (
              <img key={index} src={path} alt={`icon-${index}`} />
            ))}
            <button>
              <img src="/bookmark.png" alt="북마크" />
              24
            </button>
          </div>
        </div>
        <p>contents</p>
        <div className={styles.tagSection}>
          #6인 이하 #건식 사우나 #애견동반 가능
        </div>
        <div className={styles.productSection}>
          <div className={styles.mainImgSection}>
            <img src="/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg" alt="" />
          </div>
          <div className={styles.sideImgSection}>
            {IMAGES.map((url, index) => (
              <div key={index} className={styles.imgContainer}>
                <img key={index} src={url} alt={`image-${index}`} />
              </div>
            ))}
            <div className={styles.imgOverlay}></div>
          </div>
          <div className={styles.sideSection}>
            <div className={styles.purchaseSection}>
              <p>32,500원</p>
              <ul>
                <li>
                  숙박권은 트립트립에서 포인트 충전 후 구매하실 수 있습니다.
                </li>
                <li>상세 설명에 숙박권 사용기한을 꼭 확인해 주세요.</li>
              </ul>
              <button>구매하기</button>
            </div>
            <div className={styles.sellerSection}>
              <p>판매자</p>
              <div className={styles.seller}>
                <button></button>
                이름
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
