'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';
import Blog from '../ComponentPage/blog';
import Image from 'next/image';

function Page() {
  const [dataVideo, setVideo] = useState<any>([]);
  const [visibleVideos, setVisibleVideos] = useState<any>(5);
  useEffect(() => {
    const fetchVideo = async () => {
      const api = '/api/videos';
      try {
        const response = await axios.get(api);

        setVideo(response.data.data);
      } catch {}
    };
    fetchVideo();
  }, []);

  const handleSeeMore = () => {
    setVisibleVideos(dataVideo.length);
  };

  return (
    <div className="">
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-publikasi.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">EDUCATIONAL VIDEOS</h1>
          </div>
        </div>
      </div>
      <div className="px-6 lg:px-0 mb-5">
        <div className="container ">
          <div className="w-full  flex flex-col justify-center items-center">
            <h1 className="text-black dark:text-white text-2xl md:text-4xl lg::text-7xl mb-5 font-bold">{dataVideo[0]?.title}</h1>
            <div className="relative w-full md:w-[90%] h-[300px] md:h-[536px]">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${getYouTubeID(dataVideo[0]?.link)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="container grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-10">
          {dataVideo?.slice(1, visibleVideos).map((item: any, index: any) => {
            return (
              <div key={index} className="container mt-5 lg:mt-10">
                <div className="w-full  flex flex-col justify-center items-center">
                  <div className="min-h-[70px] max-h-[70px] md:min-h-[100px] md:max-h-[100px] mb-0 md:mb-5">
                    <h1 className="text-black dark:text-white text-2xl md:text-3xl lg::text-4xl  line-clamp-2 break-words font-bold">{item.title}</h1>
                  </div>
                  <div className="relative w-full h-[300px] lg:h-[536px]">
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${getYouTubeID(item.link)}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {dataVideo.length > 5 && visibleVideos < dataVideo.length && (
          <p onClick={handleSeeMore} className="container text-blackJ dark:text-white text-xl flex justify-end font-bold my-10 px-5 lg:px-0 cursor-pointer">
            See more &#62;&#62;
          </p>
        )}
      </div>

      {/* <section className="mb-20">
        <HotNews />
      </section> */}
      <Blog />
    </div>
  );
}

export default Page;
