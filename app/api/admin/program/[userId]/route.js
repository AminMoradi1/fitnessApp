import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Program from "@/models/Program";
import User from "@/models/User";
import Request from "@/models/Request";

export async function DELETE(req, { params }) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await User.findOne({ email: session.user.email });
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { userId } = await params;

  const request = await Request.findByIdAndDelete(userId);
  if (!request) {
    return NextResponse.json({ error: "برنامه یافت نشد" }, { status: 404 });
  }

  return NextResponse.json(
    { message: "برنامه با موفقیت حذف شد" },
    { status: 200 }
  );
}
