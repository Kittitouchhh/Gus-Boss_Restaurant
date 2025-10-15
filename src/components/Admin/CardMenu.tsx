import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import MenuStatus from "./statusbutton";
import EditMenu from "./editMenu";
import type { MenuItem } from "../../pages/AdminHome";

type CardMenuProps = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

export default function CardMenu({ menu, setMenus }: CardMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: rect.right,
      y: rect.top + window.scrollY,
    });
  };

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    } else {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    }

    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);
  return (
    <div className="relative bg-[#F8F5F2] rounded-2xl shadow-lg border border-[#E6D4C3] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* รูป */}
      <div className="w-full h-40 overflow-hidden">
        <img
          src={menu.image || "/drink/default.png"}
          alt={menu.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* ข้อมูลเมนู */}
      <div className="p-4 flex flex-col items-center text-center">
        <div className="mb-2">
          <MenuStatus />
        </div>
        {/* ปุ่ม ... */}
        <button
          ref={buttonRef}
          className="z-48 absolute top-3 right-3 text-[#000000] hover:text-[#3D342F]"
          onClick={() => setOpen(!open)}
        >
          <EllipsisVertical />
        </button>
        <h3 className="text-[#3D342F] font-bold text-lg truncate">{menu.name}</h3>
        <p className="text-[#C28B53] font-semibold mt-1">${menu.price}</p>
      </div>
      {open && (
        <EditMenu
          menu={menu}
          setMenus={setMenus}
          onClose={() => setOpen(false)}
          open={open}             
          position={position}      
        />
      )}
    </div>

  );
}
