"use client";

/**
 * sidebar for single news details page
 */

import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
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
  if (!posts || posts.length === 0) {
    return <div className='text-center py-4'>কোনো খবর পাওয়া যায়নি</div>;
  }

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
          <div key={news_id} className='pb-2'>
            <div className='flex mb-4'>
              <div
                className={`mb-6 last:mb-0 relative ${
                  index !== posts.length - 1
                    ? "after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0.5 dark:after:bg-[var(--border-dark)]"
                    : ""
                } w-full`}
              >
                <Link
                  className='group flex items-start gap-3'
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  {/* Image on the left */}
                  <div className='overflow-hidden relative'>
                    <Image
                      alt={image_alt}
                      width={100}
                      height={60}
                      decoding='async'
                      className='w-[100px] h-[60px] object-cover group-hover:scale-105 duration-700 ease-out'
                      src={image_thumb}
                    />
                  </div>
                  {/* Title on the right */}
                  <div className='flex-1'>
                    <h3 className='text-base text-[var(--dark)] dark:text-white group-hover:text-[var(--text-primary)] cursor-pointer leading-tight'>
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

function TopNewsForNewsDetails2({ count = 6 }: { count: number }) {
  const latestData = useSWR("/populer-post", fetcher);

  if (latestData.isLoading) {
    return <div className='text-center py-4'>লোড হচ্ছে...</div>;
  }

  if (latestData.error) {
    return <div className='text-center py-4'>ডাটা লোড করতে ব্যর্থ হয়েছে</div>;
  }

  return (
    <div className='widget-tab-container md:block hidden w-full overflow-hiddenz'>
      {/* Tab Header with Orange Dots */}
      <div className='relative flex w-full  items-center justify-center py-2 '>
        <div className='flex items-center gap-2'>
          <span className='w-3 h-3 rounded-full bg-orange-500'></span>
          <h2 className='text-xl font-bold text-[#A90303] tracking-wide'>
            সর্বাধিক পঠিত
          </h2>
          <span className='w-3 h-3 rounded-full bg-orange-500'></span>
        </div>
        {/* Underline */}
        <div className='absolute bottom-0 h-1 bg-[#A90303] w-full'></div>
      </div>

      {/* Tab Panel for Latest News */}
      <div
        className='tab-panel2 px-2 py-2 h-[535px] '
        style={{
          backgroundColor: "#f9fafb",
        }}
      >
        <NewsList posts={latestData.data?.slice(0, 6) || []} />
      </div>
    </div>
  );
}

export default TopNewsForNewsDetails2;

<style jsx>{`
  .after\\:last\\:h-0:last-child::after {
    content: var(--tw-content);
    height: 1px;
  }

  .tab-panel2::-webkit-scrollbar {
    width: 3px;
  }

  .tab-panel2::-webkit-scrollbar-track {
    background: #e5e5e5;
    border-radius: 4px;
  }

  .tab-panel2::-webkit-scrollbar-thumb {
    background: #a90303;
    border-radius: 4px;
  }

  .tab-panel2::-webkit-scrollbar-thumb:hover {
    background: #8b0202;
  }
  .tab-panel2 {
    scrollbar-width: thin;
    scrollbar-color: #a90303 #e5e5e5;
  }
`}</style>;
