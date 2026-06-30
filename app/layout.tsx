import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FogOverlay from '@/app/components/FogOverlay';
import TiltContainer from '@/app/components/TiltContainer';
import NavBar from '@/app/components/NavBar';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "G11.5 Agency Portal",
  description: "Classified operations dashboard and case intelligence database for the G11.5 Paranormal Investigation Agency.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-20">
        <FogOverlay />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
