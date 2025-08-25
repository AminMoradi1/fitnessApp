import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import User from "@/models/User";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return NextResponse.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { height, weight, photo, experience , type } = body;

  if (!height || !weight) {
    return NextResponse.json(
      { error: "قد و وزن الزامی هستند" },
      { status: 422 }
    );
  }

  const request = await Request.create({
    user: session.user.id,
    height: Number(height),
    weight: Number(weight),
    photo,
    experience,
    type,
  });

  console.log("requestProgram", request);

  return NextResponse.json(
    { message: "درخواست برنامه شما با موفقیت انجام شد" },
    { status: 200 }
  );
}

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );
  }

  const user = await User.findOne({ email: session.user.email });
  console.log(user);

  if (!user) {
    return NextResponse.json({ error: "کاربر یافت نشد" }, { status: 404 });
  }

  if (user.role !== "ADMIN") {
    return NextResponse.json({ error: "دسترسی محدود" }, { status: 403 });
  }

  const requests = await Request.find({ status: "pending" }).populate("user");

  return NextResponse.json(requests, { status: 200 });
}
