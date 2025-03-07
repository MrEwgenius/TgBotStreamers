import localFont from "next/font/local";
import "./globals.scss";
import { Montserrat } from "next/font/google";
import Script from "next/script";
import BottomTabs from "@/components/BottomTabs/BottomTabs";

const inter = Montserrat({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "TG Bot",
  description: "Tg boots",
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
        <div className="content">{children}</div>
        <BottomTabs />
      </body>
    </html>
  );
}
