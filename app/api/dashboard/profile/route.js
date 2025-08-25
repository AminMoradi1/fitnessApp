import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { authOptions } from "../../auth/[...nextauth]/route";

// گرفتن اطلاعات پروفایل کاربر
export async function GET() {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const user = await User.findById(session.user.id).select("-password");
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

// بروزرسانی اطلاعات پروفایل (هر فیلدی که تغییر کرد)
export async function PATCH(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, password } = body;

  let updateFields = {};
  if (name) updateFields.name = name;
  if (email) updateFields.email = email;
  if (password) {
    updateFields.password = await bcrypt.hash(password, 10);
  }

  try {
    const user = await User.findByIdAndUpdate(
      session.user.id,
      { $set: updateFields },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}