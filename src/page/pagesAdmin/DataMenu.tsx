import { useEffect, useState } from "react"
import MenuData from "../../data/menu.json"
import CardMenuAdmin from "../../components/Admin/CrudAdmin/CardMenu";
import SearchBar from "../../components/searchbarcomponent";
import Select from "../../components/selecthbar";
import Button from "../../components/button";

export type MenuItem = {
  id: number;
  name: string;
  price: number;
  status: "Available" | "Sold Out";
  image: string;
  type: string;
};

export default function DataMenupage() {
  const [menu, setMenus] = useState<MenuItem[]>([]);
  const [adding, setAdding] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const defaultMenus = MenuData as MenuItem[];
    const localMenus: MenuItem[] = JSON.parse(localStorage.getItem("menu") || "[]");
    const deletedMenus: MenuItem[] = JSON.parse(localStorage.getItem("deletedMenus") || "[]");

    const deletedIds = deletedMenus.map((d) => d.id);
    const filteredDefault = defaultMenus.filter(
    (m) => !deletedIds.includes(m.id)
    );
    
    const localMap = Object.fromEntries(localMenus.map(m => [m.id, m]));
    const mergedMenus = filteredDefault.map(d => localMap[d.id] || d);
    
    const extraMenus = localMenus.filter(
      (m: MenuItem) => !filteredDefault.some(d => d.id === m.id)
    );

    const finalMenus = [...mergedMenus, ...extraMenus];

    setMenus(finalMenus);
    localStorage.setItem("menu", JSON.stringify(finalMenus));
  }, []);

  const filteredMenus = menu.filter((menu) => {
    const matchType = type ? menu.type.toLowerCase() === type.toLowerCase() : true;
    const matchKeyword = keyword
      ? menu.name.toLowerCase().includes(keyword.toLowerCase())
      : true;
    return matchType && matchKeyword;
  });


  return (
    <div className="w-full flex bg-[#684A3A] ">
      <div className="m-auto w-full ">
        <div className="w-full">
          <h1 className=" text-5xl text-center font-bold text-white bg-black my-3 p-1  ">
            DATA MENU
          </h1>
        </div>

        <div className="">
          <div className="flex justify-center gap-2 h-10 mb-5 ">
            <SearchBar onSearchChange={setKeyword} />
            <div className="my-1">
              <Select
                value={type}
                onChange={setType}
                options={[
                  { value: "", label: "All" },
                  { value: "Tea", label: "Tea" },
                  { value: "Coffee", label: "Coffee" },
                  { value: "SoftDrink", label: "Soft Drink" },
                  { value: "MainDishes", label: "Main Dishes" },
                  { value: "Desserts", label: "Desserts" },
                ]}
              />
            </div>
          </div>

          <div className="flex justify-center gap-10">
            <span className="bg-[#FFEED9]  rounded font-bold p-1 md:w-30 md:h-15   ">
              <div className="flex">
                <b className="bg-[#684A3A]  rounded text-white p-1 md:text-[30px]  ">{filteredMenus.length} </b>
                <p className="text-[15px] m-auto p-1 md:text-[25px] md:m-auto"> Total</p>
              </div>

            </span>
          </div>
          <div>
            <div className="mt-1 flex justify-end mx-5  md:justify-center md:mt-5"
            >
              <Button
                height="mg" width="mg" color="green" stringColor="white"
                stringSize="mg" onClick={() => {
                  if (!adding){ setAdding(true); }
                }}
              >
                Add Menu
              </Button>
            </div>
          </div>



        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:w-[60%] xl:m-auto  gap-6 p-6">
          {adding && (
            <CardMenuAdmin
              mode="add"
              menu={{
                id: Date.now(),
                name: "",
                price: 0,
                image: "",
                status: "Available",
                type: "Tea",
              }}
              setMenus={setMenus}
              onSave={(newMenu) => {
                const updated = [...menu, newMenu];
                setMenus(updated);
                localStorage.setItem("menu", JSON.stringify(updated));
                setAdding(false);
              }}
              onCancel={() => setAdding(false)}
            />
          )}

          {filteredMenus.map((menu) => (
            <CardMenuAdmin key={menu.id} menu={menu} setMenus={setMenus} />
          ))}

        </div>

      </div>

    </div>
  );
}
