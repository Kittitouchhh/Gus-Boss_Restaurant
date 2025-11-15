import QRCode from "./QrCode"
import RankCard from "../components/showdiscount"
import { ranks } from "../page/memberpage";

export default function Paymenmberpage() {
    return (
        <div className="">
            <div className="m-3 h-[800px] grid grids-col-1 md:grid-cols-2">
                <div>
                    <QRCode amount={100} />
                </div>
                <div className=" m-3 hidden md:block  md:flex justify-center items-center  ">
                    <div className="bg-[#28221F] rounded-[25px] xl:p-10 py-5 shadow-xl  flex flex-wrap justify-center  gap-5">
                        {ranks.map((r, i) => (
                            <RankCard
                                key={i}
                                icon={r.icon}
                                title={r.title}
                                discount={r.discount}
                                rank={r.rank}
                            />
                        ))}
                    </div>
                    

                </div>
            </div>
        </div>

    )
}