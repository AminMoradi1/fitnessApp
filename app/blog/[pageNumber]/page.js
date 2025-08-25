// app/blog/[pageNumber]
import Image from "next/image";
import Link from "next/link";
import { data } from "@/utils/data";
import styles from "./blog.module.css";

const ARTICLES_PER_PAGE = 5;

export async function generateStaticParams() {
  const totalPages = Math.ceil(data.length / ARTICLES_PER_PAGE);
  return Array.from({ length: totalPages }, (_, i) => ({
    pageNumber: (i + 1).toString(),
  }));
}

export const metadata = {
  title: "مقالات | وبسایت من",
  description: "تجربیات و مقالات شخصی در زمینه بدنسازی",
};

export default function BlogPage({ params }) {
  const currentPage = parseInt(params.pageNumber, 10);
  const totalPages = Math.ceil(data.length / ARTICLES_PER_PAGE);

  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const currentArticles = data.slice(startIndex, endIndex);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>📚 مقالات من</h1>
      <div className={styles.grid}>
        {currentArticles.map((article) => (
          <div key={article.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <Image
                src={article.image}
                alt={article.title}
                width={500}
                height={300}
                className={styles.image}
              />
            </div>
            <div className={styles.content}>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              <Link
                href={`/blog/articles/${article.id}`}
                className={styles.btn}
              >
                ادامه مطلب
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* صفحه‌بندی */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i}
            href={`/blog/${i + 1}`}
            className={`${styles.pageLink} ${
              currentPage === i + 1 ? styles.active : ""
            }`}
          >
            {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
