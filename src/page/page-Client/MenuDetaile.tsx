import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ParagraphMenu from '../../components/detail-menu/paragraphsMenu'
import SetOption from "../../components/detail-menu/setoption"
import Button from '../../components/button'
import Tagmenu from '../../components/tagmenu.tsx'
import CommnetCard from '../../components/detail-menu/commentCard.tsx'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Post {
    id: number;
    menuName: string;
    imageMenu: string;
    menuOption: string[];
    menuPrice: number;
    menuLike: string;
    datajson: string;
    description: string;
    status: number
}

interface cart {
    order_id: number,
    menu_id: number,
    menu_name: string,
    menu_price: number,
    menu_image: string,
    order_description: string,
    menu_option: { [key: string]: string },
    quantity: number
}

interface OptionProps {
    [optionName: string]: string[];
}

interface OptionCategoryProps {
    [menuType: string]: OptionProps[];
}

interface CommentProps {
    menuid: number,
    userName: string,
    userImage: string,
    content: string,
    like: boolean

}


function Menudetaile() {
    let [datamenu, Setdata] = useState<Post[]>([]);
    const { menuid, menutype } = useParams<{ menuid: string; menutype: string }>()
    let [selectedmenu, Setselected] = useState<Post | undefined>(undefined);
    let [text, setText] = useState("");
    let [option, Setoption] = useState<OptionCategoryProps>({})
    let [datacart, Setdatacart] = useState<cart[]>([])
    let [datacomment, Setcomment] = useState<CommentProps[]>([])

    const menufixedtonumber = Number(menuid)

    useEffect(() => {
        axios.get('/dataclient/option.json')
            .then((res) => {
                Setoption(res.data)
            })
            .catch((err) => {
                console.log(`เกิดข้อผิดพลาด ${err}`)
            })



        const dataFromStorage = localStorage.getItem("menu");
        if (dataFromStorage) {
            Setdata(JSON.parse(dataFromStorage));

        } else {
            Setdata([])
        }



        const datacartFromStorage = localStorage.getItem("cart");
        if (datacartFromStorage) {
            Setdatacart(JSON.parse(datacartFromStorage))
        }
        else {
            Setdatacart([])
        }

        // ส่วนคอมเม้นต์
        const datacommentFromStorage = localStorage.getItem("comment")
        if (datacommentFromStorage) {
            Setcomment(JSON.parse(datacommentFromStorage))
            console.log(datacomment)
        }
        else {
            Setcomment([])
        }


    }, []);







    useEffect(() => {
        console.log("datamenu updated:", datamenu);
    }, [datamenu]);


    useEffect(() => {
        if (datamenu.length === 0) return;
        const filteredMenu = datamenu.find((menu) => (menu.id).toString() === menuid && menu.status === 1);
        console.log(`This is the filteredMenu: ${filteredMenu}`)
        Setselected(filteredMenu);
    }, [datamenu, menuid])






    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: string }>({});


    function createOrder() {
        const newId = datacart.length > 0 ? Math.max(...datacart.map(item => item.order_id)) + 1 : 1;
        const order = {
            order_id: newId,
            menu_id: selectedmenu?.id || 0,
            menu_name: selectedmenu?.menuName || "",
            menu_price: selectedmenu?.menuPrice || 0,
            menu_image: selectedmenu?.imageMenu || "",
            order_description: text,
            menu_option: selectedOptions,
            quantity: 1,

        }
        const updatedCart = [...datacart, order];
        Setdatacart(updatedCart);
        console.log(updatedCart)
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        toast.success('สินค้าถูกใส่ตระกร้าเเล้ว!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,// ลากไปวางที่อื่นไม่ได้
            theme: 'colored'

        })
    }


    return (



        <div className='mt-[110px]'>
            <Link to='/cart'>
                <img src="/logo/cart.png" alt="" className='fixed 2xl:w-[150px] 2xl:h-[150px] xl:w-[120px] xl:h-[120px] lg:w-[100px] lg:h-[100px] md:w-[80px] md:h-[80px] w-[60px] h-[60px] md:right-[50px] md:bottom-[50px] right-[20px] bottom-[20px]' />
            </Link>
            <div className="mb-[40px]">
                <ParagraphMenu nameMenu={selectedmenu?.menuName || ""}  image={`${selectedmenu?.imageMenu || ""}`} description={selectedmenu?.description || ""}></ParagraphMenu>
            </div>
            <div className="w-full p-[20px]  lg:mb-[40px] md:mb-[30px] mb-[20px] flex flex-row flex-wrap 2xl:gap-[20px] xl:gap-[50px] lg:gap-[20px] md:gap-[30px] gap-[10px] justify-start items-stretch mx-auto">
                {selectedmenu?.menuOption.map(optionname => {
                    const category = option[menutype || ""]?.find(category => category.hasOwnProperty(optionname));
                    if (!category) return null

                    return (
                        <SetOption title={optionname} option_choice={category[optionname]} onSelect={(title, value) => { setSelectedOptions(prev => ({ ...prev, [title]: value })) }}></SetOption>
                    )

                })}

            </div>

            <form className='flex flex-col xl:gap-[20px] lg:gap-[15px] md:gap-[15px] gap-[10px] w-[80%]  mx-auto md:mt-[60px] mt-[20px]'>
                <label className='xl:text-[30px] lg:text-[25px] md:text-[25px] text-[18px] font-bold '>MORE DETAIL</label>
                <textarea className='w-full 2xl:h-[400px] xl:h-[350px] lg:h-[250px] md:h-[200px] h-[130px] bg-white mx-auto xl:rounded-2xl lg:rounded-xl rounded-md shadow-lg shadow-black/90 md:p-[20px] p-[10px] xl:text-[24px] md:text-[18px] text-[10px] text-[#3D342F] font-bold overflow-auto placeholder-gray-400 select-text' placeholder='พิมพ์ข้อความตรงนี้' value={text} onChange={(e) => setText(e.target.value)}></textarea>
            </form>

            <div className='flex justify-center xl:mt-[80px] md:mt-[50px] mt-[30px]'>
                <Button height="xl" width='xl' color='darkbrown' stringColor='white' stringSize='xl'  >{`Price : ${selectedmenu?.menuPrice}`}</Button>
            </div>


            <div className='w-full mx-auto  flex flex-row 2xl:mt-[100px] xl:mt-[70px] md:mt-[40px] mt-[20px] gap-[40px] 2xl:mb-[150px] justify-center items-center'>
                <div onClick={() => { createOrder() }} className='transform transition-transform duration-200 hover:scale-105 active:scale-95'>
                    <Button height="xl" width='xl' color='orange' stringColor='white' stringSize='xl'>ADD TO CART</Button>
                </div>


            </div>

            <Tagmenu title='COMMENT'></Tagmenu>


            <div className='flex flex-col justify-start items-center 2xl:w-[80%] xl:w-[100%] md:w-[95%] w-[95%] mx-auto'>
                <div className='flex flex-row justify-center items-center flex-wrap mb-[30px] p-[10px] lg:gap-[15px] md:gap-[10px] gap-[15px] mx-center w-full'>
                    {datacomment.map((datacomment) => {
                        if (datacomment.menuid === menufixedtonumber) {
                            return (
                                <CommnetCard userImage={datacomment.userImage} username={datacomment.userName} commentText={datacomment.content} like={datacomment.like} ></CommnetCard>
                            )
                        }

                    })}

                </div>
            </div>



        </div>



    )
}

export default Menudetaile