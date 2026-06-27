/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useGetProductsQuery } from "@/store/features/product/api";
import { motion } from "framer-motion";

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
            <div className="space-y-2">
              <div className="flex justify-between items-center mb-2">
                <span className="min-w-15 text-center z-10 bg-[#006680] text-white text-xs font-bold py-0.5 px-2 rounded-full">
                  {product?.specifications?.category?.name || "Book"}
                </span>
                <div className="flex items-center gap-1 text-sm">
                  <span className="text-yellow-400">★</span>
                  <span className="font-bold text-[#002B44]">{product?.ratings?.averageRating || "0"}</span>
                  <span className="text-gray-600 text-xs">({product?.ratings?.totalRatings || "0"})</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#333333] leading-tight mb-1">
                {product?.product?.title || "No Title"}
              </h3>
              <p className="text-[#333333] text-sm mb-4">
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
                    <span className="text-[#333333] line-through text-lg font-semibold">
                      {product?.pricing?.currency || "৳"}
                      {product?.pricing?.originalPrice}
                    </span>
                  )}
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-orange-400">★★★★☆</div>
                <span className="text-gray-600 text-sm">
                  ({product?.ratings?.totalRatings} Customer Reviews)
                </span>
              </div>
              <span className="text-[#2fb140] font-bold text-sm mt-6">
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
