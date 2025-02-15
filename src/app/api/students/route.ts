/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import db, { query } from "@/lib/db";

export async function GET() {
  try {
    const students = await query("SELECT * FROM student");
    return NextResponse.json(students);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error fetching students", { status: 500 });
  }
}

export async function POST(req: Request) {
  const { student_number, name } = await req.json();

  try {
    await db.query("INSERT INTO student (uniqId, student_number, name) VALUES (UUID(), ?, ?)", [
      student_number,
      name,
    ]);
    return new NextResponse("Student added successfully", { status: 201 });
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Error adding student", { status: 500 });
  }
}