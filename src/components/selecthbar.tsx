import React from "react";

interface SelectProps {
    options: { value: string; label: string }[];
    value?: string;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
    options,
    value,
    onChange,
}) => {
    return (
        <select className="cursor-pointer hover:scale-110 bg-white rounded w-15 h-8 md:w-18 text-center"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {options.map((op) => (
                <option  
                    key={op.value}
                    value={op.value}
                    className="text-black " 
                >
                    {op.label}
                </option>
            ))}
        </select>
    );
};

export default Select;
