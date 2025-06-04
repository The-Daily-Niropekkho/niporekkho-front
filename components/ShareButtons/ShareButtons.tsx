// components/ShareButtons.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { useShareNewsMutation } from "@/redux/features/news/newsApi";

declare global {
  interface Window {
    a2a_config?: {
      callbacks?: Array<{ share: (data: { serviceCode: string; url: string; title: string }) => void }>;
      [key: string]: any;
    };
    a2a?: {
      init_all: () => void;
      [key: string]: any;
    };
  }
}

export default function ShareButtons({ news_id }: { news_id: string }) {
  const [shareNews] = useShareNewsMutation();
  const router = useRouter();

  useEffect(() => {
    // Ensure a2a_config exists
    window.a2a_config = window.a2a_config || {};
    window.a2a_config.callbacks = window.a2a_config.callbacks || [];

    // Define the share callback handler
    function onAddToAnyShare(data: {
      serviceCode: string;
      url: string;
      title: string;
    }) {
      // Trigger the RTK Query mutation
      shareNews({ news_id, platform: data.serviceCode })
        .unwrap()
        .then(() => {
          console.log(`Successfully shared on ${data.serviceCode}`);
          // Optionally refresh the cache or page
          router.refresh(); // Refreshes the page to reflect updated share count
        })
        .catch((err) => {
          console.error("Error sharing news:", err);
        });
    }

    // Push the callback into a2a_config.callbacks
    window.a2a_config.callbacks.push({
      share: onAddToAnyShare,
    });

    // Cleanup to avoid duplicate callbacks
    return () => {
      window.a2a_config?.callbacks && (window.a2a_config.callbacks = window.a2a_config.callbacks.filter(
        (cb: any) => cb.share !== onAddToAnyShare,
      ));
    };
  }, [news_id, shareNews, router]);

  return (
    <>
      <Script
        src='https://static.addtoany.com/menu/page.js'
        strategy='afterInteractive'
        onLoad={() => {
          if (typeof window !== "undefined" && window.a2a) {
            window.a2a.init_all();
          }
        }}
      />
      <div
        className='a2a_kit a2a_kit_size_32 a2a_default_style flex space-x-2'
        data-a2a-url={typeof window !== "undefined" ? window.location.href : ""}
        data-a2a-title={document.title}
      >
        <a
          className='a2a_button_facebook'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a className='a2a_button_x' target='_blank' rel='nofollow noopener'></a>
        <a
          className='a2a_button_whatsapp'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a
          className='a2a_button_linkedin'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a
          className='a2a_button_telegram'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a
          className='a2a_button_facebook_messenger'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a
          className='a2a_button_email'
          target='_blank'
          rel='nofollow noopener'
        ></a>
        <a className='a2a_dd' href='https://www.addtoany.com/share'></a>
      </div>
      <style jsx>{`
        .a2a_default_style img {
          display: inline-block !important;
          width: 32px !important;
          height: 32px !important;
        }
        .a2a_dd {
          display: inline-block !important;
        }
      `}</style>
    </>
  );
}
