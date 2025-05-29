"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react"; // Add useCallback import

export default function ScrollPreserver() {
  const router = useRouter();
  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    const handleRouteChange = () => {
      if (disableScroll) {
        window.scrollTo(0, window.scrollY);
      }
    };

    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [router, disableScroll]);

  // Wrap toggleScroll in useCallback
  const toggleScroll = useCallback(() => {
    setDisableScroll((prev) => !prev);
  }, []); // No dependencies

  useEffect(() => {
    // toggleScroll can be passed to a parent via context or ref if required
  }, [toggleScroll]);

  return null;
}
