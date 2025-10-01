import React from 'react'
interface datauser{
    name: string,
    image? :string

}



const User: React.FC<datauser> = ({name,image}) => {
    return (
        <div className="flex flex-row gap-[25px] mr-0">
            <img src="/public/member/crownlogo.png" alt="" className="w-[50px] h-[50px] rounded-full self-center"/>
            <img src={image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'} alt="" className='w-[50px] h-[50px] rounded-full self-center'/>
            <p className='self-center text-white text-[18px]'>{name} </p>
        </div>
    )
}
export default User