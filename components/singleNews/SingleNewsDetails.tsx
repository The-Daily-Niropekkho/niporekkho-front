"use client";

import CopyIcon from "@/public/icons/CopyIcon";
import FacebookIcon from "@/public/icons/FacebookIcon";
import WhatsAppIcon from "@/public/icons/WhatsAppIcon";
import timestampToBangleDateWithTime from "@/utils/timestampToBangleDateWithTime";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import AddCard from "../common/addCard/AddCard";
import TopNewsForNewsDetails from "./top-news-for-news-details";
import VideoEmbed from "@/components/VideoEmbed";
import date_output_bn from "@/utils/datetime";
import PrintIcon from "@/public/icons/PrintIcon";
import Breadcrumb from "@/ui/Breadcrumb";
import { FaHome } from "react-icons/fa";
import Script from "next/script";
import fileObjectToLink from "@/utils/fileObjectToLink";
import { NewsDetails } from "@/types/newsDetails";

interface SingleNewsDetailsProps {
  data: NewsDetails & { relatedPost: NewsDetails[] }; 
  clss?: string;
}

const SingleNewsDetails = ({ data, clss }: SingleNewsDetailsProps) => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [hostName, setHostName] = useState("");

  // Font Size
  const [fontSize, setFontSize] = useState(20);
  const MIN_FONT_SIZE = 14;
  const MAX_FONT_SIZE = 28;

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

  // Construct the share URL
  const shareUrl = `${hostName}/${data.category?.slug}/${data.slug}`;
  const shareTitle = data.headline;
  const shareDescription = data.excerpt || data.short_headline || "";

  const breadcrumbItems = [
    { label: <FaHome />, href: "/" },
    { label: data.category?.title, href: `/${data.category?.slug}` },
  ];

  // Reinitialize AddToAny when data changes
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

  return (
    <div className={clss}>
      <div className='container px-4 mx-auto print:px-0'>
        <div className={`${data.ads?.news_view_31 ? "mb-" : ""} print:hidden`}>
          <AddCard imgPath={data.ads?.news_view_31} />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-12 gap-6 print:!block'>
          <div className='col-span-12 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3 lg:after:w-[1px] lg:after:h-full dark:after:bg-[var(--border-dark)] print:!col-span-12 print:after:bg-transparent'>
            <article ref={printRef}>
              <div className='mb-3'>
                <Breadcrumb items={breadcrumbItems} />
                <h2 style={{ fontSize: "1.2em" }} className='my-1 print:hidden'>
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
                        src={
                          data.reporter?.writer?.profile_image?.url ||
                          "/images/no_user.png"
                        }
                      />
                      <div className='flex flex-col'>
                        <div>
                          <span>
                            {data.reporter?.writer?.first_name}{" "}
                            {data.reporter?.writer?.last_name}
                          </span>
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
                            ? ` | আপডেট: ${date_output_bn(data.updateContentAt)}`
                            : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='w-full md:w-1/2 print:hidden flex items-center whitespace-nowrap justify-start md:justify-end min-h-[40px] md:min-h-[48px] select-none mt-4'>
                    <div className='flex items-center'></div>
                  </div>
                </div>
              </div>

              {/* <div className='clss'>
                {data.video ? (
                  <div className='print:hidden'>
                    <VideoEmbed videoUrl={data.video} title={data.headline} />
                  </div>
                ) : (
                  <figure>
                    <Image
                      alt={data.headline}
                      width={1200}
                      height={675}
                      decoding='async'
                      className='w-full h-auto'
                      src={fileObjectToLink(data.banner_image)}
                      loading='lazy'
                    />
                    <div className='text-center post_image_title bg_lite border_bottom py-1 mb-1 print:hidden'>
                      {data.banner_image?.filename}
                    </div>
                  </figure>
                )}
              </div> */}

              <div className='flex flex-col md:flex-row gap-3 items-center justify-end relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-top-3 dark:after:bg-[var(--border-dark)] print:after:bg-transparent'>
                <div className='w-full md:w-1/2 print:hidden flex items-center whitespace-nowrap justify-start md:justify-end min-h-[40px] md:min-h-[48px] select-none mt-4'>
                  <div className='flex items-center'>
                    <div className='print:hidden'>
                      <div
                        className='a2a_kit a2a_kit_size_32 a2a_default_style flex space-x-2'
                        style={{ lineHeight: "32px" }}
                        data-a2a-url={shareUrl}
                        data-a2a-title={shareTitle}
                        data-a2a-description={shareDescription}
                      >
                        <a
                          className='a2a_button_facebook'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_x'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_whatsapp'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_linkedin'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_telegram'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_facebook_messenger'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_button_email'
                          target='_blank'
                          rel='nofollow noopener'
                        ></a>
                        <a
                          className='a2a_dd'
                          href='https://www.addtoany.com/share'
                        ></a>
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
                    <div onClick={handlePrint} className='cursor-pointer mr-2'>
                      <PrintIcon />
                    </div>
                  </div>
                  <div className='flex items-center mr-2 space-x-2'>
                    <button
                      onClick={decreaseFontSize}
                      disabled={fontSize <= MIN_FONT_SIZE}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 border border-black ${
                        fontSize <= MIN_FONT_SIZE
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#e8e8e8] hover:bg-gray-300 text-black"
                      }`}
                      aria-label='Decrease font size'
                    >
                      -
                    </button>
                    <button
                      onClick={() => setFontSize(20)}
                      className='w-8 h-8 rounded-full flex items-center justify-center bg-[#e8e8e8] hover:bg-gray-300 text-black transition-colors duration-200 border border-black'
                      aria-label='Reset font size'
                    >
                      অ
                    </button>
                    <button
                      onClick={increaseFontSize}
                      disabled={fontSize >= MAX_FONT_SIZE}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 border border-black ${
                        fontSize >= MAX_FONT_SIZE
                          ? "bg-gray-400 text-white cursor-not-allowed"
                          : "bg-[#e8e8e8] hover:bg-gray-300 text-black"
                      }`}
                      aria-label='Increase font size'
                    >
                      +
                    </button>
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
                      dangerouslySetInnerHTML={{ __html: data.details_html }}
                    />
                  </div>
                </div>
              </div>
            </article>

            <div className='print:hidden gap-3 py-3 flex flex-wrap'>
              {data.allTopics?.map((topic, index) => (
                <Link
                  key={index}
                  className='bg-[var(--slate-2)] dark:bg-[var(--gray-2)] text-sm leading-none text-[var(--dark)] p-2 dark:text-white text-center flex items-center'
                  href={`/topic/${topic.title}`}
                >
                  {topic.title}
                </Link>
              ))}
            </div>

            <div className='container mx-auto print:hidden'>
              <div className='relative mt-6 mb-6 before:absolute before:bg-[var(--border-color)] before:w-full before:h-[1px] before:left-0 before:-top-3 after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:left-0 after:-bottom-2 print:hidden dark:before:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)]'>
                <div className='flex items-center justify-between'>
                  <p className='text-[var(--primary)] text-xl md:text-2xl dark:text-white'>
                    এই বিভাগের আরও সংবাদ
                  </p>
                  <Link
                    href={`/${data.category?.slug}`}
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

              <div className='grid grid-cols-1 md:grid-cols-12 gap-6 md:after:[&>*:nth-last-child(-n+2)]:h-0 lg:after:[&>*:nth-last-child(-n+2)]:h-full lg:after:[&>*:nth-child(3)]:w-0 lg:after:[&>*]:w-[1px] after:[&>*:last-child]:w-0 after:[&>*]:h-[1px] lg:after:[&>*]:h-full print:hidden dark:after:[&>*]:bg-[var(--border-color)]'>
                {data.relatedPost?.slice(0, 3)?.map((post) => (
                  <div
                    key={post.id}
                    className='col-span-12 md:col-span-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:right-0 after:-bottom-3 lg:after:top-0 lg:after:-right-3'
                  >
                    <Link
                      className='group'
                      href={`/${data.category?.slug}/${post.slug}`}
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
            <div className='xl:sticky xl:top-[4rem]'>
              <TopNewsForNewsDetails count={10} />
              <div className='mb-3'>
                <div className='mt-3 mb-3 border-[var(--border-color)] border-t-[1px] border-b-[1px] dark:border-[var(--border-dark)]'></div>
                <div className='last:[&>*]:mb-0 after:last:[&>*]:h-0'>
                  <AddCard
                    imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://tpc.googlesyndication.com/simgad/16713525573530791060" alt=""></a>`}
                  />
                  <div className='mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 dark:after:bg-[var(--border-dark)] before:h-px before:-top-3 before:bg-[var(--border-color)] dark:before:bg-[var(--border-color)] before:absolute before:w-full mt-5'>
                    <div className='w-full flex items-center justify-center'>
                      <div
                        className={`${
                          data.ads?.news_view_32 ? "" : "h-[250px]"
                        }`}
                      >
                        <AddCard
                          imgPath={`<a target="_blank" href="https://dailyniropekkho.com/"><img width="100%" src="https://tpc.googlesyndication.com/simgad/16713525573530791060" alt=""></a>`}
                        />
                      </div>
                    </div>
                  </div>
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
        src='https://static.addtoany.com/menu/page.js2'
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
