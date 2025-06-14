"use client";

import AddCard from "@/components/common/addCard/AddCard";
import FeaturedNewsSkeleton from "@/components/skeleton/FeaturedNewsSkeleton";
import NewsListSkeleton from "@/components/skeleton/NewsListSkeleton";
import SidebarSkeleton from "@/components/skeleton/SidebarSkeleton";
import { useGetAllNewsQuery, useGetAllTopicsQuery } from "@/redux/features/news/newsApi";
import { NewsDetails } from "@/types/newsDetails";
import { Topic } from "@/types/topic"; // Import Topic type
import TimeBefore from "@/ui/TimeBefore";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Spin from "@/ui/spin/Spin";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Skeleton from "react-loading-skeleton";
import TopNewsForNewsDetails2 from "../singleNews/top-news-for-news-details2";
import { GoDotFill } from "react-icons/go";
interface CategoryMainProps {
  categoryId?: string;
  categoryName?: string;
}

const CategoryMain = ({ categoryId, categoryName }: CategoryMainProps) => {
  const [currentLimit, setCurrentLimit] = useState(11);
  const [pageData, setPageData] = useState<NewsDetails[]>([]);
  const initialLimit = 10;
  const params = useParams();
  const searchParams = useSearchParams();
  const queryCategoryId = searchParams.get("id") || categoryId || "";
console.log(queryCategoryId);
  // Fetch news
  const {
    data: newsData,
    isLoading: isNewsLoading,
    error: newsError,
  } = useGetAllNewsQuery({
    limit: currentLimit,
    category_id: queryCategoryId,
  });

  // Fetch topics
  const {
    data: topicData,
    isLoading: isTopicsLoading,
    error: topicsError,
  } = useGetAllTopicsQuery({
    limit: 500,
    category_id: queryCategoryId,
  });
    console.log("🚀 ~ CategoryMain ~ topicData:", topicData)

  const posts = useMemo(() => newsData?.data || [], [newsData]);
  const totalPosts = newsData?.meta?.total || 0;
  const topics = useMemo(() => topicData?.data || [], [topicData]);

  useEffect(() => {
    if (posts.length > pageData.length) {
      setPageData(posts);
    }
  }, [posts, pageData.length]);

  // Handle errors
  if (newsError || topicsError) {
    return <NotFoundBody title='Error loading category or topics' />;
  }

  // Handle no data
  if (!isNewsLoading && !posts.length) {
    return (
      <NotFoundBody>
        <h2 className='text-7xl'>404</h2>
        <h3 className='text-lg my-1'>Not found</h3>
        <p>
          The content you&apos;re seeking is unavailable. You might have
          mistyped the URL.
        </p>
        <div className='mt-2'>
          <Link
            href='/'
            className='text-white text-sm py-1 px-3 bg-blue-500 rounded'
          >
            Back to Homepage
          </Link>
        </div>
      </NotFoundBody>
    );
  }

  const categoryData = {
    title: posts[0]?.category?.title || categoryName,
    topics: topics.map((topic: Topic) => ({
      topic_name: topic.title,
      slug: topic.slug,
      id: topic.id,
    })),
    add: {
      // category_21: posts[0]?.ads?.category_21 || "",
      // category_22: posts[0]?.ads?.category_22 || "",
    },
  };

  const handleLoadMore = () => {
    setCurrentLimit((prev) => prev + initialLimit);
  };

  return (
    <section className='py-[60px]'>
      <div className='container px-4 mx-auto'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3'>
          <div className='mb-0'>
            {isNewsLoading ? (
              <h1 className='text-[var(--text-primary)] text-xl md:text-2xl dark:text-white font-bold'>
                <Skeleton width={200} height={30} />
              </h1>
            ) : (
              <Link
                className='block w-fit'
                href={`/${categoryName}?id=${queryCategoryId}`}
              >
                <h1 className='text-[var(--text-primary)] text-xl md:text-2xl dark:text-white font-bold'>
                  {categoryData.title}
                </h1>
              </Link>
            )}
          </div>
          <div className='mb-3 p-3'>
            {categoryData.topics.length > 0 && (
              <GoDotFill className='inline-block mr-1 text-[var(--text-primary)] text-sm' />
            )}
            {isTopicsLoading ? (
              <Skeleton
                count={5}
                width={100}
                inline={true}
                style={{ marginRight: "1rem" }}
              />
            ) : (
              categoryData.topics.map((topic: any, i: number) => (
                <Link
                  key={i}
                  className='text-lg mr-2 hover:text-[var(--text-primary)] text-[var(--dark)] dark:text-white'
                  href={`/topics?topic_id=${topic.id}&slug=${topic.slug}`}
                >
                  {topic.topic_name}
                  {i !== categoryData.topics.length - 1 && (
                    <GoDotFill className='inline-block ml-1 text-[var(--text-primary)] text-sm' />
                  )}
                </Link>
              ))
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full after:h-0 md:after:w-[1px] md:after:h-full after:right-0 after:-bottom-3 md:after:top-0 md:after:-right-3'>
            {isNewsLoading ? (
              <FeaturedNewsSkeleton />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                <div className='col-span-12 flex flex-col lg:flex-row gap-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] last:after:h-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
                  <div className='w-full lg:w-3/5 lg:border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                    {posts.slice(0, 1).map((item: NewsDetails, i: number) => (
                      <div key={i} className='mx-0 h-full lg:px-2'>
                        <div className='relative group flex flex-col gap-3 h-full'>
                          <div className='w-full overflow-hidden relative h-[273px]'>
                            <Link
                              href={`/${categoryName}/${item.id}/${
                                item.slug ||
                                item.headline
                                  ?.replace(/%/g, "-")
                                  .replace(/\s/g, "-") ||
                                item.headline
                              }`}
                            >
                              <Image
                                alt={item.headline}
                                width={560}
                                height={380}
                                decoding='async'
                                className='group-hover:scale-105 duration-700 ease-out w-full h-full object-cover'
                                src={fileObjectToLink(item.banner_image)}
                                loading='lazy'
                              />
                            </Link>
                          </div>
                          <Link
                            href={`/${categoryName}/${item.id}/${
                              item.slug ||
                              item.headline
                                ?.replace(/%/g, "-")
                                .replace(/\s/g, "-") ||
                              item.headline
                            }`}
                          >
                            <div className='py-3 dark:bg-gray-800 border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                              <h1 className='text-xl md:text-2xl lg:text-3xl font-[600] text-[var(--dark)] dark:text-white mb-2 tracking-tight group-hover:text-[var(--text-primary)] cursor-pointer line-clamp-2'>
                                {item.short_headline && (
                                  <span className='text-[var(--text-primary)]'>
                                    {item.short_headline} /{" "}
                                  </span>
                                )}
                                {item.headline}
                              </h1>
                              <h2 className='text-lg font-[500] text-[var(--dark)] dark:text-white mb tracking-tight line-clamp-2'>
                                {item.details || "শিরোনাম নেই"}
                              </h2>
                            </div>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className='w-full lg:w-2/5'>
                    <ul className='mt-4 lg:mt-0 grid grid-cols-1 gap-6'>
                      {(() => {
                        const adImgPath = `https://i.ibb.co/RTFyHLvK/325-66.webp`;
                        const hasValidAddCard =
                          adImgPath && adImgPath.trim().length > 0;
                        const sliceEnd = hasValidAddCard ? 4 : 5;

                        return (
                          <>
                            {posts
                              .slice(1, sliceEnd)
                              .map((item: NewsDetails, i: number) => (
                                <li
                                  key={item.id}
                                  className={`relative flex group lg:flex-row items-start gap-4 ${
                                    i < 3
                                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-[1px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]"
                                      : ""
                                  }`}
                                >
                                  <div className='w-full lg:w-2/3 group'>
                                    <Link
                                      href={`/${categoryName}/${item.id}/${
                                        item.slug ||
                                        item.headline
                                          ?.replace(/%/g, "-")
                                          .replace(/\s/g, "-") ||
                                        item.headline
                                      }`}
                                    >
                                      <h1 className='text-base lg:text-lg font-semibold text-[var(--dark)] dark:text-white group-hover:text-[var(--text-primary)] line-clamp-2'>
                                        {item.short_headline && (
                                          <span className='text-[var(--text-primary)]'>
                                            {item.short_headline} /{" "}
                                          </span>
                                        )}
                                        {item.headline}
                                      </h1>
                                      <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-1 text-base line-clamp-2'>
                                        {item.details}
                                      </span>
                                    </Link>
                                  </div>
                                  <div className='w-full lg:w-1/3 relative overflow-hidden'>
                                    <Link
                                      href={`/${categoryName}/${item.id}/${
                                        item.slug ||
                                        item.headline
                                          ?.replace(/%/g, "-")
                                          .replace(/\s/g, "-") ||
                                        item.headline
                                      }`}
                                    >
                                      <Image
                                        alt={item.headline}
                                        width={120}
                                        height={80}
                                        decoding='async'
                                        className='w-full h-full md:h-[100px] lg:h-[100px] object-cover group-hover:scale-105 duration-700 ease-out'
                                        src={fileObjectToLink(
                                          item.banner_image,
                                        )}
                                        loading='lazy'
                                      />
                                    </Link>
                                  </div>
                                </li>
                              ))}
                            {hasValidAddCard && (
                              <li>
                                <AddCard
                                  imgPath={`<a target="_blank" href="https://flyghor.com/"><img width="100%" src="${adImgPath}" alt=""></a>`}
                                />
                              </li>
                            )}
                          </>
                        );
                      })()}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            {isNewsLoading ? (
              <SidebarSkeleton />
            ) : (
              <div className='w-full flex items-center justify-center'>
                <div className='h-[250px]'>
                  {/* <AddCard imgPath={categoryData.add.category_21} /> */}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            {isNewsLoading ? (
              <NewsListSkeleton />
            ) : (
              <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-right-3 md:after:[&>*:nth-child(even)]:w-0 md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 dark:after:[&>*]:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)]'>
                {pageData.slice(5).map((item: NewsDetails) => (
                  <div
                    key={item.id}
                    className='col-span-12 md:col-span-6 relative'
                  >
                    <Link
                      href={`/${categoryName}/${item.id}/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='ml-3 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                        <Image
                          alt={item.headline}
                          width={330}
                          height={186}
                          decoding='async'
                          className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={fileObjectToLink(item.banner_image)}
                          loading='lazy'
                        />
                      </div>
                      <h2 className='text-lg text-[var(--dark)] dark:text-white font-bold line-clamp-2'>
                        {item.short_headline && (
                          <span className='text-[var(--text-primary)]'>
                            {item.short_headline} /{" "}
                          </span>
                        )}
                        {item.headline}
                      </h2>
                      <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                        {item.details}
                      </span>
                      <TimeBefore title={item.publish_date} />
                    </Link>
                  </div>
                ))}
              </div>
            )}

            {totalPosts > pageData.length && (
              <div className='flex justify-center'>
                <button
                  className='flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm'
                  disabled={isNewsLoading}
                  onClick={handleLoadMore}
                >
                  আরও দেখুন {isNewsLoading && <Spin clss='w-7 h-7' />}
                </button>
              </div>
            )}
          </div>

          <div className='col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            {isNewsLoading ? (
              <SidebarSkeleton />
            ) : (
              <TopNewsForNewsDetails2 count={10} />
            )}
            <div className='mt-3 lg:sticky lg:top-[4rem]'>
              <div className='w-full flex items-center justify-center'>
                <div className='h-[250px]'>
                  {/* <AddCard imgPath={categoryData.add.category_22} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryMain;
