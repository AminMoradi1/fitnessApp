import connectDB from "@/utils/connectDB";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Request from "@/models/Request";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "❌لطفا وارد حساب کاربری خود شوید" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { height, weight, photo, experience, type } = body;

  if (!height || !weight) {
    return NextResponse.json(
      { error: "قد و وزن الزامی هستند" },
      { status: 422 }
    );
  }

  const heightNum = Number(height);
  const weightNum = Number(weight);

  if (isNaN(heightNum) || isNaN(weightNum)) {
    return NextResponse.json(
      { error: "❌قد و وزن باید عدد باشند" },
      { status: 422 }
    );
  }

  if (heightNum < 50 || heightNum > 300) {
    return NextResponse.json(
      { error: "❌قد باید بین 50 تا 300 سانتی‌متر باشد" },
      { status: 422 }
    );
  }

  if (weightNum < 20 || weightNum > 200) {
    return NextResponse.json(
      { error: "❌وزن باید بین 20 تا 200 کیلوگرم باشد" },
      { status: 422 }
    );
  }

  const existingRequest = await Request.findOne({
    user: session.user.id,
    type: "training",
  });
  if (existingRequest) {
    return NextResponse.json(
      { error: "❌شما قبلا درخواست داده‌اید" },
      { status: 400 }
    );
  }

  const request = await Request.create({
    user: session.user.id,
    height: heightNum,
    weight: weightNum,
    photo,
    experience,
    type,
  });

  return NextResponse.json(
    { message: "درخواست برنامه شما با موفقیت ثبت شد" },
    { status: 200 }
  );
}
