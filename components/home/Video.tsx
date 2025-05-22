import Link from "next/link";
import VideoEmbed from "../VideoEmbed";

export const Video = ({
  videos,
  slug,
  category_name,
}: {
  videos: any;
  slug: string;
  category_name: string;
}) => {
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
        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 relative after:bg-[var(--border-color)] after:absolute after:w-full after:h-[1px] after:right-0 after:left-0 after:-bottom-3 dark:after:bg-[var(--border-dark)]'>
          {/* First video (larger, col-span-6) */}
          {videos
            ?.slice(0, 1)
            .map(
              (
                {
                  category,
                  id,
                  title,
                  url,
                }: { category: string; id: number; title: string; url: string },
                index: number,
              ) => (
                <div
                  key={id}
                  className='col-span-12 md:col-span-6 lg:col-span-6 relative after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'
                >
                  <VideoEmbed videoUrl={url} width={100} />
                </div>
              ),
            )}

          {/* Remaining videos (col-span-6) */}
          <div className='col-span-12 md:col-span-6 lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4'>
            {videos
              ?.slice(1, 5)
              .map(
                (
                  {
                    category,
                    id,
                    title,
                    url,
                  }: {
                    category: string;
                    id: number;
                    title: string;
                    url: string;
                  },
                  index: number,
                ) => (
                  <div
                    key={id}
                    className='relative after:absolute after:w-full after:h-[1px] after:-bottom-3 after:right-0 after:last:h-0 lg:after:w-[1px] lg:after:h-full lg:after:-right-3 lg:after:top-0 lg:after:last:w-0 dark:after:bg-[var(--border-dark)]'
                  >
                    <VideoEmbed videoUrl={url} width={100} />
                  </div>
                ),
              )}
          </div>
        </div>
      </div>
    </section>
  );
};
