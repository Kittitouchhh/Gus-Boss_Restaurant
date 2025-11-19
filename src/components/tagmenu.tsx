import React from 'react'

interface TagmenuProps{
    title : string
}

const Tagmenu:React.FC<TagmenuProps> = ({title}) => {
    return(
        <div className='flex flex-row justify-center items-center gap-[10px] md:mt-[50px] md:mb-[50px] mt-[20px] mb-[20px]'>
            <hr className="flex border-t-3 md:border-t-6  2xl:w-[400px] xl:w-[300px] lg:w-[150px] md:w-[150px] w-[90px] border-[#EEDBC4]"/>
            <p className="mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px]">{title}</p>
            <hr className="flex border-t-3 md:border-t-6 2xl:w-[400px] xl:w-[300px] lg:w-[150px] md:w-[150px] w-[90px] border-[#EEDBC4]"/>
        </div>
    )
}

export default Tagmenu

