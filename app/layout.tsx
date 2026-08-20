import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

const courierPrime = Courier_Prime({
  variable: "--font-typewriter",
  subsets: ["latin"],
  weight: ["400", "700"],
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