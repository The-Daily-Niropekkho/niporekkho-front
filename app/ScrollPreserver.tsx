"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ScrollPreserver() {
  const router = useRouter();
  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (disableScroll) {
        // Prevent scroll to top by maintaining current scroll position
        window.scrollTo(0, window.scrollY);
      }
    };

    // Listen to Next.js route changes using the 'next/navigation' router
    // Since router.events is not available, use a workaround with 'popstate'
    window.addEventListener("popstate", handleRouteChange);

    // Cleanup listener
    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [router, disableScroll]);

  // Optional: Function to toggle scroll behavior (can be triggered by a button or prop)
  const toggleScroll = () => {
    setDisableScroll((prev) => !prev);
  };

  // Example: Expose toggle via a ref or context if needed (adjust based on your use case)
  useEffect(() => {
    // You can pass toggleScroll to a parent via context or ref if required
  }, [toggleScroll]);

  return null; // No UI unless you want to add a toggle button for development
}

