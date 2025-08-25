import styles from "@/template/HomePage.module.css";

function HomePage() {
  
  return (
    <>
      <div className={styles.banner}>
        <picture>
          <source
            media="(max-width: 768px)"
            srcSet="/images/mobileBanner.jpg"
          />
          <img
            src="/images/deskBanner.jpg"
            alt="Banner"
            style={{ width: "100%", height: "auto" }}
          />
        </picture>
      </div>
    
    </>
  );
}

export default HomePage;
