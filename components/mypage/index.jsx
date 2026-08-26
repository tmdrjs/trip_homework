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

const MOCK_DATA = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  date: "2024.12.16",
  type: index % 2 === 0 ? "충전" : "구매",
  amount: index % 2 === 0 ? 1000000 : -50000,
  balance: 1222000,
  payId: "adcd1243",
  charge: 1000000,
  seller: "홍길동",
  product: "파르나스 호텔 제주",
}));

// ----------------------------------------------------------------------
// 1. 재사용 컴포넌트
// ----------------------------------------------------------------------

function SearchArea({
  placeholder = "필요한 내용을 검색해 주세요.",
  onSearch,
}) {
  return (
    <div className={styles.searchArea}>
      <div className={styles.search}>
        <img src="/search.png" alt="검색" />
        <input
          type="text"
          className={styles.searchInput}
          placeholder={placeholder}
        />
      </div>
      <button onClick={onSearch}>검색</button>
    </div>
  );
}

function Pagination({ currentPage, totalPages = 5, onPageChange }) {
  return (
    <div className={styles.pagination}>
      <button className={styles.pageArrow}>&lt;</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`${styles.pageBtn} ${
            currentPage === pageNum ? styles.activePage : ""
          }`}
        >
          {pageNum}
        </button>
      ))}
      <button className={styles.pageArrow}>&gt;</button>
    </div>
  );
}

function DataTable({
  columns,
  data = [],
  keyField = "id",
  hasPagination = false,
  page = 1,
  onPageChange,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader || styles.remarks}>
        {columns.map((col, idx) => (
          <span key={`header-${idx}`} className={col.className}>
            {col.header}
          </span>
        ))}
      </div>

      <div className={styles.tableBody || styles.productList}>
        {data.map((item, idx) => {
          const baseKey = item[keyField] ?? "row";
          const uniqueKey = `${baseKey}-p${page}-${idx}`;

          return (
            <div
              key={uniqueKey}
              className={styles.tableRow || styles.productItem}
            >
              {columns.map((col, colIdx) => (
                <span key={`col-${colIdx}`} className={col.className}>
                  {col.render ? col.render(item) : item[col.accessor]}
                </span>
              ))}
            </div>
          );
        })}
      </div>

      {hasPagination && (
        <Pagination currentPage={page} onPageChange={onPageChange} />
      )}
    </div>
  );
}

// ----------------------------------------------------------------------
// 2. 마이페이지 하단 뷰
// ----------------------------------------------------------------------

function TransactionAndBookmarkView() {
  const [detailTab, setDetailTab] = useState("products");
  const tenProducts = Array(10).fill(ProductList[0]);

  const productColumns = [
    { header: "번호", accessor: "number", className: styles.numberCell },
    { header: "상품 명", accessor: "name", className: styles.productCell },
    {
      header: "판매가격",
      className: styles.priceCell,
      render: (item) => `${Number(item.price).toLocaleString()}원`,
    },
    { header: "날짜", accessor: "date", className: styles.dateCell },
    {
      header: "",
      className: styles.actionCell,
      render: () => (
        <img src="/delete.png" alt="제거" className={styles.deleteBtn} />
      ),
    },
  ];

  const bookmarkColumns = [
    { header: "번호", accessor: "number", className: styles.numberCell },
    { header: "상품 명", accessor: "name", className: styles.productCell },
    {
      header: "판매가격",
      className: styles.priceCell,
      render: (item) => `${Number(item.price).toLocaleString()}원`,
    },
    { header: "판매자", accessor: "seller", className: styles.sellerCell },
    { header: "날짜", accessor: "date", className: styles.dateCell },
  ];

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

      <SearchArea />

      <div className={styles.detail_container}>
        <DataTable
          columns={detailTab === "products" ? productColumns : bookmarkColumns}
          data={tenProducts}
          keyField="number"
        />
      </div>
    </div>
  );
}

function PointHistoryView() {
  const [currentTab, setCurrentTab] = useState("all");
  const [page, setPage] = useState(1);

  const tabs = [
    { id: "all", label: "전체" },
    { id: "chargeHistory", label: "충전내역" },
    { id: "buyHistory", label: "구매내역" },
    { id: "sellHistory", label: "판매내역" },
  ];

  const columnConfigs = {
    all: [
      { header: "날짜", accessor: "date", className: styles.date },
      {
        header: "내용",
        className: styles.type,
        render: (item) => (
          <span className={item.amount > 0 ? styles.blueText : styles.redText}>
            {item.type}
          </span>
        ),
      },
      {
        header: "거래 및 충전 내역",
        className: styles.amount,
        render: (item) => (
          <span className={item.amount > 0 ? styles.blueText : styles.redText}>
            {item.amount > 0
              ? `+${item.amount.toLocaleString()}`
              : item.amount.toLocaleString()}
          </span>
        ),
      },
      {
        header: "잔액",
        className: styles.balance,
        render: (item) => item.balance.toLocaleString(),
      },
    ],
    chargeHistory: [
      { header: "충전일", accessor: "date", className: styles.date },
      { header: "결제 ID", accessor: "payId", className: styles.chargeType },
      {
        header: "충전 내역",
        className: styles.charge,
        render: (item) => (
          <span className={styles.blueText}>
            +{Number(item.charge).toLocaleString()}
          </span>
        ),
      },
      {
        header: "거래 후 잔액",
        className: styles.balance,
        render: (item) => item.balance.toLocaleString(),
      },
    ],
    buyHistory: [
      { header: "거래일", accessor: "date", className: styles.date },
      { header: "상품 명", accessor: "payId", className: styles.buyType },
      {
        header: "거래내역",
        className: styles.charge,
        render: (item) => (
          <span className={styles.redText}>
            -{item.charge.toLocaleString()}
          </span>
        ),
      },
      {
        header: "거래 후 잔액",
        className: styles.balance,
        render: (item) => item.balance.toLocaleString(),
      },
      { header: "판매자", accessor: "seller", className: styles.seller },
    ],
    sellHistory: [
      { header: "거래일", accessor: "date", className: styles.date },
      {
        header: "상품 명",
        accessor: "product",
        className: styles.chargeType,
      },
      {
        header: "거래내역",
        className: styles.chargeHistory,
        render: (item) => (
          <span className={styles.blueText}>
            +{item.charge.toLocaleString()}
          </span>
        ),
      },
      {
        header: "거래 후 잔액",
        className: styles.balance,
        render: (item) => item.balance.toLocaleString(),
      },
    ],
  };

  return (
    <div>
      <div className={styles.containerBtn}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`${styles.tabBtn} ${
              currentTab === tab.id ? styles.activeTab : ""
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <SearchArea />

      <div className={styles.detail_container}>
        <DataTable
          columns={columnConfigs[currentTab] || []}
          data={MOCK_DATA}
          hasPagination
          page={page}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}

function PasswordChangeView() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isValid = password.length > 0 && password === confirmPassword;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      setIsModalOpen(true);
    }
  };
  const handleClose = () => {
    setIsModalOpen(false);
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <form className={styles.passwordContainer} onSubmit={handleSubmit}>
      <div className={styles.passwordTitle}>비밀번호 변경</div>
      <div className={styles.newPassword}>
        <div>
          새 비밀번호 <span>*</span>
        </div>
        <input
          type="password"
          placeholder="새 비밀번호를 입력해 주세요."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.passwordCheck}>
        <div>
          새 비밀번호 확인 <span>*</span>
        </div>
        <input
          type="password"
          placeholder="새 비밀번호를 확인해 주세요."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.passwordBtnContainer}>
        <button className={styles.passwordBtn} disabled={!isValid}>
          비밀번호 변경
        </button>
      </div>
      {isModalOpen && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmContainer}>
            <div>비밀번호 변경 완료</div>
            <div>비밀번호 변경이 완료되었습니다.</div>
            <button type="button" onClick={handleClose}>
              완료
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

// ---------------------------------------------------------------------- //
// 3. 마이페이지                                                             //
// ---------------------------------------------------------------------- //

export default function MyPage() {
  const [activeTab, setActiveTab] = useState("history");

  return (
    <div className={styles.page}>
      <h1>마이 페이지</h1>

      {/* 내 정보 영역 */}
      <div className={styles.myinfo}>
        {CardInfo.map((info) => (
          <div key={info.id}>
            <div className={styles.infoTitle}>내 정보</div>
            <div className={styles.userInfo}>
              <button className={styles.userProfile}></button>
              <div className={styles.infoName}>{info.name}</div>
            </div>
            <div className={styles.infoPoint}>
              <img src="/point.png" alt="포인트" />
              {Number(info.point).toLocaleString()} P
            </div>
          </div>
        ))}

        {/* 선택 버튼 */}
        <div className={styles.infoBtn}>
          <button
            onClick={() => setActiveTab("history")}
            className={`${styles.tabBtn} ${activeTab === "history" ? styles.active : ""}`}
          >
            거래내역&북마크
            <img src="/right_arrow.png" alt="거래내역&북마크" />
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
}
