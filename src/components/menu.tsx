import React from "react"
import StarRating from "./starrating"

interface MenuProps{
    imageMenu: string
    nameMenu: string
    starMenu: number
    priceMenu: number
    onAddToCart?: () => void
}

const Menu: React.FC<MenuProps> = ({imageMenu,nameMenu,starMenu,priceMenu}) => {
    return(
        <div className="p-4  rounded-md w-70 h-80 overflow-hidden flex items-center flex-col
                        transition duration-1000 hover:scale-105 shadow-lg hover:shadow-xl
                        hover:bg-black hover:text-orange-500 "
                        >
            <div className="w-full h-45 overflow-hidden rounded-md" >
                <img  className="w-full h-full object-cover"  src={imageMenu} alt={nameMenu} />
            </div>
            <div  className="mt-2" >
                <p className="font-bold text-xl" >{nameMenu}</p>
                <div className="w-full flex justify-center text-xl">
                    <StarRating initialrating={starMenu}/>
                </div>
                <p className="text-green-600 font-semibold text-center text-xl">{priceMenu} ฿</p>
            </div>
            <button className=" p-1  my-2 text-white bg-gray-800  hover:bg-orange-500 rounded-md w-1/2
            transition duration-500 "
            >
                Add to Cart
            </button>
        </div>
    )
}

export default Menu;


