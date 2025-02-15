"use client";

import { useEffect, useState } from "react";

interface Student {
  uniqId: string;
  student_number: string;
  name: string;
  email: string;
}

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [form, setForm] = useState({
    student_number: "",
    name: "",
    email: "",
    password: "",
    id: "",
  });
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  // Fetch students data
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add or Update Student)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/students/${form.id}` : "/api/students";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_number: form.student_number,
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      if (res.ok) {
        setForm({ student_number: "", name: "", email: "", password: "", id: "" });
        fetchStudents(); // Fetch ulang data tanpa reload

        // ✅ Menampilkan pesan sukses
        showMessage(form.id ? "Student updated successfully!" : "Student added successfully!", "success");
      } else {
        showMessage("Failed to save student. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error updating student:", error);
      showMessage("An error occurred. Please try again.", "error");
    }
  };

  // Handle delete student
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchStudents(); // Refresh data tanpa reload
        showMessage("Student deleted successfully!", "success");
      } else {
        showMessage("Failed to delete student. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error deleting student:", error);
      showMessage("An error occurred. Please try again.", "error");
    }
  };

  // Handle edit student
  const handleEdit = (student: Student) => {
    setForm({
      student_number: student.student_number,
      name: student.name,
      email: student.email,
      password: "", // Kosongkan password
      id: student.uniqId,
    });
  };

  // Function untuk menampilkan pesan sukses/error
  const showMessage = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000); // Hilang otomatis setelah 3 detik
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>

      {/* Pesan Sukses/Error */}
      {message && (
        <div className={`p-3 mb-4 text-center rounded ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          {message.text}
        </div>
      )}

      {/* Form Add/Edit Student */}
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-4 rounded">
        <div className="mb-2">
          <label className="block mb-1">Student Number</label>
          <input
            type="text"
            name="student_number"
            value={form.student_number}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 bg-gray-700 text-white rounded"
            required={!form.id}
          />
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
          {form.id ? "Update" : "Add"} Student
        </button>
      </form>

      {/* Table of Students */}
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2">#</th>
            <th className="border border-gray-700 p-2">Student Number</th>
            <th className="border border-gray-700 p-2">Name</th>
            <th className="border border-gray-700 p-2">Email</th>
            <th className="border border-gray-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <tr key={index} className="hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{index + 1}</td>
                <td className="border border-gray-700 p-2">{student.student_number}</td>
                <td className="border border-gray-700 p-2">{student.name}</td>
                <td className="border border-gray-700 p-2">{student.email}</td>
                <td className="border border-gray-700 p-2">
                  <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-black px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(student.uniqId)} className="bg-red-500 px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center p-4 border border-gray-700">
                No students found...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
