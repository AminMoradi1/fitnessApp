"use client";

import styles from "@/template/WorkoutPage.module.css";
import Image from "next/image";
import ProgramForm from "../module/ProgramForm";
import { CgGym } from "react-icons/cg";

function WorkoutPage() {
  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>دریافت برنامه</h2>

      <div className={styles.beforeAfter}>
        <div className={styles.beforeWrapper}>
          <Image
            src="/images/skinny.png"
            alt="قبل"
            width={300}
            height={300}
            className={styles.image}
          />
          <p>قبل</p>
        </div>
        <div className={styles.afterWrapper}>
          <Image
            src="/images/after.png"
            alt="بعد"
            width={300}
            height={300}
            className={styles.image}
          />
          <p>بعد</p>
        </div>
      </div>

      <p className={styles.description}>
        همشو خودم ساختم. با رعایت اصولی رژیم غذایی و تمرین میتونی بدستش بیاری.
        فقط بهم اعتماد کن و منظم باش.
      </p>

      <ProgramForm
        type="training"
        endpoint="/api/request"
        icon={<CgGym style={{ color: "rgb(124, 58, 237)" }} />}
        title="درخواست برنامه تمرینی"
        extraFields={[
          { type: "input", name: "experience", placeholder: "سابقه تمرینی" },
          { type: "input", name: "photo", placeholder: "لینک عکس" },
        ]}
      />
    </div>
  );
}

export default WorkoutPage;
