import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import MobileLayout from "@/components/MobileLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Greevo",
  description: "Greevo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        <MobileLayout>{children}</MobileLayout>
      </body>
    </html>
  );
}
