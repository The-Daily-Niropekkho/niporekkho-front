import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import VideoIcon from "@/public/icons/VideoIcon";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";
import { FaRegPenToSquare } from "react-icons/fa6";

interface TopNewsProps {
  data: NewsItem[];
  sideData?: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
  ads?: any;
}

const TopNews = ({ data, ads, sideData }: TopNewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    sideData || {};

  return (
    <section className='mt-5'>
      <div className='container px-4 mx-auto'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full md:after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3'>
          <div className='col-span-12 md:col-span-6 lg:col-span-8 xl:col-span-9 relative after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] after:absolute after:w-full after:h-0 md:after:w-[1px] md:after:h-full after:right-0 after:-bottom-3 md:after:top-0 md:after:-right-3'>
            <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
              <div className='col-span-12 flex flex-col lg:flex-row gap-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] last:after:h-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
                {/* Left Section: Featured News Item */}
                <div className='w-full lg:w-3/5 lg:border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
                  {data?.slice(0, 1)?.map((itm, i) => {
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

                              {video && (
                                <div className='w-10 h-10 rounded-full flex items-center justify-center shadow-md absolute top-2 left-2 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                                  <VideoIcon />
                                </div>
                              )}
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
                              <h2 className='text-lg font-[500] text-[var(--dark)] dark:text-white mb-2 tracking-tight'>
                                {stitle || "শিরোনাম নেই"}
                              </h2>
                              {/* <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-3 mb-3 leading-relaxed'>
                              {excerpt || "বিস্তারিত তথ্য নেই"}
                            </p> */}
                              <div className='text-xs flex justify-between items-center text-gray-500 dark:text-gray-400'>
                                <span>{"২ ঘণ্টা আগে"}</span>
                                <span>{category_name || "অজানা সূত্র"}</span>
                              </div>
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
                      const adImgPath = `https://i.ibb.co/wZgh8TTM/370-110-add-news.webp`;
                      const hasValidAddCard =
                        adImgPath && adImgPath.trim().length > 0;
                      const sliceEnd = hasValidAddCard ? 4 : 5;

                      return (
                        <>
                          {data.slice(1, sliceEnd).map((itm, i) => {
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

              {/* Second Section: Grid of Additional News Items */}
              <div className='col-span-12'>
                <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
                  {data?.slice(5, 9)?.map((itm, i) => {
                    // Adjusted slice to avoid overlap with the sidebar
                    const {
                      post_title,
                      image_thumb,
                      post_date,
                      stitle,
                      excerpt,
                      category_name,
                      news_id,
                      category,
                      encode_titl,
                      video,
                    } = itm || {};

                    return (
                      <div
                        key={i}
                        className='col-span-12 lg:col-span-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:last:after:w-0 dark:after:bg-[var(--border-dark)]'
                      >
                        <Link
                          className='group'
                          href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                        >
                          <div className='ml-3 mb-1 md:mb-0 overflow-hidden float-right relative'>
                            <div>
                              <Image
                                alt={post_title}
                                width={330}
                                height={186}
                                decoding='async'
                                className='w-[124px] h-auto xl:w-[200px] xl:h-[130px] object-cover group-hover:scale-105 duration-700 ease-out'
                                src={image_thumb}
                                loading='lazy'
                              />
                              {video && (
                                <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                                  <VideoIcon />
                                </div>
                              )}
                            </div>
                            <div className='hidden lg:block'>
                              <h2 className='text-lg text-[var(--dark)] dark:text-white font-semibold group-hover:text-[var(--text-primary)] cursor-pointer '>
                                <span className='line-clamp-2'>
                                  {post_title}
                                </span>
                              </h2>
                              <p className='hidden lg:block'>
                                <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                                  {excerpt || stitle}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className=' lg:hidden'>
                            <h2 className='text-lg text-[var(--dark)] dark:text-white font-semibold group-hover:text-[var(--text-primary)] cursor-pointer '>
                              <span className='line-clamp-2'>{post_title}</span>
                            </h2>
                            <p className='hidden lg:block'>
                              <span className='text-[var(--gray-2)] dark:text-[var(--gray-3)] mt-2 text-base line-clamp-2'>
                                {excerpt || stitle}
                              </span>
                            </p>
                          </div>
                          <TimeBefore title={post_date} />
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
                {/* home ads 12 here */}
                <AddCard
                  imgPath={`<a target=\"_blank\" href=\"https://dailyniropekkho.com/\"><img width=\"100%\" src=\"https://tpc.googlesyndication.com/simgad/16713525573530791060\" alt=\"\"></a>`}
                />
              </div>
            </div>
            {/* live tv section */}

            {/* অভিমত  */}
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

              {post?.slice(0, 1)?.map((itm) => {
                const {
                  category_name,
                  image_thumb,
                  post_title,
                  stitle,
                  excerpt,
                  news_id,
                  category,
                  encode_titl,
                  post_by_name,
                  post_by_image,
                } = itm || {};

                return (
                  <div
                    key={news_id}
                    className='relative after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]'
                  >
                    <Link
                      className='gap-3 group'
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className=''>
                        <Image
                          alt={post_by_name}
                          width={100}
                          height={100}
                          decoding='async'
                          className='w-24 md:w-36 lg:w-32 h-24 md:h-36 lg:h-32 object-cover'
                          src={post_by_image}
                          loading='lazy'
                        />
                      </div>
                      <div>
                        <p className='font-normal mt-2 text-green-600 hover:text-green-700 dark:text-gray-300 flex gap-2 items-center'>
                          <FaRegPenToSquare /> {post_by_name}
                        </p>
                        <h2 className='text-base text-[var(--dark)] dark:text-white line-clamp-2'>
                          <span className='text-red-500 font-bold'>
                            {category_name}
                          </span>{" "}
                          /{" "}
                          <span className='hover:font-bold'>{post_title}</span>
                        </h2>
                      </div>
                    </Link>
                  </div>
                );
              })}
              <div className='mt-3 space-y-4'>
                {post?.slice(1, 3)?.map((itm, index) => {
                  const {
                    category_name,
                    image_thumb,
                    post_title,
                    stitle,
                    excerpt,
                    news_id,
                    category,
                    encode_titl,
                    post_by_name,
                    post_by_image,
                  } = itm || {};

                  return (
                    <Link
                      key={news_id}
                      className={`flex gap-3 group relative border-b-item ${
                        index === 0
                          ? 'after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-[#eff2f0] after:border-[#eff2f0]'
                          : ""
                      }`}
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                      scroll={false} // Prevent scroll-to-top as per your previous query
                    >
                      {/* Thumbnail Image */}
                      <div className='flex-shrink-0'>
                        <Image
                          alt={post_by_name}
                          width={100}
                          height={100}
                          decoding='async'
                          className='w-24 h-24 object-cover rounded-sm' // Fixed size like in the image
                          src={post_by_image}
                          loading='lazy'
                        />
                      </div>

                      {/* Text Section */}
                      <div className='flex-1 min-w-0'>
                        {" "}
                        {/* min-w-0 ensures truncation works */}
                        {/* Author Name */}
                        <p className='font-normal text-green-600 hover:text-green-700 dark:text-gray-300 flex gap-2 items-center text-sm'>
                          <FaRegPenToSquare className='text-sm' />{" "}
                          {post_by_name}
                        </p>
                        {/* Category and Title */}
                        <h2 className='text-base text-[var(--dark)] dark:text-white font-semibold leading-tight'>
                          <span className='text-red-600 font-bold'>
                            {category_name}
                          </span>
                          {" / "}
                          <span className='hover:font-bold inline-block max-w-full'>
                            {post_title}
                          </span>
                        </h2>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <style jsx>{`
                .after\\:h-[2px]::after {
                  height: 2px;
                }
                .after\\:w-full::after {
                  width: 100%;
                }
              `}</style>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 after:[&>*]:absolute after:[&>*]:bg-[var(--border-color)] after:[&>*]:w-full after:[&>*]:h-[1px] after:[&>*]:-bottom-3 after:[&>*]:left-0 md:after:[&>*]:w-[1px] md:after:[&>*]:h-full md:after:[&>*]:top-0 md:after:[&>*]:-left-3 md:after:[&>*:nth-child(3)]:w-0 md:after:[&>*:nth-child(4)]:w-0 md:after:[&>*:nth-child(6)]:w-0 md:after:first:[&>*]:w-0 lg:after:[&>*:nth-child(3)]:w-[1px] lg:after:[&>*:nth-child(4)]:w-[1px] lg:after:[&>*:nth-child(6)]:w-[1px] lg:after:[&>*:nth-child(5)]:w-0 dark:after:[&>*]:bg-[var(--border-dark)] md:before:[&>*]:absolute md:before:[&>*]:bg-[var(--border-color)] md:before:[&>*]:w-full md:before:[&>*]:h-[1px] md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 md:before:[&>*:nth-child(4)]:h-0 lg:before:[&>*:nth-child(n+4)]:h-0 dark:before:[&>*]:bg-[var(--border-dark)] dark:after:bg-[var(--border-dark)]'>
          {data?.slice(6, 9)?.map((itm) => {
            const {
              post_title,
              image_thumb,
              post_date,
              stitle,
              excerpt,
              category_name,
              news_id,
              category,
              encode_titl,
            } = itm || {};
            return (
              <div key={news_id} className='relative'>
                <Link
                  className='group'
                  href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                >
                  <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                    <Image
                      alt={post_title}
                      width={160}
                      height={90}
                      decoding='async'
                      className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                      src={image_thumb}
                      loading='lazy'
                    />
                  </div>
                  <h3 className='text-lg text-[var(--dark)]    dark:text-white   font-bold group-hover:text-[var(--text-primary)] cursor-pointer line-clamp-3'>
                    {post_title}
                  </h3>
                </Link>

                <TimeBefore
                  title={post_date}
                  // clss="xl:absolute bottom-0"
                />
              </div>
            );
          })}
          <div className='hidden lg:block md:col-span-2 md:row-span-2 lg:col-span-1 md:order-1 lg:order-none relative'>
            <div>
              {" "}
              <AddCard
                imgPath={`<a target=\"_blank\" href=\"https://dailyniropekkho.com/\"><img width=\"100%\" src=\"https://i.ibb.co/G4nTQbTF/81e6f6b5-fc6e-4f58-b5e9-e8928204b428.jpg\" alt=\"\"></a>`}
              />
            </div>
            {/* <div className="hidden w-full flex items-center justify-center">
                            <div className="home-right-b h-[250px]">
                                home ads 13 here
                                <AddCard imgPath={ads?.home_13} />
                            </div>
                        </div> */}
          </div>
          <div className='hidden'>
            {data?.slice(9, 12)?.map((itm) => {
              const {
                post_title,
                image_thumb,
                post_date,
                stitle,
                excerpt,
                category_name,
                news_id,
                category,
                encode_titl,
              } = itm || {};
              return (
                <div key={news_id} className='relative'>
                  <Link
                    className='group'
                    href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                  >
                    <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                      <Image
                        alt={post_title}
                        width={160}
                        height={90}
                        decoding='async'
                        className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                        src={image_thumb}
                        loading='lazy'
                      />
                    </div>
                    <h3 className='text-lg text-[var(--dark)]    dark:text-white   '>
                      {post_title}
                    </h3>
                  </Link>

                  <TimeBefore
                    title={post_date}
                    // clss="xl:absolute bottom-0"
                    clss='ml-4 md:ml-0'
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopNews;

// ---------------------------------
{
  /* sidebar section */
}


// live tv  
{/* <div className='md:mt-3 mb-7 md:mb-0'> */}
  {/* <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
    <div className='flex items-center justify-between'>
      <Link href={`/${slug}`}>
        {/* <h2 className='category-text'>{category_name}</h2> */}
        {/* <h2 className='category-text'>লাইভ টিভি</h2> */}
      {/* </Link> */}
    // </div>
//   </div> */}
  {/* <Link href='/https://www.youtube-nocookie.com/embed/C55L2CanCgY?autoplay=1&mute=1'>
    <p className='w-full flex items-center justify-center mt-5 md:mt-0 relative group'>
      <div className='w-full max-w-4xl rounded overflow-hidden shadow-2xl bg-gray-900/50 hover:shadow-blue-500/50 transition-shadow duration-300'>
        <iframe
          width='100%'
          height='250'
          src='https://www.youtube-nocookie.com/embed/C55L2CanCgY?autoplay=1&mute=1' // Changed to autoplay=1 and added mute=1
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          className='w-full h-[197px]'
        ></iframe>
      </div>
    </p>
  </Link> */}
{/* </div>; */ }
<style jsx>{`
  .after\\:bg-red-600::after {
    background-color: #dc2626; /* Red color */
    border-color: #dc2626;
  }
  .after\\:h-[2px]::after {
    height: 2px;
  }
  .after\\:w-full::after {
    width: 100%;
  }
`}</style>;
