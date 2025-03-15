import Image from 'next/image';
import React from 'react';

function Page() {
  const contact = [
    {
      title: 'Address',
      subtitle: 'Jakarta, Indonesia',
      icon: '/img/icon/location.svg',
      footer: 'Find us on Google Maps',
    },
    {
      title: 'Phone',
      subtitle: '+6281234567',
      icon: '/img/icon/phone.svg',
      footer: 'Lorem Ipsums',
    },
    {
      title: 'Email',
      subtitle: 'info@loremiosum.com',
      icon: '/img/icon/email.svg',
      footer: 'Lorem Ipsums',
    },
  ];

  return (
    <>
      <div className="md:block hidden relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-contact.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">Contact</h1>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="container flex flex-row  space-x-3 md:space-x-7  justify-center w-full py-[40px] md:py-[80px] px-5 lg:px-0">
          {contact.map((item, index) => (
            <div key={index} className="flex flex-col w-[150px] ">
              <div className="relative w-[60px] aspect-square mx-auto mb-5">
                <Image src={item.icon} alt="icon" fill className="object-contain" />
              </div>
              <div className="text-center text-orangeJ dark:text-white text-sm md:text-xl mb-3">{item.title}</div>
              <div className="text-center text-blackJ dark:text-white text-sm md:text-xl mb-2">{item.subtitle}</div>
              <div className="text-center text-orangeJ text-sm md:text-xl ">{item.footer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full py-10 px-5 lg:px-0">
        <div className="container bg-[#EF9F3F] bg-opacity-10 dark:bg-[#FFE8D6] w-full py-[40px] px-5 md:px-[100px] rounded-2xl">
          <h1 className="text-[#001A57] text-3xl md:text-5xl text-center mb-5">Lorem Ipsumis simply dum</h1>
          <p className="text-black text-center text-base md:text-2xl mb-10">Lorem Ipsumis simply dummy text of the printing and typesetting Lorem Ipsum has been the industry's standard</p>
          <div className="w-full flex space-x-10 mb-5">
            <input type="text" placeholder="Lorem" className="w-[50%] p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xl placeholder:text-black" />
            <input type="text" placeholder="Lorem" className="w-[50%] p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xl placeholder:text-black" />
          </div>
          <div className="w-full flex space-x-10 mb-5">
            <input type="text" placeholder="Lorem" className="w-[50%] p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xl placeholder:text-black" />
            <input type="text" placeholder="Lorem" className="w-[50%] p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xll placeholder:text-black" />
          </div>
          <input type="text" placeholder="Lorem" className="w-full p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xl placeholder:text-black" />
          <input type="text" placeholder="Lorem" className="mt-10 w-full p-2 border-b-[1px] border-black bg-transparent placeholder:text-base md:placeholder:text-2xl placeholder:text-black" />
          <div className="flex justify-center mt-10">
            <button className="bg-[#EF9F3F]  w-fit px-4 py-2 ">Making</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
