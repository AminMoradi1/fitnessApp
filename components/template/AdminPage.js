"use client";
import { useEffect, useState } from "react";
import RequestCard from "../module/RequestCard";

import styles from "@/template/AdminPage.module.css";
import Loader from "../module/Loader";

export default function AdminPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await fetch("/api/admin/requests")
        .then((res) => res.json())
        .then((data) => setRequests(data));
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1>درخواست‌های پندینگ</h1>
      {loading ? <Loader /> : null}
      {requests.map((req) => (
        <RequestCard key={req._id} req={req} />
      ))}
            {requests.length === 0 && <p className={styles.emptyBox}>هیچ درخواستی وجود ندارد</p>}
    </div>
  );
}
