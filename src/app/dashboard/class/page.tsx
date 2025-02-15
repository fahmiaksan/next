
"use client";

import { useState, useEffect } from "react";

interface Class {
  id: string;
  class_name: string;
  description: string;
}

export default function ClassPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [form, setForm] = useState({ id: "", class_name: "", description: "" });
  const [message, setMessage] = useState("");

  // Fetch data
  useEffect(() => {
    fetch("/api/class")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
      })
      .catch((error) => {
        console.error("Error fetching classes:", error);
        setClasses([]);
      });
  }, []);

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id ? `/api/class/${form.id}` : "/api/class";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setMessage(form.id ? "Class updated successfully!" : "Class added successfully!");
      setForm({ id: "", class_name: "", description: "" });
      fetch("/api/class")
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setClasses(data);
          } else {
            console.error("Expected an array but got:", data);
            setClasses([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
          setClasses([]);
        });
    }
  };

  // Handle Edit
  const handleEdit = (c: Class) => {
    setForm({ id: c.id, class_name: c.class_name, description: c.description });
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const res = await fetch(`/api/class/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setMessage("Class deleted successfully!");
      setClasses(classes.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>

      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-gray-800 p-4 rounded">
        <input
          type="text"
          name="class_name"
          value={form.class_name}
          onChange={handleChange}
          placeholder="Class Name"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          required
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 mb-2 bg-gray-700 text-white rounded"
          required
        />
        <button type="submit" className="bg-blue-500 px-4 py-2 rounded">
          {form.id ? "Update" : "Add"} Class
        </button>
      </form>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 p-2">#</th>
            <th className="border border-gray-700 p-2">Class Name</th>
            <th className="border border-gray-700 p-2">Description</th>
            <th className="border border-gray-700 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(classes) && classes.length > 0 ? (
            classes.map((c, index) => (
              <tr key={c.id} className="hover:bg-gray-800">
                <td className="border border-gray-700 p-2">{index + 1}</td>
                <td className="border border-gray-700 p-2">{c.class_name}</td>
                <td className="border border-gray-700 p-2">{c.description}</td>
                <td className="border border-gray-700 p-2">
                  <button onClick={() => handleEdit(c)} className="bg-yellow-500 px-2 py-1 rounded mr-2">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(c.id)} className="bg-red-500 px-2 py-1 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="border border-gray-700 p-2 text-center">
                No classes found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}