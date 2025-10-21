import React from "react";
import { FcGoogle } from "react-icons/fc"; // ใช้ icon Google
import logo from "/logo/logo.png"; // โลโก้ร้าน (อยู่ใน public/logo)

export default function LoginPage() {
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

        <input
          type="text"
          placeholder="username"
          className="w-[95%] mb-8 p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-bold placeholder:text-[#3D342F]/80 focus:outline-white"
        />
        <input
          type="password"
          placeholder="password"
          className="w-[95%] p-2 rounded-full bg-[#E7C699] text-[#3D342F] font-bold placeholder:text-[#3D342F]/80 focus:outline-white"
        />

        <div className="flex w-[100%] mt-3 justify-between">
          <p className="ml-8 text-[#3D342F] text-sm mt-1">
            Don't have an account?{" "}
            <a
              href="#"
              className="text-black underline hover:text-[#FFA537] duration-200"
            >
              Click Here
            </a>
          </p>
          <button className="w-[30%] bg-[#3D342F] text-[#E7C699] font-semibold text-[15px] py-2 rounded-full mt-1 hover:bg-[#2C2926] duration-300">
            LOGIN
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 border border-[#3D342F] rounded-full px-6 py-2 mt-5 hover:bg-[#3D342F] hover:text-white duration-300">
          <FcGoogle size={20} />
          <span className="font-semibold">Google</span>
        </button>
      </div>
    </div>
  </div>
);

}
