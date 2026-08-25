import HeroBanner from "@/components/home/hero-banner";
import BuySection from "@/components/purchase/purchase-section";
import styles from "./styles.module.css";

export default function TravelProductsPage() {
  return (
    <main>
      {/* 기능을 붙이기 전에 숙박권 목록 화면부터 만들어 볼 페이지예요. */}
      <HeroBanner />
      <BuySection />
    </main>
  );
}
