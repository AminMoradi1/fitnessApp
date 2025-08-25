"use client";

import { useState } from "react";
import styles from "@/template/SignInPage.module.css";
import { signIn } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../module/Loader";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleTogglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success("ورود موفقیت‌آمیز ✅");
      router.refresh();
      router.push("/");
    }
  };

  const githubHandler = () => {
    signIn("github");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} role="region" aria-labelledby="title">
        <div className={styles.cardHeader}>
          <div className={styles.logo} aria-hidden="true">
            ∞
          </div>
          <div>
            <h1 id="title">ورود به حساب</h1>
            <p className={styles.muted}>با ایمیل و رمز عبور خود وارد شوید</p>
          </div>
        </div>
        <div className={styles.cardBody}>
          <form id="login-form" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">ایمیل</label>
              <div className={styles.input}>
                <span className={styles.inputIcon} aria-hidden="true">
                  ✉️
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="password">رمز عبور</label>
              <div className={styles.input}>
                <span className={styles.inputIcon} aria-hidden="true">
                  🔒
                </span>
                <input
                  id="password"
                  name="password"
                  type={passwordVisible ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  minLength="6"
                  required
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  aria-label="نمایش/مخفی کردن رمز"
                  className={styles.toggleBtn}
                >
                  {passwordVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {loading ? (
              <Loader />
            ) : (
              <button className={styles.btn} type="submit">
                ورود
              </button>
            )}
            <div className={styles.links}>
              <span className={styles.muted}>حساب ندارید؟</span>
              <Link href={"/signup"} className={styles.link}>
                ایجاد حساب
              </Link>
            </div>

            <div className={styles.divider}>یا</div>

            <div className={styles.oauth} aria-label="ورود با شبکه‌های اجتماعی">
              <button onClick={githubHandler} type="button">
                ورود با GitHub <FaGithub />
              </button>
            </div>
          </form>
        </div>
        <div className={styles.footer}>
          با ادامه، شرایط استفاده را می‌پذیرید.
        </div>
        <Toaster />
      </div>
    </div>
  );
}
