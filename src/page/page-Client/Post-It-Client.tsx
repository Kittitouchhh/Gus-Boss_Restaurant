import React , {useState , useEffect} from 'react'
import Header from "../../components/header"
import PostItCard from '../../components/post-it/post-it-card.tsx'
import { div } from 'framer-motion/client'
import SwiperCom from '../../components/swipercom'
import axios from 'axios'
import FormDemo from '../../components/post-it/formpostit.tsx'
import Addcommentbox from '../../components/comment/addcommentbox.tsx'

interface PostitProps{
    post_id : number
    username : string,
    userImage: string, 
    love : number ,
    wow : number ,
    star : number ,
    angry : number,
    content : string,
}

interface Banner{
  id : number ,
  image : string,
  page : string
}

function PostIt(){
    const [datapostit , Setdatapostit] = useState<PostitProps[]>([])
    let [databanner , Setbanner] = useState<Banner[]>([])
    // popup postit
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const [rerender, setRerender] = useState<number>(0);

   function loaddatapostit(){
    setRerender(prev => prev + 1)
   }

   useEffect(()=>{
    const postitFromLocal = localStorage.getItem("postit")
    if(postitFromLocal){
        Setdatapostit(JSON.parse(postitFromLocal))
    }
    else{
        Setdatapostit([])
    }
   },[rerender])
        
     
    useEffect( () => {
        const fetchMenu = async () => {
            try{
                loaddatapostit();


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

        

        const postitFromLocal = localStorage.getItem("postit")
        if(postitFromLocal){
            Setdatapostit(JSON.parse(postitFromLocal))
        }
        else{
            Setdatapostit([])
        }
        

    },[])

    


    return(

        <div>
            <div className='mt-[110px] '> 
                <SwiperCom key={databanner.length} databanner={databanner.filter((data)=>data.page === "postit" )}></SwiperCom>
            </div>
            
            <div onClick={()=> setIsCommentOpen(!isCommentOpen)}>
                 <img src= "/logo/add.png" alt="" className='fixed 2xl:w-[150px] 2xl:h-[150px] xl:w-[120px] xl:h-[120px] lg:w-[100px] lg:h-[100px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] md:right-[50px] md:bottom-[50px] right-[20px] bottom-[20px]'/>
            </div>
           

            <div className='mt-[40px] mb-[120px] flex flex-row flex-wrap gap-[20px] justify-center'>
                {
                    datapostit.map((data) => {
                        return(
                            <PostItCard post_id={data.post_id} username ={data.username} imguser = {data.userImage} content={data.content} love={data.love} star={data.star} wow={data.wow} angry={data.angry}  update={loaddatapostit}></PostItCard>
                        )
                    })
                }
            </div>
            {isCommentOpen && <Addcommentbox onClose={() => setIsCommentOpen(false)}  type={2}></Addcommentbox>}
        </div>
        
        
    )
}

export default PostIt

