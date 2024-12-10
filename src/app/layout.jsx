import localFont from "next/font/local";
import "./globals.scss";
import { Roboto } from "next/font/google";
const inter = Roboto({ subsets: ['latin'], weight: ["400"] });
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata = {
  title: "TG Bot",
  description: "Tg boots",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
     <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
