import React from 'react'
import {useEffect , useState} from 'react'
import CardMenu from './cardmenu'
import axios from 'axios'
import {Routes,Route} from 'react-router-dom'




interface filenameProps{
  filename:string,
}

interface Post{
  id:string,
  menuName:string,
  imageMenu:string,
  menuOption:string[],
  menuPrice:string,
  menuLike:string,
  datajson:string
}


const SetCardMenu:React.FC<filenameProps> = ({filename}) => {
    const [filejson ,Setfile] = useState<string>(filename)
    const [datajson , Setdata] = useState<Post[]>([])

    useEffect(() =>{
      axios.get(`/dataclient/${filejson}`)
      .then((res) => {Setdata(res.data) })
      .catch ((err) => {
        console.log(`เกิดข้อผิดพลาด ${err}`)
      })
    },[filejson])

    useEffect(() => {
      Setfile(filename)
    }, [filename])

    return(
      <div className='m-[20px] flex flex-row flex-wrap xl:gap-[20px] lg:gap-[15px] md:gap-[10px] gap-[5px] xl:w-[80%] 2xl:w-[65%] lg:w-[65%] md:w-[80%] w-[95%] mx-auto justify-center '>
        {datajson.map((data) =>{
          return(
            <div>
              <CardMenu name={data.menuName} image={data.imageMenu} option={data.menuOption} price={data.menuPrice} like={data.menuLike} datajson={data.datajson}></CardMenu>
            </div>
            
          )
        })}     
      </div>
    )
}

export default SetCardMenu