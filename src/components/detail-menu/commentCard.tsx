import { div } from 'framer-motion/client'
import React from 'react'

interface CommentCardProps {
    userImage : string,
    username : string ,
    commentText: string ,
    like : boolean
}


const CommnetCard:React.FC<CommentCardProps> = ({userImage,username , commentText , like}) => {
    return(
        <div className='xl:w-[400px] 2xl:min-h-[180px] xl:min-h-[150px] lg:w-[300px] lg:min-h-[150px] md:w-[220px] md:min-h-[250px] w-[160px] min-h-[200px] bg-[#EEDBC4] 2xl:p-[15px] xl:p-[10px] lg:p-[10px] md:p-[10px] p-[10px] rounded-xl flex flex-col gap-[15px]'>
            
            <div className='flex flex-row items-center gap-[10px]'>
                <img src={userImage} alt=""  className="rounded-full 2xl:h-[50px] 2xl:w-[50px] xl:h-[45px] xl:w-[45px] lg:h-[40px] lg:w-[40px] md:h-[35px] md:w-[35px] w-[25px] h-[25px]"/>
                <p className='2xl:text-[20px] lg:text-[18px] md:text-[16px] text-[14px] text-[#3D342F] font-bold'>{username}</p>
            </div>

            <p className='2xl:text-[16px] xl:text-[14px] lg:text-[14px] text-[12px] text-[#3D342F] font-semibold'>{commentText}</p>

            <div className='flex flex-row items-center gap-[10px] mt-auto'>
                <img src={like? '/logo/heart.png' : '/logo/dislike.png'} alt="" className='2xl:h-[35px] 2xl:w-[35px] xl:h-[25px] xl:w-[25px] lg:h-[20px] lg:w-[20px] md:h-[20px] md:w-[20px] w-[15px] h-[15px]' />
                <p className='2xl:text-[16px] xl:text-[14px] lg:text-[14px] text-[12px] text-[#3D342F] font-semibold'>{like?  'Like' : 'Dislike'}</p>
            </div>
            
        </div>
    )
}

export default CommnetCard