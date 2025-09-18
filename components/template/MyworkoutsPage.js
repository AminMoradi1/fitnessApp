"use client";

import styles from "@/template/MyworkoutsPage.module.css";
import { useEffect, useState } from "react";
import Loader from "../module/Loader";
import Link from "next/link";

function MyworkoutsPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      const res = await fetch("/api/dashboard/my-programs");
      const data = await res.json();
      console.log(data);

      setLoading(false);

      if (Array.isArray(data)) {
        const donePrograms = data.filter(
          (req) => req.status === "done" && req.program
        );
        setPrograms(donePrograms);
      } else {
        setPrograms([]);
      }
    };
    fetchPrograms();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>برنامه های من</h2>

      {programs.length === 0 ? (
        <div className={styles.emptyBox}>
          <p>شما هنوز برنامه آماده‌شده‌ای ندارید</p>
          <Link href={"/workout"} className={styles.emptyBtn}>
            دریافت برنامه
          </Link>
        </div>
      ) : (
        <div className={styles.programList}>
          {programs.map((p) => (
            <div key={p._id} className={styles.programCard}>
              <h3 className={styles.programTitle}>{p.program.title}</h3>
              <p className={styles.programDesc}>{p.program.description}</p>
              {p.program.type && (
                <span className={styles.programType}>
                  نوع برنامه:
                  {p.program.type === "training" ? "تمرینی" : "غذایی"}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      <p className={styles.details}>
        برای اطلاعات بیشتر راجب برنامه دریافتی و اختصاصی شما در تلگرام به ایدی
        @aminmoradi2006 پیام دهید
        <span>
          <Link target="_blank" href={"https://t.me/aminmoradi2006"}>
            {" "}
            لینک تلگرام{" "}
          </Link>
        </span>
      </p>
    </div>
  );
}

export default MyworkoutsPage;
