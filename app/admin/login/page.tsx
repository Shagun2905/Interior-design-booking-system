"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (
      username === "admin" &&
      password === "admin123"
    ) {
      localStorage.setItem("admin", "true");
      router.push("/admin");
    } else {
      alert("Invalid Credentials");
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100">

      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
      >

        <h1 className="text-3xl font-bold text-center mb-8">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded w-full mb-4"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded w-full mb-6"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button
          className="bg-black text-white w-full py-3 rounded-lg"
        >
          Login
        </button>

      </form>

    </main>
  );
}