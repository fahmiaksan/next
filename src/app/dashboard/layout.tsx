'use client'

import { ReactNode } from "react";
import Link from "next/link";
import { SessionProvider } from "next-auth/react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <div className="flex min-h-screen bg-gray-900 text-gray-200">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 shadow-md p-5">
          <h2 className="text-xl font-bold mb-4 text-white">Admin Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="block p-2 rounded hover:bg-gray-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/dashboard/student" className="block p-2 rounded hover:bg-gray-700">
                  Manage Student
                </Link>
              </li>
              <li>
                <Link href="/dashboard/course" className="block p-2 rounded hover:bg-gray-700">
                  Manage Course
                </Link>
              </li>
              <li>
                <Link href="/dashboard/teacher" className="block p-2 rounded hover:bg-gray-700">
                  Manage Teacher
                </Link>
              </li>
              <li>
                <Link href="/dashboard/class" className="block p-2 rounded hover:bg-gray-700">
                  Manage Class
                </Link>
              </li>
              <li>
                <Link href="/dashboard/setting" className="block p-2 rounded hover:bg-gray-700">
                  Settings
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-900">{children}</main>
      </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
