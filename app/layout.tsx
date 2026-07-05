import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import CvCursor from "@/components/CvCursor";
import ScrollToTop from "@/components/ScrollToTop";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Hasnain · Field Notes",
  description:
    "AI / computer vision engineer. Projects logged like lab experiments, notes written like field observations.",
  openGraph: {
    title: "Hasnain · CV / AI Lab Notebook",
    description: "AI / computer vision engineer. Projects logged like lab experiments.",
    url: "https://hasnain.dev",
    siteName: "Hasnain Lab Notebook",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hasnain · CV / AI Lab Notebook",
    description: "AI / computer vision engineer. Projects logged like lab experiments.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-body bg-ink text-paper min-h-screen flex flex-col">
        <CvCursor />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
        <SiteFooter />
      </body>
    </html>
  );
}
