import React from "react";
import type { MenuItem } from "../../pages/AdminHome";
import MenuRow from "./menuRow";

type Props = {
  menus: MenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

function MenuTable({ menus, setMenus }: Props) {
  return (
    <table className="w-full border rounded shadow bg-white">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">Image</th>
          <th className="p-2">Name</th>
          <th className="p-2">Price</th>
          <th className="p-2">Status</th>
          <th className="p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {menus.map((menu) => (
          <MenuRow key={menu.id} menu={menu} setMenus={setMenus} />
        ))}
      </tbody>
    </table>
  );
}

export default MenuTable
