import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Ambil semua kelas
export async function GET() {
  try {
    const rows = await query("SELECT * FROM class");
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching classes" }, { status: 500 });
  }
}



// Tambah kelas baru
export async function POST(req: Request) {
  try {
    const { class_name, description } = await req.json();
    await query("INSERT INTO class (class_name, description) VALUES (?, ?)", [class_name, description]);
    return NextResponse.json({ message: "Class added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding class" }, { status: 500 });
  }
}
