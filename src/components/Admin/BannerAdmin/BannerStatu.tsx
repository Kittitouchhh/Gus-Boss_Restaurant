import { useState } from "react";

export default function Bannertatus() {
  const [status, setStatus] = useState<"Show" | "Hide">("Show");

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Show" ? "Hide" : "Show"));
  };

  return (
    <td className="p-3 text-center align-middle">
      <div className="flex justify-center items-center gap-2 z-index-0">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status === "Show"}
            onChange={toggleStatus} // ← สลับสถานะตรงนี้
            className="sr-only peer"
          />
          <div className="w-20 h-6 bg-gray-800 rounded-full 
                          after:absolute 
                          after:top-[3px] 
                          after:left-[1px] 
                          after:bg-gray-400 
                          after:h-4 after:w-4 
                          after:rounded-full 
                          after:transition-all 

                          peer-checked:after:bg-orange-500
                          peer-checked:after:translate-x-15
                          peer-checked:bg-white
                          ">
          </div>
        </label>

        <span
          className={`font-medium text-[20px] ${
            status === "Show" ? "text-orange-500" : "text-gray-400"
          }`}
        >
          {status}
        </span>
      </div>
    </td>
  );
}