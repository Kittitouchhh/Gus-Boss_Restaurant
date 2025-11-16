import ReactDOM from "react-dom";
import type { MenuItem } from "../../../page/pagesAdmin/DataMenu";

type EditMenuProps = {
  open: boolean;
  onClose: () => void;
  position: { x: number; y: number } | null;
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  onEdit: () => void;
};



export default function EditMenu({ open, onClose, position, setMenus, menu, onEdit }: EditMenuProps) {
  
  if (!open || !position) return null;

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `คุณต้องการลบ "${menu.name}" ออกจากเมนูหรือไม่?`
    );
    if (!confirmDelete) return;
    const storedMenus = JSON.parse(localStorage.getItem("menu") || "[]");
    const updatedMenus = storedMenus.filter(
      (item: MenuItem) => item.id !== menu.id
    );

    localStorage.setItem("menu", JSON.stringify(updatedMenus));
    setMenus((prev) => prev.filter((m) => m.id !== menu.id));
    
    const deletedId = JSON.parse(localStorage.getItem("deletedMenus") || "[]");
    const newDeleted = [...deletedId, menu.id];
    localStorage.setItem("deletedMenus", JSON.stringify(newDeleted));

    onClose();
  };

  return ReactDOM.createPortal(
    <div
      className=" z-49 absolute top-0 left-0 w-full h-full"
      onClick={onClose}
    >
      <div
        className="absolute bg-white border border-[#73594A] shadow-xl p-4 rounded-lg 
            w-[100px] h-[90px]"
        style={{
          top: position.y - 15,
          left: position.x - 50
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() =>{ onEdit(); onClose();} }
          className="
        duration-500 hover:scale-105
        opacity-90 mb-1 block text-blue-500 w-full text-left cursor-pointer "
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className=" duration-500 hover:scale-105
        block text-red-500 w-full text-left cursor-pointer  ">Remove</button>

      </div>
    </div>,
    document.body
  );
}
