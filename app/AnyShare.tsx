"use client"
import Script from "next/script";

function AnyShare() {
  return (
    <div>
      <Script
        src='https://static.addtoany.com/menu/page.js'
        strategy='lazyOnload'
        onLoad={() => console.log("AddToAny script loaded")}
      />
    </div>
  );
}

export default AnyShare