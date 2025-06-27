'use client';
import axios from "axios";
import Link from "next/link";

export default function Home() {


  const handleSubmit=async(e)=>{
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get('name');

    console.log("Email:", email, "Password:", password, "Name:", name);

    try {
        if(e.target[0].value === "" || e.target[1].value === ""|| e.target[2].value === ""){
            alert("Please fill all fields");
            return;
        }
        const res = await axios.post("/API/auth/sign-up", {
            email: email,
            password: password,
            name:name
        })
        e.target.reset();
        console.log(res.data)
    } catch (error) {
        console.error("Error during sign-up:", error);
    }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Your name"
              name="name"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="you@example.com"
              name="email"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="••••••••"
              name="password"
            />
          </div>
          <p className=" mb-5">
            You have an account?
            <Link href={"/sign-in"}>
              <span className="text-teal-700 font-bold"> Sign in</span>
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
