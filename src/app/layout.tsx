import type { Metadata } from "next";
import "./global.scss";
import "zenn-content-css";

import { Noto_Serif_JP } from "next/font/google";
import { cookies } from "next/headers";

const serif = Noto_Serif_JP({
  weight: "400",
  style: "normal",
  variable: "--font-serif",
  subsets: ["latin"],
  preload: false,
  display: "swap",
});

export const metadata: Metadata = {
  title: "W-Notes / W-PCP",
  description: "早稲田中学校・高等学校 PCプログラミング部 書類管理システム",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const flush = JSON.parse(cookies().get("FLUSH")?.value || "{}");

  return (

    <html lang="ja" className={`${serif.className} znc`}>

      <body>

        <header className="header">

          <div><a href="/">W-Notes</a></div>

          <a href="/user">メンバー</a>
          <a href="/deps">部門</a>
          <a href="/view">書類</a>

        </header>

        <main>

          {flush.message && <div className={`flush ${flush.type}`}><div>{flush.message}</div></div>}

          {children}

        </main>

      </body>

    </html>

  );

}
