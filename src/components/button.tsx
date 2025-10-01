import React from 'react'

interface data {
    
    height : 's' | 'm' | 'l',
    width : 's' | 'm' | 'l',
    color : 'brown' | 'white'
    // color : '#EEDBC4' |  '#3D342F',
    children: React.ReactNode;
}

const Button: React.FC<data> = ({height , width ,color,children}) =>{
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

    const combinedClassName: string = `${height_button} ${width_button} ${color_button}`.replace(/\s+/g, ' ').trim();


    return(
        <button className={`${combinedClassName} rounded-full text-[18px] font-sans`} >
            {children}
        </button>
    )
}

export default Button

