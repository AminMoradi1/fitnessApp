"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/module/SideBar.module.css";
import { signOut } from "next-auth/react";

export default function Sidebar({ role , children }) {
  const pathname = usePathname();

  const links = [
    { name: "پروفایل", href: "/dashboard/profile" },
    { name: "برنامه تمرینی من", href: "/dashboard/my-workouts" },
    { name: " برنامه غذایی من", href: "/dashboard/my-nutrition" },
  ];

  return (
    <div className={styles.sidebarWrapper}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>🏋️‍♂️ داشبورد</div>
        <nav className={styles.nav}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${
                pathname === link.href ? styles.active : ""
              }`}
            >
              {link.name}
            </Link>
          ))}
          {role === "ADMIN" ? (
            <Link href={"/admin"} className={styles.navLink}>برنامه های درخواستی</Link>
          ) : null}
        </nav>
        <button
          className={styles.logoutBtn}
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          خروج از حساب
        </button>
      </aside>
      {children}
    </div>
  );
}
