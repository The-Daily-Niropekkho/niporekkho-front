"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext, useEffect, useState } from "react";
import "moment/locale/bn";

import Socials from "../common/socials/Socials";

import "@/app/datebar.css";
import Link from "next/link";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableList,
  faNewspaper,
  faBoxArchive as faArchive,
  faThumbsUp,
  faTv,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

import {
  faFacebookF,
  faYoutube,
  faXTwitter,
  faTiktok,
  faLinkedin,
  faInstagram,
  faYoutubeSquare,
  faTwitterSquare,
  faFacebookSquare,
  faLinkedinIn,
  faInstagramSquare,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import SideBar from "../sideBar/SideBar";
import { useTheme } from "next-themes";
import { FaMapMarkerAlt, FaRegCalendarAlt } from "react-icons/fa";
import MenuIcon from "@/public/icons/MenuIcon";
import timestampToBangleDateWithTime from "../../utils/timestampToBangleDateWithTime";
import { subDays } from "date-fns";
import { formatBanglaAndHijri } from "@/utils/bengaliTime";
import FacebookIcon from "@/public/icons/FacebookIcon";
import TwitterIcon from "@/public/icons/TwitterIcon";
import InstagramIcon from "@/public/icons/InstagramIcon";
import YoutubeIcon from "@/public/icons/YoutubeIcon";
import LinkedinIcon from "@/public/icons/LinkedinIcon";

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  if (!array || chunkSize <= 0) {
    return [];
  }

  const result: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

const TopBar = () => {
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const { theme, setTheme } = useTheme();

  const {
    data: webSettingData,
    error: webSettingError,
    isLoading: webSettingLoading,
  } = useContext(WebSettingContext);

  let content;

  const handleSidebar = () => {
    // Toggle the value of `showSidebar` to show or hide the sidebar
    setShowSidebar(!showSidebar);
  };

  const handleTheme = () => {
    // Toggle the theme between "dark" and "light" based on the current theme state
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  if (webSettingError)
    content = <div className='text-center'>There was an Error!</div>;

  if (webSettingLoading) content = <div className='text-center'></div>;

  if (webSettingData) {
    // const logo = webSettingData.logo;
    const { logo, social_link } = webSettingData;
    const { fb, tw, linkd, insta, youtube, tiktok } = social_link;
    const topRightSideLink = [
      {
        label: "",
        key: "facebook",
        icon: faFacebookF,
        href: "https://facebook.com",
        hover: "hover:bg-blue-600 hover:text-white border rounded-[9999px] ", // Dynamic hover col or
      },
      {
        label: "",
        key: "twitter",
        icon: faTwitter,
        href: "https://twitter.com",
        hover: "hover:bg-sky-500 hover:text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "linkedin",
        icon: faLinkedinIn,
        href: "https://linkedin.com",
        hover: "hover:bg-blue-700 hover:text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "youtube",
        icon: faYoutube,
        href: "https://youtube.com",
        hover: "hover:bg-red-600 hover:text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "instagram",
        icon: faInstagram,
        href: "https://instagram.com",
        hover: "transition-colors duration-500 hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-red-500 hover:to-pink-500 hover:text-white border rounded-full",
      },
      {
        label: "",
        key: "whatsapp",
        icon: faWhatsapp,
        href: "https://whatsapp.com",
        hover: "hover:bg-green-500 hover:text-white border rounded-[9999px]` ",
      },
    ];
    const topRightSideLink2 = [
      {
        label: "ই পেপার",
        key: "epaper",
        icon: faNewspaper,
        href: "https://epaper.dailyniropekkho.com/",
        hover: "bg-[#f0f0f0]  hover:text-red-500",
      },
      {
        label: "English",
        key: "language",
        icon: null,
        href: "#",
        hover: "bg-[#f0f0f0]  hover:text-red-500",
      },
    ];

    return (
      <div className='timebar border-b py-2 '>
        <div className='container px-4 py-2 mx-auto flex justify-between'>
          {/* left side */}
          <div className='hidden lg:flex items-center '>
            <div className='flex flex-col text-sm'>
              <div className='flex gap-3 '>
                <p className='flex gap-1 items-center hover:text-[#f04130] cursor-pointer duration-300 '>
                  <FaMapMarkerAlt /> ঢাকা
                </p>
                <p className='flex gap-1 items-center hover:text-[#f04130] cursor-pointer duration-300'>
                  <FaRegCalendarAlt />
                  {new Intl.DateTimeFormat("bn-BD", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }).format(new Date())}
                </p>
              </div>
              <div className='flex gap-2 hover:text-[#f04130] cursor-pointer duration-300'>
                <FaRegCalendarAlt className="mt-0.5"/>
                <span>{formatBanglaAndHijri()}</span>
              </div>
            </div>
          </div>

          {/* logo */}
          <div>
            <Link href='/' aria-label='logo'>
              <Image src={logo} alt='logo' width={250} height={100} />
            </Link>
          </div>
          {/* logo */}

          {/* right side */}
          <div>
            <div className='hidden lg:flex lg:flex-col gap-1 items-end justify-end print:hidden mt-1 text-end'>
              <div className='flex gap-1'>
                {" "}
                {topRightSideLink.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target={link.key === "epaper" ? "_blank" : "_self"}
                    rel='noopener noreferrer'
                    className={`flex items-center gap-1 px-2 py-1 text-gray-700 transition-colors duration-300 
                      ${link.label ? "border border-gray-300 rounded-md" : ""} 
                        ${
                          link.hover
                        } w-8 h-8 flex items-center justify-center border rounded-full`}
                       >
                           {link.icon && (
                             <FontAwesomeIcon icon={link.icon} className='text-lg' />
                            )}
                    {link.label && <span>{link.label}</span>}
                  </a>
                ))}
              </div>
              <div className='flex gap-2 '>
                {" "}
                {topRightSideLink2.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target={link.key === "epaper" ? "_blank" : "_self"} // Open e-paper in new tab
                    rel='noopener noreferrer'
                    className={`flex items-center gap-1 px-2 py-1 text-gray-700 transition-colors duration-300 rounded  
                      ${link.label ? "" : ""} 
                        ${link.hover}`}
                          >
                    {link.icon && (
                      <FontAwesomeIcon icon={link.icon} className='text-lg' />
                    )}
                    {link.label && <span>{link.label}</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button
            className='p-2 last:pr-0 md:hidden'
            type='button'
            aria-label='menu'
            onClick={handleSidebar}
          >
            <MenuIcon />
          </button>
        </div>
        {showSidebar && (
          <SideBar
            handleSidebar={handleSidebar}
            handleTheme={handleTheme}
            theme={`${theme}`}
          />
        )}
      </div>
    );
  }
};

export default TopBar;

// {
// /* Newspaper Header */
// }
// <div className='mb-6 text-center border-b-2 border-red-700 dark:border-red-600 pb-3'>
// <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-red-700 dark:text-red-600 font-serif tracking-tight mb-2'>
// BANGLADESH DAILY
// </h1>

// </div>;

// live tv
{
  /* <div
className='hidden lg:flex items-center justify-center print:hidden'
style={{ color: "#f04130 !important" }}
>
<Link
className='flex items-center gap-1 py-[1px] px-3 text-md '
href={"https://www.youtube.com/@DailyNiropekkho.official"}
>
{/* <div className="font-bold"><FontAwesomeIcon icon={faTv}/> লাইভ টিভি</div> */
}
// <button className='whitespace-nowrap rounded-3xl bg-[#f04130] text-white py-1.5 px-4 text-sm'>
// <FontAwesomeIcon icon={faTv} /> লাইভ টিভি
// </button>
// </Link>
// </div>; */}
