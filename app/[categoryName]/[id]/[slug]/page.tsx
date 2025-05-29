import instance from "@/utils/instance";
import { Metadata } from "next";
import rtrimSlash from "@/utils/utils";
// import { useParams } from "next/navigation";
import SinglePostMain from "../../../../components/singlePost/SinglePostMain";

type Props = {
  params: { categoryName: string; slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};



// export async function generateMetadata({
//   params,
//   searchParams,
// }: Props): Promise<Metadata> {
//   const { data } = await instance.get(`/metadata?encode_title=${params?.slug}`);

//   const { title, image, meta_keyword, meta_description, site_name } =
//     data?.data;

//   return {
//     title: title,
//     description: meta_description,
//     keywords: [meta_keyword],
//     openGraph: {
//       title: title,
//       description: meta_description,
//       url: site_name,
//       siteName: site_name,
//       images: [
//         {
//           url: image,
//           secureUrl: image,
//           width: 800,
//           height: 600,
//         },
//       ],
//       type: "website",
//     },
//   };
// }

// change

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const categoryName = params.categoryName;
  const subCategory  = params.slug.length>1 ? params.slug[0] :null;
  const id: string   = params.slug.length>1 ? params.slug[1] :params.slug[0];
  //console.log(categoryName, subCategory, id);
  try {
    // Use async/await instead of .then()
    // const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/post-detail/${params?.slug}`);
    const url = `${rtrimSlash(process.env.NEXT_PUBLIC_URL)}/post-detail/${id}`;
    //console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    // console.log(data);

    if (data.status === true && data.data) {
      const { title, image_thumb, stitle, excerpt, category } = data.data;
      const url = `https://www.dailyniropekkho.com/${categoryName}/${id}`;

      return {
        title: title,
        description: excerpt || title,
        openGraph: {
          title: title,
          description: excerpt || title,
          url: url,
          siteName: 'দৈনিক নিরপেক্ষ',
          images: [
            {
              url: image_thumb,
              secureUrl: image_thumb,
              width: 800,
              height: 600,
            },
          ],
          type: "website",
        },
      };
    }

    // Return default metadata if no valid data
    return getDefaultMetadata(params);
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return getDefaultMetadata(params);
  }
}

// Separate function for default metadata
function getDefaultMetadata(params: Props['params']): Metadata {
  const categoryName = params.categoryName;
  const subCategory  = params.slug.length>1 ? params.slug[0] :null;
  const id: string   = params.slug.length>1 ? params.slug[1] :params.slug[0];
  return {
    title: '',
    description: '',
    openGraph: {
      title: '',
      description: '',
      url: `${process.env.NEXT_PUBLIC_URL}/${categoryName}/${id}`,
      siteName: 'দৈনিক নিরপেক্ষ',
      images: [
        {
          url: '',
          secureUrl: '',
          width: 800,
          height: 600,
        },
      ],
      type: 'website',
    },
  };
}

export default function SinglePost({ params }: any) {
  
  return <SinglePostMain news_id={params.id} />;
}
