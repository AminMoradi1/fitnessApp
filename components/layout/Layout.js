import Header from "./Header";
import Footer from "./Footer";
import { getServerSession } from "next-auth";

import styles from "@/components/layout/Layout.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
