"use client";

import AddCard from "@/components/common/addCard/AddCard";
import VideoEmbed from "@/components/VideoEmbed";
import VideoIcon from "@/public/icons/VideoIcon";
import { Ads, ICategory, } from "@/types/news";
import TimeBefore from "@/ui/TimeBefore";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import Link from "next/link";

interface NewsRelatedWithAddProps {
  data: ICategory;
  ads?: Ads;
  videos?: string[];
}

const NewsRelatedWithAdd = ({ data, ads, videos }: NewsRelatedWithAddProps) => {
  const { title: category_name, slug, news } = data;

  return (
    <section className='mt-[60px]'>
      <div className='container px-4 mx-auto'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
          <div className='flex items-center justify-between'>
            <Link href={`/${slug}`}>
              <h2 className='category-text text-anchor'>{category_name}</h2>
            </Link>
          </div>
        </div>

        {slug === "video" ? (
          <div className='grid grid-cols-1 md:grid-cols-12 gap-8 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
            {videos?.map((video, index) => (
              <div
                key={index}
                className='col-span-6 md:col-span-6 lg:col-span-3 xl:col-span-3 relative after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'
              >
                <VideoEmbed videoUrl={video} width={100} />
              </div>
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
            <div className='col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-5 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
              {news?.slice(0, 1)?.map((item, i) => (
                <div
                  key={item.banner_image?.id || `news-${i}`}
                  className='-mx-4 md:px-4'
                >
                  <Link
                    className='group flex flex-col gap-0 md:flex-row md:gap-3 lg:flex-col lg:gap-0'
                    href={`/${slug}/${item.id}/${
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      item.headline
                    }`}
                  >
                    <div className='overflow-hidden w-full md:w-1/2 lg:w-full relative'>
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
                    <div className='w-full md:w-1/2 lg:w-full'>
                      <h3 className='text-2xl left-9 mx-4 md:mx-0 mt-2 md:mt-0 lg:mt-2 mb-0 md:mb-2 text-[var(--dark)] group-hover:text-[var(--text-primary)] dark:text-white line-clamp-2 font-semibold'>
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
                      <TimeBefore title={item.createdAt} clss='ml-4 md:ml-0' />
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
              <div className='flex flex-col'>
                {news?.slice(1, 5)?.map((item, i) => (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group'
                      href={`/${slug}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                        <Image
                          alt={item.headline}
                          width={160}
                          height={90}
                          decoding='async'
                          className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={fileObjectToLink(item.banner_image)}
                          loading='lazy'
                        />
                        {item.video && (
                          <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                            <VideoIcon />
                          </div>
                        )}
                      </div>
                      <h3 className='text-lg text-[var(--dark)] group-hover:text-[var(--text-primary)] dark:text-white line-clamp-2 font-bold'>
                        {item.short_headline && (
                          <span className='text-[var(--text-primary)]'>
                            {item.short_headline} /{" "}
                          </span>
                        )}
                        {item.headline}
                      </h3>
                      <p className='text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]'>
                        <span className='line-clamp-1'>{item.details}</span>
                      </p>
                      <TimeBefore title={item.createdAt} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 md:after:w-[1px] md:after:h-full md:after:-right-3 md:after:top-0 md:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
              <div className='flex justify-center mb-0 last:mb-0 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]'>
                <div className='w-full flex items-center justify-center'>
                  <AddCard
                    imgPath={`<a target="_blank" href="${ads?.home_12?.link}"><img width="100%" src="${ads?.home_12?.url}" alt="Advertisement"></a>`}
                  />
                </div>
              </div>
              <div className='flex flex-col mt-5'>
                {news?.slice(5, 6)?.map((item, i) => (
                  <Link
                    key={item.banner_image?.id || `news-${i}`}
                    className='group'
                    href={`/${slug}/${item.id}/${
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      item.headline
                    }`}
                  >
                    <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                      <Image
                        alt={item.headline}
                        width={330}
                        height={186}
                        decoding='async'
                        className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                        src={fileObjectToLink(item.banner_image)}
                        loading='lazy'
                      />
                    </div>
                    <h3 className='text-lg text-[var(--dark)] line-clamp-3 dark:text-white font-bold'>
                      {item.short_headline && (
                        <span className='text-[var(--text-primary)]'>
                          {item.short_headline} /{" "}
                        </span>
                      )}
                      {item.headline}
                    </h3>
                    <TimeBefore title={item.createdAt} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsRelatedWithAdd;