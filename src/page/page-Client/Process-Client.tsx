import React , {useState , useEffect} from 'react'
import Cartcom from '../../components/cart/cartcom'
import { div } from 'framer-motion/client'


interface process{
    user :  string,
    user_image : string
    all_menu:  string[],
    duration : number
}

function ProcessOrder(){
    let [dataprocess,Setprocess] = useState<process[]>([])



    const remove = (index: number) => {
    Setprocess(prev => {
        const newprocess = prev.filter((_, i) => i !== index)
        localStorage.setItem("process", JSON.stringify(newprocess));
        return newprocess;
     })}

    useEffect(() =>{
        const dataprocessFromStorage = localStorage.getItem("process");
        if(dataprocessFromStorage){
            Setprocess(JSON.parse(dataprocessFromStorage))
            const parsed = JSON.parse(dataprocessFromStorage);
            console.log(parsed)
        }
        else{
            Setprocess([])
        }
    },[])


   

    return(
        <div className='mt-[120px] mb-[900px]'>
            <div className='flex flex-col items-center gap-[20px]'>
                {dataprocess.map((data , index)=>{
                return(
                    <Cartcom type ={2} user_image={data.user_image} user_name={data.user} listmenu={data.all_menu} duration={data.duration} onFinish={() => remove(index)}></Cartcom>
                )})}
            </div>
            
            
        </div>
    )
}

export default ProcessOrder