// "use client";

// import { NewsItem } from "@/interface/post";
// import CalenderIcon from "@/public/icons/CalenderIcon";
// import MagnifyIcon from "@/public/icons/MagnifyIcon";
// import ThreeDotsLoader from "@/ui/threeDotsLoader/ThreeDotsLoader";
// import fetcher from "@/utils/fetcher";
// import formateDateYMD from "@/utils/formateDateYMD";
// import instance from "@/utils/instance";
// import {timestampToEnglishDateWithTimeInArchive} from "@/utils/timestampToBangleDateWithTime";
// import { addDays, subDays } from "date-fns";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import DatePicker from "react-datepicker";
// import useSWR from "swr";
// import ArchiveSkeleton from "@/components/skeleton/ArchiveSkeleton";

// import {
//     faMagnifyingGlass

// } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import TopNews from "@/components/singleNews/TopNews";

// type SubCategory = {
//     menu_lavel: string;
//     slug: string;
//     menu_content_id: number;
// };

// type CategoryItem = {
//     menu_lavel: string;
//     slug: string;
//     menu_content_id: number;
//     categorieslevelone: SubCategory[];
// };

// type CategoryData = CategoryItem[];

// export default function ArchivePage() {
//     const [checkInDate, setCheckInDate] = useState(null);
//     const [checkOutDate, setCheckOutDate] = useState(null);
//     const [category, setCategory] = useState("");
//     const [archiveLimit, setArchiveLimit] = useState(12)
//     const [archiveData, setArchiveData] = useState<NewsItem[]>([]);
//     // const [initialData, setInitialData] = useState<any>([])
//     const [isArchiveLoading, setIsArchiveLoading] = useState(false);
//     const [archiveError, setArchiveError] = useState("");
//     const [latestError, setLatestError] = useState("");
//     const [latestIsLoading, setLatestIsLoading] = useState(true);

//     const [pageNumber, setPageNumber] = useState(0);

//     const loaderRef = useRef<HTMLDivElement>(null);
//     const [isBottom, setIsBottom] = useState(false); // Detect if we're at the bottom

//     //sidebar-categories API call. And get categories data
//     const {
//         data,
//         error,
//         isLoading,
//     }: { data: CategoryData; error: any; isLoading: boolean } = useSWR(
//         "/sidebar-categories",
//         fetcher
//     );

//     // @/latest-post API call. And get latest post data
//     // const {
//     //     data: latestData,
//     //     error: latestError,
//     //     isLoading: latestIsLoading,
//     // }: { data: any; error: any; isLoading: boolean } = useSWR(
//     //     "/latest-post",
//     //     fetcher
//     // );

//     // Fetch the data based on parameters
//     const fetchLatestData = async () => {
//         // setLatestIsLoading(true);
//         try {
//             const response = await instance.post("/archive-posts", {
//                 page_number: pageNumber,
//                 from_date: null,
//                 to_date: null,
//                 category_slug: category,
//             });
//             setArchiveData(response.data?.data);  // Set the fetched data
//             setLatestError('');  // Clear error on success
//             setPageNumber(1)
//         } catch (error: any) {
//             if (error.response && error.response.status !== 404) {
//                 setArchiveData([]);  // Clear previous data on 404 error
//                 setLatestError('একটি সমস্যা হয়েছে');
//             }
//             setArchiveData([]);  // Clear previous data on error
//         } finally {
//             setLatestIsLoading(false);  // Stop the loading spinner
//         }
//     };

//     // Call fetch function when any parameter changes

//     useEffect(() => {
//       if (latestIsLoading === true) {
//         fetchLatestData();
//       }
//     }, [pageNumber, category, latestIsLoading, fetchLatestData]);

//     // useEffect(() => {
//     //     if (latestData) {
//     //         // setInitialData(latestData);
//     //         setPageNumber(1)
//     //         setArchiveData(latestData.slice(0, archiveLimit))
//     //     }
//     // }, [latestData]);

//     /**
//      * Fetches archive data based on specified date range, category, and page number.
//      *
//      * This asynchronous function retrieves archived posts from the server based on the provided check-in
//      * and check-out dates, category, and the specified page number. It formats the dates to the 'YYYY-MM-DD'
//      * format, makes an API request to fetch the data, and updates the state with the retrieved archive posts.
//      * If no data is found, it handles errors and sets appropriate error messages. This function is typically
//      * called when paginating through archived records, applying date and category filters, providing a dynamic
//      * way to load and display archive data based on user interactions.
//      *
//      * @param {number} page_number - The page number to be fetched from the server (pagination parameter).
//      */
//     const getArchiveData = async (page_number: number) => {
//         /**
//          * Formats the date to the 'YYYY-MM-DD' format.
//          *
//          * This function takes a string representation of a date and
//          * formats it to the 'YYYY-MM-DD' format.
//          *
//          * @param {string} - The string representation of date to be formatted.
//          * @returns {string} The formatted date in the 'YYYY-MM-DD' format.
//          */
//         // const checkIn = formateDateYMD(String(checkInDate));
//         // const checkOut = formateDateYMD(String(checkOutDate));
//         const checkIn = checkInDate ? formateDateYMD(String(checkInDate)) : null; 
//         const checkOut = checkOutDate ? formateDateYMD(String(checkOutDate)) : null;

//         setIsArchiveLoading(true);

//         try {
        
//             const { data } = await instance.post("/archive-posts", {
//                 page_number,
//                 from_date: checkIn,
//                 to_date: checkOut,
//                 category_slug: category,
//             });

//             setArchiveError("");
//             setLatestError("")

//             // if (page_number === 1) {
//             //     setArchiveData(data.data);
//             // } else {
//             //     setArchiveData((prev) => [...prev, ...data.data]);
//             // }

//             if (data?.data?.length > 0) {
//                 // Append new data to the existing data instead of replacing it
//                 setArchiveData((prev) => [...prev, ...data.data]);
//                 setPageNumber((prev) => prev + 1); // Update page number after fetching
//             } else {
//                 // If no new data is available, show error
//                 setArchiveError("কোন তথ্য পাওয়া যায়নি");
//             }

//             // setIsArchiveLoading(false);
//         } catch (error: any) {
//             setIsArchiveLoading(false);

//             if (error.response.status === 404) {
//                 setArchiveError("কোন তথ্য পাওয়া যায়নি");
//                 // setArchiveData([]);
//             }

//             console.error(error.message);
//         } finally {
//             setIsBottom(false);
//             setIsArchiveLoading(false);
//         }

        
//     };

//     /**
//      * Reset archive data and filters.
//      *
//      * This function resets the selected check-in and check-out dates, category filter,
//      * and archive data, clearing any previously loaded or filtered information. It's typically
//      * used when a user wants to reset the archive data view, providing a clean slate for
//      * new date and category selections or when the user wants to clear the current filters.
//      */
//     const getAllArchiveData = () => {
//         setCheckInDate(null);
//         setCheckOutDate(null);
//         setCategory("");
//         setArchiveData([]);
//         setArchiveError("");
//     };

//     /**
//      * Handle change events for category selection.
//      *
//      * This function is an event handler used for category selection components. It takes an event object `e`
//      * and updates the `category` state with the selected value. This function is typically associated with
//      * dropdowns or input elements where users can select a category, ensuring that the application state stays
//      * synchronized with the user's selection.
//      *
//      * @param {Event} e - The event object representing the category selection change.
//      */
//     const onChangeHandler = (e: any) => {
//         setCategory(e.target.value);
//     };

//     const handleScroll = () => {
//         if (loaderRef.current) {
//             const { bottom } = loaderRef.current.getBoundingClientRect();
//             if (bottom <= window.innerHeight && !isArchiveLoading ) {
//                 setIsBottom(true);
//             }
//         }
//     };

//     // useEffect(() => {
//     //     if (isBottom) {
//     //         getArchiveData(pageNumber); // Fetch more data if bottom is reached
//     //         setIsBottom(false);
//     //     }
//     // }, [isBottom, pageNumber]);
//     useEffect(() => {
//       if (isBottom && !isArchiveLoading) {
//         setIsArchiveLoading(true); // Mark loading as true to prevent multiple requests
//         getArchiveData(pageNumber);
//       }
//     }, [isBottom, isArchiveLoading, pageNumber, getArchiveData]);

//     useEffect(() => {
//       const handleScrollFn = handleScroll; 
//       window.addEventListener("scroll", handleScrollFn);
//       return () => {
//         window.removeEventListener("scroll", handleScrollFn);
//       };
//     }, [handleScroll]);

    

//     // if (latestError) return <div className="text-center">একটি সমস্যা হয়েছে</div>;
//     if (latestIsLoading) return <ArchiveSkeleton />;

//     return (
//         <section className="mt-[60px]">
//             <div className="container mx-auto px-4">
//                 <div className="mb-3 border-b-[1px] border-[var(--border-color)]">
//                     <h1 className="text-[var(--primary)] text-xl md:text-2xl dark:text-white">
//                         আর্কাইভ
//                     </h1>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
//                     <div className="col-span-12 md:col-span-8">
//                         {/* First child - takes 8 columns on large screens, 1 column on small screens */}
//                         <div className="relative mb-6 grid grid-cols-1 items-center gap-6 after:absolute after:-bottom-3 after:left-0 after:right-0 after:h-[1px] after:w-full after:bg-[var(--border-color)] dark:after:bg-[var(--border-dark)] md:grid-cols-12">
//                             <div className="col-span-12">
//                                 <div className="relative grid grid-cols-12 gap-3 before:absolute before:-bottom-3 before:right-0 before:h-[1px] before:w-full lg:before:-right-3 lg:before:top-0 lg:before:h-full lg:before:w-[1px] items-center">
//                                     <div className="col-span-6 lg:col-span-3">
//                                         <div className="block w-full">
//                                             <div className="archive-date-picker w-full relative border">
//                                                 <DatePicker
//                                                     selected={checkInDate}
//                                                     onChange={(date: any) => setCheckInDate(date)}
//                                                     placeholderText="From date"
//                                                     isClearable
//                                                     maxDate={addDays(new Date(), 0)}
//                                                     className="focus:outline-none w-full p-3 text-[var(--gray)] text-base placeholder:text-sm"
//                                                 />
//                                                 <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
//                                                     {!checkInDate && <CalenderIcon />}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-span-6 lg:col-span-3">
//                                         <div className="block w-full">
//                                             <div
//                                                 className={`archive-date-picker w-full relative ${checkInDate ? "border" : ""
//                                                     }`}
//                                             >
//                                                 <DatePicker
//                                                     selected={checkOutDate}
//                                                     onChange={(date: any) => setCheckOutDate(date)}
//                                                     placeholderText="To date"
//                                                     minDate={checkInDate ? addDays(new Date(checkInDate), 0) : subDays(new Date(), 10)}
//                                                     maxDate={addDays(new Date(), 0)}
//                                                     isClearable
//                                                     disabled={checkInDate ? false : true}
//                                                     className="focus:outline-none w-full p-3 text-[var(--gray)] text-base placeholder:text-sm"
//                                                 />
//                                                 <span className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400">
//                                                     {!checkOutDate && <CalenderIcon />}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-span-6 lg:col-span-3">
//                                         <div className="w-full">
//                                             <select
//                                                 className="border w-full rounded-sm p-3 text-base focus:outline-0 text-[var(--dark)] bg-slate-300 dark:bg-slate-300"
//                                                 name="category"
//                                                 onChange={onChangeHandler}
//                                             >
//                                                 <option className="py-3 " value="" selected={!category}>
//                                                     Category
//                                                 </option>
//                                                 {data?.map((itm) => {
//                                                     const { menu_lavel, menu_content_id, slug } = itm;
//                                                     return (
//                                                         <option key={menu_content_id} value={slug}>
//                                                             {menu_lavel}
//                                                         </option>
//                                                     );
//                                                 })}
//                                             </select>
//                                         </div>


//                                     </div>

//                                     <div className="col-span-6 lg:col-span-3">
//                                         <div className="w-full">
//                                             <button
//                                                 type="button"
//                                                 className="w-full text-white text-lg bg-[var(--primary)] px-1 py-3 flex items-center justify-center hover:bg-[var(--primary)] rounded-sm disabled:opacity-70 disabled:cursor-not-allowed"
//                                                 onClick={() => {
//                                                     setPageNumber(0)
//                                                     // setInitialData([])
//                                                     setArchiveData([])
//                                                     setArchiveError("")
//                                                     getArchiveData(0)
//                                                 }}
//                                                 disabled={
//                                                     checkInDate === null &&
//                                                     checkOutDate === null &&
//                                                     category === ""
//                                                 }
//                                             >
//                                                 {/* <MagnifyIcon /> */}
//                                                 <FontAwesomeIcon icon={faMagnifyingGlass} />
//                                                 Search
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                         <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
//                             <div className="relative col-span-12 after:absolute after:-bottom-3 after:right-0 after:h-[1px] after:w-full after:bg-[var(--border-color)] after:last:h-0 dark:after:bg-[var(--border-dark)] lg:after:-right-3 lg:after:top-0 lg:after:h-full lg:after:w-[1px] lg:after:last:w-0">
//                                 <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-12 md:after:[&>*:nth-child(even)]:w-0 after:[&>*]:absolute after:[&>*]:-bottom-3 after:[&>*]:right-0 after:[&>*]:h-[1px] after:[&>*]:w-full md:before:[&>*]:absolute md:before:[&>*]:-bottom-3 md:before:[&>*]:right-0 md:before:[&>*]:h-[1px] md:before:[&>*]:w-full md:after:[&>*]:-right-3 md:after:[&>*]:top-0 md:after:[&>*]:h-full md:after:[&>*]:w-[1px] lg:after:[&>*:w-[1px] lg:after:[&>*:nth-child(even)]:w-[1px] lg:after:[&>*:nth-child(3n)]:!w-0">
//                                     {/* {archiveData?.length <= 0 &&
//                                         archiveError === "" &&
//                                         initialData?.map((itm: NewsItem) => {
//                                             const {
//                                                 news_id,
//                                                 category,
//                                                 encode_titl,
//                                                 post_title,
//                                                 time_stamp,
//                                                 image_alt,
//                                                 image_thumb,
//                                                 publish_date
//                                             } = itm;
//                                             return (
//                                                 <Link
//                                                     key={news_id}
//                                                     className="group relative col-span-12 md:col-span-6 lg:col-span-6"
//                                                     href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
//                                                 >
//                                                     <div className="float-right mb-2 ml-3 overflow-hidden xl:mb-0">
//                                                         <div>
//                                                             <Image
//                                                                 alt={image_alt}
//                                                                 width={330}
//                                                                 height={186}
//                                                                 decoding="async"
//                                                                 className="h-auto w-[124px] object-cover duration-700 ease-out group-hover:scale-105 lg:h-[75px] lg:w-[110px] xl:h-[120px] xl:w-[180px]"
//                                                                 src={image_thumb}
//                                                                 loading="lazy"
//                                                             />
//                                                         </div>
//                                                     </div>
//                                                     <h2 className="text-lg text-[var(--dark)] dark:text-white">
//                                                         {post_title}
//                                                     </h2>

