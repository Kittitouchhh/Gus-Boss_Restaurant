import { div } from 'framer-motion/client'
import React from 'react'

interface TagmenuProps{
    title : string
    price: number
    percent?: number;
}

const TagPrice:React.FC<TagmenuProps> = ({title,price,percent}) => {
    return(
        <div className=' flex flex-col w-[80%] mx-auto gap-[10px]'>
            <div className='flex flex-row justify-between'>
                <p className="mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px]">{title}</p>
                <p className="mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px]">{price.toFixed(2)}
                    {percent !== undefined && (
                        <span className="ml-2 text-white text-sm md:text-md">
                            ({(percent * 100).toFixed(0)}%)
                        </span>
                    )}
                </p>
            </div>
            <hr className="w-full border-t-3 md:border-t-4 border-[#EEDBC4]"/>
        </div>
    )
}

export default TagPrice