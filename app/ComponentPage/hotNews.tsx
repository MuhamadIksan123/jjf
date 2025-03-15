/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface About {
  image: string;
  about: string;
}

function HotNews() {
  const [dataAbout, setDataAbout] = useState<About | null>(null);
  const [dataAboutItem, setDataAboutItem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      setIsLoading(true);
      const api = '/api/about';
      try {
        const response = await axios.get(api);

        const data = response.data.data[1];
        setDataAboutItem(JSON.parse(data?.about));
        setDataAbout(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const imageLoader = ({ src }: { src: string }) => {
    return `${process.env.NEXT_PUBLIC_BE}${src}`;
  };

  return (
    <div className="container relative mb-10 md:my-10 px-4">
      <div className="grid lg:grid-cols-2  gap-8">
        <div className="relative w-full h-[200px] md:h-[400px] lg:h-[500px] mx-auto md:mx-0">
          {isLoading ? (
            <div className="relative w-full h-full flex justify-center items-center">
              <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
            </div>
          ) : (
            <Image
              loader={imageLoader}
              src={`/storage/${dataAbout?.image}`}
              alt="image section 4"
              fill
              loading="lazy"
              quality={75}
              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,..."
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover  rounded-lg md:rounded-l-lg"
            />
          )}
        </div>
        <div className="flex flex-col justify-center space-y-5 lg:space-y-[68px]">
          <h1 className="text-blackJT dark:text-white font-medium text-2xl md:text-4xl">{dataAboutItem !== null ? dataAboutItem[0].title : ''}</h1>
          <p className="text-grayJ dark:text-white text-base md:text-2xl line-clamp-5 md:line-clamp-12 break-words">{dataAboutItem !== null ? dataAboutItem[0].subtitle : ''}</p>
        </div>
      </div>
      {/* <button className="absolute bottom-0 right-0 bg-orangeJ p-2 md:p-5 rounded-lg lg:-mb-10 mr-10 lg:mr-5 md:mr-0">
        <div className="relative w-[20px] md:w-[40px] h-[20px] md:h-[40px]">
          <Image src={'/img/icon/arrow-button.svg'} alt="arrow button" fill className="object-contain" />
        </div>
      </button> */}
    </div>
  );
}

export default HotNews;
