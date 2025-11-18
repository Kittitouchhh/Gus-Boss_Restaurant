import React from 'react'
import Button from './button'

interface informationTagProps{
    style : string,
    image : string,
    textHeader:string,
    textinformation:string
}

const Information:React.FC<informationTagProps> = ({style,image,textHeader,textinformation}) => {
    
    
    if(style == '1'){
        return(
            <div className='overflow-hidden grid grid-cols-6 w-full h-[160px] md:h-[250px] lg:h-[300px] xl:h-[500px] 2xl:h-[650px] bg-[#B19A8D] shadow-lg shadow-black/90 border-4 border-[#66574E]'>
                <div className='col-span-4 h-full overflow-hidden'>
                    <img src={image} className='h-full w-full object-cover' alt="" />
                </div>
                <div className='md:justify-center flex flex-col p-[10px] md:p-[20px] lg:p-[15px] lg:pt-[5px] xl:p-[25px] 2xl:pt-[10px] 2xl:pr-[50px] 2xl:pl-[50px] overflow-auto col-span-2 gap-[4px] md:gap-[5px] lg:gap-[5px] xl:gap-[20px]'>
                    <p className='font-bold md:text-[20px] lg:text-[30px] xl:text-[50px] 2xl:text-[60px] text-[#3D342F]'>{textHeader}</p>
                    <p className=' font-bold text-[6px] md:text-[9px] lg:text-[12px] xl:text-[15px] text-justify 2xl:text-[24px] text-[#3D342F]'>{textinformation}</p>
                    <div className='self-center'>
                        <Button  height='l' width='l' color='brown' stringColor='white' stringSize='l' linkdata='contact'>LEARN MORE</Button>
                    </div>
                    
                </div>
                


            </div>
        )
    }
    else{
        return(
            <div className='overflow-hidden grid grid-cols-6 w-full h-[160px] md:h-[250px] lg:h-[300px] xl:h-[500px] 2xl:h-[650px] bg-[#B19A8D] shadow-lg shadow-black/90 border-4 border-[#66574E]'>
                <div className='md:justify-center flex flex-col p-[10px] md:p-[20px] lg:p-[15px] lg:pt-[5px] xl:p-[25px] 2xl:pt-[10px] 2xl:pr-[50px] 2xl:pl-[50px] overflow-auto col-span-2 gap-[4px] md:gap-[5px] lg:gap-[5px] xl:gap-[20px]'>
                    <p className='font-bold md:text-[20px] lg:text-[30px] xl:text-[50px] 2xl:text-[60px] text-[#3D342F]'>{textHeader}</p>
                    <p className=' font-bold text-[6px] md:text-[9px] lg:text-[12px] xl:text-[15px] text-justify 2xl:text-[24px] text-[#3D342F]'>{textinformation}</p>
                    <div className='self-center'>
                        <Button  height='l' width='l' color='brown' stringColor='white' stringSize='l' linkdata='constact'>LEARN MORE</Button>
                    </div>     
                </div>
                <div className='col-span-4 h-full overflow-hidden'>
                    <img src={image} className='h-full w-full object-cover' alt="" />
                </div>
                

            </div>
        )
    }
    
}

export default Information