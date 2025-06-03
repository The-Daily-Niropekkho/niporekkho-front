"use client";

import SearchPageSkeleton from "@/components/skeleton/SearchPageSkeleton.js";
import { NewsItem } from "@/interface/post";
import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import { useSearchNewsQuery } from "@/redux/features/news/newsApi";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
    FacebookShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import add1 from "/public/images/add1.png";

// Utility function to map API response to NewsItem
const mapToNewsItem = (apiData: any): NewsItem => ({
  news_id: apiData.id,
  post_title: apiData.headline,
  stitle: apiData.short_headline,
  excerpt: apiData.short_headline,
  image_thumb: apiData.banner_image?.originalUrl || "",
  category: apiData.category?.slug || "",
  encode_titl: apiData.slug,
  time_stamp: apiData.publish_date,
  default_img: apiData.banner_image?.defaultUrl || "",
  category_name: apiData.category?.name || "",
  image_title: apiData.banner_image?.title || "",
  image_alt: apiData.banner_image?.alt || "",
  post_by_image: apiData.post_by_image || "",
  post_by_name: apiData.post_by_name || "",
  post_by_id: apiData.post_by_id || "",
  post_date: apiData.post_date || "",
  video: apiData.video || "",
  image_check: apiData.image_check ?? false,
  image_large: apiData.banner_image?.largeUrl || "",
  publish_date: apiData.publish_date || "",
});

export default function SearchPage() {
  const [allData, setAllData] = useState<NewsItem[]>([]); // Store all fetched data
  const [displayCount, setDisplayCount] = useState(10); // Number of items to display
  const [offset, setOffset] = useState(0); // Offset for fetching more data
  const [currentUrl, setCurrentUrl] = useState("");
  const [noData, setNoData] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const [isParamChanging, setIsParamChanging] = useState(false); // Track parameter change
  const itemsPerPage = 10; // Display 10 items at a time
  const fetchLimit = 20; // Fetch 20 items at a time from API

  // Get the search parameters from URL
  const searchParams = useSearchParams();
  const searchSlug = searchParams.get("search_slug") || "";
  console.log("Search Slug:", searchSlug);

  // Use RTK Query to fetch search results
  const {
    data: searchData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useSearchNewsQuery(
    { keyword: searchSlug, offset },
    { skip: !searchSlug.trim() },
  );
  console.log("Search Data:", searchData);

  // Reset state and show loader when searchSlug changes
  useEffect(() => {
    setIsParamChanging(true);
    setAllData([]); // Clear all existing data
    setDisplayCount(10);
    setOffset(0);
    setNoData(false);
    setHasMore(true);

    // After a short delay, reset isParamChanging to allow data to load
    const timer = setTimeout(() => {
      setIsParamChanging(false);
      if (searchSlug.trim()) {
        refetch(); // Only refetch if there's a search term
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [searchSlug, refetch]);

  // Update allData state based on search results
  useEffect(() => {
    if (searchData && searchData.data && !isParamChanging) {
      const mappedData = searchData.data.map(mapToNewsItem);
      setAllData(mappedData); // Replace existing data instead of appending
      setNoData(mappedData.length === 0);
      setHasMore(mappedData.length === fetchLimit);
    }
  }, [searchData, isParamChanging]);

  // Fetch more data if needed
  useEffect(() => {
    if (
      displayCount >= allData.length &&
      hasMore &&
      !isFetching &&
      !isParamChanging
    ) {
      setOffset((prev) => prev + fetchLimit);
    }
  }, [displayCount, allData.length, hasMore, isFetching, isParamChanging]);

  // Set current URL
  useEffect(() => {
    const currentUrl = window.location.href;
    setCurrentUrl(currentUrl);
  }, []);

  // Handle error state
  if (error) {
    return (
      <div className='h-[300px] sm:h-[600px] flex items-center justify-center text-3xl text-[var(--dark)] dark:text-white'>
        {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  // Handle loading state
  if (isLoading && offset === 0) return <SearchPageSkeleton />;

  // Show loader during parameter change
  if (isParamChanging) {
    return (
      <div className='h-[300px] sm:h-[600px] flex items-center justify-center'>
        <Spin clss='w-12 h-12' />
      </div>
    );
  }
if (isFetching && allData.length > 0) {
    return (
      <div className='h-[300px] sm:h-[600px] flex items-center justify-center'>
        <ThreeDotsLoader clss='w-12 h-12 text-[var(--text-primary)] dark:text-[var(--text-dark)]' />
      </div>
    );
  }

  // Slice the data to display only up to displayCount
  const displayedData = allData.slice(0, displayCount);

  return (
    <section className='py-[calc(100vh/6)]'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-2 xl:col-span-10'>
            <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3'>
              <div className='pb-1 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 items-center'>
                <h1 className='text-xl md:text-2xl text-[var(--primary)] dark:text-[var(--primary)]'>
                  অনুসন্ধানকৃত ফলাফল: {searchSlug}
                </h1>
                <div className='hidden w-auto items-center whitespace-nowrap justify-start min-h-[40px] md:min-h-[48px] print:hidden select-none'>
                  <div className='flex items-center'>
                    <FacebookShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      quote={"Today's news"}
                      className='flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border'
                    >
                      <FacebookIcon />
                    </FacebookShareButton>

                    <WhatsappShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      className='flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border'
                    >
                      <WhatsAppIcon />
                    </WhatsappShareButton>

                    <TwitterShareButton
                      url={currentUrl}
                      title={"Today's news"}
                      className='flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 !bg-[var(--slate)] dark:!bg-[var(--gray-1)] dark:!text-white rounded-md items-center border'
                    >
                      <svg
                        className='w-4 h-4 fill-black dark:fill-white'
                        viewBox='0 0 512 512'
                      >
                        <path d='M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z'></path>
                      </svg>
                    </TwitterShareButton>

                    <div
                      className='flex justify-center cursor-pointer text-xs h-[32px] w-[36px] mr-2 bg-[var(--slate)] dark:bg-[var(--gray-1)] dark:text-white rounded-md items-center'
                      onClick={() => navigator.clipboard.writeText(currentUrl)}
                    >
                      <CopyIcon />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12 md:col-span-7 lg:col-start-2 lg:col-span-6 xl:col-start-2 xl:col-span-7 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='flex flex-col pb-6'>
              {displayedData.map((itm: NewsItem) => {
                const {
                  news_id,
                  post_title,
                  stitle,
                  excerpt,
                  image_thumb,
                  category,
                  encode_titl,
                  time_stamp,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className='mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group'
                      href={`/${category}/${encode_titl}`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                        </div>
                      </div>
                      <h2 className='text-lg mb-2 text-[var(--dark)] dark:text-white'>
                        {post_title}
                      </h2>
                      <p className='hidden lg:block text-base mb-2 text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                        {excerpt || stitle}
                      </p>
                      <p className='text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                        {timestampToBangleDateWithTime(time_stamp)}
                      </p>
                    </Link>
                  </div>
                );
              })}
            </div>
            {!noData && (
              <div className='flex justify-center'>
                {displayedData.length < allData.length || hasMore ? (
                  <button
                    className='flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm'
                    disabled={isFetching}
                    onClick={() =>
                      setDisplayCount((prev) => prev + itemsPerPage)
                    }
                  >
                    আরও দেখুন
                    {isFetching && <Spin clss='w-7 h-7' />}
                  </button>
                ) : (
                  <p className='text-lg text-[var(--dark)] dark:text-white'>
                    আর কোন সংবাদ নেই
                  </p>
                )}
              </div>
            )}
          </div>
          <div className='hidden col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='md:sticky md:top-[4.5rem]'>
              <div className='w-full flex items-center justify-center'>
                <Image
                  src={add1?.src}
                  width={add1.width}
                  height={add1.height}
                  alt=''
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
