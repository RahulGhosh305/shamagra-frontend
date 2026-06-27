"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetProductByIdQuery,
  useAddReviewMutation,
} from "@/store/features/product/api";
import { RootState } from "@/store";
import { addToCart } from "@/store/features/cart/slice";
import { toggleWishlist } from "@/store/features/wishlist/slice";
import { Footer } from "@/components/custom/Footer";
import SectionHeader from "@/components/custom/SectionHeader";
import VerticalBookCard from "@/components/custom/VerticalBookCard";
import SpecRow from "@/components/custom/SpecRow";
import BenefitItem from "@/components/custom/BenefitItem";
import { Heart, Share2, ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomBreadcrumb } from "@/components/custom/CustomBreadcrumb";
// import { BOOK_THUMBNAILS, BOOK_SPECS } from "@/lib/data";

const BookDetails = () => {
  const { id } = useParams();
  const { data: response, isLoading } = useGetProductByIdQuery(id as string);
  const book = response?.data;
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAlreadyInCart = cartItems.some((item) => item._id === book?._id);

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === book?._id);

  const [selectedImageState, setSelectedImage] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [addReview, { isLoading: isReviewing }] = useAddReviewMutation();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleRatingSubmit = async (rating: number) => {
    if (!user) {
      toast.error("রিভিউ দিতে লগইন করুন!", {
        position: "bottom-right",
        style: {
          background: "#bb2124",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }
    try {
      await addReview({ id: id as string, rating }).unwrap();
      toast.success("আপনার রিভিউ সাবমিট হয়েছে!");
      // Optionally trigger refetch
    } catch (err: any) {
      toast.error(err?.data?.message || "রিভিউ দিতে সমস্যা হয়েছে");
    }
  };

  const handleAddToCart = () => {
    if (!book) return;

    if (isAlreadyInCart) {
      toast.info("এই বইটি ইতোমধ্যেই কার্টে আছে!", {
        position: "bottom-right",
        style: {
          background: "#F59E0B",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      return;
    }

    dispatch(
      addToCart({
        _id: book._id,
        product: {
          title: book.product.title,
          author: book.product.author,
        },
        photo: book.photo || "",
        pricing: book.pricing,
      }),
    );

    toast.success(`${book?.product?.title} কার্টে যোগ হয়েছে!`, {
      position: "bottom-right",
      style: {
        background: "#2e7d32",
        color: "#fff",
        fontWeight: "bold",
      },
    });
  };

  // Dynamic specs mapping based on API payload
  const dynamicSpecs = book?.specifications
    ? [
      { label: "SKU", value: book.specifications.sku || "N/A" },
      { label: "Format", value: book.specifications.format || "N/A" },
      { label: "Total page", value: book.specifications.totalPages || "N/A" },
      { label: "Language", value: book.specifications.language || "N/A" },
      { label: "Country", value: book.specifications.originCountry || "N/A" },
      { label: "Dimensions", value: book.specifications.dimensions || "N/A" },
      { label: "Weight", value: book.specifications.weight || "N/A" },
    ]
    : [];

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 text-center mt-20">
        Loading Book Details...
      </div>
    );
  }

  const selectedImage =
    selectedImageState || book?.photo || "/images/samplebook.jpg";
  const thumbnails = [book?.photo || "/images/samplebook.jpg"]; // Usually there would be more in a photo reel

  return (
    <div className="container mx-auto p-4 bg-white">
      <div className="mb-3">
        <CustomBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Books", href: "/books" },
            { label: book?.product?.title || "Book Title" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Image Gallery Section */}
        <div className="lg:col-span-5 space-y-4">
          <div className="group cursor-grab active:cursor-grabbing relative aspect-3/4 w-2/3 mx-auto my-10 flex items-center justify-center perspective-[1500px]">
            <div className="relative w-full h-full transition-transform duration-700 transform-3d transform-[rotateY(-25deg)] group-hover:transform-[rotateY(0deg)]">
              {/* Front Cover */}
              <div
                className="absolute inset-0 z-10 shadow-2xl rounded-r-md overflow-hidden bg-white"
                style={{ transform: "translateZ(15px)" }}
              >
                <Image
                  src={selectedImage}
                  alt={book?.product?.title || "book cover"}
                  fill
                  className="object-cover"
                />
                {/* Book cover inner shadow overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent pointer-events-none"></div>
              </div>

              {/* Spine (Left side) */}
              {/* <div
                className="absolute top-0 left-0 h-full w-[30px] bg-slate-900 overflow-hidden"
                style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left' }}
              > */}
              {/* Spine texture/gradient */}
              {/* <div className="w-full h-full bg-gradient-to-r from-black/60 via-black/20 to-black/60"></div> */}
              {/* </div> */}

              {/* Back Cover */}
              <div
                className="absolute inset-0 bg-gray-500 shadow-2xl rounded-l-md"
                style={{ transform: "translateZ(-15px)" }}
              ></div>

              {/* Pages (Right side) */}
              <div
                className="absolute top-[1%] right-0 h-[98%] w-7 bg-white border-y border-r border-gray-300 flex flex-col justify-evenly"
                style={{
                  transform: "rotateY(90deg)",
                  transformOrigin: "right",
                }}
              >
                {/* Page lines effect */}
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="w-full h-px bg-gray-200"></div>
                ))}
              </div>

              {/* Pages (Top side) */}
              <div
                className="absolute top-0 left-[1%] w-[98%] h-7 bg-white border-t border-gray-300"
                style={{ transform: "rotateX(90deg)", transformOrigin: "top" }}
              ></div>

              {/* Pages (Bottom side) */}
              <div
                className="absolute bottom-0 left-[1%] w-[98%] h-7 bg-white border-b border-gray-300 shadow-xl"
                style={{
                  transform: "rotateX(-90deg)",
                  transformOrigin: "bottom",
                }}
              ></div>
            </div>
          </div>

          {/* Thumbnails */}
          {/* <div className="flex gap-3 justify-center">
            {thumbnails.map((img, idx) => (
              <div
                key={idx}
                className={`w-20 h-24 border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                  selectedImage === img
                    ? "border-[#006680]"
                    : "border-gray-100 hover:border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  width={80}
                  height={100}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div> */}
        </div>

        {/* Right: Content Section */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-[#002B44]">
                {book?.product?.title || "Book Title"}
              </h1>
              <span className="text-[#2fb140] font-bold text-md bg-green-50 px-2 py-1.5 rounded">
                Stock Availability
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="flex text-gray-500">লেখক : </div>
              <span className="text-sm text-orange-400">
                {book?.product?.author || "Unknown"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex text-orange-400 gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  className={`transition-colors ${star <= (hoveredStar || Math.round(book?.rating?.averageScore || 0)) ? "fill-orange-400 text-orange-400" : "text-gray-300"}`}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                  onClick={() => handleRatingSubmit(star)}
                />
              ))}
            </div>
            <span className="text-gray-500 text-sm">
              ({book?.rating?.totalReviews || 0} Customer Reviews)
              {(book?.rating?.averageScore || 0) > 0 &&
                ` - Avg: ${(book?.rating?.averageScore || 0).toFixed(1)}`}
            </span>
          </div>

          <p className="text-gray-500 leading-relaxed text-sm">
            {book?.product?.subTitle || "No subtitle available"}
          </p>

          <div className="flex items-center gap-3">
            <div className="text-3xl font-bold text-[#FF6B00]">
              {book?.pricing?.currency || "৳"}{" "}
              {book?.pricing?.discountPrice || book?.pricing?.originalPrice}
            </div>
            {book?.pricing?.originalPrice &&
              book?.pricing?.discountPrice &&
              book?.pricing?.discountPrice !== book?.pricing?.originalPrice && (
                <div className="text-xl text-gray-500 font-bold line-through">
                  {book?.pricing?.currency || "৳"}{" "}
                  {book?.pricing?.originalPrice}
                </div>
              )}
            {book?.pricing?.discountPercentage && (
              <div className="text-sm font-bold text-white bg-linear-to-r from-[#FF5601] to-[#FF9D01] px-2 py-1 rounded">
                {book.pricing.discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-100">
            <Dialog>
              <DialogTrigger asChild>
                <button className="border cursor-pointer border-[#006680] text-[#006680] px-8 py-3 rounded-full font-bold hover:bg-[#006680] hover:text-white transition-all">
                  একটু পড়ে দেখুন
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{book?.product?.title}</DialogTitle>
                  <DialogDescription>একটু পড়ে দেখুন</DialogDescription>
                </DialogHeader>
                <div className="-mx-4 no-scrollbar max-h-[60vh] overflow-y-auto px-4 bg-white py-4">
                  {book?.file ? (
                    Array.from({ length: 5 }).map((_, index) => {
                      const pageUrl = (book.file || "")
                        .replace(/^http:\/\//i, 'https://')
                        .replace('/upload/', `/upload/pg_${index + 1}/`)
                        .replace(/\.pdf$/i, '.jpg');

                      return (
                        <div key={index} className="mb-6 flex justify-center bg-white">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pageUrl}
                            alt={`Preview page ${index + 1}`}
                            className="w-full max-w-[500px] object-contain drop-shadow-xl border"
                            onError={(e) => {
                              e.currentTarget.parentElement!.style.display = 'none';
                            }}
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
                      <p className="mb-4">কোনো পিডিএফ পাওয়া যায়নি</p>
                    </div>
                  )}
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={handleAddToCart}
              className={`px-10 py-3 rounded-full font-bold flex items-center gap-2 shadow-lg transition-all ${isAlreadyInCart
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-[#006680] text-white hover:bg-[#004d61] cursor-pointer"
                }`}
            >
              <ShoppingCart />
              {isAlreadyInCart ? "কার্টে যোগ করা আছে" : "কার্টে যোগ করুন"}
            </button>

            <button
              onClick={() => {
                if (!book) return;
                dispatch(
                  toggleWishlist({
                    _id: book._id,
                    product: {
                      title: book.product.title,
                      author: book.product.author,
                    },
                    photo: book.photo || "",
                    pricing: book.pricing,
                  }),
                );
                const msg = isWishlisted
                  ? `${book.product?.title} প্রিয় তালিকা থেকে সরানো হয়েছে!`
                  : `${book.product?.title} প্রিয় তালিকায় যোগ গ্যাছে!`;
                toast.success(msg, {
                  position: "bottom-right",
                  style: {
                    background: isWishlisted ? "#bb2124" : "#F59E0B",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                });
              }}
              className={`w-10 h-10 flex items-center justify-center border border-gray-200 rounded-full hover:bg-red-50 hover:text-red-500 cursor-pointer transition ${isWishlisted ? "bg-red-50 text-red-500" : "bg-white"}`}
            >
              <Heart
                className={isWishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </button>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.info(`${book?.product?.title} শেয়ার link Copy হয়েছে!`, {
                  position: "bottom-right",
                  style: {
                    background: "#3B82F6",
                    color: "#fff",
                    fontWeight: "bold",
                  },
                });
              }}
              className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full hover:bg-blue-50 cursor-pointer hover:text-blue-500 transition"
            >
              <Share2 />
            </button>
          </div>

          {/* Specification Table */}
          <div className="bg-[#F9FBFC] p-6 rounded-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm">
              {dynamicSpecs.map((spec, index) => (
                <SpecRow key={index} label={spec.label} value={spec.value} />
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BenefitItem icon="✓" text="Free shipping orders from $150" />
            <BenefitItem
              icon="✓"
              text="Mamaya Flash Discount: Starting at 30% Off"
            />
            <BenefitItem icon="✓" text="30 days exchange & return" />
            <BenefitItem icon="✓" text="Safe & Secure online shopping" />
          </div>

          {/* Available On */}
          {/* <div className="flex items-center gap-8 pt-4 grayscale opacity-60">
            <span className="text-sm font-bold text-gray-700">
              Also Available On:
            </span>
            <div className="flex gap-6">
              <span className="font-bold">customer.io</span>
              <span className="font-bold">amazon</span>
              <span className="font-bold">Dropbox</span>
            </div>
          </div> */}
        </div>
      </div>

      <section className="my-16">
        <Tabs defaultValue="overview">
          <div className="flex items-center justify-center">
            <TabsList variant="line" className="mx-auto">
              <TabsTrigger value="overview" className="cursor-pointer text-lg">
                Description
              </TabsTrigger>
              <TabsTrigger value="analytics" className="cursor-pointer text-lg">
                Additional Information
              </TabsTrigger>
              <TabsTrigger value="author-info" className="cursor-pointer text-lg">
                Author Information
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="overview"
            className="mt-6 text-gray-700 leading-relaxed"
          >
            {book?.description?.long || "No description available"}
          </TabsContent>
          <TabsContent
            value="analytics"
            className="mt-6 text-gray-700 leading-relaxed"
          >
            <div className="w-full mx-auto overflow-hidden border border-gray-200 rounded-lg">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {dynamicSpecs.map((spec, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition-colors"
                    >
                      <td className="w-1/4 px-4 py-3 font-semibold text-[#333333] border-r border-gray-100">
                        {spec.label}
                      </td>
                      <td className="px-4 py-3 text-gray-500">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="author-info" className="mt-6">
            {book?.authorDescription || "No description available"}
          </TabsContent>
        </Tabs>
      </section>

      <section className="mt-8">
        <SectionHeader
          title="এই ই-বুক গুলোও দেখতে পারেন"
          buttonText="Explore More →"
          href="/books"
        />
        <VerticalBookCard />
      </section>

      {/* Footer */}
      <section className="mt-16">
        <Footer />
      </section>
    </div>
  );
};

export default BookDetails;