//                                                     <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
//                                                         {timestampToBangleDateWithTime(publish_date)}
//                                                     </p>
//                                                 </Link>
//                                             );
//                                         })} */}

//                                     {archiveData?.map((itm: NewsItem) => {
//                                         const {
//                                             news_id,
//                                             category,
//                                             encode_titl,
//                                             post_title,
//                                             time_stamp,
//                                             image_alt,
//                                             image_thumb,
//                                             publish_date
//                                         } = itm;
//                                         return (
//                                             <Link
//                                                 key={news_id}
//                                                 className="group relative col-span-12 md:col-span-6 lg:col-span-6"
//                                                 href={`/${category.toLocaleLowerCase()}/${encode_titl}`}
//                                             >
//                                                 <div className="float-right mb-2 ml-3 overflow-hidden xl:mb-0">
//                                                     <div>
//                                                         <Image
//                                                             alt={image_alt}
//                                                             width={330}
//                                                             height={186}
//                                                             decoding="async"
//                                                             className="h-auto w-[124px] object-cover duration-700 ease-out group-hover:scale-105 lg:h-[75px] lg:w-[110px] xl:h-[120px] xl:w-[180px]"
//                                                             src={image_thumb}
//                                                             loading="lazy"
//                                                         />
//                                                     </div>
//                                                 </div>
//                                                 <h2 className="text-lg text-[var(--dark)] dark:text-white">
//                                                     {post_title}
//                                                 </h2>

//                                                 <p className="text-base text-[var(--gray-2)] dark:text-[var(--gray-3)]">
//                                                     {timestampToEnglishDateWithTimeInArchive(publish_date)}
//                                                 </p>
//                                             </Link>
//                                         );
//                                     })}
//                                 </div>
//                                 {/* Loading More Indicator */}
//                                 <div ref={loaderRef} className="w-full flex justify-center">
//                                     {/* {isArchiveLoading && <ThreeDotsLoader />} */}
//                                     {isArchiveLoading && archiveError.length < 1 && <ArchiveSkeleton />}
//                                 </div>
//                                 <div className="flex justify-center">
//                                     {archiveError && archiveData.length > 0 ? (
//                                         <p className="w-full text-center text-[var(--dark)]">
//                                             নতুন কোন তথ্য নেই
//                                         </p>
//                                     ) : null}
//                                     {(archiveError || latestError) &&  archiveData.length <= 0? (
//                                         <p className="w-full text-center text-[var(--dark)]">
//                                             কোন তথ্য পাওয়া যায়নি
//                                         </p>
//                                     ) : null}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="col-span-12 md:col-span-4">
//                         {/* Second child - takes 4 columns on large screens, 1 column on small screens */}
//                         <div className="col-span-12 lg:col-span-4 xl:col-span-3 print:hidden xl:sticky xl:top-[4rem]">
//                             <div className="">
                            

//                                 <TopNews count={10} />

                                
//                             </div>
//                     </div>
//                     </div>
//                 </div>

//             </div>
//         </section>
//     );
// }
