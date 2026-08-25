"use client";

import Link from "next/link";
import styles from "./styles.module.css";
import type { CardInfo } from "@/types/cardInfo";

export default function BuySection() {
  const boards = [
    {
      id: "1",
      title: "포항 : 당장 가고 싶은 숙소",
      contents:
        "살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라 우러라 우러라 새여 자고 니러 우러라 새여 널라와 시름 한 나도 자고 니러 우니로라얄리얄리 얄라셩 얄라리 얄라",
      price: "32000",
      image: "/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    },
    {
      id: "2",
      title: "강릉 : 마음까지 깨끗해지는 하얀 숙소",
      contents: "살어리 살어리랏다 강릉에 평생 살어리랏다",
      price: "32900",
      image: "/01a0e2ed16b1635ee65d3521b8e6c956cee739d1.jpg",
    },
  ];
  // 같은 게시글 목록에서 앞의 4개만 골라 위쪽 카드에 사용해요.
  const placeBoard = boards.slice(0, 2);

  return (
    <div className={styles.page}>
      <h1>2024 끝여름 낭만있게 마무리 하고 싶다면?</h1>
      <div className={styles.cardArea}>
        {placeBoard.map((card) => (
          <Link href={card.id} key={card.id}>
            <img src={card.image.replace("@/public/", "/")} alt="여행지숙소" />

            <div className={styles.cardText}>
              <h2>{card.title}</h2>
              <p>
                {card.contents.length > 39
                  ? `${card.contents.slice(0, 39)}...`
                  : card.contents}
              </p>{" "}
              <span>{Number(card.price).toLocaleString()}원</span>
            </div>
            <div className={styles.cardOverlay}></div>
          </Link>
        ))}
      </div>

      <div className={styles.banner}>
        <img src="./Mask_group.png" alt="하단배너" />
      </div>

      <div className={styles.reservation}>
        <h2>여기서만 예약할 수 있는 숙소</h2>
        <div className={styles.availableBtn}>
          <button>예약 가능 숙소</button>
          <button>예약 마감 숙소</button>
        </div>
        <div className={styles.functionArea}>
          <input type="date" />
          <input type="search" />
          <button className={styles.searchBtn}>검색</button>
          <button className={styles.sellBtn}>숙박권 판매하기</button>
        </div>
      </div>
    </div>
  );
}
