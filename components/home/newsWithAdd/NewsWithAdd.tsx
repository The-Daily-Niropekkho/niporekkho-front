"use client";

import AddCard from "@/components/common/addCard/AddCard";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { ICategory, Ads } from "@/types/news";

type NewsWithAddProps = {
  dataOne: ICategory;
  dataTwo: ICategory;
  ads?: Ads;
};

const NewsWithAdd = ({ dataOne, dataTwo, ads }: NewsWithAddProps) => {
  const {
    title: category_name_one,
    slug: slug_one,
    news: news_one,
  } = dataOne || {};
  const {
    title: category_name_two,
    slug: slug_two,
    news: news_two,
  } = dataTwo || {};

  return (
    <section className='mt-[60px] flex flex-col lg:flex-row gap-6 container mx-auto'>
      {/* First Section (data.data[4]) */}
      <div className='container px-4 mx-auto col-span-12 md:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-[1px] after:h-full after:top-0 after:-right-2 dark:after:bg-[var(--border-dark)]'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
          <div className='flex items-center justify-between'>
            <Link href={`/${slug_one}`}>
              <h2 className='category-text text-anchor'>{category_name_one}</h2>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='flex flex-col lg:flex-row gap-6'>
              {/* Featured News Item */}
              <div className='w-full lg:w-1/2 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 dark:after:bg-[var(--border-dark)]'>
                {news_one?.slice(0, 1)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='-mx-4 md:px-4'
                  >
                    <Link
                      className='group flex flex-col gap-3'
                      href={`/${slug_one}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='w-full'>
                        <div className='overflow-hidden relative'>
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
                      <div className='w-full'>
                        <h3 className='text-2xl mx-4 md:mx-0 mb-0 md:mb-2 text-[var(--dark)] dark:text-white font-semibold line-clamp-2 group-hover:text-[var(--text-primary)]'>
                          {item.headline}
                        </h3>
                        <p className='hidden lg:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)] mx-4 md:mx-0'>
                          <span className='line-clamp-3'>
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
                ))}
              </div>
              {/* List of Four News Items */}
              <div className='w-full lg:w-1/2 flex flex-col gap-2'>
                {news_one?.slice(1, 5)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='block w-full relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-[1px] after:last:h-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group flex items-start gap-3'
                      href={`/${slug_one}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden relative w-[124px] lg:w-[110px]'>
                        <Image
                          alt={item.headline || "News Thumbnail"}
                          width={160}
                          height={90}
                          decoding='async'
                          className='w-full h-auto lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={fileObjectToLink(item.banner_image)}
                          loading='lazy'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg text-[var(--dark)] dark:text-white line-clamp-2 font-bold group-hover:text-[var(--text-primary)]'>
                          {item.headline}
                        </h3>
                        <TimeBefore title={item.createdAt} />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className='container px-4 mx-auto col-span-12 md:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
          <div className='flex items-center justify-between'>
            <Link href={`/${slug_two}`}>
              <h2 className='category-text text-anchor'>{category_name_two}</h2>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <div className='col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='flex flex-col lg:flex-row gap-6'>
              {/* Featured News Item */}
              <div className='w-full lg:w-1/2 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 dark:after:bg-[var(--border-dark)]'>
                {news_two?.slice(0, 1)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='-mx-4 md:px-4'
                  >
                    <Link
                      className='group flex flex-col gap-3'
                      href={`/${slug_two}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='w-full'>
                        <div className='overflow-hidden relative'>
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
                      <div className='w-full'>
                        <h3 className='text-2xl mx-4 md:mx-0 mb-0 md:mb-2 text-[var(--dark)] dark:text-white font-semibold line-clamp-2 group-hover:text-[var(--text-primary)]'>
                          {item.headline}
                        </h3>
                        <p className='hidden lg:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)] mx-4 md:mx-0'>
                          <span className='line-clamp-3'>
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
                ))}
              </div>
              {/* List of Four News Items */}
              <div className='w-full lg:w-1/2 flex flex-col gap-2'>
                {news_two?.slice(1, 5)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='block w-full relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-[1px] after:last:h-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group flex items-start gap-3'
                      href={`/${slug_two}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden relative w-[124px] lg:w-[110px]'>
                        <Image
                          alt={item.headline || "News Thumbnail"}
                          width={160}
                          height={90}
                          decoding='async'
                          className='w-full h-auto lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={fileObjectToLink(item.banner_image)}
                          loading='lazy'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-lg text-[var(--dark)] dark:text-white line-clamp-2 font-bold group-hover:text-[var(--text-primary)]'>
                          {item.headline}
                        </h3>
                        <TimeBefore title={item.createdAt} />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWithAdd;
