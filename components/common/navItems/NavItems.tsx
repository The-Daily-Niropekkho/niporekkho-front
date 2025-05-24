
import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useState, useEffect } from "react";

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
}

interface NavItemsProps {
  data?: Category[];
  isLoading: boolean;
  error: any;
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}
const NavItems = ({
  data,
  isLoading,
  error,
  activeMenu,
  setActiveMenu,
}: NavItemsProps) => {
  // keep menuData in sync with incoming data
  const [menuData, setMenuData] = useState<Category[]>([]);

  useEffect(() => {
    if (data) setMenuData(data);
  }, [data]);

  if (isLoading || !menuData.length) {
    return (
      <ul className='lg:flex items-center gap-5 hidden'>
        {/* render your loading skeleton here if you like */}
      </ul>
    );
  }

  if (error) {
    return (
      <ul className='lg:flex items-center gap-5 hidden'>
        <li className='text-red-500'>Error loading categories</li>
      </ul>
    );
  }

  return (
    <ul className='lg:flex items-center gap-5 hidden'>
      {menuData.slice(0, 9).map((item) => (
        <li key={item.title}>
          <Link
            href={`/${item.slug}`}
            className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
          >
            {item.title}
          </Link>
        </li>
      ))}
      <li className='group relative text-black dark:text-white'>
        <div className='flex items-center gap-1 py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'>
          <p className='flex items-center gap-1'>
            অন্যান্য
            <FaChevronDown className='group-hover:rotate-180 transition-transform duration-200' />
          </p>
        </div>

        {/* Mega Menu */}
        <div
          className='absolute left-0 z-50 w-screen bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0'
          style={{
            width: "100vw",
            left: "50%",
            transform: "translateX(-90%)",
            maxWidth: "1200px",
          }}
        >
          <div className='grid grid-cols-5 gap-10 p-6 md:p-6'>
            {/* Column 1 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(9, 14).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(14, 18).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(18, 22).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(22, 26).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(26, 31).map((item) => (
                  <li key={item.title}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NavItems;