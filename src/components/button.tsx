import React from 'react'
import {Link} from 'react-router-dom'

interface data {

    height: 's' | 'm' | 'l',
    width: 's' | 'm' | 'l',
    color: 'brown' | 'white' | 'orange'  | 'green',
    stringColor: 'white' | 'brown',
    stringSize: 's' | 'm' | 'l',
    linkdata? : string,
    children: React.ReactNode;
    onClick?: () => void;
}

const Button: React.FC<data> = ({onClick, height, width, color, stringColor, stringSize,linkdata, children }) => {
    let color_Text: string = '';
    if (stringColor == 'white') {
        color_Text = 'text-white';
    }
    else {
        color_Text = 'text-[#3D342F]'
    }

    let text_size: string = '';
    if (stringSize == 's') {
        text_size = 'xl:text-[12px] lg:text-[10px] md:text-[8px] text-[6px]'
    }
    else if (stringSize == 'm') {
        text_size = 'lg:text-[16px] xl:text-[18px] md:text-[18px] text-[12px] '
    }
    else {
        text_size = 'text-[64px]'
    }

    let color_button: string = '';
    if (color == 'white') {
        color_button = 'bg-[#EEDBC4]'
    }
    else if (color == 'brown') {
        color_button = 'bg-[#3D342F]'
    }
    else if (color == 'orange') {
        color_button = 'bg-[#FFA537]'
    }
    else if (color == 'green') {
        color_button = 'bg-green-500'
    }
    else {
        color_button = 'bg-[#EEDBC4]'
    }


    let height_button: string = '';
    if (height == 's') {
        height_button = 'md:max-h-[36px] max-h-[20px]';
    }
    else if (height == 'm') {
        height_button = 'lg:h-[47px] md:h-[50px] h-[40px]';
    }
    else if (height == 'l') {
        height_button = 'max-h-[80px]';
    }
    else {
        height_button = 'max-h-[500px]'
    }



    let width_button: string = '';

    if (width == 's') {
        width_button = 'xl:max-w-[150px] xl:p-[6px] md:max-w-[100px] md:p-[4px] p-[3px]';
    }
    else if (width == 'm') {
        width_button = 'lg:w-[90px] xl:w-[140px] md:w-[120px] w-[90px] p-[5px]';

    }
    else if (width == 'l') {
        width_button = 'max-w-[300px]';
    }
    else {
        width_button = 'max-w-[500px]';
    }

    const combinedClassName: string = `${height_button} ${width_button} ${color_button} ${color_Text} ${text_size}`.replace(/\s+/g, ' ').trim();
    
    if (!linkdata) {
        return (
            <button onClick={onClick}
            className={`${combinedClassName} cursor-pointer hover:scale-120 transition duration-500 rounded-full font-sans box-border`} >
                {children}
            </button>
        )
    }
    else {
        return (
            <Link to={linkdata} className={`${combinedClassName} rounded-full font-sans box-border block text-center flex items-center justify-center`}>{children}</Link>
        )
    }

}

export default Button

