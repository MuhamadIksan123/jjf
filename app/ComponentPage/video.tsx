'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getYouTubeID from 'get-youtube-id';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Video() {
  const pathname = usePathname();
  const [dataVideo, setVideo] = useState<any>('');
  useEffect(() => {
    const fetchVideo = async () => {
      const api = '/api/videos';
      try {
        const response = await axios.get(api);

        setVideo(response.data.data[0].link);
      } catch {}
    };
    fetchVideo();
  }, []);

  return (
    <div className="container my-10 lg:w-[70%] px-4">
      <div className="w-full flex justify-center">
        <div className="relative w-full h-[300px] md:h-[536px]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${getYouTubeID(dataVideo)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <Link href="/edu-video" className={`${pathname !== '/news' ? 'flex justify-end' : 'hidden'}`}>
        <p className="text-blackJ dark:text-white text-xl flex justify-end font-bold px-5 lg:px-0 cursor-pointer my-5 hover:mr-4 duration-300">See more &#62;&#62;</p>
      </Link>
    </div>
  );
}

export default Video;
