"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookCommentsProps {
  url: string;
}

const FacebookComments = ({ url }: FacebookCommentsProps) => {
  // Reinitialize Facebook SDK when URL changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.FB) {
      window.FB.XFBML.parse();
    }
  }, [url]);

  return (
    <>
      <div className='mt-6 print:hidden'>
        <div id='fb-root'></div>
        <div
          className='fb-comments'
          data-href={url}
          data-width='100%'
          data-numposts='10'
          data-colorscheme='light'
        ></div>
        <style jsx>{`
          .fb-comments {
            padding: 1rem;
            background: var(--background-color, #fff);
            border-radius: 8px;
            border: 1px solid var(--border-color);
          }
          .fb-comments iframe {
            width: 100% !important;
          }
          @media (max-width: 768px) {
            .fb-comments {
              padding: 0.5rem;
            }
          }
        `}</style>
      </div>
      <Script
        async
        defer
        crossOrigin='anonymous'
        src='https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v23.0'
        strategy='lazyOnload'
        onLoad={() => {
          if (typeof window !== "undefined" && window.FB) {
            window.FB.XFBML.parse();
          }
        }}
      />
    </>
  );
};

export default FacebookComments;
