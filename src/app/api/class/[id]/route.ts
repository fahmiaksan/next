import { NextResponse } from "next/server";
import { query } from "@/lib/db";

// Ambil kelas berdasarkan ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const [rows] = await query("SELECT * FROM class WHERE id = ?", [params.id]);
    return NextResponse.json(rows[0] || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching class" }, { status: 500 });
  }
}

// Edit kelas berdasarkan ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { class_name, description } = await req.json();
    await query("UPDATE class SET class_name = ?, description = ? WHERE id = ?", [
      class_name,
      description,
      params.id,
    ]);
    return NextResponse.json({ message: "Class updated successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error updating class" }, { status: 500 });
  }
}

// Hapus kelas berdasarkan ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await query("DELETE FROM class WHERE id = ?", [params.id]);
    return NextResponse.json({ message: "Class deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting class" }, { status: 500 });
  }
}
