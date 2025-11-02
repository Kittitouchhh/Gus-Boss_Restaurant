import ReactDOM from "react-dom";
import React, { useState } from "react";
import type { MenuItem } from "../../../page/pagesAdmin/DataMenu";
import CardEdit from "./CardEdit"

type EditMenuProps = {
  open: boolean;
  onClose: () => void;
  position: { x: number; y: number } | null;
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};



export default function EditMenu({ open, onClose, position, setMenus, menu }: EditMenuProps) {
  
  const [openEdit, setOpenEdit ] = useState<boolean>(false)

  const handleDelete = () => {
  const storedMenus = JSON.parse(localStorage.getItem("menus") || "[]");
  const updatedMenus = 
  storedMenus.filter((item: MenuItem) => item.id !== menu.id); //เอาเฉพาะ item ที่ ไม่ตรงกับ id ของ item ที่ลบ

  localStorage.setItem("menus", JSON.stringify(updatedMenus));
  setMenus(updatedMenus);  
  onClose(); 
};
  

  if (!open || !position) return null;

  return ReactDOM.createPortal(
    <div
      className=" z-49 absolute top-0 left-0 w-full h-full"
      onClick={onClose}
    >
      <div
        className="absolute bg-white border border-[#73594A] shadow-xl p-4 rounded-lg 
            w-[100px] h-[90px]"
        style={{
          top: position.y-15,
          left: position.x-50
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
        onClick={() => setOpenEdit(true)}
        className="
        duration-500 hover:scale-105
        opacity-90 mb-1 block text-blue-500 w-full text-left"
        >Edit
        </button>
        <CardEdit open={openEdit} onClose={() => setOpenEdit(false)}>
        </CardEdit>

        <button 
        onClick={handleDelete}
        className=" duration-500 hover:scale-105
        block text-red-500 w-full text-left ">Remove</button>

      </div>
    </div>,
    document.body
  );
}
