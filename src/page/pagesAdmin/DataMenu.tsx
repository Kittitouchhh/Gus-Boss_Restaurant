import { useEffect, useState } from "react"
import MenuData from "../../data/menu.json"
import Searchset from "../../components/Admin/CrudAdmin/searchtypeset"
import AddMenupage from "../../components/Admin/CrudAdmin/addMenupage"
import CardMenu from "../../components/Admin/CrudAdmin/CardMenu";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  status: "Available" | "Sold Out";
  image: string;
  type: string;
};

export default function DataMenupage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState<boolean>(false)

  //  เก็บค่าจาก Searchset
  const [filters, setFilters] = useState({
    keyword: "",
    type: "",
    status: "",
  })

  useEffect(() => {
    const defaultMenus = MenuData as MenuItem[];
    const localMenus = JSON.parse(localStorage.getItem("menus") || "[]");
    
    const mergedMenus = [
    ...defaultMenus,
    ...localMenus.filter(
      (item: MenuItem) => !defaultMenus.some((menu) => menu.id === item.id)
    ),
  ];

  setMenus(mergedMenus);
  localStorage.setItem("menus", JSON.stringify(mergedMenus));
}, []);
  

  // ฟังก์ชันรับค่าจาก Searchset
  const handleFilterChange = (newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  // กรองข้อมูลตาม filter
  const filteredMenus = menus.filter((menu) => {
    const matchType = filters.type ? menu.type.toLowerCase() === filters.type.toLowerCase() : true;
    const matchStatus = filters.status ? menu.status === filters.status : true;
    const matchKeyword = filters.keyword
      ? menu.name.toLowerCase().includes(filters.keyword.toLowerCase())
      : true;

    return matchType && matchStatus && matchKeyword;
  });


  return (
    <div>
      {/* Menu */}
      <div className="bg-[#684A3A] p-5 ">
        {/* Content */}
        <div className="max-w-[1100px] mx-auto ">

          {/* Title + Total */}
          <div className="flex items-center justify-between border-b-4 border-[#a67c52] pb-5 pt-5 m-3">

            {/* Title */}
            <h1 className="text-5xl font-bold text-white  ">
              DATA MENU
            </h1>
            {/* Total */}
            <span className="bg-[#FFEED9] px-1 py-2 text-black p-2 rounded-[10px] font-bold  ">
              <b className="px-2 py-1 bg-[#684A3A]  rounded-[5px] text-white font-normal ">{menus.length}</b> Total
            </span>

          </div>


          {/* Search + Filter */}
          <div className="flex flex-wrap items-center justify-between  gap-3">
            <Searchset onFilterChange={handleFilterChange} />
            {/* Add Button */}
            <button
              className=" rounded-lg 
            py-3 px-10 my-2 bg-green-500 hover:bg-green-700 
            duration-500 hover:scale-105
            text-white "
              onClick={() => setOpen(true)}
            >
              Add Menu
            </button>
            <AddMenupage open={open} onClose={() => setOpen(false)} />


          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {filteredMenus.map((menu) => (
              <CardMenu key={menu.id} menu={menu} setMenus={setMenus} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
