'use client';
import Image from 'next/image';

function Page() {
  const lorem = [
    {
      title: 'Lorem Ipsum ',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum ply dummy text ',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum ',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
    {
      title: 'Lorem Ipsum',
      subtitle: 'Lorem Ipsum imply dummy text of',
    },
  ];
  return (
    <>
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-vision.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">LEGAL AID</h1>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[90%] flex flex-col items-center justify-center my-10">
          <div className="w-[80%] flex flex-col items-center space-y-5">
            <h1 className="text-[#001A57] dark:text-blue-200 text-2xl md:text-4xl">Lorem Ipsum is simply dummy text of the printing an</h1>
            <p className="text-black dark:text-white text-sm md:text-xl text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard do text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
            </p>
            <p className="text-black dark:text-white text-xs md:text-base">
              Lorem Ipsum is simply dummy <span className="text-[#001A57] dark:text-blue-200">info@loremipsum.com</span>
            </p>
          </div>
          <div className="text-blackJ text-2xl md:text-4xl my-5 md:my-10">OUR PARTNERS</div>
          <div className="w-full grid grid-cols-3 lg:grid-cols-4 gap-5">
            {lorem.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-[#001A57] dark:text-blue-200 text-center truncate break-words">{item.title}</p>
                <p className="text-black dark:text-white w-full md:w-1/2 text-center">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
