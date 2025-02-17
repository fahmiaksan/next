import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]/route";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log("get api", session);
  return NextResponse.json({ authenticated: !!session });
}
