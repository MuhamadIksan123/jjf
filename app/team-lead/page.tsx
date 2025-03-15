'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';

function Page() {
  const [showPopup, setShowPopup] = useState(false);
  interface Profile {
    name: string;
    photo: string;
    jabatan: string;
    about: string;
  }

  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);

  const profile = [
    {
      name: 'cyntia',
      image: 'profile',
      postion: 'Pendiri',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Doni',
      image: 'profile',
      postion: 'Direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Raka',
      image: 'profile',
      postion: 'Asisten',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Adit',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Kira',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Alex',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'robert',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Silvia',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
    {
      name: 'Radit',
      image: 'profile',
      postion: 'direktur',
      description:
        "AALF Legal & Tax Consultant is a team of lawyers and consultants who provide legal and tax services to clients in diverse sectors and industries. As a partner, I lead the team and specialize in corporate and commercial law, litigation, land law, and criminal law. With over 16 years of experience in the legal field, I have successfully completed numerous contract dispute cases, handled large corporate litigation cases in Indonesia, and advised clients on complex transactional issues. I have a strong academic background, holding a PhD in Land Law, a Master's degree in Notary, and a Law degree from the University of Indonesia. I am licensed as an advocate at every level of court in the Indonesian jurisdiction. My mission is to deliver high-quality legal solutions that meet the needs and expectations of my clients.",
    },
  ];

  const [dataLead, setDataLead] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLead = async () => {
      setIsLoading(true);
      const api = '/api/leader';
      try {
        const response = await axios.get(api);

        const data = response.data.data;
        setDataLead(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fetchLead();
  }, []);

  const openPopup = (profile: any) => {
    setSelectedProfile(profile);
    setShowPopup(true);
  };

  // Function to close popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedProfile(null);
  };

  useEffect(() => {
    if (showPopup) {
      // Prevent scrolling on the body when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when popup is closed
      document.body.style.overflow = 'auto';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showPopup]);

  return (
    <>
      <div className="hidden md:block relative h-[400px]">
        <div className="absolute w-full  h-[400px] z-0">
          <Image src={`/img/home/hero-team.svg`} alt="Baner" fill className="object-cover" />
        </div>
        <div className="relative z-10 container h-full w-full">
          <div className=" h-full flex flex-col justify-center items-center space-y-[23px]  w-full">
            <h1 className=" text-center font-[1000] text-5xl md:text-8xl text-white !bg-transparent ">LEADERSHIP TEAM</h1>
          </div>
        </div>
      </div>
      <div className="w-full  dark:bg-blackJ">
        <div className="container px-5 lg:px-0">
          <div className="flex flex-col items-center mt-10">
            <div className="relative w-[70px] h-[70px] mb-5 md:mb-10">
              <Image className="object-contain dark:hidden" src={`/img/logo/logo.svg`} fill alt={`icon logo`} />
              <Image className="object-contain hidden dark:block" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
            </div>
            <h1 className="text-black dark:text-white text-4xl md:text-5xl mb-3">JAKARTA JUSTICE FORUM</h1>
            <p className="text-[#68696B] dark:text-white text-sm md:text-xl text-center w-full md:w-1/2 ">
              Lorem Ipsumis simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a
              type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-5">
            {dataLead?.map((item: any, index: any) => {
              const columnPosition = index % 3;

              let marginClass = '';

              if (columnPosition === 1) {
                if (Math.floor(index / 3) % 2 === 0) {
                  marginClass = 'lg:pb-[100px]';
                } else {
                  marginClass = 'lg:pt-[100px]';
                }
              }
              return (
                <div key={index} className={`place-items-center flex flex-col justify-center ${marginClass} h-[500px] md:h-[600px]`}>
                  <div className="w-1/2">
                    <div className="relative w-full h-[220px] md:h-[280px] mb-3 md:mb-5">
                      {isLoading ? (
                        <div className="relative w-full h-full flex justify-center items-center">
                          <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-cover z-10 rotating-icon" />
                        </div>
                      ) : (
                        <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${item?.photo}`} alt="Baner" fill className="object-cover z-10" />
                      )}
                      <div className={`kanan absolute h-[70%] w-[50px] right-0 bottom-5 -mr-5 md:-mr-10 bg-[#D9D9D9] z-0 ${index % 2 === 0 ? 'block' : 'hidden'}`}> </div>

                      <div className={`kiri absolute h-[70%] w-[50px] left-0 bottom-5 -ml-5 md:-ml-10 bg-[#D9D9D9] z-0 ${index % 2 === 1 ? 'block' : 'hidden'}`}> </div>
                    </div>
                    <div className="w-full flex flex-col space-y-1 md:space-y-2">
                      <div className="text-[#68696B] dark:text-white text-base lg:text-2xl">{item.title}</div>
                      <div className="text-[#68696B] whitespace-nowrap dark:text-white text-xl md:text-2xl  lg:text-4xl font-bold">{item.jabatan}</div>
                      <button
                        className="hidden md:block text-[#68696B] dark:text-white border-[#68696B] dark:border-white border-2 p-1 w-fit hover:bg-gray-100 transition-colors text-sm md:text-base cursor-pointer"
                        onClick={() => openPopup(item)}
                      >
                        Read more
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showPopup && selectedProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-blackJ rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              {/* <div>
                <h2 className="text-3xl font-bold capitalize text-gray-800 dark:text-white">{selectedProfile.name}</h2>
                <p className="text-xl text-gray-600 dark:text-gray-300 capitalize">{selectedProfile.postion}</p>
              </div> */}
              {/* <button onClick={closePopup} className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl">
                &times;
              </button> */}
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <div className="relative w-full h-[280px]">
                  {isLoading ? (
                    <div className="relative w-full h-full flex justify-center items-center">
                      <Image src={`/img/icon/loading.svg`} alt="image section 2" width={50} height={50} className="object-cover z-10 rotating-icon" />
                    </div>
                  ) : (
                    <Image src={`${process.env.NEXT_PUBLIC_BE}storage/${selectedProfile?.photo}`} alt="Baner" fill className="object-cover rounded-lg" />
                  )}
                </div>
              </div>

              <div className="md:w-2/3">
                <h3 className="text-3xl font-semibold mb-3 text-blackJ dark:text-white">{selectedProfile?.jabatan}</h3>
                <div className="text-gray-600 dark:text-gray-300 leading-relaxed">{parse(selectedProfile?.about)}</div>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button onClick={closePopup} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Page;
