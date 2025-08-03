import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES, TIMING } from "@/lib/constants";
import { delay } from "@/lib/utils";

export const useSplashScreen = () => {
  const [showSplash] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSplash = async () => {
      await delay(TIMING.SPLASH_DURATION);
      setIsTransitioning(true);
      await delay(TIMING.TRANSITION_DURATION);
      router.push(ROUTES.GET_STARTED);
    };

    handleSplash();
  }, [router]);

  return { showSplash, isTransitioning };
};
