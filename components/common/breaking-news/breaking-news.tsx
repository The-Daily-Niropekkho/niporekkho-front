"use client";

import React from "react";

interface NewsItem {
  id: number;
  text: string;
}

const newsItems: NewsItem[] = [
  { id: 1, text: "সর্বশেষ সংবিধি" },
  { id: 2, text: "এমএসআর-এর ভবন উদ্বোধন অনুষ্ঠানে প্রধান অতিথি" },
  { id: 3, text: "দূরুদুরে মধ্যে দেশের ৫ জেলায় বন্যার শঙ্কা" },
  { id: 4, text: "সাবেক কনভেন্টের জমি প্রকল্পের প্রতারণার শিকার শতাধিক মানুষ" },
  { id: 5, text: "রাশিয়া নয় – ইউক্রেনকেই চাপে রেখেছে ট্রাম্প প্রশাসন?" },
  { id: 6, text: "সৈয়দপুরে আগুনে পুড়ে মৃতের বাড়" },
];

const BreakingNewsMarquee: React.FC = () => {
  return (
    <div className='flex overflow-hidden sticky bottom-0'>
      {/* Left fixed yellow box */}
      <div className='flex-shrink-0 bg-red-500 text-white font-bold px-4 py-2 whitespace-nowrap'>
        শিরোনাম
      </div>

      {/* Right scrolling area (same vertical padding as the yellow box) */}
      <div className='relative flex-1 overflow-hidden bg-black flex items-center py-2'>
        <div
          className='marquee whitespace-nowrap'
          onMouseEnter={(e) =>
            (e.currentTarget.style.animationPlayState = "paused")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.animationPlayState = "running")
          }
        >
          {[...newsItems, ...newsItems].map((item, idx) => (
            <span
              key={idx}
              className='inline-flex items-center text-white  mx-6 cursor-pointer'
            >
              <span className='mr-2 text-red-500'>●</span>
              <span>{item.text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* scoped CSS */}
      <style jsx>{`
        .marquee {
          display: inline-flex;
          will-change: transform;
          animation: marquee 25s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default BreakingNewsMarquee;
