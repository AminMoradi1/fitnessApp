import { Yekan } from "@/utils/fonts";
import "./globals.css";
import Layout from "@/layout/Layout";
import NextAuthProvider from "@/providers/NextAuhProvider";

export const metadata = {
  title: "بدنسازی با امین",
  description:
    "بدنسازی و پرورش اندام || دریافت برنامه حجم || دریافت برنامه کات",
  icons: { icon: "./favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={Yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
