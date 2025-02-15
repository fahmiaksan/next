"use client";

import { useState, useEffect } from "react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export default function TeacherPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [form, setForm] = useState({ id: "", name: "", email: "", phone: "" });
  const [message, setMessage] = useState("");

  // ✅ Fetch Teachers
  useEffect(() => {
    fetch("/api/teacher")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  // ✅ Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Submit (Add / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/teacher/${form.id}` : "/api/teacher";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage(form.id ? "Teacher updated successfully!" : "Teacher added successfully!");
      setForm({ id: "", name: "", email: "", phone: "" });
      fetch("/api/teacher")
        .then((res) => res.json())
        .then((data) => setTeachers(data));
    }
  };

  // ✅ Handle Edit
  const handleEdit = (t: Teacher) => {
    setForm({ id: t.id, name: t.name, email: t.email, phone: t.phone });
  };

  // ✅ Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/teacher/${id}`, { method: "DELETE" });

    if (res.ok) {
      setMessage("Teacher deleted successfully!");
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Teachers</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-4 rounded">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Teacher Name"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          required
        />
        <input
          type="text"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          {form.id ? "Update" : "Add"} Teacher
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2">#</th>
            <th className="border border-gray-700 p-2">Name</th>
            <th className="border border-gray-700 p-2">Email</th>
            <th className="border border-gray-700 p-2">Phone</th>
            <th className="border border-gray-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.length > 0 ? (
            teachers.map((t, index) => (
              <tr key={t.id} className="hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{index + 1}</td>
                <td className="border border-gray-700 p-2">{t.name}</td>
                <td className="border border-gray-700 p-2">{t.email}</td>
                <td className="border border-gray-700 p-2">{t.phone}</td>
                <td className="border border-gray-700 p-2">
                  <button onClick={() => handleEdit(t)} className="bg-yellow-500 px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(t.id)} className="bg-red-500 px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-gray-700 p-2 text-center">
                No teachers found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
