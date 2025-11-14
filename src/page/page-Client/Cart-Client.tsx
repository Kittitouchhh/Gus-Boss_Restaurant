import Cartcom from '../../components/cart/cartcom'
import { useState , useEffect } from 'react'
import Tagmenu from '../../components/tagmenu'


interface cart{
            menu_id : number,
            menu_name : string,
            menu_price : string,
            menu_image : string,
            order_description : string,
            user_order : string,
            menu_option : { [key: string]: string } ,
            quantity : number,
}

function Cart(){

    let [datacart,Setdatacart] = useState<cart[]>([])
    useEffect(() => {
        const datacartFromStorage = localStorage.getItem("cart");
        if(datacartFromStorage){
            Setdatacart(JSON.parse(datacartFromStorage))
        }
        else{
            Setdatacart([])
        }
    },[])


     const removeItem = (id: number) => {
        Setdatacart(prev => prev.filter(item => item.menu_id !== id));
    };
    return(
        
        <div className='mt-[150px] mb-[120px]  gap-[20px]'> 
            <Tagmenu title="YOUR CART"></Tagmenu>
            <div className=' flex flex-col gap-[30px] items-center'>
                 {datacart.map((data) => {
                    return(
                        <Cartcom key={data.menu_id} imgUrl={data.menu_image} title={data.menu_name} onRemove={() => removeItem(data.menu_id)} option={data.menu_option} count={data.quantity}></Cartcom>
                    )
                 })}
            </div>  
            
        </div>
        
    )
}

export default Cart