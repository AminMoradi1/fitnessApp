import styles from "@/template/HomePage.module.css";
import Link from "next/link";

function HomePage() {
  const infoCards = [
    {
      id: 1,
      title: "تمرینات قدرتی",
      text: "با تمرینات اصولی قدرتی، عضلاتت رو تقویت کن و بدن خوش‌فرمی بساز.",
      img: "/images/power.png",
      link: "/workout",
      buttonText: "دریافت برنامه تمرینی"
    },
    {
      id: 2,
      title: "رژیم غذایی سالم",
      text: "با رژیم غذایی درست و متناسب با هدفت، انرژی و سلامت خودت رو افزایش بده.",
      img: "/images/food.png",
      link: "/food-diet",
      buttonText: "دریافت برنامه غذایی"
    },
    {
      id: 3,
      title: "تجربیات واقعی",
      text: "نکات و تجربیات واقعی از مسیر بدنسازی و تمرینات روزانه.",
      img: "/images/me.png",
      link: "/gym-experience",
      buttonText: "مشاهده تجربیات"
    },
    {
      id: 4,
      title: " مقالات مفید",
      text: "مقالات مفید که خودم نوشتم تا بتونه به شما دوستان عزیز در بدنسازی و رسیدن به بدن رویاهاتون و هدفتون کمک کنه✨",
      img: "/images/me2.png",
      link: "/blog",
      buttonText: "خواندن مقالات"
    },
  ];

  return (
    <>
      <div className={styles.banner}>
        <picture>
          <source media="(max-width: 768px)" srcSet="/images/mobileBanner.jpg" />
          <img src="/images/deskBanner.jpg" alt="Banner" />
        </picture>
      </div>

      <section className={styles.cardsSection}>
        <div className={styles.cardsContainer}>
          {infoCards.map((card) => (
            <div key={card.id} className={styles.card}>
              <img src={card.img} alt={card.title} className={styles.cardImage} />
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardText}>{card.text}</p>
              <Link href={card.link} className={styles.cardButton}>
                {card.buttonText}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;