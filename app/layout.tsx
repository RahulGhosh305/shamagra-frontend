import type { Metadata } from "next";
import { Noto_Sans_Bengali, Poppins } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ScrollToTop } from "@/components/custom/ScrollToTop";
import WhatsAppButton from "@/components/custom/WhatsAppButton";
import { Providers } from "@/store/Providers";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-bangla",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-english",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shamagra.com — Online Shopping Store | সমগ্র — কেনাকাটার সহজ ঠিকানা",
  description:
    "বাংলাদেশের সেরা অনলাইন বইয়ের দোকান। উপন্যাস, কবিতা, অনুবাদ, বিজ্ঞান ও আরো অনেক ক্যাটাগরির বই কিনুন সহজেই।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${notoSansBengali.variable} ${poppins.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Navbar />
          {children}
          <ScrollToTop />
          <WhatsAppButton />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
