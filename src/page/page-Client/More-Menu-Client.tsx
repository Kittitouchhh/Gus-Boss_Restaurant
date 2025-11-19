import SetCardMenu from '../../components/set-cardmenu'
import Tagmenu from '../../components/tagmenu.tsx'
import {useEffect , useState} from 'react'
import axios from 'axios'
import CategoryCard from '../../components/categorycard'

interface CategoryProps{
  id : string,
  categoryName : string,
  imageCategory : string
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



function MoreMenu(){
    const [categorydata,Setcategorydata] = useState<CategoryProps[]>([])
    const [tagname , Settagname] = useState<string>('tea')
    const [data , Setdata] = useState<Post[]>([])

    useEffect(() => {
        // ดึงข้อมูลเมนูมาจาก local เมื่อมีการคลิกที่รูปภาพ category
        const dataFromStorage = localStorage.getItem("menu");
        if (dataFromStorage) {
            Setdata(JSON.parse(dataFromStorage))};
        
        // เก็บรูปภาพ category
        axios.get("/dataclient/categorycard.json")
        .then((res) => Setcategorydata(res.data))
        .catch((err) => console.log(`เกิดข้อผิดพลาด ${err}`))

    
        
    },[tagname])


    useEffect(() => {
        const dataFromStorage = localStorage.getItem("menu");
        if (dataFromStorage) {
            Setdata(JSON.parse(dataFromStorage))};
    },[] )
    

    

    return(
        <div>
            <div className='flex flex-row w-full justify-center md:mt-[40px] mt-[20px]'>
                {categorydata.map((data)=>{
                return(
                // สร้าง categorycard เเละเมื่อมีการกดให้เรียก settagname
                <div onClick={() => {Settagname(data.categoryName.toLowerCase().replace(/\s+/g, ''))}} className='md:mt-[110px] mt-[120px]'>
                    <CategoryCard image={data.imageCategory} name={data.categoryName}></CategoryCard>
                </div>
                )})}          
            </div>
            
            <Tagmenu title={tagname}></Tagmenu>
            <SetCardMenu filename={data.filter((data) => data.datajson === (`menu${tagname}`) && data.status === 1)}></SetCardMenu>
            
        </div>

        
    )
}
export default MoreMenu