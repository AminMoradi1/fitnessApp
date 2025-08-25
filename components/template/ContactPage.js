export const revalidate = false; // صفحه کاملا استاتیک باشه

import { FaInstagram } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import styles from "./ContactPage.module.css";

export const metadata = {
  title: "ارتباط با من",
  description: "راه‌های ارتباطی من",
};

export default function ContactPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ارتباط با من</h1>

      <p className={styles.text}>
        سلام 🙌🏽 من امین هستم ، حدود ۴ ساله که دارم به صورت نچرال بدنسازی کار‌
        میکنم تا حالا مربی نداشتم و همیشه مقاله های ورزشی انگلیسی میخوندم و بشدت
        عاشق دنیای پرورش اندام.<br /> من از ۴۰ کیلو به 72 کیلو رسیدم اگه میخوای به بدن
        ایده آلت برسی از طریق تلگرام و اینستاگرام باهام ارتباط بگیر تا کمکت
        کنم😍⚡️
      </p>

      <div className={styles.links}>
        <Link
          href="https://t.me/aminmoradi2006"
          target="_blank"
          className={styles.link}
        >
          تلگرام
          <FaTelegramPlane />
        </Link>
        <Link
          href="https://instagram.com/aminmoradiv"
          target="_blank"
          className={styles.link}
        >
          اینستاگرام
          <FaInstagram />
        </Link>
      </div>
    </div>
  );
}
