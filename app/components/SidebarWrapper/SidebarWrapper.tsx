/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../Sidebar/sidebar';
import { useSidebar } from '../SidebarProvider/sidebarProvider';
import { usePathname } from 'next/navigation';
import axios from 'axios';
// import Menu from '../icons/menu';

const SidebarWrapper = ({ children }: { children: React.ReactNode }) => {
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //     setOpenMenu(null);
  //   }
  // };

  const handleMenuEnter = (index: number) => {
    if (nav[index].submenu.length > 0) {
      setOpenMenu(index);
    }
  };

  // Handle mouse leave for menu items
  const handleMenuLeave = () => {
    setOpenMenu(null);
  };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);

  const [dataSocialmedia, setDataSocialmedia] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fecthSocialmedia = async () => {
      setIsLoading(true);
      const api = '/api/social-media';
      try {
        const response = await axios.get(api);

        const data = response.data.data;
        setDataSocialmedia(data);
        setIsLoading(false);
      } catch {
        setIsLoading(false);
      }
    };
    fecthSocialmedia();
  }, []);

  const socialMedia = [
    {
      icon: 'facebook',
      link: 'https://www.facebook.com',
    },
    {
      icon: 'x',
      link: 'https://www.x.com',
    },
    {
      icon: 'instagram',
      link: 'https://www.instagram.com',
    },
    {
      icon: 'youtube',
      link: 'https://www.youtube.com',
    },
  ];

  const nav = [
    {
      name: 'Who we are',
      link: '',
      image: 1,
      submenu: [
        { name: 'About us', link: '/about' },
        { name: 'Team', link: '/team' },
        { name: 'History', link: '/history' },
      ],
      submenuRange: [0, 4],
    },
    {
      name: 'What we do',
      link: '',
      image: 2,
      submenu: [
        { name: 'Projects', link: '/projects' },
        { name: 'Services', link: '/services' },
        { name: 'Partnerships', link: '/partnerships' },
      ],
      submenuRange: [4, 8],
    },
    {
      name: 'News and stories',
      link: '/news',
      image: 3,
      submenu: [
        { name: 'Blog', link: '/blog' },
        { name: 'Press', link: '/press' },
        { name: 'Events', link: '/events' },
      ],
      submenuRange: [8, 12],
    },
    {
      name: 'Digital library',
      link: '',
      image: 0,
      submenu: [
        { name: 'Blog', link: '/blog' },
        { name: 'Press', link: '/press' },
        { name: 'Events', link: '/events' },
      ],
      submenuRange: [12, 16],
    },
  ];

  const subMenu1 = [
    { name: 'Profile Jakarta Justice Forum', link: '/profile' },
    { name: 'Vision & Mission', link: '/vision' },
    { name: 'Leadership Team', link: '/team-lead' },
    { name: 'Contact', link: '/contact' },
    { name: 'Advocacy & Policy', link: '/advocacy' },
    { name: 'Legal Aid', link: '/legal-aid' },
    { name: 'Partnership Program', link: '/' },
    { name: 'Latest News', link: '/' },
    { name: 'Articles & Opinions', link: '/news' },
    { name: 'Reports & Research', link: '/' },
    { name: 'Press Release', link: '/' },
    { name: 'Download Documents', link: '/' },
    { name: 'Educational Videos', link: '/edu-video' },
    { name: 'Infographics', link: '/' },
    { name: 'Publications', link: '/library' },
  ];

  // const handleMenuClick = (index: number) => {
  //   if (nav[index].submenu.length > 0) {
  //     setOpenMenu(openMenu === index ? null : index);
  //   }
  // };

  const showFooterNav =
    pathname === '/' ||
    pathname.includes('/blog') ||
    pathname === '/library' ||
    pathname === '/news' ||
    pathname.includes('/story') ||
    pathname === '/profile' ||
    pathname === '/vision' ||
    pathname === '/contact' ||
    pathname === '/team-lead' ||
    pathname === '/advocacy' ||
    pathname === '/legal-aid' ||
    pathname === '/edu-video';

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

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

  const library = pathname.startsWith('/library/') || pathname.includes('/library?');

  return (
    <div className={` bg-white dark:bg-blackJ min-h-screen`}>
      <div className={`${showFooterNav ? 'block' : 'hidden'} w-full`}>
        <div className="bg-blackJ dark:bg-white w-full h-[50px] items-center md:flex hidden">
          <div className="flex space-x-4 justify-end w-full container">
            {dataSocialmedia.map((item: any) => (
              <Link href={item.link} key={item.icon}>
                <div key={item.icon} className="relative h-[20px] w-[20px]">
                  <Image src={`${item?.icon}`} alt={`icon ${item.name}`} fill className="object-contain" />
                  {/* <Image className="object-contain dark:hidden" src={`/img/icon/${item.icon}.svg`} fill alt={`icon ${item.icon}`} />
                <Image className="object-contain hidden dark:block" src={`/img/icon/${item.icon}-black.svg`} fill alt={`icon ${item.icon} dark`} /> */}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-white dark:bg-blackJ text-blackJ dark:text-white w-full py-3">
          <div className="flex  fixed md:hidden top-0 justify-between w-full px-5 py-2 z-[9999999] bg-blackJ">
            <Link href={'/'} className="relative w-[30px] h-[30px]">
              <Image className="object-contain block" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
            </Link>
            <div className="text-blackJ dark:text-white flex items-center">
              <div onClick={() => setDarkMode(!darkMode)} className="relative max-w-[30px]  h-[30px] min-w-[30px] cursor-pointer mr-5">
                <Image className="object-contain" src={`/img/icon/${darkMode ? 'on' : 'off'}.svg`} fill alt={`icon toogle`} />
              </div>
              <div onClick={toggleSidebar} className="relative w-[30px] h-[30px]">
                <Image src={'/img/icon/menu.svg'} fill alt={'icon menu'} className="object-contain" />
              </div>
            </div>
          </div>
          <div className="container hidden md:grid md:grid-cols-[10%_85%_5%] lg:grid-cols-[20%_60%_20%] px-5 lg:px-0">
            <Link href={'/'} className="relative w-[65px] h-[70px] lg:w-[77px] lg:h-[80px]">
              <Image className="object-contain dark:hidden" src={`/img/logo/logo.svg`} fill alt={`icon logo`} />
              <Image className="object-contain hidden dark:block" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
            </Link>
            <div ref={menuRef} onMouseLeave={handleMenuLeave} className="flex flex-col justify-center items-center">
              <div className="flex items-center justify-center lg:gap-24 gap-6 w-fit">
                {nav.map((item, index) => (
                  <div key={item.name} className="relative cursor-pointer ">
                    <div key={item.name} className="flex items-center space-x-2" onMouseEnter={() => handleMenuEnter(index)}>
                      <p className="font-semibold text-blackJ dark:text-white text-base lg:text-2xl whitespace-nowrap">{item.name}</p>
                      {item.submenu.length > 0 && (
                        <div className="relative h-[24px] w-[24px]">
                          <Image className="object-contain" src={`${darkMode ? '/img/icon/arrow-nav-white' : '/img/icon/arrow-nav'}.svg`} fill alt={`arrow nav`} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {openMenu !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full absolute left-0 right-0 bg-white border-t border-gray-300 shadow-lg z-50 -mt-2"
                    style={{ top: '150px' }}
                    onMouseEnter={() => setOpenMenu(openMenu)}
                    onMouseLeave={handleMenuLeave}
                  >
                    <div className="container  bg-white border-t border-gray-300 z-50 grid md:grid-cols-[10%_85%_5%] lg:grid-cols-[20%_60%_20%] px-5 lg:px-0">
                      <div></div>
                      <div className=" py-4 lg:py-8">
                        <div className="grid grid-cols-4 gap-8 ">
                          <div>
                            <div className={`space-y-4 ml-10 lg:ml-1 ${openMenu === 0 ? 'block' : 'hidden'}`}>
                              {subMenu1.slice(0, 4).map((item) => (
                                <Link key={item.name} href={item.link} className="">
                                  <p className="font-semibold text-blackJ text-base lg:text-xl hover:text-orangeJ transition-colors whitespace-nowrap">{item.name}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className={`space-y-4 ml-5 ${openMenu === 1 ? 'block' : 'hidden'}`}>
                              {subMenu1.slice(4, 8).map((item) => (
                                <Link key={item.name} href={item.link}>
                                  <p className="font-semibold text-blackJ text-base lg:text-xl hover:text-orangeJ transition-colors whitespace-nowrap">{item.name}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className={`space-y-4 ${openMenu === 2 ? 'block' : 'hidden'}`}>
                              {dataCategory.map((item: any) => (
                                <Link key={item.name} href={`/news?id=${item.slug}`}>
                                  <p className="font-semibold text-blackJ text-base lg:text-xl hover:text-orangeJ transition-colors">{item.name}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className={`space-y-4 -ml-10 lg:ml-10 ${openMenu === 3 ? 'block' : 'hidden'}`}>
                              {subMenu1.slice(12, 16).map((item) => (
                                <Link key={item.name} href={item.link}>
                                  <p className="font-semibold text-blackJ text-base lg:text-xl hover:text-orangeJ transition-colors">{item.name}</p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
            <div className={`flex justify-end items-center`}>
              <div onClick={() => setDarkMode(!darkMode)} className="relative max-h-[30px] max-w-[30px]  min-h-[30px] min-w-[30px]  lg:max-h-[50px] lg:max-w-[50px]  lg:min-h-[50px] lg:min-w-[50px] cursor-pointer mr-5">
                <Image className="object-contain" src={`/img/icon/${darkMode ? 'on' : 'off'}.svg`} fill alt={`icon toogle`} />
              </div>
              <div className="relative max-h-[10px] max-w-[10px]  min-h-[10px] min-w-[10px]  lg:max-h-[20px] lg:max-w-[20px]  lg:min-h-[20px] lg:min-w-[20px]  ">
                <Image className="object-contain" src={`/img/icon/${darkMode ? 'search-white' : 'search'}.svg`} fill alt={`icon search`} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Sidebar />
      <div className={`${showFooterNav ? 'block' : 'hidden'}   w-full mt-[37px] md:mt-0 px-[55px] block md:hidden`}>
        <div className="relative p-2 border-[#C4C4C4] border-2 rounded-lg w-full">
          <input className="z-0 bg-transparent text-[#C4C4C4] w-full focus:outline-none" placeholder="Search.." />
          <div className="absolute right-2 top-2 z-10">
            {/* <Menu className="w-6 h-6 text-[#C4C4C4]" /> */}
            <div className="relative w-[20px] h-[20px]">
              <Image className="object-contain" src={`/img/icon/search-mobile.svg`} fill alt="Menu" />
            </div>
          </div>
        </div>
      </div>
      <main className={`flex-grow mt-3 md:mt-0 ${library ? 'mt-0' : 'mt-3 md:mt-0'} `}>{children}</main>
      <footer className={`${showFooterNav ? 'block' : 'hidden'} mt-5 w-full border-blackJ dark:border-white border-t-[1px] py-10 px-2 lg:px-0`}>
        <div className="container">
          <div className=" flex flex-col lg:flex-row justify-between w-full mb-5 md:mb-[60px] px-0">
            <div className="w-full lg:w-[75%] grid grid-cols-4 gap-3 mb-5 lg:mb-0">
              {nav.map((item) => (
                <Link key={item.name} href={item.link} className="relative">
                  <div className="">
                    <p className="font-semibold text-blackJ dark:text-white text-[12px] md:text-2xl text-center">{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
            <div className="w-full lg:w-[25%] px-10 md:px-0">
              <div className="w-full relative">
                <input className="w-full border-2 border-[#D9D9D9] rounded-lg placeholder:text-[#D9D9D9] p-2 outline-none px-2" placeholder="  Search..." />
                <div className="absolute right-2 top-2.5 h-[20px] w-[20px]">
                  <Image className="object-contain" src={`/img/icon/search.svg`} fill alt={`icon search`} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col-reverse md:flex-row justify-between w-full px-5 lg:px-0">
            <div className="flex flex-row space-y-2">
              <p className="text-orangeJ text-2xl mr-10 font-semibold flex items-center">Follow :</p>
              <div className="flex space-x-3 items-center">
                {dataSocialmedia.map((item: any) => (
                  <Link href={item.link} key={item.icon}>
                    <div className="relative h-[20px] w-[20px]">
                      {isLoading ? (
                        <div className="relative w-full h-full flex justify-center items-center">
                          <Image src={`/img/icon/loading.svg`} alt="image section 2" width={20} height={20} className="object-contain rotating-icon" />
                        </div>
                      ) : (
                        <Image src={`${item?.icon}`} alt={`icon ${item.name}`} fill className="object-contain" />
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="relative w-[77px] h-[80px] mx-auto  md:mx-0 my-2 md:my-0">
              <Link href={'/'}>
                <Image className="object-contain dark:hidden" src={`/img/logo/logo.svg`} fill alt={`icon logo`} />
                <Image className="object-contain hidden dark:block" src={`/img/logo/logo-dark.svg`} fill alt={`icon dark`} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <div className={`${showFooterNav ? 'block' : 'hidden'} bg-blackJ w-full h-[50px] flex justify-center items-center text-white`}>Copyright &#169; Jakartajusticeforum.org</div>
    </div>
  );
};

export default SidebarWrapper;
