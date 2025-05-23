"use client";

import ChevronDownIcon from "@/public/icons/ChevronDownIcon";
import MenuIcon from "@/public/icons/MenuIcon";
import MoonIcon from "@/public/icons/MoonIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import SunIcon from "@/public/icons/SunIcon";
import XIcon from "@/public/icons/XIcon";
import fetcher from "@/utils/fetcher";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import useSWR from "swr";

type HandleSidebar = () => void;
type HandleTheme = () => void;

interface SideBarProps {
  handleSidebar: HandleSidebar;
  handleTheme: HandleTheme;
  theme: string;
}

type SubCategory = {
  menu_lavel: string;
  slug: string;
  menu_content_id: number;
};

type CategoryItem = {
  menu_lavel: string;
  slug: string;
  menu_content_id: number;
  categorieslevelone: SubCategory[];
};

type CategoryData = CategoryItem[];

const SideBar = ({ handleSidebar, handleTheme, theme }: SideBarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();


  useEffect(() => {
    // Initial check on mount
    setShowSearch(window.innerWidth <= 768);

    // Handle resize
    const handleResize = () => {
      setShowSearch(window.innerWidth <= 768);
      setIsMobile(window.innerWidth <= 768)
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  const handleSearchItem = (e: any) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Construct the search query URL based on the provided search text
    const searchQuery = `/search?search_slug=${searchText}`;

    // Use the router to navigate the user to the search results page with the constructed query
    router.replace(searchQuery);

    // set the search showing false
    // if (!isMobile) {
    //   setShowSearch(false);

    // }
  };

  const handleLinkClick = (slug: any) => {
    router.push(`/${slug}`);
    setTimeout(handleSidebar, 3000);
  };

  const {
    data,
    error,
    isLoading,
  }: { data: CategoryData; error: any; isLoading: boolean } = useSWR(
    "/sidebar-categories",
    fetcher
  );

  let content;

  if (error) content = <div>There was an Error!</div>;
  if (isLoading) content = <div></div>;
  if (data)
    content = (
      <ul>
        {data.map((itm, i) => {
          const { menu_lavel, menu_content_id, slug, categorieslevelone } = itm;
          return (
            <Fragment key={menu_content_id}>
              {categorieslevelone.length > 0 ? (
                <li className="border-b-[1px] last:border-none">
                  <details className="group [&amp;_summary::-webkit-details-marker]:hidden select-none">
                    <summary className="flex cursor-pointer items-center flex-row justify-between text-gray-900">
                      <Link
                        className="px-2 py-3 text-lg md:text-base block w-[85%] group-open:bg-gray-50 group-open:dark:bg-[#3f3f40] hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                        href={`/${slug}`}
                        onClick={(e) => {
                          e.preventDefault()
                          handleLinkClick(slug)
                        }}
                      >
                        {menu_lavel}
                      </Link>
                      <div className="shrink-0 hover:bg-gray-100 dark:text-white group-open:bg-gray-50 group-open:dark:bg-[#3f3f40] dark:hover:bg-gray-700 w-[15%] justify-center h-full flex items-center py-[14px]">
                        <span className="transition duration-300 group-open:-rotate-180">
                          <ChevronDownIcon />
                        </span>
                      </div>
                    </summary>
                    <div className="flex flex-col group-open:bg-gray-200 dark:group-open:bg-gray-600">
                      {categorieslevelone.map((sitm) => {
                        const { menu_content_id, menu_lavel, slug } = sitm;
                        return (
                          <Link
                            key={menu_content_id}
                            className="flex items-center pl-5 pr-2 py-3 text-lg md:text-base text-gray-900 hover:bg-gray-100 border-t-[1px] dark:text-white dark:hover:bg-gray-700"
                            href={`/${slug}`}
                            onClick={(e) => {
                              e.preventDefault()
                              handleLinkClick(slug)
                            }}
                          >
                            {menu_lavel}
                          </Link>
                        );
                      })}
                    </div>
                  </details>
                </li>
              ) : (
                <li className="border-b-[1px] last:border-none">
                  <Link
                    className="flex items-center px-2 py-3 text-lg md:text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    href={`/${slug}`}
                    onClick={(e) => {
                      e.preventDefault()
                      handleLinkClick(slug)
                    }}
                  >
                    {menu_lavel}
                  </Link>
                </li>
              )}
            </Fragment>
          );
        })}
      </ul>
    );

  return (
    <div className="fixed top-0 h-screen w-screen flex flex-row justify-start z-[2147483647]">
      <div
        className="flex-1 bg-[#cfcfcf6e] cursor-pointer"
        onClick={handleSidebar}></div>
      <div
        className="select-none h-screen bg-white dark:bg-[var(--dark)] shadow-lg flex flex-col fixed top-0 right-0 w-60 md:w-80"
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className="flex justify-between md:justify-end items-center py-1 px-2">
          <div className="hidden p-3 last:pr-0 ">
            <button className="flex" aria-label="theme" onClick={handleTheme}>
              {theme === "light" ? (
                <MoonIcon />
              ) : (
                <SunIcon cls="dark:stroke-white" />
              )}
            </button>
          </div>
          <button
            type="button"
            className="w-10 h-10 text-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={handleSidebar}
          >
            <XIcon />
            <span className="sr-only">বন্ধ করুন</span>
          </button>
          <button
            className="p-2 last:pr-0 hidden"
            aria-label="search"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon clss="" />
          </button>
        </div>

        <div className="flex items-center justify-center print:hidden">
          <div className="p-3 last:pr-0 hidden md:block">
            <button
              className="flex hidden"
              aria-label="theme"
              onClick={handleTheme}
            >
              {theme === "light" ? (
                <div className="text-black">
                  <MoonIcon />
                </div>
              ) : (
                <div className="text-white">
                  <SunIcon />
                </div>
              )}
            </button>
          </div>

          {/* <button
            className="p-2 last:pr-0"
            aria-label="search"
            onClick={() => setShowSearch(!showSearch)}
          >
            <SearchIcon clss="" />
          </button> */}
          <button
            className="p-2 last:pr-0 hidden"
            type="button"
            aria-label="menu"
            onClick={handleSidebar}
          >
            <MenuIcon />
          </button>
        </div>

        {showSearch && (
          <div className="border-tz border-[var(--primary)] sticky top-[7px] z-50   shadow-[0px_1px_2px_rgba(0,0,0,0.2)]">
            <div className="container mx-auto p-3">
              <form className="flex items-center" onSubmit={handleSearchItem}>
                <input
                  type="text"
                  className="w-full py-3 px-4 text-[var(--dark)] dark:text-white focus:outline-none focus:bottom-0 rounded-l border"
                  placeholder="Search....."
                  onChange={(e: any) => setSearchText(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-3 text-white bg-[var(--primary)]"
                >
                  <SearchIcon clss="stroke-white" />
                </button>
                {/* <button
                  type="button"
                  className="hidden border-l px-6 py-3 text-white bg-[var(--primary)] rounded-r"
                  onClick={() => setShowSearch(false)}
                >
                  <XIcon clss="w-6 h-6" />
                </button> */}
              </form>
            </div>
          </div>
        )}

        <div className="mx-2 py-4 overflow-y-auto sidebar-scrollbar-none">
          {content}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
