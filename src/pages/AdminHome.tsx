import React, { useEffect, useState } from "react";
import HeaderAdmin from "../components/Admin/headerAdmin"
import Footer from "../components/footer"
import MenuTable from "../components/Admin/menuTable";
import MenuData from "../data/menu.json"
import Searchset from "../components/Admin/search"
import Savebuttons from "../components/Admin/savebuttons"
import AddMenupage from "../components/Admin/addMenupage";


export type MenuItem = {
  id: number;
  name: string;
  price: number;
  status: "Available" | "Sold Out";
  image: string;
};

function AdminHome() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    setMenus(MenuData as MenuItem[]);
  }, []);

  return (
    <div className="min-h-screen bg-[#684A3A] font-sans">
      {/* Header */}
      <HeaderAdmin />

      {/* Content */}
      <div className="max-w-[1100px] mx-auto  pb-10">

        {/* Title + Total */}
        <div className="flex items-center justify-between border-b-4 border-[#a67c52] pb-5 pt-5 m-3">
         
          {/* Title */}
          <h1 className="flex text-5xl font-bold text-white  ">
            DATA MENU
          </h1>
          {/* Total */}
          <span className="bg-[#FFEED9] px-1 py-2 text-black p-2 rounded-[10px] font-bold  ">
              <b className="bg-[#684A3A] px-6 py-[3px] rounded-[5px] text-white font-normal ">{menus.length}</b> Total
          </span>

        </div>


        {/* Search + Filter */}
        <div className="flex flex-wrap items-center justify-between  gap-3">
          <Searchset />
          {/* Add Button */}
          <button 
            className=" rounded-lg 
            py-3 px-10 my-2 bg-green-500 hover:bg-green-700 text-white"
            onClick={() => setOpen(true)}
            >
              Add Menu
          </button>
           <AddMenupage open = {open}  onClose={() => setOpen(false)}> 
            </AddMenupage>
            
        </div>
        
        

        {/* Table */}
        <div className="bg-[#f9f3e6] rounded-xl shadow-lg ">
          <MenuTable menus={menus} setMenus={setMenus} />
        </div>

        {/* Buttons */}
        <Savebuttons />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminHome
