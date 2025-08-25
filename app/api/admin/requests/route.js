import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import User from "@/models/User";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = await User.findOne({ email: session.user.email });
  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
  }

  // همه درخواست‌های پندینگ، چه تمرینی چه غذایی
  const requests = await Request.find({ status: "pending" }).populate("user");

  return NextResponse.json(requests, { status: 200 });
}