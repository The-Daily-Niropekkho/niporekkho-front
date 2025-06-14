"use client";

import TopBreakingNews from "@/components/common/breaking-news/top-breaking-news";
import HomePageSkeleton from "@/components/skeleton/HomePageSkeleton";
import {  useGetAllVideosQuery, useGetMultipleCategoryDataQuery, useGetTopHomeDataQuery } from "@/redux/features/home-data/homeApi";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import config, { EnumCategoryIds } from "../../../config";
import NewsOnly from "../newsOnly/NewsOnly";
import NewsOnlyTwo from "../newsOnlyTwo/NewsOnlyTwo";
import NewsRelatedWithAdd from "../newsRelatedWithAdd/NewsRelatedWithAdd";
import NewsWithAdd from "../newsWithAdd/NewsWithAdd";
import NewsWithLatest from "../newsWithLatest/NewsWithLatest";
import NewsWithLatestTwo from "../newsWithLatestTwo/NewsWithLatestTwo";
import PhotoGallery from "../photoGallery/PhotoGallery";
import TopNews from "../topNews/TopNews";
import { HomeData, HomeNews } from "@/types/homeData";
import { Video } from "../Video";

// Dummy data (unchanged)
const dummyAds = {
  home_12: {
    id: "ad-12",
    url: "https://i.ibb.co/G4nTQbTF/81e6f6b5-fc6e-4f58-b5e9-e8928204b428.jpg",
    link: "https://dailyniropekkho.com/",
  },
  home_13: {
    id: "ad-13",
    url: "https://i.ibb.co/RTFyHLvK/325-66.webp",
    link: "https://flyghor.com/",
  },
  home_14: {
    id: "ad-14",
    url: "https://via.placeholder.com/300x250",
    link: "https://example.com/",
  },
};

const dummySideData = {
  position: "14",
  category_name: "অভিমত",
  slug: "opinion",
  category_id: process.env.NEXT_PUBLIC_OPINION_ID,
  status: "active",
  post: [
    {
      news_id: "opinion-1",
      post_title: "মতামত: শিক্ষা ব্যবস্থার উন্নতি প্রয়োজন",
      stitle: "শিক্ষার মান বৃদ্ধি",
      excerpt: "বাংলাদেশের শিক্ষা ব্যবস্থায় বড় ধরনের সংস্কার প্রয়োজন।",
      image_large: "https://via.placeholder.com/300x200",
      image_thumb: "https://via.placeholder.com/100x100",
      encode_titl: "শিক্ষা-ব্যবস্থার-উন্নতি",
      category: "opinion",
      category_name: "অভিমত",
      post_date: "2025-05-24T10:00:00.000Z",
      video: null,
      post_by_name: "ড. আহমেদ হোসেন",
      post_by_image: "https://via.placeholder.com/100x100",
    },
    // ... (other dummy posts unchanged)
  ],
};

const dummyYouTubeData = [
  {
    category: "Science",
    id: "yt-1",
    title: "Understanding Quantum Physics",
    url: "https://youtube.com/watch?v=yt-1",
    description: "A deep dive into the world of quantum mechanics.",
    thumbnail: "https://via.placeholder.com/320x180",
    uploadDate: "2025-05-24T10:00:00.000Z",
    channelName: "Physics World",
    channelLogo: "https://via.placeholder.com/50x50",
  },
  // ... (other dummy videos unchanged)
];

