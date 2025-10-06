import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/Admin/headerAdmin"
import Footer from "../components/footer"
import MenuTable from "../components/Admin/menuTable";
import MenuData from "../data/menu.json"
import Searchset from "../components/Admin/search"
import Savebuttons from "../components/Admin/savebuttons"
import AddMenuButton from "../components/Admin/addmenubutton"

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  status: "Available" | "Sold Out";
  image: string;
};

function AdminHome() {
  const [menus, setMenus] = useState<MenuItem[]>([]);

  useEffect(() => {
     setMenus(MenuData as MenuItem[]);
  }, []);

    return (
    <div className="min-h-screen bg-gray-100">
      <HeaderAdmin />
      <div className="pt-35">
        <h1 className="text-2xl font-bold mb-4">DATA MENU</h1>
        <Searchset />
        <AddMenuButton setMenus={setMenus} />

        <div className="flex justify-between items-center mb-3">
          <span>Total: {menus.length}</span>
        </div>

        <MenuTable menus={menus} setMenus={setMenus} />
        <Savebuttons />
      </div>
      <Footer />
    </div>
  );
}

export default AdminHome
