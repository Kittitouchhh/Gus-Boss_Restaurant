import React, { useState } from "react";
import type { MenuItem } from "../../pages/AdminHome";
import { EllipsisVertical}  from "lucide-react";
import MenuStatus from "./statusbutton"

type Props = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

function MenuRow({ menu, setMenus }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="bg-[#FFF7ED] hover:bg-[#F2E3D3] border-b border-[#D2B48C]">
      {/* Image */}
      <td className="p-3 text-center w-30 ">
        <img
          src={menu.image}
          alt={menu.name}
          className=" rounded-md object-cover mx-auto shadow "
        />
      </td>

      {/* Name */}
      <td className="p-3 text-[#4B3B2F] font-bold text-center ">{menu.name}</td>

      {/* Price */}
      <td className="p-3 text-[#4B3B2F] font-bold text-center ">${menu.price}</td>

      {/* Status */}
      <td className="p-3 text-center  min-w-[5rem] max-w-[5rem]">
        <div className="flex justify-center items-center">
          <MenuStatus />
        </div>
            
      </td> 

      {/* Actions */}
      <td className="p-3 text-center">
        <div className="flex justify-center items-center" >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 hover:bg-[#E6D4C3] "
          >
            <EllipsisVertical className="text-[#4B3B2F] w-5 h-5" />
          </button>
        </div>


        {isMenuOpen && (
          <div className="right-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-28 z-10">
            <button className="block w-full text-left px-3 py-2 hover:bg-[#FFF0E0] text-[#4B3B2F]">
              Edit
            </button>
            <button className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600">
              Remove
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default MenuRow;
