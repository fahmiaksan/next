import { NextResponse } from "next/server";
import util from "util";
import db from "@/lib/db";
import bcrypt from "bcrypt";

interface Student {
  email: string
  password: string;
  name: string
}

const query = util.promisify(db.query).bind(db);

const generateStudentNumber = (): string => {
  const randomNumber = Math.floor(100000 + Math.random() * 900000); // 6 digit angka acak
  return `SN${randomNumber}`;
};

export const POST = async (req: Request) => {
  try {
    const user: Student = await req.json();
    if (!user?.password || !user?.email) return new NextResponse("Missing required fields", { status: 400 });
    const hashedPassword = await bcrypt.hash(user.password, 10);
    if (!hashedPassword) return new Error("Failed to hash password");
    const student_number = generateStudentNumber();
    console.log(hashedPassword);
    const results = await query(`INSERT INTO student (uniqId, name, email, student_number, password) VALUES (UUID(), ?, ?, ?,?)`, [user.name, user.email, student_number, hashedPassword]);
    if (results) return NextResponse.json({ message: "User registered successfully", redirect: "/login" });
  } catch (error) {
    console.log(error)
    return new Error("Failed to register user");
  }
}