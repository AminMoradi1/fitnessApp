import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";

export async function POST(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { height, weight, experience, photo, extraQuestion , type } = await req.json();

  if (!height || !weight) {
    return NextResponse.json({ error: "قد و وزن الزامی هستند" }, { status: 422 });
  }

  const request = await Request.create({
    user: session.user.id,
    height,
    weight,
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