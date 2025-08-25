import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import Sidebar from "@/components/module/SideBar";

export const metadata = {
  title: "پنل کاربری املاک | پروژه امین مرادی",
};

async function DshboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  await connectDB();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return <h3>مشکلی پیش آمده است</h3>;

  return <Sidebar role={user.role} email={user.email}>{children}</Sidebar>;
}

export default DshboardLayout;