const HomeMain = () => {
  const pathname = usePathname();
  const {
    data: topHomeData,
    isLoading: isTopLoading,
    error: topError,
  } = useGetTopHomeDataQuery({
    categoryIds: [
    
  ]});
  const {
    data: videos,
    isLoading: isVideosLoading,
    error: videosError,
  } = useGetAllVideosQuery({
  });

  //top read news
  
  
  // Define category IDs from environment variables
  const categoryIds = [
    process.env.NEXT_PUBLIC_NATIONAL_ID!,
    process.env.NEXT_PUBLIC_POLITICS_ID!,
    process.env.NEXT_PUBLIC_CITIES_ID!,
    process.env.NEXT_PUBLIC_INTERNATIONAL_ID!,
    process.env.NEXT_PUBLIC_ACROSS_THE_COUNTRY_ID!,
    process.env.NEXT_PUBLIC_ECONOMY_ID!,
    process.env.NEXT_PUBLIC_VIDEO_ID!,
    process.env.NEXT_PUBLIC_ENTERTAINMENT_ID!,
    process.env.NEXT_PUBLIC_LIFESTYLE_ID!,
    process.env.NEXT_PUBLIC_LAW_AND_JUSTICE_ID!,
    process.env.NEXT_PUBLIC_EXPATRIATE_BANGLA_ID!,
    process.env.NEXT_PUBLIC_TECHNOLOGY_ID!,
    process.env.NEXT_PUBLIC_SPORTS_ID!,
    process.env.NEXT_PUBLIC_EDUCATION_ID!,
    process.env.NEXT_PUBLIC_OPINION_ID!,
  ].filter((id): id is string => !!id);

  // Fetch data for all categories
  const { data, isLoading, error } = useGetMultipleCategoryDataQuery({
    categoryIds,
  });
  const categoryData = data?.data as any[] | undefined;

  const mergedResult = categoryData?.reduce((acc, curr) => {
    for (const key in curr) {
      if (!acc[key]) {
        acc[key] = [];
      }
      const newsItems = curr[key].map((item: HomeData) => item.news);
      acc[key].push(...newsItems);
    }
    return acc;
  }, {});

  if (error) {
    return <div className='text-red-500 text-center'>There was an Error!</div>;
  }

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  const specialStyle = {
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    borderRadius: "10px",
  };

  return (
    <Fragment>
      {pathname === "/" && <TopBreakingNews />}

      {/* Top News: National */}
      {topHomeData && topHomeData.data.length > 0 && (
        <TopNews
          data={{
            // meta_title: "Top News",
            // meta_description: "Latest Top News from Daily Niropekkho",
            // created_by_id: "system",
            // image_id: null,
            // status: "active",
            // is_deleted: false,
            // createdAt: new Date().toISOString(),
            // updatedAt: new Date().toISOString(),
            serial_number: 0,
            serial_update_at: "",
            news: topHomeData?.data.flat() ?? [],
          }}
          sideData={{
            // opinion: mergedResult[config.allCategories.opinion_id] ?? [],
            opinion: mergedResult[EnumCategoryIds.opinion] ?? [],
          }}
          ads={dummyAds}
          videos={(videos?.data ?? []).map((v) => v.url)}
        />
      )}
      {/* News With Latest: National */}
      {mergedResult && mergedResult[EnumCategoryIds.national]?.length > 0 && (
        <NewsWithLatest
          data={{
            id: "cmb21n1870003mh98mvl9k85o",
            title: "জাতীয়",
            slug: "national",
            position: 1,
            position_update_at: null,
            is_home: true,
            position_in_home: null,
            position_in_home_update_at: null,
            description: "",
            meta_title: "জাতীয় সংবাদ",
            meta_description: "বাংলাদেশের জাতীয় সংবাদ",
            created_by_id: "system",
            image_id: null,
            status: "active",
            is_deleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            news: mergedResult[EnumCategoryIds.national] ?? [],
          }}
          // sideData={{
          //   opinion: dummySideData.post,
          // }}
          ads={dummyAds}
          topnews={true}
        />
      )}
      {/* News With Add: Politics and Cities */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.politics]?.length > 0 &&
        mergedResult[EnumCategoryIds.capital]?.length > 0 && (
          <NewsWithAdd
            dataOne={{
              id: "cmaxqech2000bmhaodnsm3yl8",
              title: "রাজনীতি",
              slug: "politics",
              position: 2,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "রাজনীতি সংবাদ",
              meta_description: "বাংলাদেশের রাজনীতি সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[config.allCategories.politics_id] ?? [],
            }}
            dataTwo={{
              id: "cmb4oyrc1000xmhrcr502d8gb",
              title: "রাজধানী",
              slug: "capital",
              position: 3,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "রাজধানী সংবাদ",
              meta_description: "বাংলাদেশের রাজধানী সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.capital] ?? [],
            }}
            ads={dummyAds}
          />
        )}

      {/* videos section */}
      <Video
        videos={(videos?.data ?? []).map((v) => v.url)}
        slug='video'
        category_name='ভিডিও'
      />
      {/* News Only: Across The Country */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.across_the_country]?.length > 0 && (
          <NewsOnly
            data={{
              id: "cmb21jjgj0005mhfc2lqjtaf0",
              title: "দেশজুড়ে",
              slug: "across-the-country",
              position: 4,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "দেশজুড়ে সংবাদ",
              meta_description: "বাংলাদেশের দেশজুড়ে সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.across_the_country] ?? [],
            }}
            ads={dummyAds}
          />
        )}
      {/* News Only Two: international */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.international]?.length > 0 && (
          <NewsOnlyTwo
            data={{
              id: "cmb21idgv0003mh2cmm51tw6j",
              title: "আন্তর্জাতিক",
              slug: "international",
              position: 13,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "আন্তর্জাতিক সংবাদ",
              meta_description: "বাংলাদেশের আন্তর্জাতিক সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.international] ?? [],
            }}
            style={specialStyle}
          />
        )}
      {/* News Related With Add: Economy */}
      {mergedResult && mergedResult[EnumCategoryIds.economy]?.length > 0 && (
        <NewsRelatedWithAdd
          data={{
            id: "cmb1zrh9r0003mhz4ykuthdrt",
            title: "অর্থনীতি",
            slug: "economy",
            position: 5,
            position_update_at: null,
            is_home: true,
            position_in_home: null,
            position_in_home_update_at: null,
            description: "",
            meta_title: "অর্থনীতি সংবাদ",
            meta_description: "বাংলাদেশের অর্থনীতি সংবাদ",
            created_by_id: "system",
            image_id: null,
            status: "active",
            is_deleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            news: mergedResult[EnumCategoryIds.economy] ?? [],
          }}
          ads={dummyAds}
          videos={dummyYouTubeData.map((v) => v.url)}
        />
      )}
      {/* News Only Two: Entertainment */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.entertainment]?.length > 0 && (
          <NewsOnlyTwo
            data={{
              id: "cmb6j5ymk0003mhqgko5f8ol7",
              title: "বিনোদন",
              slug: "entertainment",
              position: 7,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "বিনোদন সংবাদ",
              meta_description: "বাংলাদেশের বিনোদন সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.entertainment] ?? [],
            }}
            style={specialStyle}
          />
        )}
      {/* News Only: Lifestyle */}
      {mergedResult && mergedResult[EnumCategoryIds.lifestyle]?.length > 0 && (
        <NewsOnly
          data={{
            id: "cmb21d1wg0007mhu0bi2jacsa",
            title: "লাইফস্টাইল",
            slug: "lifestyle",
            position: 8,
            position_update_at: null,
            is_home: true,
            position_in_home: null,
            position_in_home_update_at: null,
            description: "",
            meta_title: "লাইফস্টাইল সংবাদ",
            meta_description: "বাংলাদেশের লাইফস্টাইল সংবাদ",
            created_by_id: "system",
            image_id: null,
            status: "active",
            is_deleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            news: mergedResult[EnumCategoryIds.lifestyle] ?? [],
          }}
          ads={dummyAds}
        />
      )}
      {/* News Only Two: Law and Justice */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.law_and_justice]?.length > 0 && (
          <NewsOnlyTwo
            data={{
              id: "cmb219x46000bmhdkuu8z59cw",
              title: "আইন-আদালত",
              slug: "law-and-justice",
              position: 9,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "আইন-আদালত সংবাদ",
              meta_description: "বাংলাদেশের আইন-আদালত সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.law_and_justice] ?? [],
            }}
            style={specialStyle}
          />
        )}
      {/* News With Latest Two: Expatriate Bangla and Technology */}
      {mergedResult &&
        mergedResult[EnumCategoryIds.expatriate_bangla]?.length > 0 &&
        mergedResult[EnumCategoryIds.technology]?.length > 0 && (
          <NewsWithLatestTwo
            dataOne={{
              id: "cmb218pdu0007mhdkoer7a3qx",
              title: "প্রবাস বাংলা",
              slug: "expatriate-bangla",
              position: 11,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "প্রবাস বাংলা সংবাদ",
              meta_description: "বাংলাদেশের প্রবাস বাংলা সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.expatriate_bangla] ?? [],
            }}
            dataTwo={{
              id: "technology",
              title: "প্রযুক্তি",
              slug: "technology",
              position: 12,
              position_update_at: null,
              is_home: true,
              position_in_home: null,
              position_in_home_update_at: null,
              description: "",
              meta_title: "প্রযুক্তি সংবাদ",
              meta_description: "বাংলাদেশের প্রযুক্তি সংবাদ",
              created_by_id: "system",
              image_id: null,
              status: "active",
              is_deleted: false,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              news: mergedResult[EnumCategoryIds.technology] ?? [],
            }}
          />
        )}
      {/* PhotoGallery (static, no category data) */}
      <PhotoGallery />
      {/* News Only Two: Sports */}
      {mergedResult && mergedResult[EnumCategoryIds.sports]?.length > 0 && (
        <NewsOnlyTwo
          data={{
            id: "cmb21g29o0003mhv06mg8p0eo",
            title: "খেলা",
            slug: "sports",
            position: 13,
            position_update_at: null,
            is_home: true,
            position_in_home: null,
            position_in_home_update_at: null,
            description: "",
            meta_title: "খেলা সংবাদ",
            meta_description: "বাংলাদেশের খেলা সংবাদ",
            created_by_id: "system",
            image_id: null,
            status: "active",
            is_deleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            news: mergedResult[EnumCategoryIds.sports] ?? [],
          }}
          style={specialStyle}
        />
      )}
    </Fragment>
  );
};

export default HomeMain;
