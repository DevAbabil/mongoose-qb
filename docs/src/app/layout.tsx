import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { Analytics, Footer, Header, PageTransition } from "@/components";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "mongoose-qb | Powerful Query Builder for Mongoose",
  description:
    "A powerful and extensible query builder for Mongoose with full TypeScript support. Simplify complex query operations like filtering, searching, sorting, pagination and field projection — all from HTTP query parameters.",
  keywords: [
    "mongoose",
    "mongodb",
    "query builder",
    "typescript",
    "nodejs",
    "express",
    "api",
    "database",
    "pagination",
    "filtering",
    "sorting",
    "search",
  ],
  authors: [{ name: "DevAbabil", url: "https://devababil.com" }],
  creator: "DevAbabil",
  publisher: "DevAbabil",
  metadataBase: new URL("https://mongoose-qb.netlify.app"),
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mongoose-qb.netlify.app",
    title: "mongoose-qb | Powerful Query Builder for Mongoose",
    description:
      "A powerful and extensible query builder for Mongoose with full TypeScript support. Simplify complex query operations like filtering, searching, sorting, pagination and field projection — all from HTTP query parameters.",
    siteName: "mongoose-qb",
    images: [
      {
        url: "https://api.devababil.com/v1/assets/share/6902cb6b4f7760ba9fccdd18",
        width: 1200,
        height: 630,
        alt: "mongoose-qb - Powerful Query Builder for Mongoose",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "mongoose-qb | Powerful Query Builder for Mongoose",
    description:
      "A powerful and extensible query builder for Mongoose with full TypeScript support. Simplify complex query operations like filtering, searching, sorting, pagination and field projection — all from HTTP query parameters.",
    images: [
      "https://api.devababil.com/v1/assets/share/6902cb6b4f7760ba9fccdd18",
    ],
    creator: "@devababil",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PageTransition>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            {children}
            <Footer />
          </div>
        </PageTransition>
        <Analytics />
      </body>
    </html>
  );
}
