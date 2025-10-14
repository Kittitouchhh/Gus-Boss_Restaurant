import User from "../user"
import React from "react"
import Button from "../button"



const Header: React.FC = () =>{
    return(
        <nav className="sticky top-0 z-50 w-100% h-[110px] bg-[#3D342F] border-b-2 border-b-[#EEDBC4] flex flex-row  p-[5px] gap-[10px] items-center"  >
            <img src="/public/logo/logo.png" alt="" className="lg:w-[180px] xl:w-[290px] md:w-[130px] xl:h-[50px] w-[140px] self-center xl:left-[40px] md:left-[20px] left-[10px] relative"/>

            <div className="hidden md:flex flex-row justify-center relative lg:gap-[40px] gap-[10px] md:left-[35px] lg:left-[60px] xl:left-[90px] 2xl:left-[230px] left-[5px]">
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m">HOME</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m">PROCESS</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m">POST IT!</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m">CONSTACT</Button>
                <Button height="m" width="m" color="orange" stringColor="white" stringSize="m">Admin</Button>
            </div>
            
            <div className="self-center relative flex flex-col w-[180px] md:w-[280px] overflow-hidden justify-center md:ml-auto md:mr-[10px] lg:mr-[30px] left-[10px]">
                <User name="KITTITOUCHHH" image='/user/Gus.jpg' ></User>
            </div>
            <button className='text-white ml-auto relative mr-[20px] text-[25px] md:hidden'>☰</button>
        </nav>
    )
}

export default Header