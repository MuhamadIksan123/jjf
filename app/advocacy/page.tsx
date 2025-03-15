'use client';
import Image from 'next/image';
import React from 'react';

function Page() {
  return (
    <div className="bg-[#E8E9ED] dark:bg-blackJ">
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-profile.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">ADVOCACY & POLICY</h1>
          </div>
        </div>
      </div>
      <div className="container w-full flex justify-center py-10 px-5 lg:px-0">
        <div className="w-full md:w-1/2 h-[500px] flex flex-col lg:flex-row dark:border-[1px] dark:border-white">
          <div className="relative w-full lg:w-[75%] h-full overflow-hidden">
            <Image fill alt=" background advocacy" src={'/img/home/advocacy.svg'} className="object-cover w-full h-full z-0" />
            <div className="w-full h-full z-10 p-5">
              <h1 className="font-black text-black dark:text-white text-4xl">22 Years</h1>
              <p className="text-[#D1B06B] text-sm md:text-base">of Experience and Success</p>
              <p className="text-black dark:text-white break-words text-xs md:text-sm overflow-wrap-anywhere">
                After the financial crisis and political transition in 1998, rapid changes in banking, bankruptcy, capital markets and foreign investment regulations are continuously occurred and new reforms in Company and Commercial laws.
                AALF in respect of the aforementioned issues, always deeply understand the laws, the people and the cultures of Indonesia and most importantly has been loyally committed to its clients despite the prevailing social,
                political and economic conditions and uncertainties in the future.Starting from merely two lawyers, over a period of more than one and half decades AALF has grown and developed into an institution that is trusted by the
                public and the legal community at the regional level in Indonesia, especially Jakarta. There are currently around 50 lawyers from various legal education backgrounds graduating from leading universities in Indonesia, mostly
                from the Faculty of Law, University of Indonesia.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-[25%] bg-blackJ text-white break-words text-xs lg:text-sm overflow-hidden h-[150px] lg:h-full">
            <p className="m-5">
              vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa
              qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem. Nam libero tempore, cum soluta.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full bg-blackJ py-4 md:py-10 dark:border-y-4 dark:border-white">
        <div className="relative w-[50px] md:w-[80px] aspect-square mx-auto ">
          <Image className="object-contain " src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
        </div>
      </div>
      <div className="container px-5 lg:px-0 h-[300px] py-10 md:py-20 flex w-full">
        <div className="md:block hidden relative w-[20%] aspect-square md:w-[130px]  md:h-[130px]">
          <Image src={'/img/home/logo-advocacy.svg'} alt="logo advocacy" fill className="object-contain" />
        </div>
        <div className="md:hidden block w-[30%] ">
          <div className="relative w-full h-[50%]">
            <Image src={'/img/home/advocacy-mobile1.svg'} alt="logo advocacy" fill className="object-contain mb-5" />
          </div>
          <div className="relative w-full  h-[50%]">
            <Image src={'/img/home/advocacy-mobile2.svg'} alt="logo advocacy" fill className="object-contain" />
          </div>
        </div>
        <div className="h-[40%] bg-black dark:bg-white w-[2px] block mx-5"></div>
        <div className="w-[80%] md:w-full flex flex-col md:flex-row gap-10 px-0 md:px-10 max-h-full">
          <div className="w-full md:w-1/2 text-black dark:text-white break-words text-xs md:text-base">
            Our main goal is to serve our client by providing legal services with a holistic perspective from the corporate side including financial and taxation issues. Therefore, we always strive to provide comprehensive solution in order
            to protect the interests of our clients, as optimal as possible, especially if the problem intersects with many aspects.
          </div>
          <div className="w-full md:w-1/2 text-black dark:text-white break-words text-xs md:text-base">
            Finance and taxation are two fields that cannot be separated from legal issues. In order to answer these challenges and to be able to serve clients more optimally, there is also a division that will specifically provide services
            to resolve these problems.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
