import { div } from 'framer-motion/client';
import React ,{useState , useEffect}from 'react'
import TagPrice from '../../components/cart/tagprice';
import Tagmenu from '../../components/tagmenu';
import Cartcom  from '../../components/cart/cartcom';
import  QRCodeStatic from '../../components/cart/qr_code'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom';

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




const PaymentPage:React.FC = ({}) => {
    

    const navigate = useNavigate();
    

    const [datacart,Setdatacart] = useState<cart[]>([])

    useEffect(()=>{
        const datacartFromStorage = localStorage.getItem("cart");
        if(datacartFromStorage){
            Setdatacart(JSON.parse(datacartFromStorage))
            console.log(datacartFromStorage)
        }
        else{
            Setdatacart([])
        }
            
    },[])

    function formatNumber(price : string): number{
        const numberString = price.replace(/[^\d.]/g, '');
        return parseFloat(numberString) || 0;
    }
    const subtotal = datacart.reduce((acc, item) => acc + formatNumber(item.menu_price) * item.quantity, 0);
    const vat = (datacart.reduce((acc, item) => acc + formatNumber(item.menu_price) * item.quantity, 0) * 0.07);

    return (
        <div className='w-screen h-screen mt-[150px] xl:mb-[600px] lg:mb-[200px]  mb-[0px]'>
            <Tagmenu title='ORDER SCAN'></Tagmenu>
            <div className='w-[90%] xl:h-[60vh] lg:h-[60vh] md:h-[40vh] h-[30vh] flex flex-row justify-center mx-auto md:gap-0 gap-[5px]'>
                <div className='w-[50%] h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] xl:gap-[30px] md:gap-[10px] gap-[5px]'>
                    <p className='mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px] self-start '>YOUR ORDER MENU</p>
                    {datacart.map((data) => {
                        return(
                            <Cartcom title={data.menu_name} imgUrl={`/${data.menu_image}`} type={3}></Cartcom>
                        )
                    })}
                </div>
                
                <div className='w-[40%]  h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col justify-center items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] '>
                    <QRCodeStatic amount={subtotal+vat}></QRCodeStatic>
                </div>
            </div>
            <div className='lg:gap-[80px] md:gap-[50px] gap-[20px] flex flex-col md:mt-[80px] mt-[50px]'>
                <TagPrice title = 'Sub Total Price' price={subtotal}></TagPrice>
                <TagPrice title = 'VAT' price={vat}></TagPrice>
                <TagPrice title = 'Total Price' price={subtotal +vat}></TagPrice>
            </div>
            
            <div className='flex flex-row mt-[30px] md:mt-[80px] justify-center md:gap-[30px] gap-[10px]'> 
                <div onClick={() => navigate('/cart')} className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl'>
                        BACK
                    </Button>
                </div>
                <div onClick={() => navigate('process')} className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl'>
                        NEXT
                    </Button>
                </div>
                
            </div>
            
            
        
        </div>
    )
}

export default PaymentPage