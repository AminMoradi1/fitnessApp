"use client";

import { useState } from "react";
import styles from "./RequestCard.module.css";
import { useRouter } from "next/navigation";

function RequestCard({ req }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  console.log(req);

  const handleSubmit = async () => {
    const res = await fetch("/api/admin/program", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requestId: req._id,
        title,
        description,
        type: req.type, // 🔥 داینامیک
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ برنامه ثبت شد");
      setShowForm(false);
    } else {
      alert(data.error || "خطا در ثبت برنامه");
    }
  };

  const router = useRouter();

  const deleteHandler = async () => {
    const res = await fetch(`/api/admin/program/${req._id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      alert("با موفقیت حذف شد");
      router.refresh();
    } else {
      alert("خطا در حذف");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <p>
          <span>کاربر:</span> {req.user?.name}
        </p>
        <p>
          <span>قد:</span> {req.height} | <span>وزن:</span> {req.weight}
        </p>

        {req.type === "training" && (
          <p>
            <span>سابقه تمرینی:</span> {req.experience || "-"}
          </p>
        )}

        {req.type === "nutrition" && (
          <p>
            <span>سابقه رژیم غذایی:</span> {req.extraQuestion ? "بله" : "خیر"}
          </p>
        )}

        {req.photo && (
          <p>
            <span>لینک عکس:</span> {req.photo}
          </p>
        )}

        <p className={`${styles.status} ${styles[req.status]}`}>
          وضعیت: {req.status === "pending" ? "در انتظار" : "انجام شده"}
        </p>
      </div>

      <div className={styles.buttons}>
        {!showForm ? (
          <button className={styles.btn} onClick={() => setShowForm(true)}>
            نوشتن برنامه {req.type === "nutrition" ? "غذایی" : "تمرینی"}
          </button>
        ) : (
          <div className={styles.form}>
            <input
              className={styles.input}
              placeholder="عنوان برنامه"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className={styles.textarea}
              placeholder="توضیحات برنامه"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button className={styles.submitBtn} onClick={handleSubmit}>
              ثبت برنامه
            </button>
          </div>
        )}
        <button className={styles.deleteBtn} onClick={deleteHandler}>
          حذف درخواست
        </button>
      </div>

    </div>
  );
}

export default RequestCard;
