import { NextRequest, NextResponse } from "next/server";

const GRAPHQL_API = "https://main-practice.codebootcamp.co.kr/graphql";

export async function POST(request: NextRequest) {
  const contentType = request.headers.get("content-type") || "";
  const authorization = request.headers.get("authorization");
  const cookie = request.headers.get("cookie");

  const headers = new Headers({
    // 로그인 API의 Origin 오류 방지
    origin: request.headers.get("origin") ?? request.nextUrl.origin,
  });

  if (authorization) headers.set("authorization", authorization);
  if (cookie) headers.set("cookie", cookie);

  // Apollo Preflight 헤더가 있는 경우 전달
  const apolloPreflight = request.headers.get("apollo-require-preflight");
  if (apolloPreflight) headers.set("apollo-require-preflight", apolloPreflight);

  let body: BodyInit;

  // 1. 파일 업로드(multipart/form-data) 요청인 경우
  if (contentType.includes("multipart/form-data")) {
    // Content-Type을 고정하지 않고 브라우저가 보낸 Content-Type(Boundary 포함)을 그대로 넘겨줍니다.
    headers.set("content-type", contentType);
    // 바이너리 데이터 유실 방지를 위해 ArrayBuffer 형태로 읽어옵니다.
    body = await request.arrayBuffer();
  } else {
    // 2. 일반 GraphQL (JSON) 요청인 경우
    headers.set("content-type", "application/json");
    body = await request.text();
  }

  try {
    const apiResponse = await fetch(GRAPHQL_API, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const result = new NextResponse(await apiResponse.text(), {
      status: apiResponse.status,
      headers: { "content-type": "application/json" },
    });

    // 로그인 API가 보낸 refresh token 쿠키도 브라우저에 전달해요.
    const setCookie = apiResponse.headers.get("set-cookie");
    if (setCookie) result.headers.set("set-cookie", setCookie);

    return result;
  } catch {
    return NextResponse.json(
      { errors: [{ message: "과제용 API에 연결할 수 없어요." }] },
      { status: 502 },
    );
  }
}
