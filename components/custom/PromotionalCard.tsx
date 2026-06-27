import { MoveRight } from "lucide-react";
import Image from "next/image";

const PromotionalCard = () => {
  const promoData = [
    {
      title: "অপরাধ কাহিনির বই",
      description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
      image: "/images/promo-book1.png",
      gradient: "from-cyan-600 to-blue-500",
    },
    {
      title: "এক বছরে সাইকেলে",
      description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
      image: "/images/promo-book2.png",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      title: "ফুলের সাথে বেড়ে ওঠা",
      description: "শিশুদের খেলনা ও উপহারে ১৫% ছাড়!",
      image: "/images/promo-book3.png",
      gradient: "from-blue-900 to-blue-700",
    },
  ];

  return (
    <section className="mx-auto mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promoData.map((item, index) => (
          <div
            key={index}
            className={`relative rounded-lg overflow-hidden bg-linear-to-r ${item.gradient} p-2 sm:p-2.5 lg:p-3 text-white group/card`}
          >
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold sm:mb-1">
              {item.title}
            </h2>

            <p className="text-md sm:text-lg mb-4 sm:mb-4">
              {item.description}
            </p>

            {/* <button className="flex gap-2 items-center border border-[#006680] px-4 py-1.5 rounded-full relative overflow-hidden group font-semibold text-[#006680] hover:text-white hover:border-orange-500 bg-white duration-300 cursor-pointer">
              <span className="absolute inset-0 bg-red-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
              <span className="flex gap-2 relative z-10 group-hover:text-white transition-colors duration-300">
                এখনই কিনুন <MoveRight className="mt-1" size={16} />
              </span>
            </button> */}

            <Image
              src={item.image}
              alt={item.title}
              width={160}
              height={160}
              className="absolute right-0 bottom-0 w-24 sm:w-32 lg:w-40 rotate-12 opacity-80 transition-all duration-500 ease-out group-hover/card:scale-110 group-hover/card:opacity-100 group-hover/card:-translate-y-2 group-hover/card:rotate-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromotionalCard;
