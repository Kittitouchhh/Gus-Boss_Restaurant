import User from "./user"
import React from "react"
import Button from "./button"



const Header: React.FC = () =>{
    return(
        <nav className="w-full h-[110px] bg-[#3D342F] border-b-2 border-b-[#EEDBC4] flex flex-row  p-[5px] gap-[10px] "  >
            <img src="/public/logo/logo.png" alt="" className="w-[290px] h-[50px]  self-center left-[40px] relative"/>

            <div className="flex flex-row w-[700px] h-[113px] justify-center relative top-[20px] gap-[40px] ml-[250px]">
                <Button height="m" width="m" color="white">HOME</Button>
                <Button height="m" width="m" color="white">PROCESS</Button>
                <Button height="m" width="m" color="white">POST IT!</Button>
                <Button height="m" width="m" color="white">CONSTACT</Button>
            </div>

            <div className="self-center ml-auto relative flex flex-col w-[350px] h-[77px] overflow-hidden justify-center">
                <User name="YANAMINDEV" image='https://cdn-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/1900x1900-000000-81-0-0.jpg' ></User>
                {/* <div className="w-[240px] h-[50px] bg-[#2e2621] self-end top-[28px] relative border-b-2 border-l-2 border-[#EEDBC4] ml-auto flex justify-center ">
                    <p className="text-white self-center text-[18px] font-sans">LOG OUT</p>
                </div> */}
            </div>
            


        </nav>
    )
}

export default Header