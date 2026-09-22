import type { Metadata } from "next";
import localFont from "next/font/local";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const courierPrime = localFont({
  src: [
    {
      path: "./fonts/CourierPrime-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/CourierPrime-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-typewriter",
  display: "swap",
  fallback: ["Courier New", "monospace"],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: {
    default: "La dramstars",
    template: "%s | La dramstars",
  },
  description:
    "La dramstars — photographie urbaine, récit autobiographique et regard sur la Seine-Saint-Denis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={courierPrime.variable}>
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
