import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import ResumeButton from "@/components/ResumeButton/ResumeButton";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import Footer from "@/components/Footer/Footer";
import StructuredData from "@/components/StructuredData";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serif display font used for headings sitewide (see --font-display in globals.css).
const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Every field here (and every page's own `metadata` export — see
// lib/seo.ts) is derived from the same JSON the page content already
// reads, instead of duplicating the name/description a third time.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  applicationName: siteConfig.name,
  category: "technology",
  // No site-wide canonical here on purpose: every page sets its own via
  // buildMetadata(), and a layout-level "/" would leak onto any route that
  // doesn't (e.g. the 404 page), pointing it at the Home page.
  ...(siteConfig.googleVerification
    ? { verification: { google: siteConfig.googleVerification } }
    : {}),
  formatDetection: { email: false, address: false, telephone: false },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // data-scroll-behavior="smooth": Next.js 16 no longer switches off our
    // global smooth scrolling during route changes unless this is set, so
    // without it a page change animated its scroll instead of jumping.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <StructuredData />
        <ScrollToTop />
        <ResumeButton />
        {children}
        <Footer />
      </body>
    </html>
  );
}
