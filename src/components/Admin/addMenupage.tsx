import React, { useState } from "react";

type Props = {
    open: boolean;
    onClose: () => void;
    onAdd?: (data: { name: string; price: number }) => void;

};

const AddMenupage: React.FC<Props> = ({ open, onClose, onAdd }) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState<number>(0);

    if (!open) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAdd?.({ name, price });
        onClose();
    };

    

    return (
        <div
            className="z-50 fixed inset-0 flex items-center justify-center " >
            <div
                className="bg-[#3D342F] border-3 border-[#FFEED9] 
                shadow-xl p-3 rounded-lg w-[600px] h-[600px]"
                onClick={(e) => e.stopPropagation()} // กันไม่ให้คลิกในกล่องแล้วปิด
            >
                <div className="flex justify-end h-10 items-center ">
                    <button className="text-[28px] text-[#FFEED9] p-1 hover:text-[40px]
                     " onClick={onClose} > X </button>

                </div>
                <p className="text-[48px] text-[#EEDBC4] font-bold text-center"
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.5)', // เงาเข้ม
                    }}
                >Add Menu</p>


                <div className="shadow-xl flex mt-3 m-auto   justify-center bg-white w-25  w-[450px] h-[200px]
                                items-center rounded-lg ">
                    <img src="./user/Upimage.png" alt="Upimag" />
                </div>

                <form onSubmit={handleSubmit} >
                    <div className="w-[100%] flex flex-wrap gap-2 mt-3">
                        <div className="ml-5 w-[60%]">
                            <p className=" font-bold text-[20px] text-[#EEDBC4]  " text->Name</p>

                            <input
                                className="shadow-xl bg-[#EEDBC4] border p-2 rounded-lg 
                                    border-3 w-[100%] "
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="w-[30%]">
                            <p className="shadow-xl font-bold text-[20px] text-[#EEDBC4] " text->Price</p>
                            <input
                                type="Number"
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                className="bg-[#EEDBC4] border p-2 rounded-lg 
                                    border-3 w-[100%]"
                                required
                            />
                        </div>
                    </div>
                    <div >
                        <div className="flex justify-start mt-3 ">
                            <div className="ml-4">
                                <p className="font-bold text-[20px] text-[#EEDBC4] " text->Status</p>
                                <select className="bg-black text-[18px] border p-2 rounded-lg text-[#EEDBC4] border-3">
                                    <option value="Available">Available</option>
                                    <option value="SoldOut">SoldOut</option>
                                </select>
                            </div>
                            <div className="ml-4">
                                <p className="font-bold text-[20px] text-[#EEDBC4] " text->Type</p>
                                <select required className="bg-black text-[18px] border p-2 rounded-lg text-[#EEDBC4] border-3">
                                    <option value="Tea">Tea</option>
                                    <option value="Coffee">Coffee</option>
                                    <option value="SoftDrink">SoftDrink</option>
                                    <option value="MainDishes">MainDishes</option>
                                    <option value="Desserts">Desserts</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end m-5">
                            <button
                                type="submit"
                                className="shadow-xl  bg-[#18D34A] text-white py-2  rounded-lg hover:bg-green-600 w-[120px] hover:w-[130px] hover:h-[45px]"
                            >Save
                            </button></div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMenupage;
