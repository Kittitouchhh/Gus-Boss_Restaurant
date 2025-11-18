import { useEffect, useState } from "react";
import RankCard from "../components/Rankcard";
import { Link } from "react-router-dom"
import CalculateMembership from "../utils/calculateMembership";

export const ranks = [
    { icon: "member/bronze.png", title: "RANK BRONZE", discount: 5, rank: "Bronze" },
    { icon: "member/silver.png", title: "RANK SILVER", discount: 10, rank: "Silver" },
    { icon: "member/commander.png", title: "RANK COMMANDER", discount: 15, rank: "Commander" },
    { icon: "member/conqueror.png", title: "RANK CONQUEROR", discount: 20, rank: "Conqueror" },
];


export default function Memberpage() {
    const [userMembership, setUserMembership] = useState<any>(null);

    const getRankColor = (rank: string) => {
        switch (rank) {
            case "Bronze":
                return "text-[#3D3420] bg-[#D4B8A0] hover:bg-[#cba889] hover:shadow-[0_0_15px_rgba(203,168,137,0.7)]";
            case "Silver":
                return "bg-[#1B2A41] hover:bg-[#253C5A] hover:shadow-[0_0_15px_rgba(37,60,90,0.7)]";
            case "Commander":
                return "bg-yellow-600 hover:bg-yellow-500 hover:shadow-[0_0_15px_rgba(217,154,18,0.7)]";
            case "Conqueror":
                return "bg-[#8B0000]  hover:bg-[#b30000] hover:shadow-[0_0_15px_rgba(179,0,0,0.7)]";
            default:
                return "bg-[#D4B8A0]";
        }
        
    };
    const getRanktext = (rank: string) => {
        switch (rank) {
            case "Bronze":
                return "text-[#3D342F]  ";
            case "Silver":
                return "text-white ";
            case "Commander":
                return "text-yellow-100 ";
            case "Conqueror":
                return "text-white ";
            default:
                return "text-[#3D3420] ";
        }
        
    };


    const normalizeMembership = (mem: any) => ({
        isMember: mem?.isMember ?? false,
        points: mem?.points ?? 0,
        activatedAt: mem?.activatedAt ?? null,
    });

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");

        const users = JSON.parse(localStorage.getItem("users") || "[]");
        const user = users.find((u: any) => u.id?.toString() === currentUser);

        if (!user) {
            setUserMembership(null);
            return;
        }
        const normalized = normalizeMembership(user.membership);

        const calculateMember = CalculateMembership(normalized.points);

        setUserMembership({
            ...normalized,
            ...calculateMember
        });
    }, []);


    return (
        <>
            <div className="grid md:grid-cols-2 md:flex md:justify-center  mt-[150px]">
                <div className="md:max-w-[569px] md: w-full h-50 md:h-80 overflow-hidden">
                    <img src="/user/memberpic.png" alt="mem"
                        className="w-full h-full object-cover  " />
                </div>
                <div className="md:max-w-[569px] md:justify-center md:p-5 bg-[#28221F] w-full h-10 md:h-80 flex flex-col ">
                    <p className="font-bold text-white  md:text-[24px] text-center mt-2  md:text-center">
                        WELCOME TO MEMBERSHIP
                    </p>
                    <p className="hidden md:block text-white text-center mt-5">
                        Welcome to Membership! We're delighted to have you join our community. As a member, you’ll enjoy exclusive discounts, early access to promotions, personalized recommendations, and surprise gifts made just for you. Our goal is to make your journey with us more rewarding, enjoyable, and meaningful. Thank you for choosing to be with us — we look forward to sharing this exciting journey together.
                    </p>
                </div>
            </div>
            <div className="my-10 flex justify-center  ">
                {userMembership?.isMember === true ? (
                    <div
                        className={`hover:text-white transition duration-500 ${getRankColor(userMembership?.rank )} max-w-[739px] border-10 md:border-20 border-white hover:border-black w-[80%] py-5 rounded-xl hover:scale-101 cursor-pointer`}
                    >
                        <div className=" flex flex-col items-center gap-4 text-white">
                            <img
                                src={`member/${userMembership.rank.toLowerCase()}.png`}
                                alt={userMembership.rank}
                                className="w-22 h-22 md:w-30 md:h-30 hover:scale-105 transition"
                            />
                            <div className={`flex items-center gap-2 ${getRanktext(userMembership?.rank )} `} >
                                <p className={`text-xl md:text-[25px]    font-bold hover:text-black`}>Level {userMembership.level}</p>
                                <h2 className={`text-3xl md:text-[35px]  font-bold hover:text-black`}>{userMembership.rank}</h2>
                            </div>
                            
                            <p className="text-xl font-semibold hover:text-black md:text-[23px]">
                                Discount: {userMembership.discount * 100} %
                            </p>
                            <div className="w-3/4 bg-gray-900 rounded-full h-4 mt-2 relative overflow-hidden">
                                <div
                                    className="h-full rounded-full transition-all duration-700  "
                                    style={{
                                        width: `${userMembership.percent}%`,
                                        background: `linear-gradient(90deg,red, orange, white)`,
                                    }}
                                    aria-hidden="true"
                                />
                            </div>
                            <p className="text-sm font-semibold  hover:text-black md:text-[20px] ">
                                {userMembership.points}/{userMembership.nextTarget} EXP
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="hover:text-white transition duration-500  bg-[#D4B8A0] max-w-[739px] hover:bg-gray-800 border-20 border-white hover:border-black transition duration-500  w-[80%] py-5 rounded-xl hover:scale-101 cursor-pointer ">
                        <div className="flex flex-col gap-3">
                            <div className="flex justify-center">
                                <img src="member/bronze.png" alt="bronze"
                                    className="cursor-pointer w-20 h-20 md:h-30 md:w-30 hover:scale-110" />
                            </div>
                            <div className=" text-center font-bold md:text-2xl ">
                                <p className="hover:text-orange-500">YOUR MEMBERSHIP RANK</p>
                                <p className="text-white hover:text-orange-500">RANK MEMBERSHIP</p>
                            </div>
                            <Link to={"/paymenmberpage"}>
                                <button
                                    className="transition duration-500  md:p-3 cursor-pointer hover:scale-110 bg-red-600 md:font-bold text-[#EEDBC4] px-2 py-1 rounded-xl flex m-auto">
                                    BUY MEMBERSHIP
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-[#28221F] rounded-[25px] shadow-xl  mb-5 mx-2  ">
                <div className="cursor-pointer hover:text-orange-500 transition duration-500  text-center text-white  text-[50px] font-bold">DisCount</div>
                <div className=" md:pb-10 flex flex-wrap gap-3 items-center justify-center">
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
        </>
    )
}