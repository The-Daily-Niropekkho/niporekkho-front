// import NavbarSkeleton from "@/components/skeleton/NavbarSkeleton";
// import fetcher from "@/utils/fetcher";
// import { useTheme } from "next-themes";
// import Link from "next/link";
// import { useState } from "react";
// import { FaChevronDown } from "react-icons/fa";
// import useSWR from "swr";

// interface MenuContent {
//   menu_content_id: number;
//   content_type: string;
//   content_id: number;
//   menu_position: number;
//   menu_lavel: string;
//   link_url: string | null;
//   slug: string;
//   parents_id: number;
//   menu_id: number;
//   status: number;
//   menu_name: string;
//   menu_style: string | null;
// }

// const NavItems = ({
//   activeMenu,
//   setActiveMenu,
// }: {
//   activeMenu: string;
//   setActiveMenu: (menu: string) => void;
// }) => {
//   const {
//     data,
//     error,
//     isLoading,
//   }: { data: any; error: any; isLoading: boolean } = useSWR(
//     "/category-list",
//     fetcher,
//     );
  
//   const { theme } = useTheme();

//   if (error) return <div className='hidden lg:block'>Error loading data</div>;
//   if (isLoading) return <NavbarSkeleton theme={theme} />;

//   return (
//     <nav className='flex-nowrap overflow-x-auto lg:flex-wrap hidden lg:block'>
//       <div className='flex flex-wrap items-center lg:justify-center'>
//         <ul className='flex whitespace-nowrap lg:overflow-hidden gap3'>
//           {data?.slice(0, 10)?.map((category: MenuContent) => {
//             const { menu_content_id, slug, menu_lavel } = category;
//             return (
//               <li
//                 key={menu_content_id}
//                 className='text-black  dark:text-white border-r-2 '
//               >
//                 <Link
//                   className='flex items-center gap-1 py-[11px] px-5  text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
//                   href={`/${slug?.toLowerCase()}`}
//                   onClick={() => setActiveMenu(menu_lavel.toLowerCase())}
//                 >
//                   <div
//                     className={`font-bold ${
//                       activeMenu == menu_lavel.toLocaleLowerCase()
//                         ? " border-b-2 border-black dark:border-white"
//                         : ""
//                     }`}
//                   >
//                     {menu_lavel.toLowerCase()}
//                   </div>
//                 </Link>
//               </li>
//             );
//           })}
//           <div className='group relative flex gap-6 whitespace-nowrap lg:overflow-hidden items-center px-3 text-md text-[var(--dark)] dark:text-white font-bold capitalize border-r-2'>
//             <p className='flex items-center gap-1'>
//               অন্যান্য
//               <FaChevronDown className='group-hover:rotate-180 transition-transform duration-200' />
//             </p>
//             <div className='absolute hidden group-hover:block bg-white dark:bg-[#1A202C] shadow-md rounded-md p-2 top-full mt-2 right-0'>
//               {data?.slice(10, data.length)?.map((category: MenuContent) => {
//                 const { menu_content_id, slug, menu_lavel } = category;
//                 return (
//                   <Link
//                     key={menu_content_id}
//                     className='flex items-center gap-1 py-1 px-3 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
//                     href={`/${slug?.toLowerCase()}`}
//                     onClick={() => setActiveMenu(menu_lavel.toLowerCase())}
//                   >
//                     {menu_lavel.toLowerCase()}
//                   </Link>
//                 );
//               })}
//             </div>
//           </div>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default NavItems;

import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

const NavItems = () => {
  return (
    <ul className='lg:flex items-center gap-5 hidden '>
      <li>
        <Link
          href='/'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2 '
        >
          সর্বশেষ
        </Link>
      </li>
      <li>
        <Link
          href='/latest'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          জাতীয়
        </Link>
      </li>
      <li>
        <Link
          href='/popular'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          সারাদেশ
        </Link>
      </li>
      <li>
        <Link
          href='/politics'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          রাজনীতি
        </Link>
      </li>
      <li>
        <Link
          href='/country'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          দেশ
        </Link>
      </li>
      <li>
        <Link
          href='/international'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          আন্তর্জাতিক
        </Link>
      </li>
      <li>
        <Link
          href='/sports'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          খেলা
        </Link>
      </li>
      <li>
        <Link
          href='/entertainment'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          বিনোদন
        </Link>
      </li>
      <li>
        <Link
          href='/entertainment'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
          সর্বশেষ
        </Link>
      </li>
      <li>
        <Link
          href='/entertainment'
          className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
        >
         ধর্ম
        </Link>
      </li>

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
                <li>
                  <Link
                    href='/sub/chaturango'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    চতুরঙ্
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sub/womensday'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    নারী দিবস
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sahitto-o-sangskriti'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    সাহিত্য ও সংস্কৃতি
                  </Link>
                </li>
                <li>
                  <Link
                    href='/photogallery'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    ছবি
                  </Link>
                </li>
                <li>
                  <Link
                    href='/probas'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    প্রবাস
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/life-struggle'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    জীবন সংগ্রাম
                  </Link>
                </li>
                <li>
                  <Link
                    href='/travel'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    ভ্রমণ
                  </Link>
                </li>
                <li>
                  <Link
                    href='/feature'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    ফিচার
                  </Link>
                </li>
                <li>
                  <Link
                    href='/sub/education'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    শিক্ষা
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/sub/industry-trade'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    শিল্প-বাণিজ্য
                  </Link>
                </li>
                <li>
                  <Link
                    href='/interview'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    সাক্ষাৎকার
                  </Link>
                </li>
                <li>
                  <Link
                    href='/technology'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    প্রযুক্তি
                  </Link>
                </li>
                <li>
                  <Link
                    href='/priyochattogram'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    প্রিয় চট্টগ্রাম
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/sub/stock-market'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    শেয়ারবাজার
                  </Link>
                </li>
                <li>
                  <Link
                    href='/samakal-investigation'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    সমকাল অনুসন্ধান
                  </Link>
                </li>
                <li>
                  <Link
                    href='/offbit'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    অফবিট
                  </Link>
                </li>
                <li>
                  <Link
                    href='/archive'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    আর্কাইভ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <ul className='space-y-2'>
                <li>
                  <Link
                    href='/opinion'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    মতামত
                  </Link>
                </li>
                <li>
                  <Link
                    href='/chakri'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    চাকরি
                  </Link>
                </li>
                <li>
                  <Link
                    href='/shilpomoncho'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    শিল্পমঞ্চ
                  </Link>
                </li>
                <li>
                  <Link
                    href='/special-ayojon'
                    className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                  >
                    বিশেষ আয়োজন
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </li>
    </ul>
  );
};

export default NavItems;
