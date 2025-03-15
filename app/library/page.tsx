'use client';
import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import axios from 'axios';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
// import HotNews from '../ComponentPage/hotNews';
import Blog from '../ComponentPage/blog';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import Hightlight from '../ComponentPage/highlight';

// Ensure Swiper is imported only on the client side
const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), { ssr: false });

function Page() {
  const [dataLibrary, setLibrary] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      const api = '/api/library';
      try {
        const response = await axios.get(api);

        setLibrary(response.data.data.data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  const [activeSlideId, setActiveSlideId] = useState(Number(dataLibrary[0]?.id));
  useEffect(() => {
    if (dataLibrary.length > 0) {
      setActiveSlideId(Number(dataLibrary[0]?.id));
    }
  }, [dataLibrary]);

  const detailBook = dataLibrary.find((item: any) => activeSlideId === Number(item?.id));

  return (
    <div>
      <div className="md:block hidden relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-publikasi.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">PUBLICATIONS</h1>
          </div>
        </div>
      </div>
      <h1 className="text-blackJ dark:text-white font-medium text-3xl md:text-4xl text-center md:text-start px-5 my-10">Popular Magazine</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={5}
        initialSlide={2}
        loop={false}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 5 },
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="h-[300px] md:h-[500px] p-5 relative"
        onSlideChange={(swiper) => {
          setActiveSlideId(dataLibrary[swiper.activeIndex]?.id);
        }}
      >
        {dataLibrary?.map((item: any, index: number) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[250px] max-h-[250px] md:min-h-[450px] md:max-h-[450px] aspect-[3/4]">
              {isLoading ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                </div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.image}`}
                  fill
                  alt={`image library`}
                  className="object-cover z-0  shadow-2xl
                    rounded-2xl"
                />
              )}
              <div className="relative z-10 flex flex-col justify-between p-5 h-full">
                <p className="text-white drop-shadow-lg">
                  {' '}
                  {new Date(item.created_at).toLocaleDateString('en-GB', {
                    // day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <div className="w-full flex justify-between items-end">
                  <p className="text-white text-xl font-semibold line-clamp-3 break-words w-[75%] drop-shadow-lg">{item.title}</p>
                  <Link href={`/library/${item.slug}`}>
                    <Image src="/img/icon/arrow-button.svg" alt="arrow-button" width={40} height={40} />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container mb-10 md:mb-20 px-5 lg:px-0">
        <div className="flex flex-col md:flex-row w-full space-x-0 md:space-x-10">
          <div className="w-[90%] md:w-[50%] lg:w-[35%] mx-auto md:mx-0 md:block hidden">
            <div className=" flex flex-col space-y-5">
              <div className="relative  min-h-[500px] max-h-[500px] lg:min-h-[714px] lg:max-h-[714px] flex flex-col p-5">
                {isLoading ? (
                  <div className="relative w-full h-full flex justify-center items-center">
                    <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                  </div>
                ) : (
                  <Link href={`/library/${detailBook?.slug}`}>
                    <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${detailBook?.image}`} fill alt={`image library`} className="object-cover z-0  shadow-2xl" />
                  </Link>
                )}
                <div className="relative z-10 flex flex-col justify-between p-5 h-full mt-auto">
                  <p className="text-white sm">
                    {' '}
                    {new Date(detailBook?.created_at).toLocaleDateString('en-GB', {
                      // day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <div className="w-full flex justify-between items-end">
                    <p className="text-white text-xl font-semibold line-clamp-3 break-words w-[75%] drop-shadow-lg">{detailBook?.title}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full justify-between">
                <a href="/dokumen/file.pdf" download={`${process.env.NEXT_PUBLIC_BE}storage/${detailBook?.file}`} className="flex w-[50%] justify-center items-center space-x-4">
                  <div className="relative h-[20px] w-[20px] lg:h-[34px] lg:w-[34px]">
                    <Image fill src={'img/icon/download.svg'} className="object-contain block dark:hidden" alt="icon download" />
                    <Image className="object-contain hidden dark:block" src={`/img/icon/download-dark.svg`} fill alt={`icon download`} />
                  </div>
                  <p className="text-blackJ dark:text-white text-[20px] lg:text-[42px] font-bold">Download</p>
                </a>
                <div className="text-orangeJ bg-blackJ dark:bg-white w-[50%] rounded-lg md:rounded-xl text-[20px] lg:text-[42px] font-bold text-center">English</div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-[50%] lg:w-[65%] flex flex-col space-y-0 md:space-y-5 break-words">
            <h1 className="line-clamp-3 md:line-clamp-none lg:line-clamp-3 break-words text-black dark:text-white font-medium text-xl md:text-3xl lg:text-5xl py-3 md:py-0">{detailBook?.title}</h1>
            <p className="text-[#5B5B5B] dark:text-white text-base md:text-xl lg::text-3xl break-words line-clamp-[12]">{detailBook?.description}</p>
          </div>
        </div>
      </div>
      <div className="container px-5 lg:px-0">
        <h1 className="text-black dark:text-white text-2xl md:text-4xl mb-5 md:mb-10 font-bold ">Other Magazines</h1>
        <div className="grid grid-cols-3 gap-10">
          {dataLibrary.map((item: any) => (
            <div key={item.slug} className=" flex flex-col space-y-5">
              <div className="relative w-full flex flex-col p-5 aspect-[9/13]">
                {isLoading ? (
                  <div className="relative w-full h-full flex justify-center items-center">
                    <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                  </div>
                ) : (
                  <Link href={`/library/${item?.slug}`}>
                    <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.image}`} fill alt={`image library`} className="object-cover z-0  shadow-2xl" />
                  </Link>
                )}
              </div>
              <div className="flex flex-col md:flex-row w-full">
                <a
                  href="/dokumen/file.pdf"
                  download={`${process.env.NEXT_PUBLIC_BE}storage/${item?.file}`}
                  className="flex w-full md:w-1/2 justify-center items-center space-x-4 border-2 border-orangeJ md:border-none rounded-md py-2 lg:py-4"
                >
                  <div className="relative w-[15px] h-[15px] md:h-[20px] md:w-[20px] lg:h-[34px] lg:w-[34px]  ">
                    <Image fill src={'img/icon/download.svg'} className="object-contain block dark:hidden" alt="icon download" />
                    <Image className="object-contain hidden dark:block" src={`/img/icon/download-dark.svg`} fill alt={`icon download`} />
                  </div>
                  <p className="text-blackJ dark:text-white text-sm md:text-[20px] lg:text-[42px] font-bold">Download</p>
                </a>
                <div className="text-orangeJ py-2 lg:py-4 bg-blackJ dark:bg-white w-full md:w-1/2 rounded-md md:rounded-xl text-sm md:text-[20px] lg:text-[42px] font-bold text-center mt-2 md:mt-0">English</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <section className="px-5 mt-5">
        <Hightlight />
      </section>
    </div>
  );
}

export default Page;
