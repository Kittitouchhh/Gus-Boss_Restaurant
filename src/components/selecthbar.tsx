import React from "react";

interface SelectProps {
    bgcolor?: "black" | "cream" ;
    textColor?: "black" | "white" ;
    borderColor?: string;
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
    bgcolor = "cream",
    textColor = "black",
    borderColor = "#ccc",
    options,
    value,
    onChange,
}) => {
    let bgClass = "";
    if (bgcolor === "cream") bgClass = "bg-[#EEDBC4]";
    else if (bgcolor === "black") bgClass = "bg-[#000000]";


    const textClass = textColor === "white" ? "text-white" : "text-black";

    return (
        <select
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={`border  px-2 py-1 rounded-[10px] ${bgClass} ${textClass}`}
            style={{ borderColor }}
        >
            {options.map((op) => (
                <option
                    key={op.value}
                    value={op.value}
                    className="text-black" // option ส่วนใหญ่ควรเป็น text-black 
                >
                    {op.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
