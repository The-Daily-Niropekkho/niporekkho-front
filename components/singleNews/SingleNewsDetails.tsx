"use client";

import PrintIcon from "@/public/icons/PrintIcon";
import { NewsDetails } from "@/types/newsDetails";
import Breadcrumb from "@/ui/Breadcrumb";
import date_output_bn from "@/utils/datetime";
import fileObjectToLink, { getReporter } from "@/utils/fileObjectToLink";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { FaCopy, FaHome } from "react-icons/fa";
import AddCard from "../common/addCard/AddCard";
import FacebookComments from "../facebook-comment/facebook-comment";
import TopNewsForNewsDetails from "./top-news-for-news-details";
import {
  useGetSingleNewsQuery,
  useShareNewsMutation,
} from "@/redux/features/news/newsApi";
import { ca } from "date-fns/locale";

interface SingleNewsDetailsProps {
  data: NewsDetails & { relatedPost: NewsDetails[] };
  clss?: string;
  news_id: string;
}

const SingleNewsDetails = ({ data, clss, news_id }: SingleNewsDetailsProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [hostName, setHostName] = useState("");
  const [fontSize, setFontSize] = useState(20);
  const [showTooltip, setShowTooltip] = useState(false);
  const MIN_FONT_SIZE = 14;
  const MAX_FONT_SIZE = 28;

  const [shareNews] = useShareNewsMutation();
  const { data: newsData, refetch } = useGetSingleNewsQuery({ news_id });
console.log(newsData)
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, MAX_FONT_SIZE));
  };

  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, MIN_FONT_SIZE));
  };

  const printRef = useRef<HTMLElement | null>(null);
  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    const currentUrl = window.location.href;
    const hostUrl = window.location.host;
    setHostName(hostUrl);
    setCurrentUrl(currentUrl);
  }, []);

  const shareUrl = `${hostName}/${data.category?.slug}/${data.id}/${data.slug}`;
  const shareTitle = data.headline;
  const shareDescription = data.excerpt || data.short_headline || "";

  // Handle share action
  const handleShare = async (platform: string) => {
    try {
      await shareNews({ news_id, platform }).unwrap();
      refetch(); // Refetch to update share count
      // AddToAny will handle the actual sharing via its script
    } catch (error) {
      console.error("Failed to share news:", error);
    }
  };

  const breadcrumbItems = [
    { label: <FaHome />, href: "/" },
    {
      label: data.category?.title,
      href: `/${data.category?.slug}?id=${data.category?.id}`,
    },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && window.a2a) {
      window.a2a.init_all();
    }
  }, [
    data.id,
    data.headline,
    data.category?.slug,
    data.excerpt,
    data.short_headline,
  ]);

  const repo = getReporter(data);
  const title =
    repo.type === "reporter"
      ? `${repo.data.first_name} ${repo.data.last_name}`
      : repo.type === "generic_reporter"
      ? repo.data.name
      : "Unknown Reporter";
  const image =
    repo.type === "reporter" ? repo?.data?.profile_image : repo?.data?.photo;

  const totalShares =
    newsData?.data?.newsUtils?.total_share ?? data.newsUtils?.total_share ?? 0;
    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowTooltip(true);
        await shareNews({ news_id, platform: "share" }).unwrap();
        refetch();
        setTimeout(() => setShowTooltip(false), 2000);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    };
  
  return (
    <div className={clss}>
      <div className='container px-4 mx-auto print:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 print:!block'>
          <div className='col-span-12 lg:col-span-8 xl:col-span-9 relativez after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3 lg:after:w-[1px] lg:after:h-full dark:after:bg-[var(--border-dark)] print:!col-span-12 print:after:bg-transparent'>
            <article ref={printRef}>
              <div className='mb-3'>
                <Breadcrumb items={breadcrumbItems} />
                <h2
                  style={{ fontSize: "1.2em" }}
                  className='my-1 print:hidden text-blue-500'
                >
                  {data.excerpt || data.short_headline}
                </h2>
                <h1
                  style={{ fontWeight: "bold" }}
                  className='text-[var(--dark)] text-3xl lg:text-3xl leading-[40px] lg:leading-[50px] mb-6 dark:text-white print:dark:text-[var(--dark)] print:text-2xl print:mb-2'
                >
                  {data.headline}
                </h1>
                <div className='flex flex-col md:flex-row gap-3 items-center justify-between relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent'>
                  <div className='w-full md:w-1/2'>
                    <div className='flex flex-row gap-2 items-center text-[var(--dark)] text-sm dark:text-white print:dark:text-[var(--dark)]'>
                      <Image
                        alt={data.headline}
                        loading='lazy'
                        width={192}
                        height={192}
                        decoding='async'
                        className='w-9 h-9 rounded-full author-image print:hidden'
                        src={fileObjectToLink(image)}
                      />
                      <div className='flex flex-col'>
                        <div>
                          <span>{title}</span>
                          <span className='ml-1'>|</span>
                          <span className='ml-1'>
                            {data.media_type === "print"
                              ? "প্রিন্ট সংস্করণ"
                              : "অনলাইন সংস্করণ"}
                          </span>
                        </div>
                        <div className='whitespace-nowrap'>
                          প্রকাশ: {date_output_bn(data.publish_date)}
                          {data.updateContentAt
                            ? ` | আপডেট: ${date_output_bn(
                                data.updateContentAt,
                              )}`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mb-3 relative'>
                <Image
                  alt={data.headline}
                  width={800}
                  height={450}
                  decoding='async'
                  className='w-full h-auto object-cover '
                  src={fileObjectToLink(data.banner_image)}
                  loading='lazy'
                />
                {data.media_type === "print" && (
                  <div className='absolute top-2 right-2 bg-white bg-opacity-80 text-xs text-gray-700 px-2 py-1 rounded'>
                    প্রিন্ট সংস্করণ
                  </div>
                )}
              </div>

              <div className='flex flex-col md:flex-row gap-3 items-center justify-end relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent'>
                <div className='w-full md:w-1/2 print:hidden flex items-center whitespace-nowrap justify-start md:justify-end min-h-[40px] md:min-h-[48px] select-none mt-4'>
                  <div className='flex items-center '>
                    {/* Total Share Count */}
                    <div className='flex flex-col items-center px-2 leading-tight text-gray-600'>
                      <span
                        className='font-semibold text-lg'
                        style={{ lineHeight: "1" }}
                      >
                        {totalShares > 999
                          ? `${(totalShares / 1000).toFixed(1)}k`
                          : totalShares}
                      </span>
                      <span className='text-xs' style={{ lineHeight: "1" }}>
                        Shares
                      </span>
                    </div>
                    {/* Share Buttons */}
                    <div className='print:hidden'>
                      <div
                        className='a2a_kit a2a_kit_size_32 a2a_default_style flex space-x-1'
                        style={{ lineHeight: "32px" }}
                        data-a2a-url={shareUrl}
                        data-a2a-title={shareTitle}
                        data-a2a-description={shareDescription}
                      >
                        {[
                          {
                            platform: "facebook",
                            class: "a2a_button_facebook",
                          },
                          { platform: "x", class: "a2a_button_x" },
                          {
                            platform: "whatsapp",
                            class: "a2a_button_whatsapp",
                          },
                          {
                            platform: "linkedin",
                            class: "a2a_button_linkedin",
                          },
                          {
                            platform: "telegram",
                            class: "a2a_button_telegram",
                          },
                          {
                            platform: "facebook_messenger",
                            class: "a2a_button_facebook_messenger",
                          },
                          { platform: "email", class: "a2a_button_email" },
                        ].map(({ platform, class: className }) => (
                          <a
                            key={platform}
                            className={className}
                            onClick={() => handleShare(platform)}
                            target='_blank'
                            rel='nofollow noopener'
                          ></a>
                        ))}
                        <a
                          className='a2a_dd'
                          href='https://www.addtoany.com/share'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        {/* Copy Link Share Button */}
                        <button
                          onClick={handleCopyLink}
                          className='relative p-2 rounded-md bg-blue-800 text-white hover:bg-blue-700 transition-colors duration-200'
                          aria-label='Copy share link'
                        >
                          <FaCopy className='w-4 h-4' />
                          {showTooltip && (
                            <span className='absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap'>
                              Link copied!
                            </span>
                          )}
                        </button>
                      </div>
                      <style jsx>{`
                        .a2a_default_style img {
                          display: inline-block !important;
                          width: 32px !important;
                          height: 32px !important;
                        }
                        .a2a_dd {
                          display: inline-block !important;
                        }
                      `}</style>
                    </div>
                    <div
                      onClick={handlePrint}
                      className='cursor-pointer mr-2 relative p-2 rounded-md bg-black text-white hover:bg-blue-700 transition-colors duration-200'
                    >
                      <PrintIcon />
                    </div>
                    <div className='flex items-center space-x-2'>
                      <button
                        onClick={decreaseFontSize}
                        disabled={fontSize <= MIN_FONT_SIZE}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border  ${
                          fontSize <= MIN_FONT_SIZE
                            ? "bg-gray-300 text-white cursor-not-allowed"
                            : "bg-[#38ada9] hover:bg-[#2d8e8a] text-white"
                        }`}
                        aria-label='Decrease font size'
                      >
                        -
                      </button>
                      <button
                        onClick={() => setFontSize(20)}
                        className='w-8 h-8 rounded-full flex items-center justify-center bg-[#38ada9] hover:bg-[#2d8e8a] text-white transition-colors duration-200 border '
                        aria-label='Reset font size'
                      >
                        অ
                      </button>
                      <button
                        onClick={increaseFontSize}
                        disabled={fontSize >= MAX_FONT_SIZE}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors duration-200 border  ${
                          fontSize >= MAX_FONT_SIZE
                            ? "bg-gray-300 text-white cursor-not-allowed"
                            : "bg-[#38ada9] hover:bg-[#2d8e8a] text-white"
                        }`}
                        aria-label='Increase font size'
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className='text-[var(--dark)] mt-3 text-xl leading-8 print:leading-7 dark:text-white break-words print:dark:text-[var(--dark)] print:text-base'
                style={{ fontSize: `${fontSize}px` }}
              >
                <div>
                  <strong style={{ display: "none" }}>
                    {data.excerpt || data.short_headline}
                  </strong>
                  <div className='my-3 flex flex-col'>
                    <div
                      className='[&>p]:mt-5 news_details'
                      dangerouslySetInnerHTML={{
                        __html: data.details_html,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className='print:hidden gap-3 py-3 flex flex-wrap items-center'>
                {data.tags && (
                  <>
                    বিষয়:
                    {data.tags?.map((tags, index) => (
                      <Link
                        key={index}
                        className='bg-[var(--slate-2)] dark:bg-[var(--gray-2)] text-sm leading-none text-[var(--dark)] p-2 dark:text-white text-center flex items-center'
                        href={`/topic/${tags}`}
                      >
                        {tags}
                      </Link>
                    ))}
                  </>
                )}
              </div>
              <FacebookComments url={currentUrl} />
            </article>

            <div className='container mx-auto print:hidden'>
              <div className='relative mt-6 mb-6 before:absolute before:bg-[var(--border-color)] before:w-full before:h-[1px] before:left-0 before:-top-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-2 print:hidden dark:before:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)]'>
                <div className='flex items-center justify-between'>
                  <p className='text-[var(--primary)] text-xl md:text-2xl dark:text-white'>
                    এই বিভাগের আরও সংবাদ
                  </p>
                  <Link
                    href={`/category/${data.category?.slug}?id=${data.category?.id}`}
                    className='text-[var(--primary)] dark:text-white'
                  >
                    <p className='text-[var(--text-primary)] hover:text-[var(--primary)] duration-300 text-xl md:text-2xl dark:text-white flex gap-2 items-center cursor-pointer'>
                      আরও পড়ুন{" "}
                      <svg
                        className='w-3 h-3 text-gray-500 mx-1'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 12 10'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1.5'
                          d='m2 9 4-4-4-4'
                        />
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='1.5'
                          d='m6 9 4-4-4-4'
                        />
                      </svg>
                    </p>
                  </Link>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:after:[&>*:nth-last-child(-n+3)]:h-0 lg:after:[&>*:nth-last-child(-n+3)]:h-full lg:after:[&>*:nth-child(4)]:w-0 lg:after:[&>*]:w-[1px] after:[&>*:last-child]:w-0 after:[&>*]:h-[1px] lg:after:[&>*]:h-full print:hidden dark:after:[&>*]:bg-[var(--border-color)]'>
                {data.relatedPost?.slice(0, 4)?.map((post) => (
                  <div
                    key={post.id}
                    className='col-span-12 md:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3'
                  >
                    <Link
                      className='group'
                      href={`/${data.category?.slug}/${post.id}/${post.slug}`}
                    >
                      <div className='ml-2 lg:ml-0 mb-2 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post.headline}
                            width={330}
                            height={186}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-full lg:h-auto object-cover group-hover:scale-105 duration-700 ease-out'
                            src={fileObjectToLink(post.banner_image)}
                            loading='lazy'
                          />
                        </div>
                      </div>
                      <h2 className='text-lg text-[var(--dark)] group- dark:text-white'>
                        {post.headline}
                      </h2>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-4 xl:col-span-3 print:hidden'>
            <AddCard
              imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://tpc.googlesyndication.com/simgad/16713525573530791060" alt=""></a>`}
            />
            <div className='xl:sticky xl:top-[4rem]'>
              <TopNewsForNewsDetails count={30} />
              <div className='mb-3'>
                <div className='mt-3 mb-3 border-[var(--border-color)] border-t-[1px] border-b-[1px] dark:border-[var(--border-dark)]'></div>
                <div className='last:[&>*]:mb-0 after:last:[&>*]:h-0 space-y-3'>
                  <AddCard
                    imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://tpc.googlesyndication.com/simgad/16713525573530791060" alt=""></a>`}
                  />
                  <AddCard
                    imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://tpc.googlesyndication.com/simgad/3745460761502011018" alt=""></a>`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <AddCard
          imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://admin.dailyniropekkho.com/storage/ad_image/1734943198418.png" alt=""></a>`}
        />
      </div>
      <Script
        src='https://static.addtoany.com/menu/page.js'
        strategy='lazyOnload'
        onLoad={() => {
          if (typeof window !== "undefined" && window.a2a) {
            window.a2a.init_all();
          }
        }}
      />
    </div>
  );
};

export default SingleNewsDetails;
