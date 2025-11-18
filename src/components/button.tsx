import React from 'react'
<<<<<<< HEAD
import{Link} from 'react-router-dom'


interface data {
    
    height : 's' | 'm' | 'l' | 'xl' | 'mg' | 'mk',
    width : 's' | 'sm' | 'm' | 'l'| 'xl' | 'mg' | 'mk',
    color : 'brown' | 'white' | 'orange' | 'darkbrown' | 'green' | 'red' | 'gray',
    stringColor : 'white' | 'brown' ,
    stringSize : 's' | 'm' | 'l'| 'xl' | 'mg' | 'mk' ,
=======
import {Link} from 'react-router-dom'

interface data {
    height: 's' | 'm' | 'l'| 'mg' | 'mk',
    width: 's' | 'm' | 'l' | 'mg' | 'mk',
    color: 'brown' | 'white' | 'orange'  | 'green' | 'red' | 'gray',
    stringColor: 'white' | 'brown',
    stringSize: 's' | 'm' | 'l' | 'mg' | 'mk', 
>>>>>>> origin/admin-page
    linkdata? : string,
    children: React.ReactNode;
    onClick?: () => void;
}

<<<<<<< HEAD
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
     
    else if (stringSize == 'mg') {
        text_size = 'md:text-[18px] text-[11px] '
    }
    else if (stringSize == 'mk') {
        text_size = 'text-[15px]  '
    }
    else{
        text_size = '2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'
    }

    let color_button : string ='';
    if (color == 'white'){
        color_button  = 'bg-[#EEDBC4]'
=======
const Button: React.FC<data> = ({onClick, height, width, color, stringColor, stringSize,linkdata, children }) => {
    let color_Text: string = '';
    if (stringColor == 'white') {
        color_Text = 'text-white';
>>>>>>> origin/admin-page
    }
    else {
        color_Text = 'text-[#3D342F]'
    }

    let text_size: string = '';
    if (stringSize == 's') {
        text_size = 'xl:text-[12px] lg:text-[10px] md:text-[8px] text-[6px]'
    }
    else if(stringSize == 'm'){
        text_size = 'lg:text-[16px] xl:text-[18px] md:text-[14px] text-[8px]'
    }
    else if (stringSize == 'mg') {
        text_size = 'md:text-[18px] text-[11px] '
    }
    else if (stringSize == 'mk') {
        text_size = 'text-[15px]  '
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
<<<<<<< HEAD
    else if (color == 'orange'){
        color_button = 'bg-[#FFA537]'
    }
    else if (color == 'darkbrown'){
        color_button = 'bg-[#251F1D]'
    }
=======
    else if (color == 'orange') {
        color_button = 'bg-[#FFA537]'
    }
>>>>>>> origin/admin-page
    else if (color == 'green') {
        color_button = 'bg-green-500'
    }
    else if (color == 'red') {
        color_button = 'bg-red-800'
    }
    else if (color == 'gray') {
        color_button = 'bg-gray-700'
    }
<<<<<<< HEAD
    else{
=======
    else {
>>>>>>> origin/admin-page
        color_button = 'bg-[#EEDBC4]'
    }


<<<<<<< HEAD


    let height_button : string = '';
    if (height == 's'){
=======
    let height_button: string = '';
    if (height == 's') {
>>>>>>> origin/admin-page
        height_button = 'md:max-h-[36px] max-h-[20px]';
    }
    else if (height == 'm'){
        height_button = 'lg:h-[47px] md:h-[30px] h-[24px]';
    }
<<<<<<< HEAD
    else if (height == 'l'){
        height_button = '2xl:h-[70px] xl:h-[60px] lg:h-[40px] md:h-[35px] h-[20px]';
    }
    else if (height == 'xl'){
        height_button = '2xl:h-[80px] xl:h-[70px] lg:h-[60px] md:h-[40px] h-[25px]'
    }
    else if (height == 'mg') {
        height_button = 'lg:h-[47px] md:h-[50px] h-[40px]';
    }
    else if (height == 'mk') {
        height_button = '';
    }
    else{
=======
    else if (height == 'mg') {
        height_button = 'lg:h-[47px] md:h-[50px] h-[40px]';
    }
    else if (height == 'mk') {
        height_button = '';
    }
    else if (height == 'l') {
        height_button = 'max-h-[80px]';
    }
    else {
>>>>>>> origin/admin-page
        height_button = 'max-h-[500px]'
    }



<<<<<<< HEAD



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
    else if (width == 'mg') {
        width_button = 'lg:w-[90px] xl:w-[140px] md:w-[120px] w-[90px] p-[5px]';
    }
    else if (width == 'mk') {
        width_button = 'w-[90px] lg:w-[150px] p-[5px]';
    }
    else{
=======
    let width_button: string = '';

    if (width == 's') {
        width_button = 'xl:max-w-[150px] xl:p-[6px] md:max-w-[100px] md:p-[4px] p-[3px]';
    }
    else if (width == 'm'){
        width_button = 'lg:w-[47px] md:w-[30px] w-[24px]';
    }
    else if (width == 'mg') {
        width_button = 'lg:w-[90px] xl:w-[140px] md:w-[120px] w-[90px] p-[5px]';
    }
    else if (width == 'mk') {
        width_button = 'w-[90px] lg:w-[150px] p-[5px]';
    }
    else if (width == 'l') {
        width_button = 'max-w-[300px]';
    }
    else {
>>>>>>> origin/admin-page
        width_button = 'max-w-[500px]';
    }

    const combinedClassName: string = `${height_button} ${width_button} ${color_button} ${color_Text} ${text_size}`.replace(/\s+/g, ' ').trim();
<<<<<<< HEAD

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
    
=======
    
    if (!linkdata) {
        return (
            <button onClick={onClick}
            className={`${combinedClassName} cursor-pointer hover:scale-105 transition duration-300 rounded-full font-sans box-border`} >
                {children}
            </button>
        )
    }
    else {
        return (
            <Link to={linkdata} className={`${combinedClassName} rounded-full font-sans box-border block text-center flex items-center justify-center`}>{children}</Link>
        )
    }

>>>>>>> origin/admin-page
}

export default Button

