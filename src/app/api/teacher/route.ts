import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// ✅ GET All Teachers
export async function GET() {
  try {
    const rows = await query("SELECT * FROM teachers");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching teachers" }, { status: 500 });
  }
}

// ✅ POST (Create New Teacher)
export async function POST(req: Request) {
  try {
    const { name, email, phone } = await req.json();
    await query("INSERT INTO teachers (name, email, phone) VALUES (?, ?, ?)", [name, email, phone]);
    return NextResponse.json({ message: "Teacher added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding teacher" }, { status: 500 });
  }
}
