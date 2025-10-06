import React from "react";
import type { MenuItem } from "../../pages/AdminHome";
import EditMenu from "./editMenu";

type Props = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};
function MenuRow({ menu, setMenus }: Props) {
  return (
    <tr className="border-b">
      <td className="p-2">
        <img src={menu.image} alt={menu.name} className="w-12 h-12 rounded" />
      </td>
      <td className="p-2">{menu.name}</td>
      <td className="p-2">${menu.price}</td>
      <td className="p-2">
        <span
          className={`px-2 py-1 rounded text-white ${
            menu.status === "Available" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {menu.status}
        </span>
      </td>
      <td className="p-2">
        <EditMenu menu={menu} setMenus={setMenus} />
      </td>
    </tr>
  );
}
export default MenuRow
