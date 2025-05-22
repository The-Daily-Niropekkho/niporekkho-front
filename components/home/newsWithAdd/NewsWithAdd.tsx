import AddCard from "@/components/common/addCard/AddCard";
import { NewsItem } from "@/interface/post";
import VideoIcon from "@/public/icons/VideoIcon";
import TimeBefore from "@/ui/TimeBefore";
import Image from "next/image";
import Link from "next/link";

interface NewsProps {
  data: {
    position: string;
    category_name: string;
    slug: string;
    category_id: string;
    status: string;
    post: NewsItem[];
  };
  ads?: any;
}

const NewsWithAdd = ({ data, ads }: NewsProps) => {
  const { category_id, category_name, position, post, slug, status } =
    data || {};

  return (
    <section className='mt-[60px] flex flex-col lg:flex-row gap-2 row container mx-auto'>
      {/* রাজধানী  */}
      <div className='container px-4 mx-auto col-span-12 md:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-[1px] after:h-full after:top-0 after:-right-2 dark:after:bg-[var(--border-dark)]'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
          <div className='flex items-center justify-between'>
            <Link href={`/${slug}`}>
              <h2 className='category-text text-anchor'>{category_name}</h2>
              {/* <h2 className='category-text'>রাজধানী</h2> */}
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='flex flex-col lg:flex-row gap-6'>
              {/* Featured News Item */}
              <div className='w-full lg:w-1/2 mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 dark:after:bg-[var(--border-dark)]'>
                {post?.slice(0, 1)?.map((item, i) => {
                  const {
                    category_name,
                    image_large,
                    post_title,
                    stitle,
                    excerpt,
                    news_id,
                    category,
                    encode_titl,
                    post_date,
                    video,
                  } = item || {};

                  return (
                    <div key={i} className='-mx-4 md:px-4'>
                      <Link
                        className='group flex flex-col gap-3'
                        href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                      >
                        <div className='w-full'>
                          <div className='overflow-hidden relative'>
                            <Image
                              alt={post_title}
                              width={560}
                              height={315}
                              decoding='async'
                              className='w-full h-auto group-hover:scale-105 duration-700 ease-out'
                              src={image_large}
                              loading='lazy'
                            />
                            {video && (
                              <div className='w-8 h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                                <VideoIcon />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className='w-full'>
                          <h3 className='text-2xl mx-4 md:mx-0 mb-0 md:mb-2 text-[var(--dark)] dark:text-white font-semibold line-clamp-2 group-hover:text-[var(--text-primary)]'>
                            {post_title}
                          </h3>
                          <p className='hidden lg:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)] mx-4 md:mx-0'>
                            <span className='line-clamp-3'>
                              {excerpt || stitle}
                            </span>
                          </p>
                          <TimeBefore title={post_date} clss='ml-4 md:ml-0' />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* List of Two News Items */}
              <div className='w-full lg:w-1/2 flex flex-col gap-2'>
                {post?.slice(1, 5)?.map((item, i) => {
                  const {
                    category_name,
                    image_thumb,
                    post_title,
                    stitle,
                    excerpt,
                    news_id,
                    category,
                    encode_titl,
                    post_date,
                    video,
                  } = item || {};

                  return (
                    <div
                      key={i}
                      className='block w-full relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-[1px] after:last:h-0 dark:after:bg-[var(--border-dark)]'
                    >
                      <Link
                        className='group flex items-start gap-3'
                        href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                      >
                        <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden relative w-[124px] lg:w-[110px]'>
                          <Image
                            alt={post_title}
                            width={160}
                            height={90}
                            decoding='async'
                            className='w-full h-auto lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                          {video && (
                            <div className='w-8 h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1 bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                              <VideoIcon />
                            </div>
                          )}
                        </div>
                        <div className='flex-1'>
                          <h3 className='text-lg text-[var(--dark)] dark:text-white line-clamp-2 font-bold group-hover:text-[var(--text-primary)]'>
                            {post_title}
                          </h3>
                          <TimeBefore title={post_date} />
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* রাজনীতি  */}
      <div className='container px-4 mx-auto col-span-12 md:col-span-6 border-[var(--border-color)] dark:border-[var(--border-dark)]'>
        <div className='border-[var(--border-color)] dark:border-[var(--border-dark)] border-b-[2px] mb-3 pb-1'>
          <div className='flex items-center justify-between'>
            <Link href={`/${slug}`}>
              {/* <h2 className='category-text'>{category_name}</h2> */}
              <h2 className='category-text text-anchor'>রাজধানী</h2>
            </Link>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
          <div className='col-span-12 md:col-span-12 lg:col-span-4 xl:col-span-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:top-0 lg:after:-right-3 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'>
            <div className='mb-6 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
              {post?.slice(0, 1)?.map((item, i) => {
                const {
                  category_name,
                  image_large,
                  post_title,
                  stitle,
                  excerpt,
                  news_id,
                  category,
                  encode_titl,
                  post_date,
                  video,
                } = item || {};

                return (
                  <div key={i} className='-mx-4 md:px-4'>
                    <Link
                      className='group flex flex-col-reverse lg:flex-col-reverse md:flex-row xl:flex-row gap-3'
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                        <h3 className='text-2xl left-9 mx-4 md:mx-0 mb-0 md:mb-2 text-[var(--dark)]    dark:text-white    font-semibold group-hover:text-[var(--text-primary)] cursor-pointer line-clamp-2'>
                          {post_title}
                        </h3>
                        <p className='hidden xl:block text-base text-[var(--gray-2)] dark:text-[var(--gray-3)] lg:overflow-hidden'>
                          <span className='line-clamp-3'>
                            {excerpt || stitle}
                          </span>
                        </p>

                        <TimeBefore title={post_date} clss='ml-4 md:ml-0' />
                      </div>
                      <div className='w-full md:w-1/2 lg:w-full xl:w-1/2'>
                        <div className='overflow-hidden relative'>
                          <div>
                            <Image
                              alt={post_title}
                              width={560}
                              height={315}
                              decoding='async'
                              className='w-full h-auto group-hover:scale-105 duration-700 ease-out'
                              src={image_large}
                              loading='lazy'
                            />
                            {video && (
                              <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                                <VideoIcon />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6 mt-3 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-0 after:last:h-0 dark:after:bg-[var(--border-dark)]'>
              {post?.slice(1, 3)?.map((item, i) => {
                const {
                  category_name,
                  image_thumb,
                  post_title,
                  stitle,
                  excerpt,
                  news_id,
                  category,
                  encode_titl,
                  post_date,
                  video,
                } = item || {};

                return (
                  <div
                    key={i}
                    className='block w-full md:w-full xl:w-1/2 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 xl:after:w-[1px] xl:after:h-full xl:after:top-0 xl:after:-right-3 xl:after:last:w-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group'
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post_title}
                            width={160}
                            height={90}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                          {video && (
                            <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                              <VideoIcon />
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className='text-lg text-[var(--dark)]    dark:text-white    line-clamp-2 font-bold group-hover:text-[var(--text-primary)] cursor-pointer'>
                        {post_title}
                      </h3>
                    </Link>

                    <TimeBefore title={post_date} />
                  </div>
                );
              })}
            </div>
            <div className='flex flex-col md:flex-row lg:flex-col xl:flex-row gap-6'>
              {post?.slice(3, 5)?.map((item, i) => {
                const {
                  category_name,
                  image_thumb,
                  post_title,
                  stitle,
                  excerpt,
                  news_id,
                  category,
                  encode_titl,
                  post_date,
                  video,
                } = item || {};

                return (
                  <div
                    key={i}
                    className='block w-full md:w-full xl:w-1/2 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 xl:after:w-[1px] xl:after:h-full xl:after:top-0 xl:after:-right-3 xl:after:last:w-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <Link
                      className='group'
                      href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
                    >
                      <div className='ml-2 md:ml-0 lg:ml-2 mb-2 overflow-hidden float-right relative'>
                        <div>
                          <Image
                            alt={post_title}
                            width={160}
                            height={90}
                            decoding='async'
                            className='w-[124px] h-auto lg:w-[110px] lg:h-[75px] object-cover group-hover:scale-105 duration-700 ease-out'
                            src={image_thumb}
                            loading='lazy'
                          />
                          {video && (
                            <div className='w-8 h-8 xl:w-8 xl:h-8 rounded-full flex items-center justify-center shadow-md absolute top-1 left-1  bg-[var(--secondary)] group-hover:bg-[var(--secondary)]'>
                              <VideoIcon />
                            </div>
                          )}
                        </div>
                      </div>
                      <h3 className='text-lg text-[var(--dark)]    dark:text-white    line-clamp-2 font-bold group-hover:text-[var(--text-primary)] cursor-pointer'>
                        {post_title}
                      </h3>
                    </Link>

                    <TimeBefore title={post_date} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsWithAdd;
