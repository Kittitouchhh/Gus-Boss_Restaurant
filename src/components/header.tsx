import React from "react"
import Button from "./button"
import usersData from "../data/login.json";
import UserDropdown from "./UserDropdown";




const Header: React.FC = () => {
    const [openMenu, setOpenMenu] = React.useState(false);
    

    const currentUsername = localStorage.getItem("currentUser");
    
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    
    const currentUser = users.find(
    (u: any) => u.id?.toString() === currentUsername
);


   
    const displayName = currentUser?.showname || "Unknown";
    const displayImage = currentUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";

    const role = currentUser?.role || "client";


    return(
        <nav className="w-full h-[110px] top-0 bg-[#3D342F] border-b-2 border-b-[#EEDBC4] flex flex-row fixed p-[5px] gap-[10px] items-center z-50"  >
            <img src="/logo/logo.png" alt="" className="lg:w-[180px] xl:w-[290px] md:w-[130px] xl:h-[50px] w-[140px] self-center xl:left-[40px] md:left-[20px] left-[10px] relative"/>
            <div className=" hidden md:flex flex-row justify-center relative lg:gap-[40px] gap-[10px] md:left-[35px] lg:left-[60px] xl:left-[90px] 2xl:left-[390px] left-[5px]   ">
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
                        <Button height="m" width="m" color="orange" stringColor="white" stringSize="m" linkdata={"/admin"}>Admin</Button>
                    </>
                )}
            </div>

            <div className=" self-center relative flex flex-col h-[100%] 2xl:w-[300px] w-[120px] md:w-[210px] overflow-hidden justify-center md:ml-auto md:mr-[20px] lg:mr-[30px] left-[10px]">
                <div className="rounded-2xl transition-all duration-300 ease-out hover:p-[5px] hover:bg-yellow-500 hover:-translate-y-1 hover:shadow-[0_8px_25px_rgba(231,198,153,0.3)]">
                    <UserDropdown name={displayName} image={displayImage} />
                </div>
            </div>
                   
            <button onClick={() => setOpenMenu(!openMenu)}
                className="cursor-pointer hover:scale-130 text-white text-[25px] md:hidden ml-auto mr-[15px]">☰</button>
            {openMenu && (
                <div className="justify-center absolute top-[110px] left-0 w-full bg-[#3D342F] flex  p-5 gap-4  md:hidden">
                    <Button height="m" width="mg" color="white" stringColor="brown" stringSize="m" linkdata="/">HOME</Button>
                    <Button height="m" width="mg" color="white" stringColor="brown" stringSize="m" linkdata="/process">PROCESS</Button>
                    <Button height="m" width="mg" color="white" stringColor="brown" stringSize="m" linkdata="/postit">POST IT!</Button>
                    <Button height="m" width="mg" color="white" stringColor="brown" stringSize="m" linkdata="/constact">CONTACT</Button>

                    {role === "admin" && (
                        <Button height="m" width="mg" color="orange" stringColor="white" stringSize="m" linkdata="/admin">ADMIN</Button>
                    )}
                </div>
            )}

        </nav >


    )
}

export default Header