"use client";
import { HeroSlider } from "@/components/HeroSlider";
import Quickdeal from "@/components/custom/Quickdeal";
import PromotionalCard from "@/components/custom/PromotionalCard";
import VerticalBookCard from "@/components/custom/VerticalBookCard";
import HorizontalBookCard from "@/components/custom/HorizontalBookCard";
import { FeatureCard } from "@/components/custom/FeatureCard";
import SectionHeader from "@/components/custom/SectionHeader";
import { Footer } from "@/components/custom/Footer";
import { PromotionalModal } from "@/components/custom/PromotionalModal";
import Image from "next/image";
import Highlight from "@/components/custom/Highlight";
import { useGetProductsQuery } from "@/store/features/product/api";
import { useTranslation } from "react-i18next";
import { useGetContentsQuery } from "@/store/features/utilities/api";

export default function Home() {
  const { t } = useTranslation();
  const {
    data: contentsResponse,
    isLoading,
    isFetching,
  } = useGetContentsQuery();

  // Best Selling
  const { data: bestSellingData } = useGetProductsQuery();
  // 🔥 Type safe version
  const groupByCategory = (data: unknown[] = []) => {
    const result: Record<string, unknown[]> = {};
    for (const item of data) {
      const categoryName =
        (item as { specifications?: { category?: { name?: string } } })
          ?.specifications?.category?.name || "Unknown";

      if (!result[categoryName]) {
        result[categoryName] = [];
      }
      result[categoryName].push(item); // ✅ original object 그대로
    }
    return result;
  };

  // ✅ safe call
  const groupedData = groupByCategory(bestSellingData?.data || []);
  // console.log(groupedData)

  return (
    <>
      <div className="container mx-auto p-4 bg-white text-[#1A1A1A]">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <HeroSlider
              bannersResponse={contentsResponse?.data?.heroSlider}
              isLoading={isLoading}
              isFetching={isFetching}
            />
          </div>
          <div className="col-span-1 lg:col-span-1 border border-gray-100 rounded-lg relative overflow-hidden h-[25vh] sm:h-[30vh] lg:h-[38vh]">
            <Highlight
              highlightsBanners={contentsResponse?.data?.promoBanner}
            />
          </div>
        </div>
        <Quickdeal />
        <PromotionalCard />

        {Object.entries(groupedData)
          .sort(([categoryA], [categoryB]) => {
            if (categoryA === "সর্বাধিক বিক্রিত বই") return -1;
            if (categoryB === "সর্বাধিক বিক্রিত বই") return 1;
            return 0;
          })
          .map(([categoryName, products]) => (
            <section key={categoryName} className="mt-8">
              <SectionHeader
                title={categoryName}
                buttonText="আরো দেখুন"
                href={`/category/${categoryName}`}
              />
              {categoryName === "সর্বাধিক বিক্রিত বই" ? (
                <HorizontalBookCard
                  products={Array.isArray(products) ? products.slice(0, 3) : []}
                />
              ) : (
                <VerticalBookCard
                  products={Array.isArray(products) ? products.slice(0, 6) : []}
                />
              )}
            </section>
          ))}

        <section className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-[#dfecf1] p-8 rounded-md mt-8">
            <FeatureCard
              icon="🚚"
              title={t("FEATURES_INFO.RETURN_REFUND")}
              desc={t("FEATURES_INFO.MONEY_BACK_GUARANTEE")}
            />
            <FeatureCard
              icon="🔒"
              title={t("FEATURES_INFO.SECURE_PAYMENT")}
              desc={t("FEATURES_INFO.30_OFF_BY_SUBSCRIBING")}
            />
            <FeatureCard
              icon="💬"
              title={t("FEATURES_INFO.QUALITY_SUPPORT")}
              desc={t("FEATURES_INFO.ALWAYS_ONLINE_24_7")}
            />
            <FeatureCard
              icon="🏷️"
              title={t("FEATURES_INFO.DAILY_OFFERS")}
              desc={t("FEATURES_INFO.20_OFF_BY_SUBSCRIBING")}
            />
          </div>
        </section>

        {contentsResponse?.data?.preFBanner?.[0]?.photo && (
          <section className="lg:mt-16">
            <Image
              src={contentsResponse?.data.preFBanner?.[0].photo}
              alt="Promotional Banner"
              width={1200}
              height={150}
              className="w-full rounded-lg mt-8"
            />
          </section>
        )}

        {/* Footer */}
        <section className="mt-16">
          <Footer />
        </section>
      </div>
      {/* Promotional Dialog */}
      {
        contentsResponse?.data?.adsBanner?.[0]?.photo && (
          <PromotionalModal photo={contentsResponse?.data?.adsBanner?.[0]?.photo} />
        )
      }
    </>
  );
}
