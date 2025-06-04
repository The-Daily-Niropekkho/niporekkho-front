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
import { Suspense, useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import add1 from "/public/images/add1.png";
import date_output_bn from "@/utils/datetime";

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

// Utility function to highlight search term in text
const highlightSearchTerm = (text: string, searchTerm: string): JSX.Element => {
  if (!searchTerm.trim()) return <>{text}</>;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, index) =>
        regex.test(part) ? (
          <span key={index} className='text-red-600'>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
};

// Main Search Page Component (without useSearchParams)
function SearchPageContent() {
  const [allData, setAllData] = useState<NewsItem[]>([]);
  const [displayCount, setDisplayCount] = useState(10);
  const [offset, setOffset] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const [noData, setNoData] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isParamChanging, setIsParamChanging] = useState(false);
  const itemsPerPage = 10;
  const fetchLimit = 20;

  const searchParams = useSearchParams();
  const searchSlug = searchParams.get("search_slug") || "";

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

  useEffect(() => {
    setIsParamChanging(true);
    setAllData([]);
    setDisplayCount(10);
    setOffset(0);
    setNoData(false);
    setHasMore(true);

    const timer = setTimeout(() => {
      setIsParamChanging(false);
      if (searchSlug.trim()) {
        refetch();
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [searchSlug, refetch]);

  useEffect(() => {
    if (searchData && searchData.data && !isParamChanging) {
      const mappedData = searchData.data.map(mapToNewsItem);
      setAllData(mappedData);
      setNoData(mappedData.length === 0);
      setHasMore(mappedData.length === fetchLimit);
    }
  }, [searchData, isParamChanging]);

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

  useEffect(() => {
    const currentUrl = window.location.href;
    setCurrentUrl(currentUrl);
  }, []);

  if (error) {
    return (
      <div className='h-[300px] sm:h-[600px] flex items-center justify-center text-3xl text-[var(--dark)] dark:text-white'>
        {error instanceof Error ? error.message : "An error occurred"}
      </div>
    );
  }

  if (isLoading && offset === 0) return <SearchPageSkeleton />;

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

  const displayedData = allData.slice(0, displayCount);

  return (
    <section className='py-8 sm:py-12 md:py-16'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6'>
          <div className='col-span-12 lg:col-start-2 lg:col-span-10 xl:col-start-2 xl:col-span-10'>
            <div className='border-b-[2px] border-[var(--border-color)] dark:border-[var(--border-dark)] mb-3'>
              <div className='pb-1 flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 items-center'>
                <h1 className='text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] dark:text-[var(--primary)]'>
                  অনুসন্ধানকৃত ফলাফল:{" "}
                  <span className='font-bold'>{`"${searchSlug}"`}</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6'>
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
                    className='mb-4 sm:mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-2 sm:after:-bottom-3 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4'
                      href={`/${category}/${news_id}/${encode_titl}`}
                    >
                      <div className='w-full sm:w-[120px] md:w-[130px] lg:w-[150px] xl:w-[190px] overflow-hidden relative'>
                        <Image
                          alt={post_title}
                          width={330}
                          height={186}
                          decoding='async'
                          className='w-full h-auto sm:h-[80px] md:h-[95px] xl:h-[120px] group-hover:scale-105 duration-700 ease-out object-cover'
                          src={image_thumb}
                          loading='lazy'
                        />
                      </div>
                      <div className='flex-1'>
                        <h2 className='text-base sm:text-lg md:text-xl mb-1 sm:mb-2 text-[var(--dark)] dark:text-white leading-tight'>
                          {highlightSearchTerm(post_title, searchSlug)}
                        </h2>
                        <p className='hidden sm:block text-sm md:text-base mb-1 sm:mb-2 text-[var(--gray-2)] dark:text-[var(--gray-3)] line-clamp-2'>
                          {highlightSearchTerm(excerpt || stitle, searchSlug)}
                        </p>
                        <p className='text-xs sm:text-sm md:text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                          {date_output_bn(String(time_stamp))}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            {allData.length === 0 ? (
              <p className='text-base sm:text-lg text-center text-[var(--dark)] dark:text-white'>
                আপনার অনুসন্ধানের কোন সংবাদ নেই
              </p>
            ) : (
              !noData && (
                <div className='flex justify-center mt-4'>
                  {displayedData.length < allData.length || hasMore ? (
                    <button
                      className='flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-base sm:text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm'
                      disabled={isFetching}
                      onClick={() =>
                        setDisplayCount((prev) => prev + itemsPerPage)
                      }
                    >
                      আরও দেখুন
                      {isFetching && <Spin clss='w-6 h-6 sm:w-7 sm:h-7' />}
                    </button>
                  ) : (
                    <p className='text-base sm:text-lg text-[var(--dark)] dark:text-white'>
                      আর কোন সংবাদ নেই
                    </p>
                  )}
                </div>
              )
            )}
          </div>
          <div className='col-span-12 md:col-span-5 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)] '>
            <div className='md:sticky md:top-[4.5rem]'>
              <div className='w-full flex items-center justify-center'>
                <Image
                  src={add1?.src}
                  width={add1.width}
                  height={add1.height}
                  alt='Advertisement'
                  className='w-full h-auto max-w-[300px] md:max-w-[250px] lg:max-w-[300px]'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchPageSkeleton />}>
      <SearchPageContent />
    </Suspense>
  );
}
