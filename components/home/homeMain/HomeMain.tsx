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
import { useGetAllCategoriesQuery } from "@/redux/features/category/categoryApi";

// chng: Define dummy ads data
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

// chng: Define dummy sideData for অভিমত
const dummySideData = {
  position: "14",
  category_name: "অভিমত",
  slug: "opinion",
  category_id: "cmb21eyll0003mh3sfrtly74b",
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
    {
      news_id: "opinion-2",
      post_title: "অর্থনীতির ভবিষ্যৎ: একটি বিশ্লেষণ",
      stitle: "অর্থনৈতিক প্রবৃদ্ধি",
      excerpt: "বাংলাদেশের অর্থনীতি কীভাবে এগিয়ে যাবে তা নিয়ে আলোচনা।",
      image_large: "https://via.placeholder.com/300x200",
      image_thumb: "https://via.placeholder.com/100x100",
      encode_titl: "অর্থনীতির-ভবিষ্যৎ",
      category: "opinion",
      category_name: "অভিমত",
      post_date: "2025-05-24T09:30:00.000Z",
      video: null,
      post_by_name: "প্রফেসর রহিমা খাতুন",
      post_by_image: "https://via.placeholder.com/100x100",
    },
    {
      news_id: "opinion-3",
      post_title: "পরিবেশ সুরক্ষায় আমাদের ভূমিকা",
      stitle: "পরিবেশ সংরক্ষণ",
      excerpt: "পরিবেশ দূষণ রোধে জনগণের অংশগ্রহণ জরুরি।",
      image_large: "https://via.placeholder.com/300x200",
      image_thumb: "https://via.placeholder.com/100x100",
      encode_titl: "পরিবেশ-সুরক্ষা",
      category: "opinion",
      category_name: "অভিমত",
      post_date: "2025-05-24T09:00:00.000Z",
      video: null,
      post_by_name: "মো. আলী আকবর",
      post_by_image: "https://via.placeholder.com/100x100",
    },
  ],
};
// Define dummy YouTube data
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
  {
    category: "Cooking",
    id: "yt-2",
    title: "The Art of Cooking",
    url: "https://youtube.com/watch?v=yt-2",
    description: "Learn to cook delicious dishes with simple steps.",
    thumbnail: "https://via.placeholder.com/320x180",
    uploadDate: "2025-05-23T09:30:00.000Z",
    channelName: "Culinary Arts",
    channelLogo: "https://via.placeholder.com/50x50",
  },
  {
    category: "Travel",
    id: "yt-3",
    title: "Travel Vlog: Exploring the Alps",
    url: "https://youtube.com/watch?v=yt-3",
    description: "Join us on our adventure through the beautiful Alps.",
    thumbnail: "https://via.placeholder.com/320x180",
    uploadDate: "2025-05-22T08:00:00.000Z",
    channelName: "Travel Diaries",
    channelLogo: "https://via.placeholder.com/50x50",
  },
  {
    category: "Education",
    id: "yt-4",
    title: "Introduction to Programming",
    url: "https://youtube.com/watch?v=yt-4",
    description: "A beginner's guide to programming in Python.",
    thumbnail: "https://via.placeholder.com/320x180",
    uploadDate: "2025-05-21T07:30:00.000Z",
    channelName: "Code Academy",
    channelLogo: "https://via.placeholder.com/50x50",
  },
  {
    category: "Fitness",
    id: "yt-5",
    title: "Yoga for Beginners",
    url: "https://youtube.com/watch?v=yt-5",
    description: "Basic yoga poses for health and wellness.",
    thumbnail: "https://via.placeholder.com/320x180",
    uploadDate: "2025-05-20T07:00:00.000Z",
    channelName: "Yoga Zone",
    channelLogo: "https://via.placeholder.com/50x50",
  },
];


const HomeMain = () => {
  const { data, error, isLoading } = useGetAllCategoriesQuery(
    { sortBy: "position", sortOrder: "asc", limit: 500 },
    { skip: false },
  );

  // chng: Debug data
  console.log("HomeMain - Categories Data:", data?.data);

  if (error)
    return <div className='text-red-500 text-center'>There was an Error!</div>;

  if (isLoading) return <HomePageSkeleton />;

  const specialStyle = {
    // backgroundColor: "#fbfaf3",
    // boxShadow: "-1px 1px 5px 5px rgba(0, 0, 0, 0.05)",
    paddingTop: "0.8rem",
    paddingBottom: "0.8rem",
    borderRadius: "10px",
  };

  return (
    <Fragment>
      {/* Hot news here */}
      {/* {data?.top_braking?.post?.length > 0 && (
        <HotNews data={data?.top_braking} style={specialStyle} />
      )} */}
      {/* home ads 11 here */}
      {/* {data?.ads.home_11 && (
        <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
      )} */}
      {/* top news here */}
      {(data?.data?.[0]?.news?.length ?? 0) > 0 && (
        <TopNews
          data={data?.data?.[0]} // chng: Pass raw category data
          sideData={dummySideData}
          ads={dummyAds}
        />
      )}
      {/* home ads 12 && 13 here */}
      {/* {data?.ads.home_11 && (
        <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
      )} */}
      {/* news By position 1 */}
      {(data?.data?.[1]?.news?.length ?? 0) > 0 && (
        <NewsWithLatest
          data={data?.data?.[1]} // chng: Corrected to data.data[1]
          sideData={dummySideData}
          ads={dummyAds}
          topnews={true}
        />
      )}
      {/* {data?.newsByCategory[0] && (
        <NewsWithLatest data={data?.newsByCategory[0]} topnews={true} />
      )} */}
      {/* home ads 14 here */}
      {/* {data?.ads.home_11 && (
        <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
      )} */}
      {/* news By position 2 & 3 */}
      {(data?.data?.[2]?.news?.length ?? 0) > 0 &&
        (data?.data?.[0]?.news?.length ?? 0) > 0 &&
        data?.data?.[3] !== undefined &&
        data?.data?.[0] !== undefined && (
          <NewsWithAdd
            dataOne={data.data[2]}
            dataTwo={data.data[3]}
            ads={dummyAds}
          />
        )}
      {/* home ads 15 here */}
      {/* {data?.ads?.home_15 && (
        <AddBanner imgPath={data?.ads?.home_15} clss='mt-7 -mb-10' />
      )} */}
      {/* news By position 4 */}
      {(data?.data?.[4]?.news?.length ?? 0) > 0 && (
        <NewsOnly data={data!.data![4]} ads={dummyAds} />
      )}

      {<Video videos={dummyYouTubeData} slug={"video"} category_name='ভিডিও' />}
      {/* {data?.ads.home_11 && (
        <AddBanner imgPath={data?.ads.home_17} clss='mt-5' />
      )} */}
      {/* news By position 5 */}
      {(data?.data?.[5]?.news?.length ?? 0) > 0 && data?.data?.[5] && (
        <NewsRelatedWithAdd
          data={data.data[5]}
          ads={dummyAds} // Use dummyAds instead of data.ads
          videos={dummyYouTubeData.map((v) => v.url)} // Map to URLs
        />
      )}
      {/* home ads 17 here */}
      {/* {data?.ads.home_17 && (
        <AddBanner imgPath={data?.ads.home_17} clss='mt-7 -mb-10' />
      )} */}
      {/* news By position 6 */}
      {(data?.data?.[6]?.news?.length ?? 0) > 0 && (
        <NewsOnlyTwo data={data!.data![6]} style={specialStyle} />
      )}
      {/* news By position 7 */}
      {(data?.data?.[7]?.news?.length ?? 0) > 0 && (
        <NewsOnly data={data!.data![7]} ads={dummyAds} />
      )}
      {/* news By position 8 */}
      {(data?.data?.[8]?.news?.length ?? 0) > 0 && (
        <NewsOnlyTwo data={data?.data?.[8]} style={specialStyle} />
      )}
      {/* news By position 9 and 10 */}
      {(data?.data?.[9]?.news?.length ?? 0) > 0 &&
        (data?.data?.[10]?.news?.length ?? 0) > 0 &&
        data?.data?.[9] &&
        data?.data?.[10] && (
          <NewsWithLatestTwo dataOne={data.data[9]} dataTwo={data.data[10]} />
        )}
      {/* news By position 4 */}
      {/* {data && <PhotoGallery />} */}
      {/* news By position 11 */}
      {(data?.data?.[11]?.news?.length ?? 0) > 0 && (
        <NewsOnlyTwo data={data?.data?.[11]} style={specialStyle} />
      )}
      {/* home ads 18 here */}
      {/* {data?.ads.home_18 && (
        <AddBanner imgPath={data?.ads.home_18} clss='mt-5 -mb-10' />
      )} */}
      {/* {data?.ads.home_11 && (
        <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
      )} */}
    </Fragment>
  );
};

export default HomeMain;
