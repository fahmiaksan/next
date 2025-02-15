import { NextResponse } from "next/server";
import { query } from "@/lib/db"; // Pastikan ada helper query untuk koneksi database

// GET: Ambil semua data course
export async function GET() {
  try {
    const courses = await query("SELECT * FROM courses");
    return NextResponse.json(courses, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching courses" }, { status: 500 });
  }
}

// POST: Tambah data course
export async function POST(req: Request) {
  const { course_name, description } = await req.json();

  try {
    await query("INSERT INTO courses (course_name, description) VALUES (?, ?)", [course_name, description]);
    return NextResponse.json({ message: "Course added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error adding course" }, { status: 500 });
  }
}
