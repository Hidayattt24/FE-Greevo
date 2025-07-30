/**
 * Utility function to detect if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === "undefined") return false;

  const isMobileWidth = window.innerWidth < 768; // md breakpoint
  const isMobileUserAgent =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  return isMobileWidth || isMobileUserAgent;
};

/**
 * Utility function to combine CSS classes
 */
export const cn = (
  ...classes: (string | undefined | null | boolean)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Delay utility function
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
