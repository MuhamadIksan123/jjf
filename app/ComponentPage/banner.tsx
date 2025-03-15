import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import parse from 'html-react-parser';

function Banner() {
  const [dataHero, setDataHero] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHero = async () => {
      setIsLoading(true);
      const api = '/api/hero';
      try {
        const response = await axios.get(api);

        const data = response.data.data[0];
        setDataHero(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchHero();
  }, []);

  return (
    <div className="relative h-[360px] md:h-[762px]">
      <div className="absolute w-full h-[360px] md:h-[762px] z-0 overflow-hidden">
        {isLoading ? (
          <div className="relative w-full h-full flex justify-center items-center">
            <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
          </div>
        ) : (
          <Image src={`/img/home/hero.png`} alt="Baner" fill className="object-cover lg:object-contain brightness-[85%]" priority />
        )}
      </div>
      <div className="relative z-10 container h-full">
        <div className="h-full flex flex-col justify-center items-start space-y-[23px] lg:w-1/2 md:w-[80%] px-5">
          <div className="text:3xl md:text-6xl text-white !bg-transparent">
            <h1>{parse(dataHero?.title ? dataHero?.title : '')}</h1>
            {/* <h1 className="text-white">We are global champions</h1>
            <span className="text-orangeJ"> for legal justice</span> */}
          </div>
          <div className="text-white text-sm md:text-2xl !bg-transparent">{parse(dataHero?.subtitle ? dataHero?.subtitle : '')}</div>
          {/* <div className="text-white text-sm md:text-2xl !bg-transparent">Committed to defending human rights, fighting for the rule of law, and providing access to justice for all, without discrimination.</div> */}
          <button className="bg-orangeJ text-white text-xs md:text-2xl px-4 pb-1 rounded-lg text-center flex items-center">
            <span>Learn more</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
