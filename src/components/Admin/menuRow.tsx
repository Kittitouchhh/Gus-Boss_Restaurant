import React, { useState } from "react";
import type { MenuItem } from "../../pages/AdminHome";
import { EllipsisVertical } from "lucide-react";

type Props = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

function MenuRow({ menu, setMenus }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <tr className="bg-[#FFF7ED] hover:bg-[#F2E3D3] transition-all border-b border-[#D2B48C]">
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
      <td className="p-3 text-center align-middle ">
        <div className="flex justify-center items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={menu.status === "Available"}
              className="sr-only peer"
              readOnly
            />
            <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#4ECDD2] after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:h-4 after:w-4 after:rounded-full after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
          <span
            className={`font-medium ${menu.status }`}
          >
            {menu.status}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="p-3 ">
        <div className="relative justify-center flex justify-center items-center" >
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-[#E6D4C3] "
          >
            <EllipsisVertical className="text-[#4B3B2F] w-5 h-5" />
          </button>
        </div>


        {isMenuOpen && (
          <div className="absolute right-2 mt-2 bg-white border border-gray-200 rounded-lg shadow-md w-28 z-10">
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
