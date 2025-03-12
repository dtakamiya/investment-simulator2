import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "資産運用シミュレーター | 複利で資産を増やそう",
  description: "初期投資額、毎月の積立額、年利、積立期間から資産運用のシミュレーションを行うアプリです。複利の力で将来の資産形成を視覚化します。",
  keywords: ["資産運用", "シミュレーター", "投資", "複利", "積立", "資産形成", "長期投資"],
  authors: [{ name: "Investment Simulator Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#4f46e5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`}
      >
        {children}
      </body>
    </html>
  );
}
