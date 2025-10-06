import React from "react";
import type { MenuItem } from "../../pages/AdminHome";

type Props = {
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
};
function AddMenuButton({ setMenus }: Props) {
// //   const addMenu = () => {
//     // const newMenu: MenuItem = {
//     //   id: Date.now(),
//     //   name: "New Item",
//     //   price: 15,
//     //   status: "Available",
//     //   image: "/images/default.jpg"
//     };
//     setMenus((prev) => [...prev, newMenu]);
//   };

  return (
    <button
    //   onClick={addMenu}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Add Menu
    </button>
  );
}
export default AddMenuButton