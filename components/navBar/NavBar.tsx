"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import MenuIcon from "@/public/icons/MenuIcon";
import MoonIcon from "@/public/icons/MoonIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import SunIcon from "@/public/icons/SunIcon";
import XIcon from "@/public/icons/XIcon";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import NavItems from "../common/navItems/NavItems";
import SideBar from "../sideBar/SideBar";
import bdtask from "../../public/images/Bdtask-Logo-blk.png";
import bdtask_dark from "../../public/images/Bdtask-Logo-white.png";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useSearchNewsQuery } from "@/redux/features/news/newsApi"; // Updated import
import SearchBar from "./Searchbar";

const NavBar = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery(
    { sortBy: "position,position_update_at", sortOrder: "asc", limit: 500 },
    { skip: false },
  );
  const [isSticky, setIsSticky] = useState(false);
  const firstNavbarRef = useRef<HTMLElement>(null);
  const [activeMenu, setActiveMenu] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const contentSection = document.querySelector("main") || document.body;
      if (contentSection && firstNavbarRef.current) {
        const navbarHeight = firstNavbarRef.current.offsetHeight;
        const sectionHeight = contentSection.offsetTop + navbarHeight;
        setIsSticky(window.scrollY > sectionHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { theme, setTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [showSearch, setShowSearch] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const logo =
    "https://www.dailyniropekkho.com/_next/image?url=https%3A%2F%2Fadmin.dailyniropekkho.com%2Fstorage%2Fapplication%2F1734496289logo.png&w=256&q=75";
  const router = useRouter();

  // Fetch search results
  const { data: searchData, isFetching } = useSearchNewsQuery(
    { keyword: searchText, offset: 0 },
    {
      skip: showSearch || searchText.trim() === "",
    }
  );

  useEffect(() => {
    if (searchData && searchData.data) {
      setSearchResults(searchData.data);
    }
  }, [searchData]);

  const handleSearchItem = (e: any) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.replace(`/search?search_slug=${encodeURIComponent(searchText)}`);
      setShowSearch(true);
    }
  };

  const handleSidebar = () => {
    console.log("Sidebar toggled, new state:", !showSidebar);
    setShowSidebar(!showSidebar);
  };

  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  useEffect(() => setEnabled(true), []);

  // if (!enabled) return null;


  return (
    <Fragment>
      <header
        ref={firstNavbarRef}
        className='border-b-[1px] border-[var(--border-color)] dark:border-[var(--border-dark)] top-0 z-10 bg-[var(--bg)] dark:bg-[#191c20] hidden md:block'
      >
        <div className='container py-0 mx-auto'>
          <div className='flex items-center justify-between'>
            <AnimatePresence>
              {isSticky && !isLoading && (
                <motion.div
                  className=''
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    href='/'
                    aria-label='logo'
                    onClick={() => setActiveMenu("")}
                  >
                    <Image
                      src={logo}
                      alt='Daily Niropekkho'
                      width={180}
                      height={100}
                    />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            <NavItems
              data={data?.data?.map((cat: any) => ({
                ...cat,
                image_id: cat.image_id === null ? undefined : cat.image_id,
              }))}
              isLoading={isLoading}
              error={error}
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu || ""}
            />

            <div className='flex items-center justify-between print:hidden'>
              <p className='py-[11px] px-5 text-md'>
                <SearchBar
                  showSearch={showSearch}
                  setShowSearch={setShowSearch}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  handleSearchItem={handleSearchItem}
                />
              </p>
            </div>
          </div>

          {/* Search Results Display */}
          {/* {showSearch && searchResults.length > 0 && (
            <motion.div
              className='absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-lg z-20'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ul className='py-2'>
                {searchResults.map((news) => (
                  <li
                    key={news.id}
                    className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                  >
                    <Link
                      href={`/news/${news.slug || news.id}`}
                      className='text-[var(--dark)] dark:text-white line-clamp-1'
                      onClick={() => setShowSearch(false)}
                    >
                      {news.headline || news.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )} */}
        </div>
      </header>

      <AnimatePresence>
        {isSticky && (
          <motion.header
            className='fixed top-0 left-0 right-0 z-10 bg-[var(--bg)] dark:bg-[#191c20] shadow-[0px_1px_2px_rgba(0,0,0,0.2)] hidden md:block'
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className='container py-0 mx-auto'>
              <div className='flex items-center gap-4'>
                <Link
                  href='/'
                  aria-label='logo'
                  onClick={() => setActiveMenu("")}
                >
                  {/* <Image
                    src={logo}
                    alt='Daily Niropekkho'
                    width={180}
                    height={100}
                    loading='lazy'
                  /> */}
                </Link>
                <NavItems
                  data={data?.data?.map((cat: any) => ({
                    ...cat,
                    image_id: cat.image_id === null ? undefined : cat.image_id,
                  }))}
                  isLoading={isLoading}
                  error={error}
                  setActiveMenu={setActiveMenu}
                  activeMenu={activeMenu || ""}
                  className='text-base'
                />
                <div className='flex items-center justify-between print:hidden'>
                  <p className='py-[11px] text-md'>
                    <SearchBar
                      showSearch={showSearch}
                      setShowSearch={setShowSearch}
                      searchText={searchText}
                      setSearchText={setSearchText}
                      handleSearchItem={handleSearchItem}
                    />
                  </p>
                </div>
              </div>

              {/* Search Results Display (Sticky Header)
              {showSearch && searchResults.length > 0 && (
                <motion.div
                  className='absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-lg z-20'
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <ul className='py-2'>
                    {searchResults.map((news) => (
                      <li
                        key={news.id}
                        className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800'
                      >
                        <Link
                          href={`/news/${news.slug || news.id}`}
                          className='text-[var(--dark)] dark:text-white line-clamp-1'
                          onClick={() => setShowSearch(false)}
                        >
                          {news.headline || news.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )} */}
            </div>
          </motion.header>
        )}
      </AnimatePresence>
      {showSidebar && (
        <SideBar
          handleSidebar={handleSidebar}
          handleTheme={handleTheme}
          theme={`${theme}`}
          categories={data?.data?.map((cat: any) => ({
            ...cat,
            image_id: cat.image_id === null ? undefined : cat.image_id,
          }))}
          isLoading={isLoading}
          error={error}
        />
      )}
    </Fragment>
  );
};

export default NavBar;
