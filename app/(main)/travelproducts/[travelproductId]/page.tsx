"use client";

import { gql } from "@apollo/client";
import Link from "next/link";
import { useMutation, useQuery } from "@apollo/client/react";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./styles.module.css";

const FETCH_USER_LOGGED_IN = gql`
  query FetchUserLoggedIn {
    fetchUserLoggedIn {
      _id
      name
    }
  }
`;

const FETCH_TRAVELPRODUCT = gql`
  query FetchTravelproduct($travelproductId: ID!) {
    fetchTravelproduct(travelproductId: $travelproductId) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      seller {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 목록 API.
const FETCH_QUESTIONS = gql`
  query FetchQuestions($travelproductId: ID!) {
    fetchTravelproductQuestions(travelproductId: $travelproductId) {
      _id
      contents
      createdAt
      user {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 답변 목록 API.
const FETCH_ANSWERS = gql`
  query FetchAnswers($questionId: ID!) {
    fetchTravelproductQuestionAnswers(travelproductQuestionId: $questionId) {
      _id
      contents
      createdAt
      user {
        name
      }
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 생성 API.
const CREATE_QUESTION = gql`
  mutation CreateQuestion($travelproductId: ID!, $contents: String!) {
    createTravelproductQuestion(
      travelproductId: $travelproductId
      createTravelproductQuestionInput: { contents: $contents }
    ) {
      _id
    }
  }
`;

// 과제용 API에 등록된 숙박권 문의 답변 생성 API.
const CREATE_ANSWER = gql`
  mutation CreateAnswer($questionId: ID!, $contents: String!) {
    createTravelproductQuestionAnswer(
      travelproductQuestionId: $questionId
      createTravelproductQuestionAnswerInput: { contents: $contents }
    ) {
      _id
    }
  }
`;

const DELETE_ANSWER = gql`
  mutation DeleteTravelproductQuestionAnswer(
    $travelproductQuestionAnswerId: ID!
  ) {
    deleteTravelproductQuestionAnswer(
      travelproductQuestionAnswerId: $travelproductQuestionAnswerId
    )
  }
`;
const DELETE_QUESTION = gql`
  mutation DeleteTravelproductQuestion($travelproductQuestionId: ID!) {
    deleteTravelproductQuestion(
      travelproductQuestionId: $travelproductQuestionId
    )
  }
`;

type User = { name: string };
type Question = {
  _id: string;
  contents: string;
  user: User;
  createdAt: string;
};
type Answer = Question;
type Product = {
  _id: string;
  name: string;
  remarks: string;
  contents: string;
  price: number;
  images: string[];
  tags: string[];
  pickedCount: number;
  seller: User;
};
type ProductData = {
  fetchTravelproduct: Product;
};
type QuestionsData = {
  fetchTravelproductQuestions: Question[];
};
type AnswersData = {
  fetchTravelproductQuestionAnswers: Answer[];
};
type UserLoggedInData = {
  fetchUserLoggedIn: {
    _id: string;
    name: string;
  };
};

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};
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

const IMAGE = [
  "/f71f586e48aa048c2fa07145d5b85734bd66003b.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  "/e5c2acc669e397de5dea5dfc4cf5a747b7fc6f14.jpg",
  "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg",
  /* "/b099db67daa04d8d9feb8f33b8753fbc63587552.jpg", */
];
function AnswerArea({
  questionId,
  onClose,
}: {
  questionId: string;
  onClose: () => void;
}) {
  const [contents, setContents] = useState("");
  const { data, refetch } = useQuery<AnswersData>(FETCH_ANSWERS, {
    variables: { questionId },
  });
  const { data: userData } = useQuery<UserLoggedInData>(FETCH_USER_LOGGED_IN);
  const loggedInUser = userData?.fetchUserLoggedIn;

  const [createAnswer, { loading }] = useMutation(CREATE_ANSWER);
  const [deleteAnswer] = useMutation(DELETE_ANSWER);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contents.trim()) return;
    const isConfirm = confirm("답변을 등록하시겠습니까?");
    if (!isConfirm) return;
    try {
      await createAnswer({
        variables: { questionId, contents },
      });
      setContents("");
      await refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "답변 등록에 실패했어요.");
    }
  };
  const onDelete = (answerId: string) => async () => {
    const isConfirm = confirm("정말 이 답변을 삭제하시겠습니까?");
    if (!isConfirm) return; // 취소 누르면 API 요청 안 함

    try {
      await deleteAnswer({
        variables: {
          travelproductQuestionAnswerId: answerId,
        },
      });
      alert("답변이 삭제되었습니다.");
      await refetch(); // 삭제 후 답변 목록 갱신
    } catch (error) {
      alert(error instanceof Error ? error.message : "답변 삭제에 실패했어요.");
    }
  };

  return (
    <div className={styles.answerArea}>
      {data?.fetchTravelproductQuestionAnswers.map((answer) => (
        <div className={styles.answerSection} key={answer._id}>
          <img src="/return.png" />
          <div className={styles.answer}>
            <div className={styles.answerProfile}>
              <div className={styles.answerUser}>
                <button></button>
                <span>{answer.user.name}</span>
              </div>
              <div className={styles.answerFunctionBtn}>
                {loggedInUser?.name === answer.user.name && (
                  <button
                    type="button"
                    className={styles.deleteBtn}
                    onClick={onDelete(answer._id)}
                  >
                    삭제
                  </button>
                )}
              </div>
            </div>
            <p>{answer.contents}</p>
            <span className={styles.answerDate}>
              {answer.createdAt.slice(0, 10)}
            </span>
          </div>
        </div>
      ))}

      <form className={styles.answerForm} onSubmit={onSubmit}>
        <input
          placeholder="실습 API에서는 로그인 사용자도 답변할 수 있습니다."
          value={contents}
          onChange={(event) => setContents(event.target.value)}
        />
        <div>
          <button type="submit" onClick={onClose}>
            취소
          </button>
          <button disabled={loading}>
            {loading ? "등록 중" : "답변 하기"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function BoardDetailPage() {
  const ICONS = ["/delete.png", "/link.png", "/location.png"];
  const params = useParams<{ travelproductId: string }>();
  const searchParams = useSearchParams();
  const travelproductId = params.travelproductId;
  const { data: userData } = useQuery<UserLoggedInData>(FETCH_USER_LOGGED_IN);
  const loggedInUser = userData?.fetchUserLoggedIn;
  const [contents, setContents] = useState("");
  const [openQuestionId, setOpenQuestionId] = useState<string | null>(null);

  const imgIndexParam = searchParams.get("imgIndex");
  const imgIndex = imgIndexParam ? Number(imgIndexParam) : 0;

  const productResult = useQuery<ProductData>(FETCH_TRAVELPRODUCT, {
    variables: { travelproductId },
  });
  const questionsResult = useQuery<QuestionsData>(FETCH_QUESTIONS, {
    variables: { travelproductId },
  });

  const [createQuestion, { loading: creating }] = useMutation(CREATE_QUESTION);
  const [deleteQuestion] = useMutation(DELETE_QUESTION);
  const onSubmitQuestion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contents.trim()) return;
    const isConfirm = confirm("문의을 등록하시겠습니까?");
    if (!isConfirm) return;
    try {
      await createQuestion({
        variables: { travelproductId, contents },
      });
      setContents("");
      await questionsResult.refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "문의 등록에 실패했어요.");
    }
  };
  const onDeleteQuestion = (questionId: string) => async () => {
    const isConfirm = confirm("정말 이 문의를 삭제하시겠습니까?");
    if (!isConfirm) return;

    try {
      await deleteQuestion({
        variables: {
          travelproductQuestionId: questionId,
        },
      });
      alert("문의가 삭제되었습니다.");
      await questionsResult.refetch();
    } catch (error) {
      alert(error instanceof Error ? error.message : "문의 삭제에 실패했어요.");
    }
  };
  if (productResult.loading) {
    return <main className={styles.page}>상세 정보를 불러오는 중...</main>;
  }
  if (productResult.error || !productResult.data) {
    return (
      <main className={styles.page}>상세 정보를 불러오는데 실패 했어요</main>
    );
  }
  const product = productResult.data.fetchTravelproduct;

  return (
    <div className={styles.page}>
      <div className={styles.product}>
        <div className={styles.topSection}>
          <div className={styles.titleSection}>
            <h1>{product.name}</h1>
            <div className={styles.iconSection}>
              {ICONS.map((path, index) => (
                <img key={index} src={path} alt={`icon-${index}`} />
              ))}
              <button>
                <img src="/bookmark.png" alt="북마크" />
                {product.pickedCount}
              </button>
            </div>
          </div>
          <p>{product.remarks}</p>
          {product.tags && product.tags.length > 0 ? (
            <div className={styles.tagSection}>
              {product.tags.map((tag, idx) => (
                <span key={idx}>#{tag} </span>
              ))}
            </div>
          ) : (
            "\u00A0"
          )}
        </div>
        <div className={styles.mainSection}>
          <div className={styles.gridSection}>
            <div className={styles.productSection}>
              <div className={styles.mainImgSection}>
                {product.images?.[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getImageUrl(product.images[0])}
                    alt={product.name}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={IMAGES[imgIndex % IMAGES.length]}
                    alt={product.name ?? "상품 이미지"}
                  />
                )}
              </div>
              <div className={styles.sideImgSection}>
                {IMAGE.map((url, index) => (
                  <div key={index} className={styles.imgContainer}>
                    <img key={index} src={url} alt={`image-${index}`} />
                  </div>
                ))}
                <div className={styles.imgOverlay}></div>
              </div>
            </div>
            <div className={styles.descriptionSection}>
              <h2>상세 설명</h2>
              <p>{product.contents}</p>
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
              <p>{product.price.toLocaleString()}원</p>
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
                {product.seller?.name}
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
            <form className={styles.questionForm} onSubmit={onSubmitQuestion}>
              <textarea
                name="text"
                value={contents}
                onChange={(event) => setContents(event.target.value)}
                className={styles.contactTextarea}
                placeholder="문의사항을 입력해 주세요."
              ></textarea>
              <div className={styles.contactBtnSection}>
                <button type="submit" disabled={creating}>
                  {creating ? "등록 중" : "문의하기"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {questionsResult.loading && <p>문의를 불러오는 중...</p>}
        {questionsResult.error && (
          <p className={styles.error}>{questionsResult.error.message}</p>
        )}
        <div className={styles.questionSection}>
          {questionsResult.data?.fetchTravelproductQuestions.map((question) => (
            <article className={styles.questionAnswer} key={question._id}>
              <div className={styles.question}>
                <div className={styles.questionProfile}>
                  <div className={styles.questionUser}>
                    <button></button>
                    <span>{question.user.name}</span>
                  </div>

                  {loggedInUser?.name === question.user.name && (
                    <div className={styles.questionFunctionBtn}>
                      <button type="button" className={styles.editBtn}>
                        <img src="/edit.png" alt="" />
                      </button>{" "}
                      <button
                        type="button"
                        className={styles.deleteBtn}
                        onClick={onDeleteQuestion(question._id)}
                      >
                        <img src="/close.png" alt="" />
                      </button>
                    </div>
                  )}
                </div>
                <p>{question.contents}</p>
                <span className={styles.questionDate}>
                  {question.createdAt.slice(0, 10)}
                </span>
                <div className={styles.answerBtn}>
                  <img src="/reply.png" alt="" />
                  <button
                    onClick={() =>
                      setOpenQuestionId((prev) =>
                        prev === question._id ? null : question._id,
                      )
                    }
                  >
                    답변하기
                  </button>
                </div>
              </div>
              {openQuestionId === question._id && (
                <AnswerArea
                  questionId={question._id}
                  onClose={() => setOpenQuestionId(null)}
                />
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
