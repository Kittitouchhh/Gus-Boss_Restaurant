import React from "react";
import type { MenuItem } from "../../pages/AdminHome";
import MenuRow from "./menuRow";

type Props = {
  menus: MenuItem[];
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

function MenuTable({ menus, setMenus }: Props) {
  return (
  <div>
        {/* {menus.map((menu) => (
          <MenuRow key={menu.id} menu={menu} setMenus={setMenus} />
        ))} */}
  </div>
  );
}

export default MenuTable
