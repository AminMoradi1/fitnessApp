import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Request from "@/models/Request";
import Program from "@/models/Program";

export async function GET(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const requests = await Request.find({
      user: session.user.id,
      type: "nutrition",
      status: "done",
    })
      .populate("program")
      .sort({ createdAt: -1 });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    console.error("Error fetching nutrition programs:", error);
    return NextResponse.json(
      { error: "خطا در گرفتن برنامه در سرور" },
      { status: 500 }
    );
  }
}
