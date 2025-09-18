"use client";

import { HiMenu } from "react-icons/hi";
import { CgGym } from "react-icons/cg";
import { IoFastFood } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import { useState } from "react";
import { FaUser } from "react-icons/fa";
import styles from "@/components/layout/Header.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function Header() {
  const { data } = useSession();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hamburgerHandler = () => {
    setIsOpen((prev) => !prev);
  };

  // این تابع وقتی روی لینک منوی موبایل کلیک میشه اجرا میشه
  const handleMobileLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.desktopMenu}>
          <ul>
            <li><Link href={"/"}>صفحه اصلی🤸‍♀️</Link></li>
            <li><Link href={"/workout"}>دریافت برنامه تمرینی🏋️‍♂️</Link></li>
            <li><Link href={"/food-diet"}>دریافت برنامه غذایی😋</Link></li>
            <li><Link href={"/gym-experience"}>تجربیات من در بدنسازی💪</Link></li>
            <li><Link href={"/blog"}>مقالات🔖</Link></li>
            <li><Link href={"/contact"}>ارتباط با من👨‍🦰</Link></li>
          </ul>
        </nav>

        <button onClick={hamburgerHandler} className={styles.hamburger}>
          <HiMenu />
        </button>

        {pathname !== "/signin" && pathname !== "/signup" && !data && (
          <button className={styles.login}>
            <Link href={"/signin"}>ورود به حساب</Link>
            <CiLogin />
          </button>
        )} 

        {data && (
          <button className={styles.login}>
            <Link href={"/dashboard"}>
              <FaUser className={styles.dashboard} />
            </Link>
          </button>
        )}
      </header>

      {/* منوی موبایل */}
      <nav className={`${styles.menu} ${isOpen ? styles.show : ""}`}>
        <ul>
          <li><Link href={"/"} onClick={handleMobileLinkClick}>صفحه اصلی🤸‍♀️</Link></li>
          <li>
            <Link href={"/workout"} onClick={handleMobileLinkClick}>دریافت برنامه تمرینی</Link>
            <CgGym />
          </li>
          <li>
            <Link href={"/food-diet"} onClick={handleMobileLinkClick}>دریافت برنامه غذایی</Link>
            <IoFastFood />
          </li>
          <li><Link href={"/gym-experience"} onClick={handleMobileLinkClick}>تجربیات من در بدنسازی💪</Link></li>
          <li><Link href={"/blog"} onClick={handleMobileLinkClick}>مقالات🔖</Link></li>
          <li><Link href={"/contact"} onClick={handleMobileLinkClick}>ارتباط با من👨‍🦰</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Header;