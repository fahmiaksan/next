'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterForm = () => {
    const [user, setUser] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.message || "Registration failed");

            // Redirect ke halaman login jika sukses
            router.push(data.redirect);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="flex w-full h-full max-w-5xl shadow-lg rounded-lg overflow-hidden">
                {/* Left Section */}
                <div className="flex flex-col justify-center items-center flex-1 bg-gradient-to-br from-purple-700 to-pink-500 p-10">
                    <h2 className="text-4xl font-bold mb-6">Join Us!</h2>
                    <p className="text-lg text-center mb-6">Create an account to access exclusive content.</p>
                    <Link href="/login" className="bg-white text-purple-700 px-6 py-3 rounded-md text-lg font-semibold shadow-md hover:bg-gray-200 transition">LOG IN</Link>
                </div>
                {/* Right Section */}
                {
                    error && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white p-4 rounded-md">
                            {error}
                        </div>
                    )
                }
                <div className="flex flex-col justify-center items-center flex-1 bg-gray-800 p-10">
                    <h2 className="text-3xl font-semibold mb-6">OPEN ACCOUNT</h2>
                    <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
                        {[{ name: "email", label: "Email", type: "email" },
                        { name: "name", label: "Name", type: "text" },
                        { name: "password", label: "Password", type: "password" }]
                            .map(({ name, label, type }) => (
                                <div key={name} className="flex flex-col">
                                    <label className="text-lg font-medium mb-2">{label}</label>
                                    <input
                                        className="h-12 rounded-md text-lg border border-gray-600 bg-gray-700 text-white px-4 focus:ring-2 focus:ring-pink-500 focus:outline-none"
                                        type={type}
                                        name={name}
                                        value={user[name]}
                                        onChange={e => setUser(prev => ({ ...prev, [name]: e.target.value }))}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                            ))}
                        <button disabled={disabled} type="submit" className={`w-full bg-pink-600 py-3 ${disabled ? "cursor-not-allowed" : ""} rounded-md text-xl font-semibold text-white hover:bg-pink-700 transition`}>
                            {
                                disabled ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    </svg>
                                ) : (
                                    "REGISTER"
                                )
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
