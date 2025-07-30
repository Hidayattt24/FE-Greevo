export const ENV = {
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "Greevo",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  NODE_ENV: process.env.NODE_ENV || "development",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
} as const;
