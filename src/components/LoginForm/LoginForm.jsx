'use client';
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const disabled = !user.email || !user.password;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const results = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false
      });

      if (results?.error) {
        setError("Invalid credentials");
        setIsLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="flex mx-auto justify-center flex-wrap items-center h-screen bg-gray-900 text-white">
      <div className="flex flex-col w-full max-w-md p-10 bg-gray-800 rounded-md shadow-lg">
        <h2 className="text-4xl font-semibold text-center mb-6 text-yellow-400">LOGIN ACCOUNT</h2>
        {
          error &&
          <p className="text-red-500 text-center mb-4">{error}</p>
        }
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {[
            { name: "email", placeholder: "john@gmail.com", label: "Email", type: "email" },
            { name: "password", placeholder: "Xbshsd$##@31!", label: "Password", type: "password" }
          ].map(({ name, placeholder, label, type }) => (
            <div key={name} className="relative flex flex-col">
              <label className="text-lg px-2 cursor-text transition-all bg-gray-800 text-yellow-400">
                {label}
              </label>
              <input
                className="h-16 w-full rounded-md font-semibold text-xl border-2 border-gray-700 bg-gray-700 text-white text-center focus:border-yellow-500 focus:outline-none transition-all"
                type={type}
                name={name}
                value={user[name]}
                onChange={e => setUser(p => ({ ...p, [name]: e.target.value }))}
                required
                placeholder={placeholder}
                autoComplete="off"
              />

            </div>
          ))}
          <button type="submit" disabled={disabled} className={`bg-yellow-500 border-none px-8 py-4 rounded-md ${disabled ? "opacity-50 cursor-not-allowed" : ""} text-xl font-semibold text-gray-900 cursor-pointer hover:bg-yellow-600`}>
            Login
          </button>
          <p className="text-center text-gray-400">Don’t Have An Account?</p>
          <Link href="/register" className="text-yellow-400 text-center hover:underline">Open Account</Link>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;