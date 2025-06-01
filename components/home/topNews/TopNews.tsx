import AddCard from "@/components/common/addCard/AddCard";
import VideoIcon from "@/public/icons/VideoIcon";
import { HomeData } from "@/types/homeData";
import { Ads, ICategory, SideData } from "@/types/news";
import TimeBefore from "@/ui/TimeBefore";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";

interface TopNewsProps {
  data: HomeData; 
  sideData?: SideData;
  ads?: Ads;
}

const TopNews = ({ data, ads, sideData }: TopNewsProps) => {
  const { category_name, slug, post } = sideData || {};
  console.log(data, "TopNews Data");

  return (
    <section className='mt-5'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full md:after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3'>
          <div className='col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full after:h-0 md:after:w-[1px] md:after:h-full after:right-0 after:-bottom-3 md:after:top-0 md:after:-right-3'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              <div className='col-span-12 flex flex-col lg:flex-row gap-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] last:after:h-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
                {/* Left Section: Featured News Item */}
                <div className='w-full lg:w-3/5 lg:border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                  {data?.news?.slice(0, 1)?.map((item, i) => {
                    const imageUrl = item.banner_image
                      ? fileObjectToLink(
                          typeof item.banner_image === "string"
                            ? item.banner_image
                            : (item.banner_image as any)?.url ||
                                (item.banner_image as any)?.originalUrl ||
                                null,
                        )
                      : "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp";
                    const newsSlug =
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      `news-${item.id || i}`;
                    return (
                      <div
                        key={item.id || `news-${i}`}
                        className='mx-0 h-full lg:px-2'
                      >
                        <div className='relative group flex flex-col gap-3 h-full'>
                          <div className='w-full overflow-hidden relative h-[273px]'>
                            <Link
                              href={`/${item.category?.slug}/${
                                item.id || i
                              }/${newsSlug}`}
                            >
                              <Image
                                alt={item.headline || "News Image"}
                                width={560}
                                height={380}
                                decoding='async'
                                className='group-hover:scale-105 duration-700 ease-out w-full h-full object-cover'
                                src={imageUrl}
                              />
                              {/* {item.video && (
                                <div className='absolute top-2 right-2'>
                                  <VideoIcon />
                                </div>
                              )} */}
                            </Link>
                          </div>
                          <Link
                            href={`/${item.category?.slug}/${
                              item.id || i
                            }/${newsSlug}`}
                          >
                            <div className='py-3 dark:bg-gray-800 border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                              <h1 className='text-xl md:text-2xl lg:text-3xl font-[600] text-[var(--dark)] dark:text-white mb-2 tracking-tight group-hover:text-[var(--text-primary)] cursor-pointer'>
                                {item.short_headline && (
                                  <span className='text-blue-800'>
                                    {item.short_headline} /{" "}
                                  </span>
                                )}
                                {item.headline}
                              </h1>
                              <h2 className='text-lg font-[500] text-[var(--dark)] dark:text-white mb tracking-tight line-clamp-3'>
                                {item.details || "No details available"}
                              </h2>
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
                      const adImgPath =
                        ads?.home_14?.url ||
                        "https://i.ibb.co/RTFyHLvK/325-66.webp";
                      const hasValidAddCard =
                        adImgPath && adImgPath.trim().length > 0;
                      const sliceEnd = hasValidAddCard ? 4 : 5;

                      return (
                        <>
                          {data?.news?.slice(1, sliceEnd).map((item, i) => {
                          const imageUrl = item.banner_image
                            ? fileObjectToLink(
                                typeof item.banner_image === "string"
                                  ? item.banner_image
                                  : (item.banner_image as any)?.url ||
                                      (item.banner_image as any)?.originalUrl ||
                                      null,
                              )
                            : "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp";
                            const newsSlug =
                              item.slug ||
                              item.headline
                                ?.replace(/%/g, "-")
                                .replace(/\s/g, "-") ||
                              `news-${item.id || i}`;
                            return (
                              <li
                                key={item.id || `news-${i}`}
                                className={`relative flex group lg:flex-row items-start gap-4 ${
                                  i < sliceEnd - 1
                                    ? "after:content-[''] after:absolute after:left-0 after:-bottom-3 after:h-[1px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]"
                                    : ""
                                }`}
                              >
                                <div className='w-full lg:w-2/3 group'>
                                  <Link
                                    href={`/${
                                      item.category?.slug
                                    }/${item.id || i}/${newsSlug}`}
                                  >
                                    <h1 className='text-base lg:text-lg font-semibold text-[var(--dark)] dark:text-white group-hover:text-[var(--text-primary)] line-clamp-2'>
                                      {item.short_headline && (
                                        <span className='text-blue-800'>
                                          {item.short_headline} /{" "}
                                        </span>
                                      )}
                                      {item.headline}
                                    </h1>
                                    <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-1 text-base line-clamp-2'>
                                      {item.details || "No details available"}
                                    </span>
                                  </Link>
                                </div>
                                <div className='w-full lg:w-1/3 relative overflow-hidden'>
                                  <Link
                                    href={`/${
                                      item.category?.slug
                                    }/${item.id || i}/${newsSlug}`}
                                  >
                                    <Image
                                      alt={item.headline || "News Thumbnail"}
                                      width={120}
                                      height={80}
                                      decoding='async'
                                      className='w-full h-full md:h-[100px] lg:h-[100px] object-cover group-hover:scale-105 duration-700 ease-out'
                                      src={imageUrl}
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
                                imgPath={`<a target="_blank" href="${
                                  ads?.home_14?.link || "#"
                                }"><img width="100%" src="${adImgPath}" alt="Advertisement"></a>`}
                              />
                            </li>
                          )}
                        </>
                      );
                    })()}
                  </ul>
                </div>
              </div>

              {/* Second Section: Grid of Additional News Items */}
              <div className='col-span-12'>
                <div className='grid grid-cols-1 md:grid-cols-6 gap-6'>
                  {data?.news?.slice(5, 7)?.map((item, i) => {
                   const imageUrl = item.banner_image
                     ? fileObjectToLink(
                         typeof item.banner_image === "string"
                           ? item.banner_image
                           : (item.banner_image as any)?.url ||
                               (item.banner_image as any)?.originalUrl ||
                               null,
                       )
                     : "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp";
                    const newsSlug =
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      `news-${item.id || i}`;
                    return (
                      <div
                        key={item.id || `news-${i}`}
                        className='col-span-12 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:last:after:w-0 dark:after:bg-[var(--border-dark)]'
                      >
                        <Link
                          className='group'
                          href={`/${item.category?.slug}/${
                            item.id || i
                          }/${newsSlug}`}
                        >
                          <div className='ml-3 mb-1 md:mb-0 overflow-hidden float-right relative'>
                            <Image
                              alt={item.headline || "News Image"}
                              width={330}
                              height={186}
                              decoding='async'
                              className='w-[124px] h-auto xl:w-[200px] xl:h-[130px] object-cover group-hover:scale-105 duration-700 ease-out'
                              src={imageUrl}
                              loading='lazy'
                            />
                          </div>
                          <div className='lg:hidden'>
                            <h2 className='text-lg text-[var(--dark)] dark:text-white font-semibold group-hover:text-[var(--text-primary)] cursor-pointer'>
                              <span className='line-clamp-2'>
                                {item.short_headline && (
                                  <span className='text-blue-800'>
                                    {item.short_headline} /{" "}
                                  </span>
                                )}
                                {item.headline}
                              </span>
                            </h2>
                            <p className='hidden lg:block'>
                              <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                                {item.details || "No details available"}
                              </span>
                            </p>
                          </div>
                          <div className='hidden lg:block'>
                            <h2 className='text-lg text-[var(--dark)] dark:text-white font-semibold group-hover:text-[var(--text-primary)] cursor-pointer'>
                              <span className='line-clamp-2'>
                                {item.short_headline && (
                                  <span className='text-blue-800'>
                                    {item.short_headline} /{" "}
                                  </span>
                                )}
                                {item.headline}
                              </span>
                            </h2>
                            <p>
                              <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                                {item.details || "No details available"}
                              </span>
                            </p>
                          </div>
                          <TimeBefore title={item.createdAt} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {/* Section: Grid of Additional News Items */}
          <div className='col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3'>
            <div className='w-full flex items-center justify-center'>
              <div className={`${ads?.home_12 ? "" : "h-[250px]"}`}>
                <AddCard
                  imgPath={`<a target="_blank" href="${ads?.home_12?.link}"><img width="100%" src="${ads?.home_12?.url}" alt="Advertisement"></a>`}
                />
              </div>
            </div>
            {/* Sidebar: সম্পাদকীয় ও মতামত */}
            {sideData?.post && sideData.post.length > 0 && (
              <div className='md:mt-3 mb-7 md:mb-0'>
                <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
                  <div className='flex items-center justify-between border-t-2 border-t-red-600'>
                    <Link
                      className='hover:text-[var(--secondary)]'
                      href={`/${slug}`}
                    >
                      <h2 className='category-text mt-2 text-anchor'>
                        সম্পাদকীয় ও মতামত
                      </h2>
                    </Link>
                  </div>
                </div>
                {post?.slice(0, 1)?.map((item) => {
                  return (
                    <div
                      key={item.news_id}
                      className="relative after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]"
                    >
                      <Link
                        className='gap-3 group'
                        href={`/${item.category}/${item.encode_titl}`}
                      >
                        <div>
                          <Image
                            alt={
                              item.post_by_name ||
                              item.post_title ||
                              "Author Image"
                            }
                            width={100}
                            height={100}
                            decoding='async'
                            className='w-24 md:w-36 lg:w-32 h-24 md:h-36 lg:h-32 object-cover'
                            src={item.post_by_image || item.image_thumb}
                            loading='lazy'
                          />
                        </div>
                        <div>
                          <p className='font-normal mt-2 text-green-600 hover:text-green-700 dark:text-gray-300 flex gap-2 items-center'>
                            <FaRegPenToSquare />{" "}
                            {item.post_by_name || "Unknown Author"}
                          </p>
                          <h2 className='text-base text-[var(--dark)] dark:text-white line-clamp-2'>
                            <span className='text-red-500 font-bold'>
                              {item.category_name}
                            </span>{" "}
                            /{" "}
                            <span className='hover:font-bold'>
                              {item.post_title}
                            </span>
                          </h2>
                        </div>
                      </Link>
                    </div>
                  );
                })}
                <div className='mt-3 space-y-4'>
                  {post?.slice(1, 3)?.map((item, index) => {
                    return (
                      <Link
                        key={item.news_id}
                        className={`flex gap-3 group relative border-b-item ${
                          index === 0
                            ? "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]"
                            : ""
                        }`}
                        href={`/${item.category}/${item.encode_titl}`}
                        scroll={false}
                      >
                        <div className='flex-shrink-0'>
                          <Image
                            alt={
                              item.post_by_name ||
                              item.post_title ||
                              "Author Image"
                            }
                            width={100}
                            height={100}
                            decoding='async'
                            className='w-24 h-24 object-cover rounded-sm'
                            src={item.post_by_image || item.image_thumb}
                            loading='lazy'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <p className='font-normal text-green-600 hover:text-green-700 dark:text-gray-300 flex gap-2 items-center text-sm'>
                            <FaRegPenToSquare className='text-sm' />{" "}
                            {item.post_by_name || "Unknown Author"}
                          </p>
                          <h2 className='text-base text-[var(--dark)] dark:text-white font-semibold leading-tight'>
                            <span className='text-red-600 font-bold'>
                              {item.category_name}
                            </span>{" "}
                            /{" "}
                            <span className='hover:font-bold inline-block max-w-full'>
                              {item.post_title}
                            </span>
                          </h2>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='hidden lg:block'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:left-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-left-3 md:after:[&>*:nth-child(3)]:w-0 md:after:[&>*:nth-child(4)]:w-0 md:after:[&>*:nth-child(6)]:w-0 md:after:first:[&>*]:w-0 lg:after:[&>*:nth-child(3)]:w-[1px] lg:after:[&>*:nth-child(4)]:w-[1px] lg:after:[&>*:nth-child(6)]:w-[1px] lg:after:[&>*:nth-child(5)]:w-0 dark:after:[&>*]:bg-[var(--border-dark)] md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 md:before:[&>*]:nth-child(4):h-0 lg:before:[&>*:nth-child(n+4)]:h-0 dark:before:[&>*]:bg-[var(--border-dark)] dark:after:bg-[var(--border-dark)] '>
            {data?.news?.slice(7, 10)?.map((item, i) => {
              const imageUrl = item.banner_image
                ? fileObjectToLink(
                    typeof item.banner_image === "string"
                      ? item.banner_image
                      : (item.banner_image as any)?.url ||
                          (item.banner_image as any)?.originalUrl ||
                          null,
                  )
                : "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp";
              return (
                <div
                  key={item.banner_image?.id || `news-${i}`}
                  className='relative'
                >
                  <Link
                    className='group'
                    href={`/${item.category?.slug}/${
                      item.id || i
                    }/${
                      item.slug ||
                      item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                      item.headline
                    }`}
                  >
                    <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                      <Image
                        alt={item.headline || "News Image"}
                        width={160}
                        height={90}
                        decoding='async'
                        className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                        src={imageUrl}
                        loading='lazy'
                      />
                    </div>
                    <h3 className='text-lg text-[var(--dark)] dark:text-white font-bold group-hover:text-[var(--text-primary)] cursor-pointer line-clamp-3'>
                      {item.short_headline && (
                        <span className='text-blue-800'>
                          {item.short_headline} /{" "}
                        </span>
                      )}
                      {item.headline}
                    </h3>
                  </Link>
                  <TimeBefore title={item.createdAt} />
                </div>
              );
            })}
            <div className='hidden lg:block md:col-span-2 md:row-span-2 lg:col-span-1 md:order-1 lg:order-none relative'>
              <div>
                <AddCard
                  imgPath={`<a target="_blank" href="${ads?.home_13?.link}"><img width="100%" src="${ads?.home_13?.url}" alt="Advertisement"></a>`}
                />
              </div>
            </div>
            <div className='hidden'>
              {data?.news?.slice(9, 12)?.map((item, i) => {
                const imageUrl = item.banner_image
                  ? fileObjectToLink(
                      typeof item.banner_image === "string"
                        ? item.banner_image
                        : (item.banner_image as any)?.url ||
                            (item.banner_image as any)?.originalUrl ||
                            null,
                    )
                  : "https://i.ibb.co/LdP2NKkp/Placeholder-Begrippenlijst.webp";
                return (
                  <div
                    key={item.banner_image?.id || `news-${i}`}
                    className='relative'
                  >
                    <Link
                      className='group'
                      href={`/${item.category?.slug}/${
                        item.id || i
                      }/${
                        item.slug ||
                        item.headline?.replace(/%/g, "-").replace(/\s/g, "-") ||
                        item.headline
                      }`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                        <Image
                          alt={item.headline || "News Image"}
                          width={160}
                          height={90}
                          decoding='async'
                          className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                          src={imageUrl}
                          loading='lazy'
                        />
                      </div>
                      <h3 className='text-lg text-[var(--dark)] dark:text-white'>
                        {item.short_headline && (
                          <span className='text-blue-800'>
                            {item.short_headline} /{" "}
                          </span>
                        )}
                        {item.headline}
                      </h3>
                    </Link>
                    <TimeBefore title={item.createdAt} clss='ml-4 md:ml-0' />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .after\\:bg-red-600::after {
          background-color: #dc2626;
          border-color: #dc2626;
        }
        .after\\:h-[2px]::after {
          height: 2px;
        }
        .after\\:w-full::after {
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default TopNews;
