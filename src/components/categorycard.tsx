import React from 'react'

interface CategoryCardProps {
    image : string,
    name : string
}

const CategoryCard:React.FC<CategoryCardProps> = ({image,name}) => {
    return(
        <div className='2xl:w-[190px] 2xl:h-[265px] xl:w-[160px] xl:h-[220px] lg:w-[130px] lg:h-[170px] md:w-[110px] md:h-[150px]  w-[55px] h-[70px] flex flex-col justify-center items-center top-[110px] bg-[#EEDBC4] md:m-[20px] m-[5px] md:p-[5px] p-[3px] md:rounded-xl rounded-md lg:border-8 md:border-4 border-2 border-[#8B7569] shadow-lg shadow-black/90'>
            <img src={image} className='2xl:w-[140px] 2xl:h-[140px] xl:w-[110px] xl:h-[110px] lg:w-[90px] lg:h-[90px] md:w-[70px] md:h-[70px] w-[px] h-[35px] md:mt-[15px] mt-[5px] self-center'></img>
            <p className='2xl:text-[26px] xl:text-[23px] lg:text-[18px] md:text-[16px] text-[7px] font-bold mt-auto text-[#3D342F]'>{name}</p>
        </div>
    )
}

export default CategoryCard