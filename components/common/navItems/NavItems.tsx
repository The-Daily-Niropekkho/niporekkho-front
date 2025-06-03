import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

// Static JSON data with id, title, and slug
const staticCategories = [
  {
    id: "cmb21n1870003mh98mvl9k85o",
    title: "জাতীয়",
    slug: "national",
  },
  {
    id: "cmb1zrh9r0003mhz4ykuthdrt",
    title: "অর্থনীতি",
    slug: "economy",
  },
  {
    id: "cmaxqech2000bmhaodnsm3yl8",
    title: "রাজনীতি",
    slug: "political",
  },
  {
    id: "cmb21jjgj0005mhfc2lqjtaf0",
    title: "দেশজুড়ে",
    slug: "countryroaming",
  },
  {
    id: "cmb21idgv0003mh2cmm51tw6j",
    title: "আন্তর্জাতিক",
    slug: "international",
  },
  {
    id: "cmb215hs6000fmh5sdably5xf",
    title: "বিশেষ প্রতিবেদন",
    slug: "special-correspondent",
  },
  {
    id: "cmb20jp0s0003mh301r19qr2v",
    title: "আজকের পত্রিকা",
    slug: "today-news-paper",
  },
  {
    id: "cmb6j5ymk0003mhqgko5f8ol7",
    title: "বিনোদন",
    slug: "entertainment",
  },

  {
    id: "cmb21g29o0003mhv06mg8p0eo",
    title: "খেলাধুলা",
    slug: "sports",
  },
  {
    id: "cmb4ox5r3000vmhrct1r6u001",
    title: "সর্বশেষ",
    slug: "latest",
  },

  {
    id: "cmb214emo000bmh5splc0onne",
    title: "ভিডিও",
    slug: "video",
  },
  {
    id: "cmb2171fw0003mhdkl0j789k2",
    title: "শিক্ষা",
    slug: "education",
  },
  {
    id: "cmb219x46000bmhdkuu8z59cw",
    title: "আইন-আদালত",
    slug: "court-law",
  },
  {
    id: "cmb21c4fd0003mhu0q9xat4eq",
    title: "কৃষি সংবাদ",
    slug: "agriculture",
  },
  {
    id: "cmb218pdu0007mhdkoer7a3qx",
    title: "প্রবাস বাংলা",
    slug: "expatriate-bengali",
  },
  {
    id: "cmb21b2ac000fmhdky8zasqj8",
    title: "প্রযুক্তি",
    slug: "technology",
  },
  {
    id: "cmb21d1wg0007mhu0bi2jacsa",
    title: "লাইফস্টাইল",
    slug: "lifestyle",
  },
  {
    id: "cmb21e0pn000bmhu038qiogpl",
    title: "অন্যরকম",
    slug: "others",
  },
  {
    id: "cmb21eyll0003mh3sfrtly74b",
    title: "অভিমত",
    slug: "opinion",
  },
  {
    id: "cmb4ofw6n000rmhrc9s6uaree",
    title: "চাকরি",
    slug: "job",
  },
  {
    id: "cmb4oio11000tmhrcxlm8upz3",
    title: "ছবি",
    slug: "photo",
  },
  {
    id: "cmb4oyrc1000xmhrcr502d8gb",
    title: "রাজধানী",
    slug: "capital",
  },
  {
    id: "cmb4ozyss000zmhrc8vytjubs",
    title: "শিল্প-বাণিজ্য",
    slug: "industry-trade",
  },
  {
    id: "cmb4p1djh0011mhrcedswbm4h",
    title: "আর্কাইভ",
    slug: "archive",
  },
  {
    id: "cmb4p391e0013mhrcx9k4f6k0",
    title: "বিশেষ আয়োজন",
    slug: "special-ayojon",
  },
  {
    id: "cmb4p48bj0015mhrcu7k1nztc",
    title: "শিল্পমঞ্চ",
    slug: "shilpomoncho",
  },
  {
    id: "cmb4p4wa20017mhrcql3w3v40",
    title: "শেয়ারবাজার",
    slug: "stock-market",
  },
  {
    id: "cmb4p6d2y0019mhrc2zq6cms8",
    title: "সাক্ষাৎকার",
    slug: "interview",
  },
  {
    id: "cmb4p75bc001bmhrc6skd1glz",
    title: "ভ্রমণ",
    slug: "travel",
  },
  {
    id: "cmb4p9wud001dmhrcx4mwo1ym",
    title: "সাহিত্য ও সংস্কৃতি",
    slug: "sahitto-o-sangskriti",
  },
  {
    id: "cmb4paj3p001fmhrctspx9ry4",
    title: "বাংলাদেশ",
    slug: "bangladesh",
  },
  {
    id: "cmb4u23a10001mhnkzun1d9ap",
    title: "ফিচার",
    slug: "feature",
  },
  {
    id: "cmb4u2qd00003mhnkc79epw1e",
    title: "অফবিট",
    slug: "offbit",
  },
  {
    id: "cmb4u3i2l0005mhnk3gdk1uhl",
    title: "অপরাধ",
    slug: "crime",
  },
];

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
  // No need for useEffect since data is static
  const menuData = staticCategories;

  // if (isLoading || !menuData.length) {
  //   return (
  //     <ul className='lg:flex items-center gap-5 hidden'>
  //       {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
  //         <li key={item} className='py-[11px] px-5 text-md'>
  //           <div className='h-5 w-20 bg-gray-200 rounded-md animate-pulse'></div>
  //         </li>
  //       ))}
  //     </ul>
  //   );
  // }

  // if (error) {
  //   return (
  //     <ul className='lg:flex items-center gap-5 hidden'>
  //       <li className='text-red-500'>Error loading categories</li>
  //     </ul>
  //   );
  // }

  return (
    <>
      <ul className='lg:flex items-center gap-5 hidden'>
        {menuData.slice(0, 13).map((item) => (
          <li key={item.title} className='relative group'>
            <Link
              href={`/category/${item.slug}?id=${item.id}`}
              className={`whitespace-nowrap py-[11px] px-3 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2 ${className}`}
            >
              {item.title}
            </Link>
            {item.slug === "countryroaming" && (
              <ul className='absolute left-0 top-full hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-10 w-48'>
                <li>
                  <Link
                    href='/districtnews'
                    className='block px-4 py-2 text-md text-[var(--dark)] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-500'
                  >
                    জেলার খবর
                  </Link>
                </li>
              </ul>
            )}
          </li>
        ))}
        <li className='group relative text-black dark:text-white'>
          <div className='flex items-center gap-1 py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'>
            <p
              className={`flex items-center gap-1 text-[#b74646] ${className}`}
            >
              অন্যান্য
              <span className='scroll-arrow'>
                <span className='arrow'></span>
                <span className='arrow'></span>
              </span>
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
                        className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300'
                      >
                        <div className='flex items-center gap-2 hover:translate-x-5 transition-transform duration-300'>
                          <MdKeyboardDoubleArrowRight />
                          {item.title}
                        </div>
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
                        className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300'
                      >
                        <div className='flex items-center gap-2 hover:translate-x-5 transition-transform duration-300'>
                          <MdKeyboardDoubleArrowRight />
                          {item.title}
                        </div>
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
                        className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300'
                      >
                        <div className='flex items-center gap-2 hover:translate-x-5 transition-transform duration-300'>
                          <MdKeyboardDoubleArrowRight />
                          {item.title}
                        </div>
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
                        className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-300'
                      >
                        <div className='flex items-center gap-2 hover:translate-x-5 transition-transform duration-300'>
                          <MdKeyboardDoubleArrowRight />
                          {item.title}
                        </div>
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
          width: 12px;
          height: 20px;
          margin-left: 4px;
          animation: bounce 1.2s infinite ease-in-out;
        }

        .scroll-arrow .arrow {
          width: 10px;
          height: 10px;
          border-right: 3px solid #b74646;
          border-bottom: 3px solid #b74646;
          transform: rotate(45deg);
          animation: 1.5s infinite;
        }

        .scroll-arrow .arrow:last-child {
          margin-top: -4px;
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
