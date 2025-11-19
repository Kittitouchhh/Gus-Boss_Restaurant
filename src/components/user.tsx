import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const User: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const currentId = localStorage.getItem("currentUser");
        if (!currentId) return;

        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const foundUser = users.find(
            (u: any) => u.id?.toString() === currentId
        );

        setUser(foundUser || null);
    }, []);

    const handleCrownClick = () => {
        navigate("/memberpage");
    };

    return (
        <div className="2xl:w-[300px] w-[120px] md:w-[210px] flex flex-row 2xl:gap-[20px] lg:gap-[10px] gap-[5px] justify-center items-center">
            <img className=" cursor-pointer hover:scale-120 hover:m-3 
             lg:w-[40px] lg:h-[40px] md:w-[30px] w-[26px] h-[26px] rounded-full self-center inline-block   xl:w-[45px] xl:h-[45px] transition-all duration-300 ease-out"
            onClick={handleCrownClick}
            src="/member/crownlogo.png" alt="membership" />

            <img src={user?.image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'} alt="" className='lg:w-[40px] lg:h-[40px] md:w-[30px] md:h-[30px] w-[30px] h-[30px] rounded-full self-center    2xl:w-[50px] 2xl:h-[50px] xl:w-[40px] xl:h-[40px] '/>
            <p className='md:text-center text-start  text-white text-[12px] md:text-[18px]   lg:text-[20px] 2xl:text-[25px] xl:text-[20px]'>{user?.showname || "Unknown"} </p>
        </div>
    );
};

export default User;