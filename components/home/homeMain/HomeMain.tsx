"use client";

import AddBanner from "@/components/common/addBanner/AddBanner";
import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
import fetcher from "@/utils/fetcher";
import {Fragment} from "react";
import useSWR from "swr";
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

const HomeMain = () => {
    // const { theme } = useTheme();

    const {
        data,
        error,
        isLoading,
    }: { data: any; error: any; isLoading: boolean } = useSWR(
        "/home-page",
        fetcher
    );

    if (error) return <div>There was an Error!</div>;

    if (isLoading) return <HomePageSkeleton/>;

    const specialStyle = {
        // backgroundColor: "#fbfaf3",
        // boxShadow: "-1px 1px 5px 5px rgba(0, 0, 0, 0.05)",
        paddingTop: "0.8rem",
        paddingBottom: "0.8rem",
        borderRadius: "10px"
    };

    // console.log(data?.newsByCategory[9]);

    return (
      <Fragment>
        {/* Hot news here */}
        {data?.top_braking?.post?.length > 0 && (
          <HotNews data={data?.top_braking} style={specialStyle} />
        )}
        {/* home ads 11 here */}
        {data?.ads.home_11 && (
          <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
        )}
        {/* top news here */}
        {/* home ads 12 && 13 here */}

        {data?.topNews && (
          <TopNews
            data={data.topNews.slice(0, 9)}
            sideData={data?.newsByCategory[9]}
            ads={data?.ads}
          />
        )}
        {data?.ads.home_11 && (
          <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
        )}
        {/* news By position 1 */}
        {data?.newsByCategory[0] && (
          <NewsWithLatest data={data?.newsByCategory[0]} topnews={true} />
        )}
        {/* home ads 14 here */}
        {/* news By position 2 */}
        {data?.ads.home_11 && (
          <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
        )}
        {data?.newsByCategory[1] && (
          <NewsWithAdd data={data?.newsByCategory[1]} ads={data?.ads} />
        )}
        {/* home ads 15 here */}
        {data?.ads?.home_15 && (
          <AddBanner imgPath={data?.ads?.home_15} clss='mt-7 -mb-10' />
        )}
        {/* news By position 3 */}
        {data?.newsByCategory[2] && <NewsOnly data={data?.newsByCategory[2]} />}

        {data?.videos && (
          <Video
            videos={data.videos.data.slice(0, 3)}
            slug={"video"}
            category_name='ভিডিও'
          />
        )}
        {data?.ads.home_11 && (
          <AddBanner imgPath={data?.ads.home_17} clss='mt-5' />
        )}
        {/* news By position 4 */}
        {/* home ads 16 here */}
        {data?.newsByCategory[3] && (
          <NewsRelatedWithAdd
            data={data?.newsByCategory[3]}
            ads={data?.ads}
            videos={data?.videos}
          />
        )}
        {/* home ads 17 here */}
        {data?.ads.home_17 && (
          <AddBanner imgPath={data?.ads.home_17} clss='mt-7 -mb-10' />
        )}
        {/* news By position 5 */}
        {data?.newsByCategory[4] && (
          <NewsOnlyTwo data={data?.newsByCategory[4]} />
        )}
        {/* news By position 6 */}
        {data?.newsByCategory[5] && (
          <NewsOnly
            data={data?.newsByCategory[5]}
            //topnews={false}
            //latest-post
            //end_point="/populer-post"
          />
        )}
        {/* <NewsOnly data={data.newsByCategory[5]} /> */}
        {/* news By position 7 */}
        {data?.newsByCategory[6] && (
          <NewsOnlyTwo data={data?.newsByCategory[6]} style={specialStyle} />
        )}

        {/* news By position 8 and 9  */}
        {data?.newsByCategory[7] && data?.newsByCategory[8] && (
          <NewsWithLatestTwo
            dataOne={data?.newsByCategory[7]}
            dataTwo={data?.newsByCategory[8]}
          />
        )}
        {/* news By position 4  */}
        {data && <PhotoGallery />}
        {/* news By position 4  */}
        {data?.newsByCategory[10] && (
          <NewsOnlyTwo data={data?.newsByCategory[10]} />
          // <VideoGallery data={data?.newsByCategory[11]}/>
        )}
        {/* home ads 18 here */}
        {data?.ads.home_18 && (
          <AddBanner imgPath={data?.ads.home_18} clss='mt-5 -mb-10' />
        )}
        {data?.ads.home_11 && (
          <AddBanner imgPath={data?.ads.home_11} clss='mt-5' />
        )}
      </Fragment>
    );
};

export default HomeMain;
