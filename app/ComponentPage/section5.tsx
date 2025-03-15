'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import React from 'react';

function Section5() {
  const card = [
    {
      title: 'Women human rights and gender equality',
      description: 'Effectively ensuring that women, girls, men, boys and gender-diverse people can fully enjoy human rights requires, first, a comprehensive understanding of social structures, policies and stereotypes...',
      img: 'section5a',
    },
    {
      title: '#StandUp4Migrants',
      description:
        'When migrants are portrayed in a negative light, their human rights are heavily impacted. They are discriminated, excluded and dehumanised. Communities also become divided. How we speak about migrants and migration – the narrative – therefore...',
      img: 'section5b',
    },
    {
      title: 'Women human rights and gender equality',
      description: 'Effectively ensuring that women, girls, men, boys and gender-diverse people can fully enjoy human rights requires, first, a comprehensive understanding of social structures, policies and stereotypes...',
      img: 'section5a',
    },
  ];
  return (
    <div className="container my-10">
      <h1 className="text-blackJT font-medium text-4xl mb-10">Our impact in stories</h1>
      <Swiper
        spaceBetween={20}
        slidesPerView={'auto'}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 2.5 },
        }}
        className="w-full"
      >
        {card.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 h-[200px] md:h-[342px]">
              <div className="relative h-full w-full">
                <Image src={`/img/home/${item.img}.svg`} fill alt={`image ${item.img}`} className="object-cover rounded-l-lg" />
              </div>
              <div className="relative bg-[#E2E8F0] pt-5  flex flex-col items-center w-full">
                <div className="w-[80%]">
                  <h1 className="text-blackJT text-sm md:text-xl font-semibold">{item.title}</h1>
                  <div className="text-grayJ text-xs md:text-base mt-2">{item.description}</div>
                </div>
                <button className="absolute bottom-2 right-2 bg-orangeJ p-2 md:p-3 rounded-lg mr-5 md:mr-0">
                  <div className="relative w-[20px] md:w-[24px] h-[20px] md:h-[24px]">
                    <Image src={'/img/icon/arrow-button.svg'} alt="arrow button" fill className="object-contain" />
                  </div>
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Section5;
