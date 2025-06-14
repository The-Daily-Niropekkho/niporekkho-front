"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaInstagram,
  FaArrowUp,
  FaSearch,
} from "react-icons/fa";
import date_output_bn from "@/utils/datetime";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TopNewsForNewsDetails from "@/components/singleNews/top-news-for-news-details";
import { useTopicwiseNewsQuery } from "@/redux/features/news/newsApi";
import Link from "next/link";
import Spin from "@/ui/spin/Spin";

function Page() {
  const [showScroll, setShowScroll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentLimit, setCurrentLimit] = useState(8); // Initial limit for news items
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Track initial load
  const initialLimit = 10; // Increment for load more
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const topicId = searchParams.get("topic_id");
  const topicName = searchParams.get("slug");

  // Fetch news with dynamic limit
  const { data, isLoading, error, isFetching } = useTopicwiseNewsQuery(
    {
      topic_id: topicId ?? undefined,
      limit: currentLimit,
    },
    {
      // Ensure refetch on limit change
      refetchOnMountOrArgChange: true,
    },
  );

  // Filter data based on search query
  const filteredData = useMemo(
    () =>
      data?.data?.filter(
        (news) =>
          news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
          news.short_headline.toLowerCase().includes(searchQuery.toLowerCase()),
      ) || [],
    [data, searchQuery],
  );

  // Total number of posts available
  const totalPosts = data?.meta?.total || 0;

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScroll]);

  useEffect(() => {
    // Set isInitialLoad to false after the first load completes
    if (!isLoading && isInitialLoad) {
      setIsInitialLoad(false);
    }
  }, [isLoading, isInitialLoad]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLoadMore = () => {
    setCurrentLimit((prev) => prev + initialLimit);
  };

  // Full-page loading state with Skeleton (for initial load)
  if (isLoading && isInitialLoad) {
    return (
      <div className='container mx-auto p-6 font-solaimanlipi'>
        {/* Header and Search Skeleton */}
        <div className='flex justify-between items-center mb-2'>
          <Skeleton
            width={200}
            height={40}
            baseColor='#f0f0f0'
            highlightColor='#f3f4f6'
          
          />
          <Skeleton
            width={150}
            height={40}
            baseColor='#f0f0f0'
            highlightColor='#f3f4f6'
          
          />
        </div>

        {/* Main Content Grid */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* News Cards Skeleton */}
          <div className='col-span-1 md:col-span-2'>
            <div className='space-y-8'>
              {Array(10) // Match initial currentLimit
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className='flex flex-col md:flex-row gap-5 pb-4 border-b border-gray-200'
                  >
                    <Skeleton
                      width={320}
                      height={200}
                      baseColor='#f0f0f0'
                      highlightColor='#f3f4f6'
                    
                    />
                    <div className='flex-1'>
                      <Skeleton
                        width='80%'
                        height={28}
                        baseColor='#f0f0f0'
                        highlightColor='#f3f4f6'
                        style={{
                          borderRadius: "9999px",
                          marginBottom: "0.5rem",
                        }}
                      />
                      <Skeleton
                        width='60%'
                        height={16}
                        baseColor='#f0f0f0'
                        highlightColor='#f3f4f6'
                        style={{
                          borderRadius: "9999px",
                          marginBottom: "0.75rem",
                        }}
                      />
                      <Skeleton
                        count={3}
                        height={16}
                        baseColor='#f0f0f0'
                        highlightColor='#f3f4f6'
                        style={{
                          borderRadius: "9999px",
                          marginBottom: "0.75rem",
                        }}
                      />
                      <Skeleton
                        width='40%'
                        height={14}
                        baseColor='#f0f0f0'
                        highlightColor='#f3f4f6'
                      
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Ad Cards and Top News Skeleton */}
          <div className='col-span-1 space-y-6'>
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className='bg-gray-100 rounded-lg p-4 border border-gray-200'
                >
                  <Skeleton
                    height={150}
                    width={200}
                    baseColor='#f0f0f0'
                    highlightColor='#f3f4f6'
                    style={{ borderRadius: "9999px", marginBottom: "1rem" }}
                    className='mx-auto'
                  />
                  <Skeleton
                    width='70%'
                    height={20}
                    baseColor='#f0f0f0'
                    highlightColor='#f3f4f6'
                    style={{ borderRadius: "9999px", marginBottom: "0.5rem" }}
                    className='mx-auto'
                  />
                  <Skeleton
                    width='50%'
                    height={16}
                    baseColor='#f0f0f0'
                    highlightColor='#f3f4f6'
                  
                    className='mx-auto'
                  />
                </div>
              ))}
            {/* Top News Skeleton */}
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className='flex items-center gap-3'>
                  <Skeleton
                    width={100}
                    height={60}
                    baseColor='#f0f0f0'
                    highlightColor='#f3f4f6'
                  
                  />
                  <div className='flex-1'>
                    <Skeleton
                      width='80%'
                      height={18}
                      baseColor='#f0f0f0'
                      highlightColor='#f3f4f6'
                    
                    />
                    <Skeleton
                      width='60%'
                      height={14}
                      baseColor='#f0f0f0'
                      highlightColor='#f3f4f6'
                      style={{ borderRadius: "9999px", marginTop: "0.5rem" }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className='p-4 text-center font-solaimanlipi'>
        <p className='text-lg text-red-500 font-medium'>
          নিউজ লোড করতে সমস্যা:{" "}
          {typeof error === "object" && error !== null
            ? "message" in error
              ? (error as { message: string }).message
              : "error" in error
              ? (error as { error: string }).error
              : "কিছু ভুল হয়েছে"
            : "কিছু ভুল হয়েছে"}
        </p>
      </div>
    );
  }

  // Empty state
  if (!data || !data?.data || data?.data?.length === 0) {
    return (
      <div className='p-4 text-center font-solaimanlipi'>
        <p className='text-lg text-gray-500 font-medium'>
          এই টপিকের জন্য কোনো নিউজ পাওয়া যায়নি।
        </p>
      </div>
    );
  }

  return (
    <div className='container mx-auto p-6 font-solaimanlipi'>
      {/* Header and Search */}
      <div className='flex justify-between items-center mb-2'>
        <h1 className='text-3xl font-extrabold text-[var(--text-primary)] tracking-tight'>
          {topicName}
        </h1>
        {/* <div className='relative'>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='নিউজ খুঁজুন...'
            className='w-48 md:w-64 p-2 pl-10 pr-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500'
          />
          <FaSearch
            size={16}
            className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
          />
          <button
            onClick={() => setSearchQuery("")}
            className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div> */}
      </div>

      {/* Main Content Grid */}
      <div className='flex flex-col lg:flex-row gap-6 w-full'>
        {/* News Cards */}
        <div className='lg:w-3/4'>
          <div className='space-y-8 '>
            {filteredData.slice(0, currentLimit).map((news) => (
              <Link
                href={`/${news.category.title}/${news.id}/${news.slug}`}
                key={news.id}
              >
                <div className='flex flex-col md:flex-row gap-5 pb-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer mt-4'>
                  {/* Image */}
                  <div className='flex-shrink-0 w-full md:w-80'>
                    <Image
                      src={fileObjectToLink(news.banner_image)}
                      alt={news.headline || "News banner"}
                      width={320}
                      height={200}
                      className='object-cover rounded-md w-full h-48 md:h-full'
                    />
                  </div>
                  {/* Content */}
                  <div className='flex-1'>
                    <h2 className='text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 hover:text-orange-600 transition-colors'>
                      {news.headline}
                    </h2>
                    <p className='text-gray-600 dark:text-gray-300 text-sm mb-3 font-medium'>
                      {news.short_headline}
                    </p>
                    <div
                      className='text-gray-700 dark:text-gray-200 text-base leading-relaxed mb-3 line-clamp-3'
                      dangerouslySetInnerHTML={{ __html: news.details }}
                    />
                    <p className='text-gray-500 dark:text-gray-400 text-sm font-medium'>
                      {date_output_bn(news.publish_date)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            {/* Incremental Loader for Load More */}
            {(isLoading || isFetching) && !isInitialLoad && (
              <div className='space-y-8'>
                {Array(initialLimit) // Match the number of items to be loaded
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={`loading-${index}`}
                      className='flex flex-col md:flex-row gap-5 pb-4 border-b border-gray-200'
                    >
                      <Skeleton
                        width={320}
                        height={200}
                        baseColor='#f0f0f0'
                        highlightColor='#f3f4f6'
                      
                      />
                      <div className='flex-1'>
                        <Skeleton
                          width='80%'
                          height={28}
                          baseColor='#f0f0f0'
                          highlightColor='#f3f4f6'
                          style={{
                            borderRadius: "9999px",
                            marginBottom: "0.5rem",
                          }}
                        />
                        <Skeleton
                          width='60%'
                          height={16}
                          baseColor='#f0f0f0'
                          highlightColor='#f3f4f6'
                          style={{
                            borderRadius: "9999px",
                            marginBottom: "0.75rem",
                          }}
                        />
                        <Skeleton
                          count={3}
                          height={16}
                          baseColor='#f0f0f0'
                          highlightColor='#f3f4f6'
                          style={{
                            borderRadius: "9999px",
                            marginBottom: "0.75rem",
                          }}
                        />
                        <Skeleton
                          width='40%'
                          height={14}
                          baseColor='#f0f0f0'
                          highlightColor='#f3f4f6'
                        
                        />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
          {/* Load More Button */}
          {totalPosts > currentLimit && (
            <div className='flex justify-center mt-6'>
              <button
                className='flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm'
                disabled={isLoading || isFetching}
                onClick={handleLoadMore}
              >
                আরও দেখুন {(isLoading || isFetching) && <Spin clss='w-7 h-7' />}
              </button>
            </div>
          )}
        </div>

        {/* Ad Cards and Top News */}
        <div className='lg:w-1/4 space-y-6'>
          {[
            {
              src: "https://tpc.googlesyndication.com/simgad/3745460761502011018",
              alt: "Advertisement 1",
              title: "আপনার বিজ্ঞাপন এখানে",
            },
          ].map((ad, index) => (
            <div key={index} className='bg-white dark:bg-gray-900 rounded-lg'>
              <div className='mb-4 flex justify-center'>
                <Image
                  src={ad.src}
                  alt={ad.alt}
                  width={300}
                  height={300}
                  className='object-cover'
                />
              </div>
            </div>
          ))}
          <TopNewsForNewsDetails count={40} />
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollTop}
        className={`fixed z-50 bottom-6 right-6 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-all duration-300 ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
        aria-label='Back to Top'
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}

export default Page;
