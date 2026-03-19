import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ScrollProgressBar } from "@/components/scroll-progress-bar";
import { CustomCursor } from "@/components/custom-cursor";
// import { SplineBackground } from "@/components/spline-background";
import { GlobalBackground } from "@/components/global-background";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Portfolio | World-Class Full Stack Engineer",
  description: "High-end Full Stack Developer Portfolio",
  icons: {
    icon: "/AMLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* <SplineBackground /> */}
        <GlobalBackground />
        <CustomCursor />
        <ScrollProgressBar />
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
