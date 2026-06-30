/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useGetProductsQuery } from "@/store/features/product/api";
import { RootState } from "@/store";

interface VerticalBookCardProps {
  products?: any[];
  categoryPage?: boolean;
}

const VerticalBookCard = ({
  products,
  categoryPage = false,
}: VerticalBookCardProps = {}) => {
  const filters = useSelector((state: RootState) => state.productFilter);
  const { data, isLoading } = useGetProductsQuery({
    category: filters.categories,
    author: filters.authors,
    price:
      filters.price === "Low to High"
        ? "LowToHigh"
        : filters.price === "High to Low"
          ? "HighToLow"
          : filters.price === "Free"
            ? "Free"
            : undefined,
    hasImage: filters.hasImage || undefined,
  });

  const displayData = products || data?.data;
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 ${categoryPage ? "lg:grid-cols-5" : "lg:grid-cols-6"} gap-8`}
    >
      {displayData?.map((book: any, i: number) => (
        <Link
          key={i}
          href={`/book/${book._id}`}
          className="group cursor-pointer block"
        >
          {/* Image Box */}
          <div className="relative border border-gray-200 rounded-lg py-6 flex items-center justify-center overflow-hidden">
            {/* {book.pricing.discountPercentage && (
              <span className="absolute top-3 left-3 min-w-15 text-center z-10 bg-linear-to-r from-[#FF5601] to-[#FF9D01] text-white text-sm font-bold px-2 py-1 rounded">
                -{book.pricing.discountPercentage}
              </span>
            )} */}

            {book?.pricing?.discountPercentage > 0 && (
              <div className="absolute top-1 left-2 z-20">
                <div className="relative flex items-center justify-center w-16 h-16">
                  <div
                    className="absolute inset-0 bg-red-500 shadow-lg"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 61% 10%, 75% 4%, 82% 18%, 96% 25%, 90% 39%, 100% 50%, 90% 61%, 96% 75%, 82% 82%, 75% 96%, 61% 90%, 50% 100%, 39% 90%, 25% 96%, 18% 82%, 4% 75%, 10% 61%, 0% 50%, 10% 39%, 4% 25%, 18% 18%, 25% 4%, 39% 10%)",
                    }}
                  />

                  <div className="relative text-white text-center leading-tight">
                    <p className="text-[20px] font-extrabold">
                      {book.pricing.discountPercentage}%
                    </p>
                    <p className="text-[12px] font-bold uppercase ml-2 -mt-0.5">
                      OFF
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* {book.hot && (
              <span className="absolute top-12 min-w-15 text-center left-3 z-10 bg-[#006680] text-white text-sm font-bold px-2 py-1 rounded">
                Hot
              </span>
            )} */}
            {/* {true && (
              <span className="absolute top-12 min-w-15 text-center left-3 z-10 bg-[#006680] text-white text-sm font-bold px-2 py-1 rounded">
                Hot
              </span>
            )} */}

            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={book?.photo || "/images/samplebook.jpg"}
                alt={book?.product?.title || "Book Title"}
                width={160}
                height={220}
                className="object-contain drop-shadow-xl cursor-pointer"
              />
            </motion.div>

            {book.cart && (
              <div
                className="absolute bottom-0 left-0 right-0 font-semibold text-white py-3 
  translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 
  transition-all duration-500 ease-out flex items-center justify-center gap-2
  bg-linear-to-r from-[#FF5601] to-[#FF9D01]"
              >
                View Details
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mt-4 space-y-1.5">
            <h3 className="text-[#333333] text-lg leading-snug">
              {book?.product?.title || "No Title"}
            </h3>


            {/* <p className="text-sm text-gray-600">
              {book?.product?.subTitle || "No subtitle available"}
            </p> */}

            <div className="flex items-center gap-2">
              <span className="text-orange-600 font-bold">
                {book?.pricing?.currency || "৳"}
                {book?.pricing?.discountPrice || book?.pricing?.originalPrice}
              </span>
              {book?.pricing?.originalPrice &&
                book?.pricing?.discountPrice &&
                book?.pricing?.discountPrice !==
                book?.pricing?.originalPrice && (
                  <span className="text-[#333333] line-through text-sm">
                    {book?.pricing?.currency || "৳"}
                    {book?.pricing?.originalPrice}
                  </span>
                )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center  gap-2 text-sm text-gray-600">
                <Image
                  src="/images/card-img-1.webp"
                  alt="author"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                {book?.product?.author || "Unknown"}
              </div>
              <div className="gap-1 text-sm flex items-center justify-center">
                <span className="text-yellow-400">★</span>
                <span className="font-bold text-[#002B44]">{book?.rating?.averageScore?.toFixed(1) || "0"}</span>
                <span className="text-gray-600 text-xs">({book?.rating?.totalReviews || "0"})</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default VerticalBookCard;
