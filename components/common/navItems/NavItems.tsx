import Link from "next/link";
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
  className?: string;
}

const NavItems = ({
  data,
  isLoading,
  error,
  activeMenu,
  setActiveMenu,
  className,
}: NavItemsProps) => {
  const [menuData, setMenuData] = useState<Category[]>([]);

  useEffect(() => {
    if (data) setMenuData(data);
  }, [data]);

  if (isLoading || !menuData.length) {
    return (
      <ul className='lg:flex items-center gap-5 hidden'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <li key={item} className='py-[11px] px-5 text-md'>
            <div className='h-5 w-20 bg-gray-200 rounded-md animate-pulse'></div>
          </li>
        ))}
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
    <>
      <ul className='lg:flex items-center gap-5 hidden'>
        {menuData.slice(0, 12).map((item) => (
          <li key={item.title}>
            <Link
              href={`/category/${item.slug}?id=${item.id}`}
              className={`whitespace-nowrap py-[11px] px-3 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2 ${className}`}
            >
              {item.title}
            </Link>
          </li>
        ))}
        <li className='group relative text-black dark:text-white'>
          <div className='flex items-center gap-1 py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'>
            <p className={`flex items-center gap-2 ${className}`}>
              অন্যান্য
              <div
                className='scroll-prompt'
                scroll-prompt=''
                ng-show='showPrompt'
                style='opacity: 1;'
              >
                <div className='scroll-prompt-arrow-container'>
                  <div className='scroll-prompt-arrow'>
                    <div></div>
                  </div>
                  <div className='scroll-prompt-arrow'>
                    <div></div>
                  </div>
                </div>
              </div>
            </p>
          </div>

          {/* Mega Menu */}
          <div
            className='absolute left-0 z-50 w-screen bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700 rounded-b-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0'
            style={{
              width: "100vw",
              left: "80%",
              transform: "translateX(-90%)",
              maxWidth: "1200px",
            }}
          >
            <div className='grid grid-cols-4 gap-10 p-6 md:p-6'>
              {/* Column 1 */}
              <div>
                <ul className='space-y-2'>
                  {menuData.slice(12, 17).map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/category/${item.slug}?id=${item.id}`}
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
                  {menuData.slice(17, 21).map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/category/${item.slug}?id=${item.id}`}
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
                  {menuData.slice(21, 25).map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/category/${item.slug}?id=${item.id}`}
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
                  {menuData.slice(25, 29).map((item) => (
                    <li key={item.title}>
                      <Link
                        href={`/category/${item.slug}?id=${item.id}`}
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

      <style jsx>{`
        .scroll-arrow {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          width: 16px;
          height: 24px;
          margin-left: 4px;
          animation: bounce 1.5s infinite ease-in-out;
        }

        .scroll-arrow .arrow {
          width: 12px;
          height: 12px;
          border-right: 3px solid #bebebe;
          border-bottom: 3px solid #bebebe;
          transform: rotate(45deg);
          animation: fade 1.5s infinite ease-in-out;
        }

        .scroll-arrow .arrow:last-child {
          margin-top: -6px;
          animation-direction: reverse;
        }

        @keyframes fade {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }

        @keyframes bounce {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
          100% {
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default NavItems;
