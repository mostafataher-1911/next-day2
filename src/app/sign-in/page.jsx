'use client';
import axios from "axios";
import Link from "next/link";

export default function Signin() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("/API/auth/sign-in", { email, password });
      e.target.reset();
      localStorage.setItem("token", res.data.token);
      console.log(res.data);
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-cyan-400">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1 text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <p className="text-sm text-center text-gray-400">
            Don’t have an account?{" "}
            <Link href="/" className="text-cyan-400 hover:underline font-semibold">
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 text-white"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
