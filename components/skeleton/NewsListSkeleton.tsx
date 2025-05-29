import React from "react";

const NewsListSkeleton = () => (
  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
    {Array(6).map((_, i) => (
      <div key={i} className='col-span-1'>
        <div className='flex items-center gap-3'>
          <div className='w-[124px] h-[80px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
          <div className='flex-1'>
            <div className='h-6 bg-gray-600 dark:bg-gray-700 w-3/4 animate-pulse' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 w-full mt-2 animate-pulse' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 w-1/2 mt-2 animate-pulse' />
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default NewsListSkeleton;