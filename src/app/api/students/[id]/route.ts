import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { student_number, name, email, password } = await req.json();

  try {
    await query("UPDATE student SET student_number = ?, name = ?, email = ?, password = ? WHERE uniqId = ?", [
      student_number,
      name,
      email,
      password,
      params.id,
    ]);
    return new NextResponse("Student updated successfully", { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Error updating student", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM student WHERE uniqId = ?", [params.id]);
    return new NextResponse("Student deleted successfully", { status: 200 });
  } catch (error) {
    console.log(error)
    return new NextResponse("Error deleting student", { status: 500 });
  }
}