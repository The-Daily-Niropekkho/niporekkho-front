"use client";

import AddBanner from "@/components/common/addBanner/AddBanner";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import { Fragment } from "react";
import VideoGallery from "../VideoGallery";
import HotNews from "../hotNews/HotNews";
import NewsOnly from "../newsOnly/NewsOnly";
import NewsOnlyTwo from "../newsOnlyTwo/NewsOnlyTwo";
import NewsRelatedWithAdd from "../newsRelatedWithAdd/NewsRelatedWithAdd";
import NewsWithAdd from "../newsWithAdd/NewsWithAdd";
import NewsWithFourCol from "../newsWithFourCol/NewsWithFourCol";
import NewsWithLatest from "../newsWithLatest/NewsWithLatest";
import NewsWithLatestTwo from "../newsWithLatestTwo/NewsWithLatestTwo";
import PhotoGallery from "../photoGallery/PhotoGallery";
import TopNews from "../topNews/TopNews";
import HomePageSkeleton from "@/components/skeleton/HomePageSkeleton";
import { Video } from "../Video";
import { useGetAllNewsQuery } from "@/redux/features/news/newsApi";
import { usePathname } from "next/navigation";
import TopBreakingNews from "@/components/common/breaking-news/top-breaking-news";

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
  //  position 1
  const nationalNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_NATIONAL_ID!,
  });
  //  position 2 & 3
  const politicsNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_POLITICS_ID!,
  });
  const citiesNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_CITIES_ID!,
  });

  // position 4
  const internationalNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_INTERNATIONAL_ID!,
  });
  // position 5
  const acrossTheCountryNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_ACROSS_THE_COUNTRY_ID!,
  });
  // position 6
  const economyNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_ECONOMY_ID!,
  });
  // position 7
  const videoNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_VIDEO_ID!,
  });
  // position 8
  const entertainmentNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_ENTERTAINMENT_ID!,
  });
  // position 9
  const lifestyleNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_LIFESTYLE_ID!,
  });
  // position 10
  const lawAndJusticeNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_LAW_AND_JUSTICE_ID!,
  });
  // position 11
  const expatriateBanglaNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_EXPATRIATE_BANGLA_ID!,
  });
  // position 12
  const technologyNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_TECHNOLOGY_ID!,
  });
