import React from 'react'
import {useNavigate,useLocation } from 'react-router-dom'


interface datauser{
    name: string,
    image? :string

}

const User: React.FC<datauser> = ({name,image}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin")

    const handleCrownClick = () => {
        navigate(isAdmin? "/admin/memberpage": "/memberpage")
    }

    return (
        <div className="ml-3 flex flex-wrap gap-2 mr-0 ">
            <img className=" cursor-pointer hover:scale-120 hover:m-3 
            ml-6 w-[35px] h-[35px] rounded-full self-center"
            onClick={handleCrownClick}
            src="/public/member/crownlogo.png" alt="membership" />

            <img src={image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'} alt="" className='w-[50px] h-[50px] rounded-full self-center'/>
            <p className='  self-center text-white text-[18px]'>{name} </p>
        </div>
    )
}
export default User