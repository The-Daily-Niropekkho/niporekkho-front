"use client"
import Script from "next/script";

// Extend the Window interface to include a2a
declare global {
  interface Window {
    a2a?: {
      init_all: () => void;
      [key: string]: any;
    };
  }
}

function AnyShare() {
  return (
    <div>
      <Script
        src='https://static.addtoany.com/menu/page.js'
        strategy='lazyOnload'
        onLoad={() => {
          if (typeof window !== "undefined" && window.a2a) {
            window.a2a.init_all(); // Initialize AddToAny
          }
        }}
      />
    </div>
  );
}

export default AnyShare