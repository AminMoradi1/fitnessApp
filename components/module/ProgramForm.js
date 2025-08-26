"use client";

import { useState } from "react";
import styles from "./ProgramForm.module.css";

export default function ProgramForm({ type, endpoint, title, extraFields , icon }) {
  const [form, setForm] = useState({
    height: "",
    weight: "",
    experience: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "✅ درخواست شما ثبت شد");
        setForm({ height: "", weight: "", experience: "", photo: "" });
      } else {
        setForm({ height: "", weight: "", experience: "", photo: "" });
        setMessage(data.error || "❌ خطایی رخ داد");
      }
    } catch (error) {
      setMessage("❌ خطا در ارتباط با سرور");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <h2 className={styles.title}>{title}{icon}</h2>

      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="number"
            placeholder="قد (cm)"
            value={form.height}
            onChange={(e) => handleChange("height", e.target.value)}
            className={styles.input}
            required
          />

          <input
            type="number"
            placeholder="وزن (kg)"
            value={form.weight}
            onChange={(e) => handleChange("weight", e.target.value)}
            className={styles.input}
            required
          />

          {/* فیلدهای اضافی */}
          {extraFields &&
            extraFields.map((field, i) => (
              <div key={i}>
                {field.type === "input" && (
                  <input
                    type={field.inputType || "text"}
                    placeholder={field.placeholder}
                    value={form[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className={styles.input}
                  />
                )}

                {field.type === "checkbox" && (
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      checked={form[field.name] === "بله"}
                      onChange={(e) =>
                        handleChange(field.name, e.target.checked ? "بله" : "خیر")
                      }
                      className={styles.checkbox}
                    />
                    {field.label}
                  </label>
                )}
              </div>
            ))}

          <button type="submit" disabled={loading} className={styles.button}>
            {loading ? "در حال ارسال..." : "ارسال درخواست"}
          </button>
        </form>

        {message && <p className={styles.message}>{message}</p>}
      </div>
    </div>
  );
}