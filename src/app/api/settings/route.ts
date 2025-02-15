/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import db, { query } from "@/lib/db";
import bcrypt from 'bcrypt';
interface User {
  name: string;
  email: string;
  password: string;
}
interface UserWithId extends User {
  id: string;
}


export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const userId: string = (session.user as UserWithId).id;

  const { name, password, newPassword } = await req.json();

  try {
    const [user] = await query("SELECT * FROM users WHERE id = ?", [userId]) as any[];

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Jika ingin update password, pastikan password lama cocok
    if (password && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        return new NextResponse("Incorrect current password", { status: 400 });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, userId]);
    }

    if (name) {
      await db.query("UPDATE users SET name = ? WHERE id = ?", [name, userId]);
    }

    return new NextResponse("Profile updated successfully", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error updating profile", { status: 500 });
  }
}
