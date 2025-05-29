"use client";

import Image from "next/image";
import Link from "next/link";
import FooterContact from "../common/footerContact/FooterContact";
import defaultLogo from "@/public/images/logo.png";
import { useGetContactsQuery } from "@/redux/features/contact/contactApi";

const Footer = () => {
  const {
    data: contactData,
    error: contactError,
    isLoading: contactLoading,
    isFetching,
  } = useGetContactsQuery(undefined);


  let content;
  let content2;

  if (contactError) {
    content = (
      <div className='text-center text-red-500 py-4'>
        Error loading contact information. Please try again later.
      </div>
    );
    console.error("Contact Error Details:", contactError);
  }

  if (contactLoading || isFetching) {
    content = (
      <>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 animate-pulse'>
          <div className='border-x-[1px] border-gray-200 dark:border-gray-700 p-4'>
            <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto mb-4'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto'></div>
          </div>
          <div className='border-r-[1px] border-gray-200 dark:border-gray-700 p-4'>
            <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto mb-4'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto'></div>
          </div>
          <div className='border-r-[1px] border-gray-200 dark:border-gray-700 p-4'>
            <div className='h-16 bg-gray-300 dark:bg-gray-600 rounded w-1/3 mx-auto mb-4'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto'></div>
          </div>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-4 animate-pulse'>
          <div className='border-x-[1px] border-gray-200 dark:border-gray-700 p-4'>
            <div className='h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mx-auto mb-4'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2'></div>
            <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mx-auto'></div>
          </div>
          
        </div>
      </>
    );
  }

  if (contactData?.data?.length) {
    const contact = contactData.data[0];

    // Static social media links
    const socialLinks = [
      { name: "Facebook", url: "https://www.facebook.com/dailyniropekkho" },
      { name: "Twitter", url: "https://twitter.com/dailyniropekkho" },
    ];

    content = (
      <div>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-black dark:text-white mb-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='mt-4 space-y-2 border-x-[1px] border-gray-200 dark:border-gray-700'>
            <h3 className='font-bold'>অফিস :</h3>
            <p>{contact.address}</p>
            <p>ইমেইল : {contact.email}</p>
            <p>ফোন : {contact.phone.split(",")[0]}</p>
            {contact.phone.includes("বার্তা ও বিজ্ঞাপন") && (
              <p>বার্তা ও বিজ্ঞাপন : {contact.phone.split(":")[1]?.trim()}</p>
            )}
          </div>
          <div className='mt-4 space-y-2 border-r-[1px] border-gray-200 dark:border-gray-700'>
            <h3 className='font-bold'>সম্পাদক মণ্ডলী :</h3>
            <p>সম্পাদক ও প্রকাশক : {contact.content}</p>
           
            <p>ব্যবস্থাপনা সম্পাদক : </p>
          </div>
          <div className='mt-4 space-y-2 border-r-[1px] border-gray-200 dark:border-gray-700'>
            <div className='flex gap-3 flex-col md:flex-row mb-6 justify-around md:justify- items-center'>
              <div>
                <Link href='/'>
                  <Image
                    src={defaultLogo}
                    alt='Daily Niropekkho Logo'
                    width={180}
                    height={100}
                    loading='lazy'
                  />
                </Link>
              </div>
            </div>
            <div className='mb-5 flex flex-wrap justify-center text-center gap-x-3 gap-y-2 text-black dark:text-white'>
              <p>
                ফলো করুন{" "}
                <span className='text-red-500'>
                  <a
                    href='https://www.facebook.com/dailyniropekkho'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    দৈনিক নিরপেক্ষ
                  </a>
                </span>
                -এর সকল খবর
              </p>
              <FooterContact
                // data={{
                //   phone: contact.phone.split(",")[0],
                //   phoneTwo: contact.phone.includes("বার্তা ও বিজ্ঞাপন")
                //     ? contact.phone.split(":")[1]?.trim()
                //     : "",
                //   email: contact.email,
                //   address: contact.address,
                //   content: contact.content || "",
                //   editor: contact.editor || "",
                //   website: contact.website || "",
                //   latitude: contact.latitude || "",
                //   longitude: contact.longitude || "",
                // }}
                socialMediaLinks={socialLinks}
              />
            </div>
          </div>
        </div>
      </div>
    );

    content2 = (
      <div>
        <div className='flex justify-center items-center text-center text-black dark:text-white mb-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col justify-center text-center text-sm'>
            <p className='inline-block print:hidden mt-2'>{contact.rights}</p>
            <p>
              এই ওয়েবসাইটের কোনো লেখা বা ছবি অনুমতি ছাড়া নকল করা বা অন্য কোথাও
              প্রকাশ করা সম্পূর্ণ বেআইনি।
            </p>
            <p>
              Developed and Maintained by{" "}
              <Link
                href='https://www.nariaitsolution.com'
                target='_blank'
                rel='noopener noreferrer'
              >
                <span
                  className='font-medium uppercase text-[#2563eb] transition duration-300 ease-in-out'
                  style={{
                    backgroundSize: "0% 100%",
                    backgroundRepeat: "no-repeat",
                    backgroundImage: "linear-gradient(to right, transparent, #2563eb)",
                    transition: "background-size 0.3s ease-in-out",
                    textDecoration: "underline",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundSize = "100% 100%";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundSize = "0% 100%";
                  }}
                >
                  Naria It Solution
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  } else if (!contactLoading && !isFetching && !contactError) {
    content = (
      <div className='text-center text-gray-500 py-4'>
        No contact information available.
      </div>
    );
    content2 = (
      <div className='flex justify-center items-center text-center text-black dark:text-white mb-4 border-t border-gray-200 dark:border-gray-700'>
        <div className='flex flex-col justify-center text-center text-sm'>
          <p className='inline-block print:hidden mt-2'>
            © {new Date().getFullYear()} দৈনিক নিরপেক্ষ কর্তৃক সর্বসত্ব ®
            সংরক্ষিত
          </p>
          <p>
            এই ওয়েবসাইটের কোনো লেখা বা ছবি অনুমতি ছাড়া নকল করা বা অন্য কোথাও
            প্রকাশ করা সম্পূর্ণ বেআইনি।
          </p>
          <p>
            Developed and Maintained by{" "}
            <Link
              href='https://www.nariaitsolution.com'
              target='_blank'
              rel='noopener noreferrer'
            >
              <span className='font-medium uppercase text-[#2563eb]'>
                Naria It Solution
              </span>
            </Link>
          </p>
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
    </footer>
  );
};

export default Footer;
