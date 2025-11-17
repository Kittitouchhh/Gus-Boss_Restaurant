import { useState } from "react";

type StatusButtonProps<T> = {
  item: T;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  storageKey: string; 

};

export default function StatusButton<
  T extends { id: number | string; status: number }
>({item,setItems,storageKey,



}: StatusButtonProps<T>) {

  const [status, setStatus] = useState<number>(item.status);

  const toggleStatus = () => {
    const newStatus = status === 1 ? 0 : 1;
    setStatus(newStatus);

    setItems((prev) => {
      const updated = prev.map((x) =>
        x.id === item.id ? { ...x, status: newStatus } : x
      );

      localStorage.setItem(storageKey, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="p-3 text-center align-middle">
      <div className="flex justify-center items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status === 1}
            onChange={toggleStatus}
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
            status === 1 ? "text-[#4ECDD2]" : "text-gray-800"
          }`}
        >
          {status === 1 ? "Available" : "Sold Out"}
        </span>
      </div>
    </div>
  );
}
