"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import styles from "./styles.module.css";
import { FiCalendar, FiSearch, FiEdit3 } from "react-icons/fi";
import { FETCH_BOARDS } from "@/graphql/queries"; // 현재 사용 중인 GraphQL 쿼리
import { Card, MOCK_CARDS } from "@/types/card";

export default function BuySection() {
  const { data, loading, error } = useQuery(FETCH_BOARDS, {
    variables: { page: 1 },
    errorPolicy: "all",
  });

  const getCardsToRender = (): Card[] => {
    if (error || !data) return MOCK_CARDS;

    const rawItems = data.fetchBoards || data.fetchUseditems || [];

    if (rawItems.length === 0) return MOCK_CARDS;

    const convertedCards: Card[] = rawItems.map((item: any) => ({
      id: item._id || item.id || "",
      title: item.title || item.name || "",
      contents: item.contents || item.remarks || "",
      price: item.price ?? 0,
      userName: item.writer || item.seller?.name || "",
      bookmarks: item.likeCount || item.pickedCount || 0,
      img: item.images?.[0]
        ? item.images[0].startsWith("http")
          ? item.images[0]
          : `https://storage.googleapis.com/${item.images[0]}`
        : null,
      tags: item.tags || [],
    }));

    const hasInvalidCard = convertedCards.some(
      (card) =>
        !card.id ||
        !card.title.trim() ||
        !card.contents.trim() ||
        card.price <= 0 ||
        !card.userName.trim(),
    );

    if (hasInvalidCard) {
      return MOCK_CARDS;
    }

    return convertedCards;
  };

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

  const [activeIndex, setActiveIndex] = useState(0);

  const filterImg = [
    {
      id: "1",
      image: "/Frame 427323240.png",
    },
    {
      id: "2",
      image: "/Frame 427323244.png",
    },
    {
      id: "3",
      image: "/Frame 427323238.png",
    },
    {
      id: "4",
      image: "/Frame 427323228.png",
    },
    {
      id: "5",
      image: "/Frame 427323239.png",
    },
    {
      id: "6",
      image: "/Frame 427323241.png",
    },
    {
      id: "7",
      image: "/Frame 427323242.png",
    },
    {
      id: "8",
      image: "/Frame 427323243.png",
    },

    {
      id: "9",
      image: "/Frame 427323237.png",
    },
  ];
  const cards = getCardsToRender();
  return (
    <div className={styles.page}>
      <h1>2024 끝여름 낭만있게 마무리 하고 싶다면?</h1>
      <div className={styles.topBanner}>
        {boards.map((card) => (
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

      <div className={styles.bottomBanner}>
        <img src="./Mask_group.png" alt="하단배너" />
      </div>

      <div className={styles.reservation}>
        <h2>여기서만 예약할 수 있는 숙소</h2>
        <div className={styles.availableBtn}>
          <button
            className={`${styles.btn} ${activeIndex === 0 ? styles.active : ""}`}
            onClick={() => setActiveIndex(0)}
          >
            예약 가능 숙소
          </button>
          <button
            className={`${styles.btn} ${activeIndex === 1 ? styles.active : ""}`}
            onClick={() => setActiveIndex(1)}
          >
            예약 마감 숙소
          </button>
        </div>
        <div className={styles.reservationHeader}>
          <div className={styles.inputSection}>
            <div className={styles.inputWrapper}>
              <FiCalendar className={styles.inputIcon} />
              <input
                type="text"
                placeholder="YYYY . MM . DD - YYYY . MM . DD"
                className={styles.dateInput}
              />
            </div>

            {/* 검색어 입력 */}
            <div
              className={`${styles.inputWrapper} ${styles.searchInputWrapper}`}
            >
              <FiSearch className={styles.inputIcon} />
              <input
                type="text"
                placeholder="제목을 검색해 주세요."
                className={styles.searchInput}
              />
            </div>

            {/* 버튼 영역 */}
            <button className={styles.searchBtn}>검색</button>
          </div>
          <button className={styles.sellBtn}>
            <FiEdit3 className={styles.btnIcon} />
            숙박권 판매하기
          </button>
        </div>
        <div className={styles.filterBtn}>
          {filterImg.map((btn, index) => (
            <img
              src={filterImg[index].image}
              alt={"필터" + filterImg[index].id}
              key={filterImg[index].id}
            />
          ))}
        </div>
        <div className={styles.cardArea}>
          {cards.map((card) => (
            <div key={card.id}>
              {card.img ? (
                <img
                  src={card.img.replace("@/public/", "/")}
                  alt="카드이미지"
                />
              ) : (
                <div>이미지 없음</div>
              )}
              <div className={styles.cardInfoArea}>
                <button className={styles.bookmark}>
                  <img src="/bookmark.png" />
                  <span>{card.bookmarks}</span>
                </button>
                <div className={styles.cardDescription}>
                  <div className={styles.cardTitle}>{card.title}</div>
                  <div className={styles.cardContents}>{card.contents}</div>
                  {card.tags && card.tags.length > 0 && (
                    <div className={styles.cardTags}>
                      {card.tags.map((tag, idx) => (
                        <span key={idx}>#{tag} </span>
                      ))}
                    </div>
                  )}
                  <div className={styles.cardInfo}>
                    <div className={styles.user}>
                      <button className={styles.userProfile}></button>
                      <div className={styles.username}>{card.userName}</div>
                    </div>

                    <span className={styles.price}>
                      {card.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.recentBar}>
        <div className={styles.recentTitle}>최근 본 상품</div>
        <div className={styles.recentList}>
          <img src="/01a0e2ed16b1635ee65d3521b8e6c956cee739d1.jpg" alt="1" />
          <img src="/2aa6de8b2fd3dbd42536eb0596de11c9.jpg" alt="2" />
          <img src="/23e24f5fb6d114299662784db4a1b0301fa11ed6.jpg" alt="3" />
        </div>
      </div>
    </div>
  );
}
