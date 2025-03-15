'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import parse from 'html-react-parser';

function Artikel() {
  const [dataStory, setStory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      const api = '/api/story/story-highlight';
      try {
        const response = await axios.get(api);

        setStory(response.data.data.data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchStory();
  }, []);

  return (
    <div className="container">
      <div className="px-5 lg:px-[60px]">
        <h1 className="text-black dark:text-white text-2xl md:text-4xl font-bold mb-5">Articles & Opinions</h1>
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 w-full">
          <div className="w-full lg::w-[60%] flex flex-col lg:flex-row gap-10">
            {dataStory.slice(0, 2).map((item: any, index: number) => (
              <Link key={index} href={`/story/${item.slug}`}>
                <div className="w-full duration-300 hover:scale-[101%]">
                  <div className="relative w-full">
                    <div className="aspect-square lg:aspect-[16/10]">
                      {isLoading ? (
                        <div className="relative w-full h-full flex justify-center items-center">
                          <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                        </div>
                      ) : (
                        <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.image}`} alt="image" fill className="object-cover rounded-md md:rounded-lg dark:rounded-none" />
                      )}
                    </div>
                  </div>
                  <div className="relative h-[200px] md:h-[255px] lg:h-[210px] bg-transparent dark:bg-white hover:shadow-lg hover:duration-1000 rounded-b-lg px-0 md:px-4">
                    <div className="relative py-4 px-2">
                      <h1 className="text-black text-lg md:text-2xl mb-2  line-clamp-2 break-words">{item.title}</h1>
                      <p className="text-[#383838] text-sm md:text-xl line-clamp-3 break-words">{item.subtitle}</p>
                    </div>
                    <button className="absolute right-2 lg:left-5 bottom-3 border-2 border-orangeJ px-2.5 py-1 text-orangeJ w-fit rounded-[5px] text-sm md:text-xl font-medium transition-all transform hover:scale-105">Read more</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="max-w-full lg:w-[40%]">
            <div className="grid grid-rows-3 gap-5 max-w-full">
              {dataStory.slice(2, 5).map((item: any, index: number) => (
                <Link key={index} href={`/story/${item.slug}`}>
                  <div className="flex space-x-2 duration-300 hover:scale-[101%] max-w-full">
                    <div className="relative w-1/2 lg:w-[35%] aspect-video md:aspect-square">
                      {isLoading ? (
                        <div className="relative w-full h-full flex justify-center items-center">
                          <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                        </div>
                      ) : (
                        <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.image}`} alt="image" fill className="object-cover " />
                      )}
                    </div>
                    <div className="flex flex-col space-y-1 justify-between bg-transparent dark:bg-white p-1 rounded-none dark:rounded-lg w-1/2 lg:w-[60%]">
                      <h1 className="line-clamp-1 md:line-clamp-3 lg:line-clamp-1 break-words text-black text-xs md:text-lg w-[150px] md:w-full">{item.title}</h1>
                      <div className="line-clamp-3 md:line-clamp-[10] lg:line-clamp-3 break-words text-[10px] md:text-sm text-[#383838] w-[150px] md:w-full">{parse(item.content)}</div>
                      <button className="border-[1px] border-orangeJ px-0.5 py-0.5 md:px-2.5 md:py-1 text-orangeJ w-fit rounded-[5px] transition-all transform text-[8px] md:text-base hover:scale-105">Read more</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artikel;
