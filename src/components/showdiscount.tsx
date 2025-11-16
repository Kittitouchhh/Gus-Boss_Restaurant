interface RankCardProps {
    icon: string;     
    title: string;
    discount?: number
    rank?: string; 

}

const RankCard:React.FC<RankCardProps>=({ icon, title, discount, rank }) => {
    
    const bgcolor = 
        rank === "Bronze" ? "bg-[#D4B8A0]" :
        rank === "Silver" ? "bg-gray-800 text-white" :
        rank === "Commander" ? "bg-yellow-800 text-white" :
        rank === "Conqueror" ? "bg-red-800 text-white"
        : "bg-[#D4B8A0]";

    
    return(
        <>
            <div className={`transition duration-300 hover:scale-105 hover:text-orange-500 cursor-pointer rounded-xl ${bgcolor} min-w-50  m-3 flex flex-col items-center p-3 gap-2`}>
                 <img className="w-20 h-20 hover:scale-105 " src={icon} alt="icon"  />
                 <p className="font-bold hover:text-white">{title}</p>
                 <p className=" font-bold hover:text-white border-t border-b w-full text-center">{discount}%</p>
            </div>
        </>
    )
}
export default RankCard