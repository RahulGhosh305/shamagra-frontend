"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

type SlideItem = {
  photo?: string;
  name?: string;
};

export function HeroSlider({ bannersResponse, isLoading, isFetching }: { bannersResponse: any, isLoading: any, isFetching: any }) {
  const slides = (bannersResponse ?? []) as SlideItem[];

  if (isLoading || isFetching) {
    return null;
  }

  if (!slides.length) {
    return null;
  }

  const autoPlayConfig =
    slides.length > 1 ? { delay: 5000, disableOnInteraction: false } : false;
  const loopSlides = slides.length > 1;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      pagination={{ clickable: true }}
      autoplay={autoPlayConfig}
      loop={loopSlides}
      className="w-full h-[25vh] sm:h-[30vh] lg:h-[38vh] rounded-lg"
    >
      {slides.map((slide, idx) => {
        const imageUrl = slide.photo;
        const altText = slide.name ?? "banner";

        if (!imageUrl) return null;

        return (
          <SwiperSlide key={idx}>
            <div className="w-full h-full relative overflow-hidden rounded-lg bg-slate-200">
              <Image
                src={imageUrl}
                alt={altText}
                fill
                priority={idx === 0}
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
