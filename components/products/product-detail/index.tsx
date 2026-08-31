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
          <div className={styles.titleSection}>
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
        </div>
        <div className={styles.mainSection}>
          <div className={styles.gridSection}>
            <div className={styles.productSection}>
              <div className={styles.mainImgSection}>
                <img
                  src="/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg"
                  alt=""
                />
              </div>
              <div className={styles.sideImgSection}>
                {IMAGES.map((url, index) => (
                  <div key={index} className={styles.imgContainer}>
                    <img key={index} src={url} alt={`image-${index}`} />
                  </div>
                ))}
                <div className={styles.imgOverlay}></div>
              </div>
            </div>
            <div className={styles.descriptionSection}>
              <h2>상세 설명</h2>
              <p>
                살어리 살어리랏다 쳥산(靑山)애 살어리랏다 멀위랑 ᄃᆞ래랑 먹고
                쳥산(靑山)애 살어리랏다 얄리얄리 얄랑셩 얄라리 얄라 우러라
                우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러
                우니로라 리얄리 얄라셩 얄라리 얄라 가던 새 가던 새 본다 믈 아래
                가던 새 본다 잉무든 장글란 가지고 믈 아래 가던 새 본다 얄리얄리
                얄라셩 얄라리 얄라 <br /> <br />
                이링공 뎌링공 ᄒᆞ야 나즈란 디내와손뎌
                <br /> 오리도 가리도 업슨 바므란 ᄯᅩ 엇디 호리라
                <br /> 얄리얄리 얄라셩 얄라리 얄라
                <br /> <br /> 어듸라 더디던 돌코
                <br /> 누리라 마치던 돌코 믜리도 괴리도 업시 마자셔 우니노라
                <br /> 얄리얄리 얄라셩 얄라리 얄라
                <br /> <br /> 살어리 살어리랏다 바ᄅᆞ래 살어리랏다
                <br /> ᄂᆞᄆᆞ자기 구조개랑 먹고 바ᄅᆞ래 살어리랏다
                <br /> 얄리얄리 얄라셩 얄라리 얄라
                <br /> <br /> 가다가 가다가 드로라 에졍지 가다가 드로라
                <br /> 사ᄉᆞ미 지ᇝ대예 올아셔 ᄒᆡ금(奚琴)을 혀거를 드로라
                <br /> 얄리얄리 얄라셩 얄라리 얄라
                <br /> <br /> 가다니 ᄇᆡ브른 도긔 설진 강수를 비조라
                <br /> 조롱곳 누로기 ᄆᆡ와 잡ᄉᆞ와니 내 엇디 ᄒᆞ리잇고
                <br /> 얄리얄리 얄라셩 얄라리 얄라
              </p>
            </div>
            <div className={styles.locationSection}>
              <h2>상세 위치</h2>
              <div className={styles.mapContainer}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m5!3m3!1m2!1s0x357ca35d51f7f069%3A0x1149f8d9da3a11de!2z7ZaJ64u5!5e0!3m2!1sen!2skr!4v1788156385858!5m2!1sen!2skr"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
              </div>
            </div>
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
        <div className={styles.contactSection}>
          <p>
            <img src="/chat.png" alt="문의" />
            문의하기
          </p>
          <div>
            <textarea
              name="text"
              className={styles.contactTextarea}
              placeholder="문의사항을 입력해 주세요."
            ></textarea>
          </div>
          <div className={styles.contactBtnSection}>
            <button>문의하기</button>
          </div>
          <div className={styles.contactList}>
            <p>등록된 문의사항이 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
