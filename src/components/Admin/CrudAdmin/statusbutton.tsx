import { useState } from "react";

function MenuStatus() {
  const [status, setStatus] = useState<"Available" | "Sold Out">("Available");

  const toggleStatus = () => {
    setStatus((prev) => (prev === "Available" ? "Sold Out" : "Available"));
  };

  return (
    <div className="p-3 text-center align-middle">
      <div className="flex justify-center items-center gap-2 z-index-0">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status === "Available"}
            onChange={toggleStatus} // ← สลับสถานะตรงนี้
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer-focus:outline-none 
                          peer-checked:bg-[#4ECDD2] after:content-[''] after:absolute 
                          after:top-[3px] after:left-[3px] after:bg-white after:h-4 
                          after:w-4 after:rounded-full after:transition-all 
                          peer-checked:after:translate-x-5">
          </div>
        </label>

        <span
          className={`font-medium ${
            status === "Available" ? "text-[#4ECDD2]" : "text-gray-800"
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
}

export default MenuStatus;