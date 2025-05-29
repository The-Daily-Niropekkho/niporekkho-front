"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import fileObjectToLink from "@/utils/fileObjectToLink"; // chng: For banner_image
import { INews } from "@/types/news";

// chng: Use dummy news data
const dummyNews: INews[] = [
  {
    id: "1",
    headline: "ঢাকায় ভারী বৃষ্টিপাত, জনজীবন বিপর্যস্ত",
    short_headline: "ঢাকায় বৃষ্টি",
    details: "রাজধানী ঢাকায় গতকাল রাত থেকে ভারী বৃষ্টিপাত চলছে।",
    slug: "dhaka-heavy-rain",
    createdAt: "2025-05-25T10:00:00.000Z",
    updatedAt: "2025-05-25T10:00:00.000Z",
    banner_image: {
      id: "img-1",
      url: "https://via.placeholder.com/560x315",
      originalUrl: "https://via.placeholder.com/560x315",
      mimetype: "image/jpeg",
      filename: "rain.jpg",
      modifyFileName: "rain-modified.jpg",
      path: "/uploads/rain.jpg",
      cdn: "https://via.placeholder.com",
      fileUniqueId: "unique-1",
      size: 100000,
      platform: "cloud",
      createdAt: "2025-05-25T10:00:00.000Z",
      updatedAt: "2025-05-25T10:00:00.000Z",
      is_deleted: false,
      status: "active",
      type: "image",
      created_by_id: "user-1",
      fileType: "jpg",
    },
  },
  {
    id: "2",
    headline: "বাংলাদেশের অর্থনীতি: নতুন সম্ভাবনা",
    short_headline: "অর্থনীতির উন্নতি",
    details: "বাংলাদেশের অর্থনীতি নতুন উচ্চতায় পৌঁছেছে।",
    slug: "economy-growth",
    createdAt: "2025-05-25T09:30:00.000Z",
    updatedAt: "2025-05-25T09:30:00.000Z",
    banner_image: {
      id: "img-2",
      url: "https://via.placeholder.com/330x186",
      originalUrl: "https://via.placeholder.com/330x186",
      mimetype: "image/jpeg",
      filename: "economy.jpg",
      modifyFileName: "economy-modified.jpg",
      path: "/uploads/economy.jpg",
      cdn: "https://via.placeholder.com",
      fileUniqueId: "unique-2",
      size: 80000,
      platform: "cloud",
      createdAt: "2025-05-25T09:30:00.000Z",
      updatedAt: "2025-05-25T09:30:00.000Z",
      is_deleted: false,
      status: "active",
      type: "image",
      created_by_id: "user-1",
      fileType: "jpg",
    },
  },
  {
    id: "3",
    headline: "ক্রিকেট: বাংলাদেশের জয়",
    short_headline: "টাইগারদের জয়",
    details: "বাংলাদেশ ক্রিকেট দল নিউজিল্যান্ডকে হারিয়েছে।",
    slug: "cricket-victory",
    createdAt: "2025-05-25T09:00:00.000Z",
    updatedAt: "2025-05-25T09:00:00.000Z",
    banner_image: {
      id: "img-3",
      url: "https://via.placeholder.com/330x186",
      originalUrl: "https://via.placeholder.com/330x186",
      mimetype: "image/jpeg",
      filename: "cricket.jpg",
      modifyFileName: "cricket-modified.jpg",
      path: "/uploads/cricket.jpg",
      cdn: "https://via.placeholder.com",
      fileUniqueId: "unique-3",
      size: 90000,
      platform: "cloud",
      createdAt: "2025-05-25T09:00:00.000Z",
      updatedAt: "2025-05-25T09:00:00.000Z",
      is_deleted: false,
      status: "active",
      type: "image",
      created_by_id: "user-1",
      fileType: "jpg",
    },
  },
  {
    id: "4",
    headline: "শিক্ষা সংস্কারে নতুন উদ্যোগ",
    short_headline: "শিক্ষা সংস্কার",
    details: "সরকার শিক্ষা খাতে নতুন সংস্কার চালু করেছে।",
    slug: "education-reform",
    createdAt: "2025-05-25T08:30:00.000Z",
    updatedAt: "2025-05-25T08:30:00.000Z",
    banner_image: {
      id: "img-4",
      url: "https://via.placeholder.com/330x186",
      originalUrl: "https://via.placeholder.com/330x186",
      mimetype: "image/jpeg",
      filename: "education.jpg",
      modifyFileName: "education-modified.jpg",
      path: "/uploads/education.jpg",
      cdn: "https://via.placeholder.com",
      fileUniqueId: "unique-4",
      size: 85000,
      platform: "cloud",
      createdAt: "2025-05-25T08:30:00.000Z",
      updatedAt: "2025-05-25T08:30:00.000Z",
      is_deleted: false,
      status: "active",
      type: "image",
      created_by_id: "user-1",
      fileType: "jpg",
    },
  },
  {
    id: "5",
    headline: "পরিবেশ দূষণে উদ্বেগ",
    short_headline: "পরিবেশ দূষণ",
    details: "ঢাকার বায়ু দূষণ নিয়ন্ত্রণে জরুরি পদক্ষেপ প্রয়োজন।",
    slug: "pollution-concern",
    createdAt: "2025-05-25T08:00:00.000Z",
    updatedAt: "2025-05-25T08:00:00.000Z",
    banner_image: {
      id: "img-5",
      url: "https://via.placeholder.com/330x186",
      originalUrl: "https://via.placeholder.com/330x186",
      mimetype: "image/jpeg",
      filename: "pollution.jpg",
      modifyFileName: "pollution-modified.jpg",
      path: "/uploads/pollution.jpg",
      cdn: "https://via.placeholder.com",
      fileUniqueId: "unique-5",
      size: 87000,
      platform: "cloud",
      createdAt: "2025-05-25T08:00:00.000Z",
      updatedAt: "2025-05-25T08:00:00.000Z",
      is_deleted: false,
      status: "active",
      type: "image",
      created_by_id: "user-1",
      fileType: "jpg",
    },
  },
 
];

type NewsProps = {
  news_id: string; // chng: Changed to string to match banner_image.id
  post_title: string;
  image_thumb: string;
  image_alt: string;
  category: string;
  encode_titl: string;
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
                href={`/${post.category.toLowerCase()}/${post.encode_titl}`}
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

function TopNews({ count }: { count: number }) {
  const [tab1Active, setTab1Active] = useState(true);

  // chng: Map dummyNews to NewsProps
  const mappedNews: NewsProps[] = dummyNews.slice(0, count).map((item, i) => ({
    news_id: item.banner_image?.id || `news-${i}`,
    post_title: item.headline,
    image_thumb: fileObjectToLink(item.banner_image),
    image_alt: item.headline || "News Image",
    category: "news", // chng: Default category
    encode_titl: item.slug ?? "",
  }));

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
