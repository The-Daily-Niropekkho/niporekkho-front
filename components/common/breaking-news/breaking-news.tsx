"use client";

import { BreakingNews } from "@/types/breakingNews";
import { useGetBreakingNewsQuery } from "@/redux/features/breakingNewsApi/breakingNewsApi";
import Link from "next/link";

const BreakingNewsMarquee: React.FC = () => {
  const {
    data: breakingNewsData,
    error,
    isLoading,
    isFetching,
  } = useGetBreakingNewsQuery();

 

  // Filter news
  const breakingNews =
    breakingNewsData?.data?.filter(
      (item: BreakingNews) =>
        !item.is_top_breaking_news &&
        item.status === "active" &&
        !item.is_deleted,
    ) || [];
  const topBreakingNews =
    breakingNewsData?.data?.filter(
      (item: BreakingNews) =>
        item.is_top_breaking_news &&
        item.status === "active" &&
        !item.is_deleted,
    ) || [];

  // Combine news (top breaking first)
  const newsItems = [...topBreakingNews, ...breakingNews];

  // If no news, return null
  if (newsItems.length === 0) return null;

  // Fallback news
  const fallbackNews: BreakingNews[] = [
   
  ];

  const displayNews = newsItems.length ? newsItems : fallbackNews;

  return (
    <section
      aria-label='Breaking News Marquee'
      className='flex overflow-hidden sticky bottom-0 bg-black'
    >
      {/* Left fixed red box */}
      <div className='flex-shrink-0 bg-red-500 text-white font-bold px-4 py-2 whitespace-nowrap'>
        শিরোনাম
      </div>

      {/* Right scrolling area */}
      <div className='relative flex-1 overflow-hidden bg-black flex items-center py-2'>
        {error ? (
          <div className='text-center text-red-500 w-full'>
            Error loading news.
          </div>
        ) : isLoading || isFetching ? (
          <div className='flex w-full animate-pulse'>
            {[...Array(10)].map((_, idx) => (
              <div
                key={idx}
                className='inline-flex items-center text-white mx-6'
              >
                <span className='mr-2 h-3 w-3 bg-red-500 rounded-full'></span>
                <div className='h-4 bg-gray-600 rounded w-48'></div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className='marquee whitespace-nowrap'
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = "paused")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = "running")
            }
          >
            {[...displayNews, ...displayNews].map((item, idx) => (
              <Link
                key={`${item.id}-${idx}`}
                href={`/breaking-news/${item.news.id}/${item.news.slug}`}
                className='inline-flex items-center text-white mx-6 cursor-pointer hover:text-yellow-500 transition-colors'
              >
                <span className='mr-2 text-red-500'>●</span>
                <span>{ item.news.headline}</span>
                {/* {item.is_top_breaking_news ? (
                  <span className='ml-2 text-xs bg-red-500 text-white px-1 rounded'>
                    Top
                  </span>
                ) : null} */}
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Scoped CSS */}
      <style jsx>{`
        .marquee {
          display: inline-flex;
          will-change: transform;
          animation: marquee 280s linear infinite;
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
          .marquee a {
            font-size: 0.875rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BreakingNewsMarquee;

