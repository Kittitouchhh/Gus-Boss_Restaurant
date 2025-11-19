import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import User from "./user";

interface DropdownUserProps {
  name: string;
  image: string;
}

const UserDropdown: React.FC<DropdownUserProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  
  const buttonRef = useRef<HTMLDivElement>(null);  // ใช้ useRef เพื่ออ้างอิงตำแหน่ง element
  const menuRef = useRef<HTMLDivElement>(null);  
  
  const navigate = useNavigate();
  


  // ตคลิกนอก dropdown - เพื่อปิดอัตโนมัติ
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !buttonRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // logout ลบข้อมูลใน local กลับไป login
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cart");
    navigate("/login", { replace: true });
  };

  // คำนวณตำแหน่ง dropdown ให้ตรงกับตำแหน่งปุ่มที่คลิก
  useEffect(() => {
    if (buttonRef.current && isOpen) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8, // 8px เว้นระยะจากปุ่ม
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // ไปหน้า Settings
  const handleSettings = () => {
    setIsOpen(false);
    navigate("/profile");
  };

  
  const dropdownMenu = (
    <div
      ref={menuRef}
      className="absolute w-[180px] bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[9999] transition-all duration-200 ease-out"
      style={{
        position: "absolute",
        top: position.top,
        left: position.left,
      }}
    >
      <button
        onClick={handleSettings}
        className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-[#E7C699]/40 text-[#3D342F] font-medium"
      >
        ⚙️ Settings
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
          handleLogout();
        }}
        className="cursor-pointer block w-full text-left px-4 py-2 hover:bg-[#E7C699]/40 text-[#3D342F] font-medium"
      >
        🚪 Logout
      </button>
    </div>
  );

  return (
    <>
      <div
        ref={buttonRef}
        className="relative cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User />
      </div>

      {isOpen &&
        ReactDOM.createPortal(
          dropdownMenu,
          document.getElementById("root") as HTMLElement
        )}
    </>
  );
};

export default UserDropdown;
