import ProductDetail from "@/components/products/product-detail";

type ProductDetailPageProps = {
  params: Promise<{ productId: string }>;
};

export default async function BoardDetailPage({
  params,
}: ProductDetailPageProps) {
  // [boardId]처럼 대괄호 폴더로 만든 주소는 params로 값을 받아요.
  const { productId } = await params;

  return (
    <main>
      {/* 상세 페이지에서는 메인보다 낮은 배너를 재사용해요. */}
      <ProductDetail />
    </main>
  );
}
