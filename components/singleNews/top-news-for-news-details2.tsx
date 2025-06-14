// src/components/singleNews/TopNewsForNewsDetails2.tsx
"use client";

/**
 * sidebar for single news details page
 */

import Image from "next/image";
import Link from "next/link";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { useGetTopReadNewsQuery } from "@/redux/features/news-utils/newsUtilsApi";

// Define interfaces (aligned with previous code)
interface NewsUtils {
  id: string;
  news_id: string;
  total_share: number;
  total_like: number;
  total_comment: number;
  total_view: number;
  news: News;
}

interface News {
  id: string;
  headline: string;
  short_headline: string;
  publish_date: string;
  slug: string;
  category: Category;
  banner_image?: {
    url: string;
  };
}

interface Category {
  id: string;
  slug: string;
  title: string;
}

interface NewsProps {
  news_id: string;
  post_title: string;
  image_thumb: string;
  image_alt: string;
  category: string; // Category slug
  slug: string;
}

function NewsList({ posts }: { posts: NewsProps[] }) {
  if (!posts || posts.length === 0) {
    return <div className='text-center py-4'>কোনো খবর পাওয়া যায়নি</div>;
  }

  return (
    <div className='last:[&>*]:mb-0 after:last:[&>*]:h-0'>
      {posts.map((post: NewsProps, index: number) => {
        const { news_id, post_title, image_thumb, image_alt, category, slug } =
          post;
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
                  href={`/${category.toLowerCase()}/${news_id}/${slug}`} // Updated link structure: /categorytitle/newsid/slug
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
                      loading='lazy'
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

function TopNewsForNewsDetails2({ count = 10 }: { count: number }) {
  // Fetch the most-read news using RTK Query
  const {
    data: topReadNewsResponse,
    isLoading: isTopReadLoading,
    error: topReadError,
  } = useGetTopReadNewsQuery({ limit: count });

  // Map the API response to NewsProps
  const topReadNews: NewsProps[] =
    topReadNewsResponse?.data?.slice(0, count).map((item: NewsUtils) => ({
      news_id: item.news_id,
      post_title: item.news.headline,
      image_thumb:
        fileObjectToLink(item.news.banner_image ?? null) ||
        "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp", // Use banner_image if available, else placeholder
      image_alt: item.news.headline || "News Image",
      category: item.news.category?.slug || "news", // Use category slug, fallback to "news"
      slug: item.news.slug,
    })) || [];

  // Handle loading and error states
  if (isTopReadLoading) {
    return <div className='text-center py-4'>লোড হচ্ছে...</div>;
  }

  if (topReadError) {
    return <div className='text-center py-4'>ডাটা লোড করতে ব্যর্থ হয়েছে</div>;
  }

  return (
    <div className='widget-tab-container md:block hidden w-full overflow-hidden'>
      {/* Tab Header with Orange Dots */}
      <div className='relative flex w-full items-center justify-center py-2'>
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

      {/* Tab Panel for Most Read News */}
      <div
        className='tab-panel2 px-4 py-2 h-[535px] overflow-y-auto'
        style={{
          backgroundColor: "#f9fafb",
        }}
      >
        <NewsList posts={topReadNews} />
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
