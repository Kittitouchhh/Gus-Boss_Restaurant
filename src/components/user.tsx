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
        <div className="xl:justify-center w-20 lg:flex lg:w-full lg:h-20 lg:p-3 lg:gap-3 lg:px-3">
            {/* crown icon */}
            <img
                className="mt-2 cursor-pointer ml-6 w-[35px] h-[35px] rounded-full self-center xl:w-[45px] xl:h-[45px]"
                onClick={handleCrownClick}
                src="/public/member/crownlogo.png"
                alt="membership"
            />

            <img
                src={user?.image || 'https://cdn-icons-png.flaticon.com/256/6522/6522516.png'}
                alt=""
                className="m-auto w-[50px] h-[50px] rounded-full xl:w-[70px] xl:h-[70px]"
            />
            <p className="text-center xl:flex xl:items-center text-white text-[18px] mb-2 xl:text-[25px]">
                {user?.showname || "Unknown"}
            </p>
        </div>
    );
};

export default User;