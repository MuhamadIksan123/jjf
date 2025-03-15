'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import { usePathname } from 'next/navigation';

function Blog() {
  const pathname = usePathname();
  const [dataStory, setStory] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleStory, setVisibleStory] = useState<any>(4);

  useEffect(() => {
    const fetchStory = async () => {
      setIsLoading(true);
      const api = '/api/story';
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

  const handleSeeMore = () => {
    setVisibleStory(dataStory.length);
  };

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_BE}${src}`;
  };

  return (
    <div className="container px-4">
      <h1 className="text-blackJT dark:text-white font-medium text-2xl md:text-4xl mb-5 md:mb-10">Report & research</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 justify-items-center">
        {dataStory.map((item: any, index: number) => (
          <Link className="hover:shadow-lg shadow-none duration-300 rounded group" key={index} href={`/story/${item.slug}`}>
            <div className="flex flex-row space-x-1 md:space-x-0 lg:flex-col md:h-full lg:h-fit">
              <div className="relative w-[40%] h-[120px] md:h-full md:w-full aspect-square">
                {isLoading ? (
                  <div className="relative w-full h-full flex justify-center items-center">
                    <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
                  </div>
                ) : (
                  <Image
                    loader={imageLoader}
                    src={`/storage/${item?.image}`}
                    fill
                    className="object-cover rounded-[10px] dark:rounded-none w-full h-full"
                    loading="lazy"
                    quality={75}
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,..."
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="image"
                  />
                )}
              </div>
              <div className="relative h-[120px] md:h-full lg:h-[255px] bg-transparent dark:bg-white rounded-lg md:rounded-none rounded-b-0 lg:rounded-b-lg px-4 w-[60%] md:w-full">
                <div className="relative  md:py-4">
                  <h1 className="text-[#183354] md:text-blackJT font-bold text-base md:text-xl nb-1 md:mb-5  line-clamp-1 md:line-clamp-2 break-words">{item.title}</h1>
                  <div className="text-grayJ text-xs md:text-xl line-clamp-3 md:line-clamp-6 lg:line-clamp-3 break-words">{parse(item.content)}</div>
                </div>
                <button className=" absolute bottom-3 right-3 bg-orangeJ p-1.5 md:p-5 rounded-md md:rounded-lg hover:right-5 duration-300 flex justify-center items-center space-x-1">
                  <p className="text-[8px] text-white font-thin block md:hidden">Read More</p>
                  <div className="relative  w-[10px] h-[10px] md:h-[24px] md:w-[24px]">
                    <Image src={'/img/icon/arrow-button.svg'} alt="arrow button" fill className="object-contain" />
                  </div>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href="/news" className={`${pathname !== '/news' ? 'flex justify-end' : 'hidden'}`}>
        <p className="text-blackJ dark:text-white text-xl flex justify-end font-bold px-5 lg:px-0 cursor-pointer my-5">See more &#62;&#62;</p>
      </Link>
      {dataStory.length > 4 && visibleStory < dataStory.length && (
        <p onClick={handleSeeMore} className={`container ${pathname === '/news' ? 'flex justify-end' : 'hidden'} text-blackJ dark:text-white text-xl flex justify-end font-bold my-10 px-5 lg:px-0 cursor-pointer my-5`}>
          See more &#62;&#62;
        </p>
      )}
    </div>
  );
}

export default Blog;
