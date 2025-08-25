// app/blog/articles/[id]
import Image from "next/image";
import { notFound } from "next/navigation";
import { data } from "@/utils/data";
import styles from "./detailBlog.module.css";

// مسیرهای استاتیک رو بسازیم (SSG)
export async function generateStaticParams() {
  return data.map((article) => ({
    id: article.id.toString(),
  }));
}

export default function ArticlePage({ params }) {
  const articleId = parseInt(params.id, 10);
  const article = data.find((item) => item.id === articleId);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.detailContainer}>
      <h1 className={styles.detailTitle}>{article.title}</h1>
      <div className={styles.detailImageWrapper}>
        <Image
          src={article.image}
          alt={article.title}
          width={800}
          height={400}
          className={styles.detailImage}
        />
      </div>
      <p className={styles.detailContent}>{article.content}</p>
    </div>
  );
}