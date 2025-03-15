'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

function Page() {
  const [dataProfile, setDataProfile] = useState<any>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const api = '/api/profiles';
      try {
        const response = await axios.get(api);

        setDataProfile(response.data.data[0]);
      } catch {}
    };
    fetchProfile();
  }, []);

  return (
    <>
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-profile.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">PROFILE JAKARTA JUSTICE FORUM</h1>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container flex flex-col lg:flex-row w-full py-[40px] md:py-[80px] px-5 lg:px-0 justify-center items-center">
          <div className="relative w-[60%] md:w-[35%] aspect-square">
            <Image src={`/img/logo/logo.svg`} alt="Baner" fill className="object-contain block dark:hidden p-10" />
            <Image className="object-contain hidden dark:block p-10" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
          </div>
          <div className="w-full lg:w-[60%] text-blackJ dark:text-white text-sm lg:text-3xl text-center md:text-start">{dataProfile.profile ? parse(dataProfile?.profile) : ''}</div>
        </div>
      </div>
      <div className="w-full py-10 lg:py-[80px] bg-blackJ dark:bg-white text-white dark:text-blackJ text- lg:text-3xl">
        <div className="container text-center w-full px-5 lg:px-0">
          vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem. Nam libero tempore, cum soluta.
        </div>
      </div>
      <div className="w-full">
        <div className="container flex flex-col md:flex-row w-full pt-10 md:pt-[80px] justify-center items-center">
          <div className="relative w-[70%] md:w-1/2 lg:w-[25%] aspect-square mr-0 md:mr-10">
            <Image src={`/img/home/profile-2.svg`} alt="Baner" fill className="object-contain rounded-3xl md:rounded-none" />
          </div>
          <div className="w-full md:w-1/2 lg:w-[75%] text-blackJ dark:text-white text-base lg:text-3xl py-10 px-5 lg:px-0 text-center md:text-start">
            The other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are
            bound to ensue and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a
            free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.
          </div>
        </div>
        <div className="container flex flex-col md:flex-row w-full py-10 md:pt-[80px] justify-center items-center">
          <div className="relative w-[70%] md:w-1/2 lg:w-[25%] aspect-square mr-0 md:mr-10">
            <Image src={`/img/home/profile-3.svg`} alt="Baner" fill className="object-contain rounded-3xl md:rounded-none" />
          </div>
          <div className="w-full md:w-1/2  lg:w-[75%] text-blackJ dark:text-white text-base lg:text-3xl py-10 px-5 lg:px-0 md:text-start text-center">
            The other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are
            bound to ensue and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a
            free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
