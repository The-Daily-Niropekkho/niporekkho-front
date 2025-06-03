// In @/components/skeleton/TopNewsSkeleton.tsx
import React from "react";

const TopNewsSkeleton = () => (
  <section className='mt-[60px]'>
    <div className='container px-4 mx-auto'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
        <div className='col-span-12 lg:col-span-8'>
          <div className='h-6 bg-gray-200 dark:bg-gray-700 w-1/4 mb-3 animate-pulse' />
          <div className='flex flex-col md:flex-row gap-3'>
            <div className='w-full md:w-1/2 h-64 bg-gray-200 dark:bg-gray-700 animate-pulse' />
            <div className='w-full md:w-1/2'>
              <div className='h-8 bg-gray-200 dark:bg-gray-700 w-3/4 mb-2 animate-pulse' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 w-full mb-2 animate-pulse' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 w-1/2 animate-pulse' />
            </div>
          </div>
        </div>
        <div className='col-span-12 lg:col-span-4'>
          <div className='h-6 bg-gray-200 dark:bg-gray-700 w-1/4 mb-3 animate-pulse' />
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div key={i} className='flex gap-3 mb-4'>
                <div className='w-[100px] h-[100px] bg-gray-200 dark:bg-gray-700 animate-pulse' />
                <div>
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 w-32 mb-2 animate-pulse' />
                  <div className='h-4 bg-gray-200 dark:bg-gray-700 w-16 animate-pulse' />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </section>
);

export default TopNewsSkeleton;
