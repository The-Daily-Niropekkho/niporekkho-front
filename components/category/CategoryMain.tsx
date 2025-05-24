"use client";

import AddCard from "@/components/common/addCard/AddCard";
import LatestNewsVertical from "@/components/common/latestNews/LatestNewsVertical";
import { NewsItem } from "@/interface/post";
import TimeBefore from "@/ui/TimeBefore";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import Spin from "@/ui/spin/Spin";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import instance from "@/utils/instance";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import notFoundImg from "@/public/images/not-found.png";
import CategoryPageSkeleton from "@/components/skeleton/CategoryPageSkeleton";
import { useTheme } from "next-themes";
import TopNews from "../singleNews/TopNews";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faList, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import TopNewsForNewsDetails2 from "../singleNews/top-news-for-news-details2";

interface TopicType {
  topic_name: string;
  slug: string;
}
interface FeaturedNewsItem {
  post_title: string;
  post_date: string;
  image_large: string;
  image_thumb: string;
  stitle?: string;
  excerpt?: string;
  category_name?: string;
  news_id: string | number;
  category: string;
  encode_titl: string;
  video?: string;
}
const CategoryMain = () => {
  // const { theme } = useTheme();
  const [pageNumber, setPageNumber] = useState(0);
  const [pageData, setPageData] = useState<any[]>([]);
  const [isPageDataLoading, setIsPageDataLoading] = useState(false);
  const [limit, setLimit] = useState(19);

  const param = useParams();

  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    `/category-post/${param.categoryName}?page_number=${0}&limit=${limit}`,
    fetcher,
  );

  useEffect(() => {
    if (pageNumber > 0) {
      (async () => {
        setIsPageDataLoading(true);
        try {
          const { data } = await instance.get(
            `/category-post/${param.categoryName}?page_number=${pageNumber}&limit=${limit}`,
          );

          setPageData((prev) => [...prev, ...data.data.posts]);
        } catch (error) {
          console.error(error);
        } finally {
          setIsPageDataLoading(false);
        }
      })();
    }
  }, [pageNumber, param.categoryName, limit]);

  // decide what to render
  //@TODO: When the error occurred
  if (error)
    return <NotFoundBody title={` ${error.message}`} img={notFoundImg} />;

  //@TODO: When the loading
  if (isLoading) return <CategoryPageSkeleton />;

  //@TODO: When No data found
  if (!data?.posts?.length)
    return (
      <NotFoundBody title=''>
        <h2 className='text-7xl '>404</h2>
        <h3 className='text-2xl my-1 '>Not found anything</h3>
        <p className=''>
          What you are looking for was not found. Maybe you&apos;re looking for
          it wrong.
        </p>
        <div className='mt-10'>
          <Link
            href='/'
            className='text-lg text-white py-2 px-4 bg-[var(--primary)]  rounded-md'
          >
            Back to Home
          </Link>
        </div>
      </NotFoundBody>
    );

  return (
    <section className='py-[60px]'>
      <div className='container px-4 mx-auto'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3'>
          <div className='mb-0'>
            <Link className='block w-fit' href={`/${param?.categoryName}`}>
              <h1 className='text-[var(--text-primary)] text-xl md:text-2xl dark:text-white font-bold'>
                {data?.category?.name}
              </h1>
            </Link>
          </div>
          <div className='flex pt-6'>
            {data.subcategories.map((subCategorySlug: string) => (
              <div key={subCategorySlug} className='pr-10'>
                <FontAwesomeIcon icon={faDotCircle} className='text-xs mr-1' />
                <Link href={`/${param.categoryName}/${subCategorySlug}`}>
                  {subCategorySlug}
                </Link>
              </div>
            ))}
          </div>
          <div className='mb-3 p-3'>
            {data?.topics?.map((category: TopicType, i: number) => {
              const { topic_name, slug } = category;
              return (
                <Link
                  key={i}
                  className=' text-lg mr-3 last:mr-0 relative after:text-[var(--dark)] after:content-["-"] after:ml-3 last:after:hidden  dark:after:text-[var(--gray-2)]'
                  href={`/topic/${slug}`}
                >
                  {topic_name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full after:h-0 md:after:w-[1px] md:after:h-full after:right-0 after:-bottom-3 md:after:top-0 md:after:-right-3'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              <div className='col-span-12 flex flex-col lg:flex-row gap-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] last:after:h-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
                {/* Left Section: Featured News Item */}
                <div className='w-full lg:w-3/5 lg:border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                  {data?.posts.slice(0, 1)?.map((itm: FeaturedNewsItem, i: number) => {
                    const {
                      post_title,
                      post_date,
                      image_large,
                      stitle,
                      excerpt,
                      category_name,
                      news_id,
                      category,
                      encode_titl,
                      video,
                    } = itm || {};

                    return (
                      <div key={i} className='mx-0 h-full lg:px-2'>
                        <div className='relative group flex flex-col gap-3 h-full'>
                          {/* Image Section */}
                          <div className='w-full overflow-hidden  relative h-[273px]'>
                            <Link
                              href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                            >
                              <Image
                                alt={post_title}
                                width={560}
                                height={380}
                                decoding='async'
                                className='group-hover:scale-105 duration-700 ease-out w-full h-full object-cover'
                                src={image_large}
                              />
                              {/* <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none' /> */}

                             
                            </Link>
                          </div>
                          <Link
                            href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                          >
                            {/* Text Section */}
                            <div className=' py-3  dark:bg-gray-800  border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                              {/* Title Moved Here */}
                              <h1 className='text-xl md:text-2xl lg:text-3xl font-[600] text-[var(--dark)] dark:text-white mb-2 tracking-tight group-hover:text-[var(--text-primary)] cursor-pointer'>
                                {post_title}
                              </h1>
                              <h2 className='text-lg font-[500] text-[var(--dark)] dark:text-white mb tracking-tight'>
                                {stitle || "শিরোনাম নেই"}
                              </h2>
                              {/* <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 leading-relaxed'>
                              {excerpt || "বিস্তারিত তথ্য নেই"}
                            </p> */}
                              {/* <div className='text-xs flex justify-between items-center text-gray-500 dark:text-gray-400'>
                                <span>{"২ ঘণ্টা আগে"}</span>
                                <span>{category_name || "অজানা সূত্র"}</span>
                              </div> */}
                            </div>
                          </Link>
                        </div>
                      </div>
                    );
                  })}


                </div>

                {/* Right Section: List of News Items */}
                <div className='w-full lg:w-2/5'>
                  <ul className='mt-4 lg:mt-0 grid grid-cols-1 gap-6'>
                    {(() => {
                      const adImgPath = `https://i.ibb.co/RTFyHLvK/325-66.webp`;
                      const hasValidAddCard =
                        adImgPath && adImgPath.trim().length > 0;
                      const sliceEnd = hasValidAddCard ? 4 : 5;

                      return (
                        <>
                          {data.posts
                            .slice(1, sliceEnd)
                            .map((itm: FeaturedNewsItem, i: number) => {
                              const {
                                encode_titl,
                                post_title,
                                news_id,
                                image_thumb,
                                category,
                                excerpt,
                                stitle,
                              } = itm || {};
                              return (
                                <li
                                  key={news_id}
                                  className={`relative flex group lg:flex-row items-start gap-4 ${
                                    i < 3
                                      ? "after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-[1px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]"
                                      : ""
                                  }`}
                                >
                                  <div className='w-full lg:w-2/3 group'>
                                    <Link
                                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                                    >
                                      <h1 className='text-base lg:text-lg font-semibold text-[var(--dark)] dark:text-white group-hover:text-[var(--text-primary)] line-clamp-2'>
                                        {post_title}
                                      </h1>
                                      <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-1 text-base line-clamp-2'>
                                        {excerpt || stitle}
                                      </span>
                                    </Link>
                                  </div>
                                  <div className='w-full lg:w-1/3 relative overflow-hidden'>
                                    <Link
                                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                                    >
                                      <Image
                                        alt={post_title}
                                        width={120}
                                        height={80}
                                        decoding='async'
                                        className='w-full h-full md:h-[100px] lg:h-[100px] object-cover group-hover:scale-105 duration-700 ease-out'
                                        src={image_thumb}
                                      />
                                      <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none' />
                                    </Link>
                                  </div>
                                </li>
                              );
                            })}
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
          </div>
          <div className='col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='w-full flex items-center justify-center'>
              <div className='h-[250px]'>
                <AddCard imgPath={data?.add.category_21} />
              </div>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-6 mb-6 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:right-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-right-3 md:after:[&>*:nth-child(even)]:w-0  md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 dark:after:[&>*]:bg-[var(--border-dark)] dark:before:[&>*]:bg-[var(--border-dark)]'>
              {data?.posts?.slice(5).map((itm: NewsItem) => {
                const {
                  category,
                  news_id,
                  post_date,
                  post_title,
                  encode_titl,
                  image_thumb,
                  excerpt,
                  stitle,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className='col-span-12 md:col-span-6 relative'
                  >
                    <Link
                      className=''
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className='ml-3 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                        </div>
                      </div>
                      <h2 className='text-lg text-[var(--dark)]    dark:text-white    font-bold'>
                        {post_title}
                      </h2>
                      <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                        {excerpt || stitle}
                      </span>

                      <TimeBefore title={post_date} />
                    </Link>
                  </div>
                );
              })}

              {pageData?.map((itm: NewsItem) => {
                const {
                  category,
                  news_id,
                  post_date,
                  post_title,
                  encode_titl,
                  image_thumb,
                  excerpt,
                  stitle,
                } = itm;
                return (
                  <div
                    key={news_id}
                    className='col-span-12 md:col-span-6 relative'
                  >
                    <Link
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className='ml-3 mb-2 xl:mb-0 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post_title}
                            width={330}
                            height={186}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] xl:w-[180px] xl:h-[120px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                        </div>
                      </div>
                      <h2 className='text-lg text-[var(--dark)]    dark:text-white   font-bold'>
                        {post_title}
                      </h2>
                      <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                        {excerpt || stitle}
                      </span>

                      <TimeBefore title={post_date} />
                    </Link>
                  </div>
                );
              })}
            </div>

            {data?.posts_count > data?.posts.length + pageData?.length ? (
              <div className='flex justify-center'>
                <button
                  className='flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-white text-lg bg-[var(--primary)] px-4 py-2 hover:bg-[var(--primary)] rounded-sm '
                  disabled={isPageDataLoading}
                  onClick={() => {
                    setPageNumber((prev) => prev + 1);
                  }}
                >
                  আরও দেখুন {isPageDataLoading && <Spin clss='w-7 h-7' />}
                </button>
              </div>
            ) : (
              ""
            )}
          </div>

          <div className='col-span-12 lg:col-span-4 xl:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <TopNewsForNewsDetails2 count={10} />
            <div className='-mt-3 hidden'>
              <div>
                <div className='mt-3 mb-3 border-[var(--border-color)] border-t-2 border-b-[2px] dark:border-[var(--border-dark)]'>
                  <h4 className='text-[var(--primary)] text-xl md:text-2xl dark:text-white'>
                    Latest news
                  </h4>
                </div>
                <LatestNewsVertical />
              </div>
            </div>
            <div className='mt-3 lg:sticky lg:top-[4rem]'>
              <div className='w-full flex items-center justify-center'>
                <div className='h-[250px]'>
                  <AddCard imgPath={data?.add.category_22} />
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
