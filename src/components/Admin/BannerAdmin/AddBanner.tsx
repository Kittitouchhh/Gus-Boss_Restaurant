import React, { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd?: (data: { image: string }) => void;

};

const AddBanner: React.FC<Props> = ({ open, onClose, onAdd }) => {
    const [image, setImage] = useState("")
    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd?.({ image });
        onClose();
    };
    return (
        <div
            className="backdrop-blur z-50 fixed inset-0 flex items-center justify-center " >
            <div
                className="bg-white border-3 border-orange-500 border-3
                shadow-xl p-3 rounded-lg w-[600px] h-[450px]"
                onClick={(e) => e.stopPropagation()} // กันไม่ให้คลิกในกล่องแล้วปิด
            >
                <div className="flex justify-end h-10 items-center ">
                    <button className="text-[28px] text-black p-1 hover:text-[40px]
                     " onClick={onClose} > X </button>

                </div>
                <p className="text-[48px] text-orange-500 font-bold mt-[-25px] text-center"
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // เงาเข้ม
                    }}
                >ADD BANNER</p>


                <div className="shadow-xl flex mt-3 m-auto   justify-center bg-white w-25  w-[450px] h-[200px]
                                items-center rounded-lg ">
                    <img src="./user/Upimage.png" alt="Upimag" />
                </div>

                <form onSubmit={handleSubmit} >
                    <div className="">
                        <div className="flex justify-center m-5">
                            <button
                                type="submit"
                                className="shadow-xl  bg-[#18D34A] text-white py-2  rounded-lg w-[120px] duration-500 hover:scale-105"
                            >Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddBanner;
