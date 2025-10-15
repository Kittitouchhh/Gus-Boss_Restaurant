// import React, { useState, useRef, useEffect } from "react";
// import type { MenuItem } from "../../pages/AdminHome";
// import { EllipsisVertical } from "lucide-react";
// import MenuStatus from "./statusbutton"
// import EditMenu from "./editMenu";
// import CardMenu from "./CardMenu";

// type Props = {
//   menu: MenuItem;
//   setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>;
// };

// export default function MenuRow({ menu, setMenus }: Props) {
//   const [open, setOpen] = useState<boolean>(false);
//   const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
//   const buttonRef = useRef<HTMLButtonElement | null>(null);

//   const updatePosition = () => {
//     if (!buttonRef.current) return;
//     const rect = buttonRef.current.getBoundingClientRect();
//     setPosition({
//       x: rect.right + 5,
//       y: rect.top + window.scrollY + 10, // บวก scrollY เพื่อให้อยู่ตรงตำแหน่งจริง
//     });
//   };

//    useEffect(() => {
//     if (open) {
//       updatePosition();
//       window.addEventListener("scroll", updatePosition);
//       window.addEventListener("resize", updatePosition);
//     } else {
//       window.removeEventListener("scroll", updatePosition);
//       window.removeEventListener("resize", updatePosition);
//     }
//     return () => {
//       window.removeEventListener("scroll", updatePosition);
//       window.removeEventListener("resize", updatePosition);
//     };
//   }, [open]);

//   return (
//     <></>
//   )
// }

// //   <tr className="bg-[#FFF7ED] hover:bg-[#F2E3D3] border-b border-[#D2B48C]">
//   //     {/* Image */}
//   //     <div className="w-[100px] h-[100px] m-auto  border-[#D2B48C] rounded-md 
//   //     overflow-hidden shadow-md flex items-center justify-center ">
//   //       <img
//   //         src={menu.image}
//   //         alt={menu.name}
//   //         className="object-cover w-full h-full"
//   //       />
//   //     </div>

//   //     {/* Name */}
//   //     <td className="p-3 text-[#4B3B2F] font-bold text-center text-[20px]">{menu.name}</td>

//   //     {/* Price */}
//   //     <td className="p-3 text-[#4B3B2F] font-bold text-center ">${menu.price}</td>

//   //     {/* Status */}
//   //     <td className="p-3 text-center  min-w-[5rem] max-w-[5rem]">
//   //       <div className="flex justify-center items-center">
//   //         <MenuStatus />
//   //       </div>

//   //     </td>

//   //     {/* Actions */}
//   //     <td className="p-3 text-center">
//   //       <div className="flex justify-center items-center" >
//   //         <button
//   //           ref={buttonRef}
//   //           onClick={() => setOpen(!open)}
//   //           className="p-2 hover:bg-[#E6D4C3]"
//   //         >
//   //           <EllipsisVertical className="text-[#4B3B2F] w-5 h-5" />
//   //         </button>
//   //         <EditMenu
//   //           open={open}
//   //           onClose={() => setOpen(false)}
//   //           position={position}
//   //         />
//   //       </div>
//   //     </td>
//   //   </tr>