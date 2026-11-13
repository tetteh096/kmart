import type { Metadata } from "next";
import { Inter_Tight, Poppins } from "next/font/google";
import { SHOP } from "@kmartshop/api/data/shop";

import "../index.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import { accountsEnabled } from "@/features";

// Bold and friendly, for headings and prices.
const brand = Poppins({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${SHOP.legalName} | Groceries delivered in Adenta`,
  description: SHOP.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${brand.variable} ${interTight.variable} antialiased bg-paper text-ink min-h-screen flex flex-col`}>
        <Providers accountsEnabled={accountsEnabled}>
          <div className="flex-1 flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
