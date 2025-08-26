import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "لطفا وارد حساب کاربری خود شوید❌" },
      { status: 401 }
    );
  }

  const { height, weight, experience, photo, extraQuestion, type } =
    await req.json();

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
      { error: "قد و وزن باید عدد باشند" },
      { status: 422 }
    );
  }

  if (heightNum < 50 || heightNum > 300) {
    return NextResponse.json(
      { error: "قد باید بین ۵۰ تا ۳۰۰ سانتی‌متر باشد" },
      { status: 422 }
    );
  }

  if (weightNum < 20 || weightNum > 300) {
    return NextResponse.json(
      { error: "وزن باید بین ۲۰ تا ۳۰۰ کیلوگرم باشد" },
      { status: 422 }
    );
  }

  const existingRequest = await Request.findOne({
    user: session.user.id,
    type: "nutrition",
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
    experience,
    photo,
    extraQuestion,
    type,
  });

  console.log(request);

  return NextResponse.json(
    { message: "درخواست برنامه غذایی شما ثبت شد", request },
    { status: 201 }
  );
}
