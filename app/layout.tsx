import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
// Hero content is the canonical "who is this site about" data, so the page
// <title>/description are derived from it instead of duplicating the name
// and tagline in a separate file.
import heroData from "@/components/HeroBanner/hero.json";
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

const hero: { firstName: string; lastName: string; eyebrow: string; description: string } =
  heroData;

export const metadata: Metadata = {
  title: `${hero.firstName} ${hero.lastName} — ${hero.eyebrow}`,
  description: hero.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
