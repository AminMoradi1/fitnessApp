import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Program from "@/models/Program";
import Request from "@/models/Request";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "لطفا وارد حساب کاربری خود شوید" }, { status: 401 });
  }

  const admin = await User.findOne({ email: session.user.email });
  if (!admin || admin.role !== "ADMIN") {
    return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
  }

  const body = await req.json();
  const { requestId, title, description, type } = body;

  const requestDoc = await Request.findById(requestId);
  if (!requestDoc) {
    return NextResponse.json({ error: "درخواست یافت نشد!" }, { status: 404 });
  }

  // ساختن برنامه
  const program = await Program.create({
    title,
    description,
    type, // نوع برنامه تمرینی یا غذایی
    request: requestDoc._id,
    createdBy: admin._id,
  });

  requestDoc.status = "done";
  requestDoc.program = program._id;
  await requestDoc.save();

  return NextResponse.json({ message: "برنامه با موفقیت ثبت شد", program }, { status: 200 });
}

