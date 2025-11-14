import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import MenuStatus from "./statusbutton";
import EditMenu from "./editMenu";
import type { MenuItem } from "../../../page/pagesAdmin/DataMenu";

type CardMenuProps = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  mode?: "view" | "add" | "edit";
  onSave?: (menu: MenuItem) => void;
  onCancel?: () => void;
};

export default function CardMenuAdmin({
  menu,
  setMenus,
  mode = "view",
  onSave,
  onCancel,
}: CardMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    name: menu.name || "",
    price: menu.price?.toString() || "",
    image: menu.image || "",
    status: menu.status || "Available",
    type: menu.type || "Tea",
  });

  // ปรับตำแหน่งเมนู Edit
  const updatePosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setPosition({
      x: rect.right,
      y: rect.top + window.scrollY,
    });
  };

  useEffect(() => {
    if (open) {
      updatePosition();
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);
    } else {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    }
    return () => {
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return alert("กรอกข้อมูลให้ครบก่อนบันทึก");
    const newMenu: MenuItem = {
      id: mode === "add" ? Date.now() : menu.id,
      name: form.name,
      price: Number(form.price),
      image: form.image || "/drink/default.png",
      status: form.status as "Available" | "Sold Out",
      type: form.type,
    };

    if (onSave) onSave(newMenu);
  };

  if (editing) {
    return (
      <CardMenuAdmin mode="edit"
        menu={menu}
        setMenus={setMenus}
        onSave={(updated) => {
          setMenus(prev => {
            const updatedList = prev.map(
              m => (m.id === menu.id ? updated : m)
            );

            localStorage.setItem("menus", JSON.stringify(updatedList));
            return updatedList;
          });

          setEditing(false);
        }}
        onCancel={() => setEditing(false)}
      />
    );
  }

  if (mode === "view") {
    return (
      <div className="cursor-pointer max-w-100 grid grid-cols-2 md:grid-cols-1 relative bg-[#F8F5F2] rounded-2xl shadow-lg border border-[#E6D4C3] overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="w-full h-40 overflow-hidden">
          <img
            src={menu.image || "/drink/default.png"}
            alt={menu.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="p-4 flex flex-col items-center text-center">
          <div className="mb-3">
            <button
              ref={buttonRef}
              className="cursor-pointer z-48 absolute top-3 right-3 text-[#000000] hover:text-[#3D342F]"
              onClick={() => setOpen(!open)}
            >
              <EllipsisVertical />
            </button>
          </div>

          <div className="mt-3">
            <h3 className="text-[#3D342F] font-bold text-lg truncate">{menu.name}</h3>
            <p className="text-[#C28B53] font-semibold mt-1">{menu.price}฿</p>
            <div className="mb-2">
              <MenuStatus />
            </div>
          </div>
        </div>

        {open && (
          <EditMenu
            menu={menu}
            setMenus={setMenus}
            onClose={() => setOpen(false)}
            open={open}
            position={position}
            onEdit={() => setEditing(true)}
          />
        )}
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-[#E6D4C3] overflow-hidden flex flex-col p-3">

      <div className="hover:scale-105 relative w-full h-[150px] bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
        
        {mode === "edit" && (
          <label className="relative w-full h-full cursor-pointer ">
            <div className="absolute w-full h-full hover:scale-110   opacity-50 flex justify-center items-center">
              <p className="opacity-100 font-bold text bg-white p-3 transition-all duration-500 ease-out  hover:text-center hover:scale-[1.02] rounded-xl ">Change Photo
                </p></div>
            <img
              src={form.image || "/drink/default.png"}
              className="w-full h-full object-cover "
            />
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
        
        {mode === "add" && (
          form.image ? (
            <img
              src={form.image}
              className="w-full h-full object-cover"
            />
          ) : (
            <label className="cursor-pointer text-center text-gray-500">
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              <div className="text-sm font-semibold">UPLOAD IMAGE</div>
            </label>
          )
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <input
          type="text"
          name="name"
          placeholder="Menu name..."
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        />
        <input
          type="number"
          name="price"
          placeholder="Price..."
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        />
        <select
          name="status"
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value as "Available" | "Sold Out" })}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="Available">Available</option>
          <option value="Sold Out">Sold Out</option>
        </select>
        <select
          name="type"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border rounded px-2 py-1 text-sm"
        >
          <option value="Tea">Tea</option>
          <option value="Coffee">Coffee</option>
          <option value="SoftDrink">Soft Drink</option>
          <option value="MainDishes">Main Dishes</option>
          <option value="Desserts">Desserts</option>
        </select>
      </div>


      <div className="flex justify-between mt-3">
        {onCancel && (
          <button
            onClick={onCancel}
            className="cursor-pointer  bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 text-sm"
          >
            Cancel
          </button>
        )}
        <button
          onClick={handleSave}
          className="cursor-pointer bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm ml-auto"
        >
          Save
        </button>
      </div>
    </div>
  );
}
