import React from "react";
import Button from "./button"
import usersData from "../data/login.json";
import UserDropdown from "./UserDropdown";


const Header: React.FC = () => {

    const currentUsername = localStorage.getItem("username");

    const localUsers = JSON.parse(localStorage.getItem("users") || "[]");

    const allUsers = [...usersData, ...localUsers];

    const currentUser = allUsers.find(
        (u) => u.username.toLowerCase() === currentUsername?.toLowerCase()
    );

    const displayName = currentUser?.showname || "Unknown";
    const displayImage = currentUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";

    const role = currentUser?.role || "client";

    return (
        <nav className="relative w-full h-[110px] bg-[#3D342F] flex items-center justify-between px-4 md:px-8 fixed top-0 z-50 border-b-2 border-[#EEDBC4]">
            <div className="">
                <img
                    src="/public/logo/logo.png"
                    alt="logo"
                    className="w-[140px] left-0 md:w-[180px] xl:w-[220px] "
                />
            </div>
            <div className=" hidden lg:flex flex-row gap-[40px]  md:gap-[20px]   ">
                {role === "client" && (
                    <>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="/">HOME</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="process">PROCESS</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="postit">POST IT!</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="constact">CONSTACT</Button>
                    </>
                )}
                {role === "admin" && (
                    <>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={"/"}>HOME</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={"/process"}>PROCESS</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={"/postit"}>POST IT!</Button>
                        <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata={"/constact"}>CONTACT</Button>
                        <Button height="m" width="m" color="orange" stringColor="white" stringSize="m" linkdata={"/admin"}>Admin</Button>
                    </>
                )}
            </div>

            <div className="flex items-center">
                <div className="mr-20 md:mr-40 rounded-2xl transition-all duration-300 ease-out hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(231,198,153,0.3)]">
                    <UserDropdown name={displayName} image={displayImage} />
                </div>
                
            </div>
            <button className="text-white text-[25px] lg:hidden">☰</button>
        </nav >


    )
}

export default Header