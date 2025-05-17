import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";
import fetcher from "@/utils/fetcher";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import useSWR from "swr";

interface MenuContent {
  menu_content_id: number;
  content_type: string;
  content_id: number;
  menu_position: number;
  menu_lavel: string;
  link_url: string | null;
  slug: string;
  parents_id: number;
  menu_id: number;
  status: number;
  menu_name: string;
  menu_style: string | null;
}

const NavItems = ({
  activeMenu,
  setActiveMenu,
}: {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}) => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    "/category-list",
    fetcher,
    );
  
  const { theme } = useTheme();

  if (error) return <div className='hidden lg:block'>Error loading data</div>;
  if (isLoading) return <NavbarSkeleton theme={theme} />;

  return (
    <nav className='flex-nowrap overflow-x-auto lg:flex-wrap hidden lg:block'>
      <div className='flex flex-wrap items-center lg:justify-center'>
        <ul className='flex whitespace-nowrap lg:overflow-hidden gap3'>
          {data?.slice(0, 10)?.map((category: MenuContent) => {
            const { menu_content_id, slug, menu_lavel } = category;
            return (
              <li
                key={menu_content_id}
                className='text-black  dark:text-white border-r-2 '
              >
                <Link
                  className='flex items-center gap-1 py-[11px] px-5  text-md text-[var(--dark)] dark:text-white hover:font-bold capitalize'
                  href={`/${slug?.toLowerCase()}`}
                  onClick={() => setActiveMenu(menu_lavel.toLowerCase())}
                >
                  <div
                    className={`font-bold ${
                      activeMenu == menu_lavel.toLocaleLowerCase()
                        ? " border-b-2 border-black dark:border-white"
                        : ""
                    }`}
                  >
                    {menu_lavel.toLowerCase()}
                  </div>
                </Link>
              </li>
            );
          })}
          <div className='group relative flex gap-6 whitespace-nowrap lg:overflow-hidden items-center px-3 text-md text-[var(--dark)] dark:text-white font-bold capitalize'>
            <p className='flex items-center gap-1'>
              অন্যান্য
              <FaChevronDown className='group-hover:rotate-180 transition-transform duration-200' />
            </p>
            <div className='absolute hidden group-hover:block bg-white dark:bg-[#1A202C] shadow-md rounded-md p-2 top-full mt-2 right-0'>
              {data?.slice(10, data.length)?.map((category: MenuContent) => {
                const { menu_content_id, slug, menu_lavel } = category;
                return (
                  <Link
                    key={menu_content_id}
                    className='flex items-center gap-1 py-1 px-3 text-md text-[var(--dark)] dark:text-white hover:font-bold capitalize'
                    href={`/${slug?.toLowerCase()}`}
                    onClick={() => setActiveMenu(menu_lavel.toLowerCase())}
                  >
                    {menu_lavel.toLowerCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default NavItems;
