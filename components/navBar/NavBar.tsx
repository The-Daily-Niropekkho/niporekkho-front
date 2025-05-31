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

const NavBar = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery(
    { sortBy: "position,position_update_at", sortOrder: "asc", limit: 500 },
    { skip: false },
  );
  console.log(data);
  const [isSticky, setIsSticky] = useState(false);
  const firstNavbarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Assume the content section is the first element after the navbar
      const contentSection = document.querySelector("main") || document.body; // Adjust selector as needed
      if (contentSection && firstNavbarRef.current) {
        const navbarHeight = firstNavbarRef.current.offsetHeight;
        const sectionHeight = contentSection.offsetTop + navbarHeight; // Top of content + navbar height
        setIsSticky(window.scrollY > sectionHeight); // Sticky after section is out of view
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const { theme, setTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const { data, isLoading } = useContext(WebSettingContext);
  const [activeMenu, setActiveMenu] = useState<string | undefined>("");
  const logo =
    "https://www.dailyniropekkho.com/_next/image?url=https%3A%2F%2Fadmin.dailyniropekkho.com%2Fstorage%2Fapplication%2F1734496289logo.png&w=256&q=75";
  const router = useRouter();


  const handleSearchItem = (e: any) => {
    e.preventDefault();
    const searchQuery = `/search?search_slug=${searchText}`;
    router.replace(searchQuery);
    setShowSearch(false);
  };

  /**
   * Handle the visibility of the sidebar.
   *
   * This function toggles the visibility state of the sidebar. When called,
   * it flips the value of `showSidebar`, showing the sidebar if it's hidden,
   * or hiding it if it's visible.
   */
  const handleSidebar = () => {
    //chng: Log sidebar state for debugging
    console.log("Sidebar toggled, new state:", !showSidebar);
    setShowSidebar(!showSidebar);
  };
  /**
   * Toggle the application theme between dark and light modes.
   *
   * This function checks the current theme state and switches it between "dark"
   * and "light" modes. If the theme is currently set to "dark" or "system", it
   * changes it to "light". If it's set to "light", it changes it to "dark".
   */
  const handleTheme = () => {
    // Toggle the theme between "dark" and "light" based on the current theme state
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  // set the theme to the current theme
  useEffect(() => setEnabled(true), []);

  if (!enabled) return null;

  return (
    <Fragment>
      <header
        ref={firstNavbarRef}
        className=' border-b-[1px] border-[var(--border-color)] dark:border-[var(--border-dark)] top-0 z-10 bg-[var(--bg)] dark:bg-[#191c20] hidden md:block'
      >
        <div className='container py-0 mx-auto'>
          <div className='flex items-center'>
            <AnimatePresence>
              {isSticky && !isLoading && (
                <motion.div
                  className=''
                  initial={{ y: -100, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  // exit={{ y: -200, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
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
                    /> */}
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Nav item here */}
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

            <div className='flex items-center justify-center print:hidden'>
              {/* <div className='p-3 last:pr-0 hidden md:block'>
                <button
                  className='flex '
                  aria-label='theme'
                  onClick={handleTheme}
                >
                  {theme === "light" ? (
                    <div className='text-black'>
                      <MoonIcon />
                    </div>
                  ) : (
                    <div className='text-white'>
                      <SunIcon />
                    </div>
                  )}
                </button>
              </div> */}

              <button
                className='ml-4 p-2 last:pr-0'
                aria-label='search'
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <XIcon clss='' /> : <SearchIcon clss='' />}
              </button>
              <button
                className='p-2 last:pr-0 lg:hidden md:block'
                type='button'
                aria-label='menu'
                onClick={handleSidebar}
              >
                <MenuIcon />
              </button>
            </div>
          </div>
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
                  <Image
                    src={"/images/logo.png"}
                    alt='Daily Niropekkho'
                    width={180}
                    height={100}
                    loading='lazy'
                  />
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
                <div className='flex items-center justify-center print:hidden'>
                  <button
                    className='ml-2 p-2 last:pr-0'
                    aria-label='search'
                    onClick={() => setShowSearch(!showSearch)}
                  >
                    {showSearch ? <XIcon clss='' /> : <SearchIcon clss='' />}
                  </button>
                  <button
                    className='p-2 last:pr-0 lg:hidden md:block'
                    type='button'
                    aria-label='menu'
                    onClick={handleSidebar}
                  >
                    <MenuIcon />
                  </button>
                </div>
              </div>
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
