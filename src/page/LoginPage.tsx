import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import logo from "/logo/logo.png";
import userData from "../data/login.json";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const normalizeMembership = (membership: any) => {
    return {
      isMember: membership?.isMember ?? false,
      points: membership?.points ?? 0,
      activatedAt: membership?.activatedAt ?? null,
    };
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");
    
    const allUsers = [...userData, ...localUsers];

    const foundUser = allUsers.find(
      (u: any) => u.username === username && u.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", foundUser.id.toString());
      localStorage.setItem("authToken", "true");

      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");

      const exists = savedUsers.some((u: any) => u.username === foundUser.username);
      if (!exists) {
        savedUsers.push({
          id: foundUser.id,
          username: foundUser.username,
          password: foundUser.password,
          role: foundUser.role || "client",
          showname: foundUser.showname || foundUser.username,
          image: foundUser.image || "",
          membership: normalizeMembership(foundUser.membership),
        });

        localStorage.setItem("users", JSON.stringify(savedUsers));
      }
      navigate("/");
    } else {
      setError(" Username or password mismatch!");
    }
  };

  return (
    <div className="relative flex h-screen justify-center items-center overflow-hidden">
      <img
        src="/banner/horse.jpg"
        alt="background"
        className="absolute inset-0 w-1/2 h-full object-cover brightness-75 blur-[2px]"
      />
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative z-10 flex flex-col md:flex-row w-[90%] md:w-[1000px] h-auto md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">

        <div className="hidden md:block rounded-2xl mx-2 w-full md:w-1/2 h-[250px] md:h-full bg-[#3D342F]">
          <img
            src="/banner/horse.jpg"
            alt="coffee shop"
            className="w-full h-full object-cover brightness-90"
          />
        </div>

        <div className="rounded-2xl md:w-1/2 bg-white flex flex-col items-center justify-center p-6 md:p-8">
          <img src={logo} alt="logo" className="w-[200px] my-4" />
          <h2 className="text-[#3D342F] font-bold text-[28px] md:text-[30px] mb-5 tracking-wide">
            USER LOGIN
          </h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col items-center gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-[90%] md:w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-semibold placeholder:text-[#3D342F]/80 focus:outline-white"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[90%] md:w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-semibold placeholder:text-[#3D342F]/80 focus:outline-white"
              required
            />

            {error && (
              <p className="text-red-600 text-sm mt-[-5px]">{error}</p>
            )}

            <button
              type="submit"
              className="cursor-pointer w-[50%] bg-[#3D342F] text-[#E7C699] font-semibold text-[16px] py-2 rounded-full mt-2 hover:bg-[#2C2926] duration-300"
            >
              LOGIN
            </button>

            <p className="text-[#3D342F] text-m mt-3">
              Don't have an account?{" "}
              <Link
                to="/signuppage"
                className="text-black underline hover:text-[#FFA537] duration-200"
              >
                Click Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}