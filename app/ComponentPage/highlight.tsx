'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

function Hightlight({ id, path }: any) {
  const pathname = usePathname();
  const [dataNews, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (path !== null && path !== undefined) {
      const fetchNews = async () => {
        setIsLoading(true);
        const api = `/api/news/news-highlight?path=` + path;
        try {
          const response = await axios.get(api);

          setNews(response.data.data);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };
      fetchNews();
    } else {
      const fetchNews = async () => {
        setIsLoading(true);
        const api = '/api/news/news-highlight-default';
        try {
          const response = await axios.get(api);

          setNews(response.data.data.data);
          setIsLoading(false);
        } catch {
          setIsLoading(false);
        }
      };
      fetchNews();
    }
  }, []);

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_BE}${src}`;
  };

  return (
    <div className="container flex flex-col">
      <h1 className="font-medium text-blackJT dark:text-white text-3xl md:text-5xl mb-3 md:mb-10 cap">News Update {path}</h1>
      {dataNews.length !== 0 ? (
        <>
          <div className=" hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {pathname === '/' || pathname === '/library' || (pathname === '/news' && path === undefined) || (pathname === '/news' && path === null)
              ? dataNews.slice(0, 4).map((item: any, index: any) => (
                  <Link key={index} href={`/blog/${item.slug}`}>
                    <div className="bg-white shadow-lg hover:shadow-xl duration-300 hover:scale-[101%] rounded-lg transition-all">
                      <div className="p-5 md:p-[33px]">
                        <p className="bg-orangeJ text-white w-[80px] pl-3 pr-7 py-[5px] md:py-[6px] md:px-[6px] rounded-lg mb-0 md:mb-5 text-xs md:text-base">{item.category_name}</p>
                        <p className="text-blackJ font-bold text-sm md:text-xl line-clamp-1 lg:line-clamp-2 break-words h-14">{item.title}</p>
                      </div>
                      <div className="relative w-full h-[150px] md:h-[209px]">
                        {isLoading ? (
                          <div className="relative w-full h-full flex justify-center items-center">
                            <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} priority className="object-contain rotating-icon" />
                          </div>
                        ) : (
                          <Image
                            loader={imageLoader}
                            src={`/storage/${item?.image}`}
                            alt="Baner"
                            fill
                            loading="lazy"
                            quality={75}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,..."
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-5 md:p-[33px] tCext-xs md:text-base">
                        <p className="text-blackJ mb-5 line-clamp-2 lg:line-clamp-3  break-words">{item.subtitle}</p>
                        <p className="text-[#3F275680]">
                          {item.author_name} -
                          {new Date(item.published_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              : dataNews.map((item: any, index: any) => (
                  <Link key={index} href={`/blog/${item.slug}`}>
                    <div className="bg-white shadow-lg hover:shadow-xl duration-300 hover:scale-[101%] rounded-lg transition-all">
                      <div className="p-3 md:p-[33px]">
                        <p className="bg-orangeJ text-white w-[80px] py-[6px] px-[6px] rounded-lg mb-0 md:mb-5  text-xs md:text-base">{item.category_name}</p>
                        <p className="text-blackJ font-bold text-sm md:text-xl line-clamp-1 lg:line-clamp-2 break-words py-3 md:py-0 min-h-14">{item.title}</p>
                      </div>
                      <div className="relative w-full h-[150px] md:h-[209px]">
                        {isLoading ? (
                          <div className="relative w-full h-full flex justify-center items-center">
                            <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                          </div>
                        ) : (
                          <Image
                            loader={imageLoader}
                            src={`/storage/${item?.image}`}
                            alt="Baner"
                            fill
                            quality={75}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,..."
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="p-5 md:p-[33px] text-xs md:text-base">
                        <p className="text-blackJ mb-5 line-clamp-2 lg:line-clamp-3 break-words">{item.subtitle}</p>
                        <p className="text-[#3F275680]">
                          {item.author_name} -
                          {new Date(item.published_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
          <Link
            href={`/news${pathname === '/' || pathname === null || pathname === '' || pathname === '/library' ? '' : `/?id=${id}`}`}
            className={`${pathname === '/' || pathname === '/library' || (pathname === '/news' && path === undefined) || (pathname === '/news' && path === null) ? 'hidden lg:flex justify-end' : 'hidden'}`}
          >
            <p className="text-blackJ dark:text-white text-xl flex justify-end font-bold px-5 lg:px-0 cursor-pointer hover:mr-4 duration-300 my-5">See more &#62;&#62;</p>
          </Link>
        </>
      ) : (
        <div className="text-center mx-auto">
          <p>No data available</p>
        </div>
      )}
      <div className="block lg:hidden ">
        {dataNews.length !== 0 ? (
          <>
            <Swiper
              spaceBetween={20}
              slidesPerView={1.5}
              breakpoints={{
                640: {
                  slidesPerView: 1.5,
                },
                768: {
                  slidesPerView: 2.5,
                },
              }}
              className="w-full !bg-white dark:!bg-transparent"
            >
              {pathname === '/' || (pathname === '/news' && path === undefined) || (pathname === '/news' && path === null)
                ? dataNews.slice(0, 4).map((item: any, index: any) => (
                    <SwiperSlide key={index}>
                      <Link key={index} href={`/blog/${item.slug}`}>
                        <div className="bg-white shadow-lg hover:shadow-xl duration-300 hover:scale-[101%] rounded-lg transition-all my-5">
                          <div className="p-3 md:p-[33px]">
                            <p className="bg-orangeJ text-white w-[80px] py-[6px] px-[6px] rounded-lg mb-0 md:mb-5  text-xs md:text-base">{item.category_name}</p>
                            <p className="text-blackJ font-bold text-sm md:text-xl truncate line-clamp-none lg:line-clamp-2 break-words py-3 md:py-0">{item.title}</p>
                          </div>
                          <div className="w-full px-3">
                            <div className="relative w-full h-[150px] md:h-[209px]">
                              {isLoading ? (
                                <div className="relative w-full h-full flex justify-center items-center">
                                  <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                                </div>
                              ) : (
                                <Image
                                  loader={imageLoader}
                                  src={`/storage/${item?.image}`}
                                  alt="Baner"
                                  fill
                                  quality={75}
                                  placeholder="blur"
                                  blurDataURL="data:image/svg+xml;base64,..."
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  className="object-cover"
                                />
                              )}
                            </div>
                          </div>
                          <div className="p-5 md:p-[33px] text-xs md:text-base">
                            <p className="text-blackJ mb-5 line-clamp-2 lg:line-clamp-3 break-words">{item.subtitle}</p>
                            <p className="text-[#3F275680]">
                              {item.author_name} -
                              {new Date(item.published_at).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </SwiperSlide>
                  ))
                : dataNews.map((item: any, index: any) => (
                    <Link key={index} href={`/blog/${item.slug}`}>
                      <div className="grid grid-cols-2 md:grid-cols-[40%_auto] gap-3 md:gap-5 mb-3">
                        <div key={index} className="min-h-[110px] max-h-[110px]  md:min-h-[150px] md:max-h-[150px] w-full">
                          <div className="relative w-full h-full">
                            {isLoading ? (
                              <div className="relative w-full h-full flex justify-center items-center">
                                <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                              </div>
                            ) : (
                              <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.image}`} alt="Baner" fill className="object-cover rounded-lg" />
                            )}
                          </div>
                        </div>
                        <div className="bg-transparent dark:bg-white p-1 rounded-none dark:rounded-lg">
                          <p className="text-[#696868]  text-xs">
                            {item.author_name} -
                            {new Date(item.published_at).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                          <h1 className="text-blackJF line-clamp-2 break-words text-base md:text-2xl mb-1">{item.title}</h1>
                          <div className="text-[#696868] line-clamp-2 text-xs md:text-base break-words">{item.subtitle}</div>
                        </div>
                      </div>
                    </Link>
                  ))}
            </Swiper>
            <Link
              href={`/news${pathname === '/' || pathname === null || pathname === '' || pathname === '/library' ? '' : `/?id=${id}`}`}
              className={`${pathname === '/' || pathname === null || pathname === '' || path === undefined || path === null ? 'flex justify-end' : 'hidden'}`}
            >
              <p className="text-blackJ dark:text-white text-xl flex justify-end font-bold px-5 lg:px-0 cursor-pointer hover:mr-4 duration-300">See more &#62;&#62;</p>
            </Link>
          </>
        ) : (
          <div className="text-center mx-auto">
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Hightlight;
