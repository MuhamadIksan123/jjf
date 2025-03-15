'use client';
import Image from 'next/image';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import Link from 'next/link';

function BannerNews({ id }: any) {
  const [dataNews, setNews] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (id !== null || id === undefined) {
      const fetchNews = async () => {
        setIsLoading(true);
        const api = `/api/news?path=` + id;
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
        const api = '/api/news/news-default';
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

  return (
    <div className="container">
      <div className="flex flex-col lg:grid grid-cols-[60%_auto] gap-5">
        <div className="relative h-[318px] md:h-[559px] w-full ">
          <Link href={`/blog/${dataNews[0]?.slug}`}>
            <div className="absolute h-full w-full z-0">
              {isLoading ? (
                <div className="relative w-full h-full flex justify-center items-center">
                  <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                </div>
              ) : (
                <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${dataNews ? dataNews[0]?.image : ''}`} alt="image banner" fill className="object-cover rounded-lg" />
              )}
            </div>
            <div className="relative  h-full w-full z-10 py-3 md:py-[30px] px-3 md:px-[35px] flex flex-col justify-between">
              <p className="border-2 border-white w-fit rounded-md md:rounded-lg text-white px-2 py-0.5 md:px-5 md:py-2 font-medium font-lg  text-[10px] md:text-base">{dataNews ? dataNews[0]?.category_name : ''}</p>
              <div className="w-full">
                <p className="md:text-lg text-white text-xs">
                  {' '}
                  {dataNews
                    ? new Date(dataNews[0]?.published_at).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })
                    : 'Nothing availible data'}
                </p>
                <p className="w-[80%] md:max-w-[70%] text-white line-clamp-3 break-words font-extrabold md:font-[1000] text-2xl md:text-6xl">{dataNews ? dataNews[0]?.title : 'Nothing availible data'}</p>
              </div>
            </div>
          </Link>
        </div>
        <div className="py-[13px] w-full px-0 md:px-5">
          <h1 className="text-blackJF dark:text-white text-3xl mb-1 capitalize">Trending News {id}</h1>
          <div className="grid grid-rows-3 gap-5">
            {dataNews
              ?.filter((_: any, index: any) => index !== 0)
              .slice(1, 4)
              .map((item: any, index: number) => (
                <Link key={index} href={`/blog/${item.slug}`}>
                  <div className="grid grid-cols-2 md:grid-cols-[40%_auto] gap-3 md:gap-5">
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
                      <h1 className="text-blackJF line-clamp-2 break-words text-base md:text-2xl">{item.title}</h1>
                      <div className="text-[#696868] line-clamp-2 text-xs md:text-base break-words">{parse(item.content)}</div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerNews;
