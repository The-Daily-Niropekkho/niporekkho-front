"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { useContext, useEffect, useState } from "react";
import "moment/locale/bn";
import Socials from "../common/socials/Socials";
import "@/app/datebar.css";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTableList,
  faNewspaper,
  faBoxArchive as faArchive,
  faThumbsUp,
  faTv,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faYoutube,
  faTwitter,
  faTiktok,
  faLinkedinIn,
  faInstagram,
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

// Declare google as a global variable for TypeScript
declare global {
  interface Window {
    google: any;
  }
}
declare const google: any;

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
  const [currentLanguage, setCurrentLanguage] = useState<"bn" | "en">(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("language") === "en" ? "en" : "bn";
    }
    return "bn";
  });
  const [translateReady, setTranslateReady] = useState(false);
  const { theme, setTheme } = useTheme();
  const {
    data: webSettingData,
    error: webSettingError,
    isLoading: webSettingLoading,
  } = useContext(WebSettingContext);

  let content;

  const handleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleTheme = () => {
    setTheme(theme === "dark" || theme === "system" ? "light" : "dark");
  };

  const toggleLanguage = () => {
    const newLang = currentLanguage === "bn" ? "en" : "bn";
    setCurrentLanguage(newLang);
    localStorage.setItem("language", newLang);

    if (translateReady) {
      document.cookie = `googtrans=/auto/${newLang}; path=/`;
      window.location.reload();
    } else {
      console.warn("Google Translate not ready yet");
    }
  };

  useEffect(() => {
    const checkTranslateReady = setInterval(() => {
      if (typeof google !== "undefined" && google.translate) {
        setTranslateReady(true);
        clearInterval(checkTranslateReady);

        const lang = localStorage.getItem("language") || "bn";
        document.cookie = `googtrans=/auto/${lang}; path=/`;
        const container = document.getElementById("google_translate_element");
        if (container) {
          new google.translate.TranslateElement(
            {
              pageLanguage: "bn",
              includedLanguages: "bn,en",
              layout: google.translate.TranslateElement.InlineLayout.NONE,
              autoDisplay: false,
            },
            "google_translate_element",
          );
        }

        // Hide Google Translate bar after initialization
        const hideTranslateBar = () => {
          const translateBar = document.querySelector(
            ".skiptranslate",
          ) as HTMLElement | null;
          if (translateBar) {
            translateBar.style.display = "none";
            translateBar.style.height = "0";
            translateBar.style.margin = "0";
            translateBar.style.padding = "0";
            translateBar.style.overflow = "hidden";
          }
        };
        hideTranslateBar();
        window.addEventListener("load", hideTranslateBar);

        // Ensure language button label is correct after translation
        const updateLanguageLabel = () => {
          setCurrentLanguage(lang as "bn" | "en"); // Refresh state to match cookie
        };
        updateLanguageLabel();
        window.addEventListener("load", updateLanguageLabel);
      }
    }, 100);

    return () => {
      clearInterval(checkTranslateReady);
      window.removeEventListener("load", hideTranslateBar);
      window.removeEventListener("load", updateLanguageLabel);
    };
  }, []);

  if (webSettingError)
    content = <div className='text-center'>There was an Error!</div>;

  if (webSettingLoading) content = <div className='text-center'></div>;

  if (webSettingData) {
    const { logo, social_link } = webSettingData;
    const { fb, tw, linkd, insta, youtube, tiktok } = social_link;
    const topRightSideLink = [
      {
        label: "",
        key: "facebook",
        icon: faFacebookF,
        href: fb || "https://facebook.com",
        hover: "bg-blue-600 text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "twitter",
        icon: faTwitter,
        href: tw || "https://twitter.com",
        hover: "bg-sky-500 text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "linkedin",
        icon: faLinkedinIn,
        href: linkd || "https://linkedin.com",
        hover: "bg-blue-700 text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "youtube",
        icon: faYoutube,
        href: youtube || "https://youtube.com",
        hover: "bg-red-600 text-white border rounded-[9999px] ",
      },
      {
        label: "",
        key: "instagram",
        icon: faInstagram,
        href: insta || "https://instagram.com",
        hover:
          "transition-colors duration-500 bg-[radial-gradient(circle_at_30%_107%,_#fdf497_0%,_#fdf497_5%,_#fd5949_45%,_#d6249f_60%,_#285AEB_90%)] text-white border rounded-full",
      },
      {
        label: "",
        key: "tiktok",
        icon: faTiktok,
        href: tiktok || "https://tiktok.com",
        hover: "transition-colors duration-500 bg-black text-white border rounded-full",
      },
      {
        label: "",
        key: "whatsapp",
        icon: faWhatsapp,
        href: "https://whatsapp.com",
        hover: "bg-green-500 text-white border rounded-[9999px] ",
      },
    ];
    const topRightSideLink2 = [
      {
        label: "ই-পেপার",
        key: "epaper",
        icon: faNewspaper,
        href: "https://epaper.dailyniropekkho.com/",
        hover: "bg-[#f0f0f0] text-red-500 hover:text-black",
      },
      {
        label: currentLanguage === "bn" ? "English" : "বাংলা",
        key: "language",
        icon: null,
        href: "#",
        hover: "bg-[#f0f0f0] text-red-500 hover:text-black",
        className: "notranslate", 
      },
    ];

    return (
      <div className='timebar border-b py-2 '>
        <style>
          {`
             .skiptranslate {
              display: none !important;
              height: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
              }
              .goog-te-banner-frame {
                display: none !important;
                height: 0 !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: hidden !important;
              }
              .notranslate {
                translate: no; /* Prevent translation */
}
          `}
        </style>
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
                <FaRegCalendarAlt className='mt-0.5' />
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
                {topRightSideLink.map((link) => (
                  <a
                    key={link.key}
                    href={link.href}
                    target='_blank'
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
                {topRightSideLink2.map((link) =>
                  link.key === "language" ? (
                    <button
                      key={link.key}
                      onClick={toggleLanguage}
                      disabled={!translateReady}
                      className={`flex items-center gap-1 px-2 py-1 text-gray-700 transition-colors duration-300 rounded ${
                        link.hover
                      } ${
                        !translateReady ? "opacity-50 cursor-not-allowed" : ""
                      } ${link.className || ""}`} // Apply the className
                    >
                      {link.label && (
                        <span className='notranslate'>{link.label}</span>
                      )}{" "}
                    </button>
                  ) : (
                    <a
                      key={link.key}
                      href={link.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      className={`flex items-center gap-1 px-2 py-1 text-gray-700 transition-colors duration-300 rounded ${link.hover}`}
                    >
                      {link.icon && (
                        <FontAwesomeIcon icon={link.icon} className='text-lg' />
                      )}
                      {link.label && <span>{link.label}</span>}
                    </a>
                  ),
                )}
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
        <div id='google_translate_element' style={{ display: "none" }}></div>
        <Script
          src='//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
          strategy='lazyOnload'
          onError={() =>
            console.error("Failed to load Google Translate script")
          }
        />
        <Script id='google-translate-init' strategy='lazyOnload'>{`
          function googleTranslateElementInit() {
            new google.translate.TranslateElement({
              pageLanguage: 'bn',
              includedLanguages: 'bn,en',
              layout: google.translate.TranslateElement.InlineLayout.NONE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}</Script>
      </div>
    );
  }
};

export default TopBar;
function hideTranslateBar(this: Window, ev: Event) {
  const translateBar = document.querySelector(".skiptranslate") as HTMLElement | null;
  if (translateBar) {
    translateBar.style.display = "none";
    translateBar.style.height = "0";
    translateBar.style.margin = "0";
    translateBar.style.padding = "0";
    translateBar.style.overflow = "hidden";
  }
  const bannerFrame = document.querySelector(".goog-te-banner-frame") as HTMLElement | null;
  if (bannerFrame) {
    bannerFrame.style.display = "none";
    bannerFrame.style.height = "0";
    bannerFrame.style.margin = "0";
    bannerFrame.style.padding = "0";
    bannerFrame.style.overflow = "hidden";
  }
}
function updateLanguageLabel(this: Window, ev: Event) {
  const lang = (localStorage.getItem("language") as "bn" | "en") || "bn";
  const langLabel = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
  if (langLabel) {
    langLabel.value = lang;
  }}

