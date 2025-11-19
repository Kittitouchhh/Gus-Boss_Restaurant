import React,{useState,useEffect} from 'react'
import CategoryCard from './categorycard'
import axios from 'axios'
import{Link} from 'react-router-dom'

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
        <div className='flex flex-row w-full justify-center '>
          {categorydata.map((data)=>{
            return(
              <Link to='moremenu'>
                <CategoryCard image={data.imageCategory} name={data.categoryName}></CategoryCard>
              </Link>
            )})}
        </div>
    )
}

export default SetCategoryCard