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
import { useState } from "react";
// data/navData.ts
export const navItems = [
  { menu_content_id: 1, slug: "", menu_lavel: "সর্বশেষ", menu_style: null },
  { menu_content_id: 2, slug: "latest", menu_lavel: "জাতীয়", menu_style: null },
  { menu_content_id: 3, slug: "popular", menu_lavel: "সারাদেশ", menu_style: null },
  { menu_content_id: 4, slug: "politics", menu_lavel: "রাজনীতি", menu_style: null },
  { menu_content_id: 5, slug: "country", menu_lavel: "দেশ", menu_style: null },
  { menu_content_id: 6, slug: "international", menu_lavel: "আন্তর্জাতিক", menu_style: null },
  { menu_content_id: 7, slug: "sports", menu_lavel: "খেলা", menu_style: null },
  { menu_content_id: 8, slug: "entertainment", menu_lavel: "বিনোদন", menu_style: null },
  { menu_content_id: 9, slug: "entertainment", menu_lavel: "সর্বশেষ", menu_style: null },
  { menu_content_id: 10, slug: "entertainment", menu_lavel: "ধর্ম", menu_style: null },
  { menu_content_id: 11, slug: "chaturango", menu_lavel: "চতুরঙ্", menu_style: null },
  { menu_content_id: 12, slug: "womensday", menu_lavel: "নারী দিবস", menu_style: null },
  { menu_content_id: 13, slug: "sahitto-o-sangskriti", menu_lavel: "সাহিত্য ও সংস্কৃতি", menu_style: null },
  { menu_content_id: 14, slug: "photogallery", menu_lavel: "ছবি", menu_style: null },
  { menu_content_id: 15, slug: "probas", menu_lavel: "প্রবাস", menu_style: null },
  { menu_content_id: 16, slug: "life-struggle", menu_lavel: "জীবন সংগ্রাম", menu_style: null },
  { menu_content_id: 17, slug: "travel", menu_lavel: "ভ্রমণ", menu_style: null },
  { menu_content_id: 18, slug: "feature", menu_lavel: "ফিচার", menu_style: null },
  { menu_content_id: 19, slug: "education", menu_lavel: "শিক্ষা", menu_style: null },
  { menu_content_id: 20, slug: "industry-trade", menu_lavel: "শিল্প-বাণিজ্য", menu_style: null },
  { menu_content_id: 21, slug: "interview", menu_lavel: "সাক্ষাৎকার", menu_style: null },
  { menu_content_id: 22, slug: "technology", menu_lavel: "প্রযুক্তি", menu_style: null },
  { menu_content_id: 23, slug: "priyochattogram", menu_lavel: "প্রিয় চট্টগ্রাম", menu_style: null },
  { menu_content_id: 24, slug: "stock-market", menu_lavel: "শেয়ারবাজার", menu_style: null },
  { menu_content_id: 25, slug: "samakal-investigation", menu_lavel: "সমকাল অনুসন্ধান", menu_style: null },
  { menu_content_id: 26, slug: "offbit", menu_lavel: "অফবিট", menu_style: null },
  { menu_content_id: 27, slug: "archive", menu_lavel: "আর্কাইভ", menu_style: null },
  { menu_content_id: 28, slug: "opinion", menu_lavel: "মতামত", menu_style: null },
  { menu_content_id: 29, slug: "chakri", menu_lavel: "চাকরি", menu_style: null },
  { menu_content_id: 30, slug: "shilpomoncho", menu_lavel: "শিল্পমঞ্চ", menu_style: null },
  { menu_content_id: 31, slug: "special-ayojon", menu_lavel: "বিশেষ আয়োজন", menu_style: null },
];
const NavItems = () => {
  const [menuData, setMenuData] = useState(navItems); // Dynamic state for menu items

  return (
    <ul className='lg:flex items-center gap-5 hidden'>
      {menuData.slice(0, 9).map((item) => (
        <li key={item.menu_content_id}>
          <Link
            href={`/${item.slug}`}
            className='py-[11px] px-5 text-md text-[var(--dark)] dark:text-white hover:text-red-500 capitalize border-r-2'
          >
            {item.menu_lavel}
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
                  <li key={item.menu_content_id}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.menu_lavel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(14, 18).map((item) => (
                  <li key={item.menu_content_id}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.menu_lavel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(18, 22).map((item) => (
                  <li key={item.menu_content_id}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.menu_lavel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(22, 26).map((item) => (
                  <li key={item.menu_content_id}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.menu_lavel}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 5 */}
            <div>
              <ul className='space-y-2'>
                {menuData.slice(26, 31).map((item) => (
                  <li key={item.menu_content_id}>
                    <Link
                      href={`/${item.slug}`}
                      className='block text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-500 transition-colors duration-200'
                    >
                      {item.menu_lavel}
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