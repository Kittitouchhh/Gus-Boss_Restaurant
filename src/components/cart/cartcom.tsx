import React from 'react'
import Button from '../button'
interface CartProps{
    imgUrl : string,
    title : string
}

const Cartcom:React.FC<CartProps> = ({imgUrl , title}) =>{
    return(
        <div className='w-[95%] lg:h-[250px] md:h-[180px]  h-auto bg-[#201c19] md:rounded-3xl rounded-xl grid md:grid-cols-3  grid-cols-1   border-amber-100 border-2 justify-center'>
            <div className='w-full h-full flex flex-row md:p-[10px] p-[10px] lg:gap-[30px] md:gap-[15px] gap-[20px]'>
                <img src="/maindishes/burger.jpg" alt=""  className='2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%] w-[35%] h-[90%] object-cover rounded-xl self-center'/>
                <div className='flex flex-col'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>MENU NAME</p>
                    <p className='2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'>{title}</p>
                </div >
            </div>

            <div className='w-full h-full md:p-[10px] p-[10px] flex flex-row  lg:gap-[20px] md:gap-[10px] gap-[10px]'>
                <div className='2xl:w-[60%] xl:w-[50%] h-full flex flex-col gap-[10px]'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>DETAILS</p>
                     <div className='flex flex-row md:gap-[10px] gap-[5px] flex-wrap '>
                        <Button height="m" width="l" color="white" stringColor="brown" stringSize="s" >SAUCE: CHEESE</Button>
                        <Button height="m" width="l" color="white" stringColor="brown" stringSize="s" >Papaya Style: Pounded</Button>
                        <Button height="m" width="l" color="white" stringColor="brown" stringSize="s" >Bread Type": White</Button>
                    </div>
                </div>

                <div className='2xl:w-[40%] xl:w-[50%] h-full flex flex-col lg:gap-[20px] md:gap-[10px] gap-[10px]'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>DESCRIPTION</p>
                    <Button height="l" width="l" color="brown" stringColor="white" stringSize="l" >EDIT DETIAL</Button>
                </div>
                
            </div>

            <div className='flex flex-row '>
                <div className='w-[50%] h-[30%] bg-[#EEDBC4] rounded-full items-center'>

                </div>
            </div>

        </div>
    )
}

export default Cartcom