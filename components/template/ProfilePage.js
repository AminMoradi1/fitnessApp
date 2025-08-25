"use client";

import { useState, useEffect } from "react";
import styles from "./ProfilePage.module.css";
import Loader from "../module/Loader";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/dashboard/profile");
      const data = await res.json();
      if (res.ok) {
        setUser(data);
        setName(data.name || "");
        setEmail(data.email || "");
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    const res = await fetch("/api/dashboard/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ اطلاعات بروزرسانی شد");
      setUser(data);
      setEditMode(false);
      setPassword("");
    } else {
      alert(data.error || "خطا در بروزرسانی");
    }
  };

  if (!user) return <Loader />;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>پروفایل کاربر</h2>

      {!editMode ? (
        <>
          <p className={styles.info}>
            <span className={styles.label}>نام:</span> {user.name}
          </p>
          <p className={styles.info}>
            <span className={styles.label}>ایمیل:</span> {user.email}
          </p>

          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.save}`}
              onClick={() => setEditMode(true)}
            >
              ✏️ ویرایش اطلاعات
            </button>
          </div>
        </>
      ) : (
        <div className={styles.editForm}>
          <input
            className={styles.input}
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="پسورد جدید"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={styles.buttons}>
            <button
              className={`${styles.button} ${styles.save}`}
              onClick={handleUpdate}
            >
              ثبت تغییرات
            </button>
            <button
              className={`${styles.button} ${styles.cancel}`}
              onClick={() => setEditMode(false)}
            >
              ❌ لغو
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;