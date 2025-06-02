"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { NewsDetails } from "@/types/newsDetails";
import { useGetLatestNewsQuery } from "@/redux/features/news/newsApi";

type NewsProps = {
  news_id: string;
  post_title: string;
  image_thumb: string;
  image_alt: string;
  category: string;
  encode_titl: string | null;
};

function NewsList({ posts }: { posts: NewsProps[] }) {
  return (
    <div className='last:[&>*]:mb-0 after:last:[&>*]:h-0'>
      {posts.map((post, index) => (
        <div key={post.news_id} className='pb-2'>
          <div className='flex mb-4'>
            <div
              className={`mb-6 last:mb-0 relative ${
                index !== posts.length - 1
                  ? "after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0.5a dark:after:bg-[var(--border-dark)]"
                  : ""
              } w-full`}
            >
              <Link
                className='group flex items-start gap-3'
                href={`/${post.category.toLowerCase()}/${
                  post.encode_titl || post.news_id
                }`}
              >
                <span className='number-circle inline-flex items-center justify-center size-6 lg:size-6 rounded-full bg-[#fff] text-white font-bold text-sm lg:text-2xl'>
                 <Image
                   alt={`Video ${index + 1}`}
                   src={`/images/ni_logo1.png`}
                   width={25}
                   height={25}
                   className='rounded-full'
                 />
                </span>
                <div className='flex-1'>
                  <div className='md:hidden ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                    <div>
                      <Image
                        alt={post.image_alt}
                        width={330}
                        height={186}
                        decoding='async'
                        className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                        src={post.image_thumb}
                        loading='lazy'
                      />
                    </div>
                  </div>
                  <h3 className='text-lg text-[var(--dark)] dark:text-white group-hover:text-[var(--text-primary)] cursor-pointer'>
                    {post.post_title}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// TopNews component to fetch and display news
function TopNews({ count }: { count: number }) {
  const [tab1Active, setTab1Active] = useState(true);

  // Fetch the latest news using RTK Query
  const {
    data: newsResponse,
    isLoading,
    error,
  } = useGetLatestNewsQuery({ limit: count });

  // Map the API response to NewsProps
  const mappedNews: NewsProps[] =
    newsResponse?.data?.slice(0, count).map((item: NewsDetails) => ({
      news_id: item.id,
      post_title: item.headline,
      image_thumb: "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp", // Placeholder since banner_image is missing
      image_alt: item.headline || "News Image",
      category: "news", // Default category (update if category slug is available)
      encode_titl: item.slug || null,
    })) || [];

  // Handle loading and error states
  if (isLoading) {
    return <div className='text-center py-4'>Loading...</div>;
  }

  if (error) {
    return (
      <div className='text-center py-4 text-red-500'>Error loading news</div>
    );
  }

  return (
    <div className='widget-tab-container md:block hidden w-full shadow-md rounded-lg overflow-hidden'>
      <div className='relative flex w-full bg-gray-100'>
        <div
          className={`flex-1 text-center py-4 px-2 relative z-1 transition-all duration-300 ${
            tab1Active
              ? "text-[#A90303] font-extrabold bg-gradient-to-r from-[#A90303]/10 to-transparent"
              : "text-gray-700"
          }`}
          onClick={() => setTab1Active(true)}
        >
          <input
            type='radio'
            name='tab'
            className='hidden'
            checked={tab1Active}
            onChange={() => setTab1Active(true)}
          />
          <label
            className={`tab-label2 cursor-pointer lg:text-2xl tracking-wide ${
              tab1Active ? "drop-shadow-md" : ""
            }`}
          >
            সর্বশেষ
          </label>
        </div>
        <div
          className={`flex-1 text-center py-4 px-2 relative z-1 transition-all duration-300 ${
            !tab1Active
              ? "text-[#A90303] font-extrabold bg-gradient-to-l from-[#A90303]/10 to-transparent"
              : "text-gray-700"
          }`}
          onClick={() => setTab1Active(false)}
        >
          <input
            type='radio'
            name='tab'
            className='hidden'
            checked={!tab1Active}
            onChange={() => setTab1Active(false)}
          />
          <label
            className={`tab-label2 cursor-pointer lg:text-2xl tracking-wide ${
              !tab1Active ? "drop-shadow-md" : ""
            }`}
          >
            সর্বাধিক পঠিত
          </label>
        </div>
        <div
          className='absolute bottom-0 h-1 bg-[#A90303] transition-all duration-300 ease-in-out'
          style={{
            width: "50%",
            left: tab1Active ? "0%" : "50%",
          }}
        />
      </div>
      <div
        className='tab-panel2 px-4 py-2 h-[535px] overflow-y-auto'
        style={{
          display: tab1Active ? "block" : "none",
          backgroundColor: "#F0F0F0",
        }}
      >
        <NewsList posts={mappedNews} />
      </div>
      <div
        className='tab-panel2 px-4 py-2 h-[535px] overflow-y-auto'
        style={{
          display: tab1Active ? "none" : "block",
          backgroundColor: "#F0F0F0",
        }}
      >
        <NewsList posts={mappedNews} />
      </div>
    </div>
  );
}

export default TopNews;

<style jsx>{`
  .after\\:last\\:h-0:last-child::after {
    content: var(--tw-content);
    height: 1px;
  }
`}</style>;
