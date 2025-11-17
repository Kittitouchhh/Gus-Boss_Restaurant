import { useState, useEffect } from "react";
import BannerData from "../../data/BannerItem.json"
import CardBanner from "../../components/Admin/BannerAdmin/CardBanner";
import AddBanner from "../../components/Admin/BannerAdmin/AddBanner";
import StatusButton from "../../components/Admin/CrudAdmin/statusbutton";

export interface BannerProps{
  id : number ,
  image : string,
  page : string,
  status: number
}

export default function BannerPage() {
    const [banner, setBanner] = useState<BannerProps[]>([]);

    useEffect(() => {
    setBanner(BannerData); 
  }, []);
  
    return (
        <div >
            <div className="bg-black px-5 pb-5 my-5 ">
                <div className="w-full justify-center flex ">
                    <div className="h-15 flex gap-3 justify-items-center">
                        <button className="mt-2 h-3/4 px-5 text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black  hover:bg-orange-500 hover:border-orange-600">1</button>
                        <button className="mt-2 h-3/4 px-5 text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black   hover:bg-orange-500 hover:border-orange-600">2</button>
                        <button className="mt-2 h-3/4 px-5 text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black  hover:bg-orange-500 hover:border-orange-600">3</button>
                    </div>
        
                </div>
                <div className="bg-[#fba542] h-screen">
                    <div>
                        {banner.map((b)=>(
                            <CardBanner 
                            key={b.id}
                            banner={b}
                            setBanner={setBanner} 
                            />
                        ))}
                    </div>
                </div>
                </div>
            </div>
    )
}
{/* <div className="mt-15 mb-5 bg-black p-5">
                <h1 className="text-5xl font-bold text-white text-center mb-3 ">BANNER</h1>
                <div className="justify-center flex gap-1">
                    <button className="mt-5 h-1 min-w-100 w-200 bg-white"></button>
                    <button className="text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black pr-10 pl-10 pt-1 pb-2 mb-3 opacity-95 hover:opacity-100 hover:bg-orange-500 hover:border-orange-600">1</button>
                    <button className="text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black pr-10 pl-10 pt-1 pb-2 mb-3 opacity-95 hover:opacity-100 hover:bg-orange-500 hover:border-orange-600">2</button>
                    <button className="text-white duration-500 hover:scale-105 text-[20px] shadow-xl border-3 border-orange-500 bg-black pr-10 pl-10 pt-1 pb-2 mb-3 opacity-95 hover:opacity-100 hover:bg-orange-500 hover:border-orange-600">3</button>
                    <button className="mt-5 h-1 min-w-100 w-200 bg-white"></button>
                </div>
            </div>

            <div className="bg-[#684A3A] flex justify-center items-center">
                <div className="mt-10 shadow-2xl bg-[#fba542] ">
                    <div className="flex justify-between mt-5 mx-5">
                        <span className="flex justify-center px-3 bg-white px-1 py-2 text-black p-2 rounded-[10px] font-bold  ">
                            <b className="text-[22px] bg-orange-500 text-white px-6 py-[3px] rounded-[5px]  font-normal ">{banner.length}</b> 
                        </span>
                        <button className="text-orange-500 font-bold py-3 px-5 bg-white border-3 rounded-[5px] 
                        duration-500 hover:scale-105"
                        onClick={() => setOpen(true)}>
                            Add Banner
                        </button>
                        <AddBanner open={open} onClose={() => setOpen(false)}/>
                    </div>
                    <div className="flex justify-center mt-3">
                        <button className="bg-[#684A3A] w-180 min-w- h-1 "></button>
                    </div>
                    <div>
                        {banner.map((b)=>(
                            <CardBanner 
                            key={b.id}
                            banner={b}
                            />
                        ))}
                    </div>
                </div>
            </div> */}
