import { getServerSession } from "next-auth";
import styles from "@/template/DashboardPage.module.css";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/models/User";

async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });
console.log(session);

  console.log(user);
  

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h3>سلام {user?.name} عزیز 😊</h3>
        <p>
          خوشحالم که اینجایی💪 اگه میخوای بدنت رو به بهترین ورژن خودش برسونی به
          صورت نچرال جای درستی اومدی. از داشبورد بالا میتونی برنامه های اختصاصی
          خودت رو ببینی🏋️‍♂️
        </p>
      </div>
      <div className={styles.createdAt}>
        <p>
          تاریخ عضویت شما در سایت:
          {new Date(user?.createdAt).toLocaleDateString("fa-IR")}
        </p>
      </div>
    </div>
  );
}

export default DashboardPage;
