import React from 'react'

interface data {
    
    height : 's' | 'm' | 'l',
    width : 's' | 'm' | 'l',
    color : 'brown' | 'white'
    stringColor : 'white' | 'brown',
    stringSize : 's' | 'm' | 'l',
    children: React.ReactNode;
}

const Button: React.FC<data> = ({height , width ,color,stringColor,stringSize,children}) =>{
    let color_Text : string ='';
    if(stringColor == 'white'){
        color_Text = 'text-white';
    }
    else{
        color_Text = 'text-[#3D342F]'
    }

    let text_size : string = '';
    if(stringSize == 's'){
        text_size = 'xl:text-[12px] lg:text-[10px] md:text-[8px] text-[6px]'
    }
    else if(stringSize == 'm'){
        text_size = 'lg:text-[16px] xl:text-[18px] md:text-[14px] text-[8px]'
    }
    else{
        text_size = 'text-[64px]'
    }

    let color_button : string ='';
    if (color == 'white'){
        color_button  = 'bg-[#EEDBC4]'
    }
    else if (color == 'brown'){
        color_button = 'bg-[#3D342F]'
    }
    else{
        color_button = 'bg-[#EEDBC4]'
    }


    let height_button : string = '';
    if (height == 's'){
        height_button = 'md:max-h-[36px] max-h-[20px]';
    }
    else if (height == 'm'){
        height_button = 'lg:h-[47px] md:h-[30px] h-[24px]';
    }
    else if (height == 'l'){
        height_button = 'max-h-[70px]';
    }
    else{
        height_button = 'max-h-[500px]'
    }



    let width_button : string = '';

    if (width == 's')
        {
            width_button = 'xl:max-w-[150px] xl:p-[6px] md:max-w-[100px] md:p-[4px] p-[3px]';
        }
    else if (width == 'm'){
        width_button = 'lg:w-[90px] xl:w-[120px] md:w-[90px] w-[60px]';

    }
    else if (width == 'l'){
        width_button = 'max-w-[300px]';
    }
    else{
        width_button = 'max-w-[500px]';
    }

    const combinedClassName: string = `${height_button} ${width_button} ${color_button} ${color_Text} ${text_size}`.replace(/\s+/g, ' ').trim();


    return(
        <button className={`${combinedClassName} rounded-full font-sans box-border`} >
            {children}
        </button>
    )
}

export default Button

