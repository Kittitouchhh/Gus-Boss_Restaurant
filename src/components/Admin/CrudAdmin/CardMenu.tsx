import React, { useState, useRef, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import StatusButton from "./statusbutton";
import EditMenu from "./editMenu";
import type { MenuItem } from "../../../page/pagesAdmin/DataMenu";
import Button from "../../button";

type CardMenuProps = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  mode?: "view" | "add" | "edit";
  onSave?: (menu: MenuItem) => void;
  onCancel?: () => void;
};

export default function CardMenuAdmin({menu,setMenus,mode = "view",onSave,onCancel,}: CardMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  
  const handleCancel = () => {
      if (onCancel) {
        onCancel();         
      } else {
        setEditing(false);  
      }
    };

  const [form, setForm] = useState({
    name: menu.menuName || "",
    price: menu.menuPrice,
    image: menu.imageMenu,
    status: menu.status,
    type: menu.datajson || "Tea",
    description: menu.description || ""
  });

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
    if (!form.name || !form.image || Number(form.price) <= 0) {
      return alert("กรอกข้อมูลให้ครบก่อนบันทึก");
    }

    const newMenu: MenuItem = {
      id: mode === "add" ? Date.now() : menu.id,
      menuName: form.name,
      menuPrice: Number(form.price),
      imageMenu: form.image || "/drink/default.png",
      status: Number(form.status),
      description: form.description || "",
      datajson: form.type,  
    };


    if (onSave) {
      onSave(newMenu);
      return;
    }

    setMenus((prev) => {
      const updated =
        mode === "add"
          ? [...prev, newMenu]
          : prev.map((m) => (m.id === menu.id ? newMenu : m));

      localStorage.setItem("menu", JSON.stringify(updated));
      return updated;
    });
  };
   

  if (mode === "add" || mode === "edit" || editing) {
    return (
      <div className="w-3/4 md:w-full m-auto bg-white rounded-2xl shadow-lg border border-[#E6D4C3] overflow-hidden flex flex-col p-3">

        <div className="hover:scale-105 relative w-full h-[150px] bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
          {(mode === "edit" || editing) && (
            <label className="relative w-full h-full cursor-pointer">
              <div className="absolute w-full h-full hover:scale-110 opacity-50 flex justify-center items-center">
                <p className="opacity-100 font-bold text bg-white p-3 rounded-xl">
                  Change Photo
                </p>
              </div>
              <img src={form.image || "/drink/default.png"} className="w-full h-full object-cover" />
              <input type="file" className="hidden" onChange={handleFileChange} />
            </label>
          )}

          {mode === "add" && !form.image && (
            <label className="cursor-pointer text-center text-gray-500 w-full h-full flex items-center justify-center">
              <input type="file" className="hidden" onChange={handleFileChange} />
              <div className="text-sm font-semibold">UPLOAD IMAGE</div>
            </label>
          )}

          {mode === "add" && form.image && (
            <>
              <input type="file" className="hidden" onChange={handleFileChange} />
              <img
                src={form.image}
                className="w-full h-full object-cover cursor-pointer"
                onClick={(e) =>
                  (e.currentTarget.previousElementSibling as HTMLInputElement)?.click()
                }
              />
            </>
          )}
        </div>
        <div className="mt-3 flex flex-col gap-2 text-black">
          <input
            type="text"
            placeholder="Menu name..."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border rounded px-2 py-1 text-sm"
          />

          <input
            type="number"
            placeholder="Price..."
            value={form.price}
            onChange={(e) => setForm({ ...form, price:  Number(e.target.value) })}
            className="border rounded px-2 py-1 text-sm"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: Number(e.target.value) })}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="1">Available</option>
            <option value="0">Sold Out</option>
          </select>

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="border rounded px-2 py-1 text-sm "
          >
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="SoftDrink">Soft Drink</option>
            <option value="MainDishes">Main Dishes</option>
            <option value="Desserts">Desserts</option>
          </select>
        </div>
        <div className="flex justify-between mt-3">
          <Button
              height="mk"
              width="mk"
              color="gray"
              stringColor="white"
              stringSize="mk"
              onClick={handleCancel}
            >
              Cancel
            </Button>

          <Button
            height="mk"
            width="mk"
            color="green"
            stringColor="white"
            stringSize="mk"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="cursor-pointer max-w-100 grid grid-cols-2 md:grid-cols-1 relative bg-[#F8F5F2] rounded-2xl shadow-lg border border-[#E6D4C3] overflow-hidden">
      <div className="w-full h-40 overflow-hidden">
        <img
          src={menu.imageMenu || "/drink/default.png"}
          alt={menu.menuName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-black p-4 flex flex-col items-center text-center">
        <button
          ref={buttonRef}
          className="cursor-pointer absolute top-3 right-3"
          onClick={() => {
            updatePosition();
            setOpen(!open);
          }}
        >
          <EllipsisVertical />
        </button>

        <h3 className="text-[#3D342F] font-bold text-lg truncate">{menu.menuName}</h3>
        <p className="text-[#C28B53] font-semibold mt-1">{menu.menuPrice}฿</p>

        <StatusButton item={menu} setItems={setMenus} 
        storageKey="menu" type="menu" />
      </div>

      {open && (
        <EditMenu
          menu={menu}
          setMenus={setMenus}
          onClose={() => setOpen(false)}
          open={open}
          position={position}
          onEdit={() => {
            setEditing(true);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
