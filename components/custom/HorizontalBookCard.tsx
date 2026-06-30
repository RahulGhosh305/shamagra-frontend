/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/features/product/api";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface HorizontalBookCardProps {
  products?: any[];
}

const HorizontalBookCard = ({ products }: HorizontalBookCardProps = {}) => {
  const { data, isLoading } = useGetProductsQuery();

  if (isLoading && !products) return <div>Loading...</div>;

  const displayData = products || data?.data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
      {displayData?.slice(0, 3).map((product: any) => (
        <div
          key={product._id}
          className="flex flex-col sm:flex-row bg-white rounded-lg transition-shadow gap-5"
        >
          {/* Image Container */}
          <div className="relative w-full sm:w-44 h-64 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={product?.photo || "/images/samplebook.jpg"}
                alt={product?.product?.title || "Book Title"}
                width={140}
                height={200}
                className="object-contain drop-shadow-xl cursor-pointer"
              />
            </motion.div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col grow justify-between py-1">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-[#333333] leading-tight mt-1">
                {product?.product?.title || "No Title"}
              </h3>
              <p className="text-gray-600 text-sm mb-2">
                {product?.product?.author || "Unknown"}
              </p>

              <div className="flex items-center gap-3">
                <span className="text-[#FF6B00] text-2xl font-bold">
                  {product?.pricing?.currency || "৳"}
                  {product?.pricing?.discountPrice ||
                    product?.pricing?.originalPrice}
                </span>
                {product?.pricing?.originalPrice &&
                  product?.pricing?.discountPrice &&
                  product?.pricing?.discountPrice !==
                  product?.pricing?.originalPrice && (
                    <span className="text-gray-400 line-through text-lg font-semibold">
                      {product?.pricing?.currency || "৳"}
                      {product?.pricing?.originalPrice}
                    </span>
                  )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400 gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentScore = Number(product?.rating?.averageScore || 0);
                    let fillPercentage = 0;
                    if (currentScore >= star) {
                      fillPercentage = 100;
                    } else if (currentScore > star - 1) {
                      fillPercentage = (currentScore - (star - 1)) * 100;
                    }

                    return (
                      <div key={star} className="relative">
                        <Star size={16} className="text-gray-300" />
                        <Star
                          size={16}
                          className="absolute top-0 left-0 fill-orange-400 text-orange-400"
                          style={{ clipPath: `inset(0 ${100 - fillPercentage}% 0 0)` }}
                        />
                      </div>
                    );
                  })}
                </div>
                <span className="text-gray-600 text-sm">
                  ({product?.rating?.totalReviews || 0} Reviews)
                </span>
              </div>
              <span className="text-[#2fb140] font-bold text-sm mt-2">
                Stock Availability
              </span>
            </div>

            <Link
              href={`/book/${product._id}`}
              className="bg-[#006680] justify-center text-white px-10 py-3 mt-2 rounded-full font-bold flex items-center gap-2 hover:bg-[#004d61] shadow-lg hover:-translate-y-1 transition-all"
            >
              বইয়ের বিবরণ
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HorizontalBookCard;
