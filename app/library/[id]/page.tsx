'use client';
import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import HTMLFlipBook from 'react-pageflip';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const Page = () => {
  const { id } = useParams() as { id: string };
  const [image, setImage] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const flipBookRef = useRef<any>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;

      let bookWidth, bookHeight;

      if (width < 640) {
        bookWidth = 240;
        bookHeight = 340;
      } else if (width < 768) {
        bookWidth = 150;
        bookHeight = 450;
      } else if (width < 1024) {
        bookWidth = 400;
        bookHeight = 560;
      } else {
        bookWidth = 500;
        bookHeight = 680;
      }

      setDimensions({ width: bookWidth, height: bookHeight });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const fetchNews = async () => {
      const api = `/api/library/library-detail?path=` + id;
      try {
        const response = await axios.get(api);
        setImage(JSON.parse(response.data.data.images));
      } catch {}
    };
    fetchNews();
  }, []);

  const imageLibrary = image.map((path: any, index: any) => ({
    id: index + 1,
    url: path,
  }));

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  useEffect(() => {
    if (image.length > 0) {
      setTotalPages(image.length);
    }
  }, [image]);

  const onPage = (e: any) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="h-full overflow-hidden">
      <div className="w-full h-[80px] bg-blackJ text-white flex justify-between items-center px-5">
        <Link href={'/'} className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] ml-5">
          <Image className="object-contain" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
        </Link>
        <p className="text-center">{`Page ${currentPage + 1} of ${totalPages - 1}`}</p>
        <Link href="/library" className="cursor-pointer mr-5">
          Back to Library
        </Link>
      </div>
      <div className="flex justify-between w-full h-screen">
        <button onClick={handlePrevPage} className="flex items-center justify-center h-full z-[9999]">
          <Image src={'/img/icon/arrow-left.svg'} alt="arrow-left" width={50} height={50} />
        </button>
        <div className="flex justify-center items-center h-screen w-full z-0 mt-5 mb-20">
          <HTMLFlipBook
            width={dimensions.width}
            height={dimensions.height}
            maxHeight={dimensions.height}
            maxWidth={dimensions.width}
            minWidth={dimensions.width * 0.5}
            minHeight={dimensions.height * 0.5}
            className=""
            style={{}}
            startPage={0}
            size="fixed"
            drawShadow={true}
            flippingTime={1000}
            usePortrait={true}
            startZIndex={0}
            autoSize={true}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={30}
            showPageCorners={true}
            disableFlipByClick={false}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            ref={flipBookRef}
            onFlip={onPage}
          >
            {imageLibrary?.map((item: any, index: number) => (
              <div key={index} className=" demoPage relative w-full h-full">
                <img key={index} src={`${process.env.NEXT_PUBLIC_BE}storage/${item.url}`} alt={`Page ${index + 1}`} />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
        <button onClick={handleNextPage} className="flex items-center justify-center h-full  z-[9999]">
          <Image src={'/img/icon/arrow-right.svg'} alt="arrow-right" width={50} height={50} />
        </button>
      </div>
    </div>
  );
};

export default Page;
