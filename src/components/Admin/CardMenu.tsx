import React from "react";
import { EllipsisVertical } from "lucide-react";
import MenuStatus from "./statusbutton";

export default function CardMenu() {
  return (
    <div className="relative bg-[#FFEED9] w-80 h-60 rounded-md shadow-md p-3 flex flex-col">
      {/* ปุ่ม ... มุมขวาบน */}
      <button className="absolute top-2 right-2 text-[#3D342F] hover:text-[#6B5346]">
        <EllipsisVertical />
      </button>

      {/* แถบชื่อและราคา */}
      <div className="flex justify-between items-center mt-2">
        <div className="bg-[#3D342F] text-white font-bold text-lg px-3 py-1 rounded-r-md shadow-md">
          Black Tea
        </div>
        <div className="bg-[#3D342F] text-[#FFD900] font-semibold text-lg px-3 py-1 rounded-md shadow-md">
          $20
        </div>
      </div>

      {/* ส่วนรูปและปุ่มสถานะ */}
      <div className="flex items-center justify-between mt-5 px-3">
        <div className="w-[110px] h-[80px] border-2 border-[#3D342F] rounded-md overflow-hidden shadow">
          <img
            src="/drink/2.png"
            alt="Black Tea"
            className="object-cover w-full h-full"
          />
        </div>
        <MenuStatus />
      </div>
    </div>
  );
}
