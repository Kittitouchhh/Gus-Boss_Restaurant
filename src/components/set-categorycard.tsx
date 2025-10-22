import React,{useState,useEffect} from 'react'
import CategoryCard from './categorycard'
import axios from 'axios'

interface CategoryProps{
  id : string,
  categoryName : string,
  imageCategory : string
}

function SetCategoryCard(){

  const [categorydata,Setcategorydata] = useState<CategoryProps[]>([])

  useEffect(() =>{
    axios.get("/dataclient/categorycard.json")
    .then((res) => Setcategorydata(res.data))
    .catch ((err) => {
        console.log(`เกิดข้อผิดพลาด ${err}`)
      })
  },[] )
  

    return(
        <div className='flex flex-row w-full justify-center md:mt-[110px] mt-[120px]'>
          {categorydata.map((data)=>{
            return(
              <CategoryCard image={data.imageCategory} name={data.categoryName}></CategoryCard>
            )})}
        </div>
    )
}

export default SetCategoryCard