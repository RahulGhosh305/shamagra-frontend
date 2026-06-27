import { CardContent } from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import Image from "next/image";

const Quickdeal = () => {
  const deals = [
    {
      title: "বেস্ট সেলার বই",
      description: "সবচেয়ে জনপ্রিয় বইগুলো দেখুন",
      image: "/images/card-img-1.webp",
      bgColor: "bg-emerald-50",
    },
    {
      title: "নতুন প্রকাশিত বই",
      description: "নতুন আসা বইগুলো এখনই দেখুন",
      image: "/images/card-img-2.webp",
      bgColor: "bg-orange-50",
    },
    {
      title: "রহস্য ও অপরাধ কাহিনি",
      description: "রোমাঞ্চকর ক্রাইম ও থ্রিলার বই",
      image: "/images/card-img-3.webp",
      bgColor: "bg-fuchsia-50",
    },
    {
      title: "শিশুদের বই",
      description: "বাচ্চাদের জন্য মজার ও শিক্ষামূলক বই",
      image: "/images/card-img-4.webp",
      bgColor: "bg-blue-50",
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      {deals.map((deal, index) => (
        <CardContent
          key={index}
          className={`flex items-center justify-between p-2 rounded-md ${deal.bgColor}`}
        >
          <div>
            <h3 className="text-xl text-[#333333] font-semibold">
              {deal.title}
            </h3>
            <p className="text-sm text-gray-700 mt-1">{deal.description}</p>
            {/* <p className="text-md text-gray-700 mt-2">
              <span className="flex text-md items-center gap-1 text-[#333333] cursor-pointer">
                এখনই কিনুন <MoveRight size={16} />
              </span>
            </p> */}
          </div>

          <Image
            src={deal.image}
            alt="Book 1"
            width={100}
            height={100}
            className="object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-md"
          />
        </CardContent>
      ))}
    </section>
  );
};

export default Quickdeal;
