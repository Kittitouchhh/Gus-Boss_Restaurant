import React from "react";
import type { MenuItem } from "../../pages/AdminHome";

type Props = {
  menu: MenuItem;
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};

function EditMenu({ menu, setMenus }: Props) {
  const removeMenu = () => {
    setMenus((prev) => prev.filter((m) => m.id !== menu.id));
  };

  const editMenu = () => {
    alert(`Edit ${menu.name} (ยังไม่ทำ form)`);
  };

  return (
    <div className="flex gap-2">
      <button onClick={editMenu} className="text-blue-500">Edit</button>
      <button onClick={removeMenu} className="text-red-500">Remove</button>
    </div>
  );
}

export default EditMenu