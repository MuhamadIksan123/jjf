/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';

interface About {
  image: string;
  about: string;
}

interface AboutItem {
  title: string;
  subtitle: string;
}

function Section2() {
  const [dataAbout, setDataAbout] = useState<About | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      setIsLoading(true);
      const api = '/api/about';
      try {
        const response = await axios.get(api);
        const data = response.data.data[0];
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
    <>
      {dataAbout && dataAbout.about ? (
        <div className="container grid lg:grid-cols-2 gap-6 w-full my-10 px-4">
          <>
            <div className="relative w-full lg:h-full h-[300px] mx-auto">
              {isLoading ? (
                <div className="relative w-full h-fit flex justify-center items-center">
                  <Image src={`/img/icon/loading.svg`} alt="image section 2 2" width={50} height={50} className="object-contain rotating-icon" />
                </div>
              ) : (
                <Image
                  loader={imageLoader}
                  src={`/storage/${dataAbout?.image}`}
                  alt="image section 2"
                  fill
                  loading="lazy"
                  quality={75}
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,..."
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-xl"
                />
              )}
            </div>
            {/* <img
            src={`${process.env.NEXT_PUBLIC_BE}storage/${dataAbout?.image}`}
            alt=""
          /> */}
            <div className="text-[#283847] dark:text-white items-center flex flex-col justify-center items-center">
              {dataAbout && dataAbout.about ? (
                JSON.parse(dataAbout.about).map((item: AboutItem, index: number) => (
                  <div key={index} className={`${index === 0 ? 'border-b-[1px] border-[#283847] dark:border-white pb-5' : ''} flex flex-col w-full mb-5`}>
                    <h2 className="text-2xl md:text-4xl font-bold mb-2">{item.title}</h2>
                    <p className="text-sm md:text-xl">{item.subtitle}</p>
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </>
        </div>
      ) : (
        <div className="text-center mx-auto">
          <p>No data available</p>
        </div>
      )}
    </>
  );
}

export default Section2;
