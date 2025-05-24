"use client";

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import ChevronDownIcon from "@/public/icons/ChevronDownIcon";
import MenuIcon from "@/public/icons/MenuIcon";
import MoonIcon from "@/public/icons/MoonIcon";
import SearchIcon from "@/public/icons/SearchIcon";
import SunIcon from "@/public/icons/SunIcon";
import XIcon from "@/public/icons/XIcon";
import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  title: string;
  slug: string;
  position: number;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  created_by_id: string;
  image_id?: string;
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  news: any[];
  // chng: Added for potential subcategories
  subcategories?: { id: string; title: string; slug: string }[];
}

interface SideBarProps {
  handleSidebar: () => void;
  handleTheme: () => void;
  theme: string;
  categories?: Category[];
  isLoading: boolean;
  error: any;
}

const SideBar = ({
  handleSidebar,
  handleTheme,
  theme,
  categories,
  isLoading,
  error,
}: SideBarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  //chng: Handle responsive search visibility
  useEffect(() => {
    const handleResize = () => {
      setShowSearch(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  //chng: Debug categories
  console.log("SideBar - Categories:", categories);

  const handleSearchItem = (e: any) => {
    e.preventDefault();
    const searchQuery = `/search?search_slug=${searchText}`;
    router.replace(searchQuery);
    setShowSearch(false);
    handleSidebar(); //chng: Close sidebar after search
  };

  const handleLinkClick = (slug: string) => {
    router.push(`/category/${slug}`);
    handleSidebar(); //chng: Close sidebar after navigation
  };

  let content;

  if (isLoading) {
    content = <NavbarSkeleton theme={theme} />;
  } else if (error) {
    content = (
      <div className='text-red-500 px-2 py-3'>Error loading categories</div>
    );
  } else if (!categories || categories.length === 0) {
    content = (
      <div className='text-gray-500 px-2 py-3'>No categories available</div>
    );
  } else {
    content = (
      <ul>
        {categories.map((category) => (
          <li key={category.id} className='border-b-[1px] last:border-none'>
            {/* chng: Added collapsible structure for potential subcategories */}
            {category.subcategories && category.subcategories.length > 0 ? (
              <details className='group [&_summary::-webkit-details-marker]:hidden select-none'>
                <summary className='flex cursor-pointer items-center flex-row justify-between text-gray-900'>
                  <Link
                    className='px-2 py-3 text-lg md:text-base block w-[85%] group-open:bg-gray-50 group-open:dark:bg-[#3f3f40] hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                    href={`/category/${category.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(category.slug);
                    }}
                    aria-label={category.title}
                  >
                    {category.title}
                  </Link>
                  <div className='shrink-0 hover:bg-gray-100 dark:text-white group-open:bg-gray-50 group-open:dark:bg-[#3f3f40] dark:hover:bg-gray-700 w-[15%] justify-center h-full flex items-center py-[14px]'>
                    <span className='transition duration-300 group-open:-rotate-180'>
                      <ChevronDownIcon />
                    </span>
                  </div>
                </summary>
                <div className='flex flex-col group-open:bg-gray-200 dark:group-open:bg-gray-600'>
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.id}
                      className='flex items-center pl-5 pr-2 py-3 text-lg md:text-base text-gray-900 hover:bg-gray-100 border-t-[1px] dark:text-white dark:hover:bg-gray-700'
                      href={`/category/${subcategory.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleLinkClick(subcategory.slug);
                      }}
                      aria-label={subcategory.title}
                    >
                      {subcategory.title}
                    </Link>
                  ))}
                </div>
              </details>
            ) : (
              <Link
                className='flex items-center px-2 py-3 text-lg md:text-base text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                href={`/category/${category.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(category.slug);
                }}
                aria-label={category.title}
              >
                {category.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    //chng: Adopted design from second SideBar with high z-index
    <div className='fixed top-0 h-screen w-screen flex flex-row justify-start z-[2147483647]'>
      <div
        className='flex-1 bg-[#cfcfcf6e] cursor-pointer'
        onClick={handleSidebar}
      ></div>
      <div
        className='select-none h-screen bg-white dark:bg-[var(--dark)] shadow-lg flex flex-col fixed top-0 right-0 w-60 md:w-80'
        style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
      >
        <div className='flex justify-between md:justify-end items-center py-1 px-2'>
          <button
            type='button'
            className='w-10 h-10 text-center text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={handleSidebar}
            aria-label='Close Sidebar'
          >
            <XIcon />
            <span className='sr-only'>বন্ধ করুন</span>
          </button>
        </div>

        {/* chng: Added search bar from second SideBar */}
        {showSearch && (
          <div className='border-t border-[var(--primary)] sticky top-[7px] z-50 shadow-[0px_1px_2px_rgba(0,0,0,0.2)]'>
            <div className='container mx-auto p-3'>
              <form className='flex items-center' onSubmit={handleSearchItem}>
                <input
                  type='text'
                  className='w-full py-3 px-4 text-[var(--dark)] dark:text-white focus:outline-none focus:bottom-0 rounded-l border'
                  placeholder='Search.....'
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <button
                  type='submit'
                  className='px-6 py-3 text-white bg-[var(--primary)] rounded-r'
                >
                  <SearchIcon clss='stroke-white' />
                </button>
              </form>
            </div>
          </div>
        )}

        <div className='mx-2 py-4 overflow-y-auto sidebar-scrollbar-none'>
          {content}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
