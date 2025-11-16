import React from 'react'
import{Link} from 'react-router-dom'


interface data {
    
    height : 's' | 'm' | 'l' | 'xl',
    width : 's' | 'sm' | 'm' | 'l'| 'xl',
    color : 'brown' | 'white' | 'orange' | 'darkbrown',
    stringColor : 'white' | 'brown' ,
    stringSize : 's' | 'm' | 'l'| 'xl' ,
    linkdata? : string,
    children: React.ReactNode;
}

const Button: React.FC<data> = ({height , width ,color,stringColor,stringSize,linkdata,children}) =>{
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
    else if(stringSize == 'l'){
        text_size = '2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'
    }
    else if(stringSize == 'xl'){
        text_size = '2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px]'
    }
    else{
        text_size = '2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'
    }

    let color_button : string ='';
    if (color == 'white'){
        color_button  = 'bg-[#EEDBC4]'
    }
    else if (color == 'brown'){
        color_button = 'bg-[#3D342F]'
    }
    else if (color == 'orange'){
        color_button = 'bg-[#FFB458]'
    }
    else if (color == 'darkbrown'){
        color_button = 'bg-[#251F1D]'
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
        height_button = '2xl:h-[70px] xl:h-[60px] lg:h-[40px] md:h-[35px] h-[20px]';
    }
    else if (height == 'xl'){
        height_button = '2xl:h-[80px] xl:h-[70px] lg:h-[60px] md:h-[40px] h-[25px]'
    }
    else{
        height_button = 'max-h-[500px]'
    }



    let width_button : string = '';

    if (width == 's')
        {
            width_button = 'xl:max-w-[150px] xl:p-[6px] md:max-w-[100px] md:p-[4px] p-[3px]';
        }
    else if (width == 'sm'){
        width_button = 'xl:w-[120px] lg:w-[80px] md:w-[60px] w-[40px]';
    }
    else if (width == 'm'){
        width_button = 'xl:w-[120px] lg:w-[90px] md:w-[90px] w-[60px]';

    }
    else if (width == 'l'){
        width_button = '2xl:w-[300px] xl:w-[250px] lg:w-[150px] md:w-[100px] w-[70px] ';
    }
    else if (width == 'xl'){
        width_button = '2xl:w-[500px] xl:w-[450px] lg:w-[350px] md:w-[250px] w-[130px]'
    }
    else{
        width_button = 'max-w-[500px]';
    }

    const combinedClassName: string = `${height_button} ${width_button} ${color_button} ${color_Text} ${text_size}`.replace(/\s+/g, ' ').trim();

    if(!linkdata){
        return(
            <button className={`${combinedClassName} rounded-full font-sans box-border `} >
                {children}
            </button>
        )
    }
    else{
        return( 
            <Link to={linkdata} className={`${combinedClassName} rounded-full font-sans box-border  text-center flex items-center justify-center font-bold`}>{children}</Link>
        )
    }
    
}

export default Button

