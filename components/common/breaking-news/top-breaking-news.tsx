"use client";

import { useGetBreakingNewsQuery } from "@/redux/features/breakingNewsApi/breakingNewsApi";
import { ChevronsRight } from "@/ui/ChevronsRight";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";

const MARQUEE_ITEM_DURATION_SECONDS = 15;
const BREAKING_NEWS_TITLE = "এই মাত্র পাওয়া";
const HIDE_DURATION_MS = 2 * 60 * 1000; 

interface NewsItem {
  id: string | number;
  is_top_breaking_news: boolean;
  status: string;
  is_deleted: boolean;
  news: {
    id: string | number;
    slug: string | null;
    headline: string;
    short_headline: string;
  };
}

interface BreakingNewsApiResponse {
  data?: NewsItem[];
}

const TopBreakingNews: React.FC = () => {
  const {
    data: breakingNewsApiResponse,
    error,
    isLoading,
  } = useGetBreakingNewsQuery(undefined, {
    // pollingInterval: 30000,
    // refetchOnFocus: true,
    // refetchOnMountOrArgChange: true,
  });

  const [isMarqueeHidden, setIsMarqueeHidden] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = sessionStorage.getItem("isMarqueeHidden");
      const hideUntil = sessionStorage.getItem("hideUntil");
      if (storedValue === "true" && hideUntil) {
        const now = Date.now();
        if (now < parseInt(hideUntil, 10)) {
          return true; // Keep hidden if within 5-minute window
        } else {
          // Clear storage if time has passed
          sessionStorage.removeItem("isMarqueeHidden");
          sessionStorage.removeItem("hideUntil");
          return false;
        }
      }
      return storedValue === "true";
    }
    return false;
  });

  useEffect(() => {
    if (isMarqueeHidden) {
      const hideUntil = Date.now() + HIDE_DURATION_MS;
      sessionStorage.setItem("isMarqueeHidden", "true");
      sessionStorage.setItem("hideUntil", hideUntil.toString());
      // Set a timeout to re-enable the marquee after 5 minutes
      const timer = setTimeout(() => {
        setIsMarqueeHidden(false);
        sessionStorage.removeItem("isMarqueeHidden");
        sessionStorage.removeItem("hideUntil");
      }, HIDE_DURATION_MS);

      // Cleanup timer on unmount or state change
      return () => clearTimeout(timer);
    } else {
      sessionStorage.setItem("isMarqueeHidden", "false");
      sessionStorage.removeItem("hideUntil");
    }
  }, [isMarqueeHidden]);

  const topBreakingNews = useMemo(() => {
    return (
      breakingNewsApiResponse?.data
        ?.filter(
          (item: NewsItem) =>
            item.is_top_breaking_news &&
            item.status === "active" &&
            !item.is_deleted,
        )
        ?.slice(0, 3) || []
    );
  }, [breakingNewsApiResponse]);

  if (isLoading) {
    return null;
  }
  if (error || topBreakingNews.length === 0) {
    return null;
  }

  if (isMarqueeHidden) {
    return null;
  }

  const marqueeDuration =
    topBreakingNews.length * MARQUEE_ITEM_DURATION_SECONDS;

  const marqueeItems = [
    ...topBreakingNews,
    {
      id: "spacer-1",
      news: { id: "", slug: null, short_headline: "", headline: "" },
    }, // Spacer
    ...topBreakingNews,
    {
      id: "spacer-2",
      news: { id: "", slug: null, short_headline: "", headline: "" },
    }, // Spacer
    ...topBreakingNews,
    {
      id: "spacer-3",
      news: { id: "", slug: null, short_headline: "", headline: "" },
    }, // Spacer
    ...topBreakingNews,
  ];

  return (
    <section
      aria-label='Top Breaking News Marquee'
      className='print:hidden bg-white dark:bg-slate-900 py-2 sm:py-3'
    >
      <div className='container mx-auto px-2 sm:px-4'>
        <div className='flex justify-between items-center bg-gray-100 dark:bg-gray-800 shadow-lg relative rounded overflow-hidden'>
          <div className='flex justify-center items-center py-2 p-3 sm:px-4 bg-red-700 dark:bg-red-800 text-white font-semibold whitespace-nowrap'>
            <div className='flex justify-center items-center'>
              <span className='relative flex h-4 w-4 sm:h-5 sm:w-5'>
                <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 dark:bg-red-500 opacity-75'></span>
                <span className='relative inline-flex rounded-full h-4 w-4 sm:h-5 sm:w-5 bg-red-500 dark:bg-red-600'></span>
              </span>
            </div>
            <span className='text-xl sm:text-2xl lg:text-3xl ml-2 sm:ml-3 mr-3 sm:mr-4 tracking-tight'>
              {BREAKING_NEWS_TITLE}
            </span>
          </div>

          <div className='flex-grow overflow-hidden'>
            <div
              className='marquee whitespace-nowrap'
              style={{ animationDuration: `${marqueeDuration}s` }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.animationPlayState = "paused")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.animationPlayState = "running")
              }
            >
              {marqueeItems.map((item, idx) =>
                item.id.startsWith("spacer") ? (
                  <div
                    key={`spacer-${idx}`}
                    className='inline-flex mx-5 sm:mx-6 w-48 sm:w-64'
                  />
                ) : (
                  <Link
                    key={`${item.id}-marquee-${idx}`}
                    href={`/news/${item.news.id}/${item.news.slug}`}
                    className={`inline-flex items-center text-gray-800 dark:text-gray-100 mx-5 sm:mx-6 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-150 ease-in-out font-medium ${
                      topBreakingNews.length === 1
                        ? "text-xl sm:text-2xl lg:text-2xl"
                        : topBreakingNews.length === 2
                        ? "text-lg sm:text-xl lg:text-xl"
                        : "text-base sm:text-lg lg:text-lg"
                    }`}
                  >
                    <Image
                      src='/images/ni_logo1.png'
                      alt={item.news.headline}
                      width={
                        topBreakingNews.length === 1
                          ? 30
                          : topBreakingNews.length === 2
                          ? 24
                          : 20
                      }
                      height={
                        topBreakingNews.length === 1
                          ? 30
                          : topBreakingNews.length === 2
                          ? 24
                          : 20
                      }
                      className='mr-2'
                    />
                    <span className='text-[var(--text-primary)] hover:text-black sm:text-xl'>
                      {" "}
                      {item.news.headline}
                    </span>
                  </Link>
                ),
              )}
            </div>
          </div>
          <button
            aria-label='Hide breaking news marquee'
            className='z-1 p-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-150 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-tr rounded-br'
            onClick={() => setIsMarqueeHidden(true)}
            title='Close Breaking News'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5 sm:h-6 sm:w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      </div>

      <style jsx>{`
        .marquee {
          display: inline-flex;
          align-items: center;
          will-change: transform;
          animation: marquee linear infinite;
          min-width: 200%;
          padding-right: 2rem;
        }

        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (max-width: 640px) {
          .marquee a,
          .marquee div {
            font-size: 0.9rem;
            margin-left: 0.75rem;
            margin-right: 0.75rem;
          }
          .marquee {
            padding-right: 1rem;
          }
          .fixed-title-container span:last-child {
            font-size: 1.125rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TopBreakingNews;
