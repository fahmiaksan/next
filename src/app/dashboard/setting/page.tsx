"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function SettingsPage() {
  const [form, setForm] = useState({ name: "", password: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage("Profile updated successfully");
      setForm({ name: "", password: "", newPassword: "" });
    } else {
      setMessage("Update failed. Please check your inputs.");
    }
  };


  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {message && <p className="mb-4 text-green-400">{message}</p>}

      <form onSubmit={handleUpdate} className="bg-gray-800 p-4 rounded">
        <div className="mb-4">
          <label className="block mb-1">New Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Current Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          Update Profile
        </button>
      </form>

      <button onClick={() => signOut({ callbackUrl: "/" })} className="mt-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
