"use client";
import { useState } from "react";
import styles from "./NutritionPage.module.css";

export default function NutritionPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [experience, setExperience] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/nutrition/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          height,
          weight,
          experience: experience ? "بله" : "خیر",
          type:"nutrition"
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "درخواست شما ثبت شد✅");
        setHeight("");
        setWeight("");
        setExperience(false);
      } else {
        setMessage(data.error || "خطایی رخ داد ❌");
      }
    } catch (error) {
      setMessage("خطا در ارتباط با سرور ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>درخواست برنامه غذایی 😋</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label className={styles.label}>قد (سانتی‌متر)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div>
          <label className={styles.label}>وزن (کیلوگرم)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={experience}
            onChange={() => setExperience(!experience)}
            className={styles.checkbox}
          />
          <label className={styles.label}>
            آیا قبلاً رژیم غذایی داشته‌اید؟
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={styles.button}
        >
          {loading ? "در حال ارسال..." : "ارسال درخواست"}
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
}