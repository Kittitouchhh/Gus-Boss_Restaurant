import React , {useState , useEffect} from 'react'
import Button from '../button'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {Flex,Progress} from "@radix-ui/themes"
import CountdownProgress from './CountdownProgress'
import Addcommentbox from '../comment/addcommentbox'

interface CartProps{
    id_menu?: number,
    imgUrl? : string,
    title? : string,
    option?: { [key: string]: string },
    onRemove?: () => void,
    count? : number,
    type? : number,
    user_image? : string
    user_name? : string
    onQuantityChange?: (newQty: number) => void,
    listmenu? : string[],
    duration? : number,
    onFinish?: () => void;
    description? : string

}





const Cartcom:React.FC<CartProps> = ({id_menu,imgUrl , title,onRemove,option ,count,type ,user_name ,user_image,onQuantityChange,listmenu,duration,onFinish , description }) =>{
    const [quantity , setquantity] = useState<number>(count ?? 1)
    


    function updatelocalstorage(newQty : number){
        const cart = JSON.parse(localStorage.getItem("cart") || "[]")
        const update = cart.map((item:any) =>{
            if (item.menu_name === title) {
                return { ...item, quantity: newQty };
            }
            return item
        })
        localStorage.setItem("cart", JSON.stringify(update));

    }

    function add(){
        if(quantity >= 0){
            const newQty = quantity + 1;
            setquantity(newQty);
            updatelocalstorage(newQty);
            onQuantityChange?.(newQty);
        }

    }

    
    function sub(){
        const newQty = quantity - 1;
        if(quantity > 1){
            setquantity(newQty);
            updatelocalstorage(newQty)
            onQuantityChange?.(newQty);
        }
        else{
            onRemove?.()
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const update = cart.filter((item: any) => item.menu_name !== title);
            localStorage.setItem("cart", JSON.stringify(update));
            toast.error('สินค้าถูกลบจากตระกร้าเเล้ว!',{
                position:"top-center",
                autoClose:3000,
                hideProgressBar:false,
                closeOnClick:false,
                pauseOnHover:false,
                draggable: false ,// ลากไปวางที่อื่นไม่ได้
                theme:'colored'})
        }
        
    }

    // popup comment
    const [isCommentOpen, setIsCommentOpen] = useState(false);

    const [isdescriptionpen, setdescriptionOpen] = useState(false);



    if(type == 1)
    {
        return(
        <div className='w-[95%] lg:h-[250px] md:h-[180px]  h-auto bg-[#201c19] md:rounded-3xl rounded-xl grid md:grid-cols-3  grid-cols-1   border-amber-100 border-2 justify-center'>
            <div className='w-full h-full flex flex-row md:p-[10px] p-[5px] lg:gap-[30px] md:gap-[15px] gap-[20px]'>
                <img src={imgUrl} alt=""  className='2xl:w-[40%] xl:w-[40%] lg:w-[40%] md:w-[40%] w-[35%] h-[90%] object-cover rounded-xl self-center aspect-[4/3]'/>
                <div className='flex flex-col'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>MENU NAME</p>
                    <p className='2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'>{title}</p>
                </div >
            </div>

            <div className='w-full h-full md:p-[10px] p-[5px] flex flex-row  lg:gap-[20px] md:gap-[10px] gap-[10px]'>
                <div className='2xl:w-[60%] xl:w-[50%] h-full flex flex-col gap-[10px]'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>DETAILS</p>
                     <div className='flex flex-row md:gap-[10px] gap-[5px] flex-wrap '>
                        {Object.entries(option??{}).map(([key, value]) => (
                                <Button height="m" width="l" color="white" stringColor="brown" stringSize="s" > {`${key}: ${value}`}</Button>
                            )
                        )}
                    </div>
                </div>

                <div className='2xl:w-[40%] xl:w-[50%] h-full flex flex-col lg:gap-[20px] md:gap-[10px] gap-[10px]'>
                    <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>DESCRIPTION</p>
                    <div onClick={() => {setdescriptionOpen(!isdescriptionpen)}}>
                        <Button height="l" width="l" color="brown" stringColor="white" stringSize="l" >EDIT DETIAL</Button>
                    </div>
                    {isdescriptionpen && <Addcommentbox onClose={() => setdescriptionOpen(false)}  menucartid={id_menu} description={description} type={3}></Addcommentbox>}                    
                </div>
                
            </div>

            <div className='flex flex-row justify-center items-center md:m-[0px] m-[10px] '>
                <div className='md:w-[60%] w-[40%] 2xl:h-[30%] xl:h-[20%] lg:h-[20%] md:h-[30%]  h-[100%] bg-[#EEDBC4] rounded-full items-center justify-center grid grid-cols-3'>
                    <button className='2xl:text-[40px] xl:text-[30px] lg:text-[25px] md:text-[25px] text-[12px] text-[#201c19] text-center h-full' onClick={sub}>-</button>
                    <p className='2xl:text-[30px] xl:text-[20px] lg:text-[20px] md:text-[16px] text-[20px] text-[#201c19] text-center'>{quantity}</p>  
                    <button className='2xl:text-[40px] xl:text-[30px] lg:text-[25px] md:text-[25px] text-[12px] text-[#201c19] text-center h-full' onClick={add}>+</button>
                </div>
            </div>

        </div>
    )
    }

    else if(type == 2){
        return(
            <div className='w-[95%] p-[10px]   h-auto bg-[#201c19] md:rounded-3xl rounded-xl grid   grid-cols-3   border-amber-100 border-2 '>
                <div className='w-full h-full flex md:flex-row flex-col   md:p-[10px] p-[5px] lg:gap-[10px] md:gap-[15px] gap-[10px] justify-center md:items-start'>
                    <img src={user_image} alt=""  className='2xl:w-[150px] 2xl:h-[150px] xl:w-[200px] xl:h-[200px] lg:w-[150px] lg:h-[150px] md:w-[100px] md:h-[100px] w-[100px] h-[100px] object-cover rounded-full self-center aspect-auto'/>
                    <div className='flex flex-col md:justify-center md:items-start items-center'>
                        <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[8px] font-bold'>ORDER USER</p>
                        <p className='2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[7px]'>{user_name}</p>
                    </div >
                </div>

                <div className='w-full h-full xl:p-[10px] lg:p-[10px] md:p-[10px] p-[5px] flex flex-row  lg:gap-[20px] md:gap-[10px] gap-[10px]'>
                    <div className=' h-full flex flex-col gap-[10px]'>
                        <p className='2xl:text-[32px] xl:text-[26px] lg:text-[22px] md:text-[16px] text-[10px] font-bold'>DETAILS</p>
                        <div className='w-full flex flex-row px-0 lg:px-[20px] xl:px-0  md:gap-[10px] gap-[5px] flex-wrap justify-center '>
                           {listmenu?.map((data) => {
                            return (<Button height="m" width="m" color="white" stringColor="brown" stringSize="s">{data}</Button>);})}
                        </div>
                    </div>
                </div>

                <div className='flex flex-row justify-center items-center md:m-[0px] m-[10px] max-w-[80%]'>
                    <CountdownProgress durationSeconds={duration || 30} onFinish={onFinish}></CountdownProgress>
                </div>

            </div>
        )
    }
    else{
        return(
            <div className='w-[95%] lg:h-[250px] md:h-[180px]  h-auto bg-[#201c19] md:rounded-2xl rounded-md grid  grid-cols-[3fr_1fr]   border-amber-100 md:border-2 border-1 justify-center'>
                <div className='w-full h-full flex flex-row md:p-[10px] p-[5px] lg:gap-[30px] md:gap-[15px] gap-[10px]'>
                    <img src={imgUrl} alt=""  className=' 2xl:w-[30%] xl:w-[40%] lg:w-[40%] md:w-[40%] w-[35%] h-full object-cover  self-center aspect-[4/3] md:rounded-2xl rounded-md'/>
                    <div className='flex flex-col'>
                        <p className='2xl:text-[32px] xl:text-[24px] lg:text-[18px] md:text-[12px] text-[6px] font-bold '>MENU NAME</p>
                        <p className='2xl:text-[28px] xl:text-[24px] lg:text-[16px] md:text-[11px] text-[4px]'>{title}</p>
                    </div >
                </div>
                <div className='w-full h-full xl:p-[10px] lg:p-[10px] md:p-[10px] p-[5px] flex flex-row  lg:gap-[20px] md:gap-[10px] gap-[10px] justify-center items-center' onClick={()=> setIsCommentOpen(!isCommentOpen)}>         
                    <Button height="m" width="sm" color="white" stringColor="brown" stringSize="s">COMMENT</Button>
                </div>
                {isCommentOpen && <Addcommentbox onClose={() => setIsCommentOpen(false)} image={imgUrl} menu_name={title} type={1}></Addcommentbox>}
            </div>
        )
        
    }
    
}

export default Cartcom