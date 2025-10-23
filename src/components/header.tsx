import React from "react";
import Button from "./button"
import usersData from "../data/login.json";
import UserDropdown from "./UserDropdown";


const Header: React.FC = () => {
    // ✅ อ่านชื่อ user ปัจจุบันจาก localStorage
    const currentUsername = localStorage.getItem("username");

    // ✅ ดึง user ที่สมัครไว้ใน localStorage (signup)
    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

    // ✅ รวม users จาก login.json + localStorage
    const allUsers = [...usersData, ...localUsers];

    // ✅ หา user ที่ login อยู่ใน login.json
    const currentUser = allUsers.find(
        (u) => u.username.toLowerCase() === currentUsername?.toLowerCase()
    );

    // ✅ ตั้งค่าชื่อและรูป (ถ้าไม่เจอ → ใช้ Unknown + default image)
    const displayName = currentUser?.showname || "Unknown";
    const displayImage =
        currentUser?.image ||
        "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";

    return (
        <nav className="flex justify-between w-full h-[110px] top-0 bg-[#3D342F] border-b-2 border-b-[#EEDBC4] fixed p-[5px] gap-[10px] items-center z-50"  >
            <img src="/public/logo/logo.png" alt="" className="lg:w-[180px] xl:w-[290px] md:w-[130px] xl:h-[50px] w-[140px] self-center xl:left-[40px] md:left-[20px] left-[10px] relative" />

            <div className="hidden md:flex flex-row justify-center relative lg:gap-[40px] gap-[10px] md:left-[35px] lg:left-[60px] xl:left-[90px] 2xl:left-[390px] left-[5px]">
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="/">HOME</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="process">PROCESS</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="postit">POST IT!</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="constact">CONSTACT</Button>
            </div>

            <div className="self-center relative flex flex-col h-[60px] w-[180px] md:w-[280px] overflow-hidden justify-center md:ml-auto md:mr-[20px] lg:mr-[30px] left-[10px]
            rounded-2xl transition-all duration-300 ease-out hover:bg-yellow-500
            hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(231,198,153,0.3)]
            ">
                <UserDropdown  name={displayName} image={displayImage} />
            </div>

            <button className='text-white ml-auto relative mr-[20px] text-[25px] md:hidden'>☰</button>
        </nav >

    )
}

export default Header