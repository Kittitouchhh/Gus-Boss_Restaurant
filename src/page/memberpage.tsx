import RankCard from "../components/showdiscount"

export default function Memberpage() {

    const ranks = [
        {
            icon:"member/bronze.png",
            title:"RANK BRONZE",
            discount: 5,
            rank:"Bronze"
        },{
            icon:"member/silver.png",
            title:"RANK SILVER",
            discount: 10,
            rank:"Silver"
        },{
            icon:"member/commander.png",
            title:"RANK COMMANDER",
            discount: 15,
            rank:"Commander"
        },{
            icon:"member/conqueror.png",
            title:"RANK CONQUEROR",
            discount: 20,
            rank:"Conqueror"
        },
    ]

    return (
        <>
            <div className="grid md:grid-cols-2">
                <div className="w-full h-50 md:h-80 overflow-hidden">
                    <img src="/user/memberpic.png" alt="mem"
                        className="w-full h-full object-cover  " />
                </div>
                <div className="md:justify-center md:p-5 bg-[#28221F] w-full h-10 md:h-80 flex flex-col ">
                    <p className="font-bold text-white  md:text-[24px] text-center mt-2  md:text-center">
                        WELCOME TO MEMBERSHIP
                    </p>
                    <p className="hidden md:block text-white text-center mt-5">
                        Welcome to Membership! We’re delighted to have you join our community. As a member, you’ll enjoy exclusive discounts, early access to promotions, personalized recommendations, and surprise gifts made just for you. Our goal is to make your journey with us more rewarding, enjoyable, and meaningful. Thank you for choosing to be with us — we look forward to sharing this exciting journey together.
                    </p>
                </div>
            </div>
            <div className="my-10 flex justify-center  ">
                <div className="hover:text-white transition duration-500  bg-[#D4B8A0] hover:bg-gray-800 border-20 border-white hover:border-black transition duration-500  w-[80%] py-5 rounded-xl hover:scale-101 cursor-pointer ">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-center">
                            <img src="member/bronze.png" alt="bronze"
                                className="cursor-pointer w-20 h-20 md:h-30 md:w-30 hover:scale-110" />
                        </div>
                        <div className=" text-center font-bold md:text-2xl ">
                            <p className="hover:text-orange-500">YOUR MEMBERSHIP RANK</p>
                            <p className="text-white hover:text-orange-500">RANK MEMBERSHIP</p>
                        </div>
                        <button className="transition duration-500  md:p-3 cursor-pointer hover:scale-110 bg-red-600 md:font-bold text-[#EEDBC4] px-2 py-1 rounded-xl flex m-auto">
                            BUY MEMBERSHIP
                        </button>
                    </div>
                </div>
            </div>
            <div className="bg-[#28221F] rounded-[25px] shadow-xl  mb-5 mx-2  ">
                <div className="cursor-pointer hover:text-orange-500 transition duration-500  text-center text-white  text-[50px] font-bold">DisCount</div>
                <div className="md:pb-10   flex flex-wrap gap-3   items-center justify-center">
                {ranks.map((r,i) => (
                    <RankCard
                    key = {i}
                    icon = {r.icon}
                    title = {r.title}
                    discount = {r.discount}
                    rank = {r.rank}
                    />
                ) )}
            </div>
            </div>
            
        </>
    )
}