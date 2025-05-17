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
import { Fragment, useContext, useEffect, useState } from "react";
import NavItems from "../common/navItems/NavItems";
import SideBar from "../sideBar/SideBar";
import bdtask from "../../public/images/Bdtask-Logo-blk.png";
import bdtask_dark from "../../public/images/Bdtask-Logo-white.png";
import NavbarSkeleton from "../skeleton/NavbarSkeleton";
import { FaChevronDown } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NavBar = () => {
  const { theme, setTheme } = useTheme();
  const [showSidebar, setShowSidebar] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { data, isLoading } = useContext(WebSettingContext);
  const [activeMenu, setActiveMenu] = useState<string | undefined>("");
  const logo = data?.logo;
  const router = useRouter();

  /**
   * Handle search form submission and navigate to search results.
   *
   * This function is an event handler used for processing search form submissions.
   * It prevents the default form submission behavior, constructs a search query URL
   * based on the provided search text, and navigates the user to the search results
   * page with the constructed query. This function is typically associated with search
   * input fields and is triggered when the user submits a search query.
   *
   * @param {Event} e - The event object representing the form submission.
   */
  const handleSearchItem = (e: any) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Construct the search query URL based on the provided search text
    const searchQuery = `/search?search_slug=${searchText}`;

    // Use the router to navigate the user to the search results page with the constructed query
    router.replace(searchQuery);

    // set the search showing false
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
    // Toggle the value of `showSidebar` to show or hide the sidebar
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
      <header className='sticky top-0 z-10 bg-[var(--bg)] dark:bg-[#191c20] shadow-[0px_1px_2px_rgba(0,0,0,0.2)] hidden md:block'>
        <div className='container px-4 py-0 mx-auto'>
          <div className='flex items-center justify-between'>
            {/* <div className="">
              {!isLoading ? (
                <Link
                  href="/"
                  aria-label="logo"
                  onClick={() => setActiveMenu("")}
                >
                  {theme === "light" ? (
                    <Image src={logo} alt="logo" width={180} height={100} />
                  ) : (
                    <Image src={logo} alt="logo" width={180} height={100} />
                  )}
                </Link>
              ) : (
                ""
              )}
            </div> */}

            {/* Nav item here */}
            <NavItems
              setActiveMenu={setActiveMenu}
              activeMenu={activeMenu || ""}
            />

            <div className='flex items-center justify-center print:hidden'>
              <div className='p-3 last:pr-0 hidden md:block'>
                <button
                  className='flex hidden'
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
              </div>

              <button
                className=' p-2 last:pr-0'
                aria-label='search'
                onClick={() => setShowSearch(!showSearch)}
              >
                {showSearch ? <XIcon clss='' /> : <SearchIcon clss='' />}
              </button>
              <button
                className='p-2 last:pr-0 '
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
        {showSearch && (
          <motion.div
            className='container mx-auto sticky top-0 z-50  '
            initial={{ y: -100, opacity: 0 }} // Start off-screen above
            animate={{ y: 0, opacity: 1 }} // Slide down and fade in
            exit={{ y: -100, opacity: 0 }} // Slide up and fade out on exit
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
          >
            <div className='relative'>
              <motion.form
                className='flex items-center justify-end p-4'
                onSubmit={handleSearchItem}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                <input
                  type='text'
                  className='w-80 py-2 px-4 text-[var(--dark)] dark:text-white focus:outline-none focus:border-[var(--primary)] rounded-l-md border-2 border-gray-300 transition-all duration-300 placeholder-gray-500'
                  placeholder='আপনার অনুসন্ধানের বিষয়টি লিখুন'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type='submit'
                  className='px-4 py-2 bg-[var(--primary)] text-white rounded-r-md hover:bg-opacity-90 transition-all duration-300 flex items-center'
                >
                  <SearchIcon clss='stroke-white' />
                </button>
                
              </motion.form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {showSidebar && (
        <SideBar
          handleSidebar={handleSidebar}
          handleTheme={handleTheme}
          theme={`${theme}`}
        />
      )}
    </Fragment>
  );
};

export default NavBar;
