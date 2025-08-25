"use client";

import styles from "@/template/WorkoutPage.module.css";
import { useState } from "react";
import Image from "next/image";

function WorkoutPage() {
  const [form, setForm] = useState({
    height: "",
    weight: "",
    experience: "",
    photo: "",
  });

  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/request", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        type: "training",
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      setMessage("✅ درخواست شما ثبت شد، منتظر بمانید تا برنامه آماده شود");
      setForm({ height: "", weight: "", photo: "", experience: "" });
    } else {
      setMessage("❌ خطا در ثبت درخواست");
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* تیتر */}
      <h2 className={styles.title}>دریافت برنامه</h2>

      {/* بخش قبل و بعد خارج از کارت */}
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

      {/* متن توضیح */}
      <p className={styles.description}>
        همشو خودم ساختم. با رعایت اصولی رژیم غذایی و تمرین میتونی بدستش
        بیاری. فقط بهم اعتماد کن و منظم باش.
      </p>

      {/* کارت فرم با شادو و بگراند */}
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            placeholder="قد (cm)"
            value={form.height}
            onChange={(e) => setForm({ ...form, height: e.target.value })}
            className={styles.input}
          />

          <input
            type="number"
            placeholder="وزن (kg)"
            value={form.weight}
            onChange={(e) => setForm({ ...form, weight: e.target.value })}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="سابقه تمرینی"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className={styles.input}
          />

          <input
            type="text"
            placeholder="لینک عکس"
            value={form.photo}
            onChange={(e) => setForm({ ...form, photo: e.target.value })}
            className={styles.input}
          />

          <button type="submit" className={styles.button}>
            ارسال درخواست
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}

export default WorkoutPage;