// import Image from "next/image";

// interface AddBannerProps {
//   imgPath: string;
//   clss?: string;
// }

// const AddBanner = ({ imgPath, clss = "mt-[60px]" }: AddBannerProps) => {
//   return (
//     <section className={clss}>
//       <div className='container flex items-center justify-center px-4 mx-auto '>
//         {imgPath && (
//           <Image
//             src={`https://i.ibb.co/nq12rChP/add-1.webp`}
//             alt='ads'
//             width={1200}
//             height={100}
//             className='h-24'
//           />
//         )}
//       </div>
//     </section>
//   );
// };

// export default AddBanner;
interface AddBannerProps {
  imgPath: string;
  clss?: string;
}

const AddBanner = ({ imgPath, clss = "mt-[60px]" }: AddBannerProps) => {
  return (
    <section className={clss}>
      <div className="container flex items-center justify-center px-4 mx-auto ">
        {imgPath && (
          <div
            className="[&>p]:mt-5"
            dangerouslySetInnerHTML={{ __html: imgPath }}
          />
        )}
      </div>
    </section>
  );
};

export default AddBanner;
