"use client";

import { gql } from "@apollo/client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import Link from "next/link";
import styles from "./styles.module.css";
import { FiCalendar, FiSearch, FiEdit3 } from "react-icons/fi";
import type { FormEvent } from "react";
import { Fetch_Travel_Products, FETCH_USER_LOGGED_IN } from "@/graphql/queries";
import { TOGGLE_TRAVELPRODUCT_PICK } from "@/graphql/mutations";

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

interface BuySectionProps {
  onStartSell?: () => void;
}
type TravelProduct = {
  _id: string;
  name: string;
  remarks: string;
  price: number;
  tags: string[];
  images: string[];
  pickedCount: number;
  seller: { name: string } | null;
};
type FetchTravelproductsData = {
  fetchTravelproducts: TravelProduct[];
};

const PAGE_SIZE = 10;
const PAGE_GROUP_SIZE = 5;

export default function BuySection({ onStartSell }: BuySectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSoldout, setIsSoldout] = useState(false);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [toggleTravelproductPick] = useMutation(TOGGLE_TRAVELPRODUCT_PICK);
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN);
  const loggedInUser = userData?.fetchUserLoggedIn;

  const { data, loading, error, previousData } =
    useQuery<FetchTravelproductsData>(Fetch_Travel_Products, {
      variables: {
        page,
        search: search || undefined,
        isSoldout: isSoldout || undefined,
      },
    });
  if (loading)
    return <main className={styles.page}>숙박권을 불러오는 중...</main>;
  if (error)
    return (
      <main className={styles.error}>
        속박권을 불러오는 중 오류가 발생했습니다.
      </main>
    );

  const products =
    data?.fetchTravelproducts ?? previousData?.fetchTravelproducts ?? [];

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCategory("");
    setSearch(keyword);
    setPage(1);
  };

  const onClickCategory = (selectedCategory: string) => {
    if (category === selectedCategory) {
      setCategory("");
      setKeyword("");
      setSearch("");
    } else {
      setCategory(selectedCategory);
      setKeyword("");
      setSearch(selectedCategory);
    }
    setPage(1);
  };

  const onClickBookmark = async (
    event: React.MouseEvent<HTMLButtonElement>,
    travelproductId: string,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    if (!loggedInUser) {
      alert("로그인이 필요한 기능이에요.");
      return;
    }
    try {
      const result = await toggleTravelproductPick({
        variables: { travelproductId },
        update: (cache, mutationResult) => {
          const isPickedNow = mutationResult.data?.toggleTravelproductPick;
          cache.modify({
            id: cache.identify({
              __typename: "Travelproduct",
              _id: travelproductId,
            }),
            fields: {
              pickedCount: (existing: number) =>
                isPickedNow ? existing + 1 : existing - 1,
            },
          });
        },
      });
    } catch (error) {
      alert(error instanceof Error ? error.message : "찜하기에 실패했어요.");
    }
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
  const categories = [
    { name: "1인 전용", image: "/Frame 427323240.png" },
    { name: "아파트", image: "/Frame 427323244.png" },
    { name: "호텔", image: "/Frame 427323238.png" },
    { name: "캠핑", image: "/Frame 427323228.png" },
    { name: "룸 서비스", image: "/Frame 427323239.png" },
    { name: "불멍", image: "/Frame 427323241.png" },
    { name: "반식욕&스파", image: "/Frame 427323242.png" },
    { name: "바다 위 숙소", image: "/Frame 427323243.png" },
    { name: "플랜테리어", image: "/Frame 427323237.png" },
  ];
  const IMAGES = [
    "/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    "/3f5f7099eed49eb3fcfca53f039677b5db712985.jpg",
    "/23e24f5fb6d114299662784db4a1b0301fa11ed6.jpg",
    "/01a0e2ed16b1635ee65d3521b8e6c956cee739d1.jpg",
    "/31b845e43dac602eaab5648ae5f5c928.jpg",
    "/2aa6de8b2fd3dbd42536eb0596de11c9.jpg",
    "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
    "/e5c2acc669e397de5dea5dfc4cf5a747b7fc6f14.jpg",
  ];

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

            <form className={styles.searchRow} onSubmit={onSubmitSearch}>
              <div
                className={`${styles.inputWrapper} ${styles.searchInputWrapper}`}
              >
                <FiSearch className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="제목을 검색해 주세요."
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <button className={styles.searchBtn}>검색</button>
            </form>
          </div>
          <Link className={styles.sellBtn} href="/travelproducts/sell">
            <FiEdit3 className={styles.btnIcon} />
            숙박권 판매하기
          </Link>
        </div>
        <div className={styles.filterBtn}>
          {categories.map((item) => (
            <button
              className={category === item.name ? styles.active : ""}
              type="button"
              key={item.name}
              onClick={() => onClickCategory(item.name)}
            >
              {item.image && <img src={item.image} alt={`필터 ${item.name}`} />}
            </button>
          ))}
        </div>
        <div className={styles.cardArea}>
          {data?.fetchTravelproducts.map((card, index) => (
            <Link
              href={`/travelproducts/${card._id}?imgIndex=${index % IMAGES.length}`}
              key={card._id}
              className={styles.cardLink}
            >
              {card.images?.[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={getImageUrl(card.images[0])}
                  alt={card.name}
                  className={styles.cardImage}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={IMAGES[index % IMAGES.length]}
                  alt={card.name ?? "상품 이미지"}
                  className={styles.cardImage}
                />
              )}
              <div className={styles.cardInfoArea}>
                <button
                  className={styles.bookmark}
                  type="button"
                  onClick={(event) => onClickBookmark(event, card._id)}
                >
                  <img src="/bookmark.png" />
                  <span>{card.pickedCount}</span>
                </button>
                <div className={styles.cardDescription}>
                  <div className={styles.cardTitle}>{card.name}</div>
                  <div className={styles.cardContents}>{card.remarks}</div>
                  {card.tags && card.tags.length > 0 ? (
                    <div className={styles.cardTags}>
                      {card.tags.map((tag, idx) => (
                        <span key={idx}>#{tag} </span>
                      ))}
                    </div>
                  ) : (
                    "\u00A0"
                  )}
                  <div className={styles.cardInfo}>
                    <div className={styles.user}>
                      <button className={styles.userProfile}></button>
                      <div className={styles.username}>{card.seller?.name}</div>
                    </div>

                    <span className={styles.price}>
                      {card.price.toLocaleString()}원
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/*
        <nav className={styles.pagination}>
          <button
            disabled={startPage === 1}
            onClick={() => setPage(startPage - 1)}
          >
            ‹
          </button>

          {pages.map((pageNumber) => (
            <button
              key={pageNumber}
              className={page === pageNumber ? styles.active : ""}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          <button
            disabled={!hasNextPage}
            onClick={() => setPage(startPage + PAGE_GROUP_SIZE)}
          >
            ›
          </button>
        </nav> */}
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
