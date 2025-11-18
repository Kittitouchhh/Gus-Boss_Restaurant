import { useState } from "react";

const isMd = window.matchMedia("(min-width: 768px)").matches;

type StatusButtonProps<T> = {
  item: T;
  setItems: React.Dispatch<React.SetStateAction<T[]>>;
  storageKey: string;
  type?: "menu" | "banner";
  showLabel?: boolean;
};

export default function StatusButton<
  T extends { id: number | string; status: number }
>({
  item,
  setItems,
  storageKey,
  type = "menu",
  showLabel = true,
}: StatusButtonProps<T>) {

  const [status, setStatus] = useState(item.status);

  const knobPos = status === 1
    ? (isMd ? 60 - 16 - 6 : 44 - 16 - 6)  // track - knob - padding
    : 0;

  const themes = {
    menu: {
      activeBg: "#4ECDD2",
      inactiveBg: "#ccc",
      activeText: "#4ECDD2",
      inactiveText: "#555",
      labelOn: "Available",
      labelOff: "Sold Out",
    },
    banner: {
      activeBg: "#e11d48",
      inactiveBg: "#1f2937",
      activeText: "#e11d48",
      inactiveText: "#aaa",
      labelOn: "ON",
      labelOff: "OFF",
    },
  }[type];

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
    <div className="p-3 text-center">
      <div className="flex justify-center items-center gap-2">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={status === 1}
            onChange={toggleStatus}
            className="sr-only"
          />

          <div
            className="mb-1 w-11 h-6 md:w-15 rounded-full transition-all relative"
            style={{
              backgroundColor:
                status === 1 ? themes.activeBg : themes.inactiveBg,
            }}
          >
            <div
              className="absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white transition-all"
              style={{ transform: `translateX(${knobPos}px)` }}
            ></div>
          </div>
        </label>

        {showLabel && (
          <span
            className="mb-1 font-medium transition-all"
            style={{
              color:
                status === 1 ? themes.activeText : themes.inactiveText,
            }}
          >
            {status === 1 ? themes.labelOn : themes.labelOff}
          </span>
        )}
      </div>
    </div>
  );
}
