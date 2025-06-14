"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useZonewiseNewsQuery } from "@/redux/features/news/newsApi";
import { useGetAllUpazillasQuery } from "@/redux/features/zone/districtsApi";
import fileObjectToLink from "@/utils/fileObjectToLink";
import Image from "next/image";
import { FaArrowUp, FaSearch } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import date_output_bn from "@/utils/datetime";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TopNewsForNewsDetails from "@/components/singleNews/top-news-for-news-details";
import { GoDotFill } from "react-icons/go";
import { useGetAllNewsQuery } from "@/redux/features/news/newsApi";

interface ZoneNewsParams {
  divisionName?: string;
  districtName?: string;
  upazillaName?: string;
}

type Upazilla = {
  id: number;
  bn_name: string;
};

export default function ZoneNewsPage({ params }: { params: ZoneNewsParams }) {
  const [showScroll, setShowScroll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get IDs from query params
  const divisionId = searchParams.get("division_id");
  const districtId = searchParams.get("district_id");
  const upazillaId = searchParams.get("upazilla_id");

  // Get names from route params
  const { divisionName, districtName, upazillaName } = params;

  // Fetch news data with upazilla_id filter
  const { data: newsData, isLoading: newsLoading, error: newsError } = useZonewiseNewsQuery({
    division_id: divisionId ?? undefined,
    district_id: districtId ?? undefined,
    upazilla_id: upazillaId ?? undefined,
    limit: 10,
  });

  // Fetch upazillas for the selected district
  const { data: upazillaData, isLoading: upazillaLoading } = useGetAllUpazillasQuery(
    { district_id: districtId ?? undefined },
    { skip: !districtId }
  );

  const { data: allNewsData, isLoading: allNewsLoading } = useGetAllNewsQuery({ limit: 500 });

  // Determine location name to display
  const getLocationName = () => {
    if (upazillaName) return decodeURIComponent(upazillaName);
    if (districtName) return decodeURIComponent(districtName);
    if (divisionName) return decodeURIComponent(divisionName);
    return "দেশজুড়ে";
  };

  // Handle scroll-to-top visibility
  useEffect(() => {
    const checkScrollTop = () => {
      setShowScroll(window.pageYOffset > 400);
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle Upazila click to filter news
  const handleUpazilaClick = (upazilla: Upazilla) => {
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("upazilla_id", upazilla.id.toString());
    router.push(
      `/zone-news/${divisionName}/${districtName}/${encodeURIComponent(upazilla.bn_name)}?${newParams.toString()}`
    );
  };

  // Filter news based on search query
  const filteredData = newsData?.data?.filter((news) =>
    searchQuery
      ? news.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        news.short_headline.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  if (newsLoading) {
    return (
      <div className="container mx-auto p-6 font-solaimanlipi">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 space-y-8">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-5 pb-4 border-b border-gray-200">
                <Skeleton height={200} width={320} />
                <div className="flex-1">
                  <Skeleton height={24} width="80%" className="mb-2" />
                  <Skeleton height={16} width="60%" className="mb-3" />
                  <Skeleton height={16} width="40%" />
                </div>
              </div>
            ))}
          </div>
          <div className="col-span-1">
            <Skeleton height={250} width="100%" />
          </div>
        </div>
      </div>
    );
  }

  if (newsError) {
    return (
      <div className="p-4 text-center font-solaimanlipi min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">ত্রুটি</h1>
        <p className="text-lg text-gray-700 mb-6">
          ডাটা লোড করতে সমস্যা হচ্ছে। দয়া করে পরে চেষ্টা করুন।
        </p>
        <button
          onClick={() => router.refresh()}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          আবার চেষ্টা করুন
        </button>
      </div>
    );
  }

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="p-4 text-center font-solaimanlipi min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-700 mb-4">৪০৪</h1>
        <p className="text-lg text-gray-500 font-medium mb-6">
          {getLocationName()} এর জন্য কোনো নিউজ পাওয়া যায়নি
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          হোম পেজে ফিরে যান
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 font-solaimanlipi">
      {/* Header and Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h3 className="text-2xl md:text-2xl text-bold text-[var(--text-primary)] tracking-tight flex items-center gap-2">
            {getLocationName()}
            {districtName && !upazillaName && (
              <>
                <MdKeyboardDoubleArrowRight className="text-[var(--text-primary)] text-2xl" />
                <span className="text-[var(--text-primary)] text-2xl">{decodeURIComponent(districtName)}</span>
              </>
            )}
          </h3>
          {districtId && (
            <div className="mt-2">
              {upazillaLoading ? (
                <Skeleton height={20} width={300} />
              ) : upazillaData?.data?.length && upazillaData.data.length > 0 ? (
                <div className="flex flex-wrap justify-center items-center gap-2 text-gray-600">
                  <GoDotFill className="text-[var(--text-primary)] flex justify-center items-center text-[12px]" />
                  {upazillaData.data.map((upazilla: Upazilla, index: number) => (
                    <React.Fragment key={upazilla.id.toString()}>
                      <button
                        onClick={() => handleUpazilaClick(upazilla)}
                        className={`text-[16px] font-medium transition-colors ${
                          upazillaId === upazilla.id.toString()
                            ? "text-[var(--text-primary)] font-bold"
                            : "text-gray-600 hover:text-[var(--text-primary)]"
                        }`}
                      >
                        {upazilla.bn_name}
                      </button>
                      {index < (upazillaData.data?.length ?? 0) - 1 && (
                        <GoDotFill className="text-[var(--text-primary)] flex justify-center items-center text-[12px]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">কোনো উপজেলা পাওয়া যায়নি</p>
              )}
            </div>
          )}
        </div>
        <div className="relative w-full md:w-auto">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="নিউজ খুঁজুন..."
            className="w-full md:w-64 p-2 pl-10 pr-4 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <FaSearchka 
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* News Cards */}
        <div className="col-span-1 md:col-span-2">
          <div className="space-y-8">
            {filteredData.map((news) => (
              <div
                key={news.id}
                className="flex flex-col md:flex-row gap-5 pb-4 border-b border-gray-200 cursor-pointer transition-shadow duration-200"
                onClick={() => router.push(`/${news.category.slug}/${news.id}/${news.slug}`)}
              >
                <div className="flex-shrink-0 w-full md:w-80">
                  <Image
                    src={fileObjectToLink(news.banner_image)}
                    alt={news.headline || "News banner"}
                    width={320}
                    height={200}
                    className="object-cover rounded-lg w-full h-48 md:h-40"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 hover:text-[var(--text-primary)] transition-colors">
                    {news.headline}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 font-medium">
                    {news.short_headline}
                  </p>
                  <p className="text-gray-500 text-sm font-medium">
                    {date_output_bn(news.publish_date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <Image
              src="https://tpc.googlesyndication.com/simgad/3745460761502011018"
              alt="Advertisement"
              width={300}
              height={250}
              className="w-full rounded-lg"
            />
          </div>
          <TopNewsForNewsDetails count={5} />
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={scrollTop}
        className={`fixed z-50 bottom-6 right-6 w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700 transition-all duration-300 ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Back to Top"
      >
        <FaArrowUp size={20} />
      </button>
    </div>
  );
}