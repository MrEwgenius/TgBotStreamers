import localFont from "next/font/local";
import "./globals.scss";
import { Montserrat } from "next/font/google";
import BottomTabs from "@/components/BottomTabs/BottomTabs";
const inter = Montserrat({ subsets: ['latin'], weight: ["400"] });


export const metadata = {
  title: "TG Bot",
  description: "Tg boots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
     <body className={inter.className}>
       <div className={'content'}> {children}</div>
        <BottomTabs  />
      </body>
    </html>
  );
}
