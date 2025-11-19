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
import { Link } from "react-router-dom";



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
interface Membership {
  isMember: boolean;
  points: number;
  activatedAt: string; // หรือ Date
}
interface users{
    id:  number,
    username: string,
    password: string,
    role: string,
    image: string,
    showname : string,
    membership: Membership
      
}




const PaymentPage:React.FC = ({}) => {

    // ดึง user ที่ใช้งานล่าสุด
    const currentId = localStorage.getItem("currentUser");
    if (!currentId) return;

    const users = JSON.parse(localStorage.getItem("users") || "[]");

    const foundUser = users.find(
        (u: any) => u.id?.toString() === currentId
    );
    
    
    // เก็บชื่อเเละรูปภาพที่จะเเสดงหน้า process
    const displayName = foundUser?.showname || "Unknown";
    const displayImage = foundUser?.image || "https://cdn-icons-png.flaticon.com/512/6522/6522516.png";
   


    const navigate = useNavigate();
    

    // cart
    const [datacart,Setdatacart] = useState<cart[]>([])
    const [dataprocess , setprocss] = useState<process[]>([])

    useEffect(()=>{

        // ดึงข้อมูล cart จาก localstorage
        const datacartFromStorage = localStorage.getItem("cart");
        if(datacartFromStorage){
            Setdatacart(JSON.parse(datacartFromStorage))
            console.log(datacartFromStorage)
        }
        else{
            Setdatacart([])
        }

        // ดึงข้อมูล process จาก localstorage
        const dataprocessFromStorage = localStorage.getItem("process");
        if(dataprocessFromStorage){
            setprocss(JSON.parse(dataprocessFromStorage))
        }
        else{
            setprocss([])
        }
            
    },[])

    

    function buysuccess( ) {
        
        // กดซื้อ
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        // รวมจำนวนเมนูจากทุก cart
        let totalQuantity = cart.reduce((acc: number, item: cart) => acc + item.quantity, 0);
        // ถ้า cart มากกว่า 1 ให้ซื้อสำเร็จ
        if (cart.length > 0){
            // สร้าง process ของ user ที่ใช้งานล่าสุด
                const newProcessItem = {
                user :  displayName,
                user_image : displayImage , 
                all_menu:  cart.map((item: any) => item.menu_name),
                duration : totalQuantity * 10,
                }

            // เซฟ process ลง local
            const new_process = [...dataprocess, newProcessItem] 
            setprocss(new_process);    
            localStorage.setItem("process", JSON.stringify(new_process));
            

            // อัปเเต้มสมาชิก
            if (user && user.membership.isMember == true) {
                user.membership.points += totalQuantity * 5;

                const allUsers: users[] = JSON.parse(localStorage.getItem("users") || "[]");
                const updatedUsers = allUsers.map(u => 
                    u.id === user.id ? {...u, membership: {...u.membership, points: user.membership.points}} : u
                );
                localStorage.setItem("users", JSON.stringify(updatedUsers));

            }
            // ล้าง cart เพราะ ซื้อสำเร็จ
            localStorage.removeItem('cart');
            Setdatacart([])
            totalQuantity = 0
            
            
            

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

            // membership
            // ถ้าตระกร้าไม่มีก็ให้ซื้อผิดพลาก
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
    const [user, setUser] = useState<users | null>(null);
    
    

    useEffect(()=>{
        const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        setUser(foundUser || null);


        

    },[localStorage.getItem("currentUser")])

    
   

  
    // คำนวนราคาทั้งหมด
    const subtotal = datacart.reduce((acc, item) => acc + item.menu_price * item.quantity, 0)
    // คำนวณราคา vat
    const vat = subtotal * 0.07;

    //  หาว่าuserเป็นสมาชิกไหมเเละหาเปอร์เซ็นส่วนลด
    let discountpercentage = { points: 0, level: 0, rank: 'None', discount: 0, percent: 0, nextTarget: 0 };
    if(user?.membership.isMember == true){
        discountpercentage = user ? CalculateMembership(user.membership.points) : { points: 0, level: 1, rank: 'None', discount: 0, percent: 0, nextTarget: 0 };
    }

    
    const discountcalculate = (subtotal) * discountpercentage.discount

    const totalprice =  ( subtotal - discountcalculate ) +vat

    return (
        <div className='w-screen h-screen mt-[150px] xl:mb-[900px] lg:mb-[600px]  mb-[100px]'>
            <Tagmenu title='ORDER SCAN'></Tagmenu>
            <div className='w-[90%] xl:h-[60vh] lg:h-[60vh] md:h-[40vh] h-[30vh] flex flex-row justify-center mx-auto md:gap-0 gap-[5px]'>
                <div className='w-[50%] h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] xl:gap-[30px] md:gap-[10px] gap-[5px]'>
                    <p className='mx-2 font-bold text-[#EEDBC4] lg:text-[20px]  2xl:text-[30px] xl:text-[25px] md:text-[18px] text-[12px] self-start '>YOUR ORDER MENU</p>
                    {datacart.map((data) => {
                        return(

                            <Cartcom order_id={data.order_id} menuid={data.menu_id} title={data.menu_name} imgUrl={`${data.menu_image}`} type={3}></Cartcom>
                        )
                    })}
                </div>
                
                <div className='w-[40%]  h-full bg-[#201c19] md:m-[10px] m-0 xl:rounded-4xl lg:rounded-2xl md:rounded-2xl rounded-xl md:border-3 border-2 border-amber-100 overflow-y-auto flex flex-col justify-center items-center xl:p-[30px] 2xl:p-[30px] lg:p-[20px] p-[10px] '>
                    <QRCodeStatic amount={totalprice}></QRCodeStatic>
                </div>
            </div>
            <div className='lg:gap-[80px] md:gap-[50px] gap-[20px] flex flex-col md:mt-[80px] mt-[50px]'>
                <TagPrice title = 'Sub Total Price' price={subtotal}></TagPrice>
                <TagPrice title = 'VAT' price={vat}></TagPrice>
                <TagPrice title = 'Discount Member' price={discountcalculate} percent={discountpercentage.discount}></TagPrice>
                <TagPrice title = 'Total Price' price={totalprice}></TagPrice>
            </div>
            
            <div className='flex flex-row mt-[30px] md:mt-[80px] justify-center md:gap-[30px] gap-[10px]'> 

                <Link to="/cart" className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    
                        <Button height="xl" width='xl' color='white' stringColor='brown' stringSize='xl'>
                            BACK
                        </Button>
                    
                </Link>

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