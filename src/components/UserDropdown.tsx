import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import User from "./user";

interface DropdownUserProps {
  name: string;
  image: string;
}

const UserDropdown: React.FC<DropdownUserProps> = ({ name, image }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });
  const buttonRef = useRef<HTMLDivElement>(null); 
  const menuRef = useRef<HTMLDivElement>(null);  
  const navigate = useNavigate();
  const location = useLocation()

  // ✅ ปิด dropdown ถ้าคลิกนอกทั้งปุ่มและเมนู
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

  // ✅ Logout (ลบเฉพาะ auth)
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  };

  // ✅ คำนวณตำแหน่ง dropdown ให้ตรงใต้ปุ่ม User
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

  // ✅ ฟังก์ชันตรวจเส้นทางแล้วนำทางให้ถูก
  const handleSettings = () => {
    setIsOpen(false);

    // ✅ ถ้าขณะนี้อยู่ใน path ที่ขึ้นต้นด้วย /admin → ไป /admin/profile
    if (location.pathname.startsWith("/admin")) {
      navigate("/admin/profile");
    } else {
      navigate("/profile");
    }
  };

  // ✅ dropdown ที่จะ render ด้วย Portal (ลอยนอก header จริง)
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
        className="block w-full text-left px-4 py-2 hover:bg-[#E7C699]/40 text-[#3D342F] font-medium"
      >
        ⚙️ Settings
      </button>
      <button
        onClick={() => {
          setIsOpen(false);
          handleLogout();
        }}
        className="block w-full text-left px-4 py-2 hover:bg-[#E7C699]/40 text-[#3D342F] font-medium"
      >
        🚪 Logout
      </button>
    </div>
  );

  return (
    <>
      {/* ✅ ปุ่ม User */}
      <div
        ref={buttonRef}
        className="relative cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <User name={name} image={image} />
      </div>

      {/* ✅ render dropdown ด้วย Portal (ลอยข้างนอก root) */}
      {isOpen &&
        ReactDOM.createPortal(
          dropdownMenu,
          document.getElementById("root") as HTMLElement
        )}
    </>
  );
};

export default UserDropdown;
