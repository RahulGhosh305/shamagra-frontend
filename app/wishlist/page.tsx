"use client";
import Image from "next/image";
import { Footer } from "@/components/custom/Footer";
import { X } from "lucide-react";
import { toast } from "sonner";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { toggleWishlist } from "@/store/features/wishlist/slice";

const Wishlist = () => {
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 bg-white text-[#1A1A1A]">
      {/* Breadcrumb */}
      <div className="mb-3">
        <CustomBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Details", href: "/components" },
            { label: "Wishlist" },
          ]}
        />
      </div>

      {/* 🔥 Desktop Table */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 🔥 LEFT: TABLE */}
          <div className="lg:col-span-8 overflow-x-auto bg-white p-4">
            <table className="w-full text-left border-collapse min-w-96">
              <thead>
                <tr className="border-b border-gray-200 text-sm font-bold">
                  <th className="pb-4">Product</th>
                  <th className="pb-4 text-center">Price</th>
                  <th className="pb-4 text-center">Stock</th>
                  <th className="pb-4 text-right">Subtotal</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {wishlistItems.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center py-10 text-gray-500">
                      আপনার প্রিয় তালিকায় কোনো বই নেই।
                    </td>
                  </tr>
                )}
                {wishlistItems.map((item) => (
                  <tr key={item._id}>
                    <td className="py-4 flex items-center gap-4">
                      <button
                        onClick={() => {
                          dispatch(toggleWishlist(item));
                          toast("এই বইটি wishlist থেকে সরানো হয়েছে।", {
                            position: "bottom-right",
                            style: {
                              background: "#bb2124",
                              color: "#fff",
                              fontWeight: "bold",
                            },
                          })
                        }}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={18} />
                      </button>

                      <div className="relative w-16 h-20 bg-gray-50 rounded overflow-hidden">
                        <Image
                          src={item.photo || "/images/placeholder.png"}
                          alt={item.product?.title || "Book cover"}
                          fill
                          className="object-contain p-2"
                        />
                      </div>

                      <Link
                        href={`/book/${item._id}`}
                        className="font-semibold hover:text-[#FF7A64]"
                      >
                        <h3 className="text-md line-clamp-2">{item.product?.title}</h3>
                      </Link>
                    </td>

                    <td className="text-center text-[#FF7A64] font-bold">
                      ৳ {item.pricing?.discountPrice || item.pricing?.originalPrice}
                    </td>

                    <td className="text-center text-green-700 font-bold">
                      Available
                    </td>

                    <td className="text-right text-[#FF7A64] font-bold">
                      ৳ {item.pricing?.discountPrice || item.pricing?.originalPrice}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 RIGHT: SIDE MARKET (Cart Summary) */}
          <div className="lg:col-span-4">
            <div className="bg-white p-5 rounded-xl border shadow-xs sticky top-6">
              <h2 className="text-xl text-center font-bold mb-4">
                এই ই-বুক গুলোও দেখতে পারেন
              </h2>

              {wishlistItems.map((item) => (
                <Link
                  key={item._id}
                  href={`/book/${item._id}`}
                  className="group border-b last:border-b-0 p-1.5 flex gap-3 transition-colors"
                >
                  {/* Image */}
                  <div className="relative w-20 h-24 bg-gray-50 rounded overflow-hidden shrink-0">
                    <Image
                      src={item.photo || "/images/placeholder.png"}
                      alt={item.product?.title || "Book Cover"}
                      fill
                      className="object-contain p-2"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center">
                        <h3 className="text-md font-semibold group-hover:text-[#FF7A64] line-clamp-1">
                          {item.product?.title}
                        </h3>
                        <p className="text-xs mt-1">
                          <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded font-semibold whitespace-nowrap">
                            Available
                          </span>
                        </p>
                      </div>

                      <p className="text-sm text-gray-700 mt-1">
                        <span className="font-semibold">
                          Price : ৳ {item.pricing?.discountPrice || item.pricing?.originalPrice}
                        </span>
                      </p>

                      <p className="text-sm text-gray-700 mt-1">
                        Writter : {""}
                        <span className="text-[#FF7A64] font-semibold">
                          {item.product?.author || "Unknown"}
                        </span>
                      </p>
                    </div>

                    {/* Remove Button */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Mobile Card View */}
      <div className="md:hidden space-y-4">
        {wishlistItems.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            আপনার প্রিয় তালিকায় কোনো বই নেই।
          </div>
        )}
        {wishlistItems.map((item) => (
          <div
            key={item._id}
            className="border-b last:border-b-0 p-1.5 flex gap-3"
          >
            {/* Image */}
            <div className="relative w-20 h-24 bg-gray-50 rounded overflow-hidden shrink-0">
              <Image
                src={item.photo || "/images/placeholder.png"}
                alt={item.product?.title || "Book cover"}
                fill
                className="object-contain p-2"
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <Link
                    href={`/book/${item._id}`}
                    className="font-semibold hover:text-[#FF7A64] cursor-pointer"
                  >
                    <h3 className="text-sm font-semibold pr-2 line-clamp-1">{item.product?.title}</h3>
                  </Link>
                  <button
                    onClick={() => {
                      dispatch(toggleWishlist(item));
                      toast.success("Removed from wishlist", {
                        position: "bottom-right",
                        style: {
                          background: "#bb2124",
                          color: "#fff",
                          fontWeight: "bold",
                        },
                      })
                    }}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-1">
                  Price:{" "}
                  <span className="text-[#FF7A64] font-semibold">
                    ৳ {item.pricing?.discountPrice || item.pricing?.originalPrice}
                  </span>
                </p>

                <p className="text-xs mt-1">
                  Stock:{" "}
                  <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded text-[10px] font-semibold">
                    Available
                  </span>
                </p>

                <p className="text-xs mt-1">
                  Subtotal:{" "}
                  <span className="text-[#FF7A64] font-semibold">
                    ৳ {item.pricing?.discountPrice || item.pricing?.originalPrice}
                  </span>
                </p>
              </div>

              {/* Remove Button */}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <section className="mt-10">
        <Footer />
      </section>
    </div>
  );
};

export default Wishlist;
