"use client";

import { useEffect, useState } from "react";
import styles from "@/template/MyNutritionPage.module.css";
import Loader from "../module/Loader";
import Link from "next/link";

function MyNutritionPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/dashboard/my-nutrition");
        const data = await res.json();
        console.log(data);
        
        if (Array.isArray(data)) {
          setPrograms(data);
        } else {
          setPrograms([]);
        }
      } catch (error) {
        console.error("Error fetching nutrition programs:", error);
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>برنامه‌های غذایی من</h2>

      {programs.length === 0 ? (
        <div className={styles.emptyBox}>
          <p>شما هیچ برنامه غذایی ثبت‌شده‌ای ندارید</p>
          <Link className={styles.emptyBtn} href={"/nutrition"}>دریافت برنامه غذایی😋</Link>
        </div>
      ) : (
        <div className={styles.programList}>
          {programs.map((p) => (
            <div key={p._id} className={styles.programCard}>
              {p.status === "pending" || !p.program ? (
                <p className={styles.pending}>
                  درخواست شما در حال بررسی است ⏳
                </p>
              ) : (
                <div>
                  <h3 className={styles.programTitle}>{p.program.title}</h3>
                  <p className={styles.programDesc}>{p.program.description}</p>
                  <span className={styles.programType}>
                    نوع برنامه:  {p.type === "nutrition" ? "غذایی" : "دیگر"}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <p className={styles.details}>
              برای اطلاعات بیشتر راجب برنامه دریافتی و اختصاصی شما در تلگرام به ایدی
              @aminmoradi2006 پیام دهید
              <span>
                <Link target="_blank" href={"https://t.me/aminmoradi2006"}> لینک تلگرام </Link>
              </span>
            </p>
    </div>
  );
}

export default MyNutritionPage;