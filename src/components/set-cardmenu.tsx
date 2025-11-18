import React from 'react'
import {useEffect , useState} from 'react'
import CardMenu from './cardmenu'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'




interface filenameProps{
  filename:Post[]
}

interface Post{
  id:number,
  menuName:string,
  imageMenu:string,
  menuOption:string[],
  menuPrice:number,
  datajson:string,
  description:string,
  status : number
}


const SetCardMenu:React.FC<filenameProps> = ({filename}) => {
    



    return(
      <div className='m-[20px] flex flex-row flex-wrap xl:gap-[20px] lg:gap-[15px] md:gap-[10px] gap-[5px] xl:w-[80%] 2xl:w-[55%] lg:w-[65%] md:w-[80%] w-[95%] mx-auto justify-center '>
        {filename.map((data) =>{
          return(
            <div>
              <CardMenu id={data.id} name={data.menuName} image={data.imageMenu} option={data.menuOption} price={data.menuPrice}  datajson={data.datajson} description={data.description}></CardMenu>
            </div>
            
          )
        })}     
      </div>
    )
}

export default SetCardMenu