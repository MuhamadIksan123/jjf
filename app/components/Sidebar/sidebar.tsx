'use client';
import { useSidebar } from '@/app/components/SidebarProvider/sidebarProvider';
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';

export default function Sidebar() {
  const { isOpen, setIsOpen } = useSidebar();
  const currentPath = usePathname();
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [dataCategory, setDataCategory] = useState<any>([]);

  const toggleSubmenu = (menuName: any, e: any) => {
    e.stopPropagation();
    setExpandedMenu((prev) => (prev === menuName ? null : menuName));
  };
  const handleLinkClick = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

  const handleSubmenuLinkClick = () => {
    setIsOpen(false);
    setExpandedMenu(null);
  };

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

  const categories = dataCategory.map((item: any) => ({
    name: item.name,
    link: 'news/?id=' + item.slug,
  }));

  const menuItems = [
    {
      name: 'Who we are',
      icon: 'lucide:users',
      link: '',
      subItems: [
        { name: 'Profile Jakarta Justice Forum', link: '/profile' },
        { name: 'Vision & Mission', link: '/vision' },
        { name: 'Leadership Team', link: '/team-lead' },
        { name: 'Contact', link: '/contact' },
      ],
    },
    {
      name: 'What we do',
      icon: 'lucide:briefcase',
      link: '',
      subItems: [
        { name: 'Advocacy & Policy', link: '/advocacy' },
        { name: 'Legal Aid', link: '/legal-aid' },
        { name: 'Partnership Program', link: '' },
        { name: 'Latest News', link: '' },
      ],
    },
    {
      name: 'News and stories',
      icon: 'lucide:newspaper',
      link: '',
      subItems: categories,
    },
    {
      name: 'Digital library',
      icon: 'lucide:book-open',
      link: '/library',
      subItems: [
        { name: 'Educational Videos', link: '/edu-video' },
        { name: 'Infographics', link: '' },
        { name: 'Publications', link: '/library' },
      ],
    },
  ];

  const library = currentPath.startsWith('/library/') || currentPath.includes('/library?');

  return (
    <div>
      <div className={`min-h-screen fixed md:hidden top-10 right-0 bg-white z-50 ease-in-out duration-300 transform w-full ${isOpen ? 'translate-y-0' : '-translate-y-full'} ${library ? 'hidden' : ''} `}>
        <div className={`p-4 ease-in-out duration-300 ${isOpen ? 'w-full lg:w-[190px]' : ''}`}>
          <ul className="flex flex-col justify-end space-y-2 items-start">
            {menuItems.map((item, index) => {
              const isActive = currentPath.includes(item.link);
              const isExpanded = expandedMenu === item.name;
              return (
                <React.Fragment key={`menu-item-${index}`}>
                  <li className={`${isOpen ? 'w-full' : 'hidden lg:block'} ease-in-out duration-300 text-blackJ`} key={`menu-item-${index}-${item.name}`}>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center justify-between cursor-pointer py-2" onClick={(e) => toggleSubmenu(item.name, e)}>
                        <Link href={item.link} onClick={handleLinkClick} className="flex-grow flex items-center space-x-2">
                          <div className={`${isActive && !isOpen ? 'shadow-md shadow-orangeJ rounded-lg hidden lg:block' : ''} p-2`}></div>
                          {isOpen && <span className={`text-sm font-semibold transition-sidebar ${isOpen ? 'visible' : ''}`}>{item.name}</span>}
                        </Link>
                        {isOpen && item.subItems && (
                          <button className="text-gray-500 p-1">
                            <span>
                              {isExpanded ? (
                                <div className="relative h-[24px] w-[24px]">
                                  <Image className="object-contain" src={`/img/icon/arrow-nav.svg`} fill alt={`arrow nav`} />
                                </div>
                              ) : (
                                <div className="relative h-[24px] w-[24px]">
                                  <Image className="object-contain" src={`/img/icon/arrow-nav.svg`} fill alt={`arrow nav`} />
                                </div>
                              )}
                            </span>
                          </button>
                        )}
                      </div>

                      {isOpen && isExpanded && item.subItems && (
                        <ul className="pl-6 space-y-2 mt-1 mb-2">
                          {item.subItems.map((subItem: any, subIndex: any) => {
                            const isSubActive = currentPath === subItem.link;
                            return (
                              <li className={`${isSubActive ? 'text-orangeJ' : 'text-blackJ'} ease-in-out duration-300`} key={`submenu-item-${subIndex}-${subItem.name}`}>
                                <Link href={subItem.link} onClick={handleSubmenuLinkClick} className="flex items-center space-x-2">
                                  <span className="text-sm">{subItem.name}</span>
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
