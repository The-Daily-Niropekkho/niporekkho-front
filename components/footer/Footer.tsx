"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import fetcher from "@/utils/fetcher";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import useSWR from "swr";
import FooterContact from "../common/footerContact/FooterContact";
import Socials from "../common/socials/Socials";

type MenuItem = {
  menu_lavel: string;
  slug: string;
  link_url: null | string;
};

type MenuData = MenuItem[];

const Footer = () => {
  const {
    data: webSettingData,
    error: webSettingError,
    isLoading: webSettingLoading,
  } = useContext(WebSettingContext);

  const {
    data,
    error,
    isLoading,
  }: { data: MenuData; error: any; isLoading: boolean } = useSWR(
    "/page-link",
    fetcher,
  );

  let content;
  let content2;

  if (webSettingError)
    content = <div className='text-center'>There was an Error!</div>;

  if (webSettingLoading) content = <div className='text-center'></div>;

  if (webSettingData) {
    const { contact, social_link, footer_logo } = webSettingData;

    content = (
      <div className=" ">
       
        {/* Adding the new contact section from the image */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-black dark:text-white mb-4 border-t1 border-[var(--border-color)] dark:border-[var(--border-dark)] '>
          <div className='text-center mt-4 space-y-2 border-x border-[var(--border-color)] dark:border-[var(--border-dark)]'>
            <h3 className='font-bold '>অফিস :</h3>
            <p>
              স্কাইভিউ ট্রেড ভ্যালি, ১৪ তলা, ৬৬ ভি.আই.পি রোড, নয়াপল্টন,
              ঢাকা-১০০০ থেকে প্রকাশিত এবং ২৮/বি, টয়েনবি সার্কুলার রোড, মতিঝিল
              ঢাকা, শরীয়তপুর প্রিন্টিং প্রেস থেকে মুদ্রিত।
            </p>
            <p>ইমেইল : dailyniropekkho@gmail.com</p>
            <p>ফোন : +880-248322623</p>
            <p>বার্তা ও বিজ্ঞাপন : +8801898885950</p>
          </div>
          <div className='text-center mt-4 space-y-2 border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
            <h3 className='font-bold '>সম্পাদক মণ্ডলী :</h3>
            <p>সম্পাদক ও প্রকাশক : সবুজ মুন্সী</p>
            <p>সম্পাদকমন্ডলীর সভাপতি : ড. মোহাম্মদ জকরিয়া</p>
            <p>ব্যাবস্থাপনা সম্পাদক : </p>
          </div>

          {/* <div className='text-start mt-4 space-y-2'>
            <h3 className='font-bold '>
              উপদেষ্টা মণ্ডলী :
            </h3>
            <p>আমির উপদেষ্টা : </p>
            <p>উপদেষ্টা : </p>
            <p>আইনি উপদেষ্টা : </p>
          </div> */}
          <div className='text-center mt-4 space-y-2 border-r border-[var(--border-color)] dark:border-[var(--border-dark)]'>
            <div className='flex gap-3 flex-col md:flex-row mb-6 justify-around md:justify-betweenz items-center '>
              <div className='clss'>
                <Link href='/'>
                  <Image
                    src={footer_logo}
                    alt='logo'
                    width={180}
                    height={100}
                  />
                </Link>
              </div>
            </div>
            {/* <p>
              বাংলাদেশ ও বিশ্বের সকল খবর, ব্রেকিং নিউজ, লাইভ নিউজ, রাজনীতি,
              বাণিজ্য, খেলা, বিনোদনসহ সকল সর্বশেষ সংবাদ সবার আগে পড়তে ক্লিক করুন
              দৈনিক নিরপেক্ষ ডট কম।
            </p> */}
            <div
              className='mb-5 flex flex-wrap justify-center text-center gap-x-3 lg:gap-x-
             gap-y-2 lg:gap-3 text-[#000] dark:text-white'
            >
              <p>
                ফলো করুন{" "}
                <span className='text-red-500'>
                  <a
                    href='https://www.facebook.com/dailyniropekkho'
                    target='_blank'
                  >
                    দৈনিক নিরপেক্ষ
                  </a>
                </span>
                -এর সকল খবর
              </p>
              <FooterContact data={contact} socialMediaLinks={social_link} />
            </div>
            
          </div>
        </div>
      </div>
    );
    content2 = (
      <div className=' '>
        {/* Adding the new contact section from the image */}
        <div className='flex justify-center items-center text-center text-black dark:text-white mb-4 border-t border-[var(--border-color)] dark:border-[var(--border-dark)] '>
          <div className='flex flex-col justify-center text-center text-sm '>
            <p className='inline-block print:hidden mt-2'>
              © {new Date().toLocaleDateString("bn-BD", { year: "numeric" })}{" "}
              {/* {contact.editor} */}
              <b> দৈনিক নিরপেক্ষ </b>
              কর্তৃক সর্বসত্ব ® সংরক্ষিত
            </p>
            <p>
              এই ওয়েবসাইটের কোনো লেখা বা ছবি অনুমতি ছাড়া নকল করা বা অন্য কোথাও
              প্রকাশ করা সম্পূর্ণ বেআইনি।
            </p>
            <p>
              Developed and Maintained by <span className="font-medium">Naria It Solution</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <footer
      className='relative border-t min-h-[200px] mt-[60px] pt-6 bg-gray-50 dark:bg-[#202327] bg-no-repeat bg-center bg-cover'
      style={{
        backgroundImage: `url(https://i.ibb.co/V703ng3/testimonial-bg.jpg)`,
      }}
    >
      <div className='container px-3 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12'>{content}</div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          <div className='col-span-12'>{content2}</div>
        </div>
      </div>
      {/* Shadow applied to the top of the footer */}
      {/* <div className='absolute top-0 left-0 w-full h-[10px] bg-white dark:bg-[#202327] shadow-lg'></div> */}
    </footer>
  );
};

export default Footer;
