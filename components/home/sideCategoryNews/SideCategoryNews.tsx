"use client";

import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";
import { ICategory, INews } from "@/types/news";
import fileObjectToLink from "@/utils/fileObjectToLink";

interface SideCategoryNewsProps {
  data: ICategory;
}

const SideCategoryNews = ({ data }: SideCategoryNewsProps) => {
  const { title: category_name, slug, news } = data;

  return (
    <>
      <div className='SideCategoryNews border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
        <div className='flex items-center justify-between'>
          <Link href={`/${slug}`}>
            <h2 className='category-text text-anchor'>{category_name}</h2>
          </Link>
        </div>
      </div>
      <div className='flex flex-col'>
        {news?.slice(0, 4).map((item, i) => (
          <div
            key={item.banner_image?.id || `news-${i}`}
            className='mb-6 last:mb-0 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:last:h-0 dark:after:bg-[var(--border-dark)]'
          >
            <div className='-mx-4 md:px-4'>
              <Link className='group block' href={`/${slug}/${item.slug}`}>
                <div className='ml-0 lg:ml-2 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                  <Image
                    alt={item.headline}
                    width={180}
                    height={103}
                    decoding='async'
                    className='w-full h-auto md:w-[124px] md:h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[103px] object-cover group-hover:scale-105 duration-700 ease-out'
                    src={fileObjectToLink(item.banner_image)}
                    loading='lazy'
                  />
                </div>
                <h3 className='mx-4 md:mx-0 text-lg text-[var(--dark)] group-hover:text-[var(--text-primary)] dark:text-white font-bold'>
                  {item.headline}
                </h3>
              </Link>
              <TimeBefore title={item.createdAt} clss='ml-4 md:ml-0' />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SideCategoryNews;
