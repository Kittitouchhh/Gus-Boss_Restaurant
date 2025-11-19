import { div } from 'framer-motion/client';
import React ,{useState , useEffect}from 'react'
import TagPrice from '../../components/cart/tagprice';
import Tagmenu from '../../components/tagmenu';
import Cartcom  from '../../components/cart/cartcom';
import  QRCodeStatic from '../../components/cart/qr_code'
import Button from '../../components/button'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import usersData from "../../data/login.json";
import CalculateMembership from '../../utils/calculateMembership';


interface cart{
            order_id : number,
            menu_id  : number,
            menu_name : string,
            menu_price : number,
            menu_image : string,
            order_description : string,
            user_order : string,
            userimage : string,
            menu_option : { [key: string]: string } ,
            quantity : number
}

interface process{
    user :  string,
    user_image : string
    all_menu:  string[],
    duration : number
}




const PaymentPage:React.FC = ({}) => {

    const currentId = localStorage.getItem("currentUser");
    if (!currentId) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
        (u: any) => u.id?.toString() === currentId
    );
    
    
    
    const displayName = foundUser?.showname || "Unknown";
    const displayImage = foundUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";
    const discount = foundUser?.discount || 1 ;


    const navigate = useNavigate();
    

    // cart
    const [datacart,Setdatacart] = useState<cart[]>([])
    const [dataprocess , setprocss] = useState<process[]>([])

    useEffect(()=>{
        const datacartFromStorage = localStorage.getItem("cart");
        if(datacartFromStorage){
            Setdatacart(JSON.parse(datacartFromStorage))
            console.log(datacartFromStorage)
        }
        else{
            Setdatacart([])
        }

        
        const dataprocessFromStorage = localStorage.getItem("process");
        if(dataprocessFromStorage){
            setprocss(JSON.parse(dataprocessFromStorage))
        }
        else{
            setprocss([])
        }
            
    },[])

    

    function buysuccess( ) {
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (cart.length > 0){
                const newProcessItem = {
                user :  displayName,
                user_image : displayImage , 
                all_menu:  cart.map((item: any) => item.menu_name),
                duration : cart.length * 10,
                }


            const new_process = [...dataprocess, newProcessItem] 
            setprocss(new_process);    
            localStorage.setItem("process", JSON.stringify(new_process));

            
            localStorage.removeItem('cart');
            Setdatacart([])

            navigate('/process')

            toast.success('สั่งซื้อสำเร็จ!',{
                        position:"top-center",
                        autoClose:3000,
                        hideProgressBar:false,
                        closeOnClick:false,
                        pauseOnHover:false,
                        draggable: false ,
                        theme:'colored'
            })
        }
        else{
            navigate('/home')
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
    // จัดการระบบสมาชิก
    const [user, setUser] = useState<any>(null);
    

    useEffect(()=>{
        const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        setUser(foundUser || null);

        

    },[[localStorage.getItem("currentUser")]])


   

    
    
     
    const subtotal = datacart.reduce((acc, item) => acc + item.menu_price * item.quantity, 0)

    const vat = subtotal * 0.07;
    
    const totalprice = (subtotal + vat) 
    return (
        <div className='w-screen h-screen mt-[150px] xl:mb-[600px] lg:mb-[200px]  mb-[0px]'>
            <Tagmenu title='ORDER SCAN'></Tagmenu>
            <div className='w-[90%] xl:h-[60vh] lg:h-[60vh] md:h-[40vh] h-[30vh] flex flex-row justify-center mx-auto md:gap-0 gap-[5px]'>
                <div className='w-[50%] h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] xl:gap-[30px] md:gap-[10px] gap-[5px]'>
                    <p className='mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px] self-start '>YOUR ORDER MENU</p>
                    {datacart.map((data) => {
<<<<<<< HEAD
                        return(
=======
                        return (
                            
>>>>>>> origin/gus-test-merge
                            <Cartcom order_id={data.order_id} menuid={data.menu_id} title={data.menu_name} imgUrl={`/${data.menu_image}`} type={3}></Cartcom>
                        )
                    })}
                </div>
                
                <div className='w-[40%]  h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col justify-center items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] '>
                    <QRCodeStatic amount={subtotal+vat}></QRCodeStatic>
                </div>
            </div>
            <div className='lg:gap-[80px] md:gap-[50px] gap-[20px] flex flex-col md:mt-[80px] mt-[50px]'>
<<<<<<< HEAD
                <TagPrice title = 'Sub Total Price' price={subtotal}></TagPrice>
                <TagPrice title = 'VAT' price={vat}></TagPrice>
                <TagPrice title = 'Discount Member' price={0}></TagPrice>
                <TagPrice title = 'Total Price' price={totalprice}></TagPrice>
            </div>
            
            <div className='flex flex-row mt-[30px] md:mt-[80px] justify-center md:gap-[30px] gap-[10px]'> 
=======
                <TagPrice title='Sub Total Price' price={subtotal}></TagPrice>
                <TagPrice title='VAT' price={vat}></TagPrice>
                <TagPrice title='Discount Member' price={discountcalculate} percent={discountpercentage}></TagPrice>
                <TagPrice title='Total Price' price={totalprice}></TagPrice>
            </div>

            <div className='flex flex-row mt-[30px] md:mt-[30px] justify-center md:gap-[30px] gap-[10px]'>
>>>>>>> origin/gus-test-merge
                <div onClick={() => navigate('/cart')} className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl'>
                        BACK
                    </Button>
                </div>
                <div onClick={() => {buysuccess(); }} className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl'>
                        NEXT
                    </Button>
                </div>
                
            </div>
            
            
        
        </div>
    )
}

export default PaymentPage