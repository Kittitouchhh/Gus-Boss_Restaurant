import React from 'react'

interface data {
    
    height : 's' | 'm' | 'l',
    width : 's' | 'm' | 'l',
    color : 'brown' | 'white' | 'orange'
    colortext : 'black' | 'white'
    strokeColor?: string
    children: React.ReactNode;
}

const Button: React.FC<data> = ({height , width , color, children, colortext, strokeColor}) =>{
    let color_button : string ='';
    if (color == 'white'){
        color_button  = 'bg-[#EEDBC4]'
    }
    else if (color == 'brown'){
        color_button = 'bg-[#3D342F]'
    }
    else if (color == 'orange'){
        color_button = 'bg-[#FFA537]'
    }
    else{
        color_button = 'bg-[#EEDBC4]'
    }


    let height_button : string = '';
    if (height == 's'){
        height_button = 'h-[30px]';
    }
    else if (height == 'm'){
        height_button = 'h-[53px]';
    }
    else if (height == 'l'){
        height_button = 'h-[70px]';
    }
    else{
        height_button = 'h-[500px]'
    }



    let width_button : string = '';

    if (width == 's')
        {
            width_button = 'w-[50px]';
        }
    else if (width == 'm'){
        width_button = 'w-[120px]';

    }
    else if (width == 'l'){
        width_button = 'w-[300px]';
    }
    else{
        width_button = 'w-[500px]';
    }

    
    let colortext_button : string = '';
    
        if (colortext == 'white')
            {
                colortext_button = 'text-white'
            }
        else if (colortext == 'black')
            {
                colortext_button = 'text-black'
            }



    const combinedClassName: string = `${height_button} ${width_button} ${color_button} ${colortext_button} `.replace(/\s+/g, ' ').trim();

    const style = strokeColor
    ? { WebkitTextStroke: `1px ${strokeColor}` }
    : undefined


    return(
        <button className={`${combinedClassName} rounded-full text-[px] font-sans `}
        style={style} >
            {children}
        </button>
    )
}

export default Button

