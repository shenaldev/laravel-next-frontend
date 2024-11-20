import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Header from "@/components/header";
import Providers from "@/components/providers/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Laravel Next Starter Kit",
  description: "A starter kit for Laravel and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen flex-col`}>
        <NextTopLoader color="#7678ff" />
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