// position 13
  const sportsNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_SPORTS_ID!,
  });
  
 

  const educationNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_EDUCATION_ID!,
  });
  const opinionNews = useGetAllNewsQuery({
    limit: 10,
    category_id: process.env.NEXT_PUBLIC_OPINION_ID!,
  });
 

  // Check loading state for all queries
  const isLoading =
    nationalNews.isLoading ||
    politicsNews.isLoading ||
    internationalNews.isLoading ||
    sportsNews.isLoading ||
    entertainmentNews.isLoading ||
    economyNews.isLoading ||
    technologyNews.isLoading ||
    lifestyleNews.isLoading ||
    educationNews.isLoading ||
    opinionNews.isLoading ||
    videoNews.isLoading;

  // Check error state
  const hasError =
    nationalNews.error ||
    politicsNews.error ||
    internationalNews.error ||
    sportsNews.error ||
    entertainmentNews.error ||
    economyNews.error ||
    technologyNews.error ||
    lifestyleNews.error ||
    educationNews.error ||
    opinionNews.error ||
    videoNews.error;

  // Debug data\

  if (hasError) {
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
      {(nationalNews.data?.data?.length ?? 0) > 0 && (
        <TopNews
          data={{
            id: "",
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
            news: nationalNews.data?.data ?? [],
          }}
          sideData={{
            ...dummySideData,
            category_id: dummySideData.category_id ?? "default-opinion-id",
          }}
          ads={dummyAds}
        />
      )}
      {/* news position 1 জাতীয় */}
      {(nationalNews.data?.data?.length ?? 0) > 0 && (
        <NewsWithLatest
          data={{
            id: "national-category",
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
            news: nationalNews.data?.data ?? [],
          }}
          sideData={{
            ...dummySideData,
            category_id: dummySideData.category_id ?? "default-opinion-id",
          }}
          ads={dummyAds}
          topnews={true}
        />
      )}
      {/* new position 2 & 3  রাজনীতি and রাজধানী */}
      {(politicsNews.data?.data?.length ?? 0) > 0 &&
        (citiesNews.data?.data?.length ?? 0) > 0 && (
          <NewsWithAdd
            dataOne={{
              id: "politics-category",
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
              news: politicsNews.data?.data ?? [],
            }}
            dataTwo={{
              id: "capital-category",
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
              news: citiesNews.data?.data ?? [],
            }}
            ads={dummyAds}
          />
        )}
      {/* new position 4  দেশজুড়ে*/}
      {(acrossTheCountryNews.data?.data?.length ?? 0) > 0 && (
        <NewsOnly
          data={{
            id: "across-the-country",
            title: "দেশজুড়ে",
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
            news: citiesNews.data?.data ?? [],
          }}
          ads={dummyAds}
        />
      )}
      {/* new position 5  অর্থনীতি */}
      {(economyNews.data?.data?.length ?? 0) > 0 && (
        <NewsRelatedWithAdd
          data={{
            id: "economy",
            title: "অর্থনীতি",
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
            news: citiesNews.data?.data ?? [],
          }}
          ads={dummyAds}
          videos={dummyYouTubeData.map((v) => v.url)}
        />
      )}
      {/* new position 6  ভিডিও */}
      {/* {(videoNews.data?.data?.length ?? 0) > 0 && (
        <Video
          videos={
            videoNews.data?.data?.map((item) => ({
              url: item.video || dummyYouTubeData[0].url,
              thumbnail:
                item.banner_image?.url || dummyYouTubeData[0].thumbnail,
              title: item.headline,
              description: item.excerpt || "",
              uploadDate: item.publish_date,
              channelName: item.post_by_name || "Unknown",
              channelLogo:
                item.post_by_image || dummyYouTubeData[0].channelLogo,
            })) ?? []
          }
          slug='video'
          category_name='ভিডিও'
        />
      )} */}

      {/* news position 7  বিনোদন */}
      {(entertainmentNews.data?.data?.length ?? 0) > 0 && (
        <NewsOnlyTwo
          data={{
            id: "entertainment",
            title: "বিনোদন",
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
            news: citiesNews.data?.data ?? [],
          }}
          style={specialStyle}
        />
      )}
      {/* news position 8  লাইফস্টাইল */}
      {(lifestyleNews.data?.data?.length ?? 0) > 0 && (
        <NewsOnly
          data={{
            id: "lifestyle",
            title: "লাইফস্টাইল",
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
            news: citiesNews.data?.data ?? [],
          }}
          ads={dummyAds}
        />
      )}
      {/* news position 9  আইন-আদালত */}
      {(lawAndJusticeNews.data?.data?.length ?? 0) > 0 && (
        <NewsOnlyTwo
          data={{
            id: "law-court",
            title: "আইন-আদালত",
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
            news: citiesNews.data?.data ?? [],
          }}
          style={specialStyle}
        />
      )}

      {/* news position 11 & 12  প্রবাস বাংলা এবং প্রযুক্তি */}
      {(expatriateBanglaNews.data?.data?.length ?? 0) > 0 &&
        (technologyNews.data?.data?.length ?? 0) > 0 && (
          <NewsWithLatestTwo
            dataOne={{
              id: "expatriate-bangla",
              title: "প্রবাস বাংলা",
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
              news: citiesNews.data?.data ?? [],
            }}
            dataTwo={{
              id: "technology",
              title: "প্রযুক্তি",
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
              news: citiesNews.data?.data ?? [],
            }}
          />
        )}
      {/* PhotoGallery (static, no category data) */}
      <PhotoGallery />

      {/* news position 13  খেলা */}
      {(sportsNews.data?.data?.length ?? 0) > 0 && (
        <NewsOnlyTwo
          data={{
            id: "sports",
            title: "খেলা",
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
            news: citiesNews.data?.data ?? [],
          }}
          style={specialStyle}
        />
      )}
    </Fragment>
  );
};

export default HomeMain;
