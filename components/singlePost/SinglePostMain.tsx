"use client";

import SingleNewsDetails from "@/components/singleNews/SingleNewsDetails";
import NotFoundBody from "@/ui/notFoundBody/NotFoundBody";
import PostDetailsSkeleton from "@/components/skeleton/PostDetailsSkeleton";
import {
  useGetNewsBySlugQuery,
  useGetAllNewsQuery,
} from "@/redux/features/news/newsApi";
import { useParams } from "next/navigation";
import notFoundImg from "@/public/images/not-found.png";

const SinglePostMain = ({ news_id }: { news_id: string }) => {
  console.log(news_id)
  const param = useParams();
  const slug = Array.isArray(param.slug)
    ? param.slug[param.slug.length - 1]
    : param.slug;
  const categorySlug = param.categoryName as string;

  // Fetch main news article
  const { data: newsData, isLoading, error } = useGetNewsBySlugQuery(news_id);

  // Fetch related news (limit=4, same category)
  const { data: relatedNewsData } = useGetAllNewsQuery({
    limit: 4,
    category_id: newsData?.category_id || "",
    
  }, {
    skip: !newsData?.category_id
  }
  );
  // Combine main news and related news into items
  const items = newsData
    ? [{ ...newsData, relatedPost: relatedNewsData?.data || [] }]
    : [];

  // Handle error
  if (error) {
    return <NotFoundBody title='Error loading news' img={notFoundImg} />;
  }

  // Handle loading
  if (isLoading) {
    return <PostDetailsSkeleton />;
  }

  return (
    <div>
      {items.map((item, i) => (
        <SingleNewsDetails news_id={news_id} key={i} data={item} clss='mt-[15px]' />
      ))}
    </div>
  );
};

export default SinglePostMain;
