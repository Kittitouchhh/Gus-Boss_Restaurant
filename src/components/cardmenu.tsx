import React from 'react'
import Button from './button'
import {Link} from 'react-router-dom'

interface datacard {
    name:string ,
    image : string,
    option : string[]
    price : string
    like : string
    datajson : string
}

const CardMenu: React.FC<datacard> = ({name,image,option,price,like,datajson}) => {
    return(
        <Link to={`MenuDetaile/${name}/${datajson}`}>     
            <div className='xl:w-[231px] xl:h-[290px] md:w-[180px] md:h-[230px] w-[100px] h-[130px]  bg-[url("/component-pic/card-bg.png")] bg-cover bg-center flex flex-col md:p-[10px] p-[4px] rounded-md md:rounded-xl md:gap-[5px] justify-start border-2 md:border-6 border-[#66574E] shadow-lg shadow-black/90 transform transition-transform duration-600 ease-in-out
            hover:scale-105'>
                <img src={image} alt="" className='xl:w-[220px] xl:h-[145px] lg:w-[220px] lg:h-[100px] md:w-[150px] md:h-[90px] w-[120px] h-[60px]  self-center rounded-sm md:rounded-xl object-cover overflow-hidden '/>
                <p className='text-[#3D342F] font-bold xl:text-[16px] lg:text-[12px] md:text-[14px] text-[7px]'>{name}</p>
                <div className='flex flex-row md:gap-[5px] gap-[2px] flex-wrap'>
                    {option.map((data) => {
                    return(
                        <Button height='s' width='s' color='brown' stringColor='white' stringSize='s'  >{data}</Button>
                    )      
                    })}
                </div>
                    
                <div className='items-center justify-center relative mt-auto flex flex-row md:gap-[5px] gap-[2px]'>
                    <img src='logo/heart.png' alt='' className="xl:w-[20px] xl:h-auto md:w-[16px] w-[10px] "/>
                    <p className=' font-extrabold text-[#e64d26] xl:text-[18px] md:text-[14px] text-[8px]'>{like}</p>
                    <p className=' font-extrabold ml-auto text-[#675D56] xl:text-[20px] md:text-[14px] text-[10px]'>{price}</p>
                </div>

            </div>
        </Link>
    )
}

export default CardMenu