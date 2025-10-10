import React from 'react'
interface datauser{
    name: string,
    image? :string

}



const User: React.FC<datauser> = ({name,image}) => {
    return (
        <div className="flex flex-row lg:gap[16px] xl:gap-[25px] md:gap-[10px] gap-[8px] mr-0 md:justify-end justify-center">
            <img src="/public/member/crownlogo.png" alt="" className="lg:max-w-[50px] md:w-[30px] w-[26px] rounded-full self-center md:inline-block hidden"/>
            <img src={image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'} alt="" className='lg:w-[50px] md:w-[30px] w-[26px] rounded-full self-center'/>
            <p className='self-center text-white lg:text-[18px] md:text-[14px]'>{name} </p>
        </div>
    )
}
export default User