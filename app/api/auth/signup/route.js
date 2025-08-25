import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/auth";

export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: "❌!لطفا اطلاعات را کامل پرکنید" },
        { status: 422 }
      );
    }

    const exsistUser = await User.findOne({ email });
    if (exsistUser) {
      return NextResponse.json(
        { error: "❌شما قبلا ثبت نام کرده اید!" },
        { status: 422 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({name , email, password: hashedPassword });
    console.log(newUser);
    return NextResponse.json(
      { message: "حساب کاربری با موفقیت ایجاد شد✅" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "!مشکلی در سرور رخ داده است" },
      { status: 500 }
    );
  }
}
