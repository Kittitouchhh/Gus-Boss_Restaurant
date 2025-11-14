import React from 'react'
import { useNavigate } from 'react-router-dom'


interface datauser{
    name: string,
    image? :string

}

const User: React.FC<datauser> = ({name,image}) => {
    const navigate = useNavigate();

    const handleCrownClick = () => {
        navigate("/memberpage")
    }

    return (
        <div className="w-20  lg:flex lg:w-full lg:h-20 lg:p-3 lg:gap-3 lg:px-3 ">
            <img className="mt-2 cursor-pointer hover:scale-120 hover:m-3 
            ml-6 w-[35px] h-[35px] rounded-full self-center xl:w-[45px] xl:h-[45px] "
            onClick={handleCrownClick}
            src="/public/member/crownlogo.png" alt="membership" />

            <img src={image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'} alt="" 
            className='m-auto w-[50px] h-[50px] rounded-full xl:w-[70px] xl:h-[70px] '/>
            <p className='text-center xl:flex xl:items-center text-white text-[18px] mb-2 xl:text-[25px]'>{name} </p>
        </div>
    )
}
export default User