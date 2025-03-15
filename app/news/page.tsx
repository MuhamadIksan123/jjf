'use client';
import React, { useEffect, useState, Suspense } from 'react';
import BannerNews from '../ComponentPage/bannerNews';
import Hightlight from '../ComponentPage/highlight';
// import Artikel from '../ComponentPage/artikel';
// import Blog from '../ComponentPage/blog';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';

function PageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [dataCategory, setDataCategory] = useState<any>([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const api = '/api/category';
      try {
        const response = await axios.get(api);
        setDataCategory(response.data.data.data);
      } catch {}
    };
    fetchCategory();
  }, []);

  return (
    <div>
      <div className="relative h-[400px] mb-10 md:block hidden">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-news.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent uppercase">{id === null ? 'NEWS AND STORIES' : id}</h1>
          </div>
        </div>
      </div>
      <div className="px-5">
        {id === null || id === undefined ? (
          dataCategory?.map((item: any, index: any) => (
            <div key={index}>
              <section>
                <BannerNews id={item.slug} />
              </section>
              <section className="mt-10">
                <Hightlight id={item.slug} />
              </section>
            </div>
          ))
        ) : (
          <div>
            <section>
              <BannerNews id={id} />
            </section>
            <section className="mt-10">
              <Hightlight path={id} />
            </section>
          </div>
        )}
        {/* <section>
              <BannerNews id={id} />
            </section>
            <section className="mt-10">
              <Hightlight id={id} />
            </section> */}
        {/* <section className="mb-10">
          <Artikel />
        </section>
        <section>
          <Blog />
        </section> */}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
