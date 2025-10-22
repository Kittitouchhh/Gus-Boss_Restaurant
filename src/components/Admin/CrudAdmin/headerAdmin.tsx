import { useLocation } from "react-router-dom"
import React from "react"
import Button from "../../button"
import usersData from "../../../data/login.json"
import UserDropdown from "../../UserDropdown"


const HeaderAdmin: React.FC = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    // ✅ อ่านชื่อ user ที่ login อยู่จาก data/login.json
    const currentUsername = localStorage.getItem("username");
    const currentUser = usersData.find(
        (u) => u.username.toLowerCase() === currentUsername?.toLowerCase());

    const displayName = currentUser?.username || "Unknown";
    const displayImage =
        currentUser?.image ||
        "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";

    return (
        <nav className="flex justify-between sticky top-0 z-50 w-100% h-[110px] bg-[#3D342F] border-b-2 border-b-[#EEDBC4] flex flex-row  p-[5px] gap-[10px] items-center"  >
            <img src="/public/logo/logo.png" alt="" className="lg:w-[180px] xl:w-[290px] md:w-[130px] xl:h-[50px] w-[140px] self-center xl:left-[40px] md:left-[20px] left-[10px] relative" />

            <div className="hidden md:flex flex-row justify-center  relative lg:gap-[40px] gap-[10px] md:left-[35px] lg:left-[60px] xl:left-[90px] 2xl:left-[230px] left-[5px]">
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={isAdmin ? "/admin/home" : "/"}>HOME</Button>  {/*ถ้าตอนนี้ URL เริ่มด้วย /admin → ให้ปุ่ม HOME ลิงก์ไป /admin/home */}
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={isAdmin ? "/admin/process" : "/process"}>PROCESS</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={isAdmin ? "/admin/postit" : "/post-it"}>POST IT!</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={isAdmin ? "/admin/contact" : "/contact"}>CONSTACT</Button>
                <Button height="m" width="m" color="orange" stringColor="white" stringSize="m" linkdata={isAdmin ? "/admin" : "/admin"}>Admin</Button>
            </div>

            <div className="self-center relative flex flex-col h-[60px] w-[180px] md:w-[280px] overflow-hidden justify-center md:ml-auto md:mr-[20px] lg:mr-[30px] left-[10px]
            rounded-2xl transition-all duration-300 ease-out hover:bg-yellow-500
            hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(231,198,153,0.3)]">
                <UserDropdown name={displayName} image={displayImage} />
            </div>
            <button className='text-white relative mr-[20px] text-[25px]  md:hidden'>☰</button>
        </nav>
    )
}

export default HeaderAdmin