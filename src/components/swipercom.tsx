import {Swiper , SwiperSlide} from 'swiper/react'
import {Navigation ,Pagination , Autoplay} from "swiper/modules"
import axios from 'axios'
import {useState , useEffect} from 'react'
import React from 'react'

import 'swiper/swiper-bundle.css';

interface datajasonProp{
    filejason : string
}

interface SwiperslideProps{
    id : string,
    image : string
}

const SwiperCom:React.FC<datajasonProp> = ({filejason}) =>{
    const [dataswiper , Setdataswiper]= useState<SwiperslideProps[]>([])
    const [filedata , Setfiledata] = useState<string>(filejason)


    useEffect(() =>{
        axios.get(`dataclient/${filedata}`)
        .then((res) => {Setdataswiper(res.data)})
        .catch((err) => {console.log(`เกิดข้อผิดพลาด ${err}`)})
    },[])
    

    return(
        <div className='relative w-full 2xl:h-[600px] xl:h-[450px] lg:h-[350px] md:h-[300px] h-[150px] mx-auto overflow-hidden shadow-lg shadow-black/90'>
            <Swiper modules={[Navigation,Pagination , Autoplay]}
            spaceBetween={20}
            slidesPerView= {1}
            loop = {true}
            autoplay = {{delay : 3000, disableOnInteraction : false}}
            pagination = {{clickable:true }}
            navigation
            className="h-full"
            speed={1000}
            >
                {dataswiper.map((data) => {
                    return(
                        <SwiperSlide key={data.id}><img src={data.image} className='w-full h-full object-cover'></img></SwiperSlide>
                    )
                })}

            </Swiper>
        </div>
    )
    
}

export default SwiperCom