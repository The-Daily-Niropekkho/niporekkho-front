import React from "react";

const SidebarSkeleton = () => (
  <div>
    <div className='h-6 bg-gray-200 dark:bg-gray-700 w-1/4 mb-3 animate-pulse' />
    <div className='space-y-4'>
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div key={i} className='flex items-center gap-3'>
            <div className='w-[100px] h-[100px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
            <div>
              <div className='h-4 bg-gray-600 dark:bg-gray-700 w-32 mb-2 animate-pulse' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 w-16 animate-pulse' />
            </div>
          </div>
        ))}
    </div>
    <div className='mt-4 h-[250px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded' />
  </div>
);

export default SidebarSkeleton;
