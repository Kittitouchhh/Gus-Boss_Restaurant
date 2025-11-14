import React , {useState , useEffect} from 'react'
import Header from "../../components/header"
import PostItCard from '../../components/post-it/post-it-card.tsx'
import { div } from 'framer-motion/client'
import SwiperCom from '../../components/swipercom'
import axios from 'axios'
import FormDemo from '../../components/post-it/formpostit.tsx'


interface datapostit{
    username: string;
    imguser: string;
    content: string;
    love: number;
    star: number;
    wow: number;
    angry: number;
}

interface Banner{
  id : number ,
  image : string,
  page : string
}

function PostIt(){
     const [datapostit , Setdata] = useState<datapostit[]>([])
     let [databanner , Setbanner] = useState<Banner[]>([])
     

    
     
    useEffect( () => {
        axios.get("dataclient/postitdata.json")
        .then((res) => { Setdata(res.data)})
        .catch ((err) => {
        console.log(`เกิดข้อผิดพลาด ${err}`)})
        


        const fetchMenu = async () => {
            try{
                
                // banner local get
                const bannerJson1 = await axios.get<Banner[]>("/dataclient/carousalitem.json")
                const bannerJson2 = await axios.get<Banner[]>("/dataclient/carousalitempostit.json")

                const allbanner = [
                    ...bannerJson1.data,
                    ...bannerJson2.data
                ]

                const bannerFromStorage = localStorage.getItem("banner");
                if (bannerFromStorage){
                    Setbanner(JSON.parse(bannerFromStorage))
                    console.log(databanner)
                }
                else{
                    localStorage.setItem("banner", JSON.stringify(allbanner));
                    Setbanner(allbanner)
                    console.log(databanner)
                }

            }
            catch(err){
                console.log(`เกิดข้อผิดพลาด ${err}`)
            }
        }


        fetchMenu()

        

    },[])




    return(

        <div>
            <div className='mt-[110px]'> 
                <SwiperCom key={databanner.length} databanner={databanner.filter((data)=>data.page === "postit" )}></SwiperCom>
            </div>
            
            <img src= "/logo/add.png" alt="" className='fixed 2xl:w-[150px] 2xl:h-[150px] xl:w-[120px] xl:h-[120px] lg:w-[100px] lg:h-[100px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] md:right-[50px] md:bottom-[50px] right-[20px] bottom-[20px]'/>

            <div className='mt-[40px] mb-[120px] flex flex-row flex-wrap gap-[20px] justify-center'>
                {
                    datapostit.map((data) => {
                        return(
                            <PostItCard  username ={data.username} imguser = {data.imguser} content={data.content} love={data.love} star={data.star} wow={data.wow} angry={data.angry}></PostItCard>
                        )
                    })
                }
            </div>
        </div>
        
        
    )
}

export default PostIt

