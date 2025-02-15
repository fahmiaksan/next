import { query } from "@/lib/db";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
interface Student {
  uniqId: string;
  student_number: string;
  name: string;
  password: string;
  email: string
};

export const authOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        let user: Student = await query(`SELECT uniqId, student_number, name, password FROM student WHERE email = '${credentials.email}'`);
        user = user[0];

        if (!user) {
          return null;
        }
        const hashedPassword = await bcrypt.compare(credentials.password, user.password);
        if (hashedPassword) {
          return {
            id: user.uniqId,
            email: user.email,
            student_number: user.student_number,
            name: user.name,
          }
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }