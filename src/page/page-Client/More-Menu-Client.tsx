import SetCardMenu from '../../components/set-cardmenu'
import Tagmenu from '../../components/tagmenu.tsx'
import SetCategoryCard from '../../components/set-categorycard'
import {useEffect , useState} from 'react'
import React from 'react'
import axios from 'axios'
import CategoryCard from '../../components/categorycard'

interface CategoryProps{
  id : string,
  categoryName : string,
  imageCategory : string
}

function MoreMenu(){
    const [categorydata,Setcategorydata] = useState<CategoryProps[]>([])
    const [tagname , Settagname] = useState<string>('Tea')
    const [changefile , SetChangeFile] = useState<string>('menutea.json')

    useEffect(() => {
        axios.get("/dataclient/categorycard.json")
        .then((res) => Setcategorydata(res.data))
        .catch((err) => console.log(`เกิดข้อผิดพลาด ${err}`))
        
    },[])
    

    return(
        <div>
            <div className='flex flex-row w-full justify-center md:mt-[40px] mt-[20px]'>
                {categorydata.map((data)=>{
                return(
                <div onClick={() => {SetChangeFile(`menu${data.categoryName.toLowerCase().replace(/\s+/g, '')}.json`); Settagname(data.categoryName)}} className='md:mt-[110px] mt-[120px]'>
                    <CategoryCard image={data.imageCategory} name={data.categoryName}></CategoryCard>
                </div>
                )})}          
            </div>
            
            <Tagmenu title={tagname}></Tagmenu>
            <SetCardMenu filename={changefile}></SetCardMenu>
            
        </div>

        
    )
}
export default MoreMenu