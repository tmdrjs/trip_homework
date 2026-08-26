// types/card.ts
export interface Card {
  id: string;
  title: string;
  contents: string;
  price: number;
  userName: string;
  bookmarks: string;
  img?: string | null;
  tags?: string[] | null;
}
// 백엔드 연동 실패 시 보여줄 VS Code 내부 더미 데이터
export const MOCK_CARDS: Card[] = [
  {
    id: "1",
    title: "서울 신라호텔",
    contents: "철학과 자부심이 담긴 시그니처 스위트 객실입니다.",
    price: 550000,
    userName: "(주)호텔신라",
    bookmarks: "4.3k",
    img: "@/public/shilla-suite-1503x1000.jpg",
    tags: ["4인 이하", "남산", "21층", "더블 킹 베드"],
  },
  {
    id: "2",
    title: "발리 정원 뷰의 보헤미안 킹룸",
    contents: "조식 포함 2박 이용권 판매합니다.",
    price: 160000,
    userName: "이영희",
    bookmarks: "1.2k",
    img: "@/public/3f5f7099eed49eb3fcfca53f039677b5db712985.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
  {
    id: "3",
    title: "폴란드 파노라마 네이처 룸",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 250000,
    userName: "박바다",
    bookmarks: "2.3k",
    img: "@/public/23e24f5fb6d114299662784db4a1b0301fa11ed6.jpg",
    tags: ["6인 이하", "건식 사우나"],
  },
  {
    id: "4",
    title: "지중해의 에메랄드빛 프라이빗 리조트",
    contents:
      "프라이빗 야외 수영장, 바다를 가장 가까이에서 즐길 수 있는 스위트룸입니다.",
    price: 400000,
    userName: "박바다",
    bookmarks: "3.7k",
    img: "@/public/01a0e2ed16b1635ee65d3521b8e6c956cee739d1.jpg",
    tags: ["6인 이하", "야외 수영장", "오션뷰"],
  },
  {
    id: "5",
    title: "절벽 위 오션뷰 스위트룸",
    contents:
      "인피니티풀과 통유리창 너머 절벽 위 절경으로 이루어진 럭셔리 객실입니다..",
    price: 627000,
    userName: "박바다",
    bookmarks: "21.3k",
    img: "@/public/31b845e43dac602eaab5648ae5f5c928.jpg",
    tags: ["인피니티 풀", "화로", "절벽 위"],
  },
  {
    id: "6",
    title: "해안선 야경이 펼쳐지는 테라스 스위트룸",
    contents: "주말 사용 가능한 디럭스룸입니다.",
    price: 360000,
    userName: "박바다",
    bookmarks: "15.3k",
    img: "@/public/2aa6de8b2fd3dbd42536eb0596de11c9.jpg",
    tags: ["6인 이하", "건식 사우나", "애견동반 가능"],
  },
];
