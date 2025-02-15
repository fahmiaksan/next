import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// PUT: Update data course
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { course_name, description } = await req.json();

  try {
    await query("UPDATE courses SET course_name = ?, description = ? WHERE id = ?", [
      course_name,
      description,
      params.id,
    ]);
    return NextResponse.json({ message: "Course updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating course" }, { status: 500 });
  }
}

// DELETE: Hapus data course
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM courses WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting course" }, { status: 500 });
  }
}
