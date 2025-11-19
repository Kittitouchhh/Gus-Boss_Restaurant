
import React from 'react'

interface ParagraphsMenuProps{
    nameMenu : string ,
    image : string
    description : string
}

const ParagraphMenu:React.FC <ParagraphsMenuProps> = ({nameMenu,image,description}) => {
    return(
        <div className='flex flex-row 2xl:h-[450px] xl:h-[300px] lg:h-[250px] md:h-[200px] h-[150px] w-full bg-[#28221F] shadow-lg shadow-black/90'>
            <img src={image}  alt="" className='h-full w-[50%] object-cover flex-shrink-0 ' />
            <div className='flex flex-col xl:p-[40px] lg:p-[20px] md:p-[15px] p-[10px] justify-center'>
                <p className='2xl:text-[60px] xl:text-[45px] lg:text-[35px] md:text-[25px] text-[16px] font-bold'>{nameMenu}</p>
                <p className='2xl:text-[30px] xl:text-[20px] lg:text-[16px] md:text-[13px] text-[8px] font-stretch-125% leading-4 md:leading-loose'>{description}</p>
            </div>
        </div>

    )

}

export default ParagraphMenu