import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// ✅ UPDATE Teacher
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email, phone } = await req.json();
    await query("UPDATE teachers SET name = ?, email = ?, phone = ? WHERE id = ?", [
      name,
      email,
      phone,
      params.id,
    ]);
    return NextResponse.json({ message: "Teacher updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating teacher" }, { status: 500 });
  }
}

// ✅ DELETE Teacher
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM teachers WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Teacher deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting teacher" }, { status: 500 });
  }
}
