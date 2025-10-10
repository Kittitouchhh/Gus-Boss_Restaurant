import React from 'react'
import Button from './button'

interface datacard {
    name:string ,
    image : string,
    option : string[]
    price : string
}

const CardMenu: React.FC<datacard> = ({name,image,option,price}) => {
    return(
        <div className='max-w-[231px] max-h-[278px] bg-[#EEDBC4] flex flex-col justify-start '>
            <img src={image} alt="" className='max-w-[202] max-h-[145px]'/>
            <h4 className='text-[#3D342F]'>{name}</h4>
            {option.map((data) => {
                return(
                    <Button height='s' width='s' color='brown' stringColor='white' stringSize='s'  >{data}</Button>
                )      
            })}
            <p className='self-end'>{price}</p>
        </div>
    )
}

export default CardMenu