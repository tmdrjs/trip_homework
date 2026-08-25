// types/card.ts
export interface Card {
  id: string;
  title: string;
  contents: string;
  price: number;
  userName: string;
  bookmarks: number;
  img?: string | null;
  tags?: string[] | null;
}
// 백엔드 연동 실패 시 보여줄 VS Code 내부 더미 데이터
export const MOCK_CARDS: Card[] = [
  {
    id: "1",
    title: "시그니엘 서울 1박 숙박권",
    contents: "한강 뷰 프리미어 룸 1박 숙박권입니다.",
    price: 450000,
    userName: "김철수",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "2",
    title: "제주 신라호텔 2박 이용권",
    contents: "조식 포함 2박 이용권 판매합니다.",
    price: 600000,
    userName: "이영희",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "3",
    title: "강릉 세인트존스 오션뷰",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 180000,
    userName: "박바다",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "4",
    title: "강릉 세인트존스 오션뷰",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 180000,
    userName: "박바다",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "5",
    title: "강릉 세인트존스 오션뷰",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 180000,
    userName: "박바다",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "6",
    title: "강릉 세인트존스 오션뷰",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 180000,
    userName: "박바다",
    bookmarks: 24,
    img: "@/public/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
];
