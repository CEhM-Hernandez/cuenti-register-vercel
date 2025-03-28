'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay } from 'swiper/modules'

import { Slide } from './Slide'

import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'

export default function CuentiSwiper({ slides }: { slides: any[] }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      pagination={{
        clickable: true,
        type: 'bullets',
        clickableClass:
          '!bottom-[20%] h-fit flex gap-2 items-center justify-center',
        bulletClass:
          'inline-block cursor-pointer w-6 h-2 bg-cuenti-yellow rounded-full transition-all duration-300 opacity-100',
        bulletActiveClass: '!bg-cuenti-dark-blue !w-12',
      }}
      className="w-full h-5/6 max-h-[600px]"
      spaceBetween={50}
      autoplay={{
        delay: 5000,
        pauseOnMouseEnter: false,
        disableOnInteraction: false,
      }}
      speed={500}
      loop={true}
    >
      {slides.map((slide, index) => (
        <SwiperSlide
          key={index}
          className="!flex flex-col justify-around xl:justify-between items-center md:gap-6 xl:gap-20"
        >
          <Slide slide={slide} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
