import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // ใช้ icon Google
import { useNavigate } from "react-router-dom";
import logo from "/logo/logo.png";
import userData from "../data/login.json";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ฟังก์ชันเมื่อกด login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    //  โหลด user จาก localStorage (user ที่สมัครผ่าน signup)
    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ รวม users จาก login.json + localStorage
    const allUsers = [...userData, ...localUsers];

    // ✅ ตรวจสอบ username/password
    const foundUser = allUsers.find(
      (u: any) => u.username === username && u.password === password
    );
    
    if (foundUser) {
      // ✅ บันทึก session
      localStorage.setItem("authToken", "true");
      localStorage.setItem("userRole", foundUser.role || "client");
      localStorage.setItem("username", foundUser.username);
      localStorage.setItem("showname", foundUser.showname || foundUser.username);
      localStorage.setItem("image", foundUser.image || "");

      if (foundUser.role === "admin") {
        navigate("/admin")
      } else {
        navigate("/");
      }
    }else {
      //ถ้า ชื่อ รหัส ไม่ตรง
      setError("💻 Username or password mismatch!");
    }
  }
  return (
    <div className="relative flex h-screen justify-center items-center overflow-hidden">
      {/* BG*/}
      <img
        src="/banner/login1.png"
        alt="background"
        className="absolute inset-0 w-1/2 h-full object-cover brightness-75 blur-[2px]"
      />

      {/* BG */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* กล่องหลัก (login box) */}
      <div className="relative z-10 flex w-[1000px] h-[600px]  rounded-2xl overflow-hidden shadow-2xl">
        {/* ซ้าย: รูป */}
        <div className="relative w-1/2 h-full bg-[#3D342F] rounded-2xl">
          <img
            src="/banner/login1.png"
            alt="coffee shop"
            className="w-full h-full object-cover brightness-90"
          />
        </div>

        {/* ขวา: ฟอร์ม login */}
        <div className="rounded-2xl mx-2 w-1/2 bg-white flex flex-col items-center p-4">
          <img src={logo} alt="logo" className="w-[200px] my-4" />
          <h2 className="text-[#3D342F] font-bold text-[30px] mb-5 tracking-wide">
            USER LOGIN
          </h2>
          <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="w-[95%] mb-8 p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-bold placeholder:text-[#3D342F]/80 focus:outline-white"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-bold placeholder:text-[#3D342F]/80 focus:outline-white"
          />
          {error && (
              <p className="text-red-500 font-semibold mt-2">{error}</p>
            )}

          <div className="flex w-[100%] mt-3 justify-between">
            <p className="ml-8 text-[#3D342F] text-sm mt-1">
              Don't have an account?{" "}
              <Link 
                to = "/signuppage"
                className="text-black underline hover:text-[#FFA537] duration-200"
              >
                Click Here
              </Link>
            </p>
            <button className="cursor-pointer w-[30%] bg-[#3D342F] text-[#E7C699] font-semibold text-[15px] py-2 rounded-full mt-1 hover:bg-[#2C2926] duration-300">
              LOGIN
            </button>
          </div>
        </form>

          <button className="flex items-center justify-center gap-2 border border-[#3D342F] rounded-full px-6 py-2 mt-5 hover:bg-[#3D342F] hover:text-white duration-300">
            <FcGoogle size={20} />
            <span className="font-semibold">Google</span>
          </button>
        </div>
      </div>
    </div>
  );

}
