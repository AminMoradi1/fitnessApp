// /api/program/my-programs/route.js
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";

export async function GET(req) {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const requests = await Request.find({
    user: session.user.id,
    type: "training",
    status: "done",
  }).populate("program");
  console.log(requests);

  return NextResponse.json(requests, { status: 200 });
}
