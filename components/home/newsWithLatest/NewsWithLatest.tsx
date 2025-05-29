"use client";

import AddCard from "@/components/common/addCard/AddCard"; // chng: For ads
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";
import fileObjectToLink from "@/utils/fileObjectToLink"; // chng: For banner_image
import { NewsItem } from "@/interface/post"; // chng: Use types
import { Ads, ICategory, INews, SideData } from "@/types/news";
import TopNews from "@/components/singleNews/TopNews";

// chng: Define dummy news data
const dummyNews: INews[] = [
  {
    id: "news-1",
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
    id: "news-2",
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
    id: "news-3",
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
  
];

type NewsWithLatestProps = {
  data: ICategory;
  sideData?: SideData;
  ads?: Ads;
  topnews: boolean;
};

const NewsWithLatest = ({
  data,
  sideData,
  ads,
  topnews,
}: NewsWithLatestProps) => {
  const { title: category_name, slug, news } = data || {};
  const { post } = sideData || {};

  return (
    <section className='mt-[60px]'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 lg:col-span-8 xl:col-span-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)] mb-7 md:mb-0'>
            <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
              <div className='flex items-center justify-between'>
                <Link href={`/${slug}`}>
                  <h2 className='category-text text-anchor'>{category_name}</h2>
                </Link>
              </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              <div className='col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-7 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
                {news?.slice(0, 1)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='-mx-4 md:px-4'
                  >
                    <div>
                      <Link
                        className='group flex flex-col gap-0 md:flex-row md:gap-3 lg:flex-col lg:gap-[16px]'
                        href={`/${slug}/${item.id}/${
                          item.slug ||
                          item.headline
                            ?.replace(/%/g, "-")
                            .replace(/\s/g, "-") ||
                          item.headline
                        }`}
                      >
                        <div className='overflow-hidden w-full md:w-1/2 lg:w-full relative'>
                          <div>
                            <Image
                              alt={item.headline || "News Image"}
                              width={560}
                              height={315}
                              decoding='async'
                              className='w-full h-auto group-hover:scale-105 duration-700 ease-out'
                              src={fileObjectToLink(item.banner_image)}
                              loading='lazy'
                            />
                          </div>
                        </div>
                        <div className='w-full md:w-1/2 lg:w-full'>
                          <h3 className='text-2xl left-9 mx-4 md:mx-0 text-[var(--dark)] mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2 dark:text-white font-semibold group-hover:text-[var(--text-primary)]'>
                            {item.headline}
                          </h3>
                          <p className='hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                            <span className='line-clamp-2'>
                              {item.details}
                            </span>
                          </p>
                          <TimeBefore
                            title={item.createdAt}
                            clss='ml-4 md:ml-0'
                          />
                        </div>
                      </Link>
                    </div>
                    <div className='mx-4 md:mx-0 flex flex-col mt-6'>
                      {news?.slice(1, 2)?.map((item, i) => (
                        <div
                          key={item.banner_image?.id || `news-${i}`}
                          className='mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]'
                        >
                          <Link
                            className='group'
                            href={`/${slug}/${item.id}/${
                              item.slug ||
                              item.headline
                                ?.replace(/%/g, "-")
                                .replace(/\s/g, "-") ||
                              item.headline
                            }`}
                          >
                            <div className='ml-2 md:ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                              <div>
                                <Image
                                  alt={item.headline || "News Thumbnail"}
                                  width={330}
                                  height={186}
                                  decoding='async'
                                  className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                                  src={fileObjectToLink(item.banner_image)}
                                  loading='lazy'
                                />
                              </div>
                            </div>
                            <h3 className='text-lg text-[var(--dark)] dark:text-white font-bold group-hover:text-[var(--text-primary)]'>
                              {item.headline}
                            </h3>
                            <p className='hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                              <span className='line-clamp-2'>
                                {item.details}
                              </span>
                            </p>
                          </Link>
                          <TimeBefore title={item.createdAt} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className='col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-5 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
                <div className='flex flex-col'>
                  {news?.slice(2, 6)?.map((item, i) => (
                    <div
                      key={item.banner_image?.id || `news-${i}`}
                      className='mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]'
                    >
                      <Link
                        className='group'
                        href={`/${slug}/${item.id}/${
                          item.slug ||
                          item.headline
                            ?.replace(/%/g, "-")
                            .replace(/\s/g, "-") ||
                          item.headline
                        }`}
                      >
                        <div className='ml-2 md:ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                          <div>
                            <Image
                              alt={item.headline || "News Thumbnail"}
                              width={330}
                              height={186}
                              decoding='async'
                              className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[160px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                              src={fileObjectToLink(item.banner_image)}
                              loading='lazy'
                            />
                          </div>
                        </div>
                        <h3 className='text-lg text-[var(--dark)] dark:text-white font-bold group-hover:text-[var(--text-primary)] line-clamp-2'>
                          {item.headline}
                        </h3>
                        {i !== news?.slice(2, 6).length - 1 && (
                          <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-1 text-base line-clamp-2'>
                            {item.details}
                          </span>
                        )}
                      </Link>
                      <TimeBefore title={item.createdAt} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-4 xl:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            {/* chng: Render ads */}

            {/* chng: Render TopNews with dummy data */}
            {topnews && <TopNews count={8} />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWithLatest;
