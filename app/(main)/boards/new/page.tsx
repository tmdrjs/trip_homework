"use client";
import { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";
import AuthGuard from "@/components/auth/AuthGuard";

function BoardPage() {
  const [title, setTitle] = useState<string>("");
  const [writer, setWriter] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const hasValue =
    title.trim().length > 0 &&
    writer.trim().length > 0 &&
    password.trim().length > 0 &&
    contents.trim().length > 0;

  return (
    <main className={styles.page}>
      {/* 이번 주에는 이 빈 공간에 Figma를 보며 화면부터 만들어요. */}
      <h1>트립토크 등록</h1>
      <div className={styles.gridSection}>
        <div className={styles.inputSection}>
          <div className={styles.writerSection}>
            <p>
              작성자 <span>*</span>
            </p>
            <input
              type="text"
              placeholder="작성자 명을 입력해 주세요."
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>
          <div className={styles.passwordSection}>
            <p>
              비밀번호 <span>*</span>
            </p>
            <input
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.inputSection}>
          <p>
            제목 <span>*</span>
          </p>
          <input
            type="text"
            placeholder="제목을 입력해 주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <p>
            내용 <span>*</span>
          </p>
          <textarea
            placeholder="내용을 입력해 주세요."
            value={contents}
            onChange={(e) => setContents(e.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <p>주소</p>
          <div className={styles.zipCode}>
            <input type="number" placeholder="01234" />
            <button>우편번호 검색</button>
          </div>
          <input type="text" placeholder="주소를 입력해 주세요," />
          <input type="text" placeholder="상세주소" />
        </div>
        <div className={styles.inputSection}>
          <p>유튜브 링크</p>
          <input type="text" placeholder="링크를 입력해 주세요." />
        </div>
        <div className={styles.inputSection}>
          <p>사진 첨부</p>
          <div className={styles.imgSection}>
            <div className={styles.imgContainer}>
              <img src={`@/public/add.png`.replace("@/public/", "/")} alt="" />
              클릭하여 사진 업로드
            </div>
            <div className={styles.imgContainer}>
              <img src={`@/public/add.png`.replace("@/public/", "/")} alt="" />
              클릭하여 사진 업로드
            </div>
            <div className={styles.imgContainer}>
              <img src={`@/public/add.png`.replace("@/public/", "/")} alt="" />
              클릭하여 사진 업로드
            </div>
          </div>
        </div>
        <div className={styles.btnSection}>
          <Link href="/">
            <button>취소</button>
          </Link>
          <Link href="/" onClick={(e) => !hasValue && e.preventDefault()}>
            <button disabled={!hasValue}>등록하기</button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function BoardNewPage() {
  return (
    <AuthGuard>
      <BoardPage />
    </AuthGuard>
  );
}
