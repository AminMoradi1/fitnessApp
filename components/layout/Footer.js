import { FaInstagram } from "react-icons/fa";
import styles from "@/components/layout/Footer.module.css"
import Link from "next/link"

function Footer() {
  return (
    <footer className={styles.footer}>
  <div className={styles.footerContainer}>


    <div className={styles.footerCol}>
      <h3>آکادمی مرادی</h3>
      هدف ما ساختن بهترین ورژن از خودتان است 
      میتوانید با پشتکار و اعتماد به ما به بهترین ورژن بدنی خود برسید 
    </div>


    <div className={styles.footerCol}>
      <h3>صفحات سایت</h3>
      <ul>
        <li><Link href={"/contact"}>ارتباط با من👨‍🦰</Link></li>
        <li><Link href={"/workout"}>برنامه تمرینی🏋️‍♂️</Link></li>
        <li><Link href={"/gym-experience"}>تجربیات من✅</Link></li>
        <li><Link href={"/blog"}>مقالات🔖</Link></li>
      </ul>
    </div>


    <div className={styles.footerCol}>
      <h3>ما را دنبال کنید</h3>
      <div className={styles.socials}>
    <Link href={"/"}>اینستاگرام<FaInstagram /></Link>
      </div>
    </div>
  </div>


  <div className={styles.footerBottom}>
    <p>💪 تلاش امروز = نتیجه فردا</p>
    <p>© 2025 آکادمی مرادی - تمامی حقوق محفوظ است</p>
  </div>
</footer>
  )
}

export default Footer