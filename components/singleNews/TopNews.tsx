"use client";

/**
 * sidebar for single news details page
 */

import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

import "@/app/topnews.css";

interface NewsProps {
  news_id: number;
  post_title: string;
  image_thumb: string;
  image_alt: string;
  category: string;
  encode_titl: string;
}

function NewsList({ posts }: { posts: NewsProps[] }) {
  return (
    <div className='last:[&>*]:mb-0 after:last:[&>*]:h-0'>
      {posts.map((post: NewsProps, index: number) => {
        const {
          news_id,
          post_title,
          image_thumb,
          image_alt,
          category,
          encode_titl,
        } = post;
        return (
          <div key={news_id} className=' pb-2 '>
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
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <span className='number-circle inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#A90303] text-white font-bold text-sm'>
                    {`${index + 1}`.replace(
                      /\d/g,
                      (d: string) => "০১২৩৪৫৬৭৮৯"[parseInt(d, 10)],
                    )}
                  </span>
                  <div className='flex-1'>
                    <div className='md:hidden ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                      <div>
                        <Image
                          alt={image_alt}
                          width={330}
                          height={186}
                          decoding='async'
                          className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={image_thumb}
                        />
                      </div>
                    </div>
                    <h3 className='text-lg text-[var(--dark)] dark:text-white hover:text-[#A90303]'>
                      {post_title}
                    </h3>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function TopNews({ count = 10 }: { count: number }) {
  const [tab1Active, setTab1Active] = useState(true);

  const popularData = useSWR("/populer-post", fetcher);
  const latestData = useSWR("/latest-post", fetcher);

  if (popularData.isLoading || latestData.isLoading) {
    return <div></div>;
  }

  return (
    <div className='widget-tab-container md:block hidden w-full shadow-md rounded-lg overflow-hidden'>
      <div className='relative flex w-full bg-gray-100'>
        <div
          className={`flex-1 text-center py-4 px-2 relative z-10 transition-all duration-300 ${
            tab1Active
              ? "text-[#A90303] font-extrabold bg-gradient-to-r from-[#A90303]/10 to-transparent"
              : "text-gray-700"
          }`}
          onClick={() => {
            setTab1Active(true);
          }}
        >
          <input
            type='radio'
            name='tab'
            className='hidden'
            checked={tab1Active}
            onChange={() => {
              setTab1Active(true);
            }}
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
          className={`flex-1 text-center py-4 px-2 relative z-10 transition-all duration-300 ${
            !tab1Active
              ? "text-[#A90303] font-extrabold bg-gradient-to-l from-[#A90303]/10 to-transparent"
              : "text-gray-700"
          }`}
          onClick={() => {
            setTab1Active(false);
          }}
        >
          <input
            type='radio'
            name='tab'
            className='hidden'
            checked={!tab1Active}
            onChange={() => {
              setTab1Active(false);
              console.log(tab1Active);
            }}
          />
          <label
            className={`tab-label2 cursor-pointer lg:text-2xl tracking-wide ${
              !tab1Active ? "drop-shadow-md" : ""
            }`}
          >
            সর্বাধিক পঠিত
          </label>
        </div>

        {/* Animated Underline */}
        <div
          className='absolute bottom-0 h-1 bg-[#A90303] transition-all duration-300 ease-in-out'
          style={{
            width: "50%",
            left: tab1Active ? "0%" : "50%",
          }}
        />
      </div>

      <div
        className='tab-panel2 px-4 pt-5 -pb-2'
        style={{
          display: tab1Active ? "block" : "none",
          backgroundColor: "#F0F0F0",
        }}
      >
        <NewsList posts={latestData.data.slice(0, count)} />
      </div>
      <div
        className='tab-panel2 px-4 py-2'
        style={{
          display: tab1Active ? "none" : "block",
          backgroundColor: "#F0F0F0",
        }}
      >
        <NewsList posts={popularData.data.slice(0, count)} />
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
