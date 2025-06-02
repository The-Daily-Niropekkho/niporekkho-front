"use client";

import VideoIcon from "@/public/icons/VideoIcon";
import { ICategory } from "@/types/news";
import TimeBefore from "@/ui/TimeBefore";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import Link from "next/link";
import SideCategoryNews from "../sideCategoryNews/SideCategoryNews";

interface NewsWithLatestTwoProps {
  dataOne: ICategory;
  dataTwo: ICategory;
}

const NewsWithLatestTwo = ({ dataOne, dataTwo }: NewsWithLatestTwoProps) => {
  const { title: category_name, slug, news } = dataOne;

  return (
    <section className='mt-[60px] NewsWithLatestTwo'>
      <div className='container px-4 mx-auto '>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 '>
          <div className='col-span-12 lg:col-span-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:top-0 md:after:-right-3 md:after:last:w-0 dark:after:bg-[var(--border-dark)] mb-4 md:mb-0'>
            <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
              <div className='flex items-center justify-between'>
                <Link href={`/${slug}`}>
                  <h2 className='category-text text-anchor'>{category_name}</h2>
                </Link>
              </div>
            </div>
            <div className='relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
              {news?.slice(0, 1)?.map((item, i) => (
                <div
                  key={item.banner_image?.id || `news-${i}`}
                  className='-mx-4 md:px-4'
                >
                  <Link
                    className='flex flex-col md:flex-row gap-3 group mb-6'
                    href={`/${slug}/${item.id}/${
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      item.headline
                    }`}
                  >
                    <div className='w-full md:w-1/2'>
                      <div className='overflow-hidden relative'>
                        <Image
                          alt={item.headline}
                          width={560}
                          height={315}
                          decoding='async'
                          className='w-full h-auto group-hover:scale-105 duration-700 ease-out'
                          src={fileObjectToLink(item.banner_image)}
                          loading='lazy'
                        />
                        {item.video && (
                          <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                            <VideoIcon />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className='w-full md:w-1/2'>
                      <h3 className='text-2xl left-9 mx-4 md:mx-0 text-[var(--dark)] mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2 dark:text-white group-hover:text-[var(--text-primary)] font-semibold'>
                        {item.short_headline && (
                          <span className='text-[var(--text-primary)]'>
                            {item.short_headline} /{" "}
                          </span>
                        )}
                        {item.headline}
                      </h3>
                      <p className='hidden md:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                        <span className='line-clamp-2'>{item.details}</span>
                      </p>
                      <TimeBefore
                        title={item.createdAt}
                        clss='ml-4 md:ml-0 xl:absolute bottom-0 right-4'
                      />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className='flex flex-col md:flex-row gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
              {news?.slice(1, 4)?.map((item, i) => (
                <div
                  key={item.banner_image?.id || `news-${i}`}
                  className='w-full md:w-1/2 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:top-0 md:after:-right-3 md:after:last:w-0 dark:after:bg-[var(--border-dark)]'
                >
                  <Link
                    className='md:flex md:flex-col group'
                    href={`/${slug}/${item.id}/${
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      item.headline
                    }`}
                  >
                    <div className='overflow-hidden relative ml-2 md:ml-0 mb-2 float-right md:float-none'>
                      <Image
                        alt={item.headline}
                        width={330}
                        height={186}
                        decoding='async'
                        className='w-[124px] h-auto md:w-full md:h-auto group-hover:scale-105 duration-700 ease-out'
                        src={fileObjectToLink(item.banner_image)}
                        loading='lazy'
                      />
                      {item.video && (
                        <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                          <VideoIcon />
                        </div>
                      )}
                    </div>
                    <h3 className='mt-0 md:mt-2 text-lg text-[var(--dark)] group-hover:text-[var(--text-primary)] dark:text-white font-bold line-clamp-1'>
                      {item.short_headline && (
                        <span className='text-[var(--text-primary)]'>
                          {item.short_headline} /{" "}
                        </span>
                      )}
                      {item.headline}
                    </h3>
                    <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-1 text-base line-clamp-2'>
                      {item.details}
                    </span>
                    <TimeBefore title={item.createdAt} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <div className='col-span-12 lg:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
            <SideCategoryNews data={dataTwo} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWithLatestTwo;
