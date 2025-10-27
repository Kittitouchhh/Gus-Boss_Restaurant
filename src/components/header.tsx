import User from "./user"
import React from "react"
import Button from "./button"





const Header: React.FC = () =>{
    return(
        <nav className="w-full h-[110px] top-0 bg-[#3D342F] border-b-2 border-b-[#EEDBC4] flex flex-row fixed p-[5px] gap-[10px] items-center z-50"  >
            <img src="/logo/logo.png" alt="" className="lg:w-[180px] xl:w-[290px] md:w-[130px] xl:h-[50px] w-[140px] self-center xl:left-[40px] md:left-[20px] left-[10px] relative"/>

            <div className="hidden md:flex flex-row justify-center relative lg:gap-[40px] gap-[10px] md:left-[35px] lg:left-[60px] xl:left-[90px] 2xl:left-[390px] left-[5px]">
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="/">HOME</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="process">PROCESS</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="postit">POST IT!</Button>
                <Button height="m" width="m" color="white" stringColor="brown" stringSize="m" linkdata="constact">CONSTACT</Button>
            </div>
            
            <div className="self-center relative flex flex-col w-[180px] md:w-[280px] overflow-hidden justify-center md:ml-auto md:mr-[20px] lg:mr-[30px] left-[10px]">
                <User name="YANAMINDEV" image='https://cdn-images.dzcdn.net/images/artist/61bcbf8296b1669499064406c534d39d/1900x1900-000000-81-0-0.jpg' ></User>
            </div>
            <button className='text-white ml-auto relative mr-[20px] text-[25px] md:hidden'>☰</button>

            
        </nav>
    
    )
}

export default Header