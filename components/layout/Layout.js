import Header from "./Header";
import Footer from "./Footer";

import styles from "@/components/layout/Layout.module.css";


async function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
