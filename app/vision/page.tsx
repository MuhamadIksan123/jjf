'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
function Page() {
  const [dataVision, setDataVision] = useState<any>([]);

  useEffect(() => {
    const fetchVision = async () => {
      const api = '/api/vision';
      try {
        const response = await axios.get(api);

        setDataVision(response.data.data[0]);
      } catch {}
    };
    fetchVision();
  }, []);

  return (
    <>
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-vision.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">VISION & MISSION</h1>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#EAECEC] dark:bg-blackJ">
        <div className="container py-10  lg:py-[80px]">
          <h1 className="text-black dark:text-white text-3xl md:text-8xl font-[1000] text-center w-full pb-5  lg:pb-10">Vision</h1>
          <div className="text-blackJ dark:text-white text-base lg:text-3xl text-center px-5 lg:px-0">{dataVision.visi ? parse(dataVision?.visi) : ''}</div>
        </div>
      </div>
      <div className="w-full bg-blackJ py-5 md:py-10 dark:border-y-4 dark:border-white">
        <div className="relative w-[50px] md:w-[80px] aspect-square mx-auto ">
          <Image className="object-contain " src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
        </div>
      </div>
      <div className="w-full bg-[#EAECEC] dark:bg-blackJ">
        <div className="container py-10  lg:py-[80px]">
          <h1 className="text-black dark:text-white text-3xl md:text-8xl font-[1000] text-center w-full pb-5  lg:pb-10">Mission</h1>
          <div className="text-blackJ dark:text-white text-base lg:text-3xl px-5 lg:px-0">{dataVision.misi ? parse(dataVision?.misi) : ''}</div>
        </div>
      </div>
    </>
  );
}

export default Page;
