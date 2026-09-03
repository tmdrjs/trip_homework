"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import styles from "./styles.module.css";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { uploadImage } from "@//lib/upload-image";
import { CREATE_TRAVELPRODUCT } from "@/graphql/mutations";

const TiptapEditor = dynamic(() => import("@/components/tiptap/tiptapeditor"), {
  ssr: false,
  loading: () => <p>에디터를 불러오는 중입니다...</p>,
});

type CreateData = {
  createTravelproduct: { _id: string };
};

const getImageUrl = (path: string) => {
  if (path.startsWith("http")) return path;
  return `https://storage.googleapis.com/${path}`;
};

type DaumPostcode = new (options: {
  oncomplete: (data: { address: string; zonecode: string }) => void;
}) => { open: () => void };

declare global {
  interface Window {
    daum?: { Postcode: DaumPostcode };
  }
}

export default function SellPageContent() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [remarks, setRemarks] = useState("");
  const [contents, setContents] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [geocoding, setGeocoding] = useState(false);

  const hasValue =
    name != "" &&
    remarks != "" &&
    contents != "" &&
    price != 0 &&
    address != "" &&
    imageUrls.length >= 1;

  const [createTravelproduct, { loading }] =
    useMutation<CreateData>(CREATE_TRAVELPRODUCT);

  const onClickAddressSearch = () => {
    const Postcode = window.daum?.Postcode;

    if (!Postcode) {
      alert("주소 검색 스크립트를 불러오는 중입니다.");
      return;
    }

    new Postcode({
      oncomplete: async (data) => {
        setZipCode(data.zonecode);
        setAddress(data.address);
        setGeocoding(true);

        try {
          // 선택한 주소를 좌표로 바꾼 뒤 위도·경도 state를 함께 갱신해요.
          const response = await fetch(
            `/api/geocode?address=${encodeURIComponent(data.address)}`,
          );
          const coordinate = (await response.json()) as {
            lat?: number;
            lng?: number;
            message?: string;
          };

          if (
            !response.ok ||
            coordinate.lat === undefined ||
            coordinate.lng === undefined
          ) {
            throw new Error(coordinate.message ?? "좌표를 찾지 못했어요.");
          }

          setLat(String(coordinate.lat));
          setLng(String(coordinate.lng));
        } catch (error) {
          alert(
            error instanceof Error ? error.message : "좌표 검색에 실패했어요.",
          );
        } finally {
          setGeocoding(false);
        }
      },
    }).open();
  };

  const onChangeFiles = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > 5 * 1024 * 1024) return false;
      return true;
    });

    if (validFiles.length !== files.length) {
      alert("이미지 파일만 가   능하며 파일당 5MB 이하여야 합니다.");
    }

    try {
      setUploading(true);

      // 여러 파일 업로드가 모두 끝나면 URL 배열을 state에 저장해요.
      const uploadedUrls = await Promise.all(
        validFiles.map((file) => uploadImage(file)),
      );
      setImageUrls((previous) => [...previous, ...uploadedUrls]);
    } catch (error) {
      console.error("이미지 업로드 오류 내용:", error);
      alert(error instanceof Error ? error.message : "업로드에 실패했어요.");
    } finally {
      setUploading(false);
    }
  };
  const onDeleteImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name || !remarks || !contents || price <= 0) {
      alert("숙박권 정보와 가격을 입력해 주세요.");
      return;
    }

    if (imageUrls.length === 0) {
      alert("이미지를 한 장 이상 업로드해 주세요.");
      return;
    }

    try {
      const result = await createTravelproduct({
        variables: {
          input: {
            name,
            remarks,
            contents,
            price,
            tags: tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== ""),
            images: imageUrls,
            travelproductAddress: {
              address,
              addressDetail,
              lat: Number(lat),
              lng: Number(lng),
            },
          },
        },
        context: { apiName: "practice" },
      });

      const productId = result.data?.createTravelproduct._id;
      if (productId) router.push(`/travelproducts/${productId}`);
    } catch (error) {
      alert(
        error instanceof Error ? error.message : "숙박권 등록에 실패했어요.",
      );
    }
  };

  const mapLat = Number(lat);
  const mapLng = Number(lng);
  const hasCoordinates = Boolean(lat && lng);
  const mapUrl = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?` +
      `bbox=${mapLng - 0.01}%2C${mapLat - 0.01}%2C${mapLng + 0.01}%2C${mapLat + 0.01}` +
      `&layer=mapnik&marker=${mapLat}%2C${mapLng}`
    : "";

  return (
    <main className={styles.page}>
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <h1>숙박권 판매하기</h1>
      <form className={styles.inputGrid} onSubmit={onSubmit}>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            상품명 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="상품명을 입력해 주세요."
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            한줄 요약 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="상품을 한줄로 요약해 주세요."
            value={remarks}
            onChange={(event) => setRemarks(event.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            상품 설명 <span>*</span>
          </div>
          <TiptapEditor onChange={(html) => setContents(html)} />
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>
            판매 가격 <span>*</span>
          </div>
          <input
            type="text"
            placeholder="판매 가격을 입력해 주세요. (원 단위)"
            value={price || ""}
            onChange={(event) => setPrice(Number(event.target.value))}
          />
        </div>
        <div className={styles.inputSection}>
          <div className={styles.inputTitle}>태그 입력</div>
          <input
            type="text"
            placeholder="태그를 입력해 주세요."
            value={tags}
            onChange={(event) => setTags(event.target.value)}
          />
        </div>
        <div className={styles.dividedSection}>
          <div className={styles.sideSection}>
            <div className={styles.addressSection}>
              <div className={styles.inputTitle}>
                주소<span>*</span>
              </div>
              <div className={styles.zipCode}>
                <input
                  type="text"
                  placeholder="01234"
                  className={styles.zipCodeInput}
                  value={zipCode}
                  readOnly
                />
                <button type="button" onClick={onClickAddressSearch}>
                  우편번호 검색
                </button>
              </div>
              <input
                type="text"
                placeholder="상세주소를 입력해 주세요."
                value={address}
                readOnly
              />
            </div>
            <div className={styles.latSection}>
              <div className={styles.inputTitle}>위도(LAT)</div>
              <input
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                value={lat}
                readOnly
              />
            </div>
            <div className={styles.lngSection}>
              <div className={styles.inputTitle}>경도(LNG)</div>
              <input
                type="text"
                placeholder="주소를 먼저 입력해 주세요."
                value={lng}
                readOnly
              />
            </div>
          </div>

          <div className={styles.mapSection}>
            <div className={styles.inputTitle}>상세 위치</div>

            {geocoding ? (
              <div className={styles.mapContainer}>
                주소를 변환하는 중입니다...
              </div>
            ) : !hasCoordinates ? (
              <div className={styles.mapContainer}>
                주소를 먼저 입력해 주세요.
              </div>
            ) : (
              <iframe
                className={styles.map}
                title="입력한 좌표의 지도"
                src={mapUrl}
                height="312px"
              />
            )}
          </div>
        </div>
        <div className={styles.imgSection}>
          <div className={styles.inputTitle}>사진 첨부</div>
          <div className={styles.imgContainer}>
            {imageUrls.map((url, index) => (
              <div key={`${url}-${index}`} className={styles.imgPreview}>
                <img
                  src={getImageUrl(url)}
                  alt={`업로드 이미지 ${index + 1}`}
                />
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => onDeleteImage(index)}
                >
                  <img src="/close1.png" alt="삭제" />
                </button>
              </div>
            ))}
            {uploading && <div className={styles.imgLoading}>업로드 중...</div>}
            <div className={styles.img}>
              <input
                id="file"
                type="file"
                accept="image/*"
                multiple
                onChange={onChangeFiles}
              />
              <label htmlFor="file">
                <img src="/add.png" alt="" />
                클릭하여 사진 업로드
              </label>
            </div>
          </div>
        </div>
        <div className={styles.btnSection}>
          <Link href="./">
            <button>취소</button>
          </Link>
          <button type="submit" disabled={!hasValue || loading}>
            {loading ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>
    </main>
  );
}
