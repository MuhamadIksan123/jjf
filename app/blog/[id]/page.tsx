'use client';
import Blog from '@/app/ComponentPage/blog';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import parse from 'html-react-parser';
// import Video from '@/app/ComponentPage/video';

function Page() {
  const { id } = useParams() as { id: string };
  const [dataDetail, setDetail] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      setIsLoading(true);
      const api = `/api/news/news-detail?path=` + id;
      try {
        const response = await axios.get(api);

        setDetail(response.data.data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, []);

  return (
    <div className="container">
      <div className="flex flex-col space-y-5 md:space-y-10 mb-10 px-5 lg:px-0">
        <h1 className="text-blackJ dark:text-white text-3xl md:text-6xl font-medium  w-[90%] md:w-[70%]">{dataDetail?.title}</h1>
        <div className="relative aspect-video">
          {isLoading ? (
            <div className="relative w-full h-full flex justify-center items-center">
              <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-contain rotating-icon" />
            </div>
          ) : (
            <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${dataDetail?.image}`} alt="Baner" fill className="object-cover" />
          )}
        </div>
        <div className="text-brownJ dark:text-white  !text-base md:!text-[28px]">{dataDetail?.content ? parse(dataDetail?.content) : ''}</div>
        {/* <Video />
        <p className="text-brownJ text-base md:text-[28px]">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
          ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,
          adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea
          commodi conse qua ur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur. Sed ut perspiciatis unde omnis iste natus
          error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
          aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
          tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi conse quatur? Quis autem vel eum iure
          reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
        </p> */}
      </div>
      <Blog />
    </div>
  );
}

export default Page;
