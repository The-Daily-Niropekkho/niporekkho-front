import React from "react";

const FeaturedNewsSkeleton = () => (
  <div className="col-span-full flex flex-col lg:flex-row gap-3">
    {/* Left: Featured News */}
    <div className="w-full lg:w-3/5">
      <div className="h-[273px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg" />
      <div className="py-3">
        <div className="h-8 bg-gray-600 dark:bg-gray-700 w-3/4 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/2 animate-pulse" />
      </div>
    </div>
    {/* Right: News List */}
    <div className="w-full lg:w-2/5">
      <ul className="space-y-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="flex items-center gap-4">
              <div className="w-2/3">
                <div className="h-6 bg-gray-600 dark:bg-gray-700 w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 mt-2 animate-pulse" />
              </div>
              <div className="w-1/3 h-[100px] bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            </li>
          ))}
      </ul>
    </div>
  </div>
);

export default FeaturedNewsSkeleton;
