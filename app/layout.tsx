import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeTrigger } from "@/components/layout/ThemeTrigger";
import { personal } from "@/data";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://alexrivera.dev"),
  title: `${personal.name} - ${personal.title}`,
  description: personal.bio,
  openGraph: {
    title: `${personal.name} - ${personal.title}`,
    description: personal.tagline,
    url: "https://alexrivera.dev",
    siteName: personal.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} - ${personal.title}`,
    description: personal.tagline,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        {children}
        <ThemeTrigger />
      </body>
    </html>
  );
}
