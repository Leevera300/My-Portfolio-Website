import { NextResponse } from "next/server";

const YOUR_SECRET_PASSWORD = process.env.ADMIN_PASSWORD; // define in .env

export async function POST(req) {
  const { password } = await req.json();

  //   console.log("ENV PASSWORD:", process.env.ADMIN_PASSWORD);

  if (password === YOUR_SECRET_PASSWORD) {
    const res = NextResponse.json({ success: true });
    res.cookies.set("admin-auth", "true", { httpOnly: true });
    return res;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
