"use client";

import { useQuery } from "@apollo/client/react";
import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import { FETCH_BOARDS, FETCH_BOARDS_COUNT } from "@/graphql/queries";
import type { Board } from "@/types/board";
import styles from "./styles.module.css";

const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=640&q=80",
  "https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&w=640&q=80",
];

const formatDate = (date: string) => date.slice(0, 10).replaceAll("-", ".");

const PAGE_SIZE = 10;
const PAGE_GROUP_SIZE = 5;

export default function BoardSection() {
  const [keyword, setKeyword] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatDisplay = (isoDate: string) => {
    if (!isoDate) return "YYYY . MM . DD";
    return isoDate.replaceAll("-", ".");
  };
  const onChangeStartDate = (value: string) => {
    setStartDate(value);
    setPage(1);
  };

  const onChangeEndDate = (value: string) => {
    setEndDate(value);
    setPage(1);
  };
  const toStartDayISO = (dateStr: string) =>
    dateStr ? new Date(`${dateStr}T00:00:00`).toISOString() : undefined;

  const toEndDayISO = (dateStr: string) =>
    dateStr ? new Date(`${dateStr}T23:59:59.999`).toISOString() : undefined;

  const { data, loading, error, previousData } = useQuery<{
    fetchBoards: Board[];
  }>(FETCH_BOARDS, {
    variables: {
      page,
      search,
      startDate: toStartDayISO(startDate),
      endDate: toEndDayISO(endDate),
    },
    ssr: false,
  });
  const { data: countData } = useQuery<{ fetchBoardsCount: number }>(
    FETCH_BOARDS_COUNT,
    {
      variables: {
        search,
        startDate: toStartDayISO(startDate),
        endDate: toEndDayISO(endDate),
      },
      ssr: false,
    },
  );

  const boards = data?.fetchBoards ?? previousData?.fetchBoards ?? [];
  const hotBoards = boards.slice(0, 4);
  const displayedBoards = boards.slice(0, 10);

  const totalCount = countData?.fetchBoardsCount ?? 0;
  const lastPage = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const startPage =
    Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const pages = Array.from(
    { length: PAGE_GROUP_SIZE },
    (_, index) => startPage + index,
  ).filter((pageNumber) => pageNumber <= lastPage);

  const onSubmitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(keyword);
    setPage(1);
  };

  if (loading && !previousData)
    return <p className={styles.state}>게시글을 불러오고 있어요...</p>;
  if (error) return <p className={styles.state}>API 연결을 확인해주세요.</p>;

  return (
    <section className={styles.section}>
      <div className={styles.hotSection}>
        <h2>오늘 핫한 트립토크</h2>

        <div className={styles.cardList}>
          {hotBoards.map((board, index) => (
            <Link
              className={styles.card}
              href={`/boards/${board._id}`}
              key={board._id}
            >
              <img
                className={styles.cardImage}
                src={CARD_IMAGES[index]}
                alt="여행지"
              />

              <div className={styles.cardContent}>
                <h3>{board.title}</h3>

                <p className={styles.writer}>
                  <span className={styles.avatar}>👤</span>
                  {board.writer ?? "익명"}
                </p>

                <div className={styles.cardBottom}>
                  <span>♡ {board.likeCount}</span>
                  <time>{formatDate(board.createdAt)}</time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.boardArea}>
        <h2>트립토크 게시판</h2>

        <div className={styles.tools}>
          <form className={styles.search} onSubmit={onSubmitSearch}>
            <div className={styles.dateBox}>
              <img src="/calendar.png" alt="" />
              <div className={styles.dateField}>
                <span className={styles.dateDisplay}>
                  {formatDisplay(startDate)}
                </span>
                <input
                  type="date"
                  value={startDate}
                  onChange={(event) => onChangeStartDate(event.target.value)}
                  className={styles.dateInput}
                />
              </div>
              <span className={styles.dateDash}>-</span>
              <div className={styles.dateField}>
                <span className={styles.dateDisplay}>
                  {formatDisplay(endDate)}
                </span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(event) => onChangeEndDate(event.target.value)}
                  className={styles.dateInput}
                />
              </div>
            </div>

            <label className={styles.searchBox}>
              <img src="/search.png" alt="" />
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="제목을 검색해 주세요."
              />
            </label>

            <button className={styles.searchButton} type="submit">
              검색
            </button>
          </form>

          {/* 등록 화면의 기능은 없지만, 빈 페이지로 이동하는 것부터 연습해요. */}
          <Link className={styles.writeButton} href="/boards/new">
            ▣&nbsp; 트립토크 등록
          </Link>
        </div>

        <div className={styles.tableBox}>
          <div className={`${styles.row} ${styles.head}`}>
            <span className={styles.number}>번호</span>
            <span className={styles.titleCell}>제목</span>
            <span className={styles.writerCell}>작성자</span>
            <span className={styles.dateCell}>날짜</span>
          </div>

          {displayedBoards.map((board, index) => (
            <div className={styles.row} key={board._id}>
              <span className={styles.number}>
                {totalCount - (page - 1) * PAGE_SIZE - index}
              </span>
              <Link className={styles.titleCell} href={`/boards/${board._id}`}>
                {board.title}
              </Link>
              <span className={styles.writerCell}>
                {board.writer ?? "익명"}
              </span>
              <time className={styles.dateCell}>
                {formatDate(board.createdAt)}
              </time>
            </div>
          ))}

          <div className={styles.pagination}>
            <button
              type="button"
              disabled={startPage === 1}
              className={styles.arrow}
              onClick={() => setPage(startPage - 1)}
            >
              ‹
            </button>
            <div className={styles.paginationNumbers}>
              {pages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  className={page === pageNumber ? styles.selected : ""}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={startPage + PAGE_GROUP_SIZE > lastPage}
              className={styles.arrow}
              onClick={() => setPage(startPage + PAGE_GROUP_SIZE)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
