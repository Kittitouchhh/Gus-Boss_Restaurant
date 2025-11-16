import QRCode from "./QrCode"

export default function Paymenmberpage() {
    return (
        <div className="">
            <div className="m-3  ">
                <div className="">
                    <QRCode amount={100} />
                </div>
                    {/* <div className="hidden md:block  md:flex justify-center items-center ">
                         <div className="bg-[#28221F] rounded-[25px] shadow-xl  flex flex-wrap justify-center ">
                            {ranks.map((r, i) => (
                                <RankCard
                                    key={i}
                                    icon={r.icon}
                                    title={r.title}
                                    discount={r.discount}
                                    rank={r.rank}
                                />
                            ))}
                        </div>  */}

                </div>

            </div>

    )
}