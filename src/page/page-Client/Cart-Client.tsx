import Cartcom from '../../components/cart/cartcom'
import { useState , useEffect } from 'react'
import Tagmenu from '../../components/tagmenu'
import TagPrice from '../../components/cart/tagprice'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
interface cart{
            menu_id : number,
            menu_name : string,
            menu_price : string,
            menu_image : string,
            order_description : string,
            menu_option : { [key: string]: string } ,
            quantity : number,
            
}




function Cart(){
    const navigate = useNavigate();
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

    function formatNumber(price : string): number{
        const numberString = price.replace(/[^\d.]/g, '');
        return parseFloat(numberString) || 0;
    }
    const subtotal = datacart.reduce((acc, item) => acc + formatNumber(item.menu_price) * item.quantity, 0);
    const vat = (datacart.reduce((acc, item) => acc + formatNumber(item.menu_price) * item.quantity, 0) * 0.07);



    const updateQuantity = (id: number, newQty: number) => {
    Setdatacart(prev => {
        const updated = prev.map(item =>
            item.menu_id === id ? { ...item, quantity: newQty } : item
        );
        localStorage.setItem("cart", JSON.stringify(updated));
        return updated;
    });
    };

    
    function checkcart(){
        if(datacart.length > 0){
            navigate('/cart/payment')
        }
        else{
            navigate('/')
            toast.error('สั่งผิดพลาด!',{
                                    position:"top-center",
                                    autoClose:3000,
                                    hideProgressBar:false,
                                    closeOnClick:false,
                                    pauseOnHover:false,
                                    draggable: false ,
                                    theme:'colored'
                        })
        }
    }
    
    return(
        
        <div className='mt-[150px] mb-[120px]  gap-[20px]'> 
            <Tagmenu title="YOUR CART"></Tagmenu>
            <div className=' flex flex-col gap-[30px] items-center'>
                 {datacart.map((data) => {
                    return(
                        <Cartcom key={data.menu_id} id_menu={data.menu_id} imgUrl={data.menu_image} title={data.menu_name} onRemove={() => removeItem(data.menu_id)} option={data.menu_option} count={data.quantity} type={1} onQuantityChange={(newQty) => updateQuantity(data.menu_id, newQty)}></Cartcom>
                    )
                 })}
            </div> 

            <div className='w-full mx-auto md:mt-[60px] md:mb-[60px] mt-[40px] mb-[30px] flex flex-col xl:gap-[90px] lg:gap-[70px] md:gap-[50px] gap-[20px]  '>
                <TagPrice title = 'Sub Total Price' price={subtotal}></TagPrice>
                <TagPrice title = 'VAT' price={vat}></TagPrice>
                <TagPrice title = 'Total Price' price={subtotal +vat}></TagPrice>
            </div> 
            
           <div className="w-full flex justify-center">
                <div className='transform transition-transform duration-200 hover:scale-105 active:scale-95' onClick={() => checkcart()}>
                    <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl' linkdata='payment'>
                        BUY ALL
                    </Button>
                </div>
            </div>
            
        </div>
        
    )
}

export default Cart